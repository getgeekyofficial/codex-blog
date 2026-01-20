import { getAllPosts } from '@/lib/blog-utils'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, TrendingUp } from 'lucide-react'

export function PopularPosts({ limit = 5 }: { limit?: number }) {
    const allPosts = getAllPosts()

    // Sort by views (descending) and take top posts
    const popularPosts = allPosts
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, limit)

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-neon-cyan" />
                <h3 className="font-display text-xl font-bold">Popular Posts</h3>
            </div>

            <div className="space-y-3">
                {popularPosts.map((post, index) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <Card className="overflow-hidden border-border hover:border-neon-cyan transition-all duration-300 cursor-pointer group">
                            <div className="flex gap-3 p-3">
                                <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="80px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-cyan/20 text-neon-cyan flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-neon-cyan transition-colors">
                                                {post.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                <Clock size={12} />
                                                <span>{post.readTime} min</span>
                                                {post.views && post.views > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{post.views.toLocaleString()} views</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
