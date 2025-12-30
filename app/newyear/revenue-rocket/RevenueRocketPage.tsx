'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    TrendingUp, Check, ArrowRight, Shield, Clock, Zap, Award, Star,
    ChevronDown, Gift, BadgeCheck, Users, Rocket, Sparkles,
    ShoppingCart, Target, Mail, BarChart3, LineChart, UserCheck,
    DollarSign, Percent
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import CountdownTimer from '@/components/campaign/CountdownTimer'
import LiveViewerCounter from '@/components/campaign/LiveViewerCounter'
import PackageLeadForm from '@/components/campaign/PackageLeadForm'

const CAMPAIGN_END = new Date('2026-01-07T23:59:59')

const features = [
    { icon: ShoppingCart, title: 'Custom E-commerce Platform', description: 'Shopify, WooCommerce, or fully custom', value: '$8,000' },
    { icon: Target, title: 'Conversion Rate Optimization', description: '6 months of CRO with A/B testing', value: '$6,000' },
    { icon: LineChart, title: 'SEO Marketing Campaign', description: '6 months content & link building', value: '$4,500' },
    { icon: TrendingUp, title: 'Sales Funnel Design', description: 'Complete funnel with automation', value: '$3,000' },
    { icon: Mail, title: 'Email Marketing Automation', description: 'Sequences, segments, campaigns', value: '$2,000' },
    { icon: BarChart3, title: 'Advanced Analytics Dashboard', description: 'Custom reporting dashboard', value: '$1,500' },
    { icon: UserCheck, title: 'Dedicated Success Manager', description: 'Weekly calls and strategy sessions', value: '$3,000' }
]

const bonuses = [
    { title: 'FREE Competitor Analysis', value: '$1,500', description: 'Deep-dive into your market' },
    { title: 'FREE Ad Creative Pack', value: '$1,000', description: '10 ad designs per platform' },
    { title: 'FREE Retargeting Setup', value: '$800', description: 'Facebook & Google pixels' }
]

const faqs = [
    { q: "What e-commerce platform do you recommend?", a: "It depends on your needs. For most businesses, Shopify is ideal. For complex customizations, WooCommerce or a custom solution works better. We'll recommend the best fit during our discovery call." },
    { q: "How soon will I see ROI?", a: "Most clients see measurable improvements within 60-90 days. Our CRO work typically generates 15-30% conversion improvements in the first quarter." },
    { q: "Do you work with existing stores?", a: "Absolutely! We can optimize your existing store or migrate to a better platform if needed." },
    { q: "What if I don't have traffic yet?", a: "Our SEO and marketing campaigns are designed to drive qualified traffic. We build the infrastructure and the audience simultaneously." }
]

export default function RevenueRocketPage() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

    const scrollToCTA = () => {
        document.getElementById('claim-section')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <Navigation />

            {/* HERO */}
            <motion.section
                ref={heroRef}
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
            >
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-32">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            ONLY 30 SPOTS — ENDS JANUARY 7, 2026
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                        >
                            <span className="text-white">Turn Your Traffic Into a</span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                Revenue Machine
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-8"
                        >
                            Complete e-commerce + marketing solution for growing businesses.
                            6 months of dedicated CRO, SEO, and your own success manager — for
                            <span className="text-white font-semibold"> 62% less</span>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-6 mb-8"
                        >
                            <div className="text-white/40 line-through text-2xl md:text-3xl">$24,000</div>
                            <div className="text-5xl md:text-7xl font-bold text-white">$8,997</div>
                            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">SAVE 62%</div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-10">
                            <p className="text-white/50 text-sm mb-4 uppercase tracking-wider">Offer Expires In</p>
                            <CountdownTimer targetDate={CAMPAIGN_END} size="lg" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
                        >
                            <Button size="lg" onClick={scrollToCTA} className="h-16 px-10 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 rounded-full group">
                                Claim My Spot Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white/5 rounded-full">
                                See What's Included <ChevronDown className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
                            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" />30-Day Money-Back Guarantee</div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500" />6-8 Week Setup</div>
                            <div className="flex items-center gap-2"><Award className="w-4 h-4 text-blue-500" />30+ Years Combined Experience</div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10 flex justify-center">
                            <LiveViewerCounter packageSlug="revenue-rocket" baseCount={23} />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* STATS */}
            <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '$4.2M+', label: 'Revenue Generated', icon: DollarSign },
                            { value: '312%', label: 'Average ROI', icon: Percent },
                            { value: '156+', label: 'E-commerce Stores', icon: ShoppingCart },
                            { value: '98%', label: 'Client Retention', icon: Star }
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="space-y-2">
                                <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                                <div className="text-white/50 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Everything You Need to <span className="text-blue-400">Scale Revenue</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            A $28,000+ value — yours for just $8,997
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {features.map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                            <feature.icon className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <span className="text-blue-400 font-semibold text-sm">{feature.value}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/50 text-sm">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 border border-blue-500/20 rounded-2xl p-8">
                        <p className="text-white/60 mb-2">Total Package Value</p>
                        <p className="text-4xl md:text-5xl font-bold text-white line-through opacity-50 mb-2">$28,000</p>
                        <p className="text-xl text-white/80">Your New Year Price: <span className="text-blue-400 font-bold text-3xl">$8,997</span></p>
                    </motion.div>
                </div>
            </section>

            {/* BONUSES */}
            <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-blue-950/20">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-6">
                            <Gift className="w-4 h-4" /> EXCLUSIVE NEW YEAR BONUSES
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Plus These <span className="text-yellow-400">FREE Bonuses</span></h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {bonuses.map((bonus, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-6 text-center">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">FREE</div>
                                <Gift className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-1">{bonus.title}</h3>
                                <p className="text-yellow-400 font-bold mb-2">{bonus.value} Value</p>
                                <p className="text-white/50 text-sm">{bonus.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GUARANTEE */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
                        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Shield className="w-12 h-12 text-blue-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">100% Risk-Free Guarantee</h2>
                        <p className="text-xl text-white/60 mb-8">
                            We stand behind our work with a <span className="text-white font-semibold">30-day money-back guarantee</span>.
                            If you're not completely satisfied within the first 30 days, we'll refund your investment in full.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border border-white/10 rounded-xl overflow-hidden">
                                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors">
                                    <span className="text-white font-medium pr-4">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedFaq === i && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-6 pb-6 text-white/60">
                                        {faq.a}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section id="claim-section" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-blue-950/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                <span className="text-blue-400">2026 is Your Year</span> to Scale
                            </h2>
                            <p className="text-xl text-white/60 mb-6">Lock in your spot now. Only 30 packages available at this price.</p>
                            <CountdownTimer targetDate={CAMPAIGN_END} size="md" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">Revenue Rocket</h3>
                                    <ul className="space-y-3 mb-8">
                                        {features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white/70">
                                                <Check className="w-5 h-5 text-blue-500 shrink-0" />
                                                {f.title}
                                            </li>
                                        ))}
                                        {bonuses.map((b, i) => (
                                            <li key={i} className="flex items-center gap-3 text-yellow-400/80">
                                                <Gift className="w-5 h-5 text-yellow-500 shrink-0" />
                                                {b.title} (FREE)
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t border-white/10 pt-6">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-white/50 line-through text-xl">$24,000</span>
                                            <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-sm font-bold">62% OFF</span>
                                        </div>
                                        <div className="text-4xl font-bold text-white">$8,997</div>
                                        <p className="text-white/50 text-sm mt-2">One-time payment. No hidden fees.</p>
                                    </div>
                                </div>
                                <div>
                                    <PackageLeadForm packageSlug="revenue-rocket" packageName="Revenue Rocket" themeColor="blue" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
