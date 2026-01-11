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
        title: "Conversion Diagnostic",
        price: "$399",
        subtitle: "The Entry Point",
        description: "A deep-dive analysis of your current funnel, messaging, and user experience. We uncover exactly where you are losing money.",
        features: ["Full funnel breakdown", "Conversion blocker identification", "Messaging clarity score", "Prioritized fix list"],
        cta: "Start Your Diagnostic",
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
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        Pricing & Packages
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Choose Your Path to <span className="gradient-text-luxury">Higher Revenue</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        No hidden fees. No endless scopes. Just specialized conversion systems engineered for measurable growth.
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
                            className={`group h-full flex flex-col p-8 rounded-3xl transition-all duration-500 relative ${offer.highlight
                                ? 'bg-gradient-to-br from-card to-accent/5 border-2 border-accent shadow-2xl shadow-accent/10 scale-105 z-10 lg:-translate-y-2'
                                : 'bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5'
                                }`}
                        >
                            {offer.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    Highly Recommended
                                </div>
                            )}

                            <div className={`w-14 h-14 rounded-2xl ${offer.bg || 'bg-accent/10'} ${offer.color || 'text-accent'} flex items-center justify-center mb-8 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                {(() => {
                                    const IconComponent =
                                        offer.iconName === 'Zap' ? Zap :
                                            offer.iconName === 'Layers' ? Layers :
                                                offer.iconName === 'RefreshCw' ? RefreshCw :
                                                    BarChart3
                                    return <IconComponent className="w-7 h-7" />
                                })()}
                            </div>

                            <div className="mb-6">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-60`}>{offer.subtitle}</span>
                                <h3 className="text-2xl font-bold mt-1 group-hover:text-accent transition-colors">{offer.title}</h3>
                            </div>

                            <div className="mb-6 pb-6 border-b border-border/50">
                                <span className="text-sm text-muted-foreground align-top">From </span>
                                <span className={`text-4xl font-black tracking-tighter ${offer.color}`}>{offer.price}</span>
                            </div>

                            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                                {offer.description}
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {offer.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${offer.color} opacity-70`} />
                                        <span className="text-muted-foreground font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full h-12 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 ${offer.highlight
                                    ? 'bg-accent hover:bg-accent-dark text-white shadow-glow hover:scale-[1.02]'
                                    : 'bg-white/5 hover:bg-accent hover:text-white border border-white/10 hover:border-accent'
                                    }`}
                                asChild
                            >
                                <Link href={offer.link} className="flex items-center justify-center gap-2">
                                    {offer.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="p-8 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/50 max-w-2xl mx-auto inline-block">
                        <p className="text-muted-foreground font-medium mb-4 italic">"I'm not sure which path is right for my current stage..."</p>
                        <Link href="/offers/diagnostic" className="inline-flex items-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-accent-dark transition-all hover:scale-105 shadow-lg shadow-accent/20">
                            Take the 2-minute Revenue Diagnostic <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
