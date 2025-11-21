import { getAllPosts } from '@/lib/blog-utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AllPostsClient } from '@/components/posts/all-posts-client'

export default function AllPostsPage() {
    const allPosts = getAllPosts()

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-card/50 to-background py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Button asChild>
                            <Link href="/">
                                <ArrowLeft className="mr-2" size={20} />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Header */}
                    <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-gradient">
                        All Articles
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Explore all {allPosts.length} articles across conspiracy, science, and psychology
                    </p>
                </div>
            </div>

            {/* Client Component for Filtering */}
            <AllPostsClient posts={allPosts} />
        </div>
    )
}
