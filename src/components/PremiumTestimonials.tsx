'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import KineticTypography from '@/components/effects/KineticTypography'
import SectionAtmosphere from '@/components/effects/SectionAtmosphere'

/* ─── Testimonial Data with real-looking avatars ─── */
const TESTIMONIALS = [
  {
    content: "BIGWEB didn't redesign our site — they re-architected how we acquire customers. Our landing page conversion rate went from 1.4% to 5.1% in eight weeks. I've worked with top agencies in New York and Berlin. None of them came close to this level of strategic depth.",
    author: 'Adaeze Okafor',
    role: 'Chief Marketing Officer',
    company: 'Vantara Financial',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=300&auto=format&fit=crop',
    result: { metric: '+265%', label: 'Conversion Rate, 8 weeks' },
    color: '#10b981',
    logo: 'VANTARA',
  },
  {
    content: "The level of craft is unmatched. We evaluated twelve agencies — the best in London, Paris, and Singapore. BIGWEB was the only one that understood luxury at a technical and emotional level simultaneously. They think like CMOs and build like world-class engineers.",
    author: 'Sebastián Montoya-Cruz',
    role: 'Founder & CEO',
    company: 'Aurum Collective',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop',
    result: { metric: '8-figure', label: 'Annual Revenue Run Rate' },
    color: '#d4a853',
    logo: 'AURUM',
  },
  {
    content: "Flawless execution. The migration was seamless, performance is instantaneous, and the design system scales without friction. Our Lighthouse score went from 38 to 98. The performance gain alone compounded into measurable customer trust within the first quarter.",
    author: 'Priya Venkataraman',
    role: 'VP of Engineering',
    company: 'Orion Platforms',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&auto=format&fit=crop',
    result: { metric: '0.7s', label: 'Avg. Page Load Time' },
    color: '#6366f1',
    logo: 'ORION',
  },
  {
    content: "They approach every decision as a business partner, not a vendor. Every recommendation was backed by data, every design choice tied to revenue impact. The $180k we invested returned $2.4M in verifiable new revenue in the first 12 months post-launch.",
    author: 'Takeshi Yamamoto',
    role: 'CEO',
    company: 'Kōyō Dynamics',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&auto=format&fit=crop',
    result: { metric: '$2.4M', label: 'Verified Revenue, Month 12' },
    color: '#f59e0b',
    logo: 'KŌYŌ',
  },
]

export default function PremiumTestimonials({ initialTestimonials = [] }: any) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef as any, { once: true, margin: '-100px' })

  const data = initialTestimonials.length > 0 ? initialTestimonials : TESTIMONIALS
  const activeTestimonial = data[current]

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => navigate('next'), 7000)
    return () => clearInterval(timer)
  }, [current, data.length])

  const navigate = (dir: 'next' | 'prev') => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(prev => dir === 'next'
        ? (prev + 1) % data.length
        : (prev - 1 + data.length) % data.length
      )
      setIsTransitioning(false)
    }, 120)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#060606] overflow-hidden"
    >
      {/* Atmospheric lighting — emerald for trust/proof */}
      <SectionAtmosphere preset="emerald" parallax />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-accent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
              Client Proof
            </span>
          </motion.div>
          <KineticTypography
            segments={[
              { text: 'Results that speak ' },
              { text: 'for themselves.', className: 'italic text-zinc-400' }
            ]}
            as="h2"
            className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]"
          />
        </div>

        {/* Main Testimonial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: portrait + result metric */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Portrait */}
                <div className="relative mb-6">
                  <div className="relative inline-block">
                    <div
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2"
                      style={{ borderColor: `${activeTestimonial.color}40` }}
                    >
                      <Image
                        src={activeTestimonial.image || activeTestimonial.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=300&auto=format&fit=crop'}
                        alt={activeTestimonial.author || activeTestimonial.client_name || activeTestimonial.name || 'Client testimonial'}
                        fill
                        className="object-cover grayscale-[0.3]"
                      />
                    </div>
                    <div
                      className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: activeTestimonial.color }}
                    >
                      <Star className="w-3 h-3 text-black fill-black" />
                    </div>
                  </div>
                </div>

                {/* Author info */}
                <div className="mb-8">
                  <div className="font-semibold text-white mb-0.5">{activeTestimonial.author}</div>
                  <div className="text-sm text-zinc-500">{activeTestimonial.role}</div>
                  <div
                    className="text-xs font-mono uppercase tracking-[0.2em] mt-1"
                    style={{ color: activeTestimonial.color }}
                  >
                    {activeTestimonial.company}
                  </div>
                </div>

                {/* Result metric card */}
                <div
                  className="inline-flex flex-col p-5 rounded-2xl border"
                  style={{
                    borderColor: `${activeTestimonial.color}20`,
                    background: `${activeTestimonial.color}08`,
                  }}
                >
                  <div
                    className="text-3xl md:text-4xl font-black tracking-tighter mb-1"
                    style={{ color: activeTestimonial.color }}
                  >
                    {activeTestimonial.result.metric}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                    {activeTestimonial.result.label}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: quote */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote icon */}
                <Quote
                  className="w-10 h-10 mb-6 rotate-180"
                  style={{ color: `${activeTestimonial.color}50` }}
                />

                {/* Quote text */}
                <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-white leading-[1.4] tracking-tight mb-10">
                  &ldquo;{activeTestimonial.content}&rdquo;
                </blockquote>

                {/* 5 stars */}
                <div className="flex items-center gap-1 mb-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: activeTestimonial.color }} />
                  ))}
                  <span className="ml-2 text-xs font-mono text-zinc-500">5.0 / 5.0</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('prev')}
                className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {data.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => { if (!isTransitioning) { setIsTransitioning(true); setTimeout(() => { setCurrent(i); setIsTransitioning(false) }, 120) } }}
                    className={`transition-all duration-500 rounded-full`}
                    style={{
                      width: i === current ? '24px' : '6px',
                      height: '6px',
                      background: i === current ? activeTestimonial.color : 'rgba(255,255,255,0.12)',
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate('next')}
                className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono text-zinc-600 ml-2">
                {String(current + 1).padStart(2, '0')} / {String(data.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-white/[0.04]"
        >
          <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 text-center mb-8">
            Trusted by ambitious companies worldwide
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {data.map((t: typeof TESTIMONIALS[0], i: number) => (
              <motion.button
                key={i}
                onClick={() => { if (!isTransitioning) setCurrent(i) }}
                className={`text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 ${i === current ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
                style={{ color: i === current ? t.color : 'white' }}
                whileHover={{ scale: 1.05 }}
              >
                {t.logo || t.company}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
