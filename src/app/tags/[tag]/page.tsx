import { getAllPosts } from '@/lib/blog-utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export async function generateStaticParams() {
    const posts = getAllPosts()
    const tags = new Set<string>()

    posts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag))
    })

    return Array.from(tags).map((tag) => ({
        tag: encodeURIComponent(tag),
    }))
}

export async function generateMetadata(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params
    const tag = decodeURIComponent(params.tag)

    return {
        title: `${tag} Articles | Get Geeky`,
        description: `Browse all articles tagged with ${tag}`,
    }
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
    const params = await props.params
    const tag = decodeURIComponent(params.tag)
    const allPosts = getAllPosts()

    const posts = allPosts.filter(post => post.tags.includes(tag))

    if (posts.length === 0) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <Breadcrumbs
                items={[
                    { label: 'Tags', href: '/tags' },
                    { label: tag, href: `/tags/${encodeURIComponent(tag)}` },
                ]}
            />

            <div className="mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
                    #{tag}
                </h1>
                <p className="text-xl text-muted-foreground">
                    {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <Card className="h-full overflow-hidden border-border hover:border-neon-cyan transition-all duration-300 hover:card-glow-hover cursor-pointer group">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-display text-lg group-hover:text-neon-cyan transition-colors line-clamp-2">
                                    {post.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {post.excerpt}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4 text-sm text-muted">
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {post.readTime} min
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
