"use client"

export function HoodedFigure() {
    return (
        <svg
            className="w-64 h-80 md:w-80 md:h-96 animate-float"
            viewBox="0 0 400 500"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#00ffff", stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: "#ff00ff", stopOpacity: 0.8 }} />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Hood */}
            <path
                d="M 200 50 Q 150 80 140 150 L 140 200 Q 140 250 160 280 L 200 350 L 240 280 Q 260 250 260 200 L 260 150 Q 250 80 200 50 Z"
                fill="#0a0a0a"
                stroke="url(#neonGlow)"
                strokeWidth="2"
                filter="url(#glow)"
            />

            {/* Face shadow */}
            <ellipse cx="200" cy="180" rx="40" ry="50" fill="#000000" opacity="0.9" />

            {/* Eyes glow */}
            <circle cx="185" cy="175" r="5" fill="#00ffff" filter="url(#glow)">
                <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="3s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="215" cy="175" r="5" fill="#00ffff" filter="url(#glow)">
                <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="3s"
                    repeatCount="indefinite"
                />
            </circle>

            {/* Body */}
            <path
                d="M 160 280 L 140 450 L 180 480 L 200 400 L 220 480 L 260 450 L 240 280 Z"
                fill="#0a0a0a"
                stroke="url(#neonGlow)"
                strokeWidth="1.5"
                opacity="0.8"
            />

            {/* Digital code particles */}
            <text
                x="100"
                y="150"
                fontFamily="monospace"
                fontSize="12"
                fill="#00ffff"
                opacity="0.6"
            >
                01001
            </text>
            <text
                x="280"
                y="200"
                fontFamily="monospace"
                fontSize="10"
                fill="#ff00ff"
                opacity="0.5"
            >
                11010
            </text>
            <text
                x="120"
                y="320"
                fontFamily="monospace"
                fontSize="14"
                fill="#00ffff"
                opacity="0.7"
            >
                10110
            </text>
            <text
                x="270"
                y="350"
                fontFamily="monospace"
                fontSize="11"
                fill="#ff00ff"
                opacity="0.6"
            >
                01101
            </text>
        </svg>
    )
}
