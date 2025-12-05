'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ElitePortfolio from '@/components/ElitePortfolio'
import { motion } from 'framer-motion'

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <section className="pt-32 pb-12 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                    >
                        Our Work
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Explore our portfolio of award-winning digital experiences.
                    </motion.p>
                </div>
            </section>

            <ElitePortfolio />

            <Footer />
        </main>
    )
}
