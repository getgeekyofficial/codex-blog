"use client"

import { useState } from 'react'
import { ThumbsUp, Lightbulb, Flame, Heart, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReactionButtonProps {
    slug: string
}

type ReactionType = 'like' | 'insightful' | 'fire' | 'love' | 'wow' | 'bullseye'

const reactions = [
    { type: 'like' as ReactionType, icon: ThumbsUp, label: 'Like', color: 'text-blue-500' },
    { type: 'insightful' as ReactionType, icon: Lightbulb, label: 'Insightful', color: 'text-yellow-500' },
    { type: 'fire' as ReactionType, icon: Flame, label: 'Fire', color: 'text-orange-500' },
    { type: 'love' as ReactionType, icon: Heart, label: 'Love', color: 'text-red-500' },
    { type: 'wow' as ReactionType, icon: Zap, label: 'Wow', color: 'text-purple-500' },
    { type: 'bullseye' as ReactionType, icon: Target, label: 'On Point', color: 'text-green-500' },
]

export function Reactions({ slug }: ReactionButtonProps) {
    const [reactionCounts, setReactionCounts] = useState<Record<ReactionType, number>>(() => {
        if (typeof window === 'undefined') return {} as Record<ReactionType, number>

        try {
            const stored = localStorage.getItem(`reactions-${slug}`)
            return stored ? JSON.parse(stored) : {
                like: 0,
                insightful: 0,
                fire: 0,
                love: 0,
                wow: 0,
                bullseye: 0,
            }
        } catch {
            return {
                like: 0,
                insightful: 0,
                fire: 0,
                love: 0,
                wow: 0,
                bullseye: 0,
            }
        }
    })

    const [userReactions, setUserReactions] = useState<Set<ReactionType>>(() => {
        if (typeof window === 'undefined') return new Set()

        try {
            const stored = localStorage.getItem(`user-reactions-${slug}`)
            return stored ? new Set(JSON.parse(stored)) : new Set()
        } catch {
            return new Set()
        }
    })

    const handleReaction = (type: ReactionType) => {
        const hasReacted = userReactions.has(type)
        const newUserReactions = new Set(userReactions)
        const newCounts = { ...reactionCounts }

        if (hasReacted) {
            // Remove reaction
            newUserReactions.delete(type)
            newCounts[type] = Math.max(0, newCounts[type] - 1)
        } else {
            // Add reaction
            newUserReactions.add(type)
            newCounts[type] = (newCounts[type] || 0) + 1
        }

        setUserReactions(newUserReactions)
        setReactionCounts(newCounts)

        // Save to localStorage
        localStorage.setItem(`reactions-${slug}`, JSON.stringify(newCounts))
        localStorage.setItem(`user-reactions-${slug}`, JSON.stringify(Array.from(newUserReactions)))
    }

    return (
        <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-display text-xl font-bold mb-4">How did you find this article?</h3>
            <div className="flex flex-wrap gap-3">
                {reactions.map(({ type, icon: Icon, label, color }) => {
                    const count = reactionCounts[type] || 0
                    const hasReacted = userReactions.has(type)

                    return (
                        <Button
                            key={type}
                            variant={hasReacted ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleReaction(type)}
                            className={`group transition-all duration-300 ${hasReacted ? 'scale-110' : 'hover:scale-105'}`}
                        >
                            <Icon
                                size={18}
                                className={`mr-2 transition-colors ${hasReacted ? color : 'group-hover:' + color}`}
                            />
                            <span>{label}</span>
                            {count > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-background/50 rounded-full text-xs">
                                    {count}
                                </span>
                            )}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
