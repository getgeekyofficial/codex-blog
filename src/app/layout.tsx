import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
})

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
    display: "swap",
    weight: ["400", "700", "900"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://getgeeky.blog"),
    title: {
        default: "Get Geeky - A feast of knowledge for curious minds",
        template: "%s | Get Geeky",
    },
    description:
        "Explore conspiracy theories, cutting-edge science, and psychology insights. Question everything. Dive deeper.",
    keywords: [
        "conspiracy theories",
        "geek science",
        "psychology",
        "technology",
        "deep dives",
        "curious minds",
    ],
    authors: [{ name: "Get Geeky Team" }],
    creator: "Get Geeky",
    publisher: "Get Geeky",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://getgeeky.blog",
        title: "Get Geeky - A feast of knowledge for curious minds",
        description:
            "Explore conspiracy theories, cutting-edge science, and psychology insights. Question everything. Dive deeper.",
        siteName: "Get Geeky",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Get Geeky",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Get Geeky - A feast of knowledge for curious minds",
        description:
            "Explore conspiracy theories, cutting-edge science, and psychology insights. Question everything. Dive deeper.",
        images: ["/og-image.jpg"],
        creator: "@getgeeky",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${orbitron.variable} dark`}>
            <body className="min-h-screen bg-background font-sans antialiased">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster />
                <Analytics />
            </body>
        </html>
    )
}
