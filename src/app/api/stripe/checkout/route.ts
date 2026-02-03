import { NextRequest, NextResponse } from 'next/server'
import { getServerStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
    try {
        const { priceId } = await req.json()

        if (!priceId) {
            return NextResponse.json(
                { error: 'Price ID is required' },
                { status: 400 }
            )
        }

        const stripe = getServerStripe()

        if (!stripe) {
            return NextResponse.json(
                { error: 'Stripe not configured' },
                { status: 500 }
            )
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/membership`,
            allow_promotion_codes: true,
        })

        return NextResponse.json({ sessionId: session.id })
    } catch (error: any) {
        console.error('Checkout error:', error)
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        )
    }
}
