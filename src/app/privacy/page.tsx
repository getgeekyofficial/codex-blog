export const metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy and Terms of Service for Get Geeky',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="font-display text-5xl font-bold mb-8 text-gradient">
                    Privacy & Legal
                </h1>

                <div className="prose prose-invert max-w-none space-y-8">
                    {/* Privacy Policy */}
                    <section id="privacy" className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">Privacy Policy</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>

                            <h3 className="text-xl font-bold text-foreground mt-6">Information We Collect</h3>
                            <p>
                                We collect minimal information to provide you with a better experience:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Email addresses (only if you voluntarily subscribe to our newsletter)</li>
                                <li>Usage data (via Vercel Analytics to understand site traffic)</li>
                                <li>Performance metrics (via Vercel Speed Insights to optimize loading times)</li>
                            </ul>

                            <h3 className="text-xl font-bold text-foreground mt-6">How We Use Your Data</h3>
                            <p>Your information is used solely to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Send you newsletter updates (if subscribed)</li>
                                <li>Improve site performance and user experience</li>
                                <li>Analyze traffic patterns</li>
                            </ul>

                            <h3 className="text-xl font-bold text-foreground mt-6" id="cookies">Cookie Policy</h3>
                            <p>
                                We use minimal cookies for analytics purposes only. These help us understand how visitors
                                interact with our site to improve your experience.
                            </p>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <section id="disclaimer" className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">Disclaimer</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                The content on Get Geeky is provided for informational and entertainment purposes only.
                                We present various perspectives, including conspiracy theories, which should not be taken as fact.
                            </p>
                            <p>
                                <strong className="text-foreground">Please note:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Always verify information from multiple sources</li>
                                <li>We do not claim all content as absolute truth</li>
                                <li>Articles represent authors' opinions and research</li>
                                <li>Critical thinking is encouraged</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-card/50 border border-border/50 rounded-lg p-8">
                        <h2 className="font-display text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-muted-foreground">
                            For privacy concerns or questions:{' '}
                            <a href="mailto:privacy@getgeeky.blog" className="text-neon-cyan hover:underline">
                                privacy@getgeeky.blog
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
