'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

/* ─── SLIDE DATA — Curated website UI screenshots ─── */
const SLIDES = [
    {
        id: 'ecommerce',
        category: 'E-COMMERCE',
        title: 'Luxury Commerce',
        headline: 'Storefronts that sell while you sleep.',
        image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=90&w=2560&auto=format&fit=crop',
        logos: ['CHANEL', 'HERMÈS', 'LOUIS VUITTON', 'BURBERRY', 'GUCCI', 'VERSACE', 'PRADA', 'DIOR', 'CARTIER', 'ROLEX'],
        accent: '#d4a853',
        stat: '+340% CVR',
        statLabel: 'avg. uplift'
    },
    {
        id: 'corporate',
        category: 'CORPORATE',
        title: 'Enterprise Authority',
        headline: 'Digital presence that commands the room.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=90&w=2560&auto=format&fit=crop',
        logos: ['MCKINSEY', 'GOLDMAN SACHS', 'BLACKROCK', 'BLOOMBERG', 'DELOITTE', 'BAIN & CO', 'BCG', 'JP MORGAN'],
        accent: '#6366f1',
        stat: '$2B+',
        statLabel: 'client revenue'
    },
    {
        id: 'saas',
        category: 'WEB APPLICATION',
        title: 'Bespoke SaaS Products',
        headline: 'Complex made breathtakingly simple.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=90&w=2560&auto=format&fit=crop',
        logos: ['STRIPE', 'LINEAR', 'FIGMA', 'NOTION', 'VERCEL', 'SUPABASE', 'GITHUB', 'RAYCAST', 'LOOM', 'ARC'],
        accent: '#10b981',
        stat: '3.2×',
        statLabel: 'faster time-to-market'
    },
    {
        id: 'landing',
        category: 'LANDING PAGE',
        title: 'High-Impact Campaigns',
        headline: 'First impressions that close deals.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=90&w=2560&auto=format&fit=crop',
        logos: ['HUBSPOT', 'SALESFORCE', 'INTERCOM', 'ZENDESK', 'DRIFT', 'GONG', 'SEGMENT', 'CLEARBIT'],
        accent: '#ec4899',
        stat: '98%',
        statLabel: 'retention rate'
    },
    {
        id: 'startup',
        category: 'STARTUP',
        title: 'Series-A Ready Products',
        headline: 'Built to scale. Priced to win.',
        image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=90&w=2560&auto=format&fit=crop',
        logos: ['Y COMBINATOR', 'A16Z', 'SEQUOIA', 'ANDREESSEN', 'ACCEL', 'TIGER GLOBAL', 'BENCHMARK'],
        accent: '#f59e0b',
        stat: '200+',
        statLabel: 'projects shipped'
    }
]

const SLIDE_DURATION = 6000 // 6s per slide

export default function NetflixHero() {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)
    const [progress, setProgress] = useState(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const goTo = useCallback((idx: number) => {
        setCurrent(idx)
        setProgress(0)
    }, [])

    const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
    const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

    // Auto-advance timer
    useEffect(() => {
        if (paused) return
        timerRef.current = setTimeout(next, SLIDE_DURATION)
        return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }, [current, paused, next])

    // Progress bar ticker
    useEffect(() => {
        if (paused) return
        const start = Date.now()
        progressRef.current = setInterval(() => {
            const elapsed = Date.now() - start
            setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100))
        }, 50)
        return () => { if (progressRef.current) clearInterval(progressRef.current) }
    }, [current, paused])

    const slide = SLIDES[current]

    return (
        <section
            className="relative w-full overflow-hidden bg-[#030303]"
            style={{ height: 'clamp(600px, 90vh, 1100px)' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* ═══════════════════════════════════════════════════════════
                BACKGROUND SLIDES — cross-fade transition
            ═══════════════════════════════════════════════════════════ */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={current === 0}
                        quality={85}
                        className="object-cover object-top"
                        sizes="100vw"
                    />

                    {/* Multi-layer atmospheric overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/75 to-[#030303]/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/60 to-transparent" style={{ width: '75%' }} />
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[50%]"
                        style={{ background: 'linear-gradient(to top, #030303, transparent)' }}
                    />

                    {/* Accent color pulse — unique per slide */}
                    <motion.div
                        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
                        style={{
                            background: `radial-gradient(circle, ${slide.accent}25 0%, transparent 70%)`,
                            filter: 'blur(80px)'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════════════
                SLIDE CONTENT
            ═══════════════════════════════════════════════════════════ */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-28 md:pb-36">
                <div className="container mx-auto px-6 lg:px-20">

                    {/* Stats floating top-right */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`stat-${current}`}
                            className="hidden lg:flex absolute top-10 right-16 flex-col items-end gap-1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div
                                className="text-5xl font-black tracking-tighter"
                                style={{ color: slide.accent }}
                            >
                                {slide.stat}
                            </div>
                            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                                {slide.statLabel}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${current}`}
                            className="max-w-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Category pill */}
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: slide.accent, boxShadow: `0 0 10px ${slide.accent}` }}
                                />
                                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400">
                                    {slide.category}
                                </span>
                                <span className="text-zinc-700">·</span>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                    </span>
                                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                                        3 slots open
                                    </span>
                                </div>
                            </div>

                            {/* Main title */}
                            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] text-white tracking-tight leading-[1.0] mb-5">
                                {slide.title}
                            </h2>
                            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-xl leading-relaxed mb-10">
                                {slide.headline}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href="/contact"
                                    data-cursor="Connect"
                                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#030303] text-sm font-bold hover:bg-zinc-100 transition-colors"
                                >
                                    Start Your Project
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] backdrop-blur-sm transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View Evidence
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                LOGO MARQUEE BAR — unique logos per slide
            ═══════════════════════════════════════════════════════════ */}
            <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 border-t border-white/[0.06] bg-black/40 backdrop-blur-2xl z-20 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`logos-${current}`}
                        className="flex items-center w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <LogoMarquee logos={slide.logos} accent={slide.accent} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                SLIDE CONTROLS — bottom right
            ═══════════════════════════════════════════════════════════ */}
            <div className="absolute right-6 lg:right-16 bottom-24 md:bottom-28 z-30 flex items-center gap-5">
                {/* Progress bars */}
                <div className="flex items-center gap-2">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => { setPaused(false); goTo(i) }}
                            className="relative h-8 flex items-center"
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            <div className="w-10 h-[2px] bg-white/10 rounded-full overflow-hidden">
                                {i === current && (
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: slide.accent }}
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0 }}
                                    />
                                )}
                                {i < current && (
                                    <div className="h-full w-full rounded-full" style={{ background: slide.accent, opacity: 0.3 }} />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Arrow controls */}
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => { setPaused(false); prev() }}
                        className="w-11 h-11 rounded-full border border-white/10 backdrop-blur-sm bg-black/20 flex items-center justify-center text-white hover:border-white/30 hover:bg-white/10 transition-all"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => { setPaused(false); next() }}
                        className="w-11 h-11 rounded-full border border-white/10 backdrop-blur-sm bg-black/20 flex items-center justify-center text-white hover:border-white/30 hover:bg-white/10 transition-all"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Slide counter */}
            <div className="absolute left-6 lg:left-20 bottom-24 md:bottom-28 z-30 text-[10px] font-mono text-zinc-600 tracking-[0.2em]">
                0{current + 1} <span className="text-zinc-800">/ 0{SLIDES.length}</span>
            </div>
        </section>
    )
}

/* ─── Pure CSS marquee — no JS overhead ─── */
function LogoMarquee({ logos, accent }: { logos: string[], accent: string }) {
    const doubled = [...logos, ...logos, ...logos]
    return (
        <div className="relative w-full overflow-hidden flex items-center" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <motion.div
                className="flex gap-0 shrink-0"
                animate={{ x: ['0%', '-33.333%'] }}
                transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            >
                {doubled.map((logo, i) => (
                    <div
                        key={i}
                        className="shrink-0 px-10 md:px-16 text-xs md:text-sm font-display font-bold uppercase tracking-[0.35em] text-zinc-600 hover:text-zinc-300 transition-colors cursor-default whitespace-nowrap"
                        style={{ borderRight: `1px solid rgba(255,255,255,0.04)` }}
                    >
                        {logo}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
