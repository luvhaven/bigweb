'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowUpRight, ArrowRight, Waypoints, Magnet, Blocks, Activity, CheckCircle2,
    Users, TrendingUp, Layers, Fingerprint, Map, Search
} from 'lucide-react'
import KineticTypography from '@/components/effects/KineticTypography'
import TrustBadges from '@/components/trust/TrustBadges'

/* ── UI ATOMS ── */
function Badge({ children, pulse = false }: { children: React.ReactNode, pulse?: boolean }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md mb-8">
            {pulse && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
                </span>
            )}
            <span className="text-[10px] font-mono tracking-[0.2em] text-indigo-300 uppercase">
                {children}
            </span>
        </div>
    )
}

function SectionHeading({ subtitle, title, align = 'left' }: { subtitle: string, title: React.ReactNode, align?: 'left' | 'center' }) {
    const textBase = align === 'center' ? 'text-center' : 'text-left'
    const marginBase = align === 'center' ? 'mx-auto' : ''

    return (
        <div className={`mb-16 md:mb-24 ${textBase} max-w-4xl ${marginBase}`}>
            <div className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
                <span className="w-8 h-px bg-indigo-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400">
                    {subtitle}
                </span>
                {align === 'center' && <span className="w-8 h-px bg-indigo-500" />}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]">
                {title}
            </h2>
        </div>
    )
}

/* ── HERO ── */
function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    return (
        <section ref={ref} className="relative min-h-[95vh] flex items-end pb-24 md:pb-32 overflow-hidden border-b border-white/[0.04] pt-32">
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop"
                        alt="Maze/Network"
                        className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
                        style={{ filter: 'brightness(0.4) contrast(1.1) saturate(0.5) hue-rotate(-20deg)' }}
                    />
                </div>
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10" />
                <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-indigo-500/[0.05] blur-[150px] rounded-full z-10 mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-sky-500/[0.03] blur-[180px] rounded-full z-10" />
                {/* Grid */}
                <div className="absolute inset-0 z-10 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </motion.div>

            <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-16 relative z-20">
                <div className="max-w-5xl">
                    <Badge pulse>Core Discipline 03</Badge>
                    
                    <div className="mb-8">
                        <KineticTypography
                            text="Funnel Architecture"
                            as="h1"
                            className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter text-white"
                        />
                        <div className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter italic text-indigo-400 opacity-90 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                            Pathway Design
                        </div>
                    </div>

                    <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light mb-12">
                        High traffic is worthless if visitors get lost. We engineer psychological pathways that guide prospects from passive curiosity to absolute commitment, ensuring every touchpoint acts as a calculated behavioral trigger.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Link href="/contact?service=funnel-architecture" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-indigo-500 bg-indigo-500/10 px-10 py-5">
                            <span className="absolute inset-0 bg-indigo-500 transition-transform duration-500 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100" />
                            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-sm tracking-[0.1em] uppercase group-hover:text-black transition-colors duration-300">
                                Engineer My Funnels
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </Link>
                        
                        <div className="flex items-center gap-4 text-zinc-500 text-sm font-mono uppercase tracking-[0.1em] px-4">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
                                ].map((img, i) => (
                                    <img key={i} src={img} alt="" className="w-10 h-10 rounded-full border-2 border-[#030303] relative z-10 grayscale hover:grayscale-0 transition-all" />
                                ))}
                            </div>
                            <span className="flex flex-col">
                                <span className="text-indigo-400 font-bold tracking-widest leading-tight">-45%</span>
                                <span className="text-[9px]">Avg Drop-off Rate</span>
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

/* ── PROBLEM / MANIFESTO ── */
function ProblemAgitation() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-20%' })

    return (
        <section className="py-24 md:py-36 border-b border-white/[0.04] bg-[#020202] relative" ref={ref}>
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={inView ? { opacity: 1, x: 0 } : {}} 
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6"
                    >
                        <SectionLabel>The Leaky Bucket</SectionLabel>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.05] mb-8">
                            Traffic isn't your problem. <br/>
                            <span className="text-zinc-600 italic">Intent decay is.</span>
                        </h2>
                        
                        <div className="prose prose-invert prose-lg text-zinc-400 font-light leading-relaxed">
                            <p>
                                Most websites act like a giant dumping ground of information. Users are bombarded with generic messaging, confusing navigations, and weak calls to action.
                            </p>
                            <p>
                                <strong className="text-white font-medium">The harsh reality:</strong> If a prospect has to think about what to do next, you've already lost them. Cognitive load kills conversions instantly. 
                            </p>
                            <p>
                                We approach Funnel Architecture with <span className="text-indigo-400">behavioral psychology and data science</span>. We map the exact objections a buyer has at every stage, and systematically neutralize them through intentional design, copy, and layout. 
                            </p>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <div className="grid gap-4 relative">
                            {/* Decorative background blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
                            
                            {[
                                { title: "Cognitive Overload", metric: "9s", impact: "Average time a user spends before abandoning a confusing page." },
                                { title: "Dead-End Pathways", metric: "73%", impact: "Of users bounce when they hit a page without a clear next step." },
                                { title: "Untracked Abandonment", metric: "$$$", impact: "Money burned on ads sending traffic to un-optimized landing spots." }
                            ].map((issue, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="bg-[#050505] border border-white/[0.04] p-6 rounded-2xl relative z-10 flex items-start gap-6"
                                >
                                    <div className="w-14 h-14 shrink-0 rounded-full border border-red-500/20 bg-red-500/5 flex justify-center items-center">
                                        <span className="font-mono text-red-500 font-bold text-sm">{issue.metric}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold tracking-tight text-lg mb-1.5">{issue.title}</h4>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{issue.impact}</p>
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

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse border border-indigo-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ── THE MODERN ARCHITECTURE (FEATURES) ── */
const STACK_FEATURES = [
    {
        icon: Map,
        title: 'Behavioral Action Mapping',
        desc: 'We map out precise step-by-step user journeys that dictate exactly what a user should read, feel, and click at every single scroll depth.',
        color: '#6366f1' // Indigo 500
    },
    {
        icon: Fingerprint,
        title: 'Psychological Triggers',
        desc: 'Integrating targeted scarcity, social proof, authority anchoring, and micro-commitments into the UX/UI to drive undeniable urge-to-act.',
        color: '#8b5cf6' // Violet 500
    },
    {
        icon: Magnet,
        title: 'Lead Magnet Physics',
        desc: 'Designing hyper-specific opt-in gateways that capture high-intent leads using the principle of reciprocity instead of annoying pop-ups.',
        color: '#3b82f6' // Blue 500
    },
    {
        icon: Layers,
        title: 'Multi-Step Qualification',
        desc: 'Segmenting traffic dynamically using micro-forms. It pre-qualifies your leads so your sales team only speaks to perfect fits.',
        color: '#10b981' // Emerald
    },
    {
        icon: Blocks,
        title: 'Value Ladder Engineering',
        desc: 'Constructing seamless upsell and downsell pathways immediately post-conversion to maximize Average Order Value without adding friction.',
        color: '#f59e0b' // Amber
    },
    {
        icon: Waypoints,
        title: 'Omnichannel Retargeting Prep',
        desc: 'Structurally preparing pages to fire crystal-clear pixel events so that your ad campaigns can retarget specific abandoned behaviors.',
        color: '#ec4899' // Pink
    }
]

function TechStack() {
    return (
        <section className="py-24 md:py-36 relative border-b border-white/[0.04]">
            {/* Background */}
            <div className="absolute inset-0 bg-[#040404] z-0" />
            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <SectionHeading 
                    subtitle="Strategic Capabilities" 
                    title={<>The anatomy of <span className="text-zinc-600 italic">calculated conversion.</span></>}
                    align="center"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STACK_FEATURES.map((feat, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-[#060606] border border-white/[0.04] hover:border-white/[0.1] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-[50px] pointer-events-none"
                                 style={{ background: feat.color }} />
                            
                            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                                <feat.icon size={20} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight mb-4">{feat.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm font-light group-hover:text-zinc-400 transition-colors">
                                {feat.desc}
                            </p>
                            
                            {/* Bottom accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                 style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ── PROOF / ROI ── */
function ProofSection() {
    return (
        <section className="py-24 md:py-36 bg-[#030303] border-b border-white/[0.04]">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <SectionLabel>The Results</SectionLabel>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.05] mb-8">
                            Clarity immediately <br />
                            <span className="text-indigo-400 italic">scales acquisition.</span>
                        </h2>
                        <ul className="space-y-6">
                            {[
                                { m: '3x', label: 'Lead Volume Increase', t: 'By shifting from generic contact forms to high-value calculators & lead magnets.' },
                                { m: '-45%', label: 'Drop-off Rate', t: 'Achieved by removing dead-end links and enforcing linear story paths.' },
                                { m: '+112%', label: 'Return on Ad Spend (ROAS)', t: 'Simply by sending costly traffic to a structured funnel instead of a homepage.' }
                            ].map((s, i) => (
                                <li key={i} className="flex gap-6 items-start">
                                    <div className="w-24 shrink-0 font-display font-black text-3xl text-indigo-400">{s.m}</div>
                                    <div>
                                        <div className="font-bold text-zinc-300 tracking-wide uppercase text-xs mb-1">{s.label}</div>
                                        <div className="text-zinc-500 text-sm">{s.t}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/[0.05] to-blue-500/[0.05] blur-3xl opacity-50" />
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] bg-[#050505] shadow-2xl">
                            
                            <div className="px-8 py-6 border-b border-white/[0.04] bg-[#080808] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Activity className="text-indigo-400 w-5 h-5"/>
                                    <span className="font-semibold text-white tracking-wide">Funnel Progression Analytics</span>
                                </div>
                                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] uppercase tracking-widest font-mono rounded-full border border-indigo-500/20">Active Campaign</span>
                            </div>

                            <div className="p-8">
                                <div className="space-y-8">
                                    {[
                                        { label: 'Step 1: Landing Page Views', users: 12500, percent: 100, color: 'bg-indigo-500/20', bar: 'bg-indigo-400', width: '100%' },
                                        { label: 'Step 2: Read Manifesto (25% Scroll)', users: 8125, percent: 65, color: 'bg-indigo-500/20', bar: 'bg-indigo-400', width: '65%' },
                                        { label: 'Step 3: Clicked "See Pricing"', users: 4387, percent: 35.1, color: 'bg-indigo-500/20', bar: 'bg-indigo-400', width: '35%' },
                                        { label: 'Step 4: Qualified Lead Captured', users: 1240, percent: 9.9, color: 'bg-emerald-500/20', bar: 'bg-emerald-400', width: '10%' }
                                    ].map((step, i) => (
                                        <div key={i} className="relative">
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="text-xs font-semibold text-white">{step.label}</div>
                                                <div className="text-[10px] font-mono text-zinc-500">{step.users.toLocaleString()} ({step.percent}%)</div>
                                            </div>
                                            <div className={`h-2 w-full rounded-full ${step.color} overflow-hidden`}>
                                                <div className={`h-full ${step.bar}`} style={{ width: step.width }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    <p className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase">Benchmark: Top 1% Industry Conversion Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── FINAL CTA ── */
function BottomCTA() {
    return (
        <section className="py-32 md:py-48 relative overflow-hidden bg-[#000]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-4xl">
                <SectionLabel>Map Your Pathway</SectionLabel>
                <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 uppercase font-black">
                    Stop Guessing. <br/>
                    <span className="text-indigo-400 italic">Start Converting.</span>
                </h2>
                
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    We will audit your existing traffic flow, identify the exact points of friction, and rebuild a funnel architecture designed to capture high-intent demand.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact?service=funnel-architecture" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black text-[13px] font-black tracking-[0.1em] uppercase hover:bg-zinc-100 transition-all duration-300">
                        Map My Funnel
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link href="/case-studies" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full border border-white/[0.1] text-zinc-400 text-[13px] font-bold tracking-[0.1em] uppercase hover:text-white hover:border-white/[0.2] transition-all duration-300">
                        View Implementations
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default function FunnelArchitectureClient() {
    return (
        <div className="overflow-clip">
            <Hero />
            <ProblemAgitation />
            <TechStack />
            <ProofSection />
            <TrustBadges />
            <BottomCTA />
        </div>
    )
}
