'use client'

/**
 * RiskReversal — Performance Guarantee Block
 * ────────────────────────────────────────────
 * A prominently designed section placed immediately below pricing
 * that eliminates the primary purchasing fear of high-ticket buyers:
 * "What if it doesn't work?"
 *
 * This block builds so much confidence that the immediate next step
 * (booking a call) feels like the obviously correct decision.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, RotateCcw, TrendingUp, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionAtmosphere from './effects/SectionAtmosphere'

const guarantees = [
    {
        icon: ShieldCheck,
        title: '90-Day Conversion Guarantee',
        description:
            'If your site does not produce a measurable improvement in conversion rate within 90 days of launch, our team returns and rebuilds any underperforming section — at zero charge.',
        color: '#10b981',
    },
    {
        icon: TrendingUp,
        title: 'Performance Standards Guaranteed',
        description:
            'We guarantee Core Web Vitals "Good" status across all pages at delivery — LCP under 2.5s, CLS under 0.1, INP under 200ms. Verified via third-party tools. Every time.',
        color: '#6366f1',
    },
    {
        icon: RotateCcw,
        title: 'Unlimited Design Revisions',
        description:
            'We do not ship until you love it. During the design phase, revisions are unlimited. You will never be forced to approve something that does not represent your business perfectly.',
        color: '#d4a853',
    },
    {
        icon: Zap,
        title: 'On-Time Launch or Credit',
        description:
            'We commit to a launch date in writing. If we miss it due to any factor within our control, you receive a $1,000 service credit toward your next engagement, no questions asked.',
        color: '#f59e0b',
    },
]

export default function RiskReversal() {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref as any, { once: true, margin: '-80px' })

    return (
        <section
            ref={ref}
            className="relative py-28 md:py-36 bg-[#060606] overflow-hidden"
            id="guarantee"
        >
            <SectionAtmosphere preset="emerald" intensity={0.7} parallax />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04] mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                            Our Commitment to You
                        </span>
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6">
                        We don&apos;t just promise results.{' '}
                        <em className="italic text-zinc-500">We guarantee them.</em>
                    </h2>
                    <p className="text-lg text-zinc-500 leading-relaxed">
                        High-stakes investments require high-stakes accountability. When BIGWEB
                        takes on your project, we put our most valuable asset — our reputation — on the line.
                    </p>
                </motion.div>

                {/* Guarantees Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                    {guarantees.map((g, i) => {
                        const Icon = g.icon
                        return (
                            <motion.div
                                key={g.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.1 + i * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="group relative p-7 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
                            >
                                {/* Top accent bar */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${g.color}60, transparent)`,
                                    }}
                                />

                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                                    style={{
                                        background: `radial-gradient(ellipse 60% 60% at 20% 80%, ${g.color}08, transparent)`,
                                    }}
                                />

                                <div className="relative z-10 flex gap-5">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{
                                            background: `${g.color}15`,
                                            border: `1px solid ${g.color}25`,
                                        }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: g.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">
                                            {g.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed">
                                            {g.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Summary CTA Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(ellipse 70% 60% at 100% 50%, rgba(16,185,129,0.04), transparent)',
                        }}
                    />
                    <div className="relative z-10 max-w-xl">
                        <p className="font-semibold text-white text-lg mb-1 tracking-tight">
                            Still have questions about the process?
                        </p>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Book a free 30-minute strategy call. No pitch, no pressure — just honest
                            answers from a senior member of our team about whether BIGWEB is the right
                            fit for your goals.
                        </p>
                    </div>
                    <div className="relative z-10 shrink-0">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white text-[#060606] text-sm font-bold tracking-wide hover:bg-emerald-400 transition-colors duration-300"
                        >
                            Book a Strategy Call
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
