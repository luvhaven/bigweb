'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ArrowLeft, ArrowRight, ArrowUpRight, Target, Zap, Activity, Lock, CheckCircle2,
    ChevronRight, Layers, TrendingUp, BarChart3, Clock, Shield, Globe, Code2, Cpu
} from 'lucide-react'

import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import KineticTypography from '@/components/effects/KineticTypography'
import MotionOrchestrator, { MotionItem } from '@/components/effects/MotionOrchestrator'
import SectionAtmosphere from '@/components/effects/SectionAtmosphere'

// Demos
import VortexPayDemo from '@/components/demos/VortexPayDemo'
import AntroLogisticsDemo from '@/components/demos/AntroLogisticsDemo'
import NexusFlowDemo from '@/components/demos/NexusFlowDemo'
import AuraWearDemo from '@/components/demos/AuraWearDemo'
import AetherInsightsDemo from '@/components/demos/AetherInsightsDemo'
import VanguardCapitalDemo from '@/components/demos/VanguardCapitalDemo'
import ElevateCommerceDemo from '@/components/demos/ElevateCommerceDemo'
import SkyPulseDemo from '@/components/demos/SkyPulseDemo'
import PrismIdentityDemo from '@/components/demos/PrismIdentityDemo'

const DemoRegistry: { [key: string]: React.ComponentType } = {
    'VortexPayDemo': VortexPayDemo,
    'AntroLogisticsDemo': AntroLogisticsDemo,
    'NexusFlowDemo': NexusFlowDemo,
    'AuraWearDemo': AuraWearDemo,
    'AetherInsightsDemo': AetherInsightsDemo,
    'VanguardCapitalDemo': VanguardCapitalDemo,
    'ElevateCommerceDemo': ElevateCommerceDemo,
    'SkyPulseDemo': SkyPulseDemo,
    'PrismIdentityDemo': PrismIdentityDemo
}

interface CaseStudyDetailsClientProps {
    study: any
}

// Animated counter
function AnimatedStat({ value, label, delay = 0, accent }: { value: string, label: string, delay?: number, accent?: boolean }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    const [displayed, setDisplayed] = useState('—')

    useEffect(() => {
        if (!inView) return
        const timer = setTimeout(() => {
            const numMatch = value.match(/[\d.]+/)
            if (!numMatch) { setDisplayed(value); return }
            const num = parseFloat(numMatch[0])
            const prefix = value.slice(0, value.indexOf(numMatch[0]))
            const suffix = value.slice(value.indexOf(numMatch[0]) + numMatch[0].length)
            let start = 0
            const steps = 50
            const inc = num / steps
            const interval = setInterval(() => {
                start += inc
                if (start >= num) {
                    setDisplayed(value)
                    clearInterval(interval)
                } else {
                    const val = num < 10 ? start.toFixed(1) : Math.floor(start).toString()
                    setDisplayed(`${prefix}${val}${suffix}`)
                }
            }, 30)
        }, delay * 1000)
        return () => clearTimeout(timer)
    }, [inView, value, delay])

    return (
        <div ref={ref} className="group">
            <div className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter italic ${accent ? 'text-accent' : 'text-white'}`}>
                {displayed}
            </div>
            <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold mt-2">{label}</div>
        </div>
    )
}

// Phase label
function PhaseLabel({ number, label, accent }: { number: string, label: string, accent?: boolean }) {
    return (
        <div className="flex items-center gap-4 mb-10">
            <div className={`text-[9px] font-black uppercase tracking-[0.5em] px-4 py-1.5 rounded-full border ${accent ? 'text-accent border-accent/20 bg-accent/5' : 'text-zinc-500 border-white/[0.06] bg-white/[0.02]'}`}>
                {number}
            </div>
            <div className={`text-[9px] font-black uppercase tracking-[0.5em] ${accent ? 'text-accent' : 'text-zinc-600'}`}>{label}</div>
            <div className={`flex-1 h-[1px] ${accent ? 'bg-accent/20' : 'bg-white/[0.04]'}`} />
        </div>
    )
}

export default function CaseStudyDetailsClient({ study }: CaseStudyDetailsClientProps) {
    const DemoComponent = study.demoComponent && DemoRegistry[study.demoComponent] ? DemoRegistry[study.demoComponent] : null
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef })
    const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.1])
    const [activeSection, setActiveSection] = useState(0)

    const title = study.title || 'Case Study'
    const titleParts = title.split(':').map((p: string) => p.trim())

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Staggered reveal on scroll for narrative sections
            gsap.utils.toArray('.reveal-section').forEach((el: any, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                )
            })

            // Parallax on image
            const heroImg = document.querySelector('.hero-parallax-img')
            if (heroImg) {
                gsap.to(heroImg, {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero-section',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                })
            }

            // Section tracker
            const sections = ['challenge', 'solution', 'results']
            sections.forEach((id, i) => {
                const el = document.getElementById(id)
                if (el) {
                    ScrollTrigger.create({
                        trigger: el,
                        start: 'top 60%',
                        end: 'bottom 60%',
                        onEnter: () => setActiveSection(i),
                        onEnterBack: () => setActiveSection(i),
                    })
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const navItems = ['Challenge', 'Solution', 'Results']

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-accent/20 overflow-x-hidden">
            <AdvancedNavigation />

            {/* ─── CINEMATIC HERO ─── */}
            <section ref={heroRef} className="hero-section relative min-h-screen flex flex-col justify-end pb-0 overflow-hidden">
                {/* Background parallax */}
                <motion.div
                    style={{ y: yHero, scale: scaleHero }}
                    className="absolute inset-0 hero-parallax-img"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 to-transparent z-10" />
                    {study.image && (
                        <Image
                            src={study.image}
                            alt={title}
                            fill
                            className="object-cover opacity-30"
                            priority
                        />
                    )}
                    {/* Ambient glow overlay */}
                    <div className="absolute inset-0 bg-accent/[0.04] mix-blend-overlay z-10" />
                </motion.div>

                {/* Grid texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none z-10" />

                {/* Content */}
                <div className="container mx-auto px-6 lg:px-16 relative z-20 pb-20 pt-48">
                    <MotionOrchestrator baseDelay={0.2} staggerDelay={0.12}>

                        {/* Back link */}
                        <MotionItem variant="fadeUp">
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-accent transition-colors mb-14 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Evidence Registry
                            </Link>
                        </MotionItem>

                        {/* Meta tags */}
                        <MotionItem variant="fadeUp" className="flex flex-wrap gap-3 mb-10">
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-accent/20 bg-accent/[0.06] text-accent">
                                {study.client}
                            </span>
                            {study.offer && (
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-white/[0.06] bg-white/[0.02] text-zinc-400">
                                    {study.offer}
                                </span>
                            )}
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-white/[0.06] bg-white/[0.02] text-zinc-400 flex items-center gap-1.5">
                                <Lock className="w-3 h-3" />
                                Verified
                            </span>
                        </MotionItem>

                        {/* Title */}
                        <MotionItem variant="blurReveal">
                            <h1 className="text-[13vw] sm:text-[10vw] md:text-[8vw] xl:text-[7rem] font-black tracking-tighter leading-[0.85] uppercase italic mb-8 max-w-6xl">
                                {titleParts.length > 1 ? (
                                    <>
                                        <span className="block text-white">{titleParts[0]}:</span>
                                        <span className="block text-accent mt-2">{titleParts[1]}</span>
                                    </>
                                ) : (
                                    <span className="text-white">{title}</span>
                                )}
                            </h1>
                        </MotionItem>

                        {/* Summary */}
                        <MotionItem variant="fadeUp">
                            <p className="text-lg md:text-xl xl:text-2xl text-zinc-400 max-w-3xl leading-relaxed font-medium">
                                {study.summary}
                            </p>
                        </MotionItem>
                    </MotionOrchestrator>
                </div>

                {/* Results strip at bottom of hero */}
                {study.results && study.results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="relative z-20 border-t border-white/[0.06] bg-black/60 backdrop-blur-xl"
                    >
                        <div className="container mx-auto px-6 lg:px-16">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]">
                                {study.results.slice(0, 4).map((result: string, i: number) => {
                                    const parts = result.match(/^([+\-$×]?[\d.MmKkBb%×x]+)\s+(.+)$/)
                                    const val = parts ? parts[1] : result.slice(0, 5)
                                    const lbl = parts ? parts[2] : result.slice(5)
                                    return (
                                        <div key={i} className="px-8 py-8 flex flex-col">
                                            <AnimatedStat value={val} label={lbl} delay={0.2 + i * 0.1} accent={i === 0} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* ─── DEMO / PRODUCT SHOWCASE ─── */}
            {DemoComponent && (
                <section className="py-20 md:py-28 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.03] blur-[200px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-4 md:px-6 lg:px-16 relative">
                        <MotionOrchestrator baseDelay={0.1}>
                            <MotionItem variant="fadeUp" className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.06] mb-6">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Live Product Demo</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic">
                                    See the <span className="text-accent">interface</span> we built.
                                </h2>
                            </MotionItem>

                            {/* Browser mockup frame */}
                            <MotionItem variant="scaleUp">
                                <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-[0_0_120px_rgba(0,0,0,0.9)] bg-[#0a0a0a]">
                                    {/* Browser chrome */}
                                    <div className="bg-[#111] px-6 py-4 flex items-center gap-3 border-b border-white/[0.04]">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="bg-white/[0.04] border border-white/[0.05] rounded-lg px-4 py-1.5 flex items-center gap-2 max-w-sm mx-auto">
                                                <Lock className="w-3 h-3 text-emerald-500/70" />
                                                <span className="text-[10px] text-zinc-500 font-mono truncate">
                                                    {study.client?.toLowerCase().replace(/\s/g, '')}.io/dashboard
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-[9px] font-mono text-zinc-700 uppercase tracking-wider">Live Preview</div>
                                    </div>

                                    {/* Demo content */}
                                    <div className="p-0 overflow-hidden">
                                        <DemoComponent />
                                    </div>
                                </div>
                            </MotionItem>
                        </MotionOrchestrator>
                    </div>
                </section>
            )}

            {/* ─── MAIN NARRATIVE CONTENT ─── */}
            <section className="py-12 md:py-20 relative">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-12 gap-16 md:gap-20">

                        {/* Main content column */}
                        <div className="lg:col-span-8 space-y-24 md:space-y-36">

                            {/* ── CHALLENGE ── */}
                            <div id="challenge" className="reveal-section">
                                <PhaseLabel number="Phase 01" label="Challenge Forensics" />

                                <KineticTypography
                                    segments={[
                                        { text: 'What was ' },
                                        { text: 'killing growth.', className: 'text-zinc-600' }
                                    ]}
                                    as="h2"
                                    className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 tracking-tighter uppercase italic leading-[1] text-white"
                                />

                                <div className="relative">
                                    {/* Big ghost number */}
                                    <div className="absolute -left-4 md:-left-12 -top-8 text-[8rem] font-black text-white/[0.02] leading-none select-none pointer-events-none italic">01</div>

                                    <div className="relative z-10 p-8 md:p-12 rounded-[2rem] border border-white/[0.04] bg-white/[0.01]">
                                        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-medium italic">
                                            "{study.challenge}"
                                        </p>
                                    </div>

                                    {/* Diagnostic breakdown */}
                                    <div className="mt-6 grid gap-3">
                                        {[
                                            { label: 'Primary Friction', desc: 'Identified through session recording and heatmap analysis' },
                                            { label: 'Revenue Impact', desc: 'Quantified through funnel analytics and cohort comparison' },
                                            { label: 'Root Cause', desc: 'Traced to UX debt and misaligned conversion architecture' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.04] bg-white/[0.01] group hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
                                                <div className="w-2 h-2 rounded-full bg-accent/40 mt-2 shrink-0 group-hover:bg-accent transition-colors" />
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">{item.label}</span>
                                                    <p className="text-sm text-zinc-500 mt-0.5">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ── SOLUTION ── */}
                            <div id="solution" className="reveal-section">
                                <PhaseLabel number="Phase 02" label="Architecture Deployment" accent />

                                <KineticTypography
                                    segments={[
                                        { text: 'The ' },
                                        { text: 'conversion', className: 'text-accent' },
                                        { text: ' blueprint.' }
                                    ]}
                                    as="h2"
                                    className="text-4xl md:text-5xl lg:text-6xl font-display mb-10 tracking-tighter uppercase italic leading-[1] text-white"
                                />

                                <div className="relative">
                                    <div className="absolute -left-4 md:-left-12 -top-8 text-[8rem] font-black text-accent/[0.03] leading-none select-none pointer-events-none italic">02</div>

                                    {/* Solution card */}
                                    <div className="relative z-10 p-8 md:p-12 rounded-[2rem] border border-accent/15 bg-gradient-to-br from-accent/5 to-transparent overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                                            <Layers className="w-64 h-64 text-accent" />
                                        </div>
                                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-6">Our Framework</div>
                                        <p className="text-lg md:text-2xl text-white font-black italic tracking-tight leading-relaxed relative z-10">
                                            "{study.solution}"
                                        </p>
                                    </div>

                                    {/* Tech stack */}
                                    {study.technologies && study.technologies.length > 0 && (
                                        <div className="mt-8">
                                            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-4">Stack Deployed</div>
                                            <div className="flex flex-wrap gap-3">
                                                {study.technologies.map((tech: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] group/tech hover:border-accent/30 hover:bg-accent/[0.04] transition-all cursor-default">
                                                        <Code2 className="w-3 h-3 text-zinc-700 group-hover/tech:text-accent transition-colors" />
                                                        <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 group-hover/tech:text-white transition-colors">{tech}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ── RESULTS ── */}
                            <div id="results" className="reveal-section">
                                <PhaseLabel number="Phase 03" label="Verified Impact" />

                                <KineticTypography
                                    segments={[
                                        { text: 'The numbers ' },
                                        { text: "don't lie.", className: 'text-zinc-600' }
                                    ]}
                                    as="h2"
                                    className="text-4xl md:text-5xl lg:text-6xl font-display mb-12 tracking-tighter uppercase italic leading-[1] text-white"
                                />

                                <div className="space-y-4">
                                    {study.results && study.results.map((result: string, i: number) => {
                                        const parts = result.match(/^([+\-$×]?[\d.MmKkBb%×x]+)\s+(.+)$/)
                                        const val = parts ? parts[1] : result
                                        const lbl = parts ? parts[2] : 'Result'
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                className="group relative flex items-center justify-between p-7 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-white/[0.05] bg-white/[0.01] hover:border-accent/20 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden cursor-default"
                                            >
                                                {/* Background glow on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                                {/* Index */}
                                                <div className="absolute top-4 right-6 text-[9px] font-black text-white/[0.03] group-hover:text-white/[0.05] transition-colors select-none text-right">
                                                    0{i + 1}
                                                </div>

                                                <div className="flex items-center gap-6 md:gap-10 relative z-10">
                                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#0a0a0a] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-500">
                                                        <Activity className="w-6 h-6 text-zinc-700 group-hover:text-accent transition-colors duration-500" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">{val}</div>
                                                        <div className="text-zinc-500 text-sm mt-1">{lbl}</div>
                                                    </div>
                                                </div>

                                                <div className="relative z-10 hidden md:flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
                                                    <span className="text-[9px] text-zinc-700 uppercase tracking-wider font-bold">Lab Verified</span>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ── STICKY SIDEBAR ── */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-28 space-y-5">
                                {/* Progress nav */}
                                <div className="p-6 rounded-[1.5rem] border border-white/[0.05] bg-white/[0.01]">
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-5">Case Sections</div>
                                    <div className="space-y-1">
                                        {navItems.map((item, i) => (
                                            <a
                                                key={i}
                                                href={`#${item.toLowerCase()}`}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-[11px] font-black uppercase tracking-[0.2em] ${activeSection === i ? 'bg-accent/10 text-accent border border-accent/20' : 'text-zinc-600 hover:text-white hover:bg-white/[0.03]'}`}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeSection === i ? 'bg-accent' : 'bg-zinc-800'}`} />
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Project info card */}
                                <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/[0.05] bg-[#0a0a0a] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Author */}
                                    <div className="flex items-center gap-4 mb-8 relative z-10">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 shrink-0">
                                            <Image
                                                src={study.author?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
                                                alt={study.author?.name || 'Team'}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white italic">{study.author?.name || 'Team BIGWEB'}</div>
                                            <div className="text-[10px] text-accent uppercase tracking-wider font-bold">{study.author?.role || 'Lead Engineer'}</div>
                                        </div>
                                        <div className="ml-auto">
                                            <CheckCircle2 className="w-5 h-5 text-accent/60" />
                                        </div>
                                    </div>

                                    {/* Metadata */}
                                    <div className="space-y-4 relative z-10">
                                        {[
                                            { label: 'Client', value: study.client },
                                            { label: 'Offer Type', value: study.offer || 'Custom Project' },
                                            { label: 'Date', value: study.date },
                                            { label: 'Integrity', value: 'Verified', green: true },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                                                <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">{item.label}</span>
                                                <span className={`text-[11px] font-black ${item.green ? 'text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1' : 'text-white'}`}>
                                                    {item.green && <Lock className="w-2.5 h-2.5" />}
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Results Summary */}
                                {study.results && study.results.length > 0 && (
                                    <div className="p-6 rounded-[1.5rem] border border-accent/15 bg-accent/[0.03] relative overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-5">Key Outcomes</div>
                                        <div className="space-y-3">
                                            {study.results.slice(0, 3).map((result: string, i: number) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <ChevronRight className="w-3.5 h-3.5 text-accent/60 mt-0.5 shrink-0" />
                                                    <span className="text-xs text-zinc-300 font-medium leading-snug">{result}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA card */}
                                <Link
                                    href="/offers/revenue-roadmap"
                                    className="block p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white hover:bg-accent transition-colors duration-500 group cursor-pointer"
                                >
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-black/60 transition-colors mb-3">Apply This Framework</div>
                                    <div className="text-xl font-black text-[#050505] italic tracking-tighter leading-tight mb-4">
                                        Get a Revenue Roadmap for your business
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-600 group-hover:text-black/70 transition-colors">
                                        Start Today
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ─── CINEMATIC CTA ─── */}
            <section className="py-32 md:py-48 relative overflow-hidden">
                <SectionAtmosphere preset="warm" intensity={0.6} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20" />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent/20 bg-accent/[0.04] mb-14">
                                <Target className="w-3.5 h-3.5 text-accent" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Ready to Replicate This?</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase italic tracking-tighter mb-8 leading-[0.85]">
                                Your Revenue<br />
                                <span className="text-accent drop-shadow-[0_0_50px_rgba(212,168,83,0.3)]">Is Waiting.</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-14 leading-relaxed">
                                The same conversion framework used for <span className="text-white font-bold">{study.client}</span> is immediately available for your platform.{' '}
                                <em className="text-white underline decoration-accent/40 underline-offset-4">Stop leaving revenue on the table.</em>
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/offers/revenue-roadmap"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 md:px-14 py-5 md:py-6 rounded-2xl bg-white text-[#050505] font-black uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:bg-accent hover:shadow-[0_0_60px_rgba(212,168,83,0.3)] hover:scale-[1.02] group"
                                >
                                    <Target className="w-4 h-4" />
                                    Get My Revenue Roadmap
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/case-studies"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 md:py-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-white font-black uppercase tracking-[0.15em] text-sm hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 backdrop-blur-sm"
                                >
                                    All Case Studies
                                    <ArrowLeft className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
