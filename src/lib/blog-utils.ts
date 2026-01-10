import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Post, Category } from '@/types/blog'
import { cache } from 'react'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export const getAllPosts = cache((): Post[] => {
    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPosts = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const slug = fileName.replace(/\.mdx$/, '')
            return getPostBySlug(slug)
        })
        .filter((post): post is Post => post !== null)
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

    return allPosts
})

export const getPostBySlug = cache((slug: string): Post | null => {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`)

        if (!fs.existsSync(fullPath)) {
            return null
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const { minutes } = readingTime(content)

        return {
            slug,
            title: data.title,
            excerpt: data.excerpt,
            category: data.category,
            date: data.date,
            author: data.author,
            image: data.image,
            tags: data.tags || [],
            featured: data.featured || false,
            views: data.views || 0,
            content,
            readTime: Math.ceil(minutes)
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Error reading post ${slug}:`, error)
        }
        return null
    }
})

export function getPostsByCategory(category: Category): Post[] {
    const allPosts = getAllPosts()
    return allPosts.filter(post => post.category === category)
}

export function getFeaturedPosts(limit: number = 3): Post[] {
    const allPosts = getAllPosts()
    const featured = allPosts.filter(post => post.featured)

    // If we have featured posts, return them, otherwise return the latest posts
    if (featured.length >= limit) {
        return featured.slice(0, limit)
    }

    return allPosts.slice(0, limit)
}

export function getRelatedPosts(currentSlug: string, category: Category, limit: number = 3): Post[] {
    const categoryPosts = getPostsByCategory(category)
    return categoryPosts
        .filter(post => post.slug !== currentSlug)
        .slice(0, limit)
}

export function searchPosts(query: string): Post[] {
    if (!query.trim()) {
        return []
    }

    const allPosts = getAllPosts()
    const lowerQuery = query.toLowerCase()

    return allPosts.filter(post => {
        const searchableText = `
      ${post.title}
      ${post.excerpt}
      ${post.tags.join(' ')}
      ${post.content}
    `.toLowerCase()

        return searchableText.includes(lowerQuery)
    })
}

export function getAllTags(): string[] {
    const allPosts = getAllPosts()
    const tagsSet = new Set<string>()

    allPosts.forEach(post => {
        post.tags.forEach(tag => tagsSet.add(tag))
    })

    return Array.from(tagsSet).sort()
}
