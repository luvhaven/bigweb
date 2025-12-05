import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blog-data'
import { agency } from '@/config/agency'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const post = blogPosts.find((p) => p.slug === params.slug)
    if (!post) return {}

    return {
        title: `${post.title} | ${agency.name}`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            authors: [post.author.name],
            publishedTime: post.date,
        },
    }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = blogPosts.find((p) => p.slug === params.slug)

    if (!post) {
        notFound()
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        author: {
            '@type': 'Person',
            name: post.author.name,
            jobTitle: post.author.role,
            url: `${agency.domain}/team/${post.author.name.toLowerCase().replace(' ', '-')}`,
        },
        publisher: {
            '@type': 'Organization',
            name: agency.name,
            logo: {
                '@type': 'ImageObject',
                url: `${agency.domain}/logo.png`,
            },
        },
        datePublished: post.date,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${agency.domain}/blog/${post.slug}`,
        },
    }

    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navigation />

            <article className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {post.date}
                            </span>
                            <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {post.readTime}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            {post.title}
                        </h1>

                        {/* Author Byline - Critical for E-E-A-T */}
                        <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border/50">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                    src={post.author.image}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-foreground">{post.author.name}</div>
                                <div className="text-sm text-muted-foreground">{post.author.role}</div>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-lg prose-invert max-w-none">
                        <p className="lead text-xl text-muted-foreground mb-8">
                            {post.excerpt}
                        </p>
                        {/* Mock Content */}
                        <div className="space-y-6 text-muted-foreground">
                            <p>
                                In the rapidly evolving landscape of digital technology, {post.title.toLowerCase()} represents a paradigm shift. At {agency.name}, we've observed that organizations adopting these methodologies see a 40% increase in operational efficiency.
                            </p>
                            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">The Strategic Advantage</h2>
                            <p>
                                Implementing this approach isn't just about technology; it's about fundamental business transformation. Our data shows that early adopters gain a significant competitive edge.
                            </p>
                            <blockquote className="border-l-4 border-accent pl-6 italic text-foreground my-8">
                                "The integration of AI into web development isn't a trend—it's the new standard for digital excellence."
                            </blockquote>
                            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Looking Ahead</h2>
                            <p>
                                As we move towards 2026, the convergence of these technologies will only accelerate. {agency.name} is committed to leading this charge, ensuring our partners stay ahead of the curve.
                            </p>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    )
}
