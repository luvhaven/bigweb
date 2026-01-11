'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Check, Star, Clock, Zap, Shield, ArrowRight,
    MessageSquare, Bot, BarChart, Users, Lock, ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { MouseReveal, RevealPatterns } from '@/components/ui/MouseReveal'

// Countdown Timer Component
const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        // Set deadline to Dec 30, 2025
        const deadline = new Date('2026-01-09T23:59:59').getTime()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = deadline - now

            if (distance < 0) {
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

    return (
        <div className="flex gap-4 justify-center py-6">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, i) => (
                <div key={i} className="text-center">
                    <div className="bg-zinc-900 border border-white/10 rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold text-emerald-400 mb-1 shadow-lg shadow-emerald-900/10">
                        {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{item.label}</div>
                </div>
            ))}
        </div>
    )
}

// Testimonials Data
const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CEO, TechFlow Solutions",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        content: "We were drowning in support tickets. The AI chatbot cut our response time by 98% and actually closed 3 deals while I was sleeping. Best investment of 2024.",
        stats: "Saved 25hrs/week"
    },
    {
        name: "Michael Chen",
        role: "Founder, Zenith E-com",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "I was skeptical, but the ROI was instant. It captured 40% more leads in the first week. The setup was flawless and FAST.",
        stats: "+40% Lead Capture"
    },
    {
        name: "Elena Rodriguez",
        role: "Director, Urban Realty",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        content: "Professional, intelligent, and on-brand. It handles our complex booking queries perfectly. BigWeb delivered exactly as promised.",
        stats: "10x Efficiency"
    }
]

// FAQ Data
const faqs = [
    {
        q: "Will this work on my specific website platform?",
        a: "Yes! Our solution is platform-agnostic. Whether you use WordPress, Shopify, Webflow, Wix, or a custom Next.js/React site, we can embed the chatbot seamlessly properly."
    },
    {
        q: "Do I need to know how to code?",
        a: "Not at all. We handle 100% of the technical setup, training, and deployment. You just provide us with your business details, and we do the rest."
    },
    {
        q: "What happens after the 30 days of support?",
        a: "You'll have full ownership of the system. We provide a training session and guide so you can make validation tweaks yourself. We also offer affordable monthly maintenance plans if you prefer hands-off management."
    },
    {
        q: "Can it really replace a human support agent?",
        a: "It handles 80-90% of routine queries instantly. For complex issues, it intelligently escalates to your human team, ensuring you only spend time on high-value interactions."
    }
]



export default function AIBoostLandingPage() {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">

            {/* Sticky Top Bar - Scarcity */}
            <div className="fixed top-0 inset-x-0 z-50 bg-emerald-600 text-white text-center py-2 px-4 text-sm font-medium shadow-lg shadow-emerald-900/20">
                <span className="hidden md:inline">🔥 FLASH SALE ENDING SOON: </span>
                Waitlist closing for 2026 Fast-Track Delivery.
                <span className="font-bold ml-1">Offer Ends Jan 31.</span>
            </div>

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
                <MouseReveal revealContent={<RevealPatterns.Neural />} revealSize={600} className="w-full h-full absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-transparent" />
                </MouseReveal>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#050505] to-[#050505] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-semibold backdrop-blur-sm"
                            >
                                <Zap className="w-4 h-4 fill-current" />
                                <span>Limited-Time Offer: Save $1,003 Instantly</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 text-red-400 text-xs font-bold"
                            >

                                <span>Only 2 Slots Left This Week</span>
                            </motion.div>
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl/[1.1] font-black tracking-tight mb-8 relative"
                        >
                            <span className="bg-gradient-to-br from-white via-emerald-50 to-emerald-200/90 bg-clip-text text-transparent drop-shadow-2xl">
                                Struggling with Missed Leads
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent relative inline-block">
                                & Overwhelmed Support?
                                <svg className="absolute w-full h-4 -bottom-2 left-0 opacity-40" viewBox="0 0 300 10" preserveAspectRatio="none">
                                    <motion.path
                                        d="M0 5 Q 75 10 150 5 T 300 5"
                                        stroke="currentColor"
                                        className="text-emerald-400"
                                        strokeWidth="3"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.4 }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            Get a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold">Custom AI Chatbot</span> that works 24/7 to boost conversions and save you <span className="text-white font-semibold underline decoration-emerald-500/30 decoration-2 underline-offset-4">20+ hours</span> every single week.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="https://raenest.com/pay"
                                className="w-full sm:w-auto relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 hover:from-emerald-500 hover:via-cyan-500 hover:to-emerald-600 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 hover:shadow-emerald-500/60 flex items-center justify-center gap-2 group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                                <span className="relative z-10 text-xl">Secure My Spot & Pay Deposit</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                            </Link>
                            <div className="text-sm text-zinc-500 mt-2 sm:mt-0">
                                <span className="block text-zinc-400 font-medium">Deposit: $1,248.50</span>
                                <span className="line-through opacity-70">Normally $1,750</span>
                            </div>
                        </motion.div>

                        {/* Trust Badges & Social Proof */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-white/5"
                        >
                            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-2 border-background flex items-center justify-center text-xs font-bold text-black">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <span className="font-medium">Join 200+ businesses saving 20+ hrs/week</span>
                            </div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-medium">4.9/5 from 156 reviews</span>
                            </div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                <Shield className="w-5 h-5 text-emerald-500" />
                                <span className="font-medium">30-Day Money-Back Guarantee</span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="bg-[#111] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                    <Bot className="w-6 h-6 text-emerald-400" />
                                    What You Get:
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Fully custom AI chatbot deployed on your site",
                                        "Works 24/7: Qualifies leads & books appointments",
                                        "Up to 3 integrations (Zapier, CRM, Calendar)",
                                        "Full testing & conversion optimization",
                                        "30 Days detailed support & fine-tuning",
                                        "Fast-Track Delivery (7-14 Days)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-zinc-300">
                                            <div className="mt-1 bg-emerald-500/20 rounded-full p-1">
                                                <Check className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                {/* Visual Representation of Chatbot Interface */}
                                <div className="bg-zinc-900 rounded-xl border border-white/10 shadow-2xl p-4 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                                            <Bot className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">AI Assistant</div>
                                            <div className="text-xs text-emerald-400 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                Online Now
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-sm">
                                        <div className="bg-zinc-800 p-3 rounded-lg rounded-tl-none text-zinc-300 max-w-[90%]">
                                            Hi there! I noticed you re looking to scale your business. Would you like to see how we can help you double your leads?
                                        </div>
                                        <div className="bg-emerald-600/10 border border-emerald-500/20 text-emerald-100 p-3 rounded-lg rounded-tr-none ml-auto max-w-[90%]">
                                            Yes, I'd love to save time on support!
                                        </div>
                                        <div className="bg-zinc-800 p-3 rounded-lg rounded-tl-none text-zinc-300 max-w-[90%]">
                                            Perfect. I can set that up for you instantly. Let's get started!
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Stats Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                                    <div className="bg-emerald-100 p-2 rounded-full">
                                        <BarChart className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-zinc-500 uppercase">Conversion Lift</div>
                                        <div className="text-xl font-extrabold">+200%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: How It Works Section */}
            <section className="py-24 bg-black relative">
                <div className="absolute inset-0 bg-emerald-900/10 opacity-20 pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Setup in 3 Simple Steps.</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">No coding required. We handle the technical heavy lifting.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                step: "01",
                                title: "We Train Your AI",
                                desc: "We feed the AI your website data, PDF prices sheets, and past emails so it knows your business perfectly.",
                                icon: <Bot className="w-8 h-8 text-emerald-400" />
                            },
                            {
                                step: "02",
                                title: "We Install the Code",
                                desc: "Our team adds a single line of code to your existing site. It works on WordPress, Shopify, Next.js, and more.",
                                icon: <Zap className="w-8 h-8 text-emerald-400" />
                            },
                            {
                                step: "03",
                                title: "You Watch Leads Pour In",
                                desc: "The bot engages visitors 24/7, answers questions, and books appointments directly into your calendar.",
                                icon: <BarChart className="w-8 h-8 text-emerald-400" />
                            }
                        ].map((s, i) => (
                            <div key={i} className="relative bg-zinc-900/50 border border-white/5 p-8 rounded-2xl group hover:bg-zinc-900 transition-all">
                                <div className="absolute -top-6 left-8 text-6xl font-black text-white/5 select-none">{s.step}</div>
                                <div className="mb-6 bg-emerald-500/10 w-16 h-16 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: Comparison Section */}
            <section className="py-24 bg-[#080808] border-y border-white/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Why the Old Way is Costing You Money</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Old Way */}
                        <div className="p-8 rounded-3xl bg-red-950/10 border border-red-500/20 opacity-80">
                            <h3 className="text-red-400 font-bold mb-6 flex items-center gap-2">
                                <span className="p-2 bg-red-500/10 rounded-lg"><Clock className="w-5 h-5" /></span>
                                Traditional Website
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-zinc-400 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">✕</div>
                                    Visitor fills form → Waits 24h for reply
                                </li>
                                <li className="flex gap-3 text-zinc-400 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">✕</div>
                                    "Contact Us" page is boring & static
                                </li>
                                <li className="flex gap-3 text-zinc-400 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">✕</div>
                                    Generic replies to specific questions
                                </li>
                                <li className="flex gap-3 text-zinc-400 text-sm">
                                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">✕</div>
                                    Zero engagement on weekends/nights
                                </li>
                            </ul>
                        </div>

                        {/* New Way */}
                        <div className="p-8 rounded-3xl bg-emerald-950/10 border border-emerald-500/50 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-emerald-600/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-bl-lg">WINNER</div>
                            <h3 className="text-emerald-400 font-bold mb-6 flex items-center gap-2">
                                <span className="p-2 bg-emerald-500/10 rounded-lg"><Zap className="w-5 h-5" /></span>
                                AI-Boosted Website
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-white font-medium text-sm">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-emerald-400" /></div>
                                    Instant Reply (0.2s response time)
                                </li>
                                <li className="flex gap-3 text-white font-medium text-sm">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-emerald-400" /></div>
                                    Active conversation engages user nicely
                                </li>
                                <li className="flex gap-3 text-white font-medium text-sm">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-emerald-400" /></div>
                                    Hyper-specific answers from YOUR data
                                </li>
                                <li className="flex gap-3 text-white font-medium text-sm">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-emerald-400" /></div>
                                    Qualifies leads & books calls 24/7
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Agitation / Logic Section */}
            <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                        <div className="p-4">
                            <Clock className="w-10 h-10 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Losing Time?</h3>
                            <p className="text-zinc-400 text-sm">You spend hours replying to the same questions instead of growing your business.</p>
                        </div>
                        <div className="p-4">
                            <Users className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Missed Leads?</h3>
                            <p className="text-zinc-400 text-sm">Clients visit when you're asleep. Without a 24/7 agent, they go to your competitors.</p>
                        </div>
                        <div className="p-4">
                            <Lock className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Inconsistent Sales?</h3>
                            <p className="text-zinc-400 text-sm">Manual follow-ups invoke human error. Automation ensures 100% reliability.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: Integrations Section - Glass Cards Grid */}
            <section className="py-24 border-b border-white/5 bg-zinc-900/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-12">
                        <p className="text-zinc-500 font-medium text-sm uppercase tracking-widest mb-2">Universal Compatibility</p>
                        <h2 className="text-3xl font-bold">Works Seamlessly With Your Current Stack</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "HubSpot", color: "#FF5C35", icon: "HS" },
                            { name: "Shopify", color: "#95BF47", icon: "S" },
                            { name: "WordPress", color: "#21759B", icon: "W" },
                            { name: "Zapier", color: "#FF4A00", icon: "*" },
                            { name: "Salesforce", color: "#00A1E0", icon: "☁️" },
                            { name: "Slack", color: "#4A154B", icon: "#" },
                            { name: "WhatsApp", color: "#25D366", icon: "📞" },
                            { name: "Custom API", color: "#FFFFFF", icon: "</>" }
                        ].map((tech, i) => (
                            <div key={i} className="group bg-zinc-900/60 backdrop-blur-md border border-white/5 hover:border-emerald-500/30 rounded-xl p-4 flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-inner" style={{ backgroundColor: `${tech.color}20`, color: tech.color }}>
                                    {tech.icon}
                                </div>
                                <div className="font-medium text-zinc-300 group-hover:text-white transition-colors">
                                    {tech.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-16">Trusted by High-Growth Founders</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                                </div>
                                <p className="text-zinc-300 mb-6 leading-relaxed">"{t.content}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full grayscale hover:grayscale-0 transition-all" />
                                    <div>
                                        <div className="font-bold text-sm">{t.name}</div>
                                        <div className="text-xs text-zinc-500">{t.role}</div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                                    <BarChart className="w-4 h-4" />
                                    {t.stats}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing / Offer Section */}
            <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-4xl font-bold mb-6">Secure Your 2025 Competitive Edge</h2>
                    <p className="text-zinc-400 mb-10">Don't let another lead slip through the cracks. The price increases permanently in 2026.</p>

                    <div className="bg-zinc-900 border border-emerald-500/30 rounded-3xl p-8 md:p-12 relative shadow-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
                            Save $1,003 Ends Dec 30
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="text-2xl text-zinc-500 line-through decoration-red-500/50">$3,500</span>
                            <span className="text-5xl md:text-6xl font-extrabold text-emerald-400">$2,497</span>
                        </div>

                        <div className="text-sm font-medium text-zinc-400 mb-8">
                            Deposit Today: <span className="text-white">$1,248.50</span> • Sale Ends Jan 9
                        </div>

                        <CountdownTimer />

                        <Link
                            href="https://raenest.com/pay" // Placeholder
                            className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xl px-8 py-5 rounded-xl shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all mb-6 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                            Secure My Spot Now
                        </Link>

                        <div className="flex items-center justify-center gap-6 text-xs text-zinc-500">
                            <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3" /> Secure Payment
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 14-Day Delivery
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" /> Limited Spots
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-white/5 rounded-xl bg-zinc-900/30 overflow-hidden">
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                    className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-white/5 transition-colors"
                                >
                                    {faq.q}
                                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeAccordion === i && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-white/5 bg-black/20">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-12 bg-zinc-900 text-center">
                <div className="container mx-auto px-4">
                    <p className="text-zinc-500 mb-4 text-sm">Still have questions?</p>
                    <Link href="/contact" className="text-white border-b border-white/20 hover:border-emerald-500 pb-0.5 transition-colors">
                        Book a free 15-min discovery call
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-zinc-600 text-sm border-t border-white/5 bg-black z-10 relative">
                <p>&copy; 2025 BigWeb Digital Limited. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                </div>
            </footer>

            {/* Sticky Mobile CTA */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-[9999]">
                <Link
                    href="#pricing"
                    className="block w-full bg-emerald-600 text-white font-bold text-center py-4 rounded-full shadow-2xl shadow-emerald-500/40 border border-emerald-400/50 backdrop-blur-xl animate-pulse-slow"
                >
                    Add AI Agent ($1,497)
                </Link>
            </div>
        </div>
    )
}
