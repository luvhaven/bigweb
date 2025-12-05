'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import PricingCalculator from '@/components/PricingCalculator'
import ComparisonTable from '@/components/ComparisonTable'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                    >
                        Transparent Pricing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Choose the perfect plan for your business. No hidden fees, no surprises.
                    </motion.p>
                </div>
            </section>

            {/* Calculator */}
            <section className="py-20 px-6 bg-secondary/5">
                <div className="container mx-auto max-w-6xl">
                    <PricingCalculator />
                </div>
            </section>

            {/* Comparison */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-16">Compare Plans</h2>
                    <ComparisonTable />
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 bg-secondary/5">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Do you require a deposit?", a: "Yes, we typically require a 50% deposit to start the project." },
                            { q: "Can I change my plan later?", a: "Absolutely. You can upgrade or add features at any time." },
                            { q: "What payment methods do you accept?", a: "We accept credit cards, bank transfers, and Stripe." },
                        ].map((faq, i) => (
                            <div key={i} className="bg-card p-6 rounded-xl border border-border">
                                <h3 className="font-bold mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
