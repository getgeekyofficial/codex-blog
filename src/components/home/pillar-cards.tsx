"use client"

color: "neon-cyan",
    },
{
    id: "science",
        title: "Geek Science",
            description:
    "Explore the cutting edge of quantum physics, AI consciousness, and technologies that blur the line between science fiction and reality. The future is stranger than you think.",
        icon: Atom,
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
                readTime: 15,
                    color: "neon-purple",
    },
{
    id: "psychology",
        title: "Psych Mind Hacks",
            description:
    "Master the hidden mechanisms of influence, persuasion, and cognitive biases. Learn the dark psychology techniques used by marketers, politicians, and master manipulators.",
        icon: Brain,
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
                readTime: 10,
                    color: "neon-magenta",
    },
]

interface PillarCardsProps {
    stats?: Record<string, number>
}

export function PillarCards({ stats }: PillarCardsProps) {
    return (
        <section id="pillars" className="py-20 px-4">
            <div className="container mx-auto">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
                    Choose Your Path
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => {
                        // Format views (e.g., 1200 -> 1.2k)
                        const rawViews = stats?.[pillar.id] || 0
                        const formattedViews = rawViews >= 1000
                            ? `${(rawViews / 1000).toFixed(1)}k`
                            : rawViews.toString()

                        return (
                            <Card
                                key={pillar.id}
                                className="group relative overflow-hidden border-border hover:border-neon-cyan transition-all duration-300 hover:card-glow-hover"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <pillar.icon className="w-16 h-16 text-neon-cyan" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content */}
                                <CardHeader>
                                    <CardTitle className="font-display text-2xl text-neon-cyan">
                                        {pillar.title}
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground leading-relaxed">
                                        {pillar.description}
                                    </CardDescription>
                                </CardHeader>

                                {/* Meta */}
                                <CardContent>
                                    <div className="flex gap-4 text-sm text-muted">
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {pillar.readTime} min read
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={16} />
                                            {formattedViews} views
                                        </span>
                                    </div>
                                </CardContent>

                                {/* Footer */}
                                <CardFooter>
                                    <Button variant="ghost" className="w-full group-hover:text-neon-cyan" asChild>
                                        <Link href={`/category/${pillar.id}`}>
                                            Read More →
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
