import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const title = searchParams.get('title') || 'Get Geeky'
        const category = searchParams.get('category') || 'Articles'
        const researchLevel = searchParams.get('research') || ''

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        backgroundColor: '#0a0a0a',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 0, 255, 0.1) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        padding: 60,
                    }}
                >
                    {/* Header with Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: '#000',
                            }}
                        >
                            G
                        </div>
                        <div
                            style={{
                                fontSize: 28,
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                letterSpacing: 2,
                            }}
                        >
                            GET GEEKY
                        </div>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                            maxWidth: 1000,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 64,
                                fontWeight: 'bold',
                                color: '#ffffff',
                                lineHeight: 1.2,
                                textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                            }}
                        >
                            {title}
                        </div>
                    </div>

                    {/* Footer Meta */}
                    <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
                        <div
                            style={{
                                fontSize: 22,
                                color: '#00ffff',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: 2,
                            }}
                        >
                            {category}
                        </div>
                        {researchLevel && (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: '#ffffff',
                                    opacity: 0.7,
                                    border: '2px solid rgba(0, 255, 255, 0.5)',
                                    padding: '8px 16px',
                                    borderRadius: 8,
                                }}
                            >
                                {researchLevel}
                            </div>
                        )}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: any) {
        console.error(e)
        return new Response(`Failed to generate image: ${e.message}`, {
            status: 500,
        })
    }
}
