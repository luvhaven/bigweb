'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, Target, Map, Brain, FileText, Users, Phone, AlertCircle, Compass } from 'lucide-react'

/* ─── ATOMS ─────────────────────────────────────────────────── */
function Pill({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/8 mb-8">
            <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-indigo-300 uppercase">{children}</span>
        </div>
    )
}

function SectionTag({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
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
            {/* Background */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071')] bg-cover bg-center opacity-10 mix-blend-luminosity" style={{ filter: 'brightness(0.4) contrast(1.1)' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-transparent" />
                <div className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full bg-indigo-600/[0.06] blur-[180px] mix-blend-screen" />
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.04] blur-[150px]" />
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.15) 1px,transparent 1px)', backgroundSize: '70px 70px' }} />
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl">
                <Pill>Package 01 · Revenue Roadmap</Pill>

                <div className="mb-10 max-w-5xl">
                    <h1 className="font-display font-black tracking-tighter leading-[0.88] text-white uppercase">
                        <span className="block text-[clamp(3.5rem,9vw,9rem)]">Stop Building</span>
                        <span className="block text-[clamp(3.5rem,9vw,9rem)] text-indigo-400 italic">on guesswork.</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-end max-w-6xl">
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-light">
                        Before investing $18,000+ in a full build, invest 2 weeks in absolute clarity. The Revenue Roadmap is a forensic strategy sprint that shows you <span className="text-white font-medium">exactly where your revenue is leaking</span> — and the precise blueprint to fix it.
                    </p>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-5 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                            <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                <span className="text-indigo-400 font-display font-black text-xl">$4,997</span>
                            </div>
                            <div>
                                <div className="text-white font-bold tracking-tight">One-time investment</div>
                                <div className="text-zinc-500 text-sm mt-0.5">2-week delivery · Transferable to any future build</div>
                            </div>
                        </div>
                        <Link href="/contact?plan=revenue-roadmap" className="group relative overflow-hidden flex items-center justify-center gap-3 py-5 rounded-2xl bg-indigo-500 text-white font-black text-[13px] tracking-[0.1em] uppercase hover:bg-indigo-400 transition-all duration-300">
                            <span className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 skew-x-12" />
                            <span className="relative">Book Discovery Sprint</span>
                            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-zinc-600 text-xs font-mono tracking-widest uppercase">Only 4 slots open this month</p>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/[0.04]">
                    {[
                        { val: '2 weeks', label: 'Delivery window' },
                        { val: '20+ hrs', label: 'Competitor analysis' },
                        { val: '100%', label: 'Transferable credit' },
                        { val: 'Day 1', label: 'NDA signed' },
                    ].map((s, i) => (
                        <div key={i}>
                            <div className="text-xl font-black text-indigo-400 mb-0.5">{s.val}</div>
                            <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

/* ─── FOR WHOM ──────────────────────────────────────────────── */
function ForWhom() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-15%' })

    const fits = [
        'You\'re pre-launch and want to build something that ACTUALLY works, not just looks good.',
        'You have traffic but your conversion rate is embarrassingly low (<2%).',
        'You\'re about to invest in a redesign but aren\'t sure what to focus on.',
        'You\'ve hired agencies before and left with a beautiful site that didn\'t move the needle.',
        'You need an outsider\'s sharp, data-backed perspective on exactly where you\'re losing money.',
    ]

    const notFits = [
        'You\'re looking for the cheapest possible option.',
        'You\'re not ready to receive honest, sometimes uncomfortable findings.',
        'You want a list of generic "best practices" (we go much deeper than that).',
    ]

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04] bg-[#020202]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
                        <SectionTag>Right for you if...</SectionTag>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[1.0] mb-10">
                            Built for ambitious <br />
                            <span className="text-indigo-400">decision-makers.</span>
                        </h2>
                        <ul className="space-y-4">
                            {fits.map((f, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-zinc-300 leading-relaxed">{f}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
                        <SectionTag>Not the right fit if...</SectionTag>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[1.0] mb-10">
                            We only work with <br />
                            <span className="text-zinc-600">serious builders.</span>
                        </h2>
                        <ul className="space-y-4 mb-12">
                            {notFits.map((f, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }} className="flex items-start gap-4">
                                    <AlertCircle className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                                    <span className="text-zinc-600 leading-relaxed">{f}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Quote box */}
                        <div className="p-6 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/15 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                            <p className="text-zinc-300 italic leading-relaxed">
                                &ldquo;The Roadmap saved us from a $40,000 mistake. We were about to rebuild our entire site when we found out the problem was just two broken steps in our checkout flow.&rdquo;
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">J</div>
                                <div className="text-sm text-zinc-500">James K. — Co-founder, Fintech SaaS</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* ─── DELIVERABLES ──────────────────────────────────────────── */
const DELIVERABLES = [
    { icon: Target, title: 'Conversion Leak Mapping', desc: 'We trace every step of your user journey and flag the exact moments visitors lose intent — with session data and heatmap evidence to back each finding.' },
    { icon: Brain, title: 'Messaging Clarity Audit', desc: 'Your messaging is audited against your ideal customer\'s true language. We rewrite the core value proposition that will be used as the foundation of all future copy.' },
    { icon: Map, title: 'Custom Conversion Blueprint', desc: 'A strategic layout and content architecture plan — the exact wireframe-level flow your new site needs to convert your specific traffic at maximum velocity.' },
    { icon: FileText, title: 'Priority KPI Framework', desc: 'We define the 5-7 metrics that actually matter for your business stage and set up the tracking infrastructure so you\'re making decisions from real data.' },
    { icon: Users, title: 'Audience ICP Refinement', desc: 'Deep segmentation of your buyer personas, including their objections, triggers, and preferred communication styles — the foundation of all conversion strategy.' },
    { icon: Phone, title: 'Strategic Debrief Call', desc: 'A 90-minute session with our principals to walk you through every finding, answer every question, and align on the exact priorities for execution.' },
]

function Deliverables() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="mb-16 md:mb-20 max-w-3xl">
                    <SectionTag>What You Receive</SectionTag>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]">
                        Six battle-ready <br />
                        <span className="text-zinc-600">strategic weapons.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DELIVERABLES.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.07 }}
                            className="group relative p-8 rounded-[2rem] bg-[#060606] border border-white/[0.04] hover:border-indigo-500/20 hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/0 group-hover:bg-indigo-500/[0.07] blur-[60px] transition-all duration-700 rounded-full pointer-events-none" />
                            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <d.icon className="w-5 h-5 text-indigo-400" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-tight mb-3">{d.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{d.desc}</p>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── TIMELINE ──────────────────────────────────────────────── */
const TIMELINE = [
    { day: 'Day 1–2', title: 'Onboarding & Access', desc: 'NDA signed. You share GA4 access, Hotjar/FullStory recordings, ad account data, and brand assets. We conduct a 60-minute kick-off call to align on goals.' },
    { day: 'Day 3–7', title: 'Forensic Audit Phase', desc: 'Our team runs deep: 20+ hours of research including competitor analysis, session replay review, message hierarchy auditing, and conversion funnel dissection.' },
    { day: 'Day 8–12', title: 'Blueprint Creation', desc: 'We synthesize every finding into the strategic deliverables: conversion architecture, ICP profiles, messaging frameworks, and the prioritized KPI scorecard.' },
    { day: 'Day 14', title: 'Debrief & Handoff', desc: '90-minute strategy session to walk through every insight. You receive all documents, wireframe flows, and a clear implementation priority stack. You leave with a weapon.' },
]

function Timeline() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04] bg-[#020202]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <SectionTag>The 2-Week Process</SectionTag>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]">
                            Systematic. <br />
                            <span className="text-indigo-400">Clinical. </span><br />
                            <span className="text-zinc-600">Ruthless.</span>
                        </h2>
                        <p className="text-zinc-500 text-lg leading-relaxed mt-8 max-w-md">
                            Every hour of the two weeks is accounted for. We don't do discovery calls for weeks — we work fast and deliver fast.
                        </p>
                        <Link href="/contact?plan=revenue-roadmap" className="group inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-black text-[13px] uppercase tracking-[0.1em] hover:bg-indigo-400 transition-colors">
                            Secure Your Sprint
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent" />
                        <div className="space-y-10">
                            {TIMELINE.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                                    className="flex gap-8"
                                >
                                    <div className="w-11 h-11 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0 relative z-10">
                                        <span className="text-indigo-400 text-xs font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                                    </div>
                                    <div className="pt-2">
                                        <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-1">{t.day}</div>
                                        <h3 className="text-lg font-bold text-white tracking-tight mb-2">{t.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{t.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-indigo-500/[0.06] blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.2) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>
            <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">Only 4 Slots Available This Month</span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter italic leading-[0.92] text-white uppercase mb-8">
                    Get your blueprint.<br />
                    <span className="text-indigo-400">Own the market.</span>
                </h2>
                <p className="text-zinc-400 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                    $4,997. Two weeks. A battle-tested strategy that is 100% credit-applicable to any future build. There is no cheaper path to certainty.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact?plan=revenue-roadmap" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-indigo-500 text-white font-black text-[13px] tracking-[0.1em] uppercase hover:bg-indigo-400 transition-all duration-300">
                        Book Discovery Sprint — $4,997
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/offers/revenue-system" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm px-6 py-5 font-medium">
                        Or see The Monolith™ System →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default function RevenueRoadmapClient() {
    return (
        <div className="overflow-clip">
            <Hero />
            <ForWhom />
            <Deliverables />
            <Timeline />
            <BottomCTA />
        </div>
    )
}
