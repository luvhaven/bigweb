'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Clock, Target, ArrowRight } from 'lucide-react'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FixSprintPage() {
    const features = [
        "1-3 Critical Pages Optimized",
        "Headline & Copy Rewrites",
        "CTA Design & Placement",
        "Mobile Responsive Fixes",
        "Speed Optimization",
        "Conversion Tracking Setup"
    ]

    const process = [
        { step: "Day 1", title: "Diagnostic Review", desc: "We analyze your existing diagnostic or run a quick audit" },
        { step: "Day 2-3", title: "Priority Fixes", desc: "We tackle the highest-impact changes first" },
        { step: "Day 4-5", title: "Implementation", desc: "Changes go live with your approval" },
        { step: "Day 6-7", title: "Testing & Handoff", desc: "QA, mobile testing, and documentation" }
    ]

    return (
        <main className="min-h-screen bg-background">
            <ConversionNavigation />

            {/* Hero */}
            <section className="pt-24 pb-12 md:pt-28 md:pb-16 relative overflow-hidden min-h-[85vh] flex items-center">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
                            <Zap className="w-4 h-4" />
                            1-Week Turnaround
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            Fix The Critical 20% <br />
                            <span className="text-accent">That Drives 80% of Results</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
                            You don't need a full rebuild. You need surgical precision on the pages and elements
                            that are bleeding revenue. We fix them in 7 days.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="#pricing">
                                <Button size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-accent-dark shadow-xl shadow-accent/20">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/offers/diagnostic">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10">
                                    Start with Diagnostic
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
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">What We Fix in 7 Days</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                We don't waste time on vanity metrics. We focus on the friction points
                                that are costing you money right now.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 rounded-xl border-white/10"
                                >
                                    <CheckCircle2 className="w-8 h-8 text-accent mb-4" />
                                    <h3 className="text-lg font-bold">{feature}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">The 7-Day Sprint</h2>
                            <p className="text-xl text-muted-foreground">
                                Fast execution without cutting corners
                            </p>
                        </div>

                        <div className="space-y-8">
                            {process.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex gap-6 items-start"
                                >
                                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                                        <span className="text-accent font-bold">{item.step}</span>
                                    </div>
                                    <div className="flex-1 pt-4">
                                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground text-lg">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 bg-card">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="glass-card rounded-2xl p-8 md:p-12 border-accent/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2">Conversion Fix Sprint</h3>
                                        <p className="text-muted-foreground">1-week rapid execution</p>
                                    </div>
                                    <div className="text-left md:text-right mt-4 md:mt-0">
                                        <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                                        <p className="text-5xl font-bold text-accent">$1,000</p>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-8">
                                    <h4 className="font-bold mb-4 text-lg">Ready to Fix Your Funnel?</h4>
                                    <p className="text-muted-foreground mb-6">
                                        Fill out the form below and we'll send you a custom quote based on your needs.
                                    </p>

                                    <ContactForm
                                        type="fix_sprint"
                                        title="Request a Quote"
                                        description="Tell us about your website and what you're trying to achieve."
                                        defaultOffer="fix-sprint"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection category="services" title="Fix Sprint FAQs" />

            {/* Final CTA */}
            <section className="py-24 bg-accent text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Stop Losing Money to Conversion Friction
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Every day you wait is revenue left on the table. Let's fix it this week.
                    </p>
                    <Link href="#pricing">
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg bg-white text-accent hover:bg-white/90">
                            Get Your Quote
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
