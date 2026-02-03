import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog-utils'

export async function GET() {
    const posts = getAllPosts()

    // Return simplified data for search
    const searchData = posts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        date: post.date,
        researchLevel: post.researchLevel,
    }))

    return NextResponse.json(searchData)
}
