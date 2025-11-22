export const metadata = {
    title: 'About Get Geeky',
    description: 'Learn about Get Geeky - the universe for minds that don\'t fit the mold.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gradient text-center">
                    About
                </h1>

                <div className="prose prose-invert max-w-none space-y-8">
                    <div className="bg-card border border-border rounded-lg p-8">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Welcome to GetGeeky — the universe for minds that don't fit the mold. This is a
                            movement for the builders, the thinkers, the creators who refuse to settle for what
                            is when they imagine what could be. Here, questions aren't discouraged — they fuel us.
                            If you've ever thought, "There has to be something better," then you're in the right place.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">What we are</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            GetGeeky is not here to preach — it's a growing empire of thinkers, builders, and
                            creators obsessed with solving real problems. We exist for those who want to go
                            deeper than the surface, question the narrative, and design a future worth living in.
                            We believe our hands are the most powerful tools we've got.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">How we think</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We value the pursuit of truth and the responsibility to wield it well. We explore
                            ethical and non-ethical frameworks to understand the full landscape of ideas. But
                            here's the catch: we infuse intellectual depth with clarity, curiosity is our compass,
                            accountability is our anchor. Growth is the goal, not blind belief.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">What we do</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• Investigate undiscovered questions with deep research, synthesis, and original analysis</li>
                            <li>• Build systems, tools, and simple models that can impact their thought and life's course</li>
                            <li>• Create content that challenges assumptions and rewire perspectives — not merely inform</li>
                        </ul>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">Who this is for</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            GetGeeky is for the restless, the default soldiers of many cults want to make their script:
                        </p>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• Deep thinkers, Builders who take values upon real work and resources over optics</li>
                            <li>• The well-truth community without conformity — skeptics in mindset, diverse in method</li>
                        </ul>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">The path to Codex</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Codex is our next step — a living blueprint for becoming the ultimate specialist.
                            It combines deep knowledge with simplified frameworks to help build mastery, connection,
                            productivity. The union of wisdom and war. We're building it together, and you're invited
                            to be part of what the Codex becomes.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">Culture, not cult</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Call it a pact if you want — we call it a commitment. No worship, no idols, no tribalism
                            we have a north star. We stay curious, We stand for truth. We reject blind belief and
                            empty self & shame safe in the shadows. We build, we think, we belong to no single box.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">The pact</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• We think in context</li>
                            <li>• Build more than we consume</li>
                            <li>• Question before you trust</li>
                            <li>• Own the consequence. Always.</li>
                        </ul>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4">Editorial Standards</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We are committed to originality and integrity. All content on Get Geeky is original, researched, and written by our team. We do not plagiarize. When we reference external ideas or data, we provide clear attribution. We believe in giving credit where it is due and building upon the collective knowledge of humanity with respect and honesty.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-magenta/10 border border-neon-cyan/30 rounded-lg p-8">
                        <h2 className="font-display text-3xl font-bold mb-4 text-gradient">Join the empire</h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            If the things feels off-axis, make something stronger than cynicism, mastery matters
                            more than momentum. If you want to build and belong at a time, you belong with us.
                            Join our tribe. Let's get strong together.
                        </p>
                        <a
                            href="/#newsletter"
                            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-bold rounded-md hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
                        >
                            Go to homepage
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
