'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Rocket, TrendingUp, Crown, ArrowRight, Shield, Clock, Award, Star,
    ChevronDown, Check, Sparkles, Users, Gift
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import CountdownTimer from '@/components/campaign/CountdownTimer'

const CAMPAIGN_END = new Date('2026-01-31T23:59:59')

const packages = [
    {
        slug: 'digital-launch-pro',
        name: 'Digital Launch Pro',
        tagline: 'Start 2026 Right',
        icon: Rocket,
        color: 'emerald',
        originalPrice: 12000,
        promoPrice: 4997,
        discount: 58,
        spots: 50,
        target: 'Startups & Entrepreneurs',
        highlights: [
            'Premium 5-Page Website',
            'Technical SEO (3 months)',
            'Google Analytics Setup',
            '3 Months Premium Support',
            'FREE Logo + Social Kit'
        ]
    },
    {
        slug: 'revenue-rocket',
        name: 'Revenue Rocket',
        tagline: 'Scale Your Revenue',
        icon: TrendingUp,
        color: 'blue',
        originalPrice: 24000,
        promoPrice: 8997,
        discount: 62,
        spots: 30,
        target: 'Growing Businesses',
        popular: true,
        highlights: [
            'Custom E-commerce Platform',
            'CRO + SEO (6 months each)',
            'Sales Funnel Design',
            'Email Marketing Automation',
            'Dedicated Success Manager'
        ]
    },
    {
        slug: 'empire-builder',
        name: 'Empire Builder',
        tagline: 'Dominate 2026',
        icon: Crown,
        color: 'violet',
        originalPrice: 75000,
        promoPrice: 24997,
        discount: 67,
        spots: 15,
        target: 'Enterprises',
        highlights: [
            'Website + Mobile App',
            'AI Chatbot Integration',
            '12 Months Marketing',
            '24/7 Priority Support',
            '$12,500+ in FREE Bonuses'
        ]
    }
]

const colorClasses = {
    emerald: {
        gradient: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-500',
        badge: 'bg-emerald-500',
        shadow: 'shadow-emerald-500/25'
    },
    blue: {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-500',
        badge: 'bg-blue-500',
        shadow: 'shadow-blue-500/25'
    },
    violet: {
        gradient: 'from-violet-500 to-violet-600',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/30',
        text: 'text-violet-500',
        badge: 'bg-violet-500',
        shadow: 'shadow-violet-500/25'
    }
}

export default function NewYearHubPage() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            <Navigation />

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />

                    {/* Animated Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full"
                            initial={{
                                x: Math.floor(i * 5) + '%',
                                y: Math.floor((i * 7) % 100) + '%',
                                opacity: 0
                            }}
                            animate={{
                                y: [null, '-100px'],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3 + (i % 3),
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 container mx-auto px-4 py-32">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Urgency Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            NEW YEAR 2026 EXCLUSIVE — FIRST 7 DAYS ONLY
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                        >
                            <span className="text-white">Your 2026 Growth</span>
                            <br />
                            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                                Starts Here
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-8"
                        >
                            Choose your growth path. Save up to <span className="text-white font-semibold">67% off</span> premium digital services.
                            <br />
                            <span className="text-amber-400">Only 95 total spots available</span> across all packages.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-12"
                        >
                            <p className="text-white/50 text-sm mb-4 uppercase tracking-wider">Offer Expires In</p>
                            <CountdownTimer targetDate={CAMPAIGN_END} size="lg" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-500" />
                                30-Day Money-Back Guarantee
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-500" />
                                30+ Years Combined Experience
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-violet-500" />
                                847+ Happy Clients
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10"
                        >
                            <ChevronDown className="w-8 h-8 text-white/30 mx-auto animate-bounce" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* PACKAGES */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Choose Your <span className="text-amber-400">Growth Path</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Three elite packages. One goal: transform your business in 2026.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {packages.map((pkg, i) => {
                            const colors = colorClasses[pkg.color as keyof typeof colorClasses]
                            return (
                                <motion.div
                                    key={pkg.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative bg-white/[0.02] border rounded-3xl p-8 ${pkg.popular ? `border-2 ${colors.border}` : 'border-white/10'} hover:border-white/20 transition-all duration-300`}
                                >
                                    {pkg.popular && (
                                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${colors.badge} text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse shadow-glow`}>
                                            MOST POPULAR
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                            <pkg.icon className={`w-8 h-8 ${colors.text}`} />
                                        </div>
                                        <p className={`${colors.text} text-sm font-medium mb-1`}>{pkg.target}</p>
                                        <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                                        <p className="text-white/50 text-sm">{pkg.tagline}</p>
                                    </div>

                                    <div className="text-center mb-6">
                                        <div className="flex items-center justify-center gap-3 mb-2">
                                            <span className="text-white/40 line-through text-lg">
                                                ${pkg.originalPrice.toLocaleString()}
                                            </span>
                                            <span className={`${colors.badge} text-white px-2 py-0.5 rounded text-xs font-bold`}>
                                                {pkg.discount}% OFF
                                            </span>
                                        </div>
                                        <div className="text-4xl font-bold text-white">
                                            ${pkg.promoPrice.toLocaleString()}
                                        </div>
                                        <p className="text-white/40 text-sm mt-1">
                                            Only {pkg.spots} spots available
                                        </p>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {pkg.highlights.map((item, j) => (
                                            <li key={j} className="flex items-center gap-3 text-white/70 text-sm">
                                                <Check className={`w-4 h-4 ${colors.text} shrink-0`} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={`/newyear/${pkg.slug}`}>
                                        <Button
                                            className={`w-full h-14 text-lg bg-gradient-to-r ${colors.gradient} text-white ${colors.shadow} shadow-lg rounded-xl group`}
                                        >
                                            Claim This Package
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* COMPARISON */}
            <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Not Sure Which Package?
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Here's a quick comparison to help you decide
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-4 text-white/50 font-medium">Feature</th>
                                    <th className="text-center py-4 px-4 text-emerald-400 font-medium">Launch Pro</th>
                                    <th className="text-center py-4 px-4 text-blue-400 font-medium">Revenue Rocket</th>
                                    <th className="text-center py-4 px-4 text-violet-400 font-medium">Empire Builder</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/70">
                                {[
                                    { feature: 'Website Pages', launch: '5', rocket: 'Unlimited', empire: 'Unlimited + App' },
                                    { feature: 'SEO Duration', launch: '3 months', rocket: '6 months', empire: '12 months' },
                                    { feature: 'Marketing', launch: '—', rocket: '6 months', empire: '12 months' },
                                    { feature: 'Support', launch: 'Email', rocket: 'Dedicated Manager', empire: '24/7 Priority' },
                                    { feature: 'AI Chatbot', launch: '—', rocket: '—', empire: '✓' },
                                    { feature: 'Mobile App', launch: '—', rocket: '—', empire: '✓' },
                                    { feature: 'Strategy Sessions', launch: '—', rocket: 'Weekly', empire: 'Monthly + QBR' }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white">{row.feature}</td>
                                        <td className="py-4 px-4 text-center">{row.launch}</td>
                                        <td className="py-4 px-4 text-center">{row.rocket}</td>
                                        <td className="py-4 px-4 text-center">{row.empire}</td>
                                    </tr>
                                ))}
                                <tr className="bg-white/[0.02]">
                                    <td className="py-4 px-4 font-bold text-white">Your Investment</td>
                                    <td className="py-4 px-4 text-center font-bold text-emerald-400">$4,997</td>
                                    <td className="py-4 px-4 text-center font-bold text-blue-400">$8,997</td>
                                    <td className="py-4 px-4 text-center font-bold text-violet-400">$24,997</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-amber-950/20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Don't Let 2026 Be<br />
                            <span className="text-amber-400">Another "Someday"</span>
                        </h2>
                        <p className="text-xl text-white/60 mb-8">
                            95 spots across all packages. When they're gone, prices go back to full rate.
                            This is your chance to start the year with momentum.
                        </p>
                        <CountdownTimer targetDate={CAMPAIGN_END} size="md" className="mb-10" />
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/newyear/digital-launch-pro">
                                <Button size="lg" className="h-14 px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full">
                                    Start with Launch Pro — $4,997
                                </Button>
                            </Link>
                            <Link href="/newyear/empire-builder">
                                <Button size="lg" variant="outline" className="h-14 px-8 border-violet-500/50 text-white hover:bg-violet-500/10 rounded-full">
                                    Go Empire — $24,997
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    )
}
