"use client"

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasShown, setHasShown] = useState(false)

    useEffect(() => {
        // Check if popup has been shown before
        const shown = localStorage.getItem('exit-intent-shown')
        if (shown) {
            setHasShown(true)
            return
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Detect when mouse leaves from the top of the page
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true)
                setHasShown(true)
                localStorage.setItem('exit-intent-shown', 'true')
            }
        }

        document.addEventListener('mouseleave', handleMouseLeave)
        return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }, [hasShown])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <Card className="max-w-md w-full p-6 relative border-neon-cyan shadow-2xl">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setIsVisible(false)}
                >
                    <X size={20} />
                </Button>

                <div className="text-center">
                    <h2 className="font-display text-2xl font-bold mb-4 text-gradient">
                        Wait! Don't Miss Out
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Join our newsletter and get exclusive content, early access to new articles, and insights delivered to your inbox.
                    </p>

                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault()
                        // Newsletter signup logic here
                        setIsVisible(false)
                    }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-md border border-border bg-background"
                            required
                        />
                        <Button type="submit" variant="neon" className="w-full">
                            Subscribe Now
                        </Button>
                    </form>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="mt-4 text-sm text-muted-foreground hover:text-foreground"
                    >
                        No thanks, I'll miss out
                    </button>
                </div>
            </Card>
        </div>
    )
}
