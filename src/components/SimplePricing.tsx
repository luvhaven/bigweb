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
            <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">ROI Estimator</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">How much revenue are you leaving behind?</h3>
                    <p className="text-xs text-zinc-500 mb-8 leading-relaxed">
                        Based on our verified average 340% conversion rate uplift across 200+ client projects. Adjust your numbers below.
                    </p>

                    <div className="space-y-6">
                        {[
                            { label: 'Monthly website visitors', value: visitors, set: setVisitors, min: 500, max: 200000, step: 500, format: (v: number) => v.toLocaleString() },
                            { label: 'Current conversion rate', value: convRate, set: setConvRate, min: 0.1, max: 15, step: 0.1, format: (v: number) => `${v.toFixed(1)}%` },
                            { label: 'Average order / deal value', value: orderValue, set: setOrderValue, min: 10, max: 10000, step: 10, format: (v: number) => `$${v.toLocaleString()}` },
                        ].map(({ label, value, set, min, max, step, format }) => (
                            <div key={label}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-zinc-500">{label}</span>
                                    <span className="text-xs text-white font-mono font-semibold">{format(value)}</span>
                                </div>
                                <input
                                    type="range" min={min} max={max} step={step} value={value}
                                    onChange={e => set(Number(e.target.value))}
                                    className="w-full h-px bg-white/[0.08] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-webkit-appearance-none [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 mb-2">Current Monthly Revenue</div>
                        <div className="text-3xl font-black tracking-tighter text-zinc-400">{fmt(current)}</div>
                    </div>
                    <div className="p-6 rounded-xl border border-accent/25 bg-accent/[0.05] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                        <div className="relative">
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-2">After BIGWEB</div>
                            <div className="text-3xl font-black tracking-tighter text-white">{fmt(improved)}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="text-emerald-400 font-bold text-lg">+{fmt(gain)}/mo</div>
                            <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">~{fmt(annualGain)}/yr potential upside</div>
                        </div>
                        <Link href="/results" className="text-xs font-mono text-zinc-500 hover:text-white transition-colors underline underline-offset-2">
                            Full calculator →
                        </Link>
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
                <div className="mb-8">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                        style={{ background: `${pkg.color}15`, border: `1px solid ${pkg.color}25` }}
                    >
                        <Icon className="w-4 h-4" style={{ color: pkg.color }} />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-1.5 tracking-tight">{pkg.name}</h3>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.1em]">{pkg.tagline}</p>
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

                        <KineticTypography
                            segments={[
                                { text: 'Choose how we ' },
                                { text: 'work together.', className: 'italic text-zinc-400' }
                            ]}
                            as="h2"
                            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6"
                        />
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
