export type Category = 'conspiracy' | 'science' | 'psychology'
export type ResearchLevel = 'evidence-backed' | 'mixed-evidence' | 'speculative' | 'opinion'

export interface Citation {
    title: string
    author: string
    url?: string
    year?: number
    publication?: string
}

export interface PostMetadata {
    title: string
    excerpt: string
    category: Category
    date: string
    author: string
    image: string
    tags: string[]
    keywords?: string[]
    featured?: boolean
    views: number
    researchLevel?: ResearchLevel
    keyTakeaways?: string[]
    pillarPage?: string
    citations?: Citation[]
}

export interface Post extends PostMetadata {
    slug: string
    content: string
    readTime: number
}

export interface CategoryInfo {
    id: Category
    title: string
    description: string
    color: string
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
    conspiracy: {
        id: 'conspiracy',
        title: 'Conspiracy Vault',
        description: 'Uncover the hidden narratives behind world events. From classified documents to suppressed histories, we question the official story and follow the evidence wherever it leads.',
        color: 'neon-cyan'
    },
    science: {
        id: 'science',
        title: 'Geek Science',
        description: 'Explore the cutting edge of quantum physics, AI consciousness, and technologies that blur the line between science fiction and reality. The future is stranger than you think.',
        color: 'neon-purple'
    },
    psychology: {
        id: 'psychology',
        title: 'Psych Mind Hacks',
        description: 'Master the hidden mechanisms of influence, persuasion, and cognitive biases. Learn the dark psychology techniques used by marketers, politicians, and master manipulators.',
        color: 'neon-magenta'
    }
}

// Ascension Protocol Types
export type StatType = 'cognition' | 'vitality' | 'signal' | 'output'
export type Tier = 'Novice' | 'Initiate' | 'Elite' | 'Grandmaster' | 'God-Tier'

export interface ProtocolMetadata {
    title: string
    excerpt: string
    stat: StatType
    date: string
    xp: string // e.g., "100 XP"
    tier: Tier
    image: string
    requires?: string
    author?: string
    featured?: boolean
    views?: number
}

export interface Protocol extends ProtocolMetadata {
    slug: string
    content: string
    readTime: number
}

export const STATS: Record<StatType, { id: StatType, label: string, color: string, description: string }> = {
    cognition: {
        id: 'cognition',
        label: 'COGNITION (INT)',
        color: 'neon-cyan',
        description: 'Focus mechanics, dopamine regulation, learning algorithms.'
    },
    vitality: {
        id: 'vitality',
        label: 'VITALITY (STR)',
        color: 'neon-magenta',
        description: 'Bio-mechanics, metabolic flexibility, sleep engineering.'
    },
    signal: {
        id: 'signal',
        label: 'SIGNAL (CHA)',
        color: 'neon-purple',
        description: 'Social dynamics, persuasion logic, negotiation physics.'
    },
    output: {
        id: 'output',
        label: 'OUTPUT (CRE)',
        color: 'neon-green', // Need to ensure this variable exists or use hex, but using design system logic
        description: 'Flow state triggers, deep work architecture, digital leverage.'
    }
}
