'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'
import Link from 'next/link'
import KineticTypography from './effects/KineticTypography'

const rows = [
    { feature: 'Engineering Velocity', bigweb: 'yes', agencies: 'maybe', freelancers: 'no' },
    { feature: 'Strategy-First Architecture', bigweb: 'yes', agencies: 'rarely', freelancers: 'no' },
    { feature: 'Revenue-Focused Design', bigweb: 'yes', agencies: 'no', freelancers: 'no' },
    { feature: 'Sub-Second Performance', bigweb: 'yes', agencies: 'rarely', freelancers: 'no' },
    { feature: 'Data-Backed Decisions', bigweb: 'yes', agencies: 'sometimes', freelancers: 'no' },
    { feature: 'Conversion Optimization', bigweb: 'yes', agencies: 'extra', freelancers: 'no' },
    { feature: 'Fixed-Price Transparency', bigweb: 'yes', agencies: 'no', freelancers: 'sometimes' },
    { feature: 'Long-Term Growth Partner', bigweb: 'yes', agencies: 'no', freelancers: 'no' },
    { feature: 'Zero Bloated Retainers', bigweb: 'yes', agencies: 'no', freelancers: 'yes' },
    { feature: '30-Day Launch Guarantee', bigweb: 'yes', agencies: 'no', freelancers: 'no' },
]

function CellIcon({ value }: { value: string }) {
    if (value === 'yes') return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Check className="w-4 h-4 text-emerald-400" />
        </span>
    )
    if (value === 'no') return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/5 border border-red-500/10 grayscale-[50%]">
            <X className="w-4 h-4 text-red-400/50" />
        </span>
    )
    // maybe / sometimes / rarely / extra
    return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/5 border border-yellow-500/10">
            <Minus className="w-4 h-4 text-yellow-400/50" />
        </span>
    )
}

export default function BrutalComparison() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)

    return (
        <section ref={ref} className="py-32 md:py-48 bg-[#040404] relative overflow-hidden border-t border-white/[0.04]">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/[0.02] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/[0.015] rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3" />

                {/* Micro-grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
                />
            </div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-6xl">
                {/* Header Phase */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
                                The Uncomfortable Truth
                            </span>
                        </span>

                        <KineticTypography
                            segments={[
                                { text: 'Why the world\'s best brands ' },
                                { text: 'choose BIGWEB.', className: 'italic text-zinc-500' }
                            ]}
                            as="h2"
                            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-zinc-500 leading-relaxed max-w-sm lg:text-right"
                    >
                        Most agencies sell you hours. We sell you outcomes. Here is how we stack up against the alternatives.
                    </motion.p>
                </div>

                {/* Table Phase */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl border border-white/[0.06] bg-[#070707] shadow-2xl overflow-hidden"
                >
                    {/* The "BIGWEB" Column Highlight Layer */}
                    <div className="absolute top-0 bottom-0 left-[25%] right-[50%] md:left-[33.33%] md:right-[33.33%] pointer-events-none z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.05] to-transparent border-x border-accent/[0.1] opacity-60" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-accent/40" />
                        {/* Glow at top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent/20 blur-[40px] rounded-full" />
                    </div>

                    {/* Desktop Headers */}
                    <div className="hidden md:grid grid-cols-4 border-b border-white/[0.06] relative z-10 bg-[#070707]/80 backdrop-blur-md">
                        <div className="px-8 py-6 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-600 flex items-center">Evaluation Criteria</div>
                        {[
                            { label: 'BIGWEB', subtitle: 'The Standard', highlight: true },
                            { label: 'Traditional Agency', subtitle: 'Industry Standard', highlight: false },
                            { label: 'Freelancer', subtitle: 'Solo Resource', highlight: false },
                        ].map((col) => (
                            <div
                                key={col.label}
                                className={`px-8 py-6 text-center flex flex-col items-center justify-center ${col.highlight ? 'text-white' : 'text-zinc-500'}`}
                            >
                                <span className={`text-sm font-bold tracking-[0.15em] mb-1 ${col.highlight ? 'text-accent' : ''}`}>
                                    {col.label}
                                </span>
                                <span className="text-[10px] font-mono tracking-wider opacity-60 uppercase">{col.subtitle}</span>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Headers (Simplified) */}
                    <div className="grid md:hidden grid-cols-4 border-b border-white/[0.06] relative z-10 bg-[#070707]/80 backdrop-blur-md">
                        <div className="px-4 py-4 text-[9px] font-mono uppercase tracking-widest text-zinc-600 flex items-center flex-col justify-center text-center">Criteria</div>
                        <div className="px-2 py-4 text-center flex flex-col justify-center opacity-100 text-accent font-bold text-[10px] tracking-wide">BIGWEB</div>
                        <div className="px-2 py-4 text-center flex flex-col justify-center text-zinc-500 font-bold text-[10px] tracking-wide">Agency</div>
                        <div className="px-2 py-4 text-center flex flex-col justify-center text-zinc-500 font-bold text-[10px] tracking-wide">Free<br />lancer</div>
                    </div>

                    {/* Rows */}
                    <div className="relative z-10 divide-y divide-white/[0.04]">
                        {rows.map((row, i) => (
                            <motion.div
                                key={row.feature}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                                onMouseEnter={() => setHoveredRow(i)}
                                onMouseLeave={() => setHoveredRow(null)}
                                className={`grid grid-cols-4 transition-colors duration-300 relative ${hoveredRow === i ? 'bg-white/[0.025]' : ''}`}
                            >
                                {/* Left accent bar — appears on hover */}
                                <motion.div
                                    className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-accent"
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{ scaleY: hoveredRow === i ? 1 : 0, opacity: hoveredRow === i ? 1 : 0 }}
                                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ originY: 'center' }}
                                />
                                <div className={`px-4 md:px-8 py-5 md:py-6 text-xs md:text-sm font-medium transition-colors duration-300 flex items-center ${hoveredRow === i ? 'text-white pl-5 md:pl-10' : 'text-zinc-400'}`}>
                                    {row.feature}
                                </div>
                                <div className="px-2 md:px-8 py-5 md:py-6 flex items-center justify-center relative">
                                    <CellIcon value={row.bigweb} />
                                </div>
                                <div className="px-2 md:px-8 py-5 md:py-6 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                                    <CellIcon value={row.agencies} />
                                </div>
                                <div className="px-2 md:px-8 py-5 md:py-6 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                                    <CellIcon value={row.freelancers} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="/contact"
                        className="btn-magnetic pulse-ring group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        Start a Project
                        <span className="font-mono transition-transform duration-500 group-hover:translate-x-1 inline-block">→</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-[12px] text-zinc-500 font-medium">Zero commitment discovery call.</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
