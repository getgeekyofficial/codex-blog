import { Post } from '@/types/blog'

export function JsonLd({ post }: { post: Post }) {
    const baseUrl = 'https://getgeeky.blog'
    const imageUrl = post.image.startsWith('http')
        ? post.image
        : `${baseUrl}${post.image}`

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
        datePublished: new Date(post.date).toISOString(),
        author: {
            '@type': 'Person',
            name: post.author || 'Get Geeky',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Get Geeky',
            // logo: {
            //     '@type': 'ImageObject',
            //     url: `${baseUrl}/logo.png`,
            // },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/posts/${post.slug}`,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
