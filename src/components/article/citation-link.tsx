"use client"

import { ExternalLink } from 'lucide-react'
import type { Citation } from '@/types/blog'

interface CitationLinkProps {
    citation: Citation
    index: number
}

export function CitationLink({ citation, index }: CitationLinkProps) {
    const formattedCitation = `${citation.author}${citation.year ? ` (${citation.year})` : ''}. ${citation.title}${citation.publication ? `. ${citation.publication}` : ''}`

    if (!citation.url) {
        return (
            <div className="text-sm text-muted-foreground py-2">
                <span className="font-semibold text-foreground">[{index}]</span> {formattedCitation}
            </div>
        )
    }

    return (
        <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors py-2"
        >
            <span className="font-semibold text-foreground">[{index}]</span>
            <span className="flex-1 group-hover:underline">{formattedCitation}</span>
            <ExternalLink size={14} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
    )
}

interface CitationsListProps {
    citations: Citation[]
    className?: string
}

export function CitationsList({ citations, className = '' }: CitationsListProps) {
    if (!citations || citations.length === 0) return null

    return (
        <div className={`mt-12 pt-8 border-t border-border ${className}`}>
            <h3 className="font-display text-xl font-bold mb-4">Sources & References</h3>
            <div className="space-y-1">
                {citations.map((citation, index) => (
                    <CitationLink key={index} citation={citation} index={index + 1} />
                ))}
            </div>
        </div>
    )
}
