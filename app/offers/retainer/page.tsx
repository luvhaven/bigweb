'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, RefreshCw, TrendingUp, Target, BarChart3, Zap, Users, Calendar, ArrowRight, Star } from 'lucide-react'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RetainerPage() {
    const tiers = [
        {
            name: "Growth",
            price: "$500",
            period: "/month",
            description: "For startups ready to scale",
            features: [
                "2 A/B tests per month",
                "Monthly performance report",
                "Heatmap analysis",
                "Copy optimization",
                "Email support"
            ],
            cta: "Start Growing",
            popular: false
        },
        {
            name: "Scale",
            price: "$1,000",
            period: "/month",
            description: "For businesses scaling fast",
            features: [
                "4 A/B tests per month",
                "Bi-weekly strategy calls",
                "Advanced analytics setup",
                "Landing page optimization",
                "Priority support",
                "Conversion funnel audits"
            ],
            cta: "Scale Faster",
            popular: true
        },
        {
            name: "Enterprise",
            price: "$2,000",
            period: "/month",
            description: "For serious revenue growth",
            features: [
                "Unlimited A/B tests",
                "Weekly strategy sessions",
                "Dedicated CRO specialist",
                "Full-funnel optimization",
                "Custom development",
                "24/7 priority support",
                "Quarterly growth planning"
            ],
            cta: "Go Enterprise",
            popular: false
        }
    ]

    const services = [
        { icon: BarChart3, title: "A/B Testing", desc: "Continuous experimentation to find what converts best" },
        { icon: Target, title: "Funnel Optimization", desc: "Identify and fix leaks in your conversion funnel" },
        { icon: Zap, title: "Speed Optimization", desc: "Keep your site lightning-fast as you grow" },
        { icon: TrendingUp, title: "Analytics & Reporting", desc: "Monthly insights on what's working and what's not" },
        { icon: Users, title: "User Research", desc: "Heatmaps, session recordings, and user feedback" },
        { icon: Calendar, title: "Strategy Sessions", desc: "Regular calls to plan and prioritize improvements" }
    ]

    const results = [
        { metric: "+127%", label: "Avg. Conversion Lift", desc: "After 6 months" },
        { metric: "3.2x", label: "ROI Multiple", desc: "Revenue vs. retainer cost" },
        { metric: "24", label: "Tests Per Quarter", desc: "On average (Scale tier)" }
    ]

    return (
        <main className="min-h-screen bg-background">
            <ConversionNavigation />

            {/* Hero */}
            <section className="pt-24 pb-12 md:pt-28 md:pb-16 relative overflow-hidden min-h-[85vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-accent/10 pointer-events-none" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-bold mb-6 border border-green-500/20">
                            <RefreshCw className="w-4 h-4" />
                            Continuous Optimization
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            Your In-House <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-accent">
                                Conversion Team
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
                            Most businesses optimize once and forget. Winners optimize continuously.
                            We become your dedicated CRO team, constantly testing, refining, and growing your revenue.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="#pricing">
                                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-green-600 to-accent hover:opacity-90 shadow-xl shadow-green-500/20">
                                    See Pricing
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/case-studies">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10">
                                    View Results
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-24 bg-card">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Real Results from Real Clients
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                These are average metrics from our retainer clients after 6 months
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {results.map((result, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-8 rounded-2xl border-white/10 text-center"
                                >
                                    <p className="text-5xl font-bold text-green-400 mb-2">{result.metric}</p>
                                    <p className="text-xl font-semibold mb-1">{result.label}</p>
                                    <p className="text-sm text-muted-foreground">{result.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                What We Do Every Month
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                A full-service CRO team for a fraction of the cost of hiring
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 rounded-xl border-white/10 hover:border-green-500/30 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                                        <service.icon className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-muted-foreground">{service.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section id="pricing" className="py-24 bg-card">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Choose Your Growth Plan</h2>
                            <p className="text-xl text-muted-foreground">
                                All plans include month-to-month flexibility. Cancel anytime.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {tiers.map((tier, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`glass-card rounded-2xl p-8 relative ${tier.popular
                                        ? 'border-green-500/50 ring-2 ring-green-500/20'
                                        : 'border-white/10'
                                        }`}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <div className="px-4 py-1 rounded-full bg-gradient-to-r from-green-600 to-accent text-white text-sm font-bold flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold">{tier.price}</span>
                                            <span className="text-muted-foreground">{tier.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-8">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="#contact" className="block">
                                        <Button
                                            className={`w-full h-12 ${tier.popular
                                                ? 'bg-gradient-to-r from-green-600 to-accent hover:opacity-90'
                                                : 'bg-secondary hover:bg-secondary/80'
                                                }`}
                                        >
                                            {tier.cta}
                                        </Button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-center text-muted-foreground mt-12">
                            All plans are month-to-month. No long-term contracts. Cancel anytime.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Ready to Start Optimizing?
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                Tell us about your business and we'll recommend the best plan for you.
                            </p>
                        </div>

                        <ContactForm
                            type="retainer"
                            title="Get Started"
                            description="Share your goals and current traffic, and we'll create a custom optimization plan."
                            defaultOffer="retainer"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection category="services" title="Retainer FAQs" />

            {/* Final CTA */}
            <section className="py-24 bg-gradient-to-br from-green-600 to-accent text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Stop Guessing. Start Growing.
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Join the businesses that optimize continuously and leave their competitors behind.
                    </p>
                    <Link href="#contact">
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg bg-white text-green-600 hover:bg-white/90">
                            Start Your Retainer
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
