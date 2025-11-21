export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                {/* 404 Graphic */}
                <div className="mb-8">
                    <h1 className="font-display text-9xl md:text-[12rem] font-bold text-gradient mb-4">
                        404
                    </h1>
                    <div className="h-1 w-32 mx-auto bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta rounded-full" />
                </div>

                {/* Message */}
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                    The page you're looking for doesn't exist or has been moved to another dimension.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-bold rounded-md hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
                    >
                        Return Home
                    </a>
                    <a
                        href="/all-posts"
                        className="inline-flex items-center justify-center px-6 py-3 border border-border bg-card text-foreground font-semibold rounded-md hover:border-neon-cyan transition-colors"
                    >
                        Browse Articles
                    </a>
                </div>

                {/* Suggestions */}
                <div className="mt-12 text-sm text-muted-foreground">
                    <p>Try searching for what you need or explore our categories:</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <a href="/category/conspiracy" className="hover:text-neon-cyan transition-colors">
                            Conspiracy
                        </a>
                        <span>•</span>
                        <a href="/category/science" className="hover:text-neon-cyan transition-colors">
                            Science
                        </a>
                        <span>•</span>
                        <a href="/category/psychology" className="hover:text-neon-cyan transition-colors">
                            Psychology
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
