'use client'

import { useState } from 'react';
import { ArrowRight, Lock, Check, Zap, Bot, Brain, Globe, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

import LeadCaptureModal from '@/components/modals/LeadCaptureModal';

export default function AIBoostLandingPageContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-purple-500/30">


            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Clone My AI Sales Agent"
                description="Get full access to the AI agent architecture that processes 1,000+ leads simultaneously."
                ctaText="Get Instant Access"
            />

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            {/* Sticky Top Bar */}
            <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-md py-3 text-center sticky top-0 z-50 border-b border-white/5">
                <p className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold tracking-wide uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                    AI-Boost Status: <span className="text-emerald-400">Live & Processing Leads</span>
                </p>
            </div>

            <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8"
                    >
                        <Bot className="w-4 h-4" />
                        <span>Next-Gen Sales Automation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
                    >
                        Replace Your Sales Team With <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x">
                            One AI Agent.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        24/7 Support. Instant Replies. Unlimited Scale. <br />
                        The employee that never sleeps, never complains, and costs pennies on the dollar.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="h-14 px-8 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
                        >
                            <span>Clone My Sales Agent</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
                            className="h-14 px-8 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span>See How It Works</span>
                        </button>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-32">
                    {[
                        { icon: Zap, color: "text-amber-400", title: "Zero Wait Times", desc: "Responds in 0.2s, qualifying leads 24/7/365." },
                        { icon: Brain, color: "text-purple-400", title: "Perfect Memory", desc: "Remembers every conversation, preference, and detail." },
                        { icon: Globe, color: "text-cyan-400", title: "Omnichannel", desc: "Works on Web, WhatsApp, Instagram, and SMS instantly." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-purple-500/30 transition-all hover:bg-zinc-800/50 hover:shadow-2xl hover:shadow-purple-900/20"
                        >
                            <div className={`w-14 h-14 bg-white/5 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing / Offer Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-indigo-950 via-purple-950/20 to-black border border-white/10 relative overflow-hidden p-12 md:p-20 text-center"
                >
                    <div className="absolute inset-0 bg-grid-white/[0.03]" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Stop Leaving Money on the Table</h2>
                        <p className="text-2xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light">
                            Every second a visitor waits is a lost sale. Our AI Agent captures <span className="text-white font-bold">99% of leads</span> instantly.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
                            <div className="text-left">
                                <div className="text-zinc-500 text-sm uppercase tracking-wider mb-1">Standard Cost</div>
                                <div className="text-2xl line-through text-red-400/70">$50,000/yr</div>
                            </div>
                            <div className="h-12 w-px bg-white/10 hidden md:block" />
                            <div className="text-left">
                                <div className="text-purple-400 text-sm uppercase tracking-wider mb-1 font-bold">AI Agent Cost</div>
                                <div className="text-6xl font-black text-white">$4,997<span className="text-2xl text-zinc-500 font-normal">/setup</span></div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="h-20 px-16 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full text-white font-bold text-xl shadow-[0_0_50px_-10px_rgba(147,51,234,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_70px_-10px_rgba(147,51,234,0.7)]"
                        >
                            Deploy My AI Agent Now
                        </button>
                        <p className="mt-6 text-zinc-500 text-sm">
                            Limited availability for new clients. <span className="text-purple-400 hover:underline cursor-pointer">Book a demo call</span> if unsure.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
