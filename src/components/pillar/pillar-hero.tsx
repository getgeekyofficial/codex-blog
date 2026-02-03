import Image from 'next/image'
import { Pillar } from '@/types/pillar'
import { Badge } from '@/components/ui/badge'

export function PillarHero({ guide }: { guide: Pillar }) {
    return (
        <div className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 text-center max-w-4xl">
                <Badge variant="outline" className="mb-6 font-mono text-neon-cyan border-neon-cyan/50 px-4 py-1">
                    ULTIMATE GUIDE
                </Badge>

                <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-neon-purple drop-shadow-neon">
                    {guide.title}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {guide.description}
                </p>

                <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center items-center text-sm font-mono text-muted-foreground/60">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                        UPDATED {new Date(guide.date).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    )
}
