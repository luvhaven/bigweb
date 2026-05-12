'use client'

import { motion } from 'framer-motion'

interface PremiumBackgroundProps {
  variant?: 'mesh' | 'gradient' | 'particles' | 'waves'
  intensity?: 'subtle' | 'medium' | 'bold'
}

export default function PremiumBackground({ variant = 'mesh', intensity = 'medium' }: PremiumBackgroundProps) {
  const intensityMap = {
    subtle: 0.4,
    medium: 0.6,
    bold: 0.8
  }

  if (variant === 'mesh') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient mesh */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 27% 37%, hsla(16, 100%, 60%, ${intensityMap[intensity] * 0.15}) 0px, transparent 50%),
              radial-gradient(at 97% 21%, hsla(27, 100%, 55%, ${intensityMap[intensity] * 0.1}) 0px, transparent 50%),
              radial-gradient(at 52% 99%, hsla(16, 85%, 50%, ${intensityMap[intensity] * 0.12}) 0px, transparent 50%),
              radial-gradient(at 10% 29%, hsla(22, 90%, 58%, ${intensityMap[intensity] * 0.08}) 0px, transparent 50%),
              radial-gradient(at 97% 96%, hsla(18, 95%, 62%, ${intensityMap[intensity] * 0.1}) 0px, transparent 50%),
              radial-gradient(at 33% 50%, hsla(20, 88%, 55%, ${intensityMap[intensity] * 0.09}) 0px, transparent 50%),
              radial-gradient(at 79% 53%, hsla(24, 92%, 60%, ${intensityMap[intensity] * 0.11}) 0px, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(135deg, 
              hsla(var(--accent-hsl), ${intensityMap[intensity] * 0.1}) 0%,
              transparent 50%,
              hsla(16, 100%, 60%, ${intensityMap[intensity] * 0.08}) 100%
            )`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsla(${16 + (i * 2)}, 100%, 60%, ${intensityMap[intensity] * 0.3})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  }

  // waves variant
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, 
              hsla(${16 + (i * 5)}, 100%, 60%, ${intensityMap[intensity] * 0.05}) 0%,
              transparent 70%
            )`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}
