import { getBlogPostBySlug } from '@/actions/blog'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import StickyCTABar from '@/components/mobile/StickyCTABar'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const breadcrumbItems = [
        { label: 'Digital Almanac', href: '/blog' },
        { label: post.title, href: `/blog/${post.slug}` }
    ]

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-accent/20">
            {/* SEO Structured Data */}
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
            ]} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://bigwebdigital.com/blog/${post.slug}`
                        },
                        headline: post.title,
                        description: post.excerpt || (post.content ? post.content.slice(0, 160).replace(/<[^>]*>?/gm, '') : ''),
                        image: post.cover_image || 'https://bigwebdigital.com/og-image.jpg',
                        author: {
                            '@type': 'Organization', // Can map to Person if we fetch Author profile
                            name: post.author || 'BIGWEB Digital'
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'BIGWEB Digital',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://bigwebdigital.com/logo.png'
                            }
                        },
                        datePublished: post.published_at || new Date().toISOString(),
                        dateModified: post.published_at || new Date().toISOString()
                    })
                }}
            />

            <AdvancedNavigation />

            <div className="container mx-auto px-6 pt-32 pb-10">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <article className="pb-32">
                {/* Header */}
                <header className="container mx-auto px-6 lg:px-16 pt-10 pb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center items-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
                            <span>{post.category}</span>
                            {post.read_time && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                    <span>{post.read_time} min read</span>
                                </>
                            )}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display leading-[1.05] tracking-tight mb-8">
                            {post.title}
                        </h1>
                        {post.excerpt && (
                            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                                {post.excerpt}
                            </p>
                        )}

                        {post.published_at && (
                            <div className="mt-8 text-sm text-zinc-600 font-mono">
                                Published on {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        )}
                    </div>
                </header>

                {/* Cover Image */}
                {post.cover_image && (
                    <div className="container mx-auto px-6 lg:px-16 mb-20">
                        <div className="w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden border border-white/[0.05] relative">
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Content Body */}
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-3xl mx-auto">
                        <div
                            className="prose prose-invert prose-lg prose-p:text-zinc-400 prose-headings:text-white prose-a:text-accent prose-a:no-underline transition-colors hover:prose-a:text-accent/80 prose-blockquote:border-accent prose-blockquote:bg-accent/[0.02] prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:border-l-4 prose-blockquote:not-italic prose-li:text-zinc-400"
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />
                    </div>
                </div>
            </article>

            {/* Newsletter / CTA */}
            <section className="py-24 border-t border-white/[0.04] bg-white/[0.01]">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <h2 className="text-4xl font-display mb-6">Want more technical teardowns?</h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">Join 10,000+ founders and engineers getting our most brutal, actionable insights sent directly to their inbox every Tuesday.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="flex-1 bg-white/[0.03] border border-white/[0.1] rounded-full px-6 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                        <button type="submit" className="bg-white text-black font-semibold tracking-wide px-8 py-4 rounded-full text-sm hover:bg-zinc-200 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
            <StickyCTABar />
        </main>
    )
}
