import { Post } from '@/types/blog'
import { PillarChapter } from '@/types/pillar'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Clock } from 'lucide-react'

export function ChapterSection({ chapter, posts }: { chapter: PillarChapter, posts: Post[] }) {
    return (
        <section id={chapter.id} className="py-20 relative">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neon-purple text-neon-purple font-mono text-sm">
                        {chapter.id}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold">{chapter.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl ml-12">
                    {chapter.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 md:ml-12">
                {posts.map(post => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} className="group h-full">
                        <Card className="h-full bg-card/50 border-border hover:border-neon-cyan transition-all duration-300 overflow-hidden">
                            <div className="flex flex-col h-full">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <CardHeader className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${post.researchLevel === 'evidence-backed' ? 'border-neon-cyan text-neon-cyan' :
                                                post.researchLevel === 'speculative' ? 'border-neon-magenta text-neon-magenta' :
                                                    'border-white/20 text-muted-foreground'
                                            }`}>
                                            {post.researchLevel?.toUpperCase() || 'ARTICLE'}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock size={12} /> {post.readTime} min
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-neon-cyan transition-colors">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-sm font-semibold text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                        Read Article <ArrowRight className="ml-2 w-4 h-4" />
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
