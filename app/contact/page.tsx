'use client'

import React from 'react'
import { motion } from 'framer-motion'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
import { Mail, Phone, MapPin, Clock, FlaskConical, Lock, Activity, Binary, Target, ArrowRight, CheckCircle2 } from 'lucide-react'


import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || ''
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
              <Lock className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                Secure Line: Get Started
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">
              Secure<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-zinc-700">Your Growth.</span>
            </h1>

            <p className="text-xl md:text-3xl text-zinc-400 leading-tight max-w-3xl mx-auto mb-16 font-light">
              Whether you need a <strong className="text-white font-black italic underline decoration-orange-600 underline-offset-8">forensic audit</strong> or a full logic rebuild,
              our engineers are ready to process your request.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-40 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Info Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Contact Card */}
              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-transparent pointer-events-none" />
                <h3 className="text-2xl font-black mb-10 uppercase italic tracking-tighter">Communication Nodes</h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group/link">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/link:bg-orange-600 group-hover/link:text-white transition-all duration-500">
                      <Mail className="w-6 h-6 text-orange-500 group-hover/link:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Electronic Data</p>
                      <a href="mailto:hello@conversionlab.com" className="text-lg font-bold hover:text-orange-500 transition-colors">
                        lab@bigweb.digital
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group/link">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/link:bg-orange-600 group-hover/link:text-white transition-all duration-500">
                      <Phone className="w-6 h-6 text-orange-500 group-hover/link:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Direct Audio</p>
                      <a href="tel:+1234567890" className="text-lg font-bold hover:text-orange-500 transition-colors">
                        +1 (800) CONVERT
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Facility Location</p>
                      <p className="text-zinc-400 font-medium">Remote-First Lab<br />Global Jurisdiction Coverage</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Response Cadence</p>
                      <p className="text-zinc-400 font-medium">100ms Ping Latency<br />Human Reply &lt; 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Card */}
              <div className="p-8 rounded-[3rem] border border-white/5 bg-white/[0.01] overflow-hidden group">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 mb-6">Start My Audit</h3>
                <Link
                  href="/estimator"
                  className="block p-8 rounded-[2rem] bg-orange-600/10 border border-orange-500/20 hover:border-orange-500/40 transition-all group/action shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-black text-white italic uppercase">Run Audit</span>
                    <ArrowRight className="w-5 h-5 text-orange-500 group-hover/action:translate-x-2 transition-transform" />
                  </div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Identify Revenue Leakage Targets</p>
                </Link>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="p-12 md:p-16 rounded-[4rem] bg-[#0A0A0A] border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <ContactForm
                    type="contact"
                    title="Submit Case Data"
                    description="Inform us about your conversion bottlenecks and friction nodes. We build systems that solve them."
                    defaultOffer={plan}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Overlay */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto rounded-[3.5rem] bg-[#0A0A0A] border border-white/10 p-16 md:p-24 text-center overflow-hidden relative group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:30px_30px]" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-10"
              >
                <Lock className="w-4 h-4" /> Confidential Strategy
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 uppercase italic leading-[0.9]">
                Secure Your<br /><span className="text-orange-500">Audit</span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-500 mb-16 font-medium leading-relaxed">
                Not ready for a full build? Get started with our <strong className="text-white italic">forensic conversion audit</strong> to identify exactly which machine will provide the highest yield today.
              </p>

              <Link href="/estimator">
                <Button size="xl" className="h-24 px-16 rounded-[2rem] bg-orange-600 text-white hover:bg-orange-500 font-black text-2xl uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(249,115,22,0.3)] transition-all hover:scale-105 active:scale-95">
                  Start My Audit
                </Button>
              </Link>

              <div className="flex flex-wrap justify-center gap-8 items-center mt-12 opacity-40">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Forensic Audit</div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Lab Access</div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Global Scale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
