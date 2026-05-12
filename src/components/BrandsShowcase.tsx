'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const brands = [
  { name: 'Fortune 500', category: 'Enterprise', index: 0 },
  { name: 'Y Combinator', category: 'Startups', index: 1 },
  { name: 'Forbes 100', category: 'Media', index: 2 },
  { name: 'TechCrunch', category: 'Technology', index: 3 },
  { name: 'Sequoia', category: 'VC Firms', index: 4 },
  { name: 'Andreessen', category: 'Investment', index: 5 },
  { name: 'Goldman Sachs', category: 'Finance', index: 6 },
  { name: 'McKinsey', category: 'Consulting', index: 7 },
]

const BrandsShowcase = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-[#020202]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 65% 55% at 50% 30%, rgba(255,255,255,0.016) 0%, transparent 70%)',
          }}
        />
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
        {/* ── Heading ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-7"
          >
            <span className="flex-1 max-w-[60px] h-px bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">
              Elite Partnerships
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
            Powering the World&apos;s
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.38) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Most Ambitious Brands
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed tracking-wide"
          >
            From Fortune 500 enterprises to Y Combinator startups, we partner with visionaries who demand excellence.
          </motion.p>
        </div>

        {/* ── Brand grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.38 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-2xl p-7 overflow-hidden cursor-default flex flex-col items-center justify-center text-center"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,255,255,0.06), transparent)',
                }}
              />
              {/* Shimmer edge */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ border: '1px solid rgba(255,255,255,0.14)' }}
              />

              <div className="text-xl md:text-2xl font-black text-white tracking-tight mb-2 group-hover:text-white transition-colors duration-300 relative z-10">
                {brand.name}
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500 relative z-10">
                {brand.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
    </section>
  )
}

export default BrandsShowcase
