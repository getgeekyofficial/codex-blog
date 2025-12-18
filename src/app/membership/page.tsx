import { PricingTable } from "@/components/monetization/pricing-table"

export const metadata = {
    title: 'Membership Clearance',
    description: 'Upgrade your clearance level for exclusive access to Get Geeky content.',
}

export default function MembershipPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient">
                        Select Your Clearance Level
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        The truth is out there, but deep intelligence requires higher access.
                        Join the inner circle of the Codex.
                    </p>
                </div>

                <PricingTable />

                <div className="mt-20 text-center max-w-2xl mx-auto text-muted-foreground text-sm">
                    <p>
                        Secure payment processing encrypted by Stripe. Cancel anytime.
                        Membership fees directly fund our investigations and server costs.
                    </p>
                </div>
            </div>
        </div>
    )
}
