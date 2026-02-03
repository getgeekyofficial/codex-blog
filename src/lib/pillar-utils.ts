import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Pillar } from '@/types/pillar'
import { cache } from 'react'

const guidesDirectory = path.join(process.cwd(), 'content/guides')

export const getAllPillars = cache((): Pillar[] => {
    // Ensure directory exists
    if (!fs.existsSync(guidesDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(guidesDirectory)
    const allPillars = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const slug = fileName.replace(/\.mdx$/, '')
            return getPillarBySlug(slug)
        })
        .filter((pillar): pillar is Pillar => pillar !== null)
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

    return allPillars
})

export const getPillarBySlug = cache((slug: string): Pillar | null => {
    try {
        const fullPath = path.join(guidesDirectory, `${slug}.mdx`)

        if (!fs.existsSync(fullPath)) {
            return null
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug,
            title: data.title,
            description: data.description,
            date: data.date,
            image: data.image,
            chapters: data.chapters || [],
            content
        }
    } catch (error) {
        console.error(`Error reading pillar ${slug}:`, error)
        return null
    }
})
