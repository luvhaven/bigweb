import React from 'react'
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

// Force dynamic rendering since we are fetching data based on slug
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const supabase = await createClient()
    const { data: post } = await supabase
        .from('cms_blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!post) return { title: 'Post Not Found' }

    return {
        title: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        openGraph: {
            images: [post.cover_image_url || '/og-image.jpg']
        }
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const supabase = await createClient()
    const { data: post, error } = await supabase
        .from('cms_blog_posts')
        .select(`
            *,
            category:cms_blog_categories(name, slug)
        `)
        .eq('slug', params.slug)
        .single()

    if (error || !post) {
        notFound()
    }

    // Basic markdown-like parsing (conceptually) - for now assuming raw text or simple HTML usage
    // In production, use 'react-markdown' or similar. 
    // We will render paragraphs by splitting by \n\n for this MVP.
    const contentParagraphs = post.content ? post.content.split('\n\n') : []

    return (
        <main className="min-h-screen bg-background selection:bg-accent/30">
            <ConversionNavigation />

            <article className="pt-24 pb-16">
                {/* Header */}
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-accent mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Knowledge Base
                    </Link>

                    <div className="flex flex-wrap gap-4 items-center mb-4 text-xs text-muted-foreground">
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-bold border border-accent/20">
                            {post.category?.name || 'Article'}
                        </span>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {post.reading_time_minutes} min read
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {new Date(post.published_at).toLocaleDateString()}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {post.cover_image_url && (
                        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-img:rounded-xl">
                        {contentParagraphs.map((paragraph: string, i: number) => {
                            // Simple parsing for headings
                            if (paragraph.startsWith('# ')) return <h1 key={i}>{paragraph.replace('# ', '')}</h1>
                            if (paragraph.startsWith('## ')) return <h2 key={i} className="text-3xl mt-12 mb-6 text-foreground">{paragraph.replace('## ', '')}</h2>
                            if (paragraph.startsWith('### ')) return <h3 key={i} className="text-2xl mt-8 mb-4 text-foreground">{paragraph.replace('### ', '')}</h3>
                            if (paragraph.startsWith('1. ')) {
                                // List hack
                                const items = paragraph.split('\n').map(l => l.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'))
                                return <ol key={i} className="list-decimal pl-6 space-y-2 mb-6 text-muted-foreground marker:text-accent">{items.map((item, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />)}</ol>
                            }

                            // Bold text replacement
                            const pContent = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-accent">$1</em>')

                            return <p key={i} className="mb-6 text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: pContent }} />
                        })}
                    </div>

                    {/* Author & Share */}
                    <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                                {post.author_avatar_url ? (
                                    <img src={post.author_avatar_url} alt={post.author_name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-accent text-white font-bold">
                                        {post.author_name ? post.author_name[0] : 'A'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-bold text-foreground">{post.author_name}</p>
                                <p className="text-xs text-muted-foreground">Conversion Engineer</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5">
                                <Linkedin className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            {/* CTA */}
            <section className="py-24 bg-card border-y border-border">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <h2 className="text-3xl font-bold mb-6">Need results like this?</h2>
                    <p className="text-muted-foreground mb-8">
                        Stop trying to figure it out alone. Get a forensic audit of your funnel in 48 hours.
                    </p>
                    <Link href="/offers/diagnostic">
                        <Button size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-accent-dark shadow-xl">
                            Start Your Diagnostic
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
