'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Zap, Award, Users } from 'lucide-react'

const stats = [
  { icon: TrendingUp, value: '$120M+', label: 'Client Revenue Generated' },
  { icon: Zap, value: '98%', label: 'Conversion Lift (Avg)' },
  { icon: Award, value: '142+', label: 'Audit Reports Delivered' },
  { icon: Users, value: '250+', label: 'High-Growth Founders' },
]

export default function WhitePatternSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-[#020202]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* ── Radial depth background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255,255,255,0.018) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
                        `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* ── Heading block ── */}
        <div className="text-center mb-20">
          {/* Eye-brow */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-7"
          >
            <span className="flex-1 max-w-[60px] h-px bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">
              Proven Impact
            </span>
            <span className="flex-1 max-w-[60px] h-px bg-gradient-to-l from-transparent to-white/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[0.95] text-white mb-6"
            style={{ textShadow: '0 0 80px rgba(255,255,255,0.07)' }}
          >
            Trusted by
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.38) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Industry Leaders
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed tracking-wide"
          >
            Join hundreds of successful companies who have transformed their digital presence with our expertise.
          </motion.p>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.38 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative rounded-2xl p-7 overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Inner top glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.05), transparent)',
                  }}
                />
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.06), transparent 70%)',
                  }}
                />

                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-500" />
                </div>

                <div className="text-4xl font-black text-white tracking-tight mb-1" style={{ fontFeatureSettings: '"tnum"' }}>
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-500 leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
    </section>
  )
}
