"use client"

import { useState } from "react"
import { Gift, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterSection() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            })

            if (response.ok) {
                toast({
                    title: "Welcome to the tribe!",
                    description: "Check your email for the free e-book.",
                })
                setName("")
                setEmail("")
            } else {
                throw new Error("Subscription failed")
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section id="newsletter" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Benefits */}
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient">
                            Join the Tribe
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Get exclusive access to deep-dive investigations, hidden knowledge, and
                            psychological insights that mainstream media won't touch.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Weekly deep-dive articles",
                                "Exclusive member-only content",
                                "Early access to investigations",
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-neon-cyan" />
                                    </div>
                                    <span className="text-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-card border border-border rounded-lg p-8 card-glow">
                        <div className="flex items-center gap-3 mb-6">
                            <Gift className="w-8 h-8 text-neon-magenta" />
                            <div>
                                <h3 className="font-display text-xl font-bold">Free E-Book</h3>
                                <p className="text-sm text-muted-foreground">
                                    23 Hidden Science Facts & Dark Psychology Tricks
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="pl-10"
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="neon"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? "Subscribing..." : "Get Free E-Book"}
                            </Button>

                            <p className="text-xs text-muted-foreground text-center">
                                We respect your privacy. Unsubscribe anytime.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
