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
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />

      {/* Gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-sophisticated" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-6">
            <Award className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Proven Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-luxury">
            The Numbers Speak for{' '}
            <span className="gradient-text-luxury">Themselves</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Trusted by industry leaders and innovative startups worldwide
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                className="relative group"
              >
                {/* Card */}
                <div className="glass-card h-full flex flex-col items-center text-center p-8 relative overflow-hidden hover:border-accent/30 transition-all duration-500">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
                    whileHover={{ opacity: 0.08 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 relative`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-white" />

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} blur-xl opacity-40`}
                      whileHover={{ opacity: 0.7, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Counter */}
                  <div className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>

                  {/* Label */}
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: 'easeInOut'
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-accent/50" />
            <span>Updated in real-time</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
