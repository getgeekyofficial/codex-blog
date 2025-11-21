import { getPostsByCategory, getAllPosts } from '@/lib/blog-utils'
import { CATEGORIES, Category } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
    return Object.keys(CATEGORIES).map((category) => ({
        id: category,
    }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const categoryInfo = CATEGORIES[params.id as Category]

    if (!categoryInfo) {
        return {
            title: 'Category Not Found',
        }
    }

    return {
        title: `${categoryInfo.title} | Get Geeky`,
        description: categoryInfo.description,
    }
}

export default function CategoryPage({ params }: { params: { id: string } }) {
    const categoryId = params.id as Category
    const categoryInfo = CATEGORIES[categoryId]

    if (!categoryInfo) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
                <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
                <Button asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        )
    }

    const posts = getPostsByCategory(categoryId)

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-card/50 to-background py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Button asChild>
                            <Link href="/">
                                <ArrowLeft className="mr-2" size={20} />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Category Header */}
                    <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-gradient">
                        {categoryInfo.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {categoryInfo.description}
                    </p>
                    <div className="mt-6 text-sm text-muted">
                        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground">No articles in this category yet.</p>
                        <p className="text-muted mt-2">Check back soon for new content!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
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
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
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
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
