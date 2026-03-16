'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface SectionBridgeProps {
  /** top color (the section above) */
  fromColor?: string
  /** bottom color (the section below)  */
  toColor?: string
  /** which ambient style to show */
  variant?: 'gold' | 'emerald' | 'indigo' | 'neutral' | 'none'
  /** optional floating label */
  label?: string
  /** flip so it curves upward */
  flip?: boolean
  className?: string
}

const VARIANTS = {
  gold:    'rgba(212,168,83,',
  emerald: 'rgba(16,185,129,',
  indigo:  'rgba(99,102,241,',
  neutral: 'rgba(255,255,255,',
  none:    '',
}

export default function SectionBridge({
  fromColor = '#040404',
  toColor = '#060606',
  variant = 'gold',
  label,
  flip = false,
  className = '',
}: SectionBridgeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%'])
  const orbO = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0])

  const c = VARIANTS[variant] || ''

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height: '120px', background: `linear-gradient(to bottom, ${fromColor}, ${toColor})` }}
      aria-hidden
    >
      {/* Parallax orb */}
      {variant !== 'none' && (
        <motion.div
          style={{ x: orbX, opacity: orbO }}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[80px]"
          aria-hidden
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: `radial-gradient(ellipse, ${c}0.07) 0%, transparent 70%)` }}
          />
        </motion.div>
      )}

      {/* Horizontal hairline glow */}
      <div
        className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
        style={{
          background: variant !== 'none'
            ? `linear-gradient(90deg, transparent 0%, ${c}0.2) 20%, ${c}0.35) 50%, ${c}0.2) 80%, transparent 100%)`
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
        }}
      />

      {/* Optional label */}
      {label && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-700 bg-[#050505] px-3 py-1 rounded-full border border-white/[0.04] whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  )
}
