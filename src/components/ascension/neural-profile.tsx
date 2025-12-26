"use client"

import { useAscension } from "@/hooks/use-ascension"
import { Trophy, Activity, Zap } from "lucide-react"

export function NeuralProfile() {
    const { stats, loaded } = useAscension()

    if (!loaded) return null

    // Calculate XP progress to next level
    // Level L requires 100 * (L-1)^2 XP ? Or simply linear 100 per level?
    // Using formula Level = floor(sqrt(XP / 100)) + 1:
    // XP to reach Level L+1 = ((L+1)-1)^2 * 100 = L^2 * 100
    // XP to reach current Level L = (L-1)^2 * 100

    const currentLevelBaseXP = Math.pow(stats.level - 1, 2) * 100
    const nextLevelXP = Math.pow(stats.level, 2) * 100
    const progressPercent = Math.min(100, Math.max(0,
        ((stats.xp - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100
    ))

    return (
        <div className="bg-card/50 border border-border rounded-xl p-6 mb-12 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar / Level Ring */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-muted/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-neon-cyan border-t-transparent animate-spin-slow" style={{ transform: `rotate(${progressPercent * 3.6}deg)` }}></div>
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase tracking-widest">Level</div>
                        <div className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-neon-cyan to-white">
                            {stats.level}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background/50 rounded-lg p-3 border border-border/50">
                        <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground uppercase">
                            <Trophy size={14} className="text-xl" /> Total XP
                        </div>
                        <div className="text-2xl font-mono font-bold">{stats.xp}</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-3 border border-border/50">
                        <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground uppercase">
                            <Activity size={14} className="text-neon-cyan" /> Protocols
                        </div>
                        <div className="text-2xl font-mono font-bold">{stats.completedProtocols.length}</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-3 border border-border/50 col-span-2">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground uppercase flex items-center gap-2">
                                <Zap size={14} className="text-yellow-400" /> Next Level
                            </span>
                            <span className="text-xs font-mono text-muted-foreground">{Math.floor(nextLevelXP - stats.xp)} XP needed</span>
                        </div>
                        <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
