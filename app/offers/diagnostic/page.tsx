'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Search, FileText, Target, Video } from 'lucide-react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import DiagnosticWizard from '@/components/forms/DiagnosticWizard'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ConversionDiagnosticPage() {
    return (
        <main className="min-h-screen bg-background">
            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-8 border border-accent/20">
                        <span className="animate-pulse w-2 h-2 rounded-full bg-accent" />
                        The Smart First Step
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                        <span className="text-accent">Conversion Diagnostic</span>
                    </h1>

                    <p className="text-2xl text-muted-foreground font-medium mb-4 max-w-3xl mx-auto">
                        A deep forensic analysis of your website, funnels, and user journey to uncover <strong className="text-foreground">exactly why visitors aren't converting</strong>.
                    </p>

                    <p className="text-lg text-muted-foreground/80 mb-12">
                        <strong className="text-accent">Best for:</strong> Businesses with traffic but low conversions
                    </p>

                    {/* Interactive Wizard */}
                    <div className="mb-20">
                        <DiagnosticWizard />
                    </div>

                    {/* What You Get */}
                    <div className="text-left max-w-4xl mx-auto mb-20">
                        <h2 className="text-3xl font-bold mb-8 text-center">What You Get</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { icon: Search, title: "Conversion Leak Identification", desc: "We pinpoint exactly where users drop off and why" },
                                { icon: Target, title: "UX & Friction Analysis", desc: "Deep review of layout, navigation, and user flow issues" },
                                { icon: FileText, title: "Messaging Clarity Review", desc: "Are you speaking to the right pain points?" },
                                { icon: CheckCircle2, title: "CTA Effectiveness Scoring", desc: "How well do your calls-to-action perform?" },
                                { icon: Video, title: "Mobile vs Desktop Insights", desc: "Performance breakdown across all devices" },
                                { icon: ArrowRight, title: "Prioritized Fix Roadmap", desc: "Clear action steps ranked by impact" },
                            ].map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-card border border-border p-6 rounded-2xl hover:border-accent/40 transition-all"
                                    >
                                        <Icon className="w-8 h-8 text-accent mb-4" />
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Outcome */}
                    <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <CheckCircle2 className="w-8 h-8 text-accent" />
                            <h3 className="text-2xl font-bold">Outcome</h3>
                        </div>
                        <p className="text-xl text-foreground font-medium">
                            👉 Absolute clarity on what's broken and what to fix first.
                        </p>
                    </div>

                    {/* Next Steps */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="#wizard" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-bold">
                                🔍 Get Your Conversion Diagnostic
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/offers/fix-sprint" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
                            Or skip to Fix Sprint →
                        </Link>
                    </div>
                </div>
            </section>

            <FAQSection category="audit" title="Diagnostic FAQs" />

            <Footer />
        </main>
    )
}
