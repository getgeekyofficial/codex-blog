'use client'

import { DiscussionEmbed } from 'disqus-react'
import { useState, useRef, useEffect } from 'react'

interface DisqusCommentsProps {
    post: {
        slug: string
        title: string
    }
}

export function DisqusComments({ post }: DisqusCommentsProps) {
    // Replace this with your actual Disqus shortname
    const disqusShortname = 'getgeeky-1'
    const [shouldLoad, setShouldLoad] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (shouldLoad) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' } // Start loading 200px before it comes into view
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [shouldLoad])

    const disqusConfig = {
        url: typeof window !== 'undefined' ? `${window.location.origin}/posts/${post.slug}` : '',
        identifier: post.slug,
        title: post.title,
        language: 'en_US'
    }

    return (
        <div ref={containerRef} className="mt-16 pt-8 border-t border-border min-h-[300px]">
            <h2 className="font-display text-2xl font-bold mb-8">Comments</h2>
            <div className="bg-card/50 rounded-lg p-6 min-h-[200px]">
                {shouldLoad ? (
                    <DiscussionEmbed
                        shortname={disqusShortname}
                        config={disqusConfig}
                    />
                ) : (
                    <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                        Loading comments...
                    </div>
                )}
            </div>
        </div>
    )
}
