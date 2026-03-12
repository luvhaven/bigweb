'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
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

            {/* ── HERO — fits inside one viewport ─────────────────────── */}
            <section className="relative flex flex-col justify-center min-h-screen border-b border-white/[0.04] overflow-hidden">
                {/* Static background decorations — no parallax to avoid hydration mismatch */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.05] blur-[180px] rounded-full" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.04] blur-[150px] rounded-full" />
                    <div
                        className="absolute inset-0 opacity-[0.022]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)',
                            backgroundSize: '80px 80px',
                        }}
                    />
                </div>

                <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10 pt-28 pb-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* ── Left: copy ─────────────────────────────────── */}
                        <div>
                            {/* Availability pill */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 mb-7"
                            >
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300">
                                    Currently Accepting New Clients
                                </span>
                            </motion.div>

                            {/* Headline — tighter size to stay above fold */}
                            <div className="overflow-hidden mb-1">
                                <motion.h1
                                    initial={{ y: '105%' }}
                                    animate={{ y: '0%' }}
                                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-display font-black tracking-tighter leading-[0.9] text-white uppercase text-[clamp(2.8rem,6vw,5.5rem)]"
                                >
                                    Let&apos;s build
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden mb-8">
                                <motion.h1
                                    initial={{ y: '105%' }}
                                    animate={{ y: '0%' }}
                                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
                                    className="font-display font-black tracking-tighter leading-[0.9] text-accent italic uppercase text-[clamp(2.8rem,6vw,5.5rem)]"
                                >
                                    something real.
                                </motion.h1>
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.35 }}
                                className="text-zinc-400 text-lg leading-relaxed max-w-md mb-10"
                            >
                                Tell us about your situation. We review every inquiry personally and respond within 24 hours with a clear, honest perspective — and what it costs.
                            </motion.p>

                            {/* Trust grid — 2×2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                className="grid grid-cols-2 gap-2.5"
                            >
                                {TRUST.map((t, i) => (
                                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <t.icon className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-white text-[13px] font-semibold leading-none mb-0.5">{t.label}</div>
                                            <div className="text-zinc-600 text-[11px] leading-snug">{t.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── Right: stats card + contact info ─────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                            className="hidden lg:flex flex-col gap-3"
                        >
                            {/* Outcomes card */}
                            <div className="p-7 rounded-2xl bg-[#060606] border border-white/[0.05] relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-5">Recent Client Outcomes</div>
                                <div className="space-y-4">
                                    {WINS.map((w, i) => (
                                        <div key={i} className="flex items-center justify-between pb-4 border-b border-white/[0.04] last:pb-0 last:border-0">
                                            <div>
                                                <div className="text-2xl font-display font-black text-white tracking-tighter mb-0.5">{w.metric}</div>
                                                <div className="text-zinc-500 text-sm font-medium">{w.label}</div>
                                            </div>
                                            <div className="text-zinc-600 text-xs font-mono max-w-[130px] text-right leading-relaxed">{w.client}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                                    <span className="text-zinc-600 text-sm">Full case studies</span>
                                    <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:gap-2.5 transition-all duration-300">
                                        View Work <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            {/* Contact info row */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#060606] border border-white/[0.04]">
                                    <Mail className="w-4 h-4 text-accent shrink-0" />
                                    <div>
                                        <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-1">Email</div>
                                        <a href="mailto:hello@bigwebdigital.com" className="text-zinc-300 text-xs font-medium hover:text-white transition-colors">
                                            hello@bigwebdigital.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#060606] border border-white/[0.04]">
                                    <MapPin className="w-4 h-4 text-accent shrink-0" />
                                    <div>
                                        <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-1">Location</div>
                                        <div className="text-zinc-300 text-xs font-medium">Global · Remote-first</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-700">Start here</span>
                    <div className="w-px h-8 bg-gradient-to-b from-zinc-700 to-transparent animate-pulse" />
                </motion.div>
            </section>

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
