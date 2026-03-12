'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowRight, CheckCircle2, TrendingUp, RefreshCw, BarChart3,
    SplitSquareHorizontal, Users, Slack, Sparkles, Shield, Calendar, Zap
} from 'lucide-react'

/* ─── ATOMS ─────────────────────────────────────────────────── */
function Pill({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 mb-8">
            <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-emerald-300 uppercase">{children}</span>
        </div>
    )
}

function SectionTag({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ─── HERO ─────────────────────────────────────────────────── */
function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
    const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

    return (
        <section ref={ref} className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-32 overflow-hidden border-b border-white/[0.04] pt-28">
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-[0.13] mix-blend-luminosity"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070')", filter: 'brightness(0.4) contrast(1.2) saturate(0)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-transparent" />
                <div className="absolute top-1/4 left-0 w-[900px] h-[700px] rounded-full bg-emerald-600/[0.06] blur-[200px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] rounded-full bg-teal-500/[0.04] blur-[150px]" />
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.15) 1px,transparent 1px)', backgroundSize: '70px 70px' }} />
            </motion.div>

            {/* Live badge */}
            <div className="absolute top-28 right-6 lg:right-16 z-20">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">Ongoing Partnership · Slots Limited</span>
                </div>
            </div>

            <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl">
                <Pill>Package 03 · Growth Retainer</Pill>

                <div className="mb-10 max-w-5xl">
                    <h1 className="font-display font-black tracking-tighter leading-[0.88] text-white uppercase">
                        <span className="block text-[clamp(3rem,8vw,8rem)]">Growth that</span>
                        <span className="block text-[clamp(3rem,8vw,8rem)] text-emerald-400 italic">never stops.</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-end max-w-6xl">
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-light">
                        One winning campaign is not a strategy. Sustainable market dominance is built through continuous experimentation, measurement, and compounding. <span className="text-white font-medium">We become your embedded senior growth team</span> — testing, shipping, and optimizing every single month.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Monthly from</div>
                                <div className="text-2xl font-display font-black text-emerald-400">$6,000</div>
                                <div className="text-zinc-600 text-xs font-mono mt-1">/ month · flexible scope</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">Commitment</div>
                                <div className="text-2xl font-display font-black text-white">3 months</div>
                                <div className="text-zinc-600 text-xs font-mono mt-1">minimum · cancel anytime after</div>
                            </div>
                        </div>
                        <Link
                            href="/contact?plan=retainer"
                            className="group relative overflow-hidden flex items-center justify-center gap-3 py-5 rounded-2xl bg-emerald-500 text-black font-black text-[13px] tracking-[0.1em] uppercase hover:bg-emerald-400 transition-all duration-300"
                        >
                            <span className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                            <span className="relative">Apply for Retainer</span>
                            <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-zinc-600 text-xs font-mono tracking-widest uppercase">Application reviewed within 24 hours</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-white/[0.04]">
                    {[
                        { val: '~12×', label: 'Compound growth per year' },
                        { val: '4+ tests', label: 'Deployed every month' },
                        { val: 'Same day', label: 'Slack response SLA' },
                        { val: '0', label: 'Output without data approval' },
                    ].map((s, i) => (
                        <div key={i}>
                            <div className="text-xl font-black text-emerald-400 mb-0.5">{s.val}</div>
                            <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

/* ─── COMPOUND EFFECT ───────────────────────────────────────── */
function CompoundEffect() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-15%' })

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04] bg-[#020202] relative overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
                        <SectionTag>The Compounding Advantage</SectionTag>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[1.0] mb-8">
                            Month 1 sets the foundation. <br />
                            <span className="text-emerald-400">Month 12 is unbeatable.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            Agencies work in sprints and then disappear. We work alongside you continuously. Every A/B test we run teaches us more about your specific audience. Every optimization compounds onto the last. By month 6, your competitors can't replicate what we've built because they don't have the data.
                        </p>
                        <p className="text-zinc-500 text-lg leading-relaxed">
                            This is the retainer model that <span className="text-white font-medium">actually compounds</span> — not a subscription to a project management tool and monthly reports nobody reads.
                        </p>
                    </motion.div>

                    {/* Month-by-month progress visual */}
                    <div className="space-y-3">
                        {[
                            { month: 'Month 1', label: 'Audit, tracking setup, first wins', bar: 20, desc: 'Forensic audit + baseline measurement + first 2 tests deployed' },
                            { month: 'Month 2', label: 'First compounding results', bar: 38, desc: 'Tests conclude, winners ship, 3 new experiments launched' },
                            { month: 'Month 3', label: 'Momentum acceleration', bar: 55, desc: 'Compounding data advantage starts showing in revenue metrics' },
                            { month: 'Month 6', label: 'Sustained velocity', bar: 74, desc: 'Deep audience intelligence makes every test sharper and faster' },
                            { month: 'Month 12', label: 'Market dominance', bar: 100, desc: 'Your growth flywheel is self-sustaining. Competitors can\'t catch up.' },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                                className="group p-4 rounded-xl bg-[#060606] border border-white/[0.04] hover:border-emerald-500/15 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{step.month}</span>
                                        <span className="text-sm font-semibold text-zinc-300">{step.label}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-700">{step.bar}%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden mb-2">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: `${step.bar}%` } : { width: 0 }}
                                        transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                                    />
                                </div>
                                <p className="text-zinc-600 text-[11px] leading-relaxed group-hover:text-zinc-500 transition-colors">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ─── WHAT'S INCLUDED MONTHLY ───────────────────────────────── */
const MONTHLY = [
    { icon: SplitSquareHorizontal, title: 'CRO Experiments', desc: 'Minimum 4 statistically significant A/B or multivariate tests per month — across copy, layout, offers, and flows.' },
    { icon: BarChart3, title: 'Analytics & Reporting', desc: 'Monthly revenue intelligence report: what moved, what didn\'t, what we\'re testing next, and the exact dollar impact of each change.' },
    { icon: RefreshCw, title: 'Priority Dev Sprints', desc: 'Your dedicated engineering allocation for feature builds, landing pages, bug fixes, and performance improvements — shipped fast.' },
    { icon: TrendingUp, title: 'Growth Strategy', desc: 'Monthly strategy session with your dedicated Senior Strategist to review performance and set the optimization roadmap for the next 30 days.' },
    { icon: Users, title: 'Content Engineering', desc: 'Strategic content production (landing pages, email sequences, ad copy) aligned to your specific funnel gaps and ICP triggers.' },
    { icon: Slack, title: 'Unlimited Slack Access', desc: 'Direct, real-time Slack communication with your full senior team. Same-day responses guaranteed. No account manager middlemen.' },
]

function WhatIsIncluded() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="mb-16 max-w-3xl">
                    <SectionTag>Monthly Deliverables</SectionTag>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]">
                        Every month. <br />
                        <span className="text-zinc-600">Without exception.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MONTHLY.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.07 }}
                            className="group relative p-8 rounded-[2rem] bg-[#060606] border border-white/[0.04] hover:border-emerald-500/20 hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/0 group-hover:bg-emerald-500/[0.07] blur-[60px] transition-all duration-700 rounded-full pointer-events-none" />
                            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <item.icon className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-tight mb-3">{item.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── TESTIMONIAL + ROI ─────────────────────────────────────── */
function ProofSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04] bg-[#020202]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Quote */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative h-full rounded-[2rem] overflow-hidden border border-white/[0.06] bg-[#060606] p-8 md:p-12 flex flex-col justify-between">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                            <div className="absolute -top-20 left-0 w-64 h-64 rounded-full bg-emerald-500/[0.05] blur-[100px] pointer-events-none" />

                            <div>
                                <Sparkles className="w-8 h-8 text-emerald-400/40 mb-8" />
                                <blockquote className="text-white text-2xl md:text-3xl font-light italic leading-[1.4] mb-10">
                                    &ldquo;We were spending $60K a month on ads and getting 1.9% returns. After 4 months on retainer, our ROAS went from 1.9x to 6.8x without increasing ad spend by a single dollar. The team found revenue we didn't even know we were losing.&rdquo;
                                </blockquote>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">A</div>
                                <div>
                                    <div className="text-white font-semibold">Alex T.</div>
                                    <div className="text-zinc-500 text-sm">CMO, D2C Consumer Brand · 14 months on retainer</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats column */}
                    <motion.div
                        className="lg:col-span-2 flex flex-col gap-6"
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        {[
                            { val: '6.8×', label: 'ROAS achieved', sub: 'Up from 1.9×', color: 'text-emerald-400' },
                            { val: '+$340K', label: 'Additional Q3 revenue', sub: 'vs prior quarter', color: 'text-emerald-400' },
                            { val: '0%', label: 'Ad spend increase', sub: 'Same budget, better outcomes', color: 'text-zinc-300' },
                            { val: '4 months', label: 'Time to transformative results', sub: 'With compounding', color: 'text-zinc-300' },
                        ].map((s, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-[#060606] border border-white/[0.04] hover:border-emerald-500/15 transition-all duration-300 group">
                                <div className={`font-display font-black text-3xl ${s.color} mb-1`}>{s.val}</div>
                                <div className="text-white font-semibold text-sm">{s.label}</div>
                                <div className="text-zinc-600 text-xs mt-0.5 group-hover:text-zinc-500 transition-colors">{s.sub}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* ─── HOW IT WORKS ──────────────────────────────────────────── */
function HowItWorks() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    const steps = [
        { icon: Calendar, title: 'Apply & Onboard', desc: 'Submit your application. We review within 24 hours. If we\'re a fit, NDA is signed and we schedule a 60-minute onboarding call to align on your goals, access, and Q1 priorities.' },
        { icon: BarChart3, title: 'Month 1: Baseline', desc: 'We audit your existing setup, deploy clean tracking, establish baseline conversion metrics, and immediately ship the first 2 high-impact experiments.' },
        { icon: Zap, title: 'Month 2+: Compound', desc: 'Every month builds on the last. Tests conclude. Winners ship. New hypotheses form from the data. Your audience intelligence grows. Your results compound.' },
        { icon: Shield, title: 'Quarterly Reviews', desc: 'Every 3 months, we hold a strategic review: what we\'ve shipped, the exact revenue impact of each experiment, and the strategic roadmap for the next quarter.' },
    ]

    return (
        <section ref={ref} className="py-24 md:py-36 border-b border-white/[0.04]">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="mb-16 max-w-3xl">
                    <SectionTag>How It Works</SectionTag>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]">
                        Embedded. Measurable. <br />
                        <span className="text-emerald-400">Non-negotiably accountable.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative p-8 rounded-[2rem] bg-[#060606] border border-white/[0.04] hover:border-emerald-500/15 overflow-hidden transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/0 group-hover:bg-emerald-500/[0.07] blur-[50px] transition-all duration-700 pointer-events-none" />
                            <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest mb-4">Step {String(i + 1).padStart(2, '0')}</div>
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                                <step.icon className="w-4.5 h-4.5 text-emerald-400" size={18} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-base font-bold text-white tracking-tight mb-3">{step.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{step.desc}</p>
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─── BOTTOM CTA ────────────────────────────────────────────── */
function BottomCTA() {
    return (
        <section className="py-32 md:py-48 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-emerald-500/[0.05] blur-[150px] mix-blend-screen" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.2) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>
            <div className="container mx-auto px-6 lg:px-16 max-w-4xl text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">Currently accepting 3 retainer clients</span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter italic leading-[0.92] text-white uppercase mb-8">
                    Compound your <br />
                    <span className="text-emerald-400">market position.</span>
                </h2>
                <p className="text-zinc-400 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                    From $6,000/month. Your dedicated senior growth team — always on, always testing, always compounding. The brands that win long-term are the ones that never stop optimizing.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact?plan=retainer" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-emerald-500 text-black font-black text-[13px] tracking-[0.1em] uppercase hover:bg-emerald-400 transition-all duration-300">
                        Apply for Retainer
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/offers/revenue-system" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm px-6 py-5 font-medium">
                        Need a full build first? →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default function RetainerClient() {
    return (
        <div className="overflow-clip">
            <Hero />
            <CompoundEffect />
            <WhatIsIncluded />
            <ProofSection />
            <HowItWorks />
            <BottomCTA />
        </div>
    )
}
