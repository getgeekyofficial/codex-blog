export type Category = 'conspiracy' | 'science' | 'psychology'

export interface PostMetadata {
    title: string
    excerpt: string
    category: Category
    date: string
    author: string
    image: string
    tags: string[]
    featured?: boolean
    views: number
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
