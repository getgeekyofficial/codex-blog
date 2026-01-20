"use client"

import { Palette } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const schemes = [
    { value: 'cyber' as const, label: 'Cyber', colors: 'from-cyan-500 to-magenta-500' },
    { value: 'matrix' as const, label: 'Matrix', colors: 'from-green-500 to-teal-500' },
    { value: 'sunset' as const, label: 'Sunset', colors: 'from-orange-500 to-pink-500' },
    { value: 'ocean' as const, label: 'Ocean', colors: 'from-blue-500 to-cyan-500' },
]

export function ThemeToggle() {
    const { colorScheme, setColorScheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Palette className="h-5 w-5" />
                    <span className="sr-only">Change color scheme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {schemes.map((scheme) => (
                    <DropdownMenuItem
                        key={scheme.value}
                        onClick={() => setColorScheme(scheme.value)}
                        className={colorScheme === scheme.value ? 'bg-accent' : ''}
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${scheme.colors}`} />
                            <span>{scheme.label}</span>
                            {colorScheme === scheme.value && (
                                <span className="ml-auto text-xs">✓</span>
                            )}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
