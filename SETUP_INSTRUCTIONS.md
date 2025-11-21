# Setup Instructions - Get Geeky Blog

## Prerequisites Installation

Before we can build the Next.js application, you need to install Node.js and npm.

### Step 1: Install Node.js

1. **Download Node.js**:
   - Visit: https://nodejs.org/
   - Download the **LTS version** (Long Term Support) - currently v20.x
   - Choose the Windows installer (.msi)

2. **Run the Installer**:
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - **Important**: Make sure "Add to PATH" is checked
   - Complete the installation

3. **Verify Installation**:
   - Open a **NEW** PowerShell window (important: must be new)
   - Run: `node --version`
   - Should show: `v20.x.x` or similar
   - Run: `npm --version`
   - Should show: `10.x.x` or similar

### Step 2: After Node.js is Installed

Once Node.js is installed, I can proceed with:

1. **Initialize Next.js Project**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

---

## What I'll Build

Once Node.js is installed, I will create:

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Markdown + Git
- **Email**: ConvertKit integration
- **Search**: Algolia
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel
- **Domain**: getgeeky.blog

### Features
✅ Modern dark theme with your logo  
✅ Homepage with hero, pillar cards, newsletter signup  
✅ Dynamic article pages with reading progress  
✅ Search functionality  
✅ Contact form  
✅ SEO optimization  
✅ Mobile responsive  
✅ WCAG 2.1 AA accessibility  
✅ Automated testing  

---

## Next Steps

**Please install Node.js using the instructions above, then let me know when it's ready!**

Once installed, I'll:
1. Initialize the Next.js project
2. Set up the component library
3. Build all pages and features
4. Configure deployment to Vercel
5. Connect your domain (getgeeky.blog)

Estimated build time: 4-6 hours of development work.
