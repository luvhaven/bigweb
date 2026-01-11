'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useScrollReveal, useTextReveal } from '@/hooks/useScrollAnimations'
import Elite3DCard from '@/components/ui/Elite3DCard'
import { ArrowRight, Play, Zap, TrendingUp, Award, Star } from 'lucide-react'
import Link from 'next/link'

/**
 * ELITE HERO SECTION
 * Record-breaking first impression
 * Goal: 10/10 visual impact, instant credibility, skeptic conversion
 */

export default function EliteHeroRevolution() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    // Parallax effects for depth
    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

    // Smooth spring physics
    const scaleSpring = useSpring(scale, { damping: 15, stiffness: 200 })

    // Rotating taglines
    const taglines = [
        "We Build Digital Empires That Actually Make Money",
        "Revenue-First Websites That Convert Skeptics Into Customers",
        "Where Design Excellence Meets Business Results"
    ]
    const [currentTagline, setCurrentTagline] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagline((prev) => (prev + 1) % taglines.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* ANIMATED GRADIENT BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `
              radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
            `
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />

                {/* GRID PATTERN */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
                    backgroundSize: '100px 100px'
                }} />

                {/* FLOATING PARTICLES */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* CONTENT */}
            <motion.div
                className="relative z-10 container mx-auto px-4 max-w-7xl"
                style={{ scale: scaleSpring, opacity }}
            >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* LEFT: TEXT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        {/* BADGE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm mb-8 magnetic"
                        >
                            <Award className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-semibold text-emerald-400">Award-Winning Digital Agency</span>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </motion.div>

                        {/* MAIN HEADLINE */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <span className="block text-white mb-2">
                                We Don't Just
                            </span>
                            <span className="block">
                                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                                    Build Websites
                                </span>
                            </span>
                            <span className="block text-white/90 mt-2">
                                We Build
                                <span className="relative inline-block mx-4">
                                    <span className="text-emerald-400">Empires</span>
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400 opacity-50" viewBox="0 0 200 10" preserveAspectRatio="none">
                                        <motion.path
                                            d="M0,5 Q50,0 100,5 T200,5"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="none"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
                                        />
                                    </svg>
                                </span>
                            </span>
                        </motion.h1>

                        {/* ROTATING SUBHEADLINE */}
                        <motion.div
                            className="h-24 mb-10 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.p
                                key={currentTagline}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed"
                            >
                                {taglines[currentTagline]}
                            </motion.p>
                        </motion.div>

                        {/* DUAL CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            {/* PRIMARY CTA */}
                            <Link
                                href="/contact"
                                className="group relative px-8 py-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 rounded-2xl font-bold text-lg text-white overflow-hidden shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-400/70 transition-all magnetic"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700" />
                                <span className="relative flex items-center justify-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    Start Your Project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            {/* SECONDARY CTA */}
                            <button
                                onClick={() => setIsVideoPlaying(true)}
                                className="group px-8 py-5 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-2xl font-semibold text-lg text-white transition-all flex items-center justify-center gap-2 magnetic"
                            >
                                <Play className="w-5 h-5" />
                                Watch Our Process
                                <span className="text-sm text-zinc-400">(2 min)</span>
                            </button>
                        </motion.div>

                        {/* TRUST STATS */}
                        <motion.div
                            className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-lg"
                                        >
                                            ★
                                        </div>
                                    ))}
                                </div>
                                <div className="text-left">
                                    <div className="text-white font-bold text-sm">500+ Projects Delivered</div>
                                    <div className="text-zinc-400 text-xs">Avg. 3.2x ROI in 90 days</div>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-white/10" />

                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-emerald-400" />
                                <div className="text-left">
                                    <div className="text-white font-bold text-sm">$50M+ Revenue Generated</div>
                                    <div className="text-zinc-400 text-xs">For our clients</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: VISUAL */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        <Elite3DCard
                            intensity={8}
                            glowColor="rgba(16, 185, 129, 0.4)"
                            className="relative aspect-square max-w-xl mx-auto"
                        >
                            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10 shadow-2xl">
                                {/* MOCKUP BROWSER */}
                                <div className="relative w-full h-full p-6">
                                    {/* Browser chrome */}
                                    <div className="bg-zinc-800/50 rounded-t-xl p-3 flex items-center gap-2 border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="flex-1 ml-4 h-6 bg-white/5 rounded-md flex items-center px-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                                            <div className="h-2 w-32 bg-white/10 rounded" />
                                        </div>
                                    </div>

                                    {/* Content preview with animations */}
                                    <div className="bg-gradient-to-br from-zinc-900 to-black p-6 space-y-4 rounded-b-xl">
                                        <motion.div
                                            className="h-4 bg-gradient-to-r from-white/20 to-white/5 rounded-full w-3/4"
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="h-4 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 rounded-full w-1/2"
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                                        />

                                        {/* Chart visualization */}
                                        <div className="flex items-end gap-2 h-32 mt-8">
                                            {[40, 60, 45, 75, 90, 85, 100].map((height, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex-1 bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t-lg"
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: 1 }}
                                                    transition={{
                                                        delay: 1 + i * 0.1,
                                                        duration: 0.5,
                                                        repeat: Infinity,
                                                        repeatDelay: 3
                                                    }}
                                                    style={{
                                                        height: `${height}%`,
                                                        transformOrigin: 'bottom'
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Metrics */}
                                        <motion.div
                                            className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mt-4"
                                            animate={{
                                                boxShadow: [
                                                    '0 0 20px rgba(16, 185, 129, 0.1)',
                                                    '0 0 40px rgba(16, 185, 129, 0.3)',
                                                    '0 0 20px rgba(16, 185, 129, 0.1)'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <div className="text-white font-bold text-sm">Conversion Rate</div>
                                            <div className="text-emerald-400 font-black text-2xl">+247%</div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-2xl border-2 border-white/20"
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    ⚡ Live Results
                                </motion.div>
                            </div>
                        </Elite3DCard>
                    </motion.div>
                </div>
            </motion.div>

            {/* SCROLL INDICATOR */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{
                    y: [0, 10, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        className="w-1 h-2 bg-emerald-400 rounded-full"
                        animate={{
                            y: [0, 12, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
