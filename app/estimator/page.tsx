'use client'

import React from 'react'
import { motion } from 'framer-motion'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import AIProjectEstimator from '@/components/AIProjectEstimator'
import { FlaskConical, Target, Activity, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function EstimatorPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
      <AdvancedNavigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden bg-gradient-mesh">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-orange-500/20 mb-12 shadow-[0_0_30px_rgba(249,115,22,0.1)]"
            >
              <FlaskConical className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                The Forensic Growth Method
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">
              Revenue<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-zinc-700">Audit.</span>
            </h1>

            <p className="text-xl md:text-3xl text-zinc-400 leading-tight max-w-4xl mx-auto mb-16 font-light">
              Calculate your potential yield and identify <strong className="text-white font-black italic underline decoration-orange-600 underline-offset-8">revenue leakage targets</strong>.
              Our industrial algorithm processes your case data to blueprint your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Estimator Engine */}
      <section className="pb-40 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto rounded-[4rem] bg-[#0A0A0A] border border-white/10 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:30px_30px]" />

            <div className="relative z-10 p-4 md:p-12">
              <AIProjectEstimator mode="full" />
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Steps */}
      <section className="py-40 border-t border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">The Audit <span className="text-orange-600">Cycle</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Data Ingestion", desc: "Submit your core business metrics and current digital performance data for forensic analysis.", icon: Activity },
              { step: "02", title: "Leakage Audit", desc: "Our algorithm identifies high-friction nodes and identifies where capital is escaping your funnel.", icon: Target },
              { step: "03", title: "Growth Blueprint", desc: "Receive a clinical roadmap for implementation, tailored to maximize your specific yield.", icon: Lock },
            ].map((item, i) => (
              <div key={i} className="p-12 rounded-[3.5rem] bg-black border border-white/5 relative group hover:border-orange-500/30 transition-all duration-500">
                <div className="absolute top-8 right-8 text-6xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors italic">
                  {item.step}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-10 border border-orange-500/20">
                  <item.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-black mb-6 uppercase italic leading-none">{item.title}</h3>
                <p className="text-zinc-500 font-medium text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Trust */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">Clinical <span className="text-zinc-600">Integrity</span></h2>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-50">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="w-5 h-5 text-orange-500" /> 100% Secure Data</div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="w-5 h-5 text-orange-500" /> Professional Audit</div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="w-5 h-5 text-orange-500" /> Actionable Yield</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
