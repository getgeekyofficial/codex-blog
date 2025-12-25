#!/bin/bash

# GetGeeky Codex - Webhook Test Script
# This script simulates a GitHub push webhook to test your configuration

echo "🔧 Testing GetGeeky Codex GitHub Webhook..."
echo ""

# Configuration
WEBHOOK_URL="https://geeky-codex.preview.emergentagent.com/api/webhook/github-blog"
WEBHOOK_SECRET="getgeeky_codex_webhook_secret_2025"

# Sample GitHub push payload
PAYLOAD='{
  "ref": "refs/heads/main",
  "commits": [
    {
      "added": ["content/posts/test-post.mdx"],
      "modified": [],
      "removed": []
    }
  ],
  "repository": {
    "name": "codex-blog",
    "full_name": "getgeekyofficial/codex-blog"
  }
}'

# Calculate signature (GitHub uses HMAC SHA256)
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" | sed 's/^.* //')

echo "📤 Sending test webhook..."
echo "URL: $WEBHOOK_URL"
echo ""

# Send webhook request
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: sha256=$SIGNATURE" \
  -H "X-GitHub-Event: push" \
  -d "$PAYLOAD")

# Extract HTTP status and response body
HTTP_BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')
HTTP_STATUS=$(echo "$RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

echo "📥 Response:"
echo "$HTTP_BODY" | python3 -m json.tool 2>/dev/null || echo "$HTTP_BODY"
echo ""

# Check status
if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ Webhook test PASSED! (HTTP $HTTP_STATUS)"
    echo ""
    echo "🎉 Your webhook is configured correctly!"
    echo "📋 Next steps:"
    echo "   1. Go to GitHub: https://github.com/getgeekyofficial/codex-blog/settings/hooks"
    echo "   2. Add webhook with the URL above"
    echo "   3. Make a real commit to content/posts/ to trigger it"
    echo "   4. Check Admin → Sync History to see the webhook event"
else
    echo "❌ Webhook test FAILED! (HTTP $HTTP_STATUS)"
    echo ""
    echo "🔍 Troubleshooting tips:"
    echo "   - Check if backend is running: sudo supervisorctl status backend"
    echo "   - Verify webhook secret matches in backend/.env"
    echo "   - Check backend logs: tail -f /var/log/supervisor/backend.out.log"
fi

echo ""
echo "📊 To view sync history:"
echo "   Login as admin and go to: Admin → Manage Insights → History icon"
