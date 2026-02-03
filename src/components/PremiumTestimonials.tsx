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
          <div className="lg:col-span-4 space-y-8 border-l-4 border-orange-600 pl-12">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-4">
              Clinical_Verdicts_v1.0
            </div>

            <h2 className="text-6xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.75] mb-8">
              The <br /><span className="text-zinc-800">Verdicts.</span>
            </h2>

            <p className="text-zinc-500 text-2xl md:text-4xl font-medium leading-[1.1] tracking-tight max-w-sm">
              Clinical execution logs from the world's most <span className="text-white italic underline underline-offset-8 decoration-orange-600">Aggressive_Growth</span> cohorts.
            </p>

            <div className="flex gap-px bg-zinc-900 pt-12">
              <button
                onClick={() => paginate(-1)}
                className="w-20 h-20 flex items-center justify-center bg-zinc-950 border border-zinc-900 text-zinc-700 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-20 h-20 flex items-center justify-center bg-zinc-950 border border-zinc-900 text-zinc-700 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition-all duration-300"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Unit */}
          <div className="lg:col-span-8 relative min-h-[400px] flex items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="space-y-16">
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-12 h-1.5 ${i < (testimonials[currentIndex]?.rating || 5) ? 'bg-orange-600' : 'bg-zinc-900'}`} />
                    ))}
                  </div>

                  <blockquote className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9] uppercase max-w-6xl">
                    "{testimonials[currentIndex]?.content}"
                  </blockquote>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-12 pt-16 border-l-4 border-zinc-900 pl-12 relative overflow-hidden">
                    <div className="space-y-4">
                      <div className="text-4xl font-black text-white italic tracking-tight uppercase leading-none">
                        {testimonials[currentIndex]?.client_name}
                      </div>
                      <div className="text-[12px] font-mono font-black text-zinc-700 uppercase tracking-[0.5em]">
                        {testimonials[currentIndex]?.client_role} <span className="text-zinc-800">//</span> {testimonials[currentIndex]?.client_company}
                      </div>
                    </div>

                    {testimonials[currentIndex]?.result_metric && (
                      <div className="md:ml-auto text-left md:text-right">
                        <div className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter leading-none mb-4 group-hover:text-orange-600 transition-colors">
                          {testimonials[currentIndex]?.result_metric}
                        </div>
                        <div className="text-[11px] font-mono font-bold text-zinc-800 uppercase tracking-[0.6em]">
                          Delta_Performance_Yield
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
