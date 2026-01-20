import { getAllTags } from '@/lib/blog-utils'
import Link from 'next/link'

export default function TagsPage() {
    const tags = getAllTags()

    // Calculate tag frequencies
    const tagFrequencies = tags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const maxFrequency = Math.max(...Object.values(tagFrequencies))

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
                    Explore by Tags
                </h1>
                <p className="text-xl text-muted-foreground">
                    Browse articles by topic
                </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
                {tags.map((tag) => {
                    const frequency = tagFrequencies[tag]
                    const size = Math.max(0.8, (frequency / maxFrequency) * 2)

                    return (
                        <Link
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag)}`}
                            className="px-4 py-2 bg-card border border-border rounded-full hover:border-neon-cyan transition-all duration-300 hover:scale-110"
                            style={{
                                fontSize: `${size}rem`,
                            }}
                        >
                            #{tag}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
