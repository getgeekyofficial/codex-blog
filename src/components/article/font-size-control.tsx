"use client"

import { useState, useEffect } from 'react'
import { Type, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type FontSize = 'small' | 'medium' | 'large' | 'extra-large'

const fontSizeMap: Record<FontSize, string> = {
    'small': '16px',
    'medium': '18px',
    'large': '20px',
    'extra-large': '24px',
}

const fontSizeLabels: Record<FontSize, string> = {
    'small': 'Small',
    'medium': 'Medium',
    'large': 'Large',
    'extra-large': 'Extra Large',
}

export function FontSizeControl() {
    const [fontSize, setFontSize] = useState<FontSize>('medium')

    useEffect(() => {
        // Load font size from localStorage
        const stored = localStorage.getItem('article-font-size') as FontSize | null
        if (stored && stored in fontSizeMap) {
            setFontSize(stored)
        }
    }, [])

    useEffect(() => {
        // Apply font size to article content
        const articleContent = document.querySelector('.article-content')
        if (articleContent) {
            (articleContent as HTMLElement).style.fontSize = fontSizeMap[fontSize]
        }
    }, [fontSize])

    const handleFontSizeChange = (newSize: FontSize) => {
        setFontSize(newSize)
        localStorage.setItem('article-font-size', newSize)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Type className="h-5 w-5" />
                    <span className="sr-only">Adjust font size</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {(Object.keys(fontSizeMap) as FontSize[]).map((size) => (
                    <DropdownMenuItem
                        key={size}
                        onClick={() => handleFontSizeChange(size)}
                        className={fontSize === size ? 'bg-accent' : ''}
                    >
                        <span style={{ fontSize: fontSizeMap[size] }}>
                            {fontSizeLabels[size]}
                        </span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
