'use client'

import React from 'react'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import ElitePortfolio from '@/components/ElitePortfolio'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-background">
            <ConversionNavigation />

            <section className="pt-40 pb-20 border-b border-border/50 bg-secondary/10">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Proven Performance</span>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">THE <span className="text-accent">EVIDENCE.</span></h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
                            Real results from the Conversion Lab. We don't measure success by "page views" or "likes"—we measure it by your bottom line.
                        </p>
                    </motion.div>
                </div>
            </section>

            <ElitePortfolio />

            <section className="py-20 text-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 h-14 px-8 text-lg" asChild>
                    <Link href="/offers/diagnostic">
                        Start Your Own Case Study
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </Button>
            </section>

            <Footer />
        </main>
    )
}
