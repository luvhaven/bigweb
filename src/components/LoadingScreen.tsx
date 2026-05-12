'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import BrandLogo from '@/components/branding/BrandLogo'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('INITIALIZING ENVIRONMENT')

  useEffect(() => {
    let current = 0
    // A non-linear, unpredictable loading pattern feels more authentic
    const interval = setInterval(() => {
      // jump by random amount 1-15
      const jump = Math.floor(Math.random() * 15) + 1
      current += jump
      
      if (current >= 100) {
        current = 100
        clearInterval(interval)
      }
      
      setProgress(current)

      // Update loading stage text based on pseudo-progress
      if (current > 15 && current < 40) setStage('LOADING ARCHITECTURE')
      else if (current >= 40 && current < 75) setStage('RENDERING ASSETS')
      else if (current >= 75 && current < 95) setStage('OPTIMIZING PERFORMANCE')
      else if (current >= 95) setStage('INITIATING LAUNCH')

    }, 180)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303] text-white overflow-hidden"
    >
      {/* Subtle ambient light from bottom right */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:60px_60px] pointer-events-none" />

      {/* Center content wrapper */}
      <div className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center">
        
        {/* Animated B/Logo symbol */}
        <motion.div
            className="mb-12 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Pulsing rings behind logo */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-accent/20"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border border-accent/10"
            animate={{ scale: [1, 3], opacity: [0.3, 0] }}
            transition={{ duration: 2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
          />

          <BrandLogo variant="symbol" className="h-10 text-white z-10" />
        </motion.div>

        {/* The loading line */}
        <div className="w-full relative h-[1px] bg-white/[0.05] rounded-full overflow-hidden mb-6">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-accent shadow-[0_0_15px_rgba(212,168,83,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "linear" }}
          />
        </div>

        {/* Details row */}
        <div className="w-full flex items-center justify-between">
          <motion.span 
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500"
            key={stage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {stage}
          </motion.span>
          
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-sm tracking-widest text-white">
              {progress.toString().padStart(3, '0')}
            </span>
            <span className="font-mono text-[9px] text-accent">%</span>
          </div>
        </div>

      </div>

      {/* Aesthetic corner marks */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/10" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/10" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/10" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/10" />
    </motion.div>
  )
}
