import { getAllProtocols, getProtocolBySlug } from '@/lib/ascension-utils'
import { MDXContent } from '@/components/article/mdx-components'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft, Trophy, Shield, Brain, Zap, Radio, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { STATS } from '@/types/blog'
import { cn } from '@/lib/utils'

// Revalidate every hour for ISR
export const revalidate = 3600

export async function generateStaticParams() {
    const protocols = getAllProtocols()
    return protocols.map((protocol) => ({
        slug: protocol.slug,
    }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const protocol = getProtocolBySlug(params.slug)

    if (!protocol) {
        return {
            title: 'Protocol Not Found',
        }
    }

    return {
        title: `Protocol: ${protocol.title} | Codex`,
        description: protocol.excerpt,
        openGraph: {
            title: protocol.title,
            description: protocol.excerpt,
            images: [protocol.image],
        },
    }
}

export default async function ProtocolPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const protocol = getProtocolBySlug(params.slug)

    if (!protocol) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Protocol Offline</h1>
                <p className="text-muted-foreground mb-8">Access denied. Protocol does not exist.</p>
                <Button asChild>
                    <Link href="/ascension">Return to Hub</Link>
                </Button>
            </div>
        )
    }

    const statInfo = STATS[protocol.stat]

    const StatIcon = () => {
        switch (protocol.stat) {
            case 'cognition': return <Brain className="w-6 h-6" />
            case 'vitality': return <Shield className="w-6 h-6" />
            case 'signal': return <Radio className="w-6 h-6" />
            case 'output': return <Zap className="w-6 h-6" />
            default: return <Target className="w-6 h-6" />
        }
    }

    return (
        <article className="min-h-screen bg-background pt-20">
            {/* Mission Briefing Header */}
            <div className="relative border-b border-border bg-card/30">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="mb-8">
                        <Link href="/ascension" className="inline-flex items-center text-sm text-muted-foreground hover:text-neon-cyan transition-colors">
                            <ArrowLeft className="mr-2" size={16} />
                            Back to Ascension Hub
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Protocol Data HUD */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={cn(
                                    "px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border",
                                    `bg-${statInfo.color}/10 text-${statInfo.color} border-${statInfo.color}/20`
                                )}>
                                    {statInfo.label}
                                </span>
                                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20">
                                    TIER: {protocol.tier}
                                </span>
                            </div>

                            <h1 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                                {protocol.title}
                            </h1>

                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-light">
                                {protocol.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm font-mono text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Trophy className="text-neon-cyan" size={16} />
                                    <span>REWARD: {protocol.xp}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    <span>DURATION: {protocol.readTime} MIN</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <StatIcon />
                                    <span>STAT: +{statInfo.id.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Asset */}
                        <div className="w-full md:w-1/3 aspect-video md:aspect-square relative rounded-lg overflow-hidden border border-border shadow-2xl shadow-neon-cyan/5">
                            <Image
                                src={protocol.image}
                                alt={protocol.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol Content */}
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <main className="article-content font-light">
                    <MDXContent content={protocol.content} />
                </main>

                <div className="mt-16 pt-8 border-t border-border">
                    <div className="bg-card border border-border rounded-xl p-8 text-center">
                        <h3 className="font-display text-2xl font-bold mb-4">Protocol Complete?</h3>
                        <p className="text-muted-foreground mb-6">
                            Verified execution awards <span className="text-neon-cyan font-mono font-bold">{protocol.xp}</span> to your Neural Profile.
                        </p>
                        <Button variant="neon" size="lg" className="w-full md:w-auto">
                            MARK AS COMPLETE
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    )
}
