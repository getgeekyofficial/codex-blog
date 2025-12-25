#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import uuid

class GetGeekyCodexAPITester:
    def __init__(self, base_url="https://geeky-codex.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.user_token = None
        self.admin_token = None
        self.test_user_id = None
        self.test_insight_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.test_results = []

    def log_test(self, name, success, details="", endpoint=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": details
            })
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "endpoint": endpoint
        })

    def make_request(self, method, endpoint, data=None, token=None, expected_status=200):
        """Make HTTP request with error handling"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if token:
            headers['Authorization'] = f'Bearer {token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            return success, response.json() if response.content else {}, response.status_code

        except requests.exceptions.RequestException as e:
            return False, {"error": str(e)}, 0
        except json.JSONDecodeError:
            return False, {"error": "Invalid JSON response"}, response.status_code

    def test_auth_signup(self):
        """Test user signup"""
        test_email = f"test_{uuid.uuid4().hex[:8]}@test.com"
        data = {
            "email": test_email,
            "password": "TestPass123!",
            "name": "Test User"
        }
        
        success, response, status = self.make_request('POST', 'auth/signup', data, expected_status=200)
        
        if success and 'token' in response:
            self.user_token = response['token']
            self.test_user_id = response['user']['id']
            self.log_test("User Signup", True, endpoint="/api/auth/signup")
            return True
        else:
            self.log_test("User Signup", False, f"Status: {status}, Response: {response}", "/api/auth/signup")
            return False

    def test_auth_login(self):
        """Test user login"""
        data = {
            "email": "admin@getgeeky.blog",
            "password": "admin123"
        }
        
        success, response, status = self.make_request('POST', 'auth/login', data, expected_status=200)
        
        if success and 'token' in response:
            self.admin_token = response['token']
            self.log_test("Admin Login", True, endpoint="/api/auth/login")
            return True
        else:
            self.log_test("Admin Login", False, f"Status: {status}, Response: {response}", "/api/auth/login")
            return False

    def test_auth_verify(self):
        """Test token verification"""
        if not self.user_token:
            self.log_test("Token Verification", False, "No user token available", "/api/auth/verify")
            return False
            
        success, response, status = self.make_request('GET', 'auth/verify', token=self.user_token)
        
        if success and 'user' in response:
            self.log_test("Token Verification", True, endpoint="/api/auth/verify")
            return True
        else:
            self.log_test("Token Verification", False, f"Status: {status}, Response: {response}", "/api/auth/verify")
            return False

    def test_forgot_password(self):
        """Test forgot password"""
        data = {"email": "test@example.com"}
        
        success, response, status = self.make_request('POST', 'auth/forgot-password', data, expected_status=200)
        
        if success and 'message' in response:
            self.log_test("Forgot Password", True, endpoint="/api/auth/forgot-password")
            return True
        else:
            self.log_test("Forgot Password", False, f"Status: {status}, Response: {response}", "/api/auth/forgot-password")
            return False

    def test_user_profile(self):
        """Test get user profile"""
        if not self.user_token:
            self.log_test("Get User Profile", False, "No user token available", "/api/user/profile")
            return False
            
        success, response, status = self.make_request('GET', 'user/profile', token=self.user_token)
        
        if success and 'email' in response:
            self.log_test("Get User Profile", True, endpoint="/api/user/profile")
            return True
        else:
            self.log_test("Get User Profile", False, f"Status: {status}, Response: {response}", "/api/user/profile")
            return False

    def test_update_interests(self):
        """Test update user interests"""
        if not self.user_token:
            self.log_test("Update Interests", False, "No user token available", "/api/user/interests")
            return False
            
        data = {"interests": ["AI Unleashed", "Dark Psychology"]}
        
        success, response, status = self.make_request('PUT', 'user/interests', data, token=self.user_token)
        
        if success and 'message' in response:
            self.log_test("Update Interests", True, endpoint="/api/user/interests")
            return True
        else:
            self.log_test("Update Interests", False, f"Status: {status}, Response: {response}", "/api/user/interests")
            return False

    def test_daily_hit(self):
        """Test get daily hit"""
        if not self.user_token:
            self.log_test("Get Daily Hit", False, "No user token available", "/api/insights/daily-hit")
            return False
            
        success, response, status = self.make_request('GET', 'insights/daily-hit', token=self.user_token)
        
        if success and 'insights' in response:
            self.log_test("Get Daily Hit", True, endpoint="/api/insights/daily-hit")
            return True
        else:
            self.log_test("Get Daily Hit", False, f"Status: {status}, Response: {response}", "/api/insights/daily-hit")
            return False

    def test_library(self):
        """Test insights library"""
        if not self.user_token:
            self.log_test("Get Library", False, "No user token available", "/api/insights/library")
            return False
            
        success, response, status = self.make_request('GET', 'insights/library', token=self.user_token)
        
        if success and 'insights' in response:
            self.log_test("Get Library", True, endpoint="/api/insights/library")
            return True
        else:
            self.log_test("Get Library", False, f"Status: {status}, Response: {response}", "/api/insights/library")
            return False

    def test_admin_insights_list(self):
        """Test admin get all insights"""
        if not self.admin_token:
            self.log_test("Admin Get Insights", False, "No admin token available", "/api/admin/insights")
            return False
            
        success, response, status = self.make_request('GET', 'admin/insights', token=self.admin_token)
        
        if success and 'insights' in response:
            self.log_test("Admin Get Insights", True, endpoint="/api/admin/insights")
            return True
        else:
            self.log_test("Admin Get Insights", False, f"Status: {status}, Response: {response}", "/api/admin/insights")
            return False

    def test_admin_create_insight(self):
        """Test admin create insight"""
        if not self.admin_token:
            self.log_test("Admin Create Insight", False, "No admin token available", "/api/admin/insights")
            return False
            
        data = {
            "title": "Test Insight",
            "category": "AI Unleashed",
            "tags": ["test", "automation"],
            "main_text": "This is a test insight created by automated testing.",
            "source_url": "https://test.com",
            "premium_only": False
        }
        
        success, response, status = self.make_request('POST', 'admin/insights', data, token=self.admin_token, expected_status=200)
        
        if success and 'id' in response:
            self.test_insight_id = response['id']
            self.log_test("Admin Create Insight", True, endpoint="/api/admin/insights")
            return True
        else:
            self.log_test("Admin Create Insight", False, f"Status: {status}, Response: {response}", "/api/admin/insights")
            return False

    def test_admin_update_insight(self):
        """Test admin update insight"""
        if not self.admin_token or not self.test_insight_id:
            self.log_test("Admin Update Insight", False, "No admin token or insight ID available", f"/api/admin/insights/{self.test_insight_id}")
            return False
            
        data = {
            "title": "Updated Test Insight",
            "main_text": "This insight has been updated by automated testing."
        }
        
        success, response, status = self.make_request('PUT', f'admin/insights/{self.test_insight_id}', data, token=self.admin_token)
        
        if success and 'message' in response:
            self.log_test("Admin Update Insight", True, endpoint=f"/api/admin/insights/{self.test_insight_id}")
            return True
        else:
            self.log_test("Admin Update Insight", False, f"Status: {status}, Response: {response}", f"/api/admin/insights/{self.test_insight_id}")
            return False

    def test_admin_analytics(self):
        """Test admin analytics"""
        if not self.admin_token:
            self.log_test("Admin Analytics", False, "No admin token available", "/api/admin/analytics")
            return False
            
        success, response, status = self.make_request('GET', 'admin/analytics', token=self.admin_token)
        
        if success and 'total_users' in response:
            self.log_test("Admin Analytics", True, endpoint="/api/admin/analytics")
            return True
        else:
            self.log_test("Admin Analytics", False, f"Status: {status}, Response: {response}", "/api/admin/analytics")
            return False

    def test_payment_checkout(self):
        """Test payment checkout session creation"""
        if not self.user_token:
            self.log_test("Payment Checkout", False, "No user token available", "/api/payments/checkout/session")
            return False
            
        data = {
            "origin_url": "https://geeky-codex.preview.emergentagent.com",
            "plan": "monthly"
        }
        
        success, response, status = self.make_request('POST', 'payments/checkout/session', data, token=self.user_token)
        
        if success and 'url' in response:
            self.log_test("Payment Checkout", True, endpoint="/api/payments/checkout/session")
            return True
        else:
            self.log_test("Payment Checkout", False, f"Status: {status}, Response: {response}", "/api/payments/checkout/session")
            return False

    def test_admin_delete_insight(self):
        """Test admin delete insight (cleanup)"""
        if not self.admin_token or not self.test_insight_id:
            self.log_test("Admin Delete Insight", False, "No admin token or insight ID available", f"/api/admin/insights/{self.test_insight_id}")
            return False
            
        success, response, status = self.make_request('DELETE', f'admin/insights/{self.test_insight_id}', token=self.admin_token)
        
        if success and 'message' in response:
            self.log_test("Admin Delete Insight", True, endpoint=f"/api/admin/insights/{self.test_insight_id}")
            return True
        else:
            self.log_test("Admin Delete Insight", False, f"Status: {status}, Response: {response}", f"/api/admin/insights/{self.test_insight_id}")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print(f"\n🚀 Starting GetGeeky Codex API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)

        # Auth Tests
        print("\n📝 Authentication Tests")
        self.test_auth_signup()
        self.test_auth_login()
        self.test_auth_verify()
        self.test_forgot_password()

        # User Tests
        print("\n👤 User Tests")
        self.test_user_profile()
        self.test_update_interests()
        self.test_daily_hit()
        self.test_library()

        # Admin Tests
        print("\n🔧 Admin Tests")
        self.test_admin_insights_list()
        self.test_admin_create_insight()
        self.test_admin_update_insight()
        self.test_admin_analytics()

        # Payment Tests
        print("\n💳 Payment Tests")
        self.test_payment_checkout()

        # Cleanup
        print("\n🧹 Cleanup")
        self.test_admin_delete_insight()

        # Results
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests ({len(self.failed_tests)}):")
            for test in self.failed_tests:
                print(f"  • {test['test']}: {test['error']}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"\n✨ Success Rate: {success_rate:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = GetGeekyCodexAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())