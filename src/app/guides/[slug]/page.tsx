import { getPillarBySlug, getAllPillars } from '@/lib/pillar-utils'
import { getPostBySlug } from '@/lib/blog-utils'
import { PillarHero } from '@/components/pillar/pillar-hero'
import { ChapterSection } from '@/components/pillar/chapter-section'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/article/mdx-components'
import { Metadata } from 'next'

// Generate static params for all guide pages
export async function generateStaticParams() {
    const pillars = getAllPillars()
    return pillars.map((pillar) => ({
        slug: pillar.slug,
    }))
}

// Generate metadata for SEO
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params
    const guide = getPillarBySlug(params.slug)

    if (!guide) {
        return {
            title: 'Guide Not Found',
        }
    }

    const ogImageUrl = guide.image

    return {
        title: `${guide.title} | Get Geeky Masterclass`,
        description: guide.description,
        openGraph: {
            title: guide.title,
            description: guide.description,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: guide.title,
                },
            ],
            type: 'article',
        },
    }
}

export default async function GuidePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const guide = getPillarBySlug(params.slug)

    if (!guide) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            <PillarHero guide={guide} />

            <div className="container mx-auto px-4 max-w-5xl py-16">
                {/* Introduction / Lead */}
                <div className="prose prose-invert prose-lg max-w-none mb-20 border-b border-white/10 pb-12">
                    <MDXContent content={guide.content} />
                </div>

                {/* Chapters */}
                <div className="relative">
                    {/* Vertical connecting line */}
                    <div className="hidden md:block absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-purple/50 via-neon-cyan/50 to-transparent" />

                    <div className="space-y-12">
                        {guide.chapters.map(chapter => {
                            const posts = chapter.articles
                                .map(slug => getPostBySlug(slug))
                                .filter((post): post is NonNullable<typeof post> => post !== null)

                            return <ChapterSection key={chapter.id} chapter={chapter} posts={posts} />
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}
