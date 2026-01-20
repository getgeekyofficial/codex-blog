import { getAllPosts } from '@/lib/blog-utils'
import { CATEGORIES } from '@/types/blog'

export async function GET() {
    const posts = getAllPosts()
    const siteUrl = 'https://getgeeky.blog'

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Get Geeky - A feast of knowledge for curious minds</title>
    <link>${siteUrl}</link>
    <description>Explore conspiracy theories, cutting-edge science, and psychology insights. Question everything. Dive deeper.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
            .map(
                (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>getgeekyofficial@gmail.com (${post.author})</author>
      <category>${CATEGORIES[post.category].title}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
      <content:encoded><![CDATA[
        <img src="${post.image}" alt="${post.title}" />
        <p>${post.excerpt}</p>
        <p><a href="${siteUrl}/posts/${post.slug}">Read the full article</a></p>
      ]]></content:encoded>
    </item>
    `
            )
            .join('')}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
