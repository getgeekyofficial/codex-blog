'use client'

import { useState, useMemo } from 'react'
import { Post, CATEGORIES } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AllPostsClientProps {
    posts: Post[]
}

export function AllPostsClient({ posts }: AllPostsClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const filteredPosts = useMemo(() => {
        let filtered = posts

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory)
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            )
        }

        return filtered
    }, [posts, searchQuery, selectedCategory])

    return (
        <>
            {/* Filters */}
            <div className="border-b border-border bg-card/30">
                <div className="container mx-auto px-4 py-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                onClick={() => setSelectedCategory('all')}
                            >
                                All
                            </Button>
                            {Object.entries(CATEGORIES).map(([id, info]) => (
                                <Button
                                    key={id}
                                    variant={selectedCategory === id ? 'default' : 'outline'}
                                    onClick={() => setSelectedCategory(id)}
                                >
                                    {info.title}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-muted">
                        Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">No articles found.</p>
                        <p className="text-muted mt-2">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => {
                            const categoryInfo = CATEGORIES[post.category]
                            return (
                                <Link key={post.slug} href={`/posts/${post.slug}`}>
                                    <Card className="group h-full overflow-hidden border-border hover:border-neon-cyan transition-all duration-300 hover:card-glow-hover cursor-pointer">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-neon-cyan/20 backdrop-blur-sm border border-neon-cyan/50 rounded-full text-xs font-semibold text-neon-cyan">
                                                    {categoryInfo.title}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <CardHeader>
                                            <CardTitle className="font-display text-xl group-hover:text-neon-cyan transition-colors line-clamp-2">
                                                {post.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-3">
                                                {post.excerpt}
                                            </CardDescription>
                                        </CardHeader>

                                        {/* Meta */}
                                        <CardContent>
                                            <div className="flex gap-4 text-sm text-muted">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {post.readTime} min read
                                                </span>
                                                <span>
                                                    {new Date(post.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}
