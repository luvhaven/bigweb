'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Layers, Rocket, Shield, Zap, Code, Palette, ArrowRight, TrendingUp } from 'lucide-react'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RevenueSystemPage() {
    const features = [
        { icon: Code, title: "Modern Architecture", desc: "Lightning-fast, SEO-optimized, scalable foundation" },
        { icon: Palette, title: "Conversion-First Design", desc: "Every pixel engineered for psychology, not just aesthetics" },
        { icon: Zap, title: "Performance Optimization", desc: "Sub-2-second load times, perfect Lighthouse scores" },
        { icon: Shield, title: "Custom CMS", desc: "Enterprise-grade content management you can actually use" },
        { icon: TrendingUp, title: "Analytics Integration", desc: "Track every interaction, optimize every funnel" },
        { icon: Rocket, title: "Deployment & Training", desc: "We launch it and teach you how to maintain it" }
    ]

    const phases = [
        {
            phase: "Phase 1",
            title: "Discovery & Strategy",
            duration: "Week 1",
            items: [
                "Competitor analysis & market positioning",
                "User persona development",
                "Conversion funnel mapping",
                "Content strategy & messaging framework"
            ]
        },
        {
            phase: "Phase 2",
            title: "Design & Architecture",
            duration: "Week 2-3",
            items: [
                "Wireframes & user flow diagrams",
                "High-fidelity UI design",
                "Technical architecture planning",
                "Database schema design"
            ]
        },
        {
            phase: "Phase 3",
            title: "Development",
            duration: "Week 4-6",
            items: [
                "Frontend development",
                "Backend & database setup",
                "CMS integration",
                "Performance optimization"
            ]
        },
        {
            phase: "Phase 4",
            title: "Testing & Launch",
            duration: "Week 7-8",
            items: [
                "QA testing across devices",
                "Speed & SEO optimization",
                "Analytics setup",
                "Deployment & handoff training"
            ]
        }
    ]

    return (
        <main className="min-h-screen bg-background">
            <ConversionNavigation />

            {/* Hero */}
            <section className="pt-24 pb-12 md:pt-28 md:pb-16 relative overflow-hidden min-h-[85vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-accent/10 pointer-events-none" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-bold mb-6 border border-orange-500/20">
                            <Layers className="w-4 h-4" />
                            Enterprise-Grade Solution
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            A Website That Doesn't Just Look Good—<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-accent">
                                It Prints Money
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
                            Most websites are built by designers who care about awards.
                            We build revenue systems engineered by conversion specialists who care about your bottom line.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="#pricing">
                                <Button size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-gradient-to-r from-orange-600 to-accent hover:opacity-90 shadow-xl shadow-orange-500/20">
                                    Start Your Project
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/case-studies">
                                <Button size="lg" variant="outline" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg border-white/10">
                                    View Case Studies
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-24 bg-card">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                What You Get
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                A complete, conversion-optimized website built on modern technology
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 rounded-xl border-white/10 hover:border-orange-500/30 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                                        <feature.icon className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">The 8-Week Build Process</h2>
                            <p className="text-xl text-muted-foreground">
                                Structured, transparent, and designed for results
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {phases.map((phase, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="glass-card p-8 rounded-2xl border-white/10"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-sm text-orange-400 font-bold mb-1">{phase.phase}</p>
                                            <h3 className="text-2xl font-bold">{phase.title}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">{phase.duration}</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {phase.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Get - Results Focused */}
            <section className="py-24 bg-card">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Built for Results, Not Awards
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            We leverage the same high-performance architecture trusted by global leaders like Vercel and Netflix.
                            Our engineering team handles the technical complexity to ensure your system is untouchable, while you focus on the only metric that matters: scaling revenue.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8 text-left">
                            <div className="glass-card p-6 rounded-xl border-white/10">
                                <div className="text-4xl font-bold text-orange-400 mb-2">&lt;2s</div>
                                <h3 className="font-bold mb-2">Lightning Fast</h3>
                                <p className="text-sm text-muted-foreground">
                                    Sub-2-second load times. Every second faster = 7% more conversions.
                                </p>
                            </div>
                            <div className="glass-card p-6 rounded-xl border-white/10">
                                <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
                                <h3 className="font-bold mb-2">Mobile Perfect</h3>
                                <p className="text-sm text-muted-foreground">
                                    Flawless on every device. 60% of your traffic deserves a perfect experience.
                                </p>
                            </div>
                            <div className="glass-card p-6 rounded-xl border-white/10">
                                <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
                                <h3 className="font-bold mb-2">Always Selling</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your website works while you sleep. No downtime, no maintenance headaches.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="glass-card rounded-2xl p-8 md:p-12 border-orange-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-accent/20 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2">Revenue Website System</h3>
                                        <p className="text-muted-foreground">Complete website rebuild</p>
                                    </div>
                                    <div className="text-left md:text-right mt-4 md:mt-0">
                                        <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                                        <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-accent bg-clip-text text-transparent">
                                            $3,000
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">8-week delivery</p>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-8">
                                    <h4 className="font-bold mb-4 text-lg">Ready to Build Your Revenue Engine?</h4>
                                    <p className="text-muted-foreground mb-6">
                                        Tell us about your business and we'll send you a detailed proposal with timeline and pricing.
                                    </p>

                                    <ContactForm
                                        type="revenue_system"
                                        title="Request a Proposal"
                                        description="Share your vision and we'll create a custom plan for your business."
                                        defaultOffer="revenue-system"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection category="services" title="Revenue System FAQs" />

            {/* Final CTA */}
            <section className="py-24 bg-gradient-to-br from-orange-600 to-accent text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Your Competitors Are Optimizing. Are You?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Every month you wait is market share lost. Let's build your revenue engine.
                    </p>
                    <Link href="#pricing">
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg bg-white text-orange-600 hover:bg-white/90">
                            Get Your Proposal
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
