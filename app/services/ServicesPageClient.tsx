'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import {
    ArrowUpRight, Code2, MousePointerClick, Search, BrainCircuit,
    TrendingUp, Layers, Shield, Zap, Target, ArrowRight, ChevronRight,
    CheckCircle
} from 'lucide-react'
import type { Capability } from '@/types/database'
import KineticTypography from '@/components/effects/KineticTypography'

/* ── SERVICES DATA ── */
const SERVICES = [
    {
        id: 'web-development',
        slug: 'web-development',
        label: '01',
        title: 'Website Engineering',
        tagline: 'The Revenue Engine™',
        description: 'Enterprise-grade web platforms engineered from the ground up for conversion velocity and compounding revenue. Not just a website — an automated sales machine.',
        icon: Code2,
        category: 'Build',
        color: '#d4a853',
        metric: '+347%', metricLabel: 'Avg. Conversion Lift',
        tags: ['Next.js 15', 'Edge Runtime', 'Headless CMS'],
        featured: true,
    },
    {
        id: 'revenue-systems',
        slug: 'revenue-systems',
        label: '02',
        title: 'Revenue Systems',
        tagline: 'Commerce Core™',
        description: 'We build the infrastructure that powers high-volume transactions and recurring revenue models. Frictionless billing, lifecycle automation, and real-time revenue intelligence.',
        icon: TrendingUp,
        category: 'Strategy',
        color: '#10b981',
        metric: '$47M+', metricLabel: 'Revenue Processed',
        tags: ['Stripe', 'Subscriptions', 'LTV Optimization'],
        featured: false,
    },
    {
        id: 'funnel-architecture',
        slug: 'funnel-architecture',
        label: '03',
        title: 'Funnel Architecture',
        tagline: 'Pathway Design™',
        description: 'We architect user journeys that move prospects from curiosity to commitment with clarity and intent. Every touchpoint is a calculated revenue trigger.',
        icon: Layers,
        category: 'Growth',
        color: '#6366f1',
        metric: '-45%', metricLabel: 'Drop-off Rate',
        tags: ['Journey Mapping', 'Behavioral Triggers', 'Intent Architecture'],
        featured: false,
    },
    {
        id: 'conversion-optimization',
        slug: 'conversion-optimization',
        label: '04',
        title: 'Conversion Optimization',
        tagline: 'The Revenue Multiplier™',
        description: 'Systematic CRO that eliminates friction and multiplies revenue through forensic analytics, psychological triggers, and scientific A/B testing. 3X conversion rates guaranteed.',
        icon: MousePointerClick,
        category: 'Growth',
        color: '#f59e0b',
        metric: '3.2×', metricLabel: 'Avg. Action Rate',
        tags: ['A/B Testing', 'Psychology', 'Funnel Engineering'],
        featured: false,
    },
    {
        id: 'trust-optimization',
        slug: 'trust-optimization',
        label: '05',
        title: 'Performance & Trust',
        tagline: 'Invisible Factors™',
        description: 'We optimize the invisible factors that determine whether users trust and act. Core Web Vitals, security hardening, and credibility stacking engineered to sub-500ms.',
        icon: Shield,
        category: 'Elevate',
        color: '#00d4ff',
        metric: '<500ms', metricLabel: 'Target Load Time',
        tags: ['Core Web Vitals', 'Security', 'SEO Foundations'],
        featured: false,
    },
]

const DIFFERENTIATORS = [
    {
        number: '01',
        title: 'Revenue-First Thinking',
        desc: 'We don\'t measure success in "beautiful designs" or "bug-free code." We measure it in revenue lift, conversion rate improvements, and compounding ROI.',
    },
    {
        number: '02',
        title: 'Senior-Only Talent',
        desc: 'No junior developers. No offshore outsourcing. Every project is handled by senior engineers, designers, and strategists with 8+ years of proven results.',
    },
    {
        number: '03',
        title: 'Outcome Guarantees',
        desc: 'We set clear KPIs before starting every engagement. If we don\'t hit agreed benchmarks, we continue working until we do — at no additional cost.',
    },
    {
        number: '04',
        title: 'Transparent Velocity',
        desc: 'Weekly progress reviews, live staging previews, and direct Slack access to your entire team. No agency fog. Total visibility from day one.',
    },
]

const STATS = [
    { val: '$47M+', label: 'Revenue generated for clients' },
    { val: '200+', label: 'Projects shipped globally' },
    { val: '98%', label: 'Client retention rate' },
    { val: '<30d', label: 'Avg. time to first result' },
]

/* ── ATOMS ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ── HERO ── */
function Hero() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    return (
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-36 overflow-hidden border-b border-white/[0.04]">
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background z-10" />
                <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-accent/[0.04] blur-[220px] rounded-full" />
                <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.03] blur-[180px] rounded-full" />
            </motion.div>
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            <motion.div style={{ opacity: fadeOut }} className="container mx-auto px-6 lg:px-16 relative z-20 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                    className="mb-16 pt-48"
                >
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm">
                        <Zap className="w-3 h-3 text-accent" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400">Elite Capabilities</span>
                    </div>
                </motion.div>

                <div className="mb-12 max-w-5xl">
                    {['Engineering', 'unfair advantages', 'for ambitious brands.'].map((line, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.div
                                initial={{ y: '110%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                            >
                                <span className={`block font-black font-display tracking-tighter leading-[0.9] ${i === 0 ? 'text-[12vw] md:text-[9vw] xl:text-[8rem] text-white uppercase' :
                                    i === 1 ? 'text-[12vw] md:text-[9vw] xl:text-[8rem] text-accent italic uppercase' :
                                        'text-[6vw] md:text-[4.5vw] xl:text-[3.8rem] text-zinc-600 mt-4 normal-case not-italic'
                                    }`}>
                                    {line}
                                </span>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 max-w-5xl"
                >
                    <p className="text-lg text-zinc-500 max-w-md leading-relaxed">
                        We don&apos;t sell services. We engineer <span className="text-white font-medium">holistic revenue systems</span> — from architecture to acquisition to compounding optimization.
                    </p>
                    <Link href="#services" className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.1em] hover:bg-accent transition-colors duration-300 whitespace-nowrap">
                        Explore Capabilities
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/[0.04] max-w-5xl"
                >
                    {STATS.map((s, i) => (
                        <div key={i}>
                            <div className="text-2xl font-black text-white mb-0.5">{s.val}</div>
                            <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

/* ── SERVICE ROWS ── */
function ServiceRow({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })
    const Icon = service.icon
    const isEven = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/[0.04] last:border-b-0"
        >
            <Link href={`/services/${service.slug}`} className="group block py-14 md:py-20">
                <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left — number + category */}
                        <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4">
                            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em]">{service.label}</span>
                            <span className="text-[9px] font-mono text-accent/60 uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-accent/10 bg-accent/[0.02]">
                                {service.category}
                            </span>
                        </div>

                        {/* Middle — content */}
                        <div className="lg:col-span-7">
                            <div className="flex items-start gap-5 mb-6">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-1"
                                    style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
                                    <Icon className="w-5 h-5" style={{ color: service.color }} />
                                </div>
                                <div>
                                    <div className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.25em] mb-1">{service.tagline}</div>
                                    <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-black text-white tracking-tighter italic leading-[1.0] group-hover:text-accent transition-colors duration-500">
                                        {service.title}
                                    </h2>
                                </div>
                            </div>
                            <p className="text-zinc-500 text-base md:text-lg leading-relaxed group-hover:text-zinc-400 transition-colors duration-400 mb-8 ml-16">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2 ml-16">
                                {service.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-mono text-zinc-600 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right — metric + CTA */}
                        <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end gap-6 pt-1">
                            <div className="text-right">
                                <div className="text-3xl font-black font-display tracking-tighter" style={{ color: service.color }}>
                                    {service.metric}
                                </div>
                                <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-wider mt-0.5">{service.metricLabel}</div>
                            </div>
                            <div className="flex items-center gap-2 text-[12px] font-bold text-zinc-600 group-hover:text-white transition-colors duration-400 uppercase tracking-wider">
                                View Service
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom highlight bar on hover */}
                    <div className="mt-6 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                        style={{ background: `linear-gradient(90deg, ${service.color}60, transparent)` }} />
                </div>
            </Link>
        </motion.div>
    )
}

/* ── SERVICES SECTION ── */
function ServicesSection() {
    return (
        <section id="services" className="py-8 bg-card relative">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="pt-16 pb-10">
                    <SectionLabel>All Capabilities</SectionLabel>
                    <KineticTypography
                        as="h2"
                        className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter italic"
                        segments={[
                            { text: "Five disciplines. " },
                            { text: "One revenue machine.", className: "text-zinc-600" }
                        ]}
                    />
                </div>
            </div>
            <div className="border-t border-white/[0.04]">
                {SERVICES.map((service, i) => (
                    <ServiceRow key={service.id} service={service} index={i} />
                ))}
            </div>
        </section>
    )
}

/* ── WHY US ── */
function DifferentiatorsSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-28 md:py-40 border-t border-white/[0.04] relative overflow-hidden">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.025] blur-[200px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
                        <SectionLabel>Why BIGWEB</SectionLabel>
                        <KineticTypography
                            as="h2"
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]"
                            segments={[
                                { text: "Most agencies focus on output. " },
                                { text: "We guarantee outcomes.", className: "text-zinc-600" }
                            ]}
                        />
                        <p className="text-zinc-500 text-lg leading-relaxed mt-8 max-w-lg">
                            A stunning website is useless if it doesn&apos;t convert. We build holistic digital ecosystems where design, engineering, and psychology compound together.
                        </p>
                        <Link href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.1em] hover:bg-accent transition-colors duration-300 mt-10">
                            Start a Project
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <div className="grid gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
                        {DIFFERENTIATORS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                                className="group bg-card hover:bg-secondary p-8 transition-colors duration-400 relative"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent" />
                                <div className="flex gap-6">
                                    <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.25em] shrink-0 mt-1">{item.number}</span>
                                    <div>
                                        <h3 className="text-base font-black text-white mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                                        <p className="text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── TRUST STRIP ── */
function TrustStrip() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-20 md:py-24 border-y border-white/[0.04] bg-card relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
                        <KineticTypography
                            as="h3"
                            className="font-display text-3xl md:text-4xl font-black text-white tracking-tighter italic mb-3"
                            segments={[
                                { text: "Ready to build something " },
                                { text: "permanent?", className: "text-accent" }
                            ]}
                        />
                        <p className="text-zinc-600 text-sm">We accept 3 new client projects per month. Book your slot.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="flex gap-4 shrink-0">
                        <Link href="/offers/revenue-roadmap" className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-black font-black text-[12px] uppercase tracking-[0.12em] hover:bg-accent transition-colors duration-300">
                            Start with a Roadmap
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/contact" className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.16] font-bold text-[12px] uppercase tracking-[0.12em] transition-all duration-300">
                            Contact
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* ── FINAL CTA ── */
function FinalCTA() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-36 md:py-48 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.05) 0%, transparent 70%)' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

            <div className="container mx-auto px-6 lg:px-16 max-w-5xl text-center relative">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
                    <SectionLabel>Let&apos;s Build</SectionLabel>
                    <div className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter italic leading-[0.9] uppercase mb-8">
                        <KineticTypography as="div" text="Your Revenue" className="text-white" />
                        <KineticTypography as="div" text="Machine" className="text-white" />
                        <KineticTypography as="div" text="Awaits." className="text-accent" />
                    </div>
                    <p className="text-xl text-zinc-500 max-w-xl mx-auto mb-12 leading-relaxed">
                        Join 200+ ambitious brands who chose engineering over guesswork — and built something that actually compounds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                        <Link href="/contact" className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.15em] hover:bg-accent transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                            Start a Conversation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/offers" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium px-6 py-5">
                            View Packages
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {['NDA on day one', 'Senior-only team', 'Outcome guarantees', 'Cancel anytime'].map((t, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[11px] text-zinc-600 uppercase tracking-wider font-bold">{t}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* ── MAIN EXPORT ── */
export default function ServicesPageClient({ capabilities }: { capabilities: Capability[] }) {
    return (
        <main className="min-h-screen bg-background text-white overflow-x-hidden selection:bg-accent/20">
            <AdvancedNavigation />
            <Hero />
            <ServicesSection />
            <DifferentiatorsSection />
            <TrustStrip />
            <FinalCTA />
            <Footer />
        </main>
    )
}
