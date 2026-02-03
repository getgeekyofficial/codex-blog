import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const subscribeSchema = z.object({
    email: z.string().email('Invalid email address'),
    tags: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, tags } = subscribeSchema.parse(body)

        // TODO: Integrate with your email service provider
        // Examples:

        // ConvertKit:
        // const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         api_key: process.env.CONVERTKIT_API_KEY,
        //         email,
        //         tags
        //     })
        // })

        // Mailchimp:
        // const response = await fetch(`https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`
        //     },
        //     body: JSON.stringify({
        //         email_address: email,
        //         status: 'subscribed',
        //         tags: tags || []
        //     })
        // })

        // SIMULATION MODE
        // Since no email provider is connected, we log the capturing of the lead.
        const timestamp = new Date().toISOString()
        console.log(`[SIMULATION] New Lead Captured: ${email} | Tags: ${tags?.join(', ')} | Time: ${timestamp}`)
        console.log(`[ACTION REQUIRED] Connect ConvertKit or Mailchimp to process this lead real-time.`)

        // Simulate success
        return NextResponse.json(
            { success: true, message: 'Successfully subscribed!' },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Invalid email address' },
                { status: 400 }
            )
        }

        console.error('Newsletter subscription error:', error)
        return NextResponse.json(
            { success: false, error: 'Subscription failed. Please try again.' },
            { status: 500 }
        )
    }
}
