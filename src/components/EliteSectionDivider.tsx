'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

interface EliteSectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'curve' | 'dots' | 'particles' | 'gradient-flow' | 'mesh'
  flip?: boolean
  intensity?: 'subtle' | 'medium' | 'bold'
}

export default function EliteSectionDivider({ variant = 'wave', flip = false, intensity = 'medium' }: EliteSectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const intensityMap = {
    subtle: 0.05,
    medium: 0.1,
    bold: 0.2
  }

  if (variant === 'particles') {
    return (
      <div ref={ref} className="relative w-full h-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent/30"
              style={{
                left: `${(i * 3.33)}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'gradient-flow') {
    return (
      <div ref={ref} className="relative w-full h-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                hsla(var(--accent-hsl), ${intensityMap[intensity]}) 25%,
                hsla(var(--accent-hsl), ${intensityMap[intensity] * 1.5}) 50%,
                hsla(var(--accent-hsl), ${intensityMap[intensity]}) 75%,
                transparent 100%
              )`
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          <motion.div
            className="absolute inset-0 backdrop-blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </div>
    )
  }

  if (variant === 'mesh') {
    return (
      <div ref={ref} className="relative w-full h-20 overflow-hidden">
        <div className="absolute inset-0">
          {/* Mesh grid */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 p-8">
            {[...Array(36)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-accent/5 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        </div>
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div ref={ref} className={`relative w-full h-12 overflow-hidden ${flip ? 'rotate-180' : ''}`}>
        <div>
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,50 C300,100 500,0 600,50 C700,100 900,0 1200,50 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
              initial={{ d: "M0,50 C300,100 500,0 600,50 C700,100 900,0 1200,50 L1200,120 L0,120 Z" }}
              animate={{
                d: [
                  "M0,50 C300,100 500,0 600,50 C700,100 900,0 1200,50 L1200,120 L0,120 Z",
                  "M0,70 C300,20 500,100 600,50 C700,0 900,100 1200,50 L1200,120 L0,120 Z",
                  "M0,50 C300,100 500,0 600,50 C700,100 900,0 1200,50 L1200,120 L0,120 Z"
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    )
  }

  if (variant === 'diagonal') {
    return (
      <div className={`relative w-full h-12 overflow-hidden ${flip ? 'rotate-180' : ''}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5"
          style={{
            clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    )
  }

  if (variant === 'curve') {
    return (
      <div className={`relative w-full h-12 overflow-hidden ${flip ? 'rotate-180' : ''}`}>
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
            fill="url(#curveGradient)"
            opacity="0.6"
          />
          <path
            d="M0,20 Q600,100 1200,20 L1200,120 L0,120 Z"
            fill="url(#curveGradient2)"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  // dots variant
  return (
    <div className="relative w-full h-12 flex items-center justify-center gap-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-accent/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}
