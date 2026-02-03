"use client"

import { useState } from 'react'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NewsletterFormProps {
    variant?: 'default' | 'compact' | 'inline'
    className?: string
    placeholder?: string
    buttonText?: string
}

export function NewsletterForm({
    variant = 'default',
    className = '',
    placeholder = 'Enter your email',
    buttonText = 'Subscribe'
}: NewsletterFormProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // TODO: Integrate with email service provider API (ConvertKit, Mailchimp, etc.)
            // Example API endpoint: /api/newsletter/subscribe
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                throw new Error('Subscription failed')
            }

            setSuccess(true)
            setEmail('')

            // Reset success state after 5 seconds
            setTimeout(() => setSuccess(false), 5000)
        } catch (err) {
            setError('Something went wrong. Please try again.')
            console.error('Newsletter signup error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className={`flex items-center gap-2 text-neon-cyan ${className}`}>
                <CheckCircle size={20} />
                <span className="text-sm font-medium">Successfully subscribed!</span>
            </div>
        )
    }

    if (variant === 'compact') {
        return (
            <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
                <input
                    type="email"
                    placeholder={placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                />
                <Button type="submit" size="sm" variant="neon" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonText}
                </Button>
            </form>
        )
    }

    if (variant === 'inline') {
        return (
            <div className={className}>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder={placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                    <Button type="submit" variant="neon" disabled={loading} className="sm:w-auto w-full">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Subscribing...
                            </>
                        ) : (
                            buttonText
                        )}
                    </Button>
                </form>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                <p className="text-xs text-muted-foreground mt-2">
                    No spam. Unsubscribe anytime. We respect your privacy.
                </p>
            </div>
        )
    }

    // Default variant
    return (
        <div className={className}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="email"
                        placeholder={placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                </div>
                <Button type="submit" variant="neon" className="w-full" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Subscribing...
                        </>
                    ) : (
                        buttonText
                    )}
                </Button>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <p className="text-xs text-muted-foreground text-center">
                    No spam. Unsubscribe anytime. We respect your privacy.
                </p>
            </form>
        </div>
    )
}
