import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
    title: string
    description: string
    image: string
    url: string
    price?: string
    rating?: number
    features?: string[]
    badge?: string
}

export function ProductCard({
    title,
    description,
    image,
    url,
    price,
    rating = 5,
    features = [],
    badge
}: ProductCardProps) {
    return (
        <Card className="overflow-hidden border-border hover:border-neon-cyan/50 transition-all duration-300 my-8 bg-card/50">
            <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 min-h-[200px] md:min-h-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    {badge && (
                        <div className="absolute top-2 left-2">
                            <Badge className="bg-neon-cyan text-black font-bold">{badge}</Badge>
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col p-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-display text-2xl font-bold">{title}</h3>
                            {rating && (
                                <div className="flex text-yellow-500 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < rating ? "currentColor" : "none"}
                                            className={i < rating ? "" : "opacity-30"}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        {price && (
                            <div className="text-xl font-bold font-mono text-neon-cyan">{price}</div>
                        )}
                    </div>

                    <p className="text-muted-foreground mb-6 flex-1">{description}</p>

                    {features.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                            {features.map((feature, i) => (
                                <li key={i} className="text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}

                    <Button asChild size="lg" className="w-full sm:w-auto bg-neon-cyan text-black hover:bg-neon-cyan/90 font-bold">
                        <Link href={url} target="_blank" rel="noopener noreferrer">
                            Get Deal <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
