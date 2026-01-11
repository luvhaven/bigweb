'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import DiagnosticWizard from '@/components/forms/DiagnosticWizard'
import FAQSection from '@/components/FAQSection'

export default function DiagnosticPage() {
    return (
        <main className="min-h-screen bg-background">
            <ConversionNavigation />

            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-8">
                        <span className="animate-pulse w-2 h-2 rounded-full bg-accent" />
                        Limited Availability for Jan 2026
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Stop Guessing Why Your <br />
                        <span className="text-accent">Website Isn't Selling</span>
                    </h1>

                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        For $399, our Conversion Engineers will tear down your funnel, identify your biggest revenue blockers, and give you a prioritized fix list.
                    </p>

                    {/* Replaced static card with Wizard */}
                    <div className="mb-20">
                        <DiagnosticWizard />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-left mt-20">
                        {[
                            { title: "Forensic Analysis", desc: "We don't just look at design. We look at heatmaps, load speeds, and user journey friction." },
                            { title: "Psychological Audit", desc: "Is your copy hitting the right triggers? We analyze your messaging against 50 conversion principles." },
                            { title: "Video Walkthrough", desc: "You get a 10-minute Loom video explaining exactly what to fix and why." }
                        ].map((item, i) => (
                            <div key={i} className="bg-card border border-border p-6 rounded-xl">
                                <CheckCircle2 className="w-8 h-8 text-accent mb-4" />
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection category="diagnostic" title="Diagnostic FAQs" />

            <Footer />
        </main>
    )
}
