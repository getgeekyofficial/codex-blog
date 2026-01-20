# Get Geeky Blog - Next-Level Enhancements

A comprehensive modern blog platform with advanced features for content discovery, engagement, and performance.

## 🚀 Features

### Core UX Enhancements
- **Theme System**: Dark/light/system mode with persistent preferences
- **Reading Progress**: Enhanced progress bar with time remaining indicator
- **Font Size Control**: Accessibility feature for adjustable article text
- **Bookmark System**: Save articles for later reading with dedicated bookmarks page
- **Enhanced Sharing**: Floating sticky share buttons with multiple platforms (Twitter, Facebook, LinkedIn, Reddit, Email)

### Content Discovery & SEO
- **Dynamic OG Images**: Auto-generated Open Graph images for social sharing
- **Structured Data**: JSON-LD schemas for articles, breadcrumbs, and organization
- **Advanced Search**: Full-text search with keyboard shortcut (Cmd/Ctrl+K)
- **Tag System**: Tag cloud visualization and individual tag pages
- **Smart Related Posts**: Algorithm-based recommendations using tags, category, and popularity
- **RSS Feed**: Full-featured RSS 2.0 feed at `/feed.xml`
- **Breadcrumb Navigation**: Improved navigation and SEO

### Engagement Features
- **Reaction System**: 6 emoji reactions (Like, Insightful, Fire, Love, Wow, On Point)
- **Text Highlighter**: Select text to share quotes on Twitter or copy
- **Popular Posts Widget**: Trending articles with view counts
- **Exit Intent Popup**: Newsletter signup prompt on exit
- **Comments**: Disqus integration for community discussions

### Performance Optimizations
- **ISR**: Incremental Static Regeneration with 1-hour revalidation
- **Image Optimization**: AVIF/WebP formats with optimized sizes
- **Code Splitting**: Optimized bundle sizes and lazy loading
- **Caching Headers**: Aggressive caching for static assets
- **Console Removal**: Production builds strip console logs

### Monetization
- **Membership Tiers**: Multi-level subscription system with Stripe
- **Donation Button**: Support the blog with one-time donations
- **Affiliate Disclosure**: Transparent affiliate link management

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0.5 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Content**: MDX with remark plugins
- **Analytics**: Vercel Analytics & Speed Insights
- **Payments**: Stripe integration
- **Email**: ConvertKit for newsletters

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🔨 Build

```bash
npm run build
npm start
```

## 📝 Content Management

Articles are stored as MDX files in `content/posts/`. Each article includes:

- Frontmatter metadata (title, excerpt, category, date, author, image, tags)
- MDX content with support for custom components
- Auto-generated reading time
- View tracking

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  neon: {
    cyan: '#00ffff',
    magenta: '#ff00ff',
    purple: '#9d00ff',
  },
}
```

### Categories

Update `src/types/blog.ts` to add or modify content categories.

## 🔐 Environment Variables

Create a `.env.local` file:

```env
# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
STRIPE_SECRET_KEY=your_secret

# ConvertKit (for newsletter)
CONVERTKIT_API_KEY=your_key
CONVERTKIT_FORM_ID=your_form_id

# Disqus (for comments)
NEXT_PUBLIC_DISQUS_SHORTNAME=your_shortname
```

## 📊 Analytics

The site includes:
- Vercel Analytics for page views
- Vercel Speed Insights for performance monitoring
- Custom view tracking for articles
- Reaction tracking via localStorage

## 🚀 Deployment

Deploy to Vercel:

```bash
vercel
```

Or use the Vercel GitHub integration for automatic deployments.

## 📄 License

MIT License - feel free to use this project for your own blog!

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact

- Email: getgeekyofficial@gmail.com
- Twitter: [@getgeekyHQ](https://twitter.com/getgeekyHQ)
- YouTube: [@getgeekyofficial](https://youtube.com/@getgeekyofficial)

---

Built with ❤️ by the Get Geeky Team
