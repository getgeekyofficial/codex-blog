"use client"

import { useState, useEffect } from 'react'

export interface UserStats {
    xp: number
    level: number
    completedProtocols: string[] // List of slugs
}

const STORAGE_KEY = 'codex_ascension_stats'

export function useAscension() {
    const [stats, setStats] = useState<UserStats>({
        xp: 0,
        level: 1,
        completedProtocols: []
    })
    const [loaded, setLoaded] = useState(false)

    // Load stats from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                setStats(JSON.parse(stored))
            } catch (e) {
                if (process.env.NODE_ENV === 'development') {
                    console.error("Failed to parse ascension stats", e)
                }
            }
        }
        setLoaded(true)
    }, [])

    // Save stats whenever they change
    useEffect(() => {
        if (loaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
        }
    }, [stats, loaded])

    const calculateLevel = (xp: number) => {
        // Simple formula: Level = floor(sqrt(XP / 100)) + 1
        return Math.floor(Math.sqrt(xp / 100)) + 1
    }

    const completeProtocol = (slug: string, xpReward: number) => {
        if (stats.completedProtocols.includes(slug)) return

        setStats(prev => {
            const newXp = prev.xp + xpReward
            return {
                xp: newXp,
                level: calculateLevel(newXp),
                completedProtocols: [...prev.completedProtocols, slug]
            }
        })
    }

    const isCompleted = (slug: string) => {
        return stats.completedProtocols.includes(slug)
    }

    const resetStats = () => {
        setStats({
            xp: 0,
            level: 1,
            completedProtocols: []
        })
    }

    return {
        stats,
        loaded,
        completeProtocol,
        isCompleted,
        resetStats
    }
}
