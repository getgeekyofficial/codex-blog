from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext
import asyncio
import resend
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)
import requests
import yaml
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT & Password
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Email & Stripe
resend.api_key = os.environ['RESEND_API_KEY']
SENDER_EMAIL = os.environ['SENDER_EMAIL']
STRIPE_API_KEY = os.environ['STRIPE_API_KEY']

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_jwt_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(days=30)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def require_admin(user: dict = Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# Models
class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class UpdateInterestsRequest(BaseModel):
    interests: List[str]

class InsightCreate(BaseModel):
    title: str
    category: str
    tags: List[str]
    main_text: str
    source_url: Optional[str] = None
    premium_only: bool = False

class InsightUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    main_text: Optional[str] = None
    source_url: Optional[str] = None
    premium_only: Optional[bool] = None

class DailyHitOverride(BaseModel):
    user_id: str
    insight_ids: List[str]
    date: str

# AUTH ROUTES
@api_router.post("/auth/signup")
async def signup(req: SignupRequest):
    # Check if user exists
    existing = await db.users.find_one({"email": req.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    user_doc = {
        "id": user_id,
        "email": req.email,
        "name": req.name,
        "password_hash": hash_password(req.password),
        "role": "user",
        "interests": [],
        "subscription_plan": "free",
        "onboarding_completed": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user_doc)
    
    token = create_jwt_token(user_id, req.email, "user")
    return {"token": token, "user": {"id": user_id, "email": req.email, "name": req.name, "role": "user"}}

@api_router.post("/auth/login")
async def login(req: LoginRequest):
    user = await db.users.find_one({"email": req.email}, {"_id": 0})
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_jwt_token(user["id"], user["email"], user["role"])
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "onboarding_completed": user.get("onboarding_completed", False)
        }
    }

@api_router.post("/auth/forgot-password")
async def forgot_password(req: ForgotPasswordRequest):
    user = await db.users.find_one({"email": req.email}, {"_id": 0})
    if not user:
        return {"message": "If email exists, reset link has been sent"}
    
    reset_token = str(uuid.uuid4())
    await db.password_resets.insert_one({
        "token": reset_token,
        "user_id": user["id"],
        "email": req.email,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "expires_at": (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat(),
        "used": False
    })
    
    reset_url = f"https://app.getgeeky.blog/reset-password?token={reset_token}"
    html_content = f"""
    <h2>Reset Your GetGeeky Codex Password</h2>
    <p>Click the link below to reset your password:</p>
    <a href="{reset_url}">{reset_url}</a>
    <p>This link expires in 1 hour.</p>
    """
    
    try:
        email_params = {
            "from": SENDER_EMAIL,
            "to": [req.email],
            "subject": "Reset Your GetGeeky Codex Password",
            "html": html_content
        }
        await asyncio.to_thread(resend.Emails.send, email_params)
    except Exception as e:
        logging.error(f"Email send failed: {str(e)}")
    
    return {"message": "If email exists, reset link has been sent"}

@api_router.post("/auth/reset-password")
async def reset_password(req: ResetPasswordRequest):
    reset_doc = await db.password_resets.find_one({"token": req.token, "used": False}, {"_id": 0})
    if not reset_doc:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    expires_at = datetime.fromisoformat(reset_doc["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Token expired")
    
    await db.users.update_one(
        {"id": reset_doc["user_id"]},
        {"$set": {"password_hash": hash_password(req.new_password)}}
    )
    
    await db.password_resets.update_one(
        {"token": req.token},
        {"$set": {"used": True}}
    )
    
    return {"message": "Password reset successful"}

@api_router.get("/auth/verify")
async def verify_token(user: dict = Depends(get_current_user)):
    return {"user": {"id": user["id"], "email": user["email"], "name": user["name"], "role": user["role"]}}

# USER ROUTES
@api_router.get("/user/profile")
async def get_profile(user: dict = Depends(get_current_user)):
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
        "interests": user.get("interests", []),
        "subscription_plan": user.get("subscription_plan", "free"),
        "onboarding_completed": user.get("onboarding_completed", False)
    }

@api_router.put("/user/interests")
async def update_interests(req: UpdateInterestsRequest, user: dict = Depends(get_current_user)):
    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {"interests": req.interests, "onboarding_completed": True}}
    )
    return {"message": "Interests updated", "interests": req.interests}

@api_router.get("/user/subscription")
async def get_subscription(user: dict = Depends(get_current_user)):
    subscription = await db.subscriptions.find_one({"user_id": user["id"]}, {"_id": 0})
    return {
        "plan": user.get("subscription_plan", "free"),
        "subscription": subscription
    }

# INSIGHTS ROUTES (USER)
@api_router.get("/insights/daily-hit")
async def get_daily_hit(user: dict = Depends(get_current_user)):
    today = datetime.now(timezone.utc).date().isoformat()
    
    # Check if daily hit already exists
    daily_hit = await db.daily_hits.find_one({"user_id": user["id"], "date": today}, {"_id": 0})
    
    if daily_hit and daily_hit.get("insight_ids"):
        insights = await db.insights.find(
            {"id": {"$in": daily_hit["insight_ids"]}},
            {"_id": 0}
        ).to_list(3)
        return {"insights": insights, "date": today}
    
    # Generate new daily hit
    user_interests = user.get("interests", [])
    if not user_interests:
        # Default to all categories
        user_interests = ["AI Unleashed", "Dark Psychology", "Conspiracy Vault", "Geek Science"]
    
    plan = user.get("subscription_plan", "free")
    query = {"category": {"$in": user_interests}}
    if plan == "free":
        query["premium_only"] = False
    
    insights = await db.insights.aggregate([
        {"$match": query},
        {"$sample": {"size": 3}},
        {"$project": {"_id": 0}}
    ]).to_list(3)
    
    if insights:
        insight_ids = [i["id"] for i in insights]
        await db.daily_hits.insert_one({
            "user_id": user["id"],
            "date": today,
            "insight_ids": insight_ids,
            "status": "delivered",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    
    return {"insights": insights, "date": today}

@api_router.get("/insights/library")
async def get_library(
    category: Optional[str] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 20,
    user: dict = Depends(get_current_user)
):
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"main_text": {"$regex": search, "$options": "i"}},
            {"tags": {"$regex": search, "$options": "i"}}
        ]
    
    plan = user.get("subscription_plan", "free")
    if plan == "free":
        query["premium_only"] = False
    
    skip = (page - 1) * limit
    insights = await db.insights.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.insights.count_documents(query)
    
    return {"insights": insights, "total": total, "page": page, "limit": limit}

@api_router.post("/insights/{insight_id}/like")
async def like_insight(insight_id: str, user: dict = Depends(get_current_user)):
    existing = await db.user_insights.find_one({"user_id": user["id"], "insight_id": insight_id}, {"_id": 0})
    
    if existing:
        await db.user_insights.update_one(
            {"user_id": user["id"], "insight_id": insight_id},
            {"$set": {"liked": not existing.get("liked", False)}}
        )
        return {"liked": not existing.get("liked", False)}
    else:
        await db.user_insights.insert_one({
            "user_id": user["id"],
            "insight_id": insight_id,
            "liked": True,
            "saved": False,
            "viewed_at": datetime.now(timezone.utc).isoformat()
        })
        return {"liked": True}

@api_router.post("/insights/{insight_id}/save")
async def save_insight(insight_id: str, user: dict = Depends(get_current_user)):
    existing = await db.user_insights.find_one({"user_id": user["id"], "insight_id": insight_id}, {"_id": 0})
    
    if existing:
        await db.user_insights.update_one(
            {"user_id": user["id"], "insight_id": insight_id},
            {"$set": {"saved": not existing.get("saved", False)}}
        )
        return {"saved": not existing.get("saved", False)}
    else:
        await db.user_insights.insert_one({
            "user_id": user["id"],
            "insight_id": insight_id,
            "liked": False,
            "saved": True,
            "viewed_at": datetime.now(timezone.utc).isoformat()
        })
        return {"saved": True}

@api_router.get("/insights/saved")
async def get_saved_insights(user: dict = Depends(get_current_user)):
    saved_items = await db.user_insights.find({"user_id": user["id"], "saved": True}, {"_id": 0}).to_list(1000)
    insight_ids = [item["insight_id"] for item in saved_items]
    
    insights = await db.insights.find({"id": {"$in": insight_ids}}, {"_id": 0}).to_list(1000)
    return {"insights": insights}

# ADMIN ROUTES
@api_router.get("/admin/insights")
async def get_all_insights(admin: dict = Depends(require_admin)):
    insights = await db.insights.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"insights": insights}

@api_router.post("/admin/insights")
async def create_insight(req: InsightCreate, admin: dict = Depends(require_admin)):
    insight_id = str(uuid.uuid4())
    insight_doc = {
        "id": insight_id,
        "title": req.title,
        "category": req.category,
        "tags": req.tags,
        "main_text": req.main_text,
        "source_url": req.source_url,
        "premium_only": req.premium_only,
        "created_by": admin["id"],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.insights.insert_one(insight_doc)
    return {"message": "Insight created", "id": insight_id}

@api_router.put("/admin/insights/{insight_id}")
async def update_insight(insight_id: str, req: InsightUpdate, admin: dict = Depends(require_admin)):
    update_data = {k: v for k, v in req.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.insights.update_one({"id": insight_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Insight not found")
    
    return {"message": "Insight updated"}

@api_router.delete("/admin/insights/{insight_id}")
async def delete_insight(insight_id: str, admin: dict = Depends(require_admin)):
    result = await db.insights.delete_one({"id": insight_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Insight not found")
    return {"message": "Insight deleted"}

@api_router.get("/admin/analytics")
async def get_analytics(admin: dict = Depends(require_admin)):
    total_users = await db.users.count_documents({"role": "user"})
    total_insights = await db.insights.count_documents({})
    
    today = datetime.now(timezone.utc).date().isoformat()
    daily_hits_today = await db.daily_hits.count_documents({"date": today})
    
    # Get daily active users (last 24 hours)
    yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
    daily_active = await db.daily_hits.distinct("user_id", {"created_at": {"$gte": yesterday}})
    
    paid_users = await db.users.count_documents({"subscription_plan": "paid"})
    
    return {
        "total_users": total_users,
        "total_insights": total_insights,
        "daily_hits_sent_today": daily_hits_today,
        "daily_active_users": len(daily_active),
        "paid_subscribers": paid_users
    }

@api_router.post("/admin/daily-hits/override")
async def override_daily_hit(req: DailyHitOverride, admin: dict = Depends(require_admin)):
    await db.daily_hits.update_one(
        {"user_id": req.user_id, "date": req.date},
        {"$set": {"insight_ids": req.insight_ids, "status": "overridden"}},
        upsert=True
    )
    return {"message": "Daily hit overridden"}

# GITHUB BLOG SYNC
GITHUB_REPO = "getgeekyofficial/codex-blog"
GITHUB_BRANCH = "main"
CONTENT_PATH = "content/posts"

def map_category_to_codex(blog_category: str) -> str:
    """Map blog categories to Codex categories"""
    category_map = {
        "science": "Geek Science",
        "psychology": "Dark Psychology",
        "conspiracy": "Conspiracy Vault",
        "ai": "AI Unleashed",
        "technology": "AI Unleashed"
    }
    return category_map.get(blog_category.lower(), "Geek Science")

def extract_excerpt(content: str, max_sentences: int = 2) -> str:
    """Extract first N sentences from content"""
    sentences = re.split(r'(?<=[.!?])\s+', content)
    excerpt_sentences = []
    for sentence in sentences[:max_sentences]:
        clean_sentence = re.sub(r'\*\*|\*|#|\[|\]|\(|\)', '', sentence).strip()
        if clean_sentence and len(clean_sentence) > 20:
            excerpt_sentences.append(clean_sentence)
        if len(excerpt_sentences) >= max_sentences:
            break
    return ' '.join(excerpt_sentences)

@api_router.post("/admin/sync-blog")
async def sync_blog_posts(admin: dict = Depends(require_admin)):
    """Sync blog posts from GitHub repository"""
    try:
        # Fetch list of files from GitHub
        api_url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{CONTENT_PATH}?ref={GITHUB_BRANCH}"
        response = requests.get(api_url)
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f"Failed to fetch from GitHub: {response.text}")
        
        files = response.json()
        mdx_files = [f for f in files if f["name"].endswith(".mdx")]
        
        synced_count = 0
        updated_count = 0
        errors = []
        
        for file_info in mdx_files:
            try:
                # Fetch raw content
                raw_url = file_info["download_url"]
                content_response = requests.get(raw_url)
                
                if content_response.status_code != 200:
                    errors.append(f"{file_info['name']}: Failed to fetch content")
                    continue
                
                raw_content = content_response.text
                
                # Parse frontmatter
                if not raw_content.startswith("---"):
                    errors.append(f"{file_info['name']}: No frontmatter found")
                    continue
                
                # Extract frontmatter and content
                parts = raw_content.split("---", 2)
                if len(parts) < 3:
                    errors.append(f"{file_info['name']}: Invalid frontmatter format")
                    continue
                
                frontmatter_text = parts[1]
                main_content = parts[2].strip()
                
                # Parse YAML frontmatter
                try:
                    metadata = yaml.safe_load(frontmatter_text)
                except yaml.YAMLError as e:
                    errors.append(f"{file_info['name']}: YAML parse error - {str(e)}")
                    continue
                
                # Extract data
                title = metadata.get("title", "")
                blog_category = metadata.get("category", "science")
                codex_category = map_category_to_codex(blog_category)
                tags = metadata.get("tags", [])
                if isinstance(tags, str):
                    tags = [t.strip() for t in tags.split(",")]
                
                # Use excerpt if available, otherwise extract from content
                excerpt = metadata.get("excerpt", "")
                if not excerpt:
                    excerpt = extract_excerpt(main_content, max_sentences=2)
                
                # Generate blog URL
                slug = file_info["name"].replace(".mdx", "")
                blog_url = f"https://codex-blog.vercel.app/posts/{slug}"
                
                # Check if insight already exists
                existing = await db.insights.find_one(
                    {"$or": [{"title": title}, {"source_url": blog_url}]},
                    {"_id": 0}
                )
                
                if existing:
                    # Update existing insight
                    await db.insights.update_one(
                        {"id": existing["id"]},
                        {"$set": {
                            "title": title,
                            "category": codex_category,
                            "tags": tags,
                            "main_text": excerpt,
                            "source_url": blog_url,
                            "premium_only": metadata.get("featured", False)
                        }}
                    )
                    updated_count += 1
                else:
                    # Create new insight
                    insight_id = str(uuid.uuid4())
                    insight_doc = {
                        "id": insight_id,
                        "title": title,
                        "category": codex_category,
                        "tags": tags,
                        "main_text": excerpt,
                        "source_url": blog_url,
                        "premium_only": metadata.get("featured", False),
                        "created_by": admin["id"],
                        "created_at": datetime.now(timezone.utc).isoformat()
                    }
                    await db.insights.insert_one(insight_doc)
                    synced_count += 1
                    
            except Exception as e:
                errors.append(f"{file_info['name']}: {str(e)}")
                logging.error(f"Error syncing {file_info['name']}: {str(e)}")
        
        return {
            "message": "Blog sync completed",
            "synced": synced_count,
            "updated": updated_count,
            "total_files": len(mdx_files),
            "errors": errors if errors else []
        }
        
    except Exception as e:
        logging.error(f"Blog sync error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# PAYMENT ROUTES
@api_router.post("/payments/checkout/session")
async def create_checkout_session(request: Request, user: dict = Depends(get_current_user)):
    body = await request.json()
    origin_url = body.get("origin_url")
    
    if not origin_url:
        raise HTTPException(status_code=400, detail="origin_url required")
    
    # Fixed pricing
    PLAN_PRICES = {"monthly": 9.99, "yearly": 99.99}
    plan_type = body.get("plan", "monthly")
    amount = PLAN_PRICES.get(plan_type, 9.99)
    
    success_url = f"{origin_url}/subscription-success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/profile"
    
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    checkout_request = CheckoutSessionRequest(
        amount=amount,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"user_id": user["id"], "plan": plan_type}
    )
    
    session = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Create payment transaction
    await db.payment_transactions.insert_one({
        "session_id": session.session_id,
        "user_id": user["id"],
        "amount": amount,
        "currency": "usd",
        "plan": plan_type,
        "payment_status": "pending",
        "status": "initiated",
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    return {"url": session.url, "session_id": session.session_id}

@api_router.get("/payments/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, request: Request, user: dict = Depends(get_current_user)):
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    status_response = await stripe_checkout.get_checkout_status(session_id)
    
    # Update transaction
    transaction = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if transaction and status_response.payment_status == "paid" and transaction["payment_status"] != "paid":
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"payment_status": "paid", "status": "completed"}}
        )
        
        # Upgrade user subscription
        await db.users.update_one(
            {"id": user["id"]},
            {"$set": {"subscription_plan": "paid"}}
        )
        
        # Create subscription record
        await db.subscriptions.insert_one({
            "user_id": user["id"],
            "plan": transaction.get("plan", "monthly"),
            "status": "active",
            "start_date": datetime.now(timezone.utc).isoformat(),
            "stripe_session_id": session_id
        })
    
    return status_response.model_dump()

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        return {"status": "success", "event": webhook_response.event_type}
    except Exception as e:
        logging.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()