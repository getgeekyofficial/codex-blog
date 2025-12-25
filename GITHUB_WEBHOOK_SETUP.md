# GitHub Webhook Setup Guide for GetGeeky Codex

## 🎯 Goal
Configure GitHub to automatically sync your blog posts to GetGeeky Codex whenever you push new content.

---

## 📝 Step 1: Configure GitHub Webhook

### Navigate to Repository Settings
1. Go to: https://github.com/getgeekyofficial/codex-blog/settings/hooks
2. Click **"Add webhook"** button (green button on the right)

### Webhook Configuration

**Payload URL:**
```
https://geeky-codex.preview.emergentagent.com/api/webhook/github-blog
```

**Content type:**
- Select: `application/json`

**Secret:**
```
getgeeky_codex_webhook_secret_2025
```

**Which events would you like to trigger this webhook?**
- Select: ☑️ **"Just the push event"**
- (This ensures it only triggers when you push code, not on every action)

**Active:**
- Ensure: ☑️ **"Active"** is checked

### Save
Click **"Add webhook"** button at the bottom

---

## ✅ Step 2: Test the Webhook

### Method 1: GitHub UI Test
1. After adding webhook, go back to: https://github.com/getgeekyofficial/codex-blog/settings/hooks
2. Click on your webhook URL
3. Scroll down to **"Recent Deliveries"**
4. Click **"Redeliver"** on any past delivery (or wait for next push)
5. Check response status (should be 200 OK)

### Method 2: Make a Test Commit
1. Edit any file in `content/posts/` directory (even a small change)
2. Commit and push to main branch
3. Check Admin Sync History in Codex app
4. You should see a new entry with **"Webhook"** badge

### Expected Webhook Response
```json
{
  "status": "success",
  "message": "Blog sync completed",
  "synced": 0,
  "updated": 1,
  "total_files": 12,
  "errors": []
}
```

---

## 📊 Step 3: Monitor Sync History

### Access Sync History
1. Login as admin: `admin@getgeeky.blog` / `admin123`
2. Navigate to: **Admin Dashboard → Manage Insights**
3. Click the **History icon (⏱️)** next to "Sync Blog Posts" button
4. OR directly go to: `/admin/sync-history`

### What You'll See
Each sync record shows:
- ✅ **Status**: Success (green) or Failed (red)
- 🏷️ **Trigger Type**:
  - **MANUAL** (purple) - Admin clicked "Sync Blog Posts"
  - **SCHEDULED** (green) - Automatic cron job (every 6 hours)
  - **WEBHOOK** (cyan) - GitHub push event
- 📈 **Stats**: New posts, Updated posts, Total files
- ⏱️ **Duration**: How long the sync took
- 📅 **Timestamp**: When the sync occurred
- ⚠️ **Errors**: Any issues encountered

### Last Sync Indicator
- On the **Manage Insights** page, you'll see: `Last sync: X minutes ago`
- Shows quick stats: `0 new, 12 updated`
- This updates after each sync

---

## ⚙️ Step 4: Adjust Sync Interval

### Current Settings
- **Default interval**: 6 hours
- **Configuration file**: `/app/backend/.env`
- **Environment variable**: `SYNC_INTERVAL_HOURS="6"`

### Change Sync Interval

#### Option A: Common Intervals
Edit `/app/backend/.env`:

**Every 3 hours (8 times daily):**
```env
SYNC_INTERVAL_HOURS="3"
```

**Every 12 hours (2 times daily):**
```env
SYNC_INTERVAL_HOURS="12"
```

**Once daily (24 hours):**
```env
SYNC_INTERVAL_HOURS="24"
```

**Every hour (for frequent updates):**
```env
SYNC_INTERVAL_HOURS="1"
```

#### Option B: Disable Automatic Sync
If you prefer **manual-only or webhook-only** sync:
```env
SYNC_INTERVAL_HOURS="0"
```

### Apply Changes
After editing `.env`:
```bash
sudo supervisorctl restart backend
```

### Verify New Schedule
Check backend logs:
```bash
tail -f /var/log/supervisor/backend.err.log | grep Scheduler
```

Should show:
```
INFO - Scheduler started: Blog sync every X hours
```

---

## 🔍 Troubleshooting

### Webhook Not Triggering

**1. Check GitHub Webhook Deliveries**
- Go to: https://github.com/getgeekyofficial/codex-blog/settings/hooks
- Click your webhook
- Check "Recent Deliveries" section
- Look for red X (failed) or green ✓ (success)

**2. Verify Webhook Secret**
- Ensure secret in GitHub matches: `getgeeky_codex_webhook_secret_2025`
- Check backend logs for "Invalid signature" errors

**3. Check Webhook URL**
- Must be: `https://geeky-codex.preview.emergentagent.com/api/webhook/github-blog`
- Ensure `/api/` prefix is included

**4. Verify Branch Name**
- Webhook only triggers on `main` branch
- If your default branch is `master`, update backend `GITHUB_BRANCH` in `.env`

**5. Check File Paths**
- Only triggers if changes in `content/posts/*.mdx`
- Changes to other files won't trigger sync

### View Backend Logs
```bash
# Check webhook processing
tail -f /var/log/supervisor/backend.out.log | grep webhook

# Check sync operations
tail -f /var/log/supervisor/backend.out.log | grep sync

# Check for errors
tail -f /var/log/supervisor/backend.err.log
```

### Manual Sync Always Works
If webhook fails, you can always:
1. Go to Admin → Manage Insights
2. Click **"Sync Blog Posts"** button
3. This will immediately sync all posts

---

## 📈 Best Practices

### Recommended Configuration

**For Active Blogging (2-3 posts/week):**
- ✅ Enable GitHub webhook (instant updates)
- ✅ Scheduled sync: Every 12 hours (backup)

**For Occasional Blogging (1 post/week):**
- ✅ Scheduled sync: Every 6 hours
- ⚠️ Webhook: Optional

**For Frequent Updates (daily posts):**
- ✅ GitHub webhook: Essential
- ✅ Scheduled sync: Every 24 hours (backup)

### Monitoring Strategy
1. **Check sync history weekly** to ensure automatic syncs are working
2. **Review errors** if any posts fail to sync
3. **Verify new posts** appear in Daily Hits for users
4. **Monitor duration** - should complete in 1-3 seconds

---

## 🚀 Workflow After Setup

### Your New Publishing Flow
1. **Write blog post** in `/content/posts/your-post.mdx`
2. **Commit and push** to GitHub main branch
3. **GitHub webhook fires** → Codex syncs automatically (instant)
4. **OR wait** for scheduled sync (6 hours)
5. **Check sync history** to confirm
6. **Posts appear** in Daily Hits for users immediately

### Zero Manual Work Required!
Once configured, your content pipeline is fully automated:
```
Blog Post → GitHub Push → Auto Sync → Daily Hits → Users
```

---

## 📞 Support

### If Webhook Fails
1. Check **Recent Deliveries** in GitHub webhook settings
2. Review **Sync History** in Codex admin panel
3. Check backend logs for errors
4. Use manual sync as fallback

### Environment Variables Reference
```env
# GitHub Repository
GITHUB_REPO="getgeekyofficial/codex-blog"
GITHUB_BRANCH="main"
CONTENT_PATH="content/posts"

# Sync Configuration
SYNC_INTERVAL_HOURS="6"
GITHUB_WEBHOOK_SECRET="getgeeky_codex_webhook_secret_2025"
```

---

## ✨ Success Indicators

You'll know everything is working when:
- ✅ GitHub webhook shows green ✓ in Recent Deliveries
- ✅ Sync history shows "WEBHOOK" or "SCHEDULED" entries
- ✅ "Last sync: X minutes ago" updates automatically
- ✅ New blog posts appear in Codex within seconds/hours
- ✅ Users receive new insights in their Daily Hits

**That's it! Your automated blog sync is now complete!** 🎉
