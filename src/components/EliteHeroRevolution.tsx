'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useScrollReveal, useTextReveal } from '@/hooks/useScrollAnimations'
import Elite3DCard from '@/components/ui/Elite3DCard'
import { ArrowRight, Play, Zap, TrendingUp, Award, Star } from 'lucide-react'
import Link from 'next/link'
import { PhysicsReveal } from '@/components/ui/PhysicsReveal'

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

    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black border-b border-zinc-900"
        >
            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.05]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black pointer-events-none" />
            </div>

            {/* CONTENT */}
            <motion.div
                className="relative z-10 container mx-auto px-6 max-w-7xl"
                style={{ opacity }}
            >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* LEFT: TEXT CONTENT */}
                    <div className="relative">
                        {/* BADGE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-900 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
                                System_Status: Optimal
                            </span>
                        </motion.div>

                        {/* MAIN HEADLINE */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8 text-white"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Digital <br />
                            <span className="text-zinc-800">Dominance.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-xl text-zinc-500 font-mono mb-10 max-w-xl leading-relaxed"
                        >
                            // We engineer high-performance digital infrastructure for market leaders.
                        </motion.p>

                        {/* DUAL CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-5 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/contact">
                                <button className="group relative h-14 px-8 bg-white text-black hover:bg-orange-600 hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-[10px] flex items-center gap-4">
                                    Initialize_Project
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <button
                                onClick={() => setIsVideoPlaying(true)}
                                className="group h-14 px-8 bg-transparent border border-zinc-800 text-white hover:bg-zinc-900 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] flex items-center gap-4"
                            >
                                <Play className="w-4 h-4" />
                                View_Protocol
                            </button>
                        </motion.div>

                        {/* TRUST STATS */}
                        <motion.div
                            className="flex items-center gap-10 pt-6 border-t border-zinc-900"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div>
                                <div className="text-2xl font-black text-white mb-0.5">500+</div>
                                <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">Projects_Deployed</div>
                            </div>
                            <div className="w-px h-10 bg-zinc-900" />
                            <div>
                                <div className="text-2xl font-black text-white mb-0.5">$50M+</div>
                                <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">Revenue_Generated</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: VISUAL */}
                    <motion.div
                        className="relative hidden lg:block h-full min-h-[600px]"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        <PhysicsReveal
                            revealSize={250}
                            dampening={30}
                            className="bg-zinc-950 border-l border-b border-zinc-900 w-full h-full"
                            cover={
                                <div className="absolute inset-0 p-8 flex items-center justify-center">
                                    <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-zinc-900" />
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:20px_20px] opacity-[0.05]" />

                                    {/* Schematic Version (Wireframe) */}
                                    <div className="relative w-80 h-80 border border-zinc-800 rotate-45 flex items-center justify-center grayscale opacity-50">
                                        <div className="w-[90%] h-[90%] border border-zinc-900" />
                                        <div className="w-[80%] h-[80%] border border-zinc-900" />
                                        <div className="absolute w-[120%] h-[1px] bg-zinc-900 -rotate-45" />
                                        <div className="absolute w-[1px] h-[120%] bg-zinc-900 -rotate-45" />
                                    </div>
                                    <div className="absolute w-[500px] h-[500px] border border-zinc-900/50 rounded-full" />

                                    {/* Floating Badges (Standard) */}
                                    <div className="absolute top-10 right-10 bg-black border border-zinc-900 p-4 opacity-50 grayscale">
                                        <div className="text-xs font-mono text-zinc-600 uppercase">System_Load</div>
                                        <div className="text-xl font-bold text-zinc-400">WAITING...</div>
                                    </div>
                                </div>
                            }
                        >
                            {/* Revealed Version (Energized) */}
                            <div className="absolute inset-0 bg-black flex items-center justify-center p-8">
                                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-orange-600/50" />
                                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:20px_20px] opacity-[0.1]" />

                                <div className="relative w-80 h-80 border-2 border-orange-600 rotate-45 flex items-center justify-center shadow-[0_0_50px_rgba(234,88,12,0.3)] bg-orange-900/5 backdrop-blur-sm">
                                    <div className="w-[90%] h-[90%] border border-orange-500/50" />
                                    <div className="w-[80%] h-[80%] border border-orange-500/30" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white] animate-pulse" />
                                    </div>
                                    <div className="absolute -inset-4 border border-orange-600/20 rounded-full animate-spin-slow" />
                                </div>
                                <div className="absolute w-[500px] h-[500px] border border-orange-600/20 rounded-full animate-pulse" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/20 via-transparent to-transparent pointer-events-none" />

                                {/* Floating Badges (Active) */}
                                <div className="absolute top-10 right-10 bg-zinc-950 border border-orange-600 p-4 shadow-[0_0_30px_rgba(234,88,12,0.2)]">
                                    <div className="text-xs font-mono text-orange-500 uppercase">System_Load</div>
                                    <div className="text-xl font-bold text-white">98.4%</div>
                                </div>
                                <div className="absolute bottom-20 left-10 bg-zinc-950 border border-orange-600 p-4 shadow-[0_0_30px_rgba(234,88,12,0.2)]">
                                    <div className="text-xs font-mono text-orange-500 uppercase">Active_Nodes</div>
                                    <div className="text-xl font-bold text-white">4,281</div>
                                </div>
                            </div>
                        </PhysicsReveal>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
