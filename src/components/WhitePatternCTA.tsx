'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PhysicsReveal } from '@/components/ui/PhysicsReveal'
import Link from 'next/link'

export default function WhitePatternCTA() {
  return (
    <section className="relative py-48 bg-black overflow-hidden border-t border-b border-zinc-900">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <PhysicsReveal
            className="w-full"
            revealSize={400}
            dampening={25}
            cover={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center p-20 bg-black border border-zinc-900 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

                {/* Top Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-10"
                >
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
                    System_Expansion_Available
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-12"
                >
                  Deploy <br />
                  <span className="text-zinc-800">New Logic.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-3xl mx-auto leading-relaxed font-mono"
                >
                  Join 500+ operational nodes. Initialize consultation to upgrade your digital infrastructure.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap items-center justify-center gap-6"
                >
                  <Link href="/offers/diagnostic">
                    <Button
                      size="xl"
                      className="h-20 px-12 bg-white text-black hover:bg-orange-600 hover:text-white border border-transparent hover:border-orange-600 text-xs font-black uppercase tracking-[0.3em] rounded-none shadow-none transition-all group"
                    >
                      Start_System_Audit
                      <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      size="xl"
                      variant="outline"
                      className="h-20 px-12 bg-black text-white border-zinc-800 hover:bg-zinc-900 text-xs font-black uppercase tracking-[0.3em] rounded-none transition-all"
                    >
                      Schedule_Uplink
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-16 flex flex-wrap items-center justify-center gap-12 text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-emerald-500" />
                    <span>Zero_Cost_Consultation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-emerald-500" />
                    <span>No_Commitment_Required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-emerald-500" />
                    <span>Guarantee_Protocol_Active</span>
                  </div>
                </motion.div>
              </motion.div>
            }
          >
            {/* REVEALED CONTENT (Neural Pattern) */}
            <div className="text-center p-20 bg-zinc-950 border border-orange-600/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-orange-600/10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:10px_10px] opacity-[0.2]" />

              <div className="relative z-10">
                <h2 className="text-5xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-12">
                  <span className="text-orange-500">OPTIMIZE</span> <br />
                  <span className="text-white">EVERY NODE.</span>
                </h2>

                <div className="flex justify-center gap-4 mb-8">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1 h-8 bg-orange-600/30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>

                <p className="text-orange-500 font-mono text-sm uppercase tracking-[0.5em] font-bold">Protocol_Override_Success</p>
              </div>
            </div>
          </PhysicsReveal>
        </div>
      </div>
    </section>
  )
}
