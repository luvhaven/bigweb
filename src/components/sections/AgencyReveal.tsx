'use client'

import { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from 'framer-motion'

const STATS = [
    { value: '$140M+', label: 'Revenue Generated' },
    { value: '288%', label: 'Avg. Client Growth' },
    { value: '42', label: 'Elite Campaigns' },
    { value: '94%', label: 'Retention Rate' },
]

const DIFFERENTIATORS = [
    {
        index: '01',
        title: 'We Build Revenue Machines',
        body: 'Not websites. Every pixel is engineered with a conversion hypothesis. We run experiments, not assumptions.',
    },
    {
        index: '02',
        title: 'AI-Native Architecture',
        body: 'Every engagement integrates generative AI into the acquisition funnel — from qualification to close. Your competitors are still using forms.',
    },
    {
        index: '03',
        title: 'Database-Level Attribution',
        body: 'We track every lead, every click, every dollar back to source at the Postgres level. No spreadsheets. No guesswork.',
    },
    {
        index: '04',
        title: 'We Only Work With Winners',
        body: "We're not an agency for everyone. We partner exclusively with founders and CMOs who are serious about absolute market dominance.",
    },
]

export default function AgencyReveal() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    const spring = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.0005 })

    // Clip-path morph: Starts as a horizontal slit in the center, expands to 100%
    // inset(top right bottom left)
    const clipVal = useTransform(spring, [0, 0.4], [50, 0])
    const clipPath = useTransform(clipVal, (v) => `inset(${v}% 0% ${v}% 0%)`)

    // Opacity reveal starts later and completes with the clip
    const opacity = useTransform(spring, [0.05, 0.35], [0, 1])
    const scale = useTransform(spring, [0, 0.4], [1.1, 1])

    // Content animations synced to the clip progress
    const contentOpacity = useTransform(spring, [0.15, 0.45], [0, 1])
    const contentY = useTransform(spring, [0.15, 0.45], [40, 0])

    const statsOpacity = useTransform(spring, [0.35, 0.65], [0, 1])
    const statsY = useTransform(spring, [0.35, 0.65], [30, 0])

    const gridOpacity = useTransform(spring, [0.55, 0.85], [0, 1])
    const gridY = useTransform(spring, [0.55, 0.85], [30, 0])

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-transparent">
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* The reveal panel — clips open from center */}
                <motion.div
                    className="absolute inset-0 bg-[#000000] flex flex-col justify-center overflow-hidden z-20"
                    style={{
                        clipPath,
                        opacity,
                        scale,
                    }}
                >
                    {/* Ambient noise overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundSize: '128px 128px',
                        }}
                    />

                    {/* Subtle accent orbs */}
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#FF6B35] opacity-[0.04] blur-[150px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600 opacity-[0.06] blur-[120px] pointer-events-none" />

                    <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                        {/* Headline */}
                        <motion.div
                            style={{ opacity: contentOpacity, y: contentY }}
                            className="mb-16"
                        >
                            <span className="inline-block text-xs font-mono tracking-[0.3em] text-[#FF6B35] uppercase mb-6">
                                The Agency
                            </span>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.02] max-w-4xl">
                                We don&apos;t design.
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-amber-400">
                                    We engineer dominance.
                                </span>
                            </h2>
                            <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed font-light">
                                BIGWEB is a revenue-focused digital engineering firm. We exist for one reason: to transform your digital presence into the highest-performing asset in your business portfolio.
                            </p>
                        </motion.div>

                        {/* Stats Bar */}
                        <motion.div
                            style={{ opacity: statsOpacity, y: statsY }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mb-16"
                        >
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-[#0d0d0e] px-6 py-8 group hover:bg-[#111] transition-colors"
                                >
                                    <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2 group-hover:text-[#FF6B35] transition-colors duration-300">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-mono tracking-widest text-white/30 uppercase">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Differentiators Grid */}
                        <motion.div
                            style={{ opacity: gridOpacity, y: gridY }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden"
                        >
                            {DIFFERENTIATORS.map((item) => (
                                <div
                                    key={item.index}
                                    className="bg-[#0d0d0e] px-8 py-8 group hover:bg-[#0f0f10] transition-colors relative overflow-hidden"
                                >
                                    <div className="absolute top-6 right-6 font-mono text-xs text-white/10 group-hover:text-[#FF6B35]/30 transition-colors">
                                        {item.index}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-white/40 leading-relaxed">
                                        {item.body}
                                    </p>
                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#FF6B35] to-transparent group-hover:w-full transition-all duration-700" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
