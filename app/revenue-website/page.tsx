'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Check, Star, Clock, Zap, Shield, ArrowRight,
    Layout, Bot, Search, DollarSign, Calendar, ChevronDown,
    BarChart, Flame, Briefcase, Globe, Rocket
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { TiltCard } from '@/components/effects/TiltCard'

// Countdown Timer with Hydration Fix
const CountdownTimer = () => {
    const [mounted, setMounted] = useState(false)
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        setMounted(true)
        const deadline = new Date('2025-12-30T23:59:59').getTime()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = deadline - now

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                clearInterval(timer)
                return
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    if (!mounted) return <div className="h-20 animate-pulse bg-white/5 rounded-lg w-full max-w-sm mx-auto"></div>

    return (
        <div className="flex gap-4 justify-center py-6">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Sec', value: timeLeft.seconds },
            ].map((item, i) => (
                <div key={i} className="text-center group">
                    <div className="bg-zinc-900 border border-white/10 group-hover:border-emerald-500/50 transition-colors rounded-xl w-14 h-14 md:w-20 md:h-20 flex items-center justify-center text-xl md:text-3xl font-bold text-emerald-400 mb-2 shadow-2xl shadow-emerald-900/20 backdrop-blur-xl">
                        {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest">{item.label}</div>
                </div>
            ))}
        </div>
    )
}

const faqs = [
    {
        q: "Why is 'Agency Direct' better than a freelancer?",
        a: "Freelancers get sick, ghost you, or lack skills. BigWeb is a full-service agency team. We ensure continuity, quality QA, and a diverse skillset (Design + Code + AI + SEO) all in one package."
    },
    {
        q: "Do I own the code?",
        a: "Yes. Once paid in full, you own 100% of the intellectual property. No monthly leasing fees, unlike Wix or Squarespace."
    },
    {
        q: "How does the payment plan work?",
        a: "We split the risk. You pay 50% to start the project and secure your slot. The remaining 50% is due only when the website is live and you are 100% satisfied."
    },
    {
        q: "What if I don't love the design?",
        a: "We have a bold 'Love It' guarantee: If you don't love the initial concepts, we will redesign them until you do. You take strictly zero risk."
    }
]

export default function RevenueWebsitePage() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Elite Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full opacity-30 pointer-events-none" />
            </div>

            {/* Sticky Top Bar */}
            <div className="fixed top-0 inset-x-0 z-50 bg-emerald-700/80 backdrop-blur-md text-white text-center py-2 px-4 text-xs md:text-sm font-medium shadow-lg shadow-emerald-900/20 border-b border-white/5">
                <span className="hidden md:inline">🔥 AGENCY OFFER: </span>
                Opening 2 Spots in December.
                <span className="font-bold ml-1">Offer Ends Dec 30</span>
            </div>

            {/* Hero Section - Optimized for Viewport Fit */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 z-10 min-h-[90vh] flex flex-col justify-center">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-semibold mb-4 backdrop-blur-md hover:bg-emerald-500/20 transition-colors cursor-default"
                    >
                        <Briefcase className="w-4 h-4 fill-current" />
                        <span>Agency-Grade Web Development</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1] md:leading-[1.1]"
                    >
                        We Build Websites That <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Actually Get Customers.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-400 mb-6 max-w-3xl mx-auto leading-relaxed"
                    >
                        Most agencies charge $10k+ for "brochure" sites. Get a complete, high-performance <strong className="text-white">Revenue System</strong> (Next.js + AI + SEO) ready in 10 days.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="#pricing"
                            className="group relative bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 flex items-center gap-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                            <span className="relative">See Pricing & Packages</span>
                            <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="text-sm text-zinc-500 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            <span className="border-b border-zinc-700">Verified Agency Quality</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Speed & Psychology Section */}
            <section className="py-24 border-y border-white/5 bg-black/50 backdrop-blur-sm z-10 relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-500 font-bold mb-4 uppercase tracking-wide text-sm">
                                <Zap className="w-5 h-5" /> The Speed Advantage
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Slow Websites <br /><span className="text-red-500">Kill Revenue.</span></h2>
                            <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                                Amazon found that every 100ms of latency costs 1% in sales. We don't use slow WordPress templates.
                                We build on <strong>Next.js</strong>—the same technology used by Netflix, Uber, and TikTok.
                            </p>
                            <div className="space-y-6">
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-red-500/20 flex items-center justify-between">
                                    <span className="text-zinc-400 font-medium">Standard WordPress</span>
                                    <span className="text-red-400 font-bold font-mono">3.2s Load</span>
                                </div>
                                <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between relative overflow-hidden">
                                    <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
                                    <span className="text-white font-bold relative z-10">BigWeb Revenue Site</span>
                                    <span className="text-emerald-400 font-bold font-mono relative z-10">0.2s Load</span>
                                </div>
                            </div>
                        </div>

                        <TiltCard className="perspective-1000">
                            {/* Speed Visual (CSS Replacement) */}
                            <div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl border border-white/10 p-6 flex flex-col justify-center relative overflow-hidden backdrop-blur-md">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-purple-500/5" />

                                <h3 className="text-xl font-bold mb-8 relative z-10 flex items-center gap-2">
                                    <BarChart className="w-5 h-5 text-zinc-400" />
                                    Performance Score
                                </h3>

                                {/* WordPress Bar */}
                                <div className="mb-8 relative z-10 group">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-zinc-400">Standard WordPress</span>
                                        <span className="text-red-400 font-mono">42/100</span>
                                    </div>
                                    <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "42%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full relative"
                                        >
                                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/20 animate-pulse" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* BigWeb Bar */}
                                <div className="relative z-10 group">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-emerald-400 font-bold">BigWeb System</span>
                                        <span className="text-emerald-400 font-bold font-mono">100/100</span>
                                    </div>
                                    <div className="h-6 bg-zinc-800 rounded-full overflow-hidden relative shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-emerald-600 to-cyan-400 rounded-full relative"
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
                                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_white]" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 1, type: "spring" }}
                                    className="absolute top-6 right-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/20"
                                >
                                    Google Core Vitals: PASS
                                </motion.div>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* Psychology Section */}
            <section className="py-24 bg-black z-10 relative overflow-hidden">
                {/* Bg glow */}
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-20 items-center flex-row-reverse">
                        <div className="order-2 md:order-1">
                            <TiltCard className="perspective-1000">
                                {/* Heatmap Visual (CSS Replacement) */}
                                <div className="w-full h-[400px] bg-[#0A0A0A] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col items-center pt-8 shadow-2xl">
                                    {/* Mock Browser UI */}
                                    <div className="w-[90%] h-full bg-zinc-900 rounded-t-xl border border-white/5 relative overflow-hidden">
                                        {/* Header */}
                                        <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                            <div className="ml-4 h-6 w-48 bg-white/5 rounded-full" />
                                        </div>

                                        {/* Body Content */}
                                        <div className="p-6 space-y-4 relative">
                                            {/* Hero Mock */}
                                            <div className="h-32 w-full bg-white/5 rounded-lg mb-4 relative overflow-hidden group">
                                                {/* Heatmap Hotspot - Main CTA */}
                                                <div className="absolute bottom-4 left-8 w-32 h-10 bg-emerald-500/20 rounded-md border border-emerald-500/50 z-10 flex items-center justify-center">
                                                    <div className="w-full h-full absolute bg-emerald-500 blur-xl opacity-60 animate-pulse" />
                                                </div>
                                            </div>

                                            {/* Grid layout */}
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="h-24 bg-white/5 rounded-lg" />
                                                <div className="h-24 bg-white/5 rounded-lg relative overflow-hidden">
                                                    {/* Secondary Hotspot */}
                                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-40 mix-blend-screen" />
                                                </div>
                                                <div className="h-24 bg-white/5 rounded-lg" />
                                            </div>
                                        </div>

                                        {/* Overlay Heatmap Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none mix-blend-overlay" />

                                        {/* Cursor Animation */}
                                        <motion.div
                                            animate={{
                                                x: [100, 50, 200, 100],
                                                y: [100, 200, 150, 100]
                                            }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute top-0 left-0 text-white drop-shadow-lg z-20"
                                        >
                                            <div className="w-4 h-4 bg-white rounded-full opacity-50 absolute -top-1 -left-1 animate-ping" />
                                            <svg className="w-6 h-6 fill-emerald-500 stroke-black stroke-2" viewBox="0 0 24 24"><path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 4V2z" /></svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                        src="/images/heatmap-ui.png"
                        alt="Conversion Heatmap"
                        width={600}
                        height={400}
                        className="rounded-2xl border border-white/10 shadow-2xl"
                        unoptimized
                                />
                    </TiltCard>
                </div>
                <div className="order-1 md:order-2">
                    <div className="flex items-center gap-2 text-purple-500 font-bold mb-4 uppercase tracking-wide text-sm">
                        <Search className="w-5 h-5" /> Psychology First
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed to <br /><span className="text-purple-400">Make Them Buy.</span></h2>
                    <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                        Most designers just make things "look pretty". We use <strong className="text-white">Conversion Heatmaps</strong> and
                        F-Pattern layouts to direct your visitor's eye straight to the "Buy" button.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-orange-500/50 transition-colors">
                            <Flame className="w-8 h-8 text-orange-500 mb-3" />
                            <div className="font-bold text-lg mb-1">Scarcity Engine</div>
                            <div className="text-xs text-zinc-500">Urgency badges that actually convert.</div>
                        </div>
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors">
                            <Globe className="w-8 h-8 text-blue-500 mb-3" />
                            <div className="font-bold text-lg mb-1">Trust Anchors</div>
                            <div className="text-xs text-zinc-500">Strategic proof placement.</div>
                        </div>
                    </div>
                </div>
        </div>
                </div >
            </section >

        {/* NEW: 10-Day Process Section */ }
        < section className = "py-24 bg-zinc-900/10 border-t border-white/5 relative" >
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="text-emerald-500 font-bold mb-2 uppercase tracking-wide">Transparency</div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">From "Kickoff" to "Cash Flow" in 10 Days.</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">We don't ghost you. You get a dedicated Trello board to track every pixel.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { day: "Day 1-2", title: "Strategy & Wireframes", desc: "We map out your customer journey and approve the layout." },
                        { day: "Day 3-6", title: "High-Fidelity Build", desc: "We code the site in Next.js. You see the first interactive demo." },
                        { day: "Day 7-8", title: "Content & AI Setup", desc: "We plug in your text, images, and train the AI Sales Bot." },
                        { day: "Day 9-10", title: "QA & Launch", desc: "Final speed tests, SEO checks, and live deployment." }
                    ].map((item, i) => (
                        <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl relative group hover:border-emerald-500/30 transition-all">
                            <div className="text-xs font-bold text-emerald-500 mb-2 border border-emerald-500/20 inline-block px-2 py-1 rounded bg-emerald-500/10">{item.day}</div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-zinc-400">{item.desc}</p>
                            {/* Arrow connector for desktop */}
                            {i < 3 && <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-700">➜</div>}
                        </div>
                    ))}
                </div>
            </div>
            </section >

        {/* NEW: Tech Stack Section */ }
        < section className = "py-24 bg-black relative overflow-hidden" >
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="text-emerald-500 font-bold mb-2 uppercase tracking-wide">Under The Hood</div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Built on the "Ferrari" of Web Stacks.</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">We don't use $50 themes. We use the same enterprise tooling as billion-dollar startups.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Next.js 14", desc: "The React Framework for Web", icon: "N" },
                            { name: "VS Vercel", desc: "Global Edge Network Hosting", icon: "▲" },
                            { name: "TypeScript", desc: "Type-Safe Commercial Code", icon: "TS" },
                            { name: "Supabase", desc: "Scalable Realtime Database", icon: "S" },
                            { name: "Tailwind CSS", desc: "Pixel-Perfect Styling System", icon: "TW" },
                            { name: "Framer Motion", desc: "Cinematic 60fps Animations", icon: "FM" },
                            { name: "Resend", desc: "High-Deliverability Email API", icon: "@" },
                            { name: "Stripe", desc: "Secure Global Payments", icon: "$" }
                        ].map((tech, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-xl flex items-center gap-4 hover:border-zinc-700 transition-colors">
                                <div className="w-12 h-12 bg-black rounded-lg border border-white/10 flex items-center justify-center font-bold text-lg text-zinc-300">
                                    {tech.icon}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{tech.name}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wide mt-1">Enterprise Standard</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

        {/* Pricing Section (Dual Package) */ }
        < section id = "pricing" className = "py-24 bg-zinc-900/30 z-10 relative" >
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Choose Your Growth Engine</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Stop paying monthly fees for Wix/Shopify. Own your high-performance asset.</p>

                    <div className="inline-block mt-8 bg-black/50 border border-red-500/30 text-red-400 px-6 py-2 rounded-full text-sm font-bold animate-pulse backdrop-blur-sm">
                        ⚠️ Prices Increase January 1st
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Core Package */}
                    <div className="bg-zinc-950 border border-white/5 rounded-[2rem] p-10 relative hover:border-zinc-700 transition-all group">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-zinc-200">Revenue Foundation</h3>
                            <p className="text-zinc-500 text-sm">Everything you need to look pro and get leads.</p>
                        </div>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-bold text-white">$1,997</span>
                            <span className="text-zinc-700 line-through text-xl">$3,500</span>
                        </div>
                        <ul className="space-y-5 mb-10">
                            {[
                                "Custom Next.js Website (5 Pages)",
                                "AI Lead Capture Bot (Basic)",
                                "Mobile Responsive Design",
                                "Basic SEO Setup",
                                "14-Day Delivery"
                            ].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                    <Check className="w-5 h-5 text-emerald-500" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="https://raenest.com/pay"
                            className="block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-center py-5 rounded-xl transition-all border border-white/5"
                        >
                            Choose Foundation ($1k Deposit)
                        </Link>
                    </div>

                    {/* Visual Highlight for Pro */}
                    <div className="bg-zinc-900/80 border-2 border-emerald-600 rounded-[2rem] p-10 relative shadow-2xl shadow-emerald-900/40 transform md:scale-105 z-20 backdrop-blur-xl">
                        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-6 py-2 rounded-bl-2xl rounded-tr-xl uppercase tracking-wider">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold mb-2 text-white">Market Dominator</h3>
                            <p className="text-emerald-400 font-medium text-sm">For businesses ready to scale aggressively.</p>
                        </div>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-bold text-white">$3,497</span>
                            <span className="text-zinc-600 line-through text-xl">$6,000</span>
                        </div>
                        <ul className="space-y-5 mb-10">
                            {[
                                "Everything in Foundation",
                                "CRM Integration (HubSpot/Zapier)",
                                "3-Month Content Strategy",
                                "Email Automation Setup",
                                "Priority 7-Day Rush Delivery",
                                "Advanced Analytics Dashboard"
                            ].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                                    <div className="bg-emerald-500/20 p-1 rounded-full"><Check className="w-4 h-4 text-emerald-400" /></div>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="https://raenest.com/pay"
                            className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center py-5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                            Start Dominating ($1.5k Deposit)
                        </Link>
                    </div>
                </div>

                <div className="text-center mt-16 mb-12 bg-zinc-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm max-w-2xl mx-auto">
                    <div className="text-sm text-zinc-400 mb-6 uppercase tracking-widest font-bold">Offer Expires Soon</div>
                    <CountdownTimer />
                    <div className="mt-6 text-red-500 font-bold text-sm bg-red-500/10 inline-block px-4 py-1 rounded-full border border-red-500/20">
                        Strict Validation: Offer expires Dec 30 @ Midnight
                    </div>
                </div>
            </div>
            </section >

        {/* Final FAQ */ }
        < section className = "py-20 bg-black z-10 relative" >
            <div className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/5 rounded-2xl bg-zinc-900/20 overflow-hidden">
                            <button
                                onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left font-medium hover:bg-white/5 transition-colors gap-4"
                            >
                                <span className="text-lg">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-emerald-500 transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeAccordion === i && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-zinc-400 text-base leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
            </section >

        {/* Footer Simple */ }
        < footer className = "py-12 text-center text-zinc-600 text-sm border-t border-white/5 bg-black z-10 relative" >
                <p>&copy; 2025 BigWeb Digital Agency. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                </div>
            </footer >

        {/* Sticky Mobile CTA */ }
        < div className = "md:hidden fixed bottom-6 left-4 right-4 z-[9999]" >
            <Link
                href="#pricing"
                className="block w-full bg-emerald-600 text-white font-bold text-center py-4 rounded-full shadow-2xl shadow-emerald-500/40 border border-emerald-400/50 backdrop-blur-xl animate-pulse-slow"
            >
                Get Revenue Site ($1,997)
            </Link>
            </div >
        </div >
    )
}
