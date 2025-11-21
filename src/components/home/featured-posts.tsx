import Link from "next/link"
import Image from "next/image"
import { Clock, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getFeaturedPosts } from "@/lib/blog-utils"
import { CATEGORIES } from "@/types/blog"

export function FeaturedPosts() {
    const featuredPosts = getFeaturedPosts(3)

    return (
        <section className="py-20 px-4 bg-card/30">
            <div className="container mx-auto">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
                    Featured Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post) => {
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
                                        <CardTitle className="font-display text-xl group-hover:text-neon-cyan transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardHeader>

                                    {/* Meta */}
                                    <CardContent>
                                        <div className="flex gap-4 text-sm text-muted">
                                            <span className="flex items-center gap-1">
                                                <Clock size={16} />
                                                {post.readTime} min
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
