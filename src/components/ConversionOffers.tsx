'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Zap, Layers, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface Offer {
    id?: string
    title: string
    subtitle: string
    description: string
    price: string
    features: string[]
    cta: string
    link: string
    color?: string
    bg?: string
    highlight?: boolean
    iconName?: string // Changed from icon component to string name
}

interface ConversionOffersProps {
    offers?: Offer[]
}

const defaultOffers: Offer[] = [
    {
        iconName: "BarChart3",
        title: "Conversion Audit",
        price: "$399",
        subtitle: "The Entry Point",
        description: "A deep-dive analysis of your current funnel, messaging, and user experience. We uncover exactly where you are losing money.",
        features: ["Full funnel breakdown", "Conversion blocker identification", "Messaging clarity score", "Prioritized fix list"],
        cta: "Start Your Audit",
        link: "/offers/diagnostic",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        highlight: false
    },
    {
        iconName: "Zap",
        title: "Conversion Fix Sprint",
        price: "$1,000+",
        subtitle: "Rapid Execution",
        description: "We take the findings and fix the critical 20% that drives 80% of your results. Fast, focused execution on high-impact pages.",
        features: ["1-3 Critical page fixes", "Headline & Copy optimization", "CTA placement & design", "Speed optimization"],
        cta: "Fix My Website",
        link: "/offers/fix-sprint",
        color: "text-accent",
        bg: "bg-accent/10",
        highlight: true
    },
    {
        iconName: "Layers",
        title: "Revenue Website System",
        price: "$3,000+",
        subtitle: "The Full Build",
        description: "A complete rebuild from the ground up, engineered for conversion psychology first, visual design second.",
        features: ["Complete architecture rebuild", "Conversion-focused copywriting", "Next.js performance stack", "Full mobile optimization"],
        cta: "Build Revenue System",
        link: "/offers/revenue-system",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        highlight: false
    },
    {
        iconName: "RefreshCw",
        title: "Optimization Retainer",
        price: "$500 - $2k/mo",
        subtitle: "Continuous Growth",
        description: "Your in-house conversion team. We constantly monitor, A/B test, and refine your site to squeeze every drop of ROI.",
        features: ["Monthly A/B testing", "Heatmap analysis", "Performance monitoring", "Iterative copy updates"],
        cta: "Discuss Retainer",
        link: "/offers/retainer",
        color: "text-green-500",
        bg: "bg-green-500/10",
        highlight: false
    }
]

export default function ConversionOffers({ offers }: ConversionOffersProps) {
    // Fallback to default if no props (or for initial static render)
    const displayOffers = offers || defaultOffers

    return (
        <section id="offers" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-orange-500/[0.02] bg-[size:60px_60px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mb-40 border-l-4 border-orange-600 pl-12 relative overflow-hidden text-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-12"
                    >
                        Pricing_Protocols_v1.0
                    </motion.div>
                    <h2 className="text-6xl md:text-[11rem] font-black text-white tracking-tighter mb-16 leading-[0.75] uppercase italic">
                        The <br /><span className="text-zinc-800">Inventory.</span>
                    </h2>
                    <p className="text-2xl md:text-5xl text-zinc-500 font-medium leading-none tracking-tight max-w-5xl">
                        Specialized conversion systems engineered for <span className="text-white italic underline underline-offset-8 decoration-orange-600">Pure_Performance</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                    {displayOffers.map((offer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group h-full flex flex-col p-10 bg-black border transition-all duration-500 relative cursor-crosshair ${offer.highlight
                                ? 'border-orange-600 shadow-2xl shadow-orange-950/20'
                                : 'border-zinc-900 hover:border-zinc-700'
                                }`}
                        >
                            {offer.highlight && (
                                <div className="absolute top-0 right-0 bg-orange-600 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest">
                                    ELITE_PROTOCOL
                                </div>
                            )}

                            <div className={`w-16 h-16 bg-zinc-950 border border-zinc-900 flex items-center justify-center mb-10 transition-all duration-500 group-hover:bg-orange-600 group-hover:text-white ${offer.color || 'text-zinc-600'}`}>
                                {(() => {
                                    const IconComponent =
                                        offer.iconName === 'Zap' ? Zap :
                                            offer.iconName === 'Layers' ? Layers :
                                                offer.iconName === 'RefreshCw' ? RefreshCw :
                                                    BarChart3
                                    return <IconComponent className="w-8 h-8" />
                                })()}
                            </div>

                            <div className="mb-8">
                                <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-zinc-800`}>LAYER_0{index + 1} // {offer.subtitle}</span>
                                <h3 className="text-3xl font-black text-white mt-4 uppercase tracking-tighter italic leading-none group-hover:text-orange-600 transition-colors">{offer.title}</h3>
                            </div>

                            <div className="mb-10 pb-8 border-b border-zinc-900">
                                <span className="text-zinc-700 text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">Base_Capital_Requirement</span>
                                <span className={`text-5xl font-black tracking-tighter italic text-white`}>{offer.price}</span>
                            </div>

                            <p className="text-zinc-500 text-lg font-medium leading-[1.1] tracking-tight mb-10">
                                {offer.description}
                            </p>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {offer.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-800">
                                        <div className="w-2 h-2 bg-zinc-900 group-hover:bg-orange-600 transition-colors" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href={offer.link} className="w-full">
                                <Button
                                    className={`w-full h-20 rounded-none font-black text-sm uppercase tracking-[0.4em] transition-all duration-300 ${offer.highlight
                                        ? 'bg-orange-600 hover:bg-orange-500 text-white'
                                        : 'bg-zinc-950 border border-zinc-900 text-zinc-500 hover:bg-white hover:text-black'
                                        }`}
                                >
                                    {offer.cta}
                                    <ArrowRight className="ml-4 w-6 h-6" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20">
                    <div className="p-12 bg-zinc-950 border border-zinc-900 border-l-4 border-l-orange-600 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                        <p className="text-zinc-500 text-xl font-medium italic">
                            "I'm not sure which path is right for my current stage..."
                        </p>
                        <Link href="/offers/diagnostic">
                            <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black text-xs px-8 h-16 rounded-none uppercase tracking-[0.4em] transition-all duration-300">
                                START_REVENUE_AUDIT_v1
                                <ArrowRight className="ml-4 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
