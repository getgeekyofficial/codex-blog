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

        // CONVERTKIT / KIT INTEGRATION
        const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY || process.env.CONVERTKIT_API_KEY
        const FORM_ID = process.env.CONVERTKIT_FORM_ID

        if (!API_KEY || !FORM_ID) {
            console.error('ConvertKit credentials missing in .env.local')
            // Fallback to simulation logging if keys are missing
            console.log(`[SIMULATION (Missing Keys)] New Lead: ${email}`)
            throw new Error('Server misconfiguration: Missing Email API Keys')
        }

        const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: API_KEY,
                email,
                tags: tags || []
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('ConvertKit Error:', data)
            throw new Error(data.message || 'Failed to subscribe')
        }

        return NextResponse.json(
            { success: true, message: 'Welcome to the Inner Circle.' },
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
