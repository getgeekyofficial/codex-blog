import Link from "next/link"
import { getAllProtocols } from "@/lib/ascension-utils"
import { STATS } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Shield, Brain, Zap, Radio } from "lucide-react"
import { NeuralProfile } from "@/components/ascension/neural-profile"

export const metadata = {
    title: 'Ascension Protocol | Codex',
    description: 'The high-performance optimization hub. Level up your life stats.',
}

export default function AscensionPage() {
    const protocols = getAllProtocols()

    // Group protocols by stat
    const protocolsByStat = {
        cognition: protocols.filter(p => p.stat === 'cognition'),
        vitality: protocols.filter(p => p.stat === 'vitality'),
        signal: protocols.filter(p => p.stat === 'signal'),
        output: protocols.filter(p => p.stat === 'output'),
    }

    const StatIcon = ({ stat }: { stat: string }) => {
        switch (stat) {
            case 'cognition': return <Brain className="w-5 h-5" />
            case 'vitality': return <Shield className="w-5 h-5" />
            case 'signal': return <Radio className="w-5 h-5" />
            case 'output': return <Zap className="w-5 h-5" />
            default: return <Brain className="w-5 h-5" />
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-8 text-center">
                    <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">
                            ASCENSION PROTOCOL
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your life is the ultimate project. Select a domain. Execute the protocol. Level up.
                    </p>
                </div>

                {/* Neural Profile */}
                <div className="max-w-4xl mx-auto">
                    <NeuralProfile />
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {Object.values(STATS).map((stat) => (
                        <div key={stat.id} className="bg-card border border-border rounded-xl overflow-hidden group hover:border-neon-cyan/50 transition-all duration-300">
                            {/* Stat Header */}
                            <div className={`p-6 border-b border-border bg-gradient-to-r ${stat.id === 'cognition' ? 'from-cyan-950/20' : stat.id === 'vitality' ? 'from-magenta-950/20' : stat.id === 'signal' ? 'from-purple-950/20' : 'from-green-950/20'} to-transparent`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-lg bg-${stat.color}/10 text-${stat.color}`}>
                                        <StatIcon stat={stat.id} />
                                    </div>
                                    <h2 className="font-display text-2xl font-bold">{stat.label}</h2>
                                </div>
                                <p className="text-sm text-muted-foreground">{stat.description}</p>
                            </div>

                            {/* Protocols List */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {protocolsByStat[stat.id].length > 0 ? (
                                        protocolsByStat[stat.id].map((protocol) => (
                                            <Link
                                                key={protocol.slug}
                                                href={`/ascension/${protocol.slug}`}
                                                className="block p-4 rounded-lg bg-background border border-border hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all group/item"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold group-hover/item:text-neon-cyan transition-colors">
                                                        {protocol.title}
                                                    </h3>
                                                    <span className="text-xs font-mono px-2 py-1 rounded bg-secondary/20 text-secondary border border-secondary/20">
                                                        {protocol.xp}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                    {protocol.excerpt}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                                                    <span>[{protocol.tier.toUpperCase()}]</span>
                                                    <span>{protocol.readTime} MIN READ</span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="p-4 rounded-lg border border-dashed border-border text-center text-muted-foreground text-sm">
                                            No protocols currently active. Awaiting encryption key...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
