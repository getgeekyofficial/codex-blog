"use client"

import { useState } from 'react'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MidArticleCTAProps {
    className?: string
}

export function MidArticleCTA({ className = '' }: MidArticleCTAProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // TODO: Integrate with email service provider API
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            setSuccess(true)
            setEmail('')

            // Reset success state after 5 seconds
            setTimeout(() => setSuccess(false), 5000)
        } catch (error) {
            console.error('Newsletter signup error:', error)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className={`my-12 p-8 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/30 rounded-lg text-center ${className}`}>
                <CheckCircle className="mx-auto mb-4 text-neon-cyan" size={48} />
                <h3 className="font-display text-2xl font-bold mb-2">You're In! 🎉</h3>
                <p className="text-muted-foreground">
                    Check your inbox for a welcome email with exclusive content.
                </p>
            </div>
        )
    }

    return (
        <div className={`my-12 p-8 bg-gradient-to-r from-card to-card/50 border border-border rounded-lg ${className}`}>
            <div className="max-w-xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neon-cyan/10 mb-4">
                    <Mail className="text-neon-cyan" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">
                    If this made you question something you thought was true...
                </h3>
                <p className="text-muted-foreground mb-6">
                    You'll like our weekly brief. Get exclusive insights, deep dives, and the stories that don't make mainstream news.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                    <Button
                        type="submit"
                        variant="neon"
                        disabled={loading}
                        className="sm:w-auto w-full"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Subscribing...
                            </>
                        ) : (
                            'Get Weekly Insights'
                        )}
                    </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3">
                    No spam. Unsubscribe anytime. We respect your privacy.
                </p>
            </div>
        </div>
    )
}
