import { HeroSection } from "@/components/home/hero-section"
import { PillarCards } from "@/components/home/pillar-cards"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { FeaturedPosts } from "@/components/home/featured-posts"

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <PillarCards />
            <FeaturedPosts />
            <NewsletterSection />
        </>
    )
}
