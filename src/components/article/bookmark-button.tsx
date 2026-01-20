"use client"

import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface BookmarkButtonProps {
    slug: string
    title: string
}

export function BookmarkButton({ slug, title }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        // Check if article is bookmarked
        const bookmarks = getBookmarks()
        setIsBookmarked(bookmarks.some(b => b.slug === slug))
    }, [slug])

    const toggleBookmark = () => {
        const bookmarks = getBookmarks()

        if (isBookmarked) {
            // Remove bookmark
            const updated = bookmarks.filter(b => b.slug !== slug)
            localStorage.setItem('bookmarks', JSON.stringify(updated))
            setIsBookmarked(false)
            toast({
                title: "Bookmark removed",
                description: "Article removed from your reading list",
            })
        } else {
            // Add bookmark
            const updated = [...bookmarks, { slug, title, timestamp: Date.now() }]
            localStorage.setItem('bookmarks', JSON.stringify(updated))
            setIsBookmarked(true)
            toast({
                title: "Bookmarked!",
                description: "Article saved to your reading list",
            })
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            className="relative"
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
        >
            {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-neon-cyan" />
            ) : (
                <Bookmark className="h-5 w-5" />
            )}
        </Button>
    )
}

function getBookmarks(): Array<{ slug: string; title: string; timestamp: number }> {
    if (typeof window === 'undefined') return []

    try {
        const stored = localStorage.getItem('bookmarks')
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}
