'use client'

import dynamic from 'next/dynamic'

// Lazy load non-critical components for better performance
// Note: These are client-side lazy loaded components
export const ShareButtons = dynamic(
    () => import('@/components/article/share-buttons').then((mod) => mod.ShareButtons)
)

export const TableOfContents = dynamic(
    () => import('@/components/article/table-of-contents').then((mod) => mod.TableOfContents)
)

export const NewsletterSection = dynamic(
    () => import('@/components/home/newsletter-section').then((mod) => mod.NewsletterSection)
)
