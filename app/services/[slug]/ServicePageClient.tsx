'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowUpRight, CheckCircle2, TrendingUp, Clock, ArrowRight,
    ChevronRight, Shield, Zap, Target, MessageSquare
} from 'lucide-react'
import PricingCalculator from '@/components/PricingCalculator'
import TrustBadges from '@/components/trust/TrustBadges'
import ProcessTimeline from '@/components/ProcessTimeline'

/* ─── Trust bar quotes ─── */
const MINI_QUOTES = [
    { quote: 'Doubled revenue in 90 days.', author: 'Sarah J., CMO — FinTech Global' },
    { quote: 'Best investment we\'ve made this year.', author: 'James S., Founder — Aura Luxury' },
    { quote: 'Zero downtime. Zero compromise.', author: 'Elena R., VP Eng — Nexus Systems' },
]

/* ─── Feature card ─── */
function FeatureCard({ feature, index }: { feature: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-700 overflow-hidden flex flex-col justify-end min-h-[160px]"
        >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: 'radial-gradient(400px circle at 50% 0%, rgba(255,255,255,0.02), transparent 60%)' }}
            />

            <h3 className="text-base font-semibold text-white tracking-tight mb-3 leading-snug">
                {feature.title}
            </h3>
            {feature.description && (
                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                    {feature.description}
                </p>
            )}

            {/* Elegant minimal line indicator */}
            <div className="absolute bottom-0 left-8 right-8 h-px bg-white/[0.03] group-hover:bg-white/20 transition-colors duration-700" />
        </motion.div>
    )
}

interface ServicePageClientProps {
    service: any
    features: any[]
    processSteps: any[]
}

export default function ServicePageClient({ service, features, processSteps }: ServicePageClientProps) {
    const heroRef = useRef<HTMLElement>(null)
    const heroInView = useInView(heroRef, { once: true })
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 60])

    const serviceTitle = service.title || 'Our Service'
    const serviceSubtitle = service.description || ''
    const fullDescription = service.fullDescription || ''

    return (
        <>
            {/* ── Cinematic Hero ── */}
            <section
                ref={heroRef}
                className="relative min-h-[92vh] flex flex-col justify-center pt-12 pb-20 overflow-hidden"
            >
                {/* Grid texture */}
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
                {/* Ambient blob */}
                <div className="absolute top-1/3 right-[15%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="container mx-auto px-6 lg:px-16 relative z-10"
                >
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">
                            BIGWEB Digital · {serviceTitle}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <div className="overflow-hidden mb-5">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={heroInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-[clamp(2.8rem,8vw,6.5rem)] text-white tracking-tight leading-[0.95] max-w-4xl"
                        >
                            {serviceTitle}
                        </motion.h1>
                    </div>

                    {/* Sub-headline */}
                    {serviceSubtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
                        >
                            {serviceSubtitle}
                        </motion.p>
                    )}

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-wrap gap-4 mb-20"
                    >
                        <Link
                            href={`/contact?service=${service.slug}`}
                            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-zinc-100 transition-all duration-300"
                        >
                            Start This Project
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="#features"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/[0.16] transition-all duration-300"
                        >
                            See What's Included
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* 3-column mini stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-xl pt-10 border-t border-white/[0.04]"
                    >
                        {[
                            { icon: TrendingUp, value: '3–10×', label: 'Typical ROI' },
                            { icon: Clock, value: '<30d', label: 'Time to Launch' },
                            { icon: Shield, value: '99.9%', label: 'Uptime SLA' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <div className="font-display text-2xl md:text-3xl text-white tracking-tight">{stat.value}</div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Full Description ── */}
            {fullDescription && (
                <section className="py-24 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="prose prose-invert prose-lg max-w-none text-zinc-400 leading-relaxed [&>p]:mb-6 [&>h2]:text-white [&>h2]:font-display [&>h2]:tracking-tight [&>h3]:text-zinc-300"
                            dangerouslySetInnerHTML={{ __html: fullDescription.replace(/\n/g, '<br/>') }}
                        />
                    </div>
                </section>
            )}

            {/* ── Features / What's Included ── */}
            {features.length > 0 && (
                <section id="features" className="py-28 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-4 block">
                                    What's Included
                                </span>
                                <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-tight">
                                    Every deliverable,<br />
                                    <span className="text-zinc-600 italic">accounted for.</span>
                                </h2>
                            </div>
                            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                                No hidden extras, no scope creep. Every feature below is included in your engagement.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {features.map((feature: any, i: number) => (
                                <FeatureCard key={i} feature={feature} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Process Timeline ── */}
            {processSteps.length > 0 && (
                <section className="py-28 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="mb-16">
                            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-4 block">
                                How It Works
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight">
                                Our process,<br />
                                <span className="text-zinc-600 italic">step by step.</span>
                            </h2>
                        </div>
                        <ProcessTimeline steps={processSteps} />
                    </div>
                </section>
            )}

            {/* ── Why Choose Us ── */}
            <section className="py-28 border-t border-white/[0.04]">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-6 block">
                                Why BIGWEB
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-8">
                                We build for<br />
                                <span className="text-zinc-600 italic">outcomes, not outputs.</span>
                            </h2>
                            <p className="text-zinc-500 leading-relaxed mb-10 text-lg">
                                While other agencies celebrate deliverables, we measure success by your revenue.
                                Every project is engineered with measurable goals set upfront.
                            </p>
                            <div className="space-y-5">
                                {[
                                    { icon: Target, text: 'Revenue goals agreed before work begins' },
                                    { icon: Zap, text: 'Continuous iteration — locked scope is a myth' },
                                    { icon: TrendingUp, text: 'Post-launch CRO included in every engagement' },
                                    { icon: MessageSquare, text: 'Dedicated Slack channel, real-time updates' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-3.5 h-3.5 text-zinc-600" />
                                        </div>
                                        <span className="text-sm text-zinc-400">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Mini testimonials */}
                        <div className="space-y-4">
                            {MINI_QUOTES.map((q, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] transition-all duration-500"
                                >
                                    <p className="text-white text-sm font-medium leading-relaxed mb-3 italic">
                                        &ldquo;{q.quote}&rdquo;
                                    </p>
                                    <span className="text-[10px] font-mono tracking-wider text-zinc-600">{q.author}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ROI Calculator ── */}
            <section className="py-28 border-t border-white/[0.04]">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-4 block">
                            Estimate Your Return
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight">
                            Calculate your{' '}
                            <span className="text-zinc-600 italic">ROI potential.</span>
                        </h2>
                        <p className="text-zinc-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
                            Input your current numbers and see what's possible when your digital infrastructure actually converts.
                        </p>
                    </div>
                    <PricingCalculator />
                </div>
            </section>

            {/* ── Trust Badges ── */}
            <TrustBadges />

            {/* ── Project CTA ── */}
            <section className="py-32 border-t border-white/[0.04] relative overflow-hidden">
                {/* Ambient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-white/[0.015] blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
                    {/* Availability badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Accepting new projects — limited availability
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 max-w-3xl mx-auto">
                        Ready to build<br />
                        <span className="text-zinc-600 italic">something great?</span>
                    </h2>

                    <p className="text-zinc-500 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                        Let's scope your {serviceTitle} project. We'll map your goals, audit your current state, and deliver a clear path to measurable outcomes.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href={`/contact?service=${service.slug}`}
                            className="group inline-flex items-center gap-2.5 px-10 py-5 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-zinc-100 transition-all duration-300"
                        >
                            Start This Project
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="/estimator"
                            className="inline-flex items-center gap-2.5 px-10 py-5 rounded-full border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/[0.16] transition-all duration-300"
                        >
                            Get a Free Estimate
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
