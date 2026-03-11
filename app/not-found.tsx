'use client'

import React from 'react'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <h1 className="font-serif text-[12rem] md:text-[16rem] font-black mb-0 leading-[0.8] text-white/5 tracking-tighter">404</h1>

        <div className="-mt-12 md:-mt-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8">
            Resource <br />
            <span className="text-zinc-600 italic">Unavailable.</span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 mb-16 max-w-lg mx-auto leading-relaxed font-light">
            The page you are looking for has been moved or no longer exists within our network.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="rounded-full px-12"
            >
              <Link href="/">
                <Home className="mr-3 w-4 h-4" />
                Return Home
              </Link>
            </Button>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-[0.3em]"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
