'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Heading {
    id: string
    text: string
    level: number
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        // Extract headings from the article
        const article = document.querySelector('.article-content')
        if (!article) return

        const headingElements = article.querySelectorAll('h2, h3')
        const headingData: Heading[] = Array.from(headingElements).map((heading) => ({
            id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
            text: heading.textContent || '',
            level: parseInt(heading.tagName.substring(1)),
        }))

        // Add IDs to headings if they don't have them
        headingElements.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = headingData[index].id
            }
        })

        setHeadings(headingData)

        // Track active heading on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-100px 0px -80% 0px' }
        )

        headingElements.forEach((heading) => observer.observe(heading))

        return () => observer.disconnect()
    }, [])

    if (headings.length === 0) return null

    return (
        <div className="hidden xl:block sticky top-24 w-64 ml-8">
            <div className="border border-border rounded-lg p-4 bg-card/50 backdrop-blur-sm">
                <h3 className="font-display font-bold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                    Table of Contents
                </h3>
                <nav>
                    <ul className="space-y-2 text-sm">
                        {headings.map((heading) => (
                            <li
                                key={heading.id}
                                className={heading.level === 3 ? 'ml-4' : ''}
                            >
                                <a
                                    href={`#${heading.id}`}
                                    className={`block py-1 transition-colors hover:text-neon-cyan ${activeId === heading.id
                                            ? 'text-neon-cyan font-semibold'
                                            : 'text-muted-foreground'
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        document.getElementById(heading.id)?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        })
                                    }}
                                >
                                    <span className="flex items-center gap-1">
                                        {activeId === heading.id && (
                                            <ChevronRight size={14} className="text-neon-cyan" />
                                        )}
                                        {heading.text}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
