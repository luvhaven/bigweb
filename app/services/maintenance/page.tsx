'use client'

import { useEffect } from 'react'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import { Shield, Zap, Search, Bot, RefreshCw, BarChart, Lock, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MaintenancePage() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const features = [
        {
            title: "Security & Updates",
            description: "Proactive security monitoring, SSL management, and regular core/plugin updates to keep your site safe.",
            icon: Shield,
            className: "md:col-span-2",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "Performance Optimization",
            description: "Continuous speed tuning, image optimization, and caching strategies for lightning-fast load times.",
            icon: Zap,
            className: "md:col-span-1",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "AI-Driven Growth (GAOI)",
            description: "Optimize your content for Generative AI engines (ChatGPT, Gemini) to capture the future of search.",
            icon: Bot,
            className: "md:col-span-1",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Content Updates",
            description: "Regular content refreshes, blog posting, and image updates to keep your audience engaged.",
            icon: RefreshCw,
            className: "md:col-span-2",
            gradient: "from-orange-500 to-red-500"
        },
        {
            title: "SEO Monitoring",
            description: "Weekly keyword tracking, backlink analysis, and technical SEO audits.",
            icon: Search,
            className: "md:col-span-1",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            title: "24/7 Uptime Monitoring",
            description: "Instant alerts and rapid response if your site ever goes down.",
            icon: Clock,
            className: "md:col-span-1",
            gradient: "from-indigo-500 to-purple-500"
        }
    ]

    const processSteps = [
        {
            number: '01',
            title: "Comprehensive Audit",
            description: "We start with a deep dive into your site's health, security, and performance.",
            tags: ['Security Scan', 'Performance Test', 'SEO Audit', 'Code Review']
        },
        {
            number: '02',
            title: "Optimization & Fixes",
            description: "We implement immediate fixes and performance improvements based on the audit.",
            tags: ['Speed Optimization', 'Security Patches', 'Bug Fixes', 'Updates']
        },
        {
            number: '03',
            title: "Proactive Monitoring",
            description: "Our systems monitor your site 24/7 for security threats and downtime.",
            tags: ['Uptime Monitoring', 'Security Alerts', 'Performance Tracking', 'Backup Management']
        },
        {
            number: '04',
            title: "Monthly Growth Reports",
            description: "Receive detailed reports on traffic, updates, and AI visibility improvements.",
            tags: ['Analytics', 'SEO Progress', 'GAIO Metrics', 'Recommendations']
        }
    ]

    return (
        <main className="min-h-screen bg-background">
            <HeroPremium
                title="Website Maintenance &"
                highlight="AI Optimization"
                description="Don't let your investment decay. We keep your digital presence secure, high-performing, and optimized for the AI era."
                badgeText="Maintenance & Growth"
                themeColor="green"
            />

            <BentoGrid
                title="Comprehensive Care"
                subtitle="Everything you need to sleep soundly at night."
                items={features}
            />

            <ProcessTimeline
                steps={processSteps}
                themeColor="green"
            />

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Ready to <span className="gradient-text">Automate Your Growth?</span>
                    </motion.h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Join 500+ brands who trust us with their digital infrastructure.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-accent/20 transition-all duration-300">
                            Start Your Plan
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
