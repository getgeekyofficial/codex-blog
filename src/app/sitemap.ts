import { MetadataRoute } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog-utils'
import { getAllPillars } from '@/lib/pillar-utils'
import { CATEGORIES } from '@/types/blog'

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

    // Categories
    const categories = Object.keys(CATEGORIES).map((catId) => ({
        url: `${baseUrl}/category/${catId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Tags
    const tags = getAllTags().map((tag) => ({
        url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }))

    // Guides (Pillar Pages)
    const guides = getAllPillars().map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [...routes, ...categories, ...tags, ...posts, ...guides]
}
