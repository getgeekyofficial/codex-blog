"use client"

import { useAscension } from "@/hooks/use-ascension"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProtocolCompletionProps {
    slug: string
    xp: string // "100 XP" string
}

export function ProtocolCompletion({ slug, xp }: ProtocolCompletionProps) {
    const { completeProtocol, isCompleted, loaded } = useAscension()
    const [isAnimating, setIsAnimating] = useState(false)

    // Extract numeric XP
    const xpValue = parseInt(xp.replace(/\D/g, '')) || 100

    const completed = isCompleted(slug)

    const handleComplete = () => {
        if (completed) return

        setIsAnimating(true)
        completeProtocol(slug, xpValue)

        // Reset animation state after cleanup if needed, but we stay completed
        setTimeout(() => setIsAnimating(false), 1000)
    }

    if (!loaded) return <Button disabled variant="outline" className="w-full md:w-auto opacity-50">Loading Link...</Button>

    if (completed) {
        return (
            <div className="bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded-lg p-4 text-center animate-in fade-in duration-500">
                <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-neon-cyan/20 rounded-full">
                        <Check size={32} />
                    </div>
                    <h3 className="font-bold text-lg">PROTOCOL COMPLETE</h3>
                    <p className="text-sm opacity-80">XP Extracted. Neural pathway reinforced.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-card border border-border rounded-xl p-8 text-center transition-all duration-500">
            <h3 className="font-display text-2xl font-bold mb-4">Protocol Complete?</h3>
            <p className="text-muted-foreground mb-6">
                Verified execution awards <span className="text-neon-cyan font-mono font-bold">{xp}</span> to your Neural Profile.
            </p>
            <Button
                variant="neon"
                size="lg"
                className={cn(
                    "w-full md:w-auto transition-all duration-300 transform",
                    isAnimating ? "scale-95 opacity-80" : "hover:scale-105"
                )}
                onClick={handleComplete}
            >
                {isAnimating ? "UPLOADING..." : "MARK AS COMPLETE"}
            </Button>
        </div>
    )
}
