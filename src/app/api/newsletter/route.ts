import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { name, email } = await request.json()

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            )
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            )
        }

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
