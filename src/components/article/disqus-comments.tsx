'use client'

import { DiscussionEmbed } from 'disqus-react'

interface DisqusCommentsProps {
    post: {
        slug: string
        title: string
    }
}

export function DisqusComments({ post }: DisqusCommentsProps) {
    // Replace this with your actual Disqus shortname
    const disqusShortname = 'getgeekyofficial'

    const disqusConfig = {
        url: typeof window !== 'undefined' ? `${window.location.origin}/posts/${post.slug}` : '',
        identifier: post.slug,
        title: post.title,
        language: 'en_US'
    }

    return (
        <div className="mt-16 pt-8 border-t border-border">
            <h2 className="font-display text-2xl font-bold mb-8">Comments</h2>
            <div className="bg-card/50 rounded-lg p-6 min-h-[200px]">
                <DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                />
            </div>
        </div>
    )
}
