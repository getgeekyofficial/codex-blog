"use client"

import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DonationButton() {
    return (
        <div className="my-12 p-8 bg-card border border-border rounded-xl text-center">
            <h3 className="font-display text-2xl font-bold mb-4">Enjoying the content?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Investigation requires resources. Accessing classified documents and maintaining our secure servers isn't free.
                Support independent truth-seeking.
            </p>
            <Button
                size="lg"
                className="bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 font-bold"
                onClick={() => window.open('https://buymeacoffee.com/getgeeky', '_blank')}
            >
                <Coffee className="mr-2" size={20} />
                Buy us a Coffee
            </Button>
        </div>
    )
}
