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
            id: "HP-01",
            title: "Hypothesis Injection",
            desc: "Weekly deployment of psychology-backed theories based on the latest conversion data and user behavior analysis.",
            icon: Brain
        },
        {
            id: "VT-02",
            title: "Multivariate Testing",
            desc: "Iterative testing of UI components, copy structures, and data flows to identify the 'Winning Delta' and eliminate profit leakage.",
            icon: Target
        },
        {
            id: "DA-03",
            title: "Forensic Data Analysis",
            desc: "Post-test clinical breakdown of engagement metrics, friction heatmaps, and session-intent scores for strategic planning.",
            icon: Activity
        }
    ]

    const experiments = [
        { label: "Lab_Unit_A", title: "Continuous A/B Deployment", desc: "Scientific testing of headings, CTAs, and layout variations to maximize yield." },
        { label: "Lab_Unit_B", title: "User Behavior Monitoring", desc: "Heatmap analysis and session recording to identify new friction nodes in real-time." },
        { label: "Lab_Unit_C", title: "Psychology Optimization", desc: "Adjusting copy triggers based on behavioral data and cognitive load mapping." },
        { label: "Lab_Unit_D", title: "Technical Edge Guard", desc: "Ongoing server-side optimization and script management to maintain zero-latency." },
        { label: "Lab_Unit_E", title: "Funnel Integrity Sync", desc: "Ensuring all capture points and automation sequences remain at peak efficiency." },
        { label: "Lab_Unit_F", title: "Post-Conversion Mining", desc: "Optimizing thank-you pages and referral hooks for maximum LTV expansion." }
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
                            className="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-12"
                        >
                            <FlaskConical className="w-4 h-4 animate-pulse" /> The_Conversion_Lab™_v5.4
                        </motion.div>

                        <h1 className="text-7xl md:text-[12rem] font-black mb-12 italic tracking-tighter uppercase leading-[0.7] font-sans">
                            Growth <br /><span className="text-orange-600">Retainer.</span>
                        </h1>

                        <p className="text-2xl md:text-5xl text-zinc-500 font-medium mb-20 max-w-5xl leading-[1.05] tracking-tight">
                            Your <span className="text-white italic">Permanent Advantage</span>. We treat your revenue as a technical variable, refining it through a continuous cycle of scientific experimentation and architectural hardening.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-12 items-start md:items-center">
                            <Link href="#pricing">
                                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.3em] px-16 h-24 rounded-none shadow-[0_0_100px_rgba(234,88,12,0.1)] transition-all duration-500 group">
                                    ACCESS THE LABORATORY
                                    <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-4 transition-transform" />
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

            {/* Live Data Simulation */}
            <section className="py-40 border-b border-zinc-900 bg-zinc-950/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 h-full opacity-[0.02] pointer-events-none">
                    <LineChart className="w-full h-full text-orange-600" />
                </div>
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-5">
                            <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.5em] mb-6">Live_Telemetry_Stream</div>
                            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-10">
                                The Winning <br /><span className="text-zinc-800">Delta.</span>
                            </h2>
                            <p className="text-xl text-zinc-500 font-medium leading-relaxed border-l-2 border-orange-600/30 pl-10 mb-12">
                                We eliminate guesswork via multivariate testing. This allows us to isolate winning variables and scale your investment only where conversion results are statistically guaranteed.
                            </p>
                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase mb-2">Avg_Annual_Yield</div>
                                    <div className="text-4xl font-black text-white italic tracking-tighter">+124%</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase mb-2">Test_Frequency</div>
                                    <div className="text-4xl font-black text-white italic tracking-tighter">Bi-Weekly</div>
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

            {/* The Lab Methodology */}
            <section className="py-40 bg-black">
                <div className="container mx-auto px-6">
                    <div className="mb-32 text-center max-w-4xl mx-auto">
                        <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.5em] mb-6">Scientific_Protocol</div>
                        <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] font-sans">
                            Lab <br /><span className="text-zinc-800">Methodology.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-16">
                        {labProcesses.map((proc, i) => {
                            const Icon = proc.icon
                            return (
                                <div key={i} className="relative group p-12 border border-zinc-900 hover:border-orange-500/30 transition-all duration-500 bg-zinc-950/20">
                                    <div className="text-[10px] font-mono font-bold text-zinc-800 mb-10 group-hover:text-orange-600 transition-colors">ID_RETAINER_{proc.id}</div>
                                    <div className="w-20 h-20 border border-zinc-900 bg-black flex items-center justify-center mb-10 group-hover:bg-orange-600/5 group-hover:rotate-12 transition-all duration-500">
                                        <Icon className="w-10 h-10 text-zinc-600 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none">{proc.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed font-normal">{proc.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Integrated Lab Units Grid */}
            <section className="py-40 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-2xl">
                            <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em] mb-6">Continuous_Operations</div>
                            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]">
                                Managed <br /><span className="text-zinc-800">Variables.</span>
                            </h2>
                        </div>
                        <p className="text-zinc-500 text-sm max-w-sm border-l-2 border-orange-600/30 pl-8 mb-4">
                            Your retainer includes full access to our technical stack and dedicated engineering hours for rapid hypothesis deployment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden shadow-2xl">
                        {experiments.map((item, i) => (
                            <div key={i} className="bg-black p-16 hover:bg-zinc-950 transition-all duration-500 group relative">
                                <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-[0.2em] block mb-10">{item.label}</span>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed font-normal">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lab Tech Stack */}
            <section className="py-32 bg-black border-b border-zinc-900">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-[0.4em] mb-12">Instrumentation_Stack</h3>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:opacity-100 transition-all duration-700">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-lg font-black italic uppercase tracking-tighter text-white whitespace-nowrap">{tech.name}</span>
                                <span className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-widest mt-1">{tech.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Tiers (Industrial Style) - Consistent with $2,500/mo */}
            <section id="pricing" className="py-48 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-32">
                        <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.5em] mb-6">Investment_Requirement</div>
                        <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase mb-4 leading-[0.8] font-sans">The Lab <br /><span className="text-zinc-800">Access.</span></h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                tier: "Growth",
                                price: "$2,500",
                                period: "/month",
                                desc: "For scaling brands targeting mid-figure monthly revenue with high-velocity data needs.",
                                items: ["2 Major A/B Experiments", "Monthly Lab Strategy Report", "Unlimited Performance Bugfixes", "Daily Anomaly Monitoring"]
                            },
                            {
                                tier: "Scale",
                                price: "$5,000",
                                period: "/month",
                                highlight: true,
                                desc: "For established industry leaders looking to dominate market share through intense technical refinement.",
                                items: ["4 Major A/B Experiments", "Bi-Weekly Strategy Ops Syncs", "Full Psychology Copy Refinement", "Priority Infrastructure Scaling"]
                            },
                            {
                                tier: "Enterprise",
                                price: "Custom",
                                period: "",
                                desc: "For global transactional ecosystems requiring 24/7 dedicated engineering pods and sdk integration.",
                                items: ["Unlimited Lab Experimentation", "Dedicated Lead Architect Access", "Custom Telemetry Integration", "Global Edge Recovery Mesh"]
                            },
                        ].map((plan, i) => (
                            <div key={i} className={`p-16 border-2 ${plan.highlight ? 'border-orange-600 bg-orange-600/5' : 'border-zinc-900 bg-black'} relative transition-all duration-500 hover:border-orange-500/50`}>
                                {plan.highlight && (
                                    <div className="absolute top-0 right-0 px-8 py-2.5 bg-orange-600 text-white font-mono font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">ELITE_PERFORMANCE_PICK</div>
                                )}
                                <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em] mb-4">{plan.tier}_Protocol</div>
                                <div className="flex items-baseline gap-4 mb-8">
                                    <div className="text-7xl font-black text-white italic tracking-tighter leading-none">{plan.price}</div>
                                    {plan.period && <div className="text-zinc-600 font-mono text-xs uppercase font-bold">{plan.period}</div>}
                                </div>
                                <p className="text-zinc-500 text-sm font-medium mb-12 leading-relaxed h-12 overflow-hidden">{plan.desc}</p>

                                <ul className="space-y-6 mb-16 border-t border-zinc-900 pt-12">
                                    {plan.items.map((item, idx) => (
                                        <li key={idx} className="flex gap-4 text-xs font-black text-zinc-300 uppercase italic tracking-tight leading-none group">
                                            <div className="w-2 h-2 bg-orange-600 mt-1 shrink-0 shadow-[0_0_10px_rgba(234,88,12,0.4)]" /> {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact?plan=retainer" className="block w-full">
                                    <Button className={`w-full h-24 rounded-none font-black text-sm uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl ${plan.highlight ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-white text-black hover:bg-orange-600 hover:text-white'}`}>
                                        ORDER LAB ACCESS
                                    </Button>
                                </Link>

                                <div className="mt-12 pt-10 border-t border-zinc-900/50 flex flex-col gap-3">
                                    <div className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-[0.3em]">Contract: Month-to-Month Stability</div>
                                    <div className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-[0.3em]">Infrastructure: Managed Edge Bundle</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing High-Vis Quote */}
            <section className="py-48 bg-black relative border-t border-zinc-900">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase max-w-7xl mx-auto leading-[0.8] mb-12 font-sans">
                        "Speed is zero if <span className="text-orange-600">Direction</span> is wrong. The Lab ensures every move you make is Profitable."
                    </p>
                    <div className="text-[12px] font-mono font-bold text-zinc-700 uppercase tracking-[0.5em] mt-12">— PRINCIPAL ARCHITECT // THE CONVERSION LAB™</div>
                </div>
            </section>

            <FAQSection category="audit" title="Retainer FAQs" />
            <Footer />
        </main>
    )
}
