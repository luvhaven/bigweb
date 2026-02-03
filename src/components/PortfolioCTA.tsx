'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function PortfolioCTA() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section ref={containerRef} className="relative py-48 overflow-hidden bg-black border-t border-zinc-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 shadow-2xl">
              <span className="w-2 h-2 bg-orange-600 animate-pulse" />
              <span className="text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-[0.4em]">
                System_Ready_State
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-[10rem] font-black text-center mb-16 leading-[0.8] italic tracking-tighter uppercase text-white"
          >
            Deploy <br />
            <span className="text-zinc-800">Your Vision.</span>
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-8 justify-center mb-24"
          >
            <Link href="/offers/diagnostic">
              <Button size="lg" className="h-24 px-12 bg-orange-600 hover:bg-orange-500 text-white border-0 rounded-none text-sm font-black uppercase tracking-[0.4em] transition-all duration-300">
                INITIATE_DIAGNOSTIC
                <ArrowRight className="ml-4 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-24 px-12 bg-transparent border border-zinc-800 text-white hover:bg-white hover:text-black rounded-none text-sm font-black uppercase tracking-[0.4em] transition-all duration-300">
                SCHEDULE_BRIEFING
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-900"
          >
            {[
              { value: '500+', label: 'Systems_Deployed' },
              { value: '98%', label: 'Client_Retention' },
              { value: '3.2x', label: 'Yield_Delta' },
              { value: '24/7', label: 'Monitor_Status' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="text-center py-12 border-b border-r border-zinc-900 last:border-r-0"
              >
                <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4 group-hover:text-orange-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
