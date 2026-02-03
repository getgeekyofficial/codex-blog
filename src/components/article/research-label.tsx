"use client"

import { Shield, AlertTriangle, Lightbulb, MessageSquare } from 'lucide-react'
import type { ResearchLevel } from '@/types/blog'

interface ResearchLabelProps {
    level: ResearchLevel
    className?: string
}

const RESEARCH_LEVELS = {
    'evidence-backed': {
        label: 'Evidence-Backed',
        description: 'Supported by peer-reviewed research and credible sources',
        icon: Shield,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30'
    },
    'mixed-evidence': {
        label: 'Mixed Evidence',
        description: 'Some research support with ongoing debate',
        icon: Lightbulb,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30'
    },
    'speculative': {
        label: 'Speculative Theory',
        description: 'Hypothesis and analysis based on available information',
        icon: AlertTriangle,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30'
    },
    'opinion': {
        label: 'Editorial Opinion',
        description: 'Analysis and commentary based on research and expertise',
        icon: MessageSquare,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30'
    }
}

export function ResearchLabel({ level, className = '' }: ResearchLabelProps) {
    const config = RESEARCH_LEVELS[level]
    const Icon = config.icon

    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.bgColor} ${config.borderColor} ${className}`}
            title={config.description}
        >
            <Icon className={`${config.color}`} size={16} />
            <span className={`text-sm font-medium ${config.color}`}>
                {config.label}
            </span>
        </div>
    )
}
