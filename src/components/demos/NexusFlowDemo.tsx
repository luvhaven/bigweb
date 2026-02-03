'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity,
    Users,
    BarChart3,
    ArrowUpRight,
    Check,
    Zap,
    LayoutPanelLeft,
    PieChart,
    MousePointer2,
    ShieldCheck
} from 'lucide-react'

const NexusFlowDemo = () => {
    const [selectedTier, setSelectedTier] = useState('scale')
    const [conversionRate, setConversionRate] = useState(2.4)
    const [isHovered, setIsHovered] = useState<string | null>(null)

    // Simulate live conversion updates
    useEffect(() => {
        const interval = setInterval(() => {
            setConversionRate(prev => {
                const change = (Math.random() - 0.45) * 0.1
                return +(prev + change).toFixed(2)
            })
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const tiers = [
        { id: 'starter', name: 'Starter', price: '$49', conversions: 'Up to 1k', color: '#6366f1' },
        { id: 'scale', name: 'Scale', price: '$199', conversions: 'Up to 10k', color: '#a855f7', recommended: true },
        { id: 'pro', name: 'Pro', price: '$499', conversions: 'Unlimited', color: '#ec4899' }
    ]

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans selection:bg-purple-500/30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-[#050505] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
            >
                {/* 1. Dashboard Header */}
                <div className="border-b border-white/5 bg-white/[0.02] px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-white uppercase tracking-widest">Nexus_Flow</h2>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Conversion_Engine_v2.0</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xl font-black text-white italic">{conversionRate}%</span>
                            </div>
                            <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">Global_CVR</span>
                        </div>
                        <div className="h-10 w-px bg-white/5" />
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover grayscale" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Main Content Grid */}
                <div className="grid lg:grid-cols-12 h-[500px]">
                    {/* Left: Interactive Funnel Visualization */}
                    <div className="lg:col-span-7 border-r border-white/5 p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">Funnel_Metrics</h3>
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 font-medium">Real-Time Data</div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'TRAFFIC', value: '124,502', width: '100%', color: 'white/20' },
                                { label: 'ENGAGEMENT', value: '42,105', width: '65%', color: 'purple-500/40' },
                                { label: 'CHECKOUT', value: '8,421', width: '35%', color: 'purple-500/60' },
                                { label: 'REVENUE', value: '3,105', width: '15%', color: 'purple-500' },
                            ].map((step, i) => (
                                <div
                                    key={step.label}
                                    className="group cursor-pointer"
                                    onMouseEnter={() => setIsHovered(step.label)}
                                    onMouseLeave={() => setIsHovered(null)}
                                >
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] font-black text-white/40 tracking-widest">{step.label}</span>
                                        <span className={`text-sm font-black transition-colors ${isHovered === step.label ? 'text-purple-400' : 'text-white/80'}`}>{step.value}</span>
                                    </div>
                                    <div className="h-4 bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: step.width }}
                                            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                                            className={`h-full bg-gradient-to-r from-transparent to-purple-500 relative`}
                                        >
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Predicted_Lift</h4>
                                    <div className="text-3xl font-black text-white italic">+127%</div>
                                </div>
                                <div className="p-3 bg-purple-500/20 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-purple-400" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </div>
                    </div>

                    {/* Right: Pricing Matrix Re-Engineered */}
                    <div className="lg:col-span-5 bg-white/[0.01] p-8 flex flex-col justify-between">
                        <div>
                            <div className="mb-8">
                                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-2">Pricing_Engine_v2</h3>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Optimized for choice paralysis</p>
                            </div>

                            <div className="space-y-3">
                                {tiers.map((tier) => (
                                    <motion.div
                                        key={tier.id}
                                        onClick={() => setSelectedTier(tier.id)}
                                        whileHover={{ x: 10 }}
                                        className={`relative p-5 rounded-2xl border transition-all cursor-pointer group ${selectedTier === tier.id
                                                ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
                                                : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${selectedTier === tier.id ? 'bg-purple-500 animate-pulse' : 'bg-white/20'}`} />
                                                <div>
                                                    <div className="text-sm font-black text-white uppercase tracking-widest mb-1">
                                                        {tier.name}
                                                        {tier.recommended && <span className="ml-2 text-[8px] bg-purple-500 text-white px-1.5 py-0.5 rounded italic">REC</span>}
                                                    </div>
                                                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{tier.conversions} Conversions</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black text-white">{tier.price}</div>
                                                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Per_Month</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-500 hover:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-95 group">
                                Start Your Test
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            <p className="text-center mt-4 text-[8px] text-white/20 font-black uppercase tracking-widest">No_Credit_Card_Required_•_Lab_Verified</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const TrendingUp = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 6H23V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default NexusFlowDemo
