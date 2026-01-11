import { notFound } from 'next/navigation'
import { caseStudies } from '@/lib/case-study-data'
import { agency } from '@/config/agency'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, TrendingUp, Code, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CaseStudyPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
    const { slug } = await params
    const study = caseStudies.find((s) => s.slug === slug)
    if (!study) return {}

    return {
        title: `${study.title} | ${agency.name}`,
        description: study.summary,
        openGraph: {
            title: study.title,
            description: study.summary,
            type: 'article',
            authors: [study.author.name],
            publishedTime: study.date,
        },
    }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { slug } = await params
    const study = caseStudies.find((s) => s.slug === slug)

    if (!study) {
        notFound()
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: study.title,
        description: study.summary,
        author: {
            '@type': 'Person',
            name: study.author.name,
            jobTitle: study.author.role,
            url: `${agency.domain}/team/${study.author.name.toLowerCase().replace(' ', '-')}`,
        },
        publisher: {
            '@type': 'Organization',
            name: agency.name,
            logo: {
                '@type': 'ImageObject',
                url: `${agency.domain}/logo.png`,
            },
        },
        datePublished: study.date,
        genre: 'Case Study',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${agency.domain}/case-studies/${study.slug}`,
        },
    }

    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ConversionNavigation />

            {/* Evidence Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,107,53,0.1),_transparent)]" />
                <div className="container mx-auto px-6 relative z-10">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center text-accent font-bold text-xs uppercase tracking-[0.3em] mb-12 hover:opacity-70 transition-opacity group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Return to Archives
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex flex-wrap gap-3 mb-8">
                                <span className="px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-black uppercase tracking-widest border border-accent/30 backdrop-blur-sm">
                                    Case Study: {study.client}
                                </span>
                                {study.offer && (
                                    <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-widest border border-white/20 backdrop-blur-sm">
                                        Offer: {study.offer}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">
                                {study.title}
                            </h1>
                            <p className="text-2xl text-muted-foreground leading-relaxed font-medium mb-12">
                                {study.summary}
                            </p>

                            <div className="flex flex-wrap gap-8 p-8 rounded-2xl bg-secondary/30 border border-white/5 backdrop-blur-xl">
                                {study.results.slice(0, 3).map((res, i) => (
                                    <div key={i}>
                                        <div className="text-3xl font-black text-white mb-1">{res.split(' ')[0]}</div>
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest">
                                            {res.split(' ').slice(1).join(' ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <img
                                src={study.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200'}
                                alt={study.title}
                                className="w-full h-full object-cover scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                </div>
            </section>

            <article className="py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-3 gap-20">
                        <div className="lg:col-span-2 space-y-20">
                            {/* The Problem */}
                            <section>
                                <div className="text-accent font-bold uppercase tracking-widest text-sm mb-4">01. The Identification</div>
                                <h2 className="text-4xl font-black mb-8 tracking-tight">The Revenue Bottleneck</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    {study.challenge}
                                </p>
                            </section>

                            {/* The Execution */}
                            <section className="p-10 rounded-3xl bg-secondary/20 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Code className="w-40 h-40" />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-accent font-bold uppercase tracking-widest text-sm mb-4">02. The Protocol</div>
                                    <h2 className="text-4xl font-black mb-8 tracking-tight">Conversion Engineering</h2>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        {study.solution}
                                    </p>
                                </div>
                            </section>

                            {/* Full Outcomes */}
                            <section>
                                <div className="text-accent font-bold uppercase tracking-widest text-sm mb-4">03. The ROI</div>
                                <h2 className="text-4xl font-black mb-12 tracking-tight">Quantifiable Results</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {study.results.map((result, i) => (
                                        <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 hover:border-accent/30 transition-colors">
                                            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                                <CheckCircle className="w-6 h-6 text-accent" />
                                            </div>
                                            <span className="text-lg font-bold text-white">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-12">
                            <div className="p-8 rounded-3xl bg-secondary/50 border border-white/10 sticky top-32">
                                <div className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-6">Lead Scientist</div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                                        <img src={study.author.image} alt={study.author.name} className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="font-black text-xl text-white">{study.author.name}</div>
                                        <div className="text-sm text-accent font-bold">{study.author.role}</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-3">Tech Stored</div>
                                        <div className="flex flex-wrap gap-2">
                                            {study.technologies.map((tech, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 text-white/70 text-xs font-bold rounded-lg border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5">
                                        <h4 className="text-lg font-bold mb-4">Want these results?</h4>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            The protocol we used for {study.client} can be applied to your business today.
                                        </p>
                                        <Button className="w-full bg-accent hover:bg-accent-dark h-12 text-white font-bold rounded-xl" asChild>
                                            <Link href="/offers/diagnostic">Get My Diagnostic</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>

            {/* Global CTA */}
            <section className="py-32 bg-secondary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">ENGINEER YOUR <br /><span className="text-accent">OWN SUCCESS.</span></h2>
                    <p className="text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium">
                        Stop guessing why users aren't converting. Let's run the diagnostic and find the revenue waiting inside your funnel.
                    </p>
                    <Button size="lg" className="bg-accent hover:bg-accent-dark h-16 px-12 text-xl font-black rounded-2xl shadow-2xl shadow-accent/20" asChild>
                        <Link href="/offers/diagnostic">Start My Case Study <ArrowRight className="ml-2 w-6 h-6" /></Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    )
}
