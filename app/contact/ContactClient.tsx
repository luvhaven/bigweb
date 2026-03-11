'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import CinematicHero from '@/components/CinematicHero'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'

import { useSearchParams } from 'next/navigation'

function ContactPageContent({ hero }: { hero: any }) {
    const searchParams = useSearchParams()
    const plan = searchParams.get('plan') || ''
    const [selectedStart, setSelectedStart] = React.useState<string | null>(null)

    const startingPoints = [
        { id: 'call', emoji: '📱', title: 'Quick Discovery Call', desc: '30 minutes. Tell us your situation. We tell you what we can do.', time: '30 min' },
        { id: 'strategy', emoji: '🧠', title: 'Strategy Session', desc: 'A deep-dive into your growth stack, competitive landscape, and revenue gaps.', time: '60 min' },
        { id: 'proposal', emoji: '📄', title: 'Full Proposal', desc: 'Share your brief and we produce a comprehensive project proposal within 48 hours.', time: '48hr' },
    ]

    const recentWins = [
        { metric: '+215%', label: 'Demo Requests', client: 'SaaS Platform' },
        { metric: '+48%', label: 'Revenue Growth', client: 'Luxury Retailer' },
        { metric: '3.2×', label: 'Conversion Rate', client: 'FinTech App' },
    ]

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <AdvancedNavigation />

            <CinematicHero
                title={
                    <>
                        <span className="hero-line block">{hero?.title || "Let's start a"}</span>
                        <span className="hero-line block text-zinc-600"><em className="text-accent italic">{hero?.highlight_text || 'conversation.'}</em></span>
                    </>
                }
                subtitle={hero?.description || "Tell us about your project and goals. We'll respond within 24 hours with a clear plan and honest pricing."}
                ctaText={hero?.cta_primary_text || "Scroll to Form"}
                ctaLink={hero?.cta_primary_link || "#contact-form"}
                showSecondaryCta={false}
            />

            {/* Choose Your Starting Point */}
            <section className="py-14 border-b border-white/[0.04]">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">How would you like to start?</span>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {startingPoints.map((sp, i) => (
                            <motion.button
                                key={sp.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                onClick={() => setSelectedStart(sp.id)}
                                className={`text-left p-6 rounded-2xl border transition-all duration-300 group ${selectedStart === sp.id
                                    ? 'border-accent/40 bg-accent/[0.06]'
                                    : 'border-white/[0.04] bg-white/[0.015] hover:border-white/[0.1] hover:bg-white/[0.025]'
                                    }`}
                            >
                                <div className="text-2xl mb-4">{sp.emoji}</div>
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-base font-semibold text-white tracking-tight">{sp.title}</h3>
                                    <span className="text-[10px] font-mono text-zinc-600 border border-white/[0.06] px-2 py-1 rounded-full shrink-0 ml-2">{sp.time}</span>
                                </div>
                                <p className="text-sm text-zinc-500 leading-relaxed">{sp.desc}</p>
                                <div className={`mt-4 h-0.5 rounded-full transition-all duration-500 ${selectedStart === sp.id ? 'bg-accent w-full' : 'bg-white/[0.04] w-0 group-hover:w-full'
                                    }`} />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="pb-32 md:pb-40 relative">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-12 gap-10 max-w-7xl mx-auto mt-14">

                        {/* Info Column */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Availability Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
                            >
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-emerald-400">
                                    Available — Limited project slots
                                </span>
                            </motion.div>

                            {/* Contact Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="p-8 md:p-10 rounded-2xl border border-white/[0.04] bg-white/[0.015]"
                            >
                                <h3 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-8">
                                    Contact Details
                                </h3>

                                <div className="space-y-6">
                                    <div className="group">
                                        <span className="text-[10px] font-mono font-medium text-zinc-600 uppercase tracking-[0.2em] block mb-1.5">Email</span>
                                        <a href="mailto:hello@bigwebdigital.com" className="text-lg text-white hover:text-accent transition-colors font-medium">
                                            hello@bigwebdigital.com
                                        </a>
                                    </div>

                                    <div className="pt-6 border-t border-white/[0.04] grid grid-cols-2 gap-6">
                                        <div>
                                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] block mb-1.5">Location</span>
                                            <p className="text-xs text-zinc-400 font-medium">Global<br />Remote-First</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] block mb-1.5">Response</span>
                                            <p className="text-xs text-zinc-400 font-medium">24-Hour<br />Guaranteed</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Recent Wins */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01]"
                            >
                                <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-5">Recent Client Wins</h4>
                                <div className="space-y-4">
                                    {recentWins.map((win, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="shrink-0">
                                                <div className="text-lg font-bold text-accent tracking-tighter leading-none">{win.metric}</div>
                                                <div className="text-[10px] text-zinc-600">{win.label}</div>
                                            </div>
                                            <div className="border-l border-white/[0.04] pl-3">
                                                <div className="text-xs text-zinc-400">{win.client}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-8"
                        >
                            <div id="contact-form" className="p-10 md:p-14 rounded-2xl bg-white/[0.015] border border-white/[0.04] relative overflow-hidden">
                                <div className="relative z-10">
                                    <ContactForm
                                        type="contact"
                                        title="Tell Us About Your Project"
                                        description="Share your goals, timeline, and budget range. We'll get back to you with a clear plan."
                                        defaultOffer={plan}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default function ContactClient({ hero }: { hero: any }) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ContactPageContent hero={hero} />
        </Suspense>
    )
}
