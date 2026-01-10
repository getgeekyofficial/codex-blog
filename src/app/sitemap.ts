import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-utils'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://getgeeky.blog'

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/all-posts',
        '/privacy',
        '/terms',
        '/membership',
        '/ascension',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : route === '/membership' ? 0.9 : 0.8,
    }))

    // Dynamic blog posts
    const posts = getAllPosts().map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...posts]
}
