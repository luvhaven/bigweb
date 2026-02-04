'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Crown, Award, Rocket, Target, Shield, Globe, Clock } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const benchmarks = [
  {
    category: 'Speed & Loading',
    baseline: 'Slow (6-8s)',
    method: 'Ultra-Fast (<2s)',
    impact: 'Lower Bounce Rate',
    baselineImpact: 'Customer Drop-off',
    icon: Rocket
  },
  {
    category: 'Conversion Design',
    baseline: 'Basic Templates',
    method: 'Custom Strategy',
    impact: '3x More Leads',
    baselineImpact: 'Leaked Revenue',
    icon: Target
  },
  {
    category: 'Security & Trust',
    baseline: 'Standard Setup',
    method: 'High-Level Security',
    impact: 'Protected Revenue',
    baselineImpact: 'Capital Risk',
    icon: Shield
  },
  {
    category: 'Speed to Market',
    baseline: '90-120 Days',
    method: '30-Day Launch',
    impact: 'Faster Results',
    baselineImpact: 'Market Lag',
    icon: Globe
  },
  {
    category: 'Business Growth',
    baseline: 'Cost Center',
    method: 'Profit Engine',
    impact: 'Proven ROI',
    baselineImpact: 'Wasted Capital',
    icon: Award
  }
]

export default function CompetitiveEdge() {
  const [activeTab, setActiveTab] = useState<'protocol' | 'baseline'>('protocol')

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden selection:bg-orange-500/30">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-[size:40px_40px]" />
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[9px] font-mono font-black uppercase tracking-[0.6em] mb-16"
          >
            Clinical_Comparison_Protocol_v.2026
          </motion.div>

          <h2 className="text-6xl md:text-[13rem] font-black mb-20 tracking-tighter-extreme uppercase italic leading-[0.7] text-white">
            Engineering <br /><span className="text-zinc-900 border-b-8 border-orange-600">vs. Guesswork.</span>
          </h2>

          <p className="text-2xl md:text-5xl text-zinc-500 font-black leading-none tracking-tighter-extreme max-w-6xl mx-auto uppercase">
            The industry standard is <span className="text-zinc-700 italic">Atrophy</span>. <br />The BIGWEB method is <span className="text-white italic">Dominance.</span>
          </p>
        </div>

        {/* The Benchmarking Monitor */}
        <div className="bg-black border border-white/5 p-6 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px] opacity-[0.03] pointer-events-none" />

          {/* Controls */}
          <div className="flex justify-center mb-24 relative z-10">
            <div className="flex bg-zinc-900 gap-px border border-zinc-900">
              <button
                onClick={() => setActiveTab('baseline')}
                className={`px-12 py-6 text-[10px] font-mono font-bold uppercase tracking-[0.4em] transition-all duration-300 ${activeTab === 'baseline' ? 'bg-orange-600 text-white' : 'bg-black text-zinc-600 hover:text-white'}`}
              >
                INDUSTRY_BASELINE
              </button>
              <button
                onClick={() => setActiveTab('protocol')}
                className={`px-12 py-6 text-[10px] font-mono font-bold uppercase tracking-[0.4em] transition-all duration-300 ${activeTab === 'protocol' ? 'bg-orange-600 text-white' : 'bg-black text-zinc-600 hover:text-white'}`}
              >
                BIGWEB_SYSTEM_v4
              </button>
            </div>
          </div>

          {/* Monitor Grid */}
          <div className="flex flex-col gap-px bg-zinc-900 border border-zinc-900 relative z-10">
            {benchmarks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group grid md:grid-cols-12 items-center bg-black p-10 transition-all duration-500 hover:bg-zinc-950`}
              >
                <div className="md:col-span-4 flex items-center gap-8">
                  <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-700 mb-1">{item.category}</h4>
                    <span className="text-xl font-black text-white uppercase tracking-tighter italic">0{i + 1}_METRIC</span>
                  </div>
                </div>

                <div className="md:col-span-4 mt-8 md:mt-0 px-12 border-l border-zinc-900">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-2"
                    >
                      <span className={`text-4xl font-black italic tracking-tighter uppercase leading-none block ${activeTab === 'protocol' ? 'text-white' : 'text-zinc-500'}`}>
                        {activeTab === 'protocol' ? item.method : item.baseline}
                      </span>
                      <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-700 uppercase">
                        Spec_Output
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="md:col-span-4 mt-8 md:mt-0 flex justify-end">
                  <div className={`px-10 py-8 border-l border-zinc-900 transition-all duration-700 w-full md:w-auto text-left ${activeTab === 'protocol' ? 'bg-zinc-950 border-orange-600/30' : 'bg-transparent opacity-20'}`}>
                    <div className={`text-4xl font-black tracking-tighter-extreme uppercase italic mb-2 leading-none ${activeTab === 'protocol' ? 'text-orange-600' : 'text-zinc-700'}`}>
                      {activeTab === 'protocol' ? item.impact : item.baselineImpact}
                    </div>
                    <div className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-zinc-800">Operational_Delta</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

