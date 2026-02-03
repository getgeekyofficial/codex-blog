import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { CopyCodeButton } from './copy-code-button'
import { AlertTriangle, Info, CheckCircle, AlertCircle, Zap } from 'lucide-react'
import { ProductCard } from '@/components/monetization/product-card'
import { PremiumLock } from '@/components/monetization/premium-lock'

// Custom MDX components
const components = {
    ProductCard,
    PremiumLock,
    // ... (rest remains same)
    // ... (h1-h4, p, ul, ol, li remain same)
    h1: ({ children, ...props }: any) => (
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-8 mb-4 text-gradient" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: any) => {
        const id = children?.toString().toLowerCase().replace(/\s+/g, '-') || ''
        return (
            <h2 id={id} className="font-display text-3xl md:text-4xl font-bold mt-12 mb-4 scroll-mt-24" {...props}>
                {children}
            </h2>
        )
    },
    h3: ({ children, ...props }: any) => {
        const id = children?.toString().toLowerCase().replace(/\s+/g, '-') || ''
        return (
            <h3 id={id} className="font-display text-2xl md:text-3xl font-bold mt-8 mb-3 scroll-mt-24" {...props}>
                {children}
            </h3>
        )
    },
    h4: ({ children, ...props }: any) => (
        <h4 className="font-display text-xl md:text-2xl font-bold mt-6 mb-2" {...props}>
            {children}
        </h4>
    ),
    p: ({ children, ...props }: any) => (
        <p className="text-base md:text-lg leading-relaxed mb-4 text-foreground/90" {...props}>
            {children}
        </p>
    ),
    ul: ({ children, ...props }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-foreground/90" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground/90" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }: any) => (
        <li className="ml-4" {...props}>
            {children}
        </li>
    ),
    blockquote: ({ children, ...props }: any) => {
        // Handle GitHub Alerts
        let content = children
        let alertType = null

        // Deep check for alert syntax mostly found in the first paragraph child
        if (children?.props?.children && typeof children.props.children === 'string') {
            const text = children.props.children
            const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i)
            if (match) {
                alertType = match[1].toUpperCase()
                // Remove the alert tag from the text
                const cleanText = text.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '')
                // Create a new element with cleaned text
                content = <p {...children.props}>{cleanText}</p>
            }
        }
        // Also handling if the first child is an array (common in complex MDX)
        else if (Array.isArray(children)) {
            const firstChild = children[0]
            if (firstChild?.props?.children && typeof firstChild.props.children === 'string') {
                const text = firstChild.props.children
                const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i)
                if (match) {
                    alertType = match[1].toUpperCase()
                    const cleanText = text.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, '')
                    const newFirstChild = <p {...firstChild.props}>{cleanText}</p>
                    content = [newFirstChild, ...children.slice(1)]
                }
            }
        }

        if (alertType) {
            const alertStyles: Record<string, string> = {
                NOTE: 'border-neon-purple text-neon-purple/90',
                TIP: 'border-neon-cyan text-neon-cyan/90',
                IMPORTANT: 'border-neon-magenta text-neon-magenta/90',
                WARNING: 'border-yellow-500 text-yellow-500/90',
                CAUTION: 'border-red-500 text-red-500/90'
            }

            const Icon = {
                NOTE: Info,
                TIP: Zap,
                IMPORTANT: AlertCircle,
                WARNING: AlertTriangle,
                CAUTION: AlertTriangle
            }[alertType as keyof typeof alertStyles] || Info

            return (
                <div className={`border-l-4 rounded-r bg-card/50 p-4 my-6 ${alertStyles[alertType]}`} {...props}>
                    <div className="font-bold mb-2 flex items-center gap-2">
                        <Icon size={20} />
                        {alertType}
                    </div>
                    <div className="text-foreground/90">
                        {content}
                    </div>
                </div>
            )
        }

        return (
            <blockquote className="border-l-4 border-neon-cyan pl-4 py-2 my-4 italic bg-card/50 rounded-r" {...props}>
                {children}
            </blockquote>
        )
    },
    // ... (rest of components)
    a: ({ children, href, ...props }: any) => (
        <a
            href={href}
            className="text-neon-cyan hover:text-neon-purple underline underline-offset-2 transition-colors"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        >
            {children}
        </a>
    ),
    code: ({ children, className, ...props }: any) => {
        const isInline = !className
        if (isInline) {
            return (
                <code className="px-1.5 py-0.5 bg-card border border-border rounded text-sm font-mono text-neon-cyan" {...props}>
                    {children}
                </code>
            )
        }
        return <code className={className} {...props}>{children}</code>
    },
    pre: ({ children, ...props }: any) => {
        // Extract code content for copy button
        const code = children?.props?.children || ''
        return (
            <div className="relative group my-6">
                <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto font-mono text-sm" {...props}>
                    {children}
                </pre>
                <CopyCodeButton code={typeof code === 'string' ? code : String(code)} />
            </div>
        )
    },
    img: ({ src, alt, ...props }: any) => (
        <img src={src} alt={alt} className="rounded-lg my-6 w-full" {...props} />
    ),
    hr: (props: any) => (
        <hr className="my-8 border-border" {...props} />
    ),
    table: ({ children, ...props }: any) => (
        <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-border" {...props}>
                {children}
            </table>
        </div>
    ),
    th: ({ children, ...props }: any) => (
        <th className="border border-border bg-card px-4 py-2 text-left font-semibold" {...props}>
            {children}
        </th>
    ),
    td: ({ children, ...props }: any) => (
        <td className="border border-border px-4 py-2" {...props}>
            {children}
        </td>
    ),
}

interface MDXContentProps {
    content: string
}


export function MDXContent({ content }: MDXContentProps) {
    return (
        <div className="prose prose-invert max-w-none">
            <MDXRemote
                source={content}
                components={components}
            />
        </div>
    )
}
