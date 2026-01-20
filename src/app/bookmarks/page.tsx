import { getAllPosts } from '@/lib/blog-utils'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Calendar, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'Bookmarks',
    description: 'Your saved articles for later reading',
}

export default function BookmarksPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
                    Your Bookmarks
                </h1>
                <p className="text-xl text-muted-foreground">
                    Articles you've saved for later reading
                </p>
            </div>

            {/* Client-side bookmarks will be loaded via JavaScript */}
            <div id="bookmarks-container">
                <div className="text-center py-12">
                    <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                        Your bookmarks will appear here
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Click the bookmark icon on any article to save it for later
                    </p>
                </div>
            </div>

            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
                            const container = document.getElementById('bookmarks-container');
                            
                            if (bookmarks.length === 0) return;
                            
                            container.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>';
                            const grid = container.querySelector('div');
                            
                            bookmarks.reverse().forEach(bookmark => {
                                const card = document.createElement('div');
                                card.innerHTML = \`
                                    <a href="/posts/\${bookmark.slug}">
                                        <div class="h-full border border-border rounded-lg overflow-hidden hover:border-neon-cyan transition-all duration-300 hover:card-glow-hover cursor-pointer group bg-card">
                                            <div class="p-6">
                                                <h3 class="font-display text-lg font-bold mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">
                                                    \${bookmark.title}
                                                </h3>
                                                <p class="text-sm text-muted-foreground">
                                                    Saved \${new Date(bookmark.timestamp).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                \`;
                                grid.appendChild(card);
                            });
                        })();
                    `,
                }}
            />
        </div>
    )
}
