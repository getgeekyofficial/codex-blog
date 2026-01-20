import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog-utils'
import { MDXContent } from '@/components/article/mdx-components'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShareButtons } from '@/components/lazy'
import { DisqusComments } from '@/components/article/disqus-comments'
import { ReadingProgress } from '@/components/article/reading-progress'
import { TableOfContents } from '@/components/lazy'
import { FontSizeControl } from '@/components/article/font-size-control'
import { BookmarkButton } from '@/components/article/bookmark-button'
import { StructuredData } from '@/components/seo/structured-data'
import { Reactions } from '@/components/article/reactions'
import { TextHighlighter } from '@/components/article/text-highlighter'
import { CATEGORIES } from '@/types/blog'
import { DonationButton } from '@/components/monetization/donation-button'
import { AffiliateDisclosure } from '@/components/monetization/affiliate-disclosure'

// Revalidate every hour for ISR
export const revalidate = 3600

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const post = getPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&author=${encodeURIComponent(post.author)}`

    return {
        title: `${post.title} | Get Geeky`,
        description: post.excerpt,
        keywords: post.keywords || post.tags,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [ogImageUrl],
            creator: '@getgeekyHQ',
        },
    }
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const post = getPostBySlug(params.slug)

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
                <Button asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        )
    }

    const relatedPosts = getRelatedPosts(post.slug, post.category, 3)
    const categoryInfo = CATEGORIES[post.category]

    return (
        <>
            <StructuredData post={post} />
            <ReadingProgress />
            <TextHighlighter />
            <article className="min-h-screen">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[500px] w-full">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Back Button */}
                    <div className="absolute top-8 left-4 md:left-8 flex items-center gap-2">
                        <Button variant="ghost" asChild className="text-white hover:text-neon-cyan">
                            <Link href="/">
                                <ArrowLeft className="mr-2" size={20} />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Accessibility Controls */}
                    <div className="absolute top-8 right-4 md:right-8 flex items-center gap-2">
                        <FontSizeControl />
                        <BookmarkButton slug={post.slug} title={post.title} />
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                        <div className="container mx-auto max-w-4xl">
                            <div className="mb-4">
                                <span className={`px-3 py-1 bg-${categoryInfo.color}/20 backdrop-blur-sm border border-${categoryInfo.color}/50 rounded-full text-sm font-semibold text-${categoryInfo.color}`}>
                                    {categoryInfo.title}
                                </span>
                            </div>
                            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                                {post.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Article Content with TOC */}
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="flex gap-8">
                        {/* Main Content */}
                        <div className="flex-1 max-w-4xl">
                            {/* Metadata */}
                            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>{post.readTime} min read</span>
                                </div>
                            </div>

                            {/* Excerpt */}
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                {post.excerpt}
                            </p>



                            {/* MDX Content */}
                            <div className="article-content">
                                <AffiliateDisclosure />
                                <MDXContent content={post.content} />
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-border">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-card border border-border rounded-full text-sm text-muted-foreground hover:border-neon-cyan transition-colors"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Donation Section */}
                            <DonationButton />

                            {/* Share Section */}
                            <ShareButtons title={post.title} />

                            {/* Reactions */}
                            <Reactions slug={post.slug} />

                            {/* Comments Section */}
                            <DisqusComments post={post} />
                        </div>

                        {/* Table of Contents */}
                        <TableOfContents />
                    </div>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="bg-card/30 py-16">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
                                Related Articles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link key={relatedPost.slug} href={`/posts/${relatedPost.slug}`}>
                                        <Card className="h-full overflow-hidden border-border hover:border-neon-cyan transition-all duration-300 hover:card-glow-hover cursor-pointer group">
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                    loading="lazy"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <CardHeader>
                                                <CardTitle className="font-display text-lg group-hover:text-neon-cyan transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex gap-4 text-sm text-muted">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {relatedPost.readTime} min
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </article>
        </>
    )
}
