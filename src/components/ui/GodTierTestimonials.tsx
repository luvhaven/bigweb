'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, animate } from 'framer-motion'
import Image from 'next/image'

const TESTIMONIALS = [
    {
        id: 't1',
        quote: "They didn't just build a website. They engineered an absolute revenue extraction machine. Our deal flow converted at numbers I previously thought were mathematically impossible.",
        author: "Sarah Jenkins",
        role: "CEO",
        company: "Vertex Enterprise",
        tagline: "E-Commerce Scale-Up",
        stars: 5,
        metricLabel: "Revenue Growth",
        metricValue: 314,
        metricSuffix: '%',
        accentColor: '#FF6B35',
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 't2',
        quote: "It feels like we skipped five years of linear progression overnight. The architectural depth and sheer cinematic quality obliterated every single competitor in our space.",
        author: "Marcus Vance",
        role: "Founder & CEO",
        company: "Obsidian Data",
        tagline: "B2B SaaS",
        stars: 5,
        metricLabel: "Customer LTV",
        metricValue: 8.4,
        metricSuffix: 'x',
        accentColor: '#818cf8',
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 't3',
        quote: "We were stuck at $20M ARR fighting brutal churn. BigWeb reconstructed our entire digital acquisition perimeter. We hit $55M ARR nine months later. Total market domination.",
        author: "Elena Rostova",
        role: "CMO",
        company: "Nexus Fintech",
        tagline: "Fintech Platform",
        stars: 5,
        metricLabel: "ARR Added",
        metricValue: 35,
        metricSuffix: 'M',
        accentColor: '#34d399',
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 't4',
        quote: "The God-Tier engineering they inject into every interface is genuinely absurd. If you want a brochure site, go elsewhere. If you want absolute global market superiority, hire BigWeb.",
        author: "David Chen",
        role: "VP Marketing",
        company: "Aurora AI",
        tagline: "AI Infrastructure",
        stars: 5,
        metricLabel: "Category Rank",
        metricValue: 1,
        metricSuffix: ' №',
        accentColor: '#f59e0b',
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    },
]

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (!isInView || done || !ref.current) return
        setDone(true)
        const isFloat = !Number.isInteger(value)
        const controls = animate(0, value, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(v) {
                if (ref.current) {
                    ref.current.textContent = isFloat ? v.toFixed(1) : Math.round(v).toString()
                }
            },
        })
        return () => controls.stop()
    }, [isInView, value, done])

    return (
        <span ref={ref} style={{ color }} className="tabular-nums">
            0
        </span>
    )
}

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-1 mb-6">
            {Array.from({ length: count }).map((_, i) => (
                <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, type: 'spring', stiffness: 400, damping: 20 }}
                    width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </motion.svg>
            ))}
        </div>
    )
}

function TestimonialCard({ data, index }: { data: typeof TESTIMONIALS[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { margin: '-15% 0px -15% 0px', once: false })
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [hovered, setHovered] = useState(false)

    const handleMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return
        const r = cardRef.current.getBoundingClientRect()
        setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top })
    }, [])

    return (
        <div
            ref={cardRef}
            className="w-screen md:w-[75vw] lg:w-[60vw] h-full flex-shrink-0 relative flex items-center px-8 md:px-16 lg:px-24"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMove}
        >
            {/* Vertical index number */}
            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 font-mono text-[120px] font-bold leading-none text-white/[0.02] select-none pointer-events-none">
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Main card glass panel */}
            <motion.div
                className="relative w-full rounded-3xl overflow-hidden"
                style={{
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(40px)',
                    border: `1px solid rgba(255,255,255,0.07)`,
                    boxShadow: hovered ? `0 0 80px ${data.accentColor}18, inset 0 0 40px rgba(255,255,255,0.01)` : '0 4px 40px rgba(0,0,0,0.5)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0.3 }}
                transition={{ duration: 0.7 }}
            >
                {/* Gradient border on hover */}
                <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none z-0"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        background: `linear-gradient(135deg, ${data.accentColor}22, transparent 60%)`,
                    }}
                />

                {/* Floating holographic portrait */}
                <motion.div
                    className="absolute w-[200px] h-[260px] rounded-2xl overflow-hidden pointer-events-none z-10 border border-white/10"
                    style={{
                        top: mousePos.y - 130,
                        left: mousePos.x - 100,
                        filter: 'saturate(0.3) brightness(0.8)',
                        mixBlendMode: 'screen',
                    }}
                    animate={{
                        opacity: hovered ? 0.5 : 0,
                        scale: hovered ? 1 : 0.6,
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
                    <Image src={data.image} alt={data.author} fill className="object-cover" />
                </motion.div>

                <div className="relative z-20 p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-10 items-start">
                    {/* Left: Quote content */}
                    <div>
                        <StarRating count={data.stars} />

                        <motion.blockquote
                            className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-[1.35] tracking-tight mb-10"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        >
                            &ldquo;{data.quote}&rdquo;
                        </motion.blockquote>

                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isInView ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2"
                                style={{ boxShadow: `0 0 0 2px ${data.accentColor}` }}>
                                <Image src={data.image} alt={data.author} width={48} height={48} className="object-cover" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-base">{data.author}</p>
                                <p className="text-white/40 text-sm font-mono">{data.role}, {data.company}</p>
                            </div>
                            <div
                                className="ml-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider"
                                style={{ background: `${data.accentColor}18`, color: data.accentColor }}
                            >
                                {data.tagline}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Metric */}
                    <motion.div
                        className="flex flex-col items-center justify-center text-center min-w-[160px] p-6 rounded-2xl shrink-0"
                        style={{ background: `${data.accentColor}0d`, border: `1px solid ${data.accentColor}20` }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
                        transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
                    >
                        <div
                            className="text-5xl md:text-6xl font-bold tracking-tighter tabular-nums"
                            style={{ color: data.accentColor, textShadow: `0 0 40px ${data.accentColor}60` }}
                        >
                            {data.metricSuffix === ' №' ? (
                                <><AnimatedCounter value={data.metricValue} suffix="" color={data.accentColor} />{data.metricSuffix}</>
                            ) : (
                                <><AnimatedCounter value={data.metricValue} suffix="" color={data.accentColor} />{data.metricSuffix}</>
                            )}
                        </div>
                        <div className="mt-2 text-xs font-mono tracking-widest text-white/30 uppercase">
                            {data.metricLabel}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom accent bar */}
                <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(90deg, ${data.accentColor}60, transparent)` }}
                />
            </motion.div>
        </div>
    )
}

export default function GodTierTestimonials() {
    const targetRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({ target: targetRef })

    const spring = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 })

    // Calculate total scroll width: intro + 4 cards + outro
    const totalCards = TESTIMONIALS.length
    const x = useTransform(spring, [0, 1], ['0vw', `-${(totalCards + 0.5) * 60}vw`])

    return (
        <section ref={targetRef} className="relative bg-[#050506]" style={{ height: `${(totalCards + 2) * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Animated grid background */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Edge vignettes */}
                <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#050506] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#050506] to-transparent z-20 pointer-events-none" />

                <motion.div style={{ x }} className="flex h-full items-center w-max will-change-transform">

                    {/* Intro panel */}
                    <div className="w-screen h-full flex-shrink-0 flex flex-col justify-center px-8 md:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#FF6B35] uppercase mb-8">
                                <span className="w-6 h-px bg-[#FF6B35]" />
                                Client Outcomes
                            </span>
                            <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none text-white mb-6">
                                Real<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white/90 to-white/20">
                                    Results.
                                </span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/30 max-w-lg font-light leading-relaxed">
                                Not projections. Not case studies built on vanity metrics. Verified revenue deltas from our private client collective.
                            </p>
                            <div className="mt-10 flex items-center gap-3 text-white/30 text-sm font-mono">
                                <span>Scroll to explore</span>
                                <motion.span
                                    animate={{ x: [0, 12, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                                >
                                    →
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Cards */}
                    {TESTIMONIALS.map((t, i) => (
                        <TestimonialCard key={t.id} data={t} index={i} />
                    ))}

                    {/* Outro pad */}
                    <div className="w-[30vw] flex-shrink-0" />
                </motion.div>
            </div>
        </section>
    )
}
