export const metadata = {
    title: 'Submit Your Story',
    description: 'Have a conspiracy theory, scientific breakthrough, or psychological insight to share? Submit your story to Get Geeky.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
                        Submit Your Story
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Got a mind-bending conspiracy, groundbreaking science, or fascinating psychology insight?
                        We want to hear from you!
                    </p>
                </div>

                {/* Contact Info */}
                <div className="bg-card border border-border rounded-lg p-8 mb-8">
                    <h2 className="font-display text-2xl font-bold mb-4">Get In Touch</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            <strong className="text-foreground">Email:</strong>{' '}
                            <a href="mailto:submit@getgeeky.blog" className="text-neon-cyan hover:underline">
                                submit@getgeeky.blog
                            </a>
                        </p>
                        <p>
                            <strong className="text-foreground">What to include:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Your name and brief bio</li>
                            <li>Story title and category (Conspiracy, Science, or Psychology)</li>
                            <li>Article summary (2-3 sentences)</li>
                            <li>Full article text (1000-2000 words preferred)</li>
                            <li>Any relevant images or sources</li>
                        </ul>
                    </div>
                </div>

                {/* Guidelines */}
                <div className="bg-card/50 border border-border/50 rounded-lg p-8">
                    <h2 className="font-display text-2xl font-bold mb-4">Submission Guidelines</h2>
                    <div className="space-y-3 text-muted-foreground">
                        <p>✅ Original content or properly attributed research</p>
                        <p>✅ Well-researched with credible sources</p>
                        <p>✅ Engaging and thought-provoking</p>
                        <p>✅ Fits our pillars: Conspiracy, Science, or Psychology</p>
                        <p className="mt-6 text-sm">
                            We review all submissions within 5-7 business days.
                            Selected articles will be published with full credit to the author.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
