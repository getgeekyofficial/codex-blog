"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type ColorScheme = 'cyber' | 'matrix' | 'sunset' | 'ocean'

interface ThemeContextType {
    colorScheme: ColorScheme
    setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Color scheme definitions
const colorSchemes = {
    cyber: {
        primary: '180 100% 50%', // cyan
        secondary: '300 100% 50%', // magenta
        accent: '273 100% 50%', // purple
        neonFrom: '#00ffff',
        neonTo: '#ff00ff',
    },
    matrix: {
        primary: '120 100% 50%', // green
        secondary: '160 100% 40%', // teal
        accent: '140 100% 45%', // lime
        neonFrom: '#00ff00',
        neonTo: '#00ff88',
    },
    sunset: {
        primary: '15 100% 60%', // orange
        secondary: '340 100% 60%', // pink
        accent: '280 100% 65%', // violet
        neonFrom: '#ff6b35',
        neonTo: '#ff006e',
    },
    ocean: {
        primary: '200 100% 50%', // blue
        secondary: '180 100% 40%', // cyan
        accent: '220 100% 60%', // indigo
        neonFrom: '#00b4d8',
        neonTo: '#0077b6',
    },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [colorScheme, setColorSchemeState] = useState<ColorScheme>('cyber')

    useEffect(() => {
        // Load color scheme from localStorage
        const stored = localStorage.getItem('colorScheme') as ColorScheme | null
        if (stored && stored in colorSchemes) {
            setColorSchemeState(stored)
        }
    }, [])

    useEffect(() => {
        const root = window.document.documentElement
        const scheme = colorSchemes[colorScheme]

        // Update CSS variables
        root.style.setProperty('--primary', scheme.primary)
        root.style.setProperty('--secondary', scheme.secondary)
        root.style.setProperty('--accent', scheme.accent)
        root.style.setProperty('--ring', scheme.primary)
        root.style.setProperty('--border', `${scheme.primary} / 0.1`)
        root.style.setProperty('--input', `${scheme.primary} / 0.2`)

        // Update neon colors for gradients
        root.style.setProperty('--neon-from', scheme.neonFrom)
        root.style.setProperty('--neon-to', scheme.neonTo)

        // Add data attribute for CSS selectors
        root.setAttribute('data-color-scheme', colorScheme)
    }, [colorScheme])

    const setColorScheme = (newScheme: ColorScheme) => {
        localStorage.setItem('colorScheme', newScheme)
        setColorSchemeState(newScheme)
    }

    return (
        <ThemeContext.Provider value={{ colorScheme, setColorScheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
