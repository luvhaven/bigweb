'use client'

import React from 'react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import ConversionProcess from '@/components/ConversionProcess'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { motion } from 'framer-motion'
import DetailedProcess from '@/components/DetailedProcess'

export default function ProcessPage() {
    return (
        <main className="min-h-screen bg-background">
            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden border-b border-border/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,107,53,0.05),_transparent)]" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-12 inline-block relative"
                    >
                        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                        <span className="relative text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Conversion Methodology</span>
                        <h1 className="relative text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
                            ENGINEERED <br />
                            <span className="text-accent">OUTCOMES.</span>
                        </h1>
                        <p className="relative text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                            We've replaced creative guesswork with a high-fidelity methodology. A repeatable, data-backed system designed to isolate and eliminate revenue bottlenecks.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Detailed Timeline */}
            <DetailedProcess />

            {/* Final CTA */}
            <section className="py-32 bg-secondary/30 relative">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Engineer Your Growth?</h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Don't leave your conversions to chance. Let's apply our proven system to your business.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Button size="lg" className="bg-accent hover:bg-accent/90 h-16 px-10 text-xl font-bold shadow-xl shadow-accent/20" asChild>
                            <Link href="/offers/diagnostic">
                                Start With An Audit
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Link href="/contact" className="text-lg font-semibold hover:text-accent transition-colors flex items-center gap-2">
                            Speak with an Engineer <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
