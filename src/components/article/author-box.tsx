"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Twitter, Youtube, Instagram, Mail } from 'lucide-react'

interface AuthorBoxProps {
    name: string
    bio?: string
    avatar?: string
    className?: string
}

const AUTHOR_INFO = {
    'Get Geeky': {
        bio: 'Investigating the hidden narratives, cutting-edge science, and psychological mechanisms that shape our reality. We question everything and follow the evidence.',
        avatar: '/images/author-avatar.png',
        social: {
            twitter: 'https://twitter.com/getgeekyHQ',
            youtube: 'https://www.youtube.com/@getgeekyofficial',
            instagram: 'https://www.instagram.com/getgeekyofficial',
            email: 'mailto:getgeekyofficial@gmail.com'
        }
    }
}

export function AuthorBox({ name, bio, avatar, className = '' }: AuthorBoxProps) {
    const authorData = AUTHOR_INFO[name as keyof typeof AUTHOR_INFO] || {
        bio: bio || 'Contributing author at Get Geeky',
        avatar: avatar || '/images/default-avatar.png',
        social: AUTHOR_INFO['Get Geeky'].social
    }

    return (
        <div className={`flex gap-4 p-6 bg-card border border-border rounded-lg ${className}`}>
            <div className="shrink-0">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                    <Image
                        src={authorData.avatar}
                        alt={name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                        }}
                    />
                    {/* Fallback icon if image doesn't load */}
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                        {name.charAt(0)}
                    </div>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                        <h4 className="font-display font-bold text-lg">{name}</h4>
                        <p className="text-sm text-muted-foreground">Author</p>
                    </div>
                    <div className="flex gap-2">
                        {authorData.social.twitter && (
                            <Link
                                href={authorData.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-neon-cyan transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </Link>
                        )}
                        {authorData.social.youtube && (
                            <Link
                                href={authorData.social.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-neon-cyan transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube size={18} />
                            </Link>
                        )}
                        {authorData.social.instagram && (
                            <Link
                                href={authorData.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-neon-cyan transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} />
                            </Link>
                        )}
                        {authorData.social.email && (
                            <Link
                                href={authorData.social.email}
                                className="text-muted-foreground hover:text-neon-cyan transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </Link>
                        )}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {authorData.bio}
                </p>
            </div>
        </div>
    )
}
