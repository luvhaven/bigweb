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

  if (variant === 'particles') {
    return (
      <div ref={ref} className="relative w-full h-16 overflow-hidden bg-black border-y border-zinc-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-600/60"
              style={{
                left: `${(i * 5)}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -20, 0, 20, 0],
                opacity: [0, 1, 0],
                height: ['4px', '20px', '4px'],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'gradient-flow') {
    return (
      <div ref={ref} className="relative w-full h-4 bg-zinc-950 border-t border-b border-zinc-900 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-600/20 to-transparent w-[50%]"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-[1px] h-full bg-zinc-900" />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'mesh') {
    return (
      <div ref={ref} className="relative w-full h-24 overflow-hidden bg-black border-y border-zinc-900">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-zinc-900" />
          ))}
        </div>
        <div className="absolute inset-0 flex justify-between px-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full w-[1px] bg-zinc-900" />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[1px] bg-orange-600/20" />
        </div>
      </div>
    )
  }

  if (variant === 'wave') {
    // Industrial "Square Wave"
    return (
      <div ref={ref} className={`relative w-full h-16 overflow-hidden bg-black ${flip ? 'rotate-180' : ''}`}>
        <div className="absolute inset-x-0 bottom-0 h-12 flex items-end">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-zinc-900 border-r border-black"
              initial={{ height: '10%' }}
              animate={{ height: ['10%', '60%', '30%', '80%', '10%'] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "step-end"
              }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-orange-600/50" />
      </div>
    )
  }

  if (variant === 'diagonal') {
    return (
      <div className={`relative w-full h-12 overflow-hidden bg-black ${flip ? 'rotate-180' : ''}`}>
        <div className="absolute inset-0 flex">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-zinc-900 transform -skew-x-[45deg] origin-bottom" />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'curve') {
    // Angular path
    return (
      <div className={`relative w-full h-12 overflow-hidden bg-black ${flip ? 'rotate-180' : ''}`}>
        <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L 20 50 L 40 80 L 60 20 L 80 60 L 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-800" />
          <path d="M0 100 L 10 90 L 20 100 L 30 90 L 40 100 L 50 90 L 60 100 L 70 90 L 80 100 L 90 90 L 100 100 V 100 H 0 Z" fill="currentColor" className="text-zinc-950" />
        </svg>
        <div className="absolute bottom-0 w-full h-[1px] bg-orange-600/30" />
      </div>
    )
  }

  // dots variant -> Digital Bits
  return (
    <div className="relative w-full h-12 flex items-center justify-center gap-4 bg-black border-y border-zinc-900">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-zinc-800"
          animate={{
            opacity: [0.2, 1, 0.2],
            backgroundColor: ['#27272a', '#ea580c', '#27272a']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "steps(2)"
          }}
        />
      ))}
    </div>
  )
}
