'use client'

import { useRef, useState, useEffect } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Target, Database, Trophy } from 'lucide-react'
import SplitText from '@/components/ui/SplitText'
import MagneticButton from '@/components/ui/MagneticButton'
import NoiseField from '@/components/ui/NoiseField'
import HeroCanvas from '@/components/ui/HeroCanvas'
import Parallax from '@/components/ui/Parallax'
import { usePersonalization } from '@/hooks/usePersonalization'

// Hero + Reveal Logic in a Single God-Level Stack
export default function MorphingHeroStack() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [loaded, setLoaded] = useState(false)
    const personalization = usePersonalization()

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100)
        return () => clearTimeout(t)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const spring = useSpring(scrollYProgress, { stiffness: 45, damping: 20, restDelta: 0.0001 })

    // --- TRANSITION MATH ---
    // 0 -> 0.4: Reveal Animation
    // 0.4 -> 1.0: Section Scroll/Read

    const irisRadius = useTransform(spring, [0, 0.4], [0, 150]) // percentage
    const irisClip = useTransform(irisRadius, (r) => `circle(${r}% at 50% 50%)`)

    // Glowing ring that follows the iris
    const ringSize = useTransform(spring, [0, 0.4], [0, 200]) // vh/vw approx
    const ringOpacity = useTransform(spring, [0, 0.05, 0.35, 0.4], [0, 1, 1, 0])

    const heroOpacity = useTransform(spring, [0.35, 0.45], [1, 0])
    const heroScale = useTransform(spring, [0, 0.4], [1, 0.9])
    const heroBlur = useTransform(spring, [0.2, 0.4], [0, 20])

    const revealOpacity = useTransform(spring, [0.05, 0.2], [0, 1])

    // --- CONTENT ANIMATIONS ---
    const contentY = useTransform(spring, [0.35, 0.6], [100, 0])
    const contentOpacity = useTransform(spring, [0.35, 0.6], [0, 1])

    const statsOpacity = useTransform(spring, [0.5, 0.75], [0, 1])
    const statsY = useTransform(spring, [0.5, 0.75], [60, 0])

    const gridOpacity = useTransform(spring, [0.65, 0.95], [0, 1])
    const gridY = useTransform(spring, [0.65, 0.95], [80, 0])

    const TICKER_ITEMS = [
        'Conversion Audit', '288% Revenue Growth', 'Landing Page Engine',
        'AI Sales Agent', 'Core Web Vitals Fix', 'Authority Redesign',
        'Revenue Funnel System', '$3.4M+ Per Client', 'CRO Retainer',
    ]

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#010101]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* --- LAYER 0: HERO (The Base) --- */}
                <motion.div
                    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto"
                    style={{
                        opacity: heroOpacity,
                        scale: heroScale,
                        filter: `blur(${heroBlur}px)`
                    }}
                >
                    <div className="absolute inset-0 z-0">
                        <NoiseField opacity={0.4} color="255, 255, 255" particleCount={200} speed={0.0003} />
                        <div className="absolute inset-0 bg-[#010101]/20" />
                    </div>

                    <div className="container relative z-10 mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={loaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-none">
                                Your {personalization.headlineNoun} <br />
                                <span className="text-white/20 stroke-text">is costing</span> <br />
                                <span className="text-[#FF6B35]">money.</span>
                            </h1>

                            <div className="mt-12 flex flex-wrap gap-6 items-center">
                                <MagneticButton href="/contact" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-3">
                                    Start Strategy Session <ArrowRight size={20} />
                                </MagneticButton>
                                <Link href="/work" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                                    See Client Outcomes <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-12 left-0 w-full overflow-hidden opacity-20 pointer-events-none">
                        <div className="flex animate-marquee whitespace-nowrap">
                            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                                <span key={i} className="text-xs font-mono tracking-widest uppercase px-8 text-white">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* --- LAYER 1: THE REVEAL (The Wonder) --- */}
                <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#010101]"
                    style={{ clipPath: irisClip, opacity: revealOpacity }}
                >
                    {/* The Glowing Iris Ring (Simulated with a div) */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF6B35]/30 pointer-events-none z-30"
                        style={{
                            width: ringSize,
                            height: ringSize,
                            opacity: ringSize, // Using size as proxy for scale if needed or opacity
                            boxShadow: '0 0 100px 20px rgba(255, 107, 53, 0.15)',
                        }}
                    />

                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#FF6B35]/5 to-transparent blur-3xl opacity-40" />
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-violet-600/5 to-transparent blur-3xl opacity-30" />
                    </div>

                    <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-7xl">
                        {/* High-End Agency Reveal Typography */}
                        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="mb-20">
                            <span className="inline-block text-xs font-mono tracking-[0.4em] text-[#FF6B35] uppercase mb-8">
                                Elite Digital Engineering
                            </span>
                            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.95] max-w-5xl">
                                We grow <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-amber-400 to-[#FF6B35] bg-[length:200%_auto] animate-shimmer">
                                    revenue giants.
                                </span>
                            </h2>
                            <p className="mt-10 text-xl md:text-2xl text-white/40 max-w-3xl font-light leading-relaxed">
                                Not just an agency. We are a revenue-first engineering operation. We optimize at the molecule level to ensure absolute market dominance.
                            </p>
                        </motion.div>

                        {/* Bento Grid Layer */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            <motion.div
                                style={{ opacity: statsOpacity, y: statsY }}
                                className="lg:col-span-4 grid grid-cols-1 gap-6"
                            >
                                <GlassCard icon={<Trophy className="text-[#FF6B35]" />} val="$140M+" label="Client Revenue Driven" />
                                <GlassCard icon={<Zap className="text-amber-400" />} val="288%" label="Avg. Conversion Lift" />
                            </motion.div>

                            <motion.div
                                style={{ opacity: gridOpacity, y: gridY }}
                                className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 backdrop-filter backdrop-blur-3xl flex flex-col justify-between group overflow-hidden relative"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B35] to-transparent opacity-50" />
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-white mb-6">Database-Level Attribution</h3>
                                    <p className="text-white/40 text-lg leading-relaxed max-w-xl">
                                        We don&apos;t guess. We track every lead, click, and dollar back to its source at the kernel level.
                                        Your growth is plotted with mathematical certainty.
                                    </p>
                                </div>
                                <div className="mt-12 flex gap-12 items-center relative z-10">
                                    <Metric small val="42" label="Global Successes" />
                                    <Metric small val="94%" label="Partner Retention" />
                                </div>
                                <div className="absolute bottom-[-10%] right-[-5%] text-[15rem] font-bold text-white/[0.02] pointer-events-none select-none">
                                    BIG
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
                    color: transparent;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes shimmer {
                    to { background-position: 200% center; }
                }
                .animate-shimmer {
                    animation: shimmer 6s linear infinite;
                }
            `}</style>
        </section>
    )
}

function GlassCard({ icon, val, label }: { icon: React.ReactNode, val: string, label: string }) {
    return (
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-filter backdrop-blur-2xl hover:bg-white/[0.04] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                {icon}
            </div>
            <div className="text-5xl font-bold text-white mb-2 tracking-tighter group-hover:text-[#FF6B35] transition-colors">{val}</div>
            <div className="text-xs font-mono tracking-widest text-white/30 uppercase">{label}</div>
        </div>
    )
}

function Metric({ val, label, small = false }: { val: string, label: string, small?: boolean }) {
    return (
        <div>
            <div className={`${small ? 'text-4xl' : 'text-6xl'} font-bold text-white mb-1 tracking-tighter`}>{val}</div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">{label}</div>
        </div>
    )
}
