"use client"

import { HoodedFigure } from "./hooded-figure"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 code-rain opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

            {/* Content */}
            <div className="container relative z-10 px-4 py-20">
                <div className="flex flex-col items-center text-center">
                    {/* Hooded Figure */}
                    <div className={`mb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <HoodedFigure />
                    </div>

                    {/* Title with Glitch Effect */}
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-glitch">
                        <span className="text-gradient glow-cyan">
                            Question Everything
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl text-neon-magenta font-display mb-8 glow-magenta">
                        Dive Deeper.
                    </p>

                    {/* CTA Button */}
                    <Button variant="neon" size="lg" asChild className="animate-float">
                        <Link href="/#pillars">
                            Explore the Unknown
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center p-2">
                    <div className="w-1 h-3 bg-neon-cyan rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    )
}
