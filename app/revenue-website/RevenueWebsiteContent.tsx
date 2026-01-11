'use client'

import { useState } from 'react';
import { ArrowRight, BarChart, DollarSign, Zap, TrendingUp, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

import LeadCaptureModal from '@/components/modals/LeadCaptureModal';

export default function RevenueWebsiteContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-emerald-500/30">


            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Build My Revenue Engine"
                description="Apply for a Revenue Website Transformation. Limited spots for January delivery."
                ctaText="Start Application"
                triggerType="consultation"
            />

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            {/* Sticky Top Bar */}
            <div className="bg-gradient-to-r from-emerald-950/90 to-green-950/90 backdrop-blur-md py-3 text-center sticky top-0 z-50 border-b border-white/5">
                <p className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold tracking-wide text-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                    URGENT: LAST SPOT FOR JANUARY DELIVERY
                </p>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
                        <TrendingUp className="w-4 h-4" />
                        <span>ROI-First Development</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
                        Turn Clicks Into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 animate-gradient-x">Cash Flow.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Most websites are digital brochures. We build
                        <span className="text-white font-bold decoration-emerald-500/30 underline decoration-2 underline-offset-4 mx-2">profit-generating assets</span>
                        engineered to convert cold traffic into high-value clients on autopilot.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="h-20 px-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white rounded-full font-bold text-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all flex items-center gap-3"
                        >
                            Build My Revenue Engine
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-16 mb-32 rounded-3xl"
                >
                    {[
                        { label: "Avg. ROI", val: "420%", icon: TrendingUp },
                        { label: "Conversion Lift", val: "+150%", icon: Target },
                        { label: "Launch Time", val: "14 Days", icon: Rocket },
                        { label: "Client Revenue", val: "$50M+", icon: DollarSign }
                    ].map((stat, i) => (
                        <div key={i} className="group cursor-default relative">
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <stat.icon className="w-8 h-8 text-emerald-500/50 mx-auto mb-4 group-hover:text-emerald-400 transition-colors" />
                                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300">{stat.val}</div>
                                <div className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest font-bold group-hover:text-emerald-400/70 transition-colors">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Comparison Section */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-10 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm text-left relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-3xl font-bold mb-8 text-zinc-300 relative z-10">The "Pretty Website" Trap</h3>
                        <ul className="space-y-6 text-zinc-400 relative z-10">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500">✕</div>
                                <span className="text-lg">Focuses on "brand awareness" not <span className="text-white font-semibold">sales</span></span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500">✕</div>
                                <span className="text-lg">Confusing navigation loses <span className="text-white font-semibold">60% of visitors</span></span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500">✕</div>
                                <span className="text-lg">Requires <span className="text-white font-semibold">you</span> to do all the selling</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-10 rounded-[2.5rem] bg-gradient-to-b from-emerald-950/30 to-zinc-900/30 border border-emerald-500/30 backdrop-blur-sm text-left relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 px-6 py-2 bg-emerald-500 text-black font-bold text-xs tracking-widest rounded-bl-2xl">OUR WAY</div>
                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <h3 className="text-3xl font-bold mb-8 text-white relative z-10 flex items-center gap-3">
                            The Revenue System
                            <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                        </h3>
                        <ul className="space-y-6 text-zinc-200 relative z-10">
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">✓</div>
                                <span className="text-lg">Psychologically triggered <span className="text-emerald-400 font-bold">value stacking</span></span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">✓</div>
                                <span className="text-lg">Automated follow-up & <span className="text-emerald-400 font-bold">lead nurturing</span></span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">✓</div>
                                <span className="text-lg">Designed to generate <span className="text-emerald-400 font-bold">cash</span>, not just likes</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
