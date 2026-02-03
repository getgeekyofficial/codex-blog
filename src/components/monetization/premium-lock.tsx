"use client"

import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export function PremiumLock({
    children,
    isLocked = true,
    title = "Classified Intelligence",
    description = "This section is restricted to Operative tier members and above."
}: {
    children: React.ReactNode,
    isLocked?: boolean,
    title?: string,
    description?: string
}) {
    if (!isLocked) {
        return <>{children}</>
    }

    return (
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/30 my-8">
            {/* Blurred Content Placeholder (faded out) */}
            <div className="filter blur-md opacity-30 select-none pointer-events-none p-8" aria-hidden="true">
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gradient-to-b from-transparent to-background/90">
                <div className="p-4 rounded-full bg-background border border-neon-cyan/50 mb-4 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                    <Lock className="w-8 h-8 text-neon-cyan" />
                </div>

                <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground max-w-md mb-6">{description}</p>

                <Button asChild variant="neon" size="lg" className="font-bold">
                    <Link href="/membership">
                        Unlock Access
                    </Link>
                </Button>
                <p className="mt-4 text-xs text-muted-foreground">
                    Already an Operative? <Link href="/login" className="underline hover:text-neon-cyan">Log in</Link>
                </p>
            </div>
        </div>
    )
}
