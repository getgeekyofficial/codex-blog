import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Protocol, StatType } from '@/types/blog'
import { cache } from 'react'

const protocolsDirectory = path.join(process.cwd(), 'content/ascension')

export const getAllProtocols = cache((): Protocol[] => {
    // Ensure directory exists
    if (!fs.existsSync(protocolsDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(protocolsDirectory)
    const allProtocols = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const slug = fileName.replace(/\.mdx$/, '')
            return getProtocolBySlug(slug)
        })
        .filter((protocol): protocol is Protocol => protocol !== null)
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

    return allProtocols
})

export const getProtocolBySlug = cache((slug: string): Protocol | null => {
    try {
        const fullPath = path.join(protocolsDirectory, `${slug}.mdx`)

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
            stat: data.stat,
            date: data.date,
            xp: data.xp || '100 XP',
            tier: data.tier || 'Novice',
            image: data.image || '/images/protocols/default.jpg',
            requires: data.requires,
            author: data.author,
            featured: data.featured || false,
            views: data.views || 0,
            content,
            readTime: Math.ceil(minutes)
        }
    } catch (error) {
        console.error(`Error reading protocol ${slug}:`, error)
        return null
    }
})

export function getProtocolsByStat(stat: StatType): Protocol[] {
    const allProtocols = getAllProtocols()
    return allProtocols.filter(protocol => protocol.stat === stat)
}

export function searchProtocols(query: string): Protocol[] {
    if (!query.trim()) {
        return []
    }

    const allProtocols = getAllProtocols()
    const lowerQuery = query.toLowerCase()

    return allProtocols.filter(protocol => {
        const searchableText = `
      ${protocol.title}
      ${protocol.excerpt}
      ${protocol.stat}
      ${protocol.content}
    `.toLowerCase()

        return searchableText.includes(lowerQuery)
    })
}
