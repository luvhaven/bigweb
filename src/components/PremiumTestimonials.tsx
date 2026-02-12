'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Activity } from 'lucide-react'
import { Button } from './ui/button'

interface PremiumTestimonialsProps {
  initialTestimonials?: any[]
}

export default function PremiumTestimonials({ initialTestimonials = [] }: PremiumTestimonialsProps) {
  const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [loading, setLoading] = useState(initialTestimonials.length === 0)

  useEffect(() => {
    if (initialTestimonials) {
      setTestimonials(initialTestimonials)
      setLoading(false)
    }
  }, [initialTestimonials])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection
      if (nextIndex < 0) return testimonials.length - 1
      if (nextIndex >= testimonials.length) return 0
      return nextIndex
    })
  }

  if (loading || testimonials.length === 0) return null

  return (
    <section className="py-24 md:py-40 relative bg-black overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.02]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Header Content */}
          <div className="lg:col-span-4 space-y-8 border-l-2 border-orange-500/50 pl-12 relative">
            <div className="absolute top-0 left-[-2px] h-32 w-[2px] bg-gradient-to-b from-orange-500 to-transparent" />
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 backdrop-blur-xl rounded-full">
              Verified Outcomes
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter-clinical leading-[0.85] mb-8">
              Client <br /><span className="text-zinc-600">Results.</span>
            </h2>

            <p className="text-zinc-400 text-xl md:text-2xl font-medium leading-relaxed tracking-tight max-w-sm">
              Impactful partnerships with some of the world's most <span className="text-white font-bold decoration-orange-500/50 underline underline-offset-4">High-Growth</span> companies.
            </p>

            <div className="flex gap-4 pt-12">
              <button
                onClick={() => paginate(-1)}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-500 ease-apple backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-500 ease-apple backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Unit */}
          <div className="lg:col-span-8 relative min-h-[400px] flex items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="space-y-12">
                  <div className="flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-8 h-1 rounded-full ${i < (testimonials[currentIndex]?.rating || 5) ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-zinc-800'}`} />
                    ))}
                  </div>

                  <blockquote className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-5xl">
                    "{testimonials[currentIndex]?.content}"
                  </blockquote>

                  <div className="flex flex-col md:flex-row items-start md:items-end gap-12 pt-12 border-t border-white/5 relative">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-white tracking-tight">
                        {testimonials[currentIndex]?.client_name}
                      </div>
                      <div className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        {testimonials[currentIndex]?.client_role} <span className="w-1 h-1 bg-zinc-700 rounded-full" /> {testimonials[currentIndex]?.client_company}
                      </div>
                    </div>

                    {testimonials[currentIndex]?.result_metric && (
                      <div className="md:ml-auto text-left md:text-right">
                        <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tracking-tighter leading-none mb-2">
                          {testimonials[currentIndex]?.result_metric}
                        </div>
                        <div className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em]">
                          Revenue Uplift
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
