'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
    Crown, Check, ArrowRight, Shield, Clock, Zap, Award, Star,
    ChevronDown, Gift, BadgeCheck, Users, Rocket, Sparkles,
    Globe, Smartphone, Bot, LineChart, Search, Palette, Target,
    Headphones, Calendar, LayoutDashboard, Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import CountdownTimer from '@/components/campaign/CountdownTimer'
import LiveViewerCounter from '@/components/campaign/LiveViewerCounter'
import PackageLeadForm from '@/components/campaign/PackageLeadForm'

const CAMPAIGN_END = new Date('2026-01-07T23:59:59')

const features = [
    { icon: Globe, title: 'Premium Website + Mobile App', description: 'Full-stack development with native iOS/Android apps', value: '$25,000' },
    { icon: Bot, title: 'AI Chatbot Integration', description: 'Custom trained on your business data', value: '$8,000' },
    { icon: Target, title: 'Complete Digital Marketing', description: '12 months of multi-channel campaigns', value: '$18,000' },
    { icon: Search, title: 'Technical SEO + Content Strategy', description: '12 months of aggressive growth', value: '$12,000' },
    { icon: LineChart, title: 'Conversion Optimization', description: 'Continuous testing and improvement', value: '$8,000' },
    { icon: Palette, title: 'UI/UX Design Overhaul', description: 'Premium redesign of your digital presence', value: '$6,000' },
    { icon: Calendar, title: 'Monthly Strategy Sessions', description: 'C-level strategy consultations', value: '$6,000' },
    { icon: Headphones, title: 'Priority Support 24/7', description: 'Dedicated team at your service', value: '$4,000' },
    { icon: LayoutDashboard, title: 'Quarterly Business Reviews', description: 'Performance analysis and roadmapping', value: '$3,000' }
]

const bonuses = [
    { title: 'FREE Brand Strategy', value: '$5,000', description: 'Complete brand positioning' },
    { title: 'FREE Video Production', value: '$3,000', description: '2 professional promo videos' },
    { title: 'FREE CRM Integration', value: '$2,500', description: 'Seamless system integration' },
    { title: 'FREE Team Training', value: '$2,000', description: 'Full team onboarding program' }
]

const faqs = [
    { q: "Is this really worth $75,000?", a: "Absolutely. Each component is priced at our standard rates. This package represents a one-time opportunity to get enterprise-level digital transformation at startup prices." },
    { q: "How long is the engagement?", a: "The Empire Builder package includes 12 months of marketing, support, and optimization. Initial build typically takes 8-12 weeks." },
    { q: "Can we customize the package?", a: "Yes. While the core package is fixed, we can discuss additions or modifications during our discovery call." },
    { q: "Do you work with international companies?", a: "Absolutely! We have clients across North America, Europe, UK, Australia, and the Middle East. Time zones are never an issue." }
]

export default function EmpireBuilderPage() {
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
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium mb-8"
                        >
                            <Crown className="w-4 h-4" />
                            ENTERPRISE TIER — ONLY 15 SPOTS AVAILABLE
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                        >
                            <span className="text-white">Build Your Digital</span>
                            <br />
                            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-violet-400 bg-clip-text text-transparent">
                                Empire in 2026
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-8"
                        >
                            The complete digital transformation for established businesses ready to dominate.
                            Premium website, mobile app, AI chatbot, and 12 months of white-glove service —
                            <span className="text-white font-semibold"> 67% off</span>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-6 mb-8"
                        >
                            <div className="text-white/40 line-through text-2xl md:text-3xl">$75,000</div>
                            <div className="text-5xl md:text-7xl font-bold text-white">$24,997</div>
                            <div className="bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-bold">SAVE 67%</div>
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
                            <Button size="lg" onClick={scrollToCTA} className="h-16 px-10 text-lg bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-lg shadow-violet-500/25 rounded-full group">
                                Claim My Empire <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="h-16 px-10 text-lg border-white/20 text-white hover:bg-white/5 rounded-full">
                                See What's Included <ChevronDown className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
                            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-violet-500" />30-Day Money-Back Guarantee</div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-violet-500" />12-Month Engagement</div>
                            <div className="flex items-center gap-2"><Award className="w-4 h-4 text-violet-500" />30+ Years Combined Experience</div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10 flex justify-center">
                            <LiveViewerCounter packageSlug="empire-builder" baseCount={8} />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* STATS */}
            <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '47', label: 'Enterprise Clients', icon: Briefcase },
                            { value: '$87M+', label: 'Client Revenue', icon: LineChart },
                            { value: '100%', label: 'On-Time Delivery', icon: Clock },
                            { value: '4.9★', label: 'Client Rating', icon: Star }
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="space-y-2">
                                <stat.icon className="w-8 h-8 text-violet-500 mx-auto mb-3" />
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
                            Everything You Need to <span className="text-violet-400">Dominate 2026</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">A $90,000+ value — yours for just $24,997</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {features.map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center">
                                            <feature.icon className="w-6 h-6 text-violet-500" />
                                        </div>
                                        <span className="text-violet-400 font-semibold text-sm">{feature.value}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/50 text-sm">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-violet-500/10 border border-violet-500/20 rounded-2xl p-8">
                        <p className="text-white/60 mb-2">Total Package Value</p>
                        <p className="text-4xl md:text-5xl font-bold text-white line-through opacity-50 mb-2">$90,000</p>
                        <p className="text-xl text-white/80">Your New Year Price: <span className="text-violet-400 font-bold text-3xl">$24,997</span></p>
                    </motion.div>
                </div>
            </section>

            {/* BONUSES */}
            <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-violet-950/20">
                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-6">
                            <Gift className="w-4 h-4" /> EXCLUSIVE EMPIRE BONUSES
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Plus These <span className="text-yellow-400">FREE Bonuses</span></h2>
                        <p className="text-xl text-white/60">Worth $12,500+ — included at no extra cost</p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {bonuses.map((bonus, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-6 text-center">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">FREE</div>
                                <Gift className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-1">{bonus.title}</h3>
                                <p className="text-yellow-400 font-bold mb-2">{bonus.value}</p>
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
                        <div className="w-24 h-24 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Shield className="w-12 h-12 text-violet-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">100% Risk-Free Guarantee</h2>
                        <p className="text-xl text-white/60">
                            We're so confident in our ability to transform your business that we offer a
                            <span className="text-white font-semibold"> 30-day money-back guarantee</span>.
                            If you're not 100% satisfied with the direction of your project within the first 30 days, we'll refund everything.
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
            <section id="claim-section" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-violet-950/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                <span className="text-violet-400">Dominate Your Market</span> in 2026
                            </h2>
                            <p className="text-xl text-white/60 mb-6">Only 15 Empire Builder packages at this price. Don't miss out.</p>
                            <CountdownTimer targetDate={CAMPAIGN_END} size="md" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Crown className="w-8 h-8 text-violet-500" />
                                        <h3 className="text-2xl font-bold text-white">Empire Builder</h3>
                                    </div>
                                    <ul className="space-y-2 mb-8 max-h-80 overflow-y-auto pr-2">
                                        {features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                                                <Check className="w-4 h-4 text-violet-500 shrink-0" />
                                                {f.title}
                                            </li>
                                        ))}
                                        {bonuses.map((b, i) => (
                                            <li key={i} className="flex items-center gap-3 text-yellow-400/80 text-sm">
                                                <Gift className="w-4 h-4 text-yellow-500 shrink-0" />
                                                {b.title} (FREE)
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t border-white/10 pt-6">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className="text-white/50 line-through text-xl">$75,000</span>
                                            <span className="bg-violet-500 text-white px-2 py-0.5 rounded text-sm font-bold">67% OFF</span>
                                        </div>
                                        <div className="text-4xl font-bold text-white">$24,997</div>
                                        <p className="text-white/50 text-sm mt-2">One-time payment. 12-month engagement.</p>
                                    </div>
                                </div>
                                <div>
                                    <PackageLeadForm packageSlug="empire-builder" packageName="Empire Builder" themeColor="violet" />
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
