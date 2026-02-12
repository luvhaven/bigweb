'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap, Rocket, Building2, TrendingUp, Search, ShieldCheck, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEngagements } from '@/hooks/useCMS'
import * as LucideIcons from 'lucide-react'
import Magnetic from '@/components/ui/Magnetic'

// Icon mapping helper
const getIconComponent = (iconName: string | null) => {
    if (!iconName) return Search
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent || Search
}

export default function SimplePricing() {
    const { engagements, loading } = useEngagements()

    // Show loading state
    if (loading) {
        return (
            <section id="pricing" className="py-24 px-6 bg-[#050505] text-white relative overflow-hidden">
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center text-zinc-600">Loading pricing...</div>
                </div>
            </section>
        )
    }

    // Transform database engagements to match component structure
    const packages = engagements.map(engagement => ({
        name: engagement.name,
        tagline: engagement.tagline || '',
        price: engagement.price || '',
        priceSubtext: engagement.price_subtext || '',
        description: engagement.description || '',
        features: engagement.features || [],
        cta: engagement.name.includes('Roadmap') ? 'Order Roadmap' :
            engagement.name.includes('Sprint') ? 'Start A Sprint' :
                engagement.name.includes('Retainer') ? 'Work With Us' :
                    'Get Started',
        ctaLink: engagement.route || '#',
        icon: getIconComponent(engagement.icon),
        highlighted: engagement.highlighted,
        color: engagement.color_scheme || 'zinc',
        badge: engagement.badge_text || undefined
    }))
    return (
        <section id="pricing" className="py-24 px-6 bg-[#050505] text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.02]" />
            <div className="absolute -top-[10%] left-[10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <div className="max-w-5xl mb-16 border-l-4 border-orange-500 pl-10 relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-8"
                    >
                        <ShieldCheck className="w-4 h-4" /> Transparent Pricing
                    </motion.div>

                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
                        Choose Your<br />Growth Path.
                    </h2>

                    <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-3xl">
                        No hidden fees. No hourly billing. Just <span className="text-white">results-focused packages</span> designed to deliver measurable ROI.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {packages.map((pkg, index) => {
                        const Icon = pkg.icon

                        return (
                            <motion.div
                                key={pkg.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className={`group relative p-12 transition-all duration-500 h-full flex flex-col rounded-3xl border border-white/5 ${pkg.highlighted
                                    ? 'bg-white/[0.08] backdrop-blur-xl shadow-2xl z-10 border-orange-500/20'
                                    : 'bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04]'
                                    }`}
                            >
                                {pkg.badge && (
                                    <div className="absolute top-0 right-0 transform translate-y-[-50%] pr-8 z-20">
                                        <span className="bg-orange-600 text-white text-[9px] font-bold px-4 py-1.5 uppercase tracking-widest shadow-xl rounded-bl-xl">
                                            {pkg.badge}
                                        </span>
                                    </div>
                                )}

                                <div className="space-y-8 flex-grow">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">{pkg.tagline || `Option 0${index + 1}`}</div>
                                            <h3 className="text-xl font-bold tracking-tight text-white">{pkg.name}</h3>
                                        </div>
                                        <div className={`w-10 h-10 flex items-center justify-center transition-colors ${pkg.highlighted ? 'text-orange-600' : 'text-zinc-800 group-hover:text-orange-600'}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="py-8 border-y border-zinc-900 group-hover:border-zinc-800 transition-colors">
                                        <div className="text-5xl font-bold text-white italic tracking-tighter mb-1 leading-none">
                                            {pkg.price}
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">{pkg.priceSubtext}</span>
                                    </div>

                                    <p className="text-zinc-500 text-base leading-[1.1] font-medium">
                                        {pkg.description}
                                    </p>

                                    <ul className="space-y-4 pt-4">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-4 text-xs text-zinc-400 font-medium">
                                                <div className={`w-1.5 h-1.5 mt-1.5 shrink-0 ${pkg.highlighted ? 'bg-orange-600' : 'bg-zinc-800 group-hover:bg-orange-600'}`} />
                                                <span className="leading-tight uppercase tracking-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-12 mt-auto">
                                    <Link href={pkg.ctaLink}>
                                        <Magnetic strength={0.2} className="w-full">
                                            <Button
                                                className={`w-full h-16 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${pkg.highlighted
                                                    ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20'
                                                    : 'bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white'
                                                    }`}
                                            >
                                                {pkg.cta}
                                                <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                            </Button>
                                        </Magnetic>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
