import type { Post } from '@/types/blog'

interface StructuredDataProps {
    post: Post
}

export function StructuredData({ post }: StructuredDataProps) {
    const articleStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Get Geeky',
            logo: {
                '@type': 'ImageObject',
                url: 'https://getgeeky.blog/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://getgeeky.blog/posts/${post.slug}`,
        },
    }

    const breadcrumbStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://getgeeky.blog',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Articles',
                item: 'https://getgeeky.blog/all-posts',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://getgeeky.blog/posts/${post.slug}`,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleStructuredData),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbStructuredData),
                }}
            />
        </>
    )
}

export function OrganizationStructuredData() {
    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Get Geeky',
        url: 'https://getgeeky.blog',
        logo: 'https://getgeeky.blog/logo.png',
        description: 'Explore conspiracy theories, cutting-edge science, and psychology insights. Question everything. Dive deeper.',
        sameAs: [
            'https://twitter.com/getgeekyHQ',
            'https://www.youtube.com/@getgeekyofficial',
            'https://www.instagram.com/getgeekyofficial',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'getgeekyofficial@gmail.com',
            contactType: 'Customer Service',
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationData),
            }}
        />
    )
}
