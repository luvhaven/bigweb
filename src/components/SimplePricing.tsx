'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, Zap, Compass, Shield, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import KineticTypography from './effects/KineticTypography'
import { useEngagements } from '@/hooks/useCMS'
import { PRICING_PACKAGES } from '@/lib/config/pricing'
import type { PricingPackage } from '@/lib/config/pricing'
import SectionAtmosphere from './effects/SectionAtmosphere'




/* ─── ROI Calculator ─── */
function ROICalculator() {
    const [visitors, setVisitors] = useState(10000)
    const [convRate, setConvRate] = useState(1.8)
    const [orderValue, setOrderValue] = useState(200)

    const current = visitors * (convRate / 100) * orderValue
    const improved = visitors * ((convRate * 3.4) / 100) * orderValue
    const gain = improved - current
    const annualGain = gain * 12

    const fmt = (n: number) => {
        if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
        if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
        return `$${Math.round(n)}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 rounded-2xl border border-white/[0.07] bg-[#0c0c0c] overflow-hidden"
        >
            <div className="p-8 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent font-semibold">Revenue Logic V2.0</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display text-white mb-4 tracking-tighter leading-none">The cost of <span className="italic text-zinc-500 font-light">inaction.</span></h3>
                    <p className="text-sm text-zinc-500 mb-10 leading-relaxed max-w-md">
                        Our engineering protocol delivers a verified average 340% conversion uplift. Use the logic engine below to quantify your missing revenue.
                    </p>

                    <div className="space-y-8">
                        {[
                            { label: 'Monthly website visitors', value: visitors, set: setVisitors, min: 500, max: 200000, step: 500, format: (v: number) => v.toLocaleString() },
                            { label: 'Current conversion rate', value: convRate, set: setConvRate, min: 0.1, max: 15, step: 0.1, format: (v: number) => `${v.toFixed(1)}%` },
                            { label: 'Average order / deal value', value: orderValue, set: setOrderValue, min: 10, max: 10000, step: 10, format: (v: number) => `$${v.toLocaleString()}` },
                        ].map(({ label, value, set, min, max, step, format }) => (
                            <div key={label} className="group/slider">
                                <div className="flex justify-between mb-4">
                                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-600 transition-colors group-hover/slider:text-zinc-400">{label}</span>
                                    <span className="text-sm text-white font-mono font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">{format(value)}</span>
                                </div>
                                <input
                                    type="range" min={min} max={max} step={step} value={value}
                                    onChange={e => set(Number(e.target.value))}
                                    className="w-full h-1 bg-white/[0.05] rounded-full appearance-none cursor-pointer accent-accent hover:accent-accent/80 transition-all"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full opacity-30 pointer-events-none" />
                    <div className="relative space-y-6">
                        <div className="p-8 rounded-2xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm">
                            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-3 underline decoration-zinc-800 underline-offset-4">Current Stasis Revenue</div>
                            <div className="text-4xl font-black tracking-tighter text-zinc-500/80 italic">{fmt(current)}<span className="text-sm not-italic font-mono text-zinc-700 ml-2">/MO</span></div>
                        </div>
                        <div className="p-8 rounded-2xl border border-accent/30 bg-accent/[0.03] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none transition-opacity group-hover:opacity-60" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-bold">Projected BIGWEB Velocity</div>
                                    <div className="text-[9px] font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">+340% MODEL</div>
                                </div>
                                <div className="text-5xl font-black tracking-tighter text-white">{fmt(improved)}<span className="text-sm font-mono text-zinc-400 ml-2">/MO</span></div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 pt-4">
                            <div className="text-center sm:text-left">
                                <div className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                                    <span className="text-emerald-500">+{fmt(gain)}</span>
                                    <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Monthly Surplus</span>
                                </div>
                                <div className="text-[11px] text-zinc-500 font-mono mt-1">~{fmt(annualGain)} Expected Annual Impact</div>
                            </div>
                            <Link href="/contact" className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold text-xs tracking-wide transition-transform hover:scale-105 active:scale-95">
                                Capture Upside <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Package Card ─── */
function PackageCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
    const Icon = pkg.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative flex flex-col rounded-2xl border transition-all duration-500 overflow-hidden ${pkg.highlighted
                ? 'border-accent/30 bg-[#0e0c08]'
                : 'border-white/[0.06] bg-[#0c0c0c] hover:border-white/[0.12]'
                }`}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${pkg.color}, transparent)` }}
            />

            {/* Badge */}
            {pkg.badge && (
                <div className="absolute top-5 right-5">
                    <span
                        className="px-2.5 py-1 text-[9px] font-semibold tracking-[0.1em] uppercase rounded-full"
                        style={{
                            background: `${pkg.color}20`,
                            color: pkg.color,
                            border: `1px solid ${pkg.color}30`,
                        }}
                    >
                        {pkg.badge}
                    </span>
                </div>
            )}

            {/* Ambient glow for highlighted */}
            {pkg.highlighted && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${pkg.color}08, transparent)` }}
                />
            )}

            <div className="relative z-10 p-8 md:p-10 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-10">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8"
                        style={{ background: `${pkg.color}10`, border: `1px solid ${pkg.color}20` }}
                    >
                        <Icon className="w-5 h-5" style={{ color: pkg.color }} />
                    </div>

                    <h3 className="text-2xl font-display text-white mb-2 tracking-tight group-hover:text-accent transition-colors duration-500">{pkg.name}</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] font-medium">{pkg.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-white/[0.04]">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tighter text-white">{pkg.price}</span>
                        <span className="text-sm text-zinc-500">{pkg.priceNote}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed mb-8">
                    {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-sm text-zinc-400">
                            <div
                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: `${pkg.color}20` }}
                            >
                                <Check className="w-2.5 h-2.5" style={{ color: pkg.color }} />
                            </div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Ideal for */}
                <div
                    className="text-[10px] font-mono text-zinc-600 mb-6 px-3 py-2 rounded-lg"
                    style={{ background: `${pkg.color}08` }}
                >
                    {pkg.ideal}
                </div>

                {/* CTA */}
                <Link
                    href={pkg.ctaLink}
                    className={`mt-auto flex items-center justify-center gap-2 py-4 px-6 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${pkg.highlighted
                        ? 'text-black'
                        : 'border border-white/[0.1] text-white hover:bg-white/[0.05] hover:border-white/[0.2]'
                        }`}
                    style={pkg.highlighted ? { background: pkg.color } : {}}
                >
                    {pkg.cta}
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    )
}

/* ─── Main Export ─── */
export default function SimplePricing({ initialPackages }: { initialPackages?: any[] | null }) {
    const { engagements, loading } = useEngagements()
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef as any, { once: true, margin: '-100px' })

    // Priority: initialPackages (from DB, passed server-side) > hook data > hardcoded
    const packages = (initialPackages && initialPackages.length > 0)
        ? initialPackages.map((p, i) => ({
            name: p.name || p.title,
            tagline: p.tagline || p.description,
            price: p.price_display || p.price || 'Custom',
            priceNote: p.price_subtext,
            description: p.description || '', // Ensure description is handled
            features: Array.isArray(p.features) ? p.features : [],
            cta: p.cta_text || 'Get Started',
            ctaLink: p.cta_link || p.route || '/contact',
            icon: [Compass, Zap, Shield, Star][i % 4],
            highlighted: p.is_featured || p.highlighted || false,
            badge: p.badge_text ?? undefined,
            color: ['#d4a853', '#6366f1', '#10b981', '#ec4899'][i % 4],
            ideal: '',
        }))
        : (!loading && engagements.length > 0)
            ? engagements.map(e => ({
                name: e.name,
                tagline: e.tagline || '',
                price: e.price || '',
                priceNote: e.price_subtext || '',
                description: e.description || '',
                features: e.features || [],
                cta: 'Get Started',
                ctaLink: e.route ?? '#',
                icon: Zap,
                highlighted: e.highlighted,
                badge: e.badge_text ?? undefined,
                color: '#d4a853',
                ideal: '',
            }))
            : PRICING_PACKAGES

    return (
        <section
            id="pricing"
            ref={sectionRef}
            className="py-28 md:py-36 bg-[#070707] relative overflow-hidden"
        >
            {/* Atmospheric lighting — warm gold for pricing */}
            <SectionAtmosphere preset="warm" parallax />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <span className="w-8 h-px bg-accent" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
                                Engagement Models
                            </span>
                        </motion.div>

                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6">
                            Choose how we<br/>
                            <span className="italic text-zinc-400">
                                work together.
                            </span>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-zinc-500 text-base leading-relaxed"
                        >
                            Three ways to partner with the world's most revenue-focused web agency. Each engagement is fully bespoke — these are starting frameworks, not rigid boxes.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 shrink-0"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        <span className="text-xs font-mono text-emerald-400">
                            Currently accepting 3 new projects — Q1 2026
                        </span>
                    </motion.div>
                </div>

                {/* ROI Calculator */}
                <ROICalculator />

                {/* Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {packages.map((pkg, i) => (
                        <PackageCard key={`${pkg.name}-${i}`} pkg={pkg as any} index={i} />
                    ))}
                </div>

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-8 py-8 border-t border-white/[0.04]"
                >
                    {[
                        { icon: '🔒', text: '30-day money-back guarantee' },
                        { icon: '📋', text: 'No long-term lock-in' },
                        { icon: '👤', text: 'Senior team, always' },
                        { icon: '🚀', text: 'Launch in 8–12 weeks' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Custom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sm text-zinc-600 mb-4">
                        Need something bespoke? Our projects range from $18K to $500K+.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-white/[0.06] hover:border-white/[0.15] rounded-full px-6 py-3"
                    >
                        Let's talk about your project <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
