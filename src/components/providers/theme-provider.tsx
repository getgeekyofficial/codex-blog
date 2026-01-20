"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    resolvedTheme: 'dark' | 'light'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark')
    const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark')

    useEffect(() => {
        // Load theme from localStorage
        const stored = localStorage.getItem('theme') as Theme | null
        if (stored) {
            setThemeState(stored)
        } else {
            setThemeState('system')
        }
    }, [])

    useEffect(() => {
        const root = window.document.documentElement

        // Remove existing theme classes
        root.classList.remove('light', 'dark')

        let effectiveTheme: 'dark' | 'light' = 'dark'

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            effectiveTheme = systemTheme
        } else {
            effectiveTheme = theme
        }

        root.classList.add(effectiveTheme)
        setResolvedTheme(effectiveTheme)
    }, [theme])

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme)
        setThemeState(newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
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
