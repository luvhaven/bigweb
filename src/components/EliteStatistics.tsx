'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { TrendingUp, Users, Award, Zap } from 'lucide-react'

interface Stat {
  icon: typeof TrendingUp
  value: number
  suffix: string
  label: string
  prefix?: string
  color: string
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Clients Worldwide',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Award,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: TrendingUp,
    value: 3.2,
    suffix: 'x',
    label: 'Average ROI Increase',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Zap,
    value: 24,
    suffix: '/7',
    label: 'Support Available',
    color: 'from-purple-500 to-pink-500'
  }
]

function Counter({ value, suffix, prefix = '' }: { value: number, suffix: string, prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(value % 1 === 0 ? 0 : 1)}${suffix}`
      }
    })
  }, [springValue, suffix, prefix, value])

  return <span ref={ref} />
}

export default function EliteStatistics() {
  return (
    <section className="py-32 relative overflow-hidden bg-black border-t border-b border-zinc-900">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-10">
            <Award className="w-5 h-5 text-orange-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
              Operational_Yield_v2
            </span>
          </div>
          <h2 className="text-5xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-10">
            Performance <br />
            <span className="text-zinc-800">Metrics.</span>
          </h2>
          <p className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto uppercase tracking-wide">
            Quantifiable capital extraction across global vectors.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="relative group h-full"
              >
                {/* Card */}
                <div className="bg-black border-l border-zinc-900 h-full flex flex-col items-center text-center p-12 relative overflow-hidden group-hover:bg-zinc-950 transition-all duration-500">
                  {/* Top Border Indicator */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900 group-hover:bg-orange-600 transition-colors duration-500" />

                  {/* Icon */}
                  <div className="mb-8 p-4 bg-zinc-950 border border-zinc-900 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-zinc-600 group-hover:text-orange-600 transition-colors duration-300" />
                  </div>

                  {/* Counter */}
                  <div className="text-5xl md:text-7xl font-black mb-4 text-white italic tracking-tighter">
                    <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>

                  {/* Label */}
                  <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] group-hover:text-zinc-400 transition-colors">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-500 animate-pulse" />
            <span>Telemetry_Stream: ACTIVE</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
