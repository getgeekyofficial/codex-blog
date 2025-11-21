'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CopyCodeButtonProps {
    code: string
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
            {copied ? (
                <>
                    <Check size={14} className="mr-1" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy size={14} className="mr-1" />
                    Copy
                </>
            )}
        </Button>
    )
}
