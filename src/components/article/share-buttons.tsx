'use client'

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonsProps {
    title: string
    url?: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

    const shareOnTwitter = () => {
        const text = `Check out: ${title}`
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
            '_blank'
        )
    }

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl)
        alert('Link copied to clipboard!')
    }

    return (
        <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="font-display text-xl font-bold">Share this article</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={shareOnTwitter}>
                        <Share2 size={16} className="mr-2" />
                        Twitter
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyLink}>
                        Copy Link
                    </Button>
                </div>
            </div>
        </div>
    )
}
