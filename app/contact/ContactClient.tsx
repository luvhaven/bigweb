'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
import PremiumHero from '@/components/effects/PremiumHero'
import {
    Mail, MapPin, Clock, ArrowUpRight, CheckCircle,
    Star, Shield, Users
} from 'lucide-react'

/* ── Trust items ── */
const TRUST = [
    { icon: Clock, label: '24-hour response', sub: 'Guaranteed. Every inquiry.' },
    { icon: Shield, label: 'NDA on day one', sub: 'Your IP protected immediately.' },
    { icon: Users, label: 'Senior team direct', sub: 'No account managers.' },
    { icon: Star, label: '98% retention rate', sub: 'Clients stay long-term.' },
]

const WINS = [
    { metric: '+347%', label: 'Conversion lift', client: 'SaaS Platform — Series A' },
    { metric: '21×', label: 'ROI in Q1', client: 'E-Commerce Brand' },
    { metric: '6.8×', label: 'ROAS growth', client: 'D2C Consumer Brand' },
]

/* ── Inner page content (needs useSearchParams inside Suspense) ── */
function ContactPageContent({ hero }: { hero: any }) {
    const searchParams = useSearchParams()
    const defaultPackage = searchParams.get('plan') || ''

    return (
        <main className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
            <AdvancedNavigation />

            {/* ── HERO ─────────────────────────────────────── */}
            <PremiumHero
                eyebrow="Currently Accepting New Clients"
                headline="Let's build"
                headlineAccent="something real."
                subheadline="Tell us about your situation. We review every inquiry personally and respond within 24 hours with a clear, honest perspective — and what it costs."
            >
                {/* Trust + stats inline in hero */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Trust grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                        {TRUST.map((t, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm">
                                <t.icon className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-white text-[13px] font-semibold leading-none mb-0.5">{t.label}</div>
                                    <div className="text-zinc-600 text-[11px] leading-snug">{t.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Outcomes panel */}
                    <div className="hidden lg:block p-6 rounded-2xl bg-[#060606]/80 border border-white/[0.06] backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-4">Recent Results</div>
                        <div className="space-y-3">
                            {WINS.map((w, i) => (
                                <div key={i} className="flex items-center justify-between pb-3 border-b border-white/[0.04] last:pb-0 last:border-0">
                                    <div>
                                        <div className="text-xl font-display font-black text-white tracking-tighter">{w.metric}</div>
                                        <div className="text-zinc-500 text-xs">{w.label}</div>
                                    </div>
                                    <div className="text-zinc-700 text-[11px] font-mono text-right">{w.client}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/[0.04]">
                            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold hover:gap-2.5 transition-all duration-300">
                                View all case studies <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </PremiumHero>

            {/* ── FORM SECTION ─────────────────────────────────────────── */}
            <section id="contact-form" className="py-20 md:py-32">
                <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Left sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="lg:col-span-4 space-y-6"
                        >
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-5">How it works</div>
                                <div className="space-y-5">
                                    {[
                                        { n: '01', t: 'Select your package', d: 'Tell us what you\'re looking to do — or choose General Inquiry if you\'re not sure.' },
                                        { n: '02', t: 'Share your brief', d: 'Goals, timeline, budget. Takes less than 3 minutes.' },
                                        { n: '03', t: 'We respond in 24h', d: 'A senior team member reviews and responds personally.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-7 h-7 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-[9px] font-mono text-zinc-600">{item.n}</span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-white mb-0.5">{item.t}</div>
                                                <div className="text-zinc-600 text-xs leading-relaxed">{item.d}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-white/[0.04]" />

                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-4">Our guarantees</div>
                                <div className="space-y-2.5">
                                    {[
                                        'Response within 24 hours, always',
                                        'No sales pressure. Ever.',
                                        'If we\'re not the right fit, we\'ll say so',
                                        'Your information is never shared or sold',
                                        'NDA signed at the start of every engagement',
                                    ].map((g, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span className="text-zinc-500 text-xs leading-relaxed">{g}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-white/[0.04]" />

                            <div className="p-5 rounded-2xl bg-[#060606] border border-white/[0.04]">
                                <div className="text-sm font-semibold text-white mb-2">Not sure which package?</div>
                                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                                    Select General Inquiry and describe your situation — we&apos;ll recommend the right engagement.
                                </p>
                                <Link href="/offers/revenue-roadmap" className="inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-widest hover:gap-2.5 transition-all duration-300">
                                    Or start with a Roadmap <ArrowUpRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right: form panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-8"
                        >
                            <div id="form-panel" className="relative rounded-[2rem] border border-white/[0.06] bg-[#060606] p-8 md:p-12 overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />
                                <div className="relative z-10">
                                    <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tighter italic mb-1.5">
                                        Start the conversation.
                                    </h2>
                                    <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                                        Select the package you&apos;re interested in, then tell us about your project.
                                    </p>
                                    <ContactForm defaultPackage={defaultPackage} />
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
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ContactPageContent hero={hero} />
        </Suspense>
    )
}
