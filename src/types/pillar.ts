export interface PillarChapter {
    id: string
    title: string
    description: string
    articles: string[] // Slugs of existing articles in this cluster
}

export interface PillarMetadata {
    title: string
    description: string
    date: string
    image: string
    chapters: PillarChapter[]
}

export interface Pillar extends PillarMetadata {
    slug: string
    content: string // Introduction content
}
