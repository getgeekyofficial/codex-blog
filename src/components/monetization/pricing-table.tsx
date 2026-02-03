"use client"

import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { getStripe } from "@/lib/stripe"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

const tiers = [
    {
        name: "Observer",
        price: "Free",
        description: "Access to surface-level intelligence.",
        features: [
            "Weekly public articles",
            "Basic newsletter access",
            "Community comments (read-only)",
            "Ad-supported experience"
        ],
        cta: "Current Clearance",
        variant: "outline" as const,
        href: "#newsletter",
        priceId: null // Free tier
    },
    {
        name: "Operative",
        price: "$5/mo",
        description: "Deep dive access and community privileges.",
        features: [
            "Unlimited article access",
            "Ad-free reading experience",
            "Comment participation",
            "Deep Dive monthly reports",
            "Exclusive Discord channel"
        ],
        cta: "Upgrade Clearance",
        variant: "neon" as const,
        popular: true,
        priceId: process.env.NEXT_PUBLIC_STRIPE_OPERATIVE_PRICE_ID || null
    },
    {
        name: "Insider",
        price: "$15/mo",
        description: "Direct line to the source and inner circle access.",
        features: [
            "Everything in Operative",
            "Direct Q&A with authors",
            "Quarterly physical briefing",
            "Early access to podcasts",
            "Voting rights on future topics",
            "Insider badge on profile"
        ],
        cta: "Request Access",
        variant: "outline" as const,
        priceId: process.env.NEXT_PUBLIC_STRIPE_INSIDER_PRICE_ID || null
    }
]

export function PricingTable() {
    const [loading, setLoading] = useState<string | null>(null)
    const { toast } = useToast()

    const handleCheckout = async (priceId: string | null) => {
        if (!priceId) return; // Handle free tier separately if needed

        setLoading(priceId);

        try {
            // Call our checkout API
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed')
            }

            // Redirect to Stripe Checkout
            const stripe = await getStripe();
            if (!stripe) {
                throw new Error('Stripe not loaded')
            }

            const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })

            if (error) {
                throw new Error(error.message || 'Redirect failed')
            }

        } catch (err: any) {
            toast({
                title: "Checkout Error",
                description: err.message || "Failed to initiate checkout.",
                variant: "destructive",
            })
        } finally {
            setLoading(null);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier) => (
                <div
                    key={tier.name}
                    className={`relative flex flex-col p-8 bg-card border rounded-xl overflow-hidden ${tier.popular ? 'border-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.2)]' : 'border-border'
                        }`}
                >
                    {tier.popular && (
                        <div className="absolute top-0 right-0 bg-neon-cyan text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                            RECOMMENDED
                        </div>
                    )}
                    <h3 className="font-display text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="mb-4">
                        <span className="text-4xl font-bold">{tier.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-8 text-sm">{tier.description}</p>
                    <ul className="flex-1 space-y-4 mb-8">
                        {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm">
                                <Check className="text-neon-cyan shrink-0" size={16} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button
                        variant={tier.variant}
                        className="w-full"
                        disabled={!!loading && loading !== tier.priceId}
                        onClick={() => {
                            if (tier.priceId) {
                                handleCheckout(tier.priceId);
                            } else {
                                // Scroll to newsletter for free tier
                                const element = document.getElementById("newsletter");
                                element?.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        {loading === tier.priceId ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            tier.cta
                        )}
                    </Button>
                </div>
            ))}
        </div>
    )
}
