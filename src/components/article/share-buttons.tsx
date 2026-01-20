'use client'

import { Share2, Twitter, Facebook, Linkedin, Mail, Link2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useState, useEffect } from 'react'

interface ShareButtonsProps {
    title: string
    url?: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
    const { toast } = useToast()
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Make share buttons sticky after scrolling 300px
            setIsSticky(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const shareOnTwitter = () => {
        const text = `${title} via @getgeekyHQ`
        const hashtags = 'GetGeeky,Science,Technology'
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`,
            '_blank',
            'width=550,height=420'
        )
    }

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=550,height=420'
        )
    }

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=550,height=420'
        )
    }

    const shareOnReddit = () => {
        window.open(
            `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
            '_blank',
            'width=550,height=420'
        )
    }

    const shareViaEmail = () => {
        const subject = encodeURIComponent(title)
        const body = encodeURIComponent(`Check out this article: ${shareUrl}`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
    }

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            toast({
                title: "Link copied!",
                description: "Article link copied to clipboard",
            })
        } catch {
            toast({
                title: "Failed to copy",
                description: "Please try again",
                variant: "destructive",
            })
        }
    }

    return (
        <>
            {/* Static Share Section */}
            <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="font-display text-xl font-bold flex items-center gap-2">
                        <Share2 size={20} />
                        Share this article
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={shareOnTwitter}>
                            <Twitter size={16} className="mr-2" />
                            Twitter
                        </Button>
                        <Button variant="outline" size="sm" onClick={shareOnFacebook}>
                            <Facebook size={16} className="mr-2" />
                            Facebook
                        </Button>
                        <Button variant="outline" size="sm" onClick={shareOnLinkedIn}>
                            <Linkedin size={16} className="mr-2" />
                            LinkedIn
                        </Button>
                        <Button variant="outline" size="sm" onClick={shareOnReddit}>
                            <MessageCircle size={16} className="mr-2" />
                            Reddit
                        </Button>
                        <Button variant="outline" size="sm" onClick={shareViaEmail}>
                            <Mail size={16} className="mr-2" />
                            Email
                        </Button>
                        <Button variant="outline" size="sm" onClick={copyLink}>
                            <Link2 size={16} className="mr-2" />
                            Copy Link
                        </Button>
                    </div>
                </div>
            </div>

            {/* Floating Sticky Share Buttons */}
            {isSticky && (
                <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40 animate-slide-in">
                    <div className="flex flex-col gap-3 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={shareOnTwitter}
                            className="hover:text-neon-cyan"
                            title="Share on Twitter"
                        >
                            <Twitter size={20} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={shareOnFacebook}
                            className="hover:text-neon-cyan"
                            title="Share on Facebook"
                        >
                            <Facebook size={20} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={shareOnLinkedIn}
                            className="hover:text-neon-cyan"
                            title="Share on LinkedIn"
                        >
                            <Linkedin size={20} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={copyLink}
                            className="hover:text-neon-cyan"
                            title="Copy link"
                        >
                            <Link2 size={20} />
                        </Button>
                        <div className="border-t border-border my-1" />
                        <div className="text-xs text-center text-muted-foreground">
                            Share
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
