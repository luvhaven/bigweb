'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowRight, CheckCircle2, Crown, Layers, Code2, Palette,
    BarChart3, Globe, ShieldCheck, Zap, ArrowUpRight, Sparkles
} from 'lucide-react'

/* ─── ATOMS ─────────────────────────────────────────────────── */
function Pill({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4a853]/25 bg-[#d4a853]/8 mb-8">
            <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-[#d4a853] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4a853]" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#d4a853] uppercase">{children}</span>
        </div>
    )
}

function SectionTag({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ─── HERO ─────────────────────────────────────────────────── */
function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
    const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

    return (
        <section ref={ref} className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-32 overflow-hidden border-b border-white/[0.04] pt-28">
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069')] bg-cover bg-center opacity-[0.12] mix-blend-luminosity" style={{ filter: 'brightness(0.5) contrast(1.1)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-transparent" />
                <div className="absolute top-1/4 right-0 w-[900px] h-[700px] rounded-full bg-[#d4a853]/[0.06] blur-[200px] mix-blend-screen" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[500px] rounded-full bg-amber-800/[0.04] blur-[150px]" />
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(212,168,83,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(212,168,83,0.15) 1px,transparent 1px)', backgroundSize: '70px 70px' }} />
            </motion.div>

            {/* "Most Chosen" banner */}
            <div className="absolute top-28 right-6 lg:right-16 z-20">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 backdrop-blur-sm">
                    <Crown className="w-3.5 h-3.5 text-[#d4a853]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4a853]">Most Chosen Engagement</span>
                </div>
            </div>

            <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl">
                <Pill>Package 02 · The Monolith™ System</Pill>

                <div className="mb-10 max-w-5xl">
                    <h1 className="font-display font-black tracking-tighter leading-[0.88] text-white uppercase">
                        <span className="block text-[clamp(3rem,8vw,8rem)]">Not a website.</span>
                        <span className="block text-[clamp(3rem,8vw,8rem)] text-[#d4a853] italic">A revenue machine.</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-end max-w-6xl">
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-light">
                        Complete digital transformation — from brand identity and positioning to elite engineering and post-launch optimization. <span className="text-white font-medium">A single coordinated system</span>, designed to acquire, convert, and retain your best customers at world-class efficiency.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Investment</div>
                                <div className="text-2xl font-display font-black text-[#d4a853]">From $18,000</div>
                                <div className="text-zinc-600 text-xs font-mono mt-0.5">project-based</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Timeline</div>
                                <div className="text-2xl font-display font-black text-white">6–10 wks</div>
                                <div className="text-zinc-600 text-xs font-mono mt-0.5">from kick-off to launch</div>
                            </div>
                        </div>
                        <Link href="/contact?plan=revenue-system" className="group relative overflow-hidden flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#d4a853] text-black font-black text-[13px] tracking-[0.1em] uppercase hover:bg-amber-400 transition-all duration-300">
                            <span className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                            <span className="relative">Start Your Project</span>
                            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-zinc-600 text-xs font-mono tracking-widest uppercase">We accept 2 new Monolith projects per month</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/[0.04]">
                    {[
                        { val: '$47M+', label: 'Revenue generated via Monolith builds' },
                        { val: '100', label: 'Lighthouse score guaranteed' },
                        { val: '30d', label: 'Post-launch optimization sprint' },
                        { val: '98%', label: 'Client retention rate' },
                    ].map((s, i) => (
                        <div key={i}>
                            <div className="text-xl font-black text-[#d4a853] mb-0.5">{s.val}</div>
                            <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

/* ─── WHAT'S INCLUDED ───────────────────────────────────────── */
const PHASES = [
    {
        number: '01',
        title: 'Strategy & Discovery',
        time: 'Weeks 1–2',
        color: '#6366f1',
        items: [
            'Revenue Roadmap sprint (full diagnostics)',
            'Competitor intelligence analysis',
            'Audience ICP & positioning refinement',
            'Conversion architecture blueprint',
            'KPI framework & GA4 event plan',
        ]
    },
    {
        number: '02',
        title: 'Brand & Design System',
        time: 'Weeks 2–4',
        color: '#ec4899',
        items: [
            'Full visual identity & brand language',
            'Typography scale & color system',
            'Figma component library (design tokens)',
            'Mobile-first UI design (all pages)',
            'Interaction & motion spec',
        ]
    },
    {
        number: '03',
        title: 'Elite Engineering',
        time: 'Weeks 4–8',
        color: '#d4a853',
        items: [
            'Next.js 15 + TypeScript frontend',
            'Edge-rendered deployment (Vercel)',
            'Headless CMS with full team training',
            'Full analytics & conversion tracking',
            'Technical SEO & Core Web Vitals architecture',
        ]
    },
    {
        number: '04',
        title: 'Launch & Optimization',
        time: 'Weeks 8–10+',
        color: '#10b981',
        items: [
            'Staged QA across devices & browsers',
            'Lighthouse 100 performance guarantee',
            'DNS migration & zero-downtime launch',
            '30-day post-launch CRO sprint',
            'Full handover documentation',
        ]
    },
]

function WhatIsIncluded() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04] bg-[#020202]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="mb-16 max-w-3xl">
                    <SectionTag>The Full Build Blueprint</SectionTag>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]">
                        Four phases. <br />
                        <span className="text-zinc-600">One unstoppable outcome.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {PHASES.map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="group relative rounded-[2rem] border border-white/[0.05] bg-[#060606] hover:border-white/[0.1] p-8 overflow-hidden transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-[80px] rounded-full pointer-events-none" style={{ background: phase.color }} />
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-zinc-700 tracking-widest">{phase.number}</span>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{phase.title}</h3>
                                </div>
                                <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/[0.06] text-zinc-600">{phase.time}</span>
                            </div>
                            <ul className="space-y-3">
                                {phase.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: phase.color }} />
                                        <span className="text-zinc-400 text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)` }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── PROOF SECTION ─────────────────────────────────────────── */
function Proof() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
                        <SectionTag>Why The Monolith™</SectionTag>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[1.05] mb-8">
                            One coordinated system <br />
                            <span className="text-[#d4a853]">beats ten half-measures.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                            Most brands hire a designer here, a developer there, and an SEO person when things get slow. The result is a fragmented digital presence with conflicting goals. The Monolith™ eliminates that — one senior team, one unified strategy, one predictable outcome.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { m: '+347%', l: 'Avg. Conversion Lift' },
                                { m: '100', l: 'Lighthouse Score' },
                                { m: '<500ms', l: 'Time to Interactive' },
                                { m: '6-10 wks', l: 'Average Build Time' },
                            ].map((s, i) => (
                                <div key={i} className="p-4 rounded-xl bg-[#060606] border border-white/[0.04]">
                                    <div className="font-display font-black text-2xl text-[#d4a853] mb-0.5">{s.m}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Testimonial */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}>
                        <div className="relative rounded-[2rem] bg-[#060606] border border-white/[0.06] p-8 md:p-10 overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a853]/30 to-transparent" />
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#d4a853]/[0.06] blur-[80px]" />
                            <Sparkles className="w-8 h-8 text-[#d4a853]/40 mb-6" />
                            <blockquote className="text-white text-xl md:text-2xl font-light italic leading-relaxed mb-8">
                                &ldquo;Six weeks after launching our Monolith build, our conversion rate jumped from 1.8% to 6.4%. That's $380,000 in additional revenue in the first quarter alone. The ROI on this engagement was 21x.&rdquo;
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#d4a853]/20 border border-[#d4a853]/30 flex items-center justify-center text-[#d4a853] font-bold">S</div>
                                <div>
                                    <div className="text-white font-semibold">Sara M.</div>
                                    <div className="text-zinc-500 text-sm">CEO, Series A SaaS Platform</div>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/[0.04] grid grid-cols-3 gap-4 text-center">
                                {[['1.8%', '→ 6.4%', 'Conv. Rate'], ['21x', 'ROI', 'Q1 Return'], ['6 wks', 'Build', 'Timeline']].map(([val, sub, label], i) => (
                                    <div key={i}>
                                        <div className="font-display font-black text-lg text-[#d4a853]">{val}</div>
                                        <div className="text-white font-bold text-sm">{sub}</div>
                                        <div className="text-zinc-600 text-[9px] uppercase tracking-widest font-bold mt-0.5">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* ─── BOTTOM CTA ────────────────────────────────────────────── */
function BottomCTA() {
    return (
        <section className="py-32 md:py-48 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#d4a853]/[0.05] blur-[150px] mix-blend-screen" />
            </div>
            <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4a853]/25 bg-[#d4a853]/8 mb-8">
                    <Crown className="w-3.5 h-3.5 text-[#d4a853]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4a853]">2 Projects Accepted Per Month</span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter italic leading-[0.92] text-white uppercase mb-8">
                    Build the system <br />
                    <span className="text-[#d4a853]">your competitors fear.</span>
                </h2>
                <p className="text-zinc-400 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                    From $18,000. Outcome-guaranteed. If we don't hit agreed KPIs, we continue working until we do — at no additional cost.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact?plan=revenue-system" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#d4a853] text-black font-black text-[13px] tracking-[0.1em] uppercase hover:bg-amber-400 transition-all duration-300">
                        Start Your Project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm px-6 py-5 font-medium">
                        Have questions? Talk to us →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default function RevenueSystemClient() {
    return (
        <div className="overflow-clip">
            <Hero />
            <WhatIsIncluded />
            <Proof />
            <BottomCTA />
        </div>
    )
}
