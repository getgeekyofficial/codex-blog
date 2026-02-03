import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function MembershipSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8 flex justify-center">
                    <div className="p-4 rounded-full bg-neon-cyan/10 border-2 border-neon-cyan">
                        <CheckCircle className="w-16 h-16 text-neon-cyan" />
                    </div>
                </div>

                <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
                    Welcome to the Inner Circle
                </h1>

                <p className="text-xl text-muted-foreground mb-8">
                    Your membership is now active. You have unlocked exclusive access to premium content,
                    deep-dive reports, and the classified sections of Get Geeky.
                </p>

                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                    <h2 className="font-display text-2xl font-bold mb-4">What's Next?</h2>
                    <ul className="text-left space-y-3">
                        <li className="flex items-start gap-2">
                            <span className="text-neon-cyan mt-1">→</span>
                            <span>Check your email for a welcome message with login credentials</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-neon-cyan mt-1">→</span>
                            <span>Explore premium articles marked with the "Operative" badge</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-neon-cyan mt-1">→</span>
                            <span>Join our Discord community for exclusive discussions</span>
                        </li>
                    </ul>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button variant="neon" size="lg" asChild>
                        <Link href="/">Explore Premium Content</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/membership">View Membership</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
