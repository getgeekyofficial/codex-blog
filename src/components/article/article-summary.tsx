"use client"

import { CheckCircle2 } from 'lucide-react'

interface ArticleSummaryProps {
    takeaways: string[]
    className?: string
}

export function ArticleSummary({ takeaways, className = '' }: ArticleSummaryProps) {
    if (!takeaways || takeaways.length === 0) return null

    return (
        <div className={`bg-card/50 border border-border rounded-lg p-6 my-8 ${className}`}>
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-neon-cyan">📚</span>
                What You'll Learn
            </h3>
            <ul className="space-y-3">
                {takeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="text-neon-cyan shrink-0 mt-0.5" size={20} />
                        <span className="text-muted-foreground leading-relaxed">{takeaway}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
