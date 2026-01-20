"use client"

import { useEffect, useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { searchPosts } from '@/lib/blog-utils'
import type { Post } from '@/types/blog'

export function SearchDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Post[]>([])

    // Keyboard shortcut: Cmd/Ctrl + K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleSearch = useCallback((searchQuery: string) => {
        setQuery(searchQuery)
        if (searchQuery.trim()) {
            const searchResults = searchPosts(searchQuery)
            setResults(searchResults.slice(0, 5)) // Limit to 5 results
        } else {
            setResults([])
        }
    }, [])

    if (!isOpen) {
        return (
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="relative"
                aria-label="Search"
            >
                <Search className="h-5 w-5" />
            </Button>
        )
    }

    return (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center p-4 pt-20 animate-in fade-in">
            <Card className="max-w-2xl w-full p-4 relative border-border shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search articles... (Cmd/Ctrl + K)"
                        className="flex-1 bg-transparent border-none outline-none text-lg"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        autoFocus
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={20} />
                    </Button>
                </div>

                {results.length > 0 && (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {results.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/posts/${post.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="block p-3 rounded-lg hover:bg-accent transition-colors"
                            >
                                <h3 className="font-semibold mb-1">{post.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}

                {query && results.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No results found for "{query}"
                    </div>
                )}
            </Card>
        </div>
    )
}
