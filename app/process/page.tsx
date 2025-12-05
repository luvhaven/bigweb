'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ProcessTimeline from '@/components/ProcessTimeline'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ProcessPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                    >
                        How We Work
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        A proven methodology for delivering exceptional results, every time.
                    </motion.p>
                </div>
            </section>

            <section className="px-6">
                <div className="container mx-auto max-w-6xl">
                    <ProcessTimeline />
                </div>
            </section>

            <section className="py-32 px-6 bg-secondary/5 text-center">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-bold mb-8">Ready to start your journey?</h2>
                    <Link href="/contact">
                        <Button size="lg" className="bg-accent hover:bg-accent-dark text-white rounded-full px-12 py-8 text-xl shadow-glow">
                            Start Your Project
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
