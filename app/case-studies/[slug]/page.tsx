import { notFound } from 'next/navigation'
import { caseStudies } from '@/lib/case-study-data'
import { agency } from '@/config/agency'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, TrendingUp, Code, User } from 'lucide-react'

interface CaseStudyPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
    const study = caseStudies.find((s) => s.slug === params.slug)
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

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
    const study = caseStudies.find((s) => s.slug === params.slug)

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
            <Navigation />

            <article className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Case Studies
                    </Link>

                    <header className="mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                            {study.client}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            {study.title}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl">
                            {study.summary}
                        </p>
                    </header>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <TrendingUp className="w-6 h-6 mr-3 text-accent" />
                                    The Challenge
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {study.challenge}
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    <Code className="w-6 h-6 mr-3 text-accent" />
                                    The Solution
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {study.solution}
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-6 flex items-center">
                                    <CheckCircle className="w-6 h-6 mr-3 text-accent" />
                                    Key Results
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {study.results.map((result, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-card border border-border/50">
                                            <div className="font-medium text-foreground">{result}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-8">
                            {/* Author Byline */}
                            <div className="p-6 rounded-xl bg-card border border-border/50">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    Lead Architect
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={study.author.image}
                                            alt={study.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">{study.author.name}</div>
                                        <div className="text-sm text-muted-foreground">{study.author.role}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="p-6 rounded-xl bg-card border border-border/50">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {study.technologies.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    )
}
