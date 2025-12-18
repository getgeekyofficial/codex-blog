import Link from "next/link"
import Image from "next/image"
import { Twitter, Instagram, Youtube, Mail } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        explore: [
            { label: "All Articles", href: "/all-posts" },
            { label: "Conspiracy Vault", href: "/category/conspiracy" },
            { label: "Geek Science", href: "/category/science" },
            { label: "Psych Mind Hacks", href: "/category/psychology" },
        ],
        community: [
            { label: "Become Member", href: "/#newsletter" },
            { label: "Submit Story", href: "/contact" },
            { label: "Contact Us", href: "/contact" },
            { label: "About", href: "/about" },
        ],
        legal: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/privacy#cookies" },
            { label: "Disclaimer", href: "/privacy#disclaimer" },
        ],
    }

    const socialLinks = [
        { icon: Twitter, href: "https://twitter.com/getgeekyHQ", label: "Twitter" },
        { icon: Instagram, href: "https://instagram.com/getgeekyofficial", label: "Instagram" },
        { icon: Youtube, href: "https://youtube.com/@getgeeky", label: "YouTube" },
        { icon: Mail, href: "mailto:hello@getgeeky.blog", label: "Email" },
    ]

    return (
        <footer className="bg-card border-t border-border mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo.png"
                                    alt="Get Geeky"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-display text-xl font-bold text-gradient">
                                GET GEEKY
                            </span>
                        </Link>
                        <p className="text-muted-foreground mb-4 max-w-sm">
                            A feast of knowledge for curious minds. Question everything. Dive deeper.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-neon-cyan transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="font-display font-bold mb-4 text-foreground">Explore</h4>
                        <ul className="space-y-2">
                            {footerLinks.explore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="font-display font-bold mb-4 text-foreground">Community</h4>
                        <ul className="space-y-2">
                            {footerLinks.community.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-display font-bold mb-4 text-foreground">Legal</h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-neon-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border pt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} Get Geeky. All rights reserved. Question everything.
                    </p>
                </div>
            </div>
        </footer>
    )
}
