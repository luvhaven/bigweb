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
                engagement.name.includes('Retainer') ? 'Access The Lab' :
                    'Build My System',
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
                <div className="max-w-6xl mb-20 border-l-4 border-orange-600 pl-12 relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-black uppercase tracking-[0.5em] mb-12"
                    >
                        <ShieldCheck className="w-4 h-4" /> Capital_Efficiency_v2
                    </motion.div>

                    <h2 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter uppercase italic leading-[0.75] mb-10">
                        Buy <br /><span className="text-zinc-800">Growth.</span>
                    </h2>

                    <p className="text-2xl md:text-5xl text-zinc-500 font-medium leading-none tracking-tight max-w-5xl">
                        We don't bill for effort. We bill for <span className="text-white italic underline underline-offset-8 decoration-orange-600">Yield_Extraction</span>. Choose your entry point.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden">
                    {packages.map((pkg, index) => {
                        const Icon = pkg.icon

                        return (
                            <motion.div
                                key={pkg.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className={`group relative p-12 transition-all duration-500 h-full flex flex-col ${pkg.highlighted
                                    ? 'bg-zinc-950 shadow-2xl z-10'
                                    : 'bg-black'
                                    }`}
                            >
                                {pkg.badge && (
                                    <div className="absolute top-0 right-0 transform translate-y-[-50%] pr-8 z-20">
                                        <span className="bg-orange-600 text-white text-[9px] font-mono font-black px-4 py-1.5 uppercase tracking-widest shadow-xl">
                                            {pkg.badge}
                                        </span>
                                    </div>
                                )}

                                <div className="space-y-8 flex-grow">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">Protocol_0xc{index + 1}</div>
                                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">{pkg.name}</h3>
                                        </div>
                                        <div className={`w-10 h-10 flex items-center justify-center transition-colors ${pkg.highlighted ? 'text-orange-600' : 'text-zinc-800 group-hover:text-orange-600'}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="py-8 border-y border-zinc-900 group-hover:border-zinc-800 transition-colors">
                                        <div className="text-5xl font-black text-white italic tracking-tighter mb-1 leading-none">
                                            {pkg.price}
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest">{pkg.priceSubtext}</span>
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
                                                className={`w-full h-20 text-[10px] font-mono font-black uppercase tracking-[0.4em] rounded-none transition-all duration-300 ${pkg.highlighted
                                                    ? 'bg-orange-600 hover:bg-orange-500 text-white'
                                                    : 'bg-zinc-950 hover:bg-white hover:text-black text-white border border-zinc-900 hover:border-white'
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
