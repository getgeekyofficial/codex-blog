import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const subscribeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validation = subscribeSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message },
                { status: 400 }
            )
        }

        const { name, email } = validation.data

        // Check if ConvertKit is configured
        const apiSecret = process.env.CONVERTKIT_API_SECRET
        const formId = process.env.CONVERTKIT_FORM_ID

        if (apiSecret && formId) {
            // ConvertKit integration
            try {
                const response = await fetch(
                    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            api_secret: apiSecret,
                            email,
                            first_name: name,
                        }),
                    }
                )

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message || 'ConvertKit API error')
                }

                return NextResponse.json(
                    { message: "Successfully subscribed!" },
                    { status: 200 }
                )
            } catch (convertkitError) {
                // Log ConvertKit error but don't expose details to user
                if (process.env.NODE_ENV === 'development') {
                    console.error("ConvertKit error:", convertkitError)
                }
                return NextResponse.json(
                    { error: "Failed to subscribe. Please try again later." },
                    { status: 500 }
                )
            }
        } else {
            // Fallback: Log subscription for manual processing
            // In production, you might want to save to a database instead
            if (process.env.NODE_ENV === 'development') {
                console.log("📧 New subscriber (ConvertKit not configured):", { name, email })
            }

            return NextResponse.json(
                { message: "Successfully subscribed!" },
                { status: 200 }
            )
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Newsletter subscription error:", error)
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
