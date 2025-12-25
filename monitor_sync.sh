#!/bin/bash

# GetGeeky Codex - Sync Monitoring Dashboard
# Real-time monitoring of blog sync operations

BACKEND_URL="https://geeky-codex.preview.emergentagent.com"
ADMIN_EMAIL="admin@getgeeky.blog"
ADMIN_PASSWORD="admin123"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║   GetGeeky Codex - Sync Monitoring Dashboard  ║"
echo "╔════════════════════════════════════════════════╗"
echo ""

# Get auth token
echo "🔐 Authenticating..."
TOKEN=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | \
  python3 -c "import sys,json;print(json.load(sys.stdin)['token'])" 2>/dev/null)

if [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ Authentication failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Authenticated${NC}"
echo ""

# Fetch sync history
echo "📊 Fetching sync history..."
HISTORY=$(curl -s -X GET "$BACKEND_URL/api/admin/sync-history" \
  -H "Authorization: Bearer $TOKEN")

echo ""
echo "═══════════════════════════════════════════════"
echo "  SYNC OPERATIONS HISTORY"
echo "═══════════════════════════════════════════════"
echo ""

# Parse and display history
echo "$HISTORY" | python3 << 'PYTHON_SCRIPT'
import sys
import json
from datetime import datetime

try:
    data = json.load(sys.stdin)
    history = data.get('history', [])
    
    if not history:
        print("  📭 No sync operations recorded yet")
        print("")
        print("  💡 Tip: Click 'Sync Blog Posts' in admin panel")
        print("     or wait for automatic sync (every 6 hours)")
        sys.exit(0)
    
    # Status icons
    icons = {
        'success': '✅',
        'failed': '❌'
    }
    
    # Trigger colors (bash color codes)
    trigger_colors = {
        'manual': '\033[0;35m',    # Purple
        'webhook': '\033[0;36m',   # Cyan
        'cron': '\033[0;32m'       # Green
    }
    
    trigger_labels = {
        'manual': 'MANUAL',
        'webhook': 'WEBHOOK',
        'cron': 'SCHEDULED'
    }
    
    print(f"  Total Operations: {len(history)}")
    print("")
    
    for i, sync in enumerate(history, 1):
        status = sync.get('status', 'unknown')
        trigger = sync.get('triggered_by', 'unknown')
        timestamp = sync.get('timestamp', '')
        duration = sync.get('duration_seconds', 0)
        
        # Parse timestamp
        if timestamp:
            dt = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
            time_str = dt.strftime('%b %d, %Y %H:%M:%S')
        else:
            time_str = 'Unknown time'
        
        # Status line
        icon = icons.get(status, '❓')
        status_text = status.upper()
        
        trigger_color = trigger_colors.get(trigger, '')
        trigger_label = trigger_labels.get(trigger, trigger.upper())
        reset_color = '\033[0m'
        
        print(f"  {i}. {icon} Sync {status_text}")
        print(f"     Trigger: {trigger_color}[{trigger_label}]{reset_color}")
        print(f"     Time: {time_str}")
        print(f"     Duration: {duration}s")
        
        if status == 'success':
            synced = sync.get('synced_count', 0)
            updated = sync.get('updated_count', 0)
            total = sync.get('total_files', 0)
            print(f"     Results: {synced} new, {updated} updated, {total} total")
            
            errors = sync.get('errors', [])
            if errors:
                print(f"     ⚠️  Warnings: {len(errors)}")
        elif status == 'failed':
            error = sync.get('error', 'Unknown error')
            print(f"     ❌ Error: {error}")
        
        print("")

except json.JSONDecodeError:
    print("  ❌ Failed to parse sync history")
except Exception as e:
    print(f"  ❌ Error: {e}")
PYTHON_SCRIPT

echo "═══════════════════════════════════════════════"
echo "  CONFIGURATION STATUS"
echo "═══════════════════════════════════════════════"
echo ""

# Check scheduler status
echo -e "  ${CYAN}⏰ Automatic Sync:${NC}"
SCHEDULER_LOG=$(tail -10 /var/log/supervisor/backend.err.log 2>/dev/null | grep -i "Scheduler started")
if [ ! -z "$SCHEDULER_LOG" ]; then
    INTERVAL=$(echo "$SCHEDULER_LOG" | grep -oP 'every \K\d+' | tail -1)
    echo -e "     ${GREEN}✓ Enabled${NC} - Running every ${INTERVAL} hours"
    
    # Calculate next sync time
    CURRENT_HOUR=$(date +%H)
    NEXT_SYNC=$(( ($CURRENT_HOUR / $INTERVAL + 1) * $INTERVAL ))
    if [ $NEXT_SYNC -ge 24 ]; then
        NEXT_SYNC=$(($NEXT_SYNC - 24))
    fi
    echo "     Next automatic sync: ~${NEXT_SYNC}:00 (approximately)"
else
    echo -e "     ${YELLOW}⚠ Status unknown${NC} - Check backend logs"
fi

echo ""
echo -e "  ${CYAN}🔗 Webhook:${NC}"
echo "     Endpoint: $BACKEND_URL/api/webhook/github-blog"
echo "     Secret: getgeeky_codex_webhook_secret_2025"
echo ""
echo "     Setup instructions:"
echo "     → https://github.com/getgeekyofficial/codex-blog/settings/hooks"
echo "     → Add webhook with URL above"

echo ""
echo "═══════════════════════════════════════════════"
echo "  QUICK ACTIONS"
echo "═══════════════════════════════════════════════"
echo ""

echo "  📝 View detailed logs:"
echo "     tail -f /var/log/supervisor/backend.out.log | grep sync"
echo ""

echo "  🔄 Trigger manual sync:"
echo "     curl -X POST $BACKEND_URL/api/admin/sync-blog \\"
echo "       -H \"Authorization: Bearer YOUR_TOKEN\""
echo ""

echo "  🔧 Adjust sync interval:"
echo "     Edit /app/backend/.env → SYNC_INTERVAL_HOURS"
echo "     Then: sudo supervisorctl restart backend"
echo ""

echo "  📊 View sync history in UI:"
echo "     Login → Admin Dashboard → Manage Insights → History icon (⏱️)"
echo ""

echo "═══════════════════════════════════════════════"
echo ""
