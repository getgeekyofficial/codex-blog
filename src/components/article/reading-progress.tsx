'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

export function ReadingProgress() {
    const [progress, setProgress] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrollPercent = (scrollTop / docHeight) * 100
            setProgress(scrollPercent)

            // Calculate time remaining based on average reading speed (200 words per minute)
            // Get the article content element
            const articleContent = document.querySelector('.article-content')
            if (articleContent) {
                const totalText = articleContent.textContent || ''
                const totalWords = totalText.trim().split(/\s+/).length
                const wordsPerMinute = 200
                const totalMinutes = totalWords / wordsPerMinute

                // Calculate remaining time based on scroll position
                const remainingPercent = 100 - scrollPercent
                const remainingMinutes = (totalMinutes * remainingPercent) / 100
                setTimeRemaining(Math.ceil(remainingMinutes))
            }
        }

        window.addEventListener('scroll', updateProgress)
        updateProgress() // Initial calculation

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
                <div
                    className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta transition-all duration-150"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Time Remaining Indicator */}
            {progress > 5 && progress < 95 && timeRemaining > 0 && (
                <div className="fixed top-4 right-4 z-40 bg-card/90 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg animate-slide-in">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>{timeRemaining} min left</span>
                    </div>
                </div>
            )}
        </>
    )
}
