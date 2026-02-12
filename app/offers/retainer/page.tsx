'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, ArrowRight, TrendingUp, Search, Zap, Code, FlaskConical, Target, ShieldCheck, Activity, BarChart3, Binary, Cpu, Microchip, Brain, Microscope, PieChart, LineChart } from 'lucide-react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GrowthRetainerPage() {
    const labProcesses = [
        {
            title: "Hypothesis Testing",
            desc: "Weekly testing of psychology-backed theories based on user behavior analysis.",
            icon: Brain
        },
        {
            title: "A/B Testing",
            desc: "Continuous testing of UI components, copy, and user flows to find winning variations.",
            icon: Target
        },
        {
            title: "Data Analysis",
            desc: "Deep breakdown of engagement metrics, heatmaps, and session data for strategic planning.",
            icon: Activity
        }
    ]

    const experiments = [
        { title: "A/B Testing", desc: "Scientific testing of headings, CTAs, and layout variations." },
        { title: "User Behavior Tracking", desc: "Heatmap analysis and session recording to identify friction points." },
        { title: "Copy Optimization", desc: "Adjusting messaging based on behavioral data and user feedback." },
        { title: "Performance Monitoring", desc: "Ongoing speed optimization and script management." },
        { title: "Funnel Optimization", desc: "Ensuring capture points and automation remain effective." },
        { title: "Post-Conversion Optimization", desc: "Optimizing confirmation pages and referral hooks for better LTV." }
    ]

    const techStack = [
        { name: "PostHog", category: "Behavioral Analytics" },
        { name: "Google Analytics 4", category: "Revenue Tracking" },
        { name: "Sentry", category: "Stability Guard" },
        { name: "Vercel Edge", category: "Global Delivery" },
        { name: "Supabase", category: "Data Architecture" },
        { name: "Hotjar", category: "Thermal Mapping" }
    ]

    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-600/30 font-sans">
            <AdvancedNavigation />

            {/* Cinematic Hero */}
            <section className="pt-48 pb-24 relative overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.05]" />
                <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-orange-600/[0.03] rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-8"
                        >
                            <FlaskConical className="w-4 h-4 animate-pulse" /> Ongoing Optimization
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-tight">
                            Growth<br /><span className="text-orange-500">Retainer.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-16 max-w-3xl leading-relaxed">
                            Your <span className="text-white">permanent advantage</span>. We continuously optimize your conversion rates through ongoing testing and refinement.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-10 items-start md:items-center">
                            <Link href="#pricing">
                                <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm uppercase tracking-wider px-10 h-16 rounded-lg shadow-lg transition-all duration-300 group">
                                    View Plans
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <div className="flex flex-col gap-2 border-l-2 border-zinc-900 pl-8">
                                <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active Client Slots
                                </div>
                                <div className="text-3xl font-black text-white italic tracking-tighter">02 / 12 Remaining</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Data Section */}
            <section className="py-32 border-b border-zinc-900 bg-zinc-950/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 h-full opacity-[0.02] pointer-events-none">
                    <LineChart className="w-full h-full text-orange-600" />
                </div>
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5">
                            <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">Data-Driven Results</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
                                Winning<br /><span className="text-zinc-600">Variations.</span>
                            </h2>
                            <p className="text-lg text-zinc-400 font-medium leading-relaxed border-l-2 border-orange-500/30 pl-6 mb-10">
                                We eliminate guesswork through A/B testing. We find winning variations and scale your investment only where results are proven.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Avg Annual Lift</div>
                                    <div className="text-3xl font-black text-white tracking-tight">+124%</div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Test Frequency</div>
                                    <div className="text-3xl font-black text-white tracking-tight">Bi-Weekly</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-black border-2 border-zinc-900 p-12 relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.05] via-transparent to-transparent pointer-events-none" />

                            <div className="flex items-center justify-between mb-16 pb-8 border-b border-zinc-900">
                                <div className="flex items-center gap-6">
                                    <div className="w-4 h-4 rounded-full bg-orange-600 animate-pulse shadow-[0_0_15px_rgba(234,88,12,0.5)]" />
                                    <span className="text-[12px] font-mono font-black text-white uppercase tracking-[0.2em]">LAB_EXPERIMENT_09A</span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-[0.3em] bg-emerald-500/10 px-4 py-1 border border-emerald-500/20">99.9% Significance</span>
                            </div>

                            <div className="space-y-16">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">CONTROL_VERSION_A</span>
                                            <div className="text-sm font-black uppercase text-white">Current Landing Logic</div>
                                        </div>
                                        <span className="text-3xl font-black italic text-zinc-800 tracking-tighter">4.21%</span>
                                    </div>
                                    <div className="h-2.5 bg-zinc-950 w-full relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "42%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-zinc-900"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-widest animate-pulse">OPTIMIZED_VERSION_B</span>
                                            <div className="text-sm font-black uppercase text-white">Psychological Framing v2</div>
                                        </div>
                                        <span className="text-5xl font-black italic text-white tracking-tighter leading-none shadow-orange-600/20">11.84%</span>
                                    </div>
                                    <div className="h-5 bg-zinc-950 w-full relative overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                                            className="h-full bg-orange-600 shadow-[0_0_40px_rgba(234,88,12,0.3)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 flex items-center justify-between pt-12 border-t border-zinc-900">
                                <div className="flex gap-12">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase">Yield_Lift</span>
                                        <span className="text-2xl font-black text-emerald-500 italic tracking-tighter">+181.2%</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase">Detection_Time</span>
                                        <span className="text-2xl font-black text-white italic tracking-tighter">14 Days</span>
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono font-bold text-zinc-800 uppercase italic">Verification: Confirmed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Methodology */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="mb-24 text-center max-w-3xl mx-auto">
                        <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">Our Approach</div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            How We<br /><span className="text-zinc-600">Optimize.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {labProcesses.map((proc, i) => {
                            const Icon = proc.icon
                            return (
                                <div key={i} className="relative group p-10 border border-zinc-800 hover:border-orange-500/30 transition-all duration-300 bg-zinc-950/20 rounded-xl">
                                    <div className="w-16 h-16 border border-zinc-800 bg-black flex items-center justify-center mb-8 group-hover:bg-orange-500/5 transition-all duration-300 rounded-lg">
                                        <Icon className="w-8 h-8 text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{proc.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{proc.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-32 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="max-w-xl">
                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">What's Included</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Ongoing<br /><span className="text-zinc-600">Services.</span>
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-sm max-w-sm border-l-2 border-orange-500/30 pl-6">
                            Your retainer includes access to our full technical stack and dedicated engineering hours.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl rounded-xl">
                        {experiments.map((item, i) => (
                            <div key={i} className="bg-black p-10 hover:bg-zinc-950 transition-all duration-300 group relative">
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 bg-black border-b border-zinc-900">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-10">Tools We Use</h3>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-base font-bold text-white whitespace-nowrap">{tech.name}</span>
                                <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mt-1">{tech.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">Pricing</div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Choose Your<br /><span className="text-zinc-600">Plan.</span></h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {[
                            {
                                tier: "Growth",
                                price: "$2,500",
                                period: "/month",
                                desc: "For scaling brands targeting mid-figure monthly revenue.",
                                items: ["2 Major A/B Tests", "Monthly Strategy Report", "Unlimited Bug Fixes", "Daily Monitoring"]
                            },
                            {
                                tier: "Scale",
                                price: "$5,000",
                                period: "/month",
                                highlight: true,
                                desc: "For established businesses looking to dominate their market.",
                                items: ["4 Major A/B Tests", "Bi-Weekly Strategy Calls", "Full Copy Refinement", "Priority Support"]
                            },
                            {
                                tier: "Enterprise",
                                price: "Custom",
                                period: "",
                                desc: "For global businesses requiring dedicated support.",
                                items: ["Unlimited Testing", "Dedicated Architect", "Custom Integration", "24/7 Support"]
                            },
                        ].map((plan, i) => (
                            <div key={i} className={`p-10 border ${plan.highlight ? 'border-orange-500 bg-orange-500/5' : 'border-zinc-800 bg-black'} relative transition-all duration-300 hover:border-orange-500/50 rounded-xl`}>
                                {plan.highlight && (
                                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-bl-lg rounded-tr-xl">Most Popular</div>
                                )}
                                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">{plan.tier}</div>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <div className="text-5xl font-black text-white tracking-tight leading-none">{plan.price}</div>
                                    {plan.period && <div className="text-zinc-500 text-sm font-medium">{plan.period}</div>}
                                </div>
                                <p className="text-zinc-400 text-sm font-medium mb-8 leading-relaxed">{plan.desc}</p>

                                <ul className="space-y-4 mb-10 border-t border-zinc-800 pt-8">
                                    {plan.items.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm font-medium text-zinc-300">
                                            <div className="w-1.5 h-1.5 mt-2 bg-orange-500 rounded-full shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact?plan=retainer" className="block w-full">
                                    <Button className={`w-full h-14 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 ${plan.highlight ? 'bg-orange-500 text-white hover:bg-orange-400' : 'bg-white text-black hover:bg-orange-500 hover:text-white'}`}>
                                        Get Started
                                    </Button>
                                </Link>

                                <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col gap-2">
                                    <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Month-to-Month</div>
                                    <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Cancel Anytime</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing Quote */}
            <section className="py-32 bg-black relative border-t border-zinc-900">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-3xl md:text-5xl font-black tracking-tight max-w-4xl mx-auto leading-tight mb-8">
                        "Speed without <span className="text-orange-500">direction</span> is just chaos. We ensure every move you make is profitable."
                    </p>
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">— Principal Architect</div>
                </div>
            </section>

            <FAQSection category="audit" title="Retainer FAQs" />
            <Footer />
        </main>
    )
}
