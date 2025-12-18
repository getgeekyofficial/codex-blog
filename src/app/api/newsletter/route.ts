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

        // TODO: Integrate with ConvertKit
        // For now, we'll log the subscription
        console.log("New subscriber:", { name, email })

        // In production, you would call ConvertKit API:
        // const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     api_key: process.env.CONVERTKIT_API_KEY,
        //     email,
        //     first_name: name,
        //   }),
        // })

        return NextResponse.json(
            { message: "Successfully subscribed!" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Newsletter subscription error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
