"use client"

import { useState, useEffect, useCallback } from 'react'
import { Search, X, FileText, Calendar, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SearchResult {
    slug: string
    title: string
    excerpt: string
    category: string
    date: string
    researchLevel?: string
}

export function SiteSearch() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [allPosts, setAllPosts] = useState<SearchResult[]>([])
    const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null)
    const router = useRouter()

    // Load all posts on mount
    useEffect(() => {
        fetch('/api/search/posts')
            .then(res => res.json())
            .then(data => {
                setAllPosts(data)
                const fuseInstance = new Fuse<SearchResult>(data as SearchResult[], {
                    keys: ['title', 'excerpt', 'category'],
                    threshold: 0.3,
                    includeScore: true,
                })
                setFuse(fuseInstance)
            })
    }, [])

    // Keyboard shortcut (Cmd+K or Ctrl+K)
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    // Search logic
    useEffect(() => {
        if (!fuse || !query.trim()) {
            setResults([])
            return
        }
        const searchResults = fuse.search(query).slice(0, 8)
        setResults(searchResults.map(r => r.item))
    }, [query, fuse])

    const handleSelect = (slug: string) => {
        setIsOpen(false)
        setQuery('')
        router.push(`/posts/${slug}`)
    }

    if (!isOpen) {
        return (
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="gap-2 text-muted-foreground hover:text-foreground hidden md:flex"
            >
                <Search size={16} />
                <span className="text-xs">Search...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
        )
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Search Modal */}
            <div className="fixed left-1/2 top-1/4 z-50 w-full max-w-2xl -translate-x-1/2 rounded-lg border border-border bg-card shadow-2xl">
                {/* Input */}
                <div className="flex items-center border-b border-border px-4">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                        className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                        placeholder="Search articles..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 p-0"
                    >
                        <X size={16} />
                    </Button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto p-2">
                    {query.trim() && results.length === 0 && (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                            No results found for "{query}"
                        </div>
                    )}
                    {results.map((post) => (
                        <button
                            key={post.slug}
                            onClick={() => handleSelect(post.slug)}
                            className="group flex w-full items-start gap-3 rounded-md p-3 text-left hover:bg-accent"
                        >
                            <FileText className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" />
                            <div className="flex-1 space-y-1">
                                <div className="font-medium group-hover:text-neon-cyan transition-colors">
                                    {post.title}
                                </div>
                                <div className="text-xs text-muted-foreground line-clamp-2">
                                    {post.excerpt}
                                </div>
                                <div className="flex gap-2 text-xs text-muted-foreground">
                                    <span className="text-neon-purple">{post.category}</span>
                                    <Calendar size={12} className="inline" />
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-border p-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between px-2">
                        <span>Navigate with ↑ ↓</span>
                        <span>ESC to close</span>
                    </div>
                </div>
            </div>
        </>
    )
}
