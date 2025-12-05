'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import VideoTestimonials from '@/components/VideoTestimonials'
import { motion } from 'framer-motion'

export default function TestimonialsPage() {
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
                        Client Success Stories
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Don't just take our word for it. Hear from the leaders we've helped grow.
                    </motion.p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <VideoTestimonials />
                </div>
            </section>

            <Footer />
        </main>
    )
}
