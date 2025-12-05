'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const resources = [
    {
        title: "The Ultimate Guide to SEO in 2025",
        category: "Guide",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
        description: "Everything you need to know to rank #1.",
        link: "/blog/seo-guide-2025"
    },
    {
        title: "Web Design Trends for the Future",
        category: "Trend Report",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        description: "What's next in digital design aesthetics.",
        link: "/blog/design-trends"
    },
    {
        title: "Conversion Rate Optimization Checklist",
        category: "Tool",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        description: "A step-by-step checklist to boost your sales.",
        link: "/resources/cro-checklist"
    }
]

export default function ResourcesPage() {
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
                        Resources & Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Expert knowledge to help you grow your digital presence.
                    </motion.p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {resources.map((resource, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-glow"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={resource.image}
                                        alt={resource.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                                        {resource.category}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                                        {resource.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        {resource.description}
                                    </p>
                                    <Link href={resource.link} className="flex items-center text-accent font-medium group/link">
                                        Read More
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
