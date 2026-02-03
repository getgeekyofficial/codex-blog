import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest) {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`)
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        )
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session
            console.log('💰 Payment successful:', session.id)
            // TODO: Grant access to user, store in database
            // For now, just log it
            break

        case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription
            console.log('❌ Subscription cancelled:', subscription.id)
            // TODO: Revoke access, update database
            break

        case 'customer.subscription.updated':
            const updatedSub = event.data.object as Stripe.Subscription
            console.log('🔄 Subscription updated:', updatedSub.id)
            // TODO: Update user access level
            break

        default:
            console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
