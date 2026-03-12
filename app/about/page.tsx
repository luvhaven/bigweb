import React from 'react'
import { ArrowRight, Target, Gauge, BarChart3, Layers } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

import PremiumHero from '@/components/effects/PremiumHero'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Team from '@/components/Team'
import KineticTypography from '@/components/effects/KineticTypography'
import AboutScrollClient from './AboutScrollClient'
import { getCmsHero, getCmsTeam, getPageSection, getPageMeta } from '@/actions/cms'

export async function generateMetadata(): Promise<Metadata> {
    const meta = await getPageMeta('about')
    return {
        title: meta?.meta_title || 'About | BIGWEB Digital',
        description: meta?.meta_description || 'A focused team of strategists, designers, and engineers building the highest-converting digital systems for ambitious brands.',
    }
}

const defaultPrinciples = [
    { number: '01', title: 'Outcomes Over Aesthetics', desc: 'Beautiful design is table-stakes. We measure success by the revenue, leads, and growth our work generates for your business.' },
    { number: '02', title: 'Speed is a Feature', desc: 'Every millisecond of load time costs conversions. We engineer sub-second experiences because your customers should not wait.' },
    { number: '03', title: 'Data-Informed Decisions', desc: 'We do not rely on gut feelings. Every design choice, copy change, and feature decision is backed by real user data and testing.' },
    { number: '04', title: 'Systems Over Campaigns', desc: 'Campaigns end. Systems compound. We build growth architectures that get stronger and more valuable over time.' },
]

const capabilities = [
    { title: 'Performance Engineering', desc: 'Sub-second load times, optimised rendering, and infrastructure that scales with your ambition.', icon: Gauge },
    { title: 'Conversion Architecture', desc: 'Strategic user journeys designed to guide visitors naturally from awareness to action.', icon: Target },
    { title: 'Growth Analytics', desc: 'Deep instrumentation and clear reporting so you always know what is working and why.', icon: BarChart3 },
    { title: 'Scalable Systems', desc: 'Modular, maintainable codebases that grow with your team and your business needs.', icon: Layers },
]

export default async function AboutPage() {
    const [hero, teamMembers, principlesSection, missionSection] = await Promise.all([
        getCmsHero('about'),
        getCmsTeam(),
        getPageSection('about', 'principles'),
        getPageSection('about', 'mission'),
    ])

    const principles = principlesSection?.items || defaultPrinciples
    const mission = missionSection || {
        headline: 'We build digital systems that make our clients impossible to ignore.',
        body: 'BIGWEB was founded on a simple frustration: too many talented businesses were being let down by agencies that prioritised aesthetics over outcomes. We built a different kind of agency — one that treats every project as a revenue engineering problem, not a design exercise.'
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <AdvancedNavigation />

            <PremiumHero
                eyebrow="About BIGWEB Digital"
                headline={hero?.title || 'Engineering growth'}
                headlineAccent={`for ${hero?.highlight_text || 'ambitious'} brands.`}
                subheadline={hero?.description || 'A small, focused team of strategists, designers, and engineers who believe the web should work harder for your business.'}
            />

            <AboutScrollClient />

            {/* Mission */}
            <section className="section-padding bg-[#0a0a0a] relative border-t border-white/[0.04]">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="max-w-4xl">
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">Our Mission</span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6">
                            {mission.headline}
                        </h2>
                        <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl">
                            {mission.body}
                        </p>
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="section-padding bg-[#0a0a0a] relative border-t border-white/[0.04]">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        <div>
                            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">What We Believe</span>
                            <KineticTypography
                                segments={[{ text: 'Our ' }, { text: 'principles.', className: 'italic text-zinc-400' }]}
                                as="h2"
                                className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6"
                            />
                            <p className="text-lg text-zinc-500 leading-relaxed max-w-md">
                                These are not slogans. They are the operating system behind every project we take on.
                            </p>
                        </div>
                        <div className="space-y-8">
                            {principles.map((item: any, i: number) => (
                                <div key={i} className="group p-8 rounded-2xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-500">
                                    <span className="text-2xl font-bold text-zinc-800 group-hover:text-accent/30 transition-colors duration-500 block mb-3">{item.number}</span>
                                    <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="section-padding bg-[#0a0a0a] relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-20">
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">Capabilities</span>
                        <KineticTypography
                            segments={[{ text: 'Built for ' }, { text: 'results.', className: 'italic text-zinc-400' }]}
                            as="h2"
                            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-tight"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {capabilities.map((cap, i) => (
                            <div key={i} className="p-8 md:p-10 rounded-2xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-500 group">
                                <cap.icon className="w-8 h-8 text-zinc-600 group-hover:text-accent transition-colors mb-6" />
                                <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{cap.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{cap.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Manifesto */}
            <section className="py-32 md:py-40 bg-[#0a0a0a] relative overflow-hidden border-t border-white/[0.04]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent/[0.015] rounded-full blur-[200px] -translate-y-1/2" />
                </div>
                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent block mb-12">Our Manifesto</span>
                        <blockquote className="font-display text-3xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-6">
                            <KineticTypography
                                segments={[
                                    { text: '"The internet is the most powerful sales engine ever built. Most brands are using it like a brochure. ' },
                                    { text: 'We fix that."', className: 'italic text-zinc-400' }
                                ]}
                                as="span"
                                className="block"
                                splitBy="words"
                            />
                        </blockquote>
                        <cite className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-600 not-italic mt-8 block">
                            — BIGWEB Digital, est. 2020
                        </cite>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10 mt-24">
                        {[
                            { label: 'Our Promise', text: 'If your website does not generate measurable, attributable ROI within 90 days of launch, we work for free until it does. Period.' },
                            { label: 'Our Standard', text: 'We refuse to ship anything we would not put our name on publicly. Every element earns its place through function, strategy, or delight.' },
                            { label: 'Our Mission', text: 'To be the most trusted web investment you have ever made. Not just for the project duration — but for the lifetime of your business.' },
                        ].map((item, i) => (
                            <div key={i}>
                                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">{item.label}</h4>
                                <p className="text-sm text-zinc-500 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <div className="border-t border-white/[0.04] bg-[#0a0a0a]">
                <Team members={teamMembers} />
            </div>

            {/* CTA */}
            <section className="py-32 md:py-48 relative overflow-hidden bg-[#040404] border-t border-white/[0.04]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/[0.03] blur-[180px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">Next Steps</span>
                    </span>
                    <h2 className="font-display text-5xl md:text-6xl lg:text-[5rem] tracking-tighter text-white leading-[0.95] mb-8">
                        The best projects start with<br />
                        <em className="italic text-accent">a conversation.</em>
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-14 max-w-xl mx-auto font-light">
                        Tell us your goals. We&apos;ll outline exactly what it would take to build the revenue infrastructure to get you there.
                    </p>
                    <Link href="/contact" className="group inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95">
                        Start a Conversation
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
