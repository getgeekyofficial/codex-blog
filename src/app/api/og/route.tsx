import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        const title = searchParams.get('title') || 'Get Geeky'
        const category = searchParams.get('category') || 'Article'
        const author = searchParams.get('author') || 'Get Geeky Team'

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
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
                        padding: '80px',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                letterSpacing: '2px',
                            }}
                        >
                            GET GEEKY
                        </div>
                    </div>

                    {/* Category Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 24px',
                            background: 'rgba(0, 255, 255, 0.1)',
                            border: '2px solid rgba(0, 255, 255, 0.5)',
                            borderRadius: '50px',
                            fontSize: '20px',
                            color: '#00ffff',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        {category}
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            maxWidth: '1000px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '64px',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                lineHeight: 1.2,
                                textShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                            }}
                        >
                            {title}
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
                            paddingTop: '30px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '24px',
                                color: '#888',
                            }}
                        >
                            By {author}
                        </div>
                        <div
                            style={{
                                fontSize: '24px',
                                color: '#888',
                            }}
                        >
                            getgeeky.blog
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: any) {
        console.error(e.message)
        return new Response('Failed to generate image', { status: 500 })
    }
}
