'use client'

import React, { Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'
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

    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

    return (
        <main className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
            <AdvancedNavigation />

            {/* ── HERO ────────────────────────────────────────────────── */}
            <section ref={heroRef} className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden border-b border-white/[0.04]">
                {/* BG */}
                <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent/[0.05] blur-[200px] rounded-full mix-blend-screen" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.03] blur-[160px] rounded-full" />
                    <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
                </motion.div>

                <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-end">
                        {/* Left — copy */}
                        <div>
                            {/* Availability badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 mb-8"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300">
                                    Currently Accepting New Clients
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <div className="overflow-hidden mb-2">
                                <motion.h1
                                    initial={{ y: '110%' }}
                                    animate={{ y: '0%' }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-display font-black tracking-tighter text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] text-white uppercase"
                                >
                                    Let&apos;s build
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden mb-10">
                                <motion.h1
                                    initial={{ y: '110%' }}
                                    animate={{ y: '0%' }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                                    className="font-display font-black tracking-tighter text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] text-accent italic uppercase"
                                >
                                    something real.
                                </motion.h1>
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-zinc-400 text-xl leading-relaxed max-w-lg mb-12"
                            >
                                Tell us about your situation. We review every inquiry personally and respond within 24 hours with a clear, honest perspective on how we can help — and at what cost.
                            </motion.p>

                            {/* Trust grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.55 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {TRUST.map((t, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <t.icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-white text-sm font-semibold leading-none mb-0.5">{t.label}</div>
                                            <div className="text-zinc-600 text-[11px] leading-snug">{t.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right — quick stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.3 }}
                            className="hidden lg:block"
                        >
                            <div className="p-8 rounded-[2rem] bg-[#060606] border border-white/[0.05] relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-6">Recent Client Outcomes</div>
                                <div className="space-y-6">
                                    {WINS.map((w, i) => (
                                        <div key={i} className="flex items-center justify-between pb-6 border-b border-white/[0.04] last:pb-0 last:border-b-0">
                                            <div>
                                                <div className="text-3xl font-display font-black text-white tracking-tighter mb-0.5">{w.metric}</div>
                                                <div className="text-zinc-500 text-sm font-medium">{w.label}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-zinc-600 text-xs font-mono max-w-[140px] text-right leading-relaxed">{w.client}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
                                    <div className="text-zinc-500 text-sm">View our full results</div>
                                    <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:gap-2.5 transition-all duration-300">
                                        Case Studies <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            {/* Contact info */}
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#060606] border border-white/[0.04]">
                                    <Mail className="w-4 h-4 text-accent shrink-0" />
                                    <div>
                                        <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-0.5">Email</div>
                                        <a href="mailto:hello@bigwebdigital.com" className="text-zinc-300 text-xs font-medium hover:text-white transition-colors">
                                            hello@bigwebdigital.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#060606] border border-white/[0.04]">
                                    <MapPin className="w-4 h-4 text-accent shrink-0" />
                                    <div>
                                        <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-0.5">Location</div>
                                        <div className="text-zinc-300 text-xs font-medium">Global · Remote-first</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FORM SECTION ──────────────────────────────────────────── */}
            <section id="contact-form" className="py-20 md:py-32">
                <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Left sidebar — context */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="lg:col-span-4 space-y-6"
                        >
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-4">How it works</div>
                                <div className="space-y-4">
                                    {[
                                        { n: '01', t: 'Select your package', d: 'Tell us what you\'re looking to do — or choose General Inquiry if you\'re not sure yet.' },
                                        { n: '02', t: 'Share your brief', d: 'A few details about your project, goals, and timeline. Takes less than 3 minutes.' },
                                        { n: '03', t: 'We respond in 24h', d: 'A real human from our senior team reviews and responds personally with a clear next step.' },
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

                            {/* Guarantees */}
                            <div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-4">Our guarantees</div>
                                <div className="space-y-2.5">
                                    {[
                                        'We respond to every inquiry within 24 hours',
                                        'No sales pressure. Ever.',
                                        'If we\'re not the right fit, we\'ll say so honestly',
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

                            {/* Not sure pill */}
                            <div className="p-5 rounded-2xl bg-[#060606] border border-white/[0.04]">
                                <div className="text-sm font-semibold text-white mb-2">Not sure which package?</div>
                                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                                    Start with a General Inquiry and describe your situation. We&apos;ll recommend the right engagement for your goals and budget.
                                </p>
                                <Link href="/offers/revenue-roadmap" className="inline-flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300">
                                    Or start with a Roadmap <ArrowUpRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right — Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="lg:col-span-8"
                        >
                            <div id="form-panel" className="relative rounded-[2rem] border border-white/[0.06] bg-[#060606] p-8 md:p-12 overflow-hidden">
                                {/* Top accent */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                                {/* Corner glow */}
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />

                                <div className="relative z-10">
                                    <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tighter italic mb-2">
                                        Start the conversation.
                                    </h2>
                                    <p className="text-zinc-500 text-base mb-10 leading-relaxed">
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
