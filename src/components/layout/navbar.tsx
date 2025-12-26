"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/ascension", label: "Ascension" },
        { href: "/all-posts", label: "All Articles" },
        { href: "/category/conspiracy", label: "Conspiracy" },
        { href: "/category/science", label: "Science" },
        { href: "/category/psychology", label: "Psychology" },
    ]

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/95 backdrop-blur-md border-b border-border"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo.png"
                                alt="Get Geeky"
                                fill
                                className="object-contain transition-transform group-hover:scale-110"
                            />
                        </div>
                        <span className="font-display text-xl font-bold text-gradient">
                            GET GEEKY
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-foreground/80 hover:text-foreground transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                        <li>
                            <div className="flex items-center gap-4">
                                <Button variant="neon" size="sm" asChild className="group">
                                    <Link href="https://getgeeky.org" target="_blank" rel="noopener noreferrer">
                                        <Rocket className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                        Launch App
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/membership">Become Member</Link>
                                </Button>
                            </div>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <ul className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Button variant="neon" className="w-full group" asChild>
                                    <Link href="https://getgeeky.org" target="_blank" rel="noopener noreferrer">
                                        <Rocket className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                                        Launch App
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/membership">Become Member</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}
