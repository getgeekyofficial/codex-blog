"use client"

import { useEffect, useState } from 'react'
import { Share2, Twitter, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TextHighlighter() {
    const [selectedText, setSelectedText] = useState('')
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [showPopup, setShowPopup] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection()
            const text = selection?.toString().trim()

            if (text && text.length > 0) {
                const range = selection?.getRangeAt(0)
                const rect = range?.getBoundingClientRect()

                if (rect) {
                    setSelectedText(text)
                    setPosition({
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10,
                    })
                    setShowPopup(true)
                }
            } else {
                setShowPopup(false)
                setCopied(false)
            }
        }

        document.addEventListener('mouseup', handleSelection)
        document.addEventListener('touchend', handleSelection)

        return () => {
            document.removeEventListener('mouseup', handleSelection)
            document.removeEventListener('touchend', handleSelection)
        }
    }, [])

    const shareOnTwitter = () => {
        const url = window.location.href
        const text = `"${selectedText}" - ${document.title}`
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&via=getgeekyHQ`,
            '_blank',
            'width=550,height=420'
        )
        setShowPopup(false)
    }

    const copyQuote = async () => {
        const url = window.location.href
        const quote = `"${selectedText}"\n\nRead more: ${url}`

        try {
            await navigator.clipboard.writeText(quote)
            setCopied(true)
            setTimeout(() => {
                setShowPopup(false)
                setCopied(false)
            }, 1500)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    if (!showPopup) return null

    return (
        <div
            className="fixed z-50 animate-in fade-in slide-in-from-bottom-2"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -100%)',
            }}
        >
            <div className="bg-card border border-border rounded-lg shadow-lg p-2 flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={shareOnTwitter}
                    className="hover:text-neon-cyan"
                    title="Share on Twitter"
                >
                    <Twitter size={16} className="mr-1" />
                    Tweet
                </Button>
                <div className="w-px h-6 bg-border" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyQuote}
                    className="hover:text-neon-cyan"
                    title="Copy quote"
                >
                    {copied ? (
                        <>
                            <Check size={16} className="mr-1 text-green-500" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={16} className="mr-1" />
                            Copy
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
