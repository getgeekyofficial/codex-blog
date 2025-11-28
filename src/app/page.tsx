import { HeroSection } from "@/components/home/hero-section"
import { PillarCards } from "@/components/home/pillar-cards"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { FeaturedPosts } from "@/components/home/featured-posts"
import { getAllPosts } from "@/lib/blog-utils"

export default function HomePage() {
    const allPosts = getAllPosts()

    // Calculate views per category
    const stats = allPosts.reduce((acc, post) => {
        const category = post.category
        acc[category] = (acc[category] || 0) + (post.views || 0)
        return acc
    }, {} as Record<string, number>)

    return (
        <>
            <HeroSection />
            <PillarCards stats={stats} />
            <FeaturedPosts />
            <NewsletterSection />
        </>
    )
}
