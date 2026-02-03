"use client"

import { NewsletterForm } from "@/components/growth/newsletter-form"

export function NewsletterSection() {
    return (
        <section id="newsletter" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Value Proposition */}
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Question Everything. Know More.
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Get exclusive insights, deep dives, and the stories that don't make mainstream news.
                            Join thousands who refuse to accept the official narrative.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Weekly investigative deep-dives",
                                "Exclusive research & analysis",
                                "Early access to new articles",
                                "No ads, no spam, no BS"
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-neon-cyan" />
                                    </div>
                                    <span className="text-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-card/50 border border-border rounded-lg">
                            <p className="text-sm text-muted-foreground italic">
                                "If this made you question something you thought was true, you'll like our weekly brief."
                            </p>
                        </div>
                    </div>

                    {/* Right: Newsletter Form */}
                    <div className="bg-card border border-border rounded-lg p-8 card-glow">
                        <div className="mb-6">
                            <h3 className="font-display text-2xl font-bold mb-2">
                                Join the Inner Circle
                            </h3>
                            <p className="text-muted-foreground">
                                Get the truth delivered to your inbox. Free, forever.
                            </p>
                        </div>

                        <NewsletterForm
                            variant="default"
                            placeholder="your@email.com"
                            buttonText="Subscribe Free"
                        />

                        <div className="mt-6 pt-6 border-t border-border">
                            <p className="text-xs text-muted-foreground text-center">
                                Join 10,000+ readers who get our weekly insights. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
