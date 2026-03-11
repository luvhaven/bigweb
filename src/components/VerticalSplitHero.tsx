'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { ArrowRight, Play, Pause, Zap, Activity, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useTouchDevice } from '@/hooks/useTouchDevice'

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  cta: string
  ctaLink: string
  image: string
  stat: string
  statLabel: string
  icon: React.ComponentType<any>
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Transform Chaos Into High Conversion",
    subtitle: "Architecture of Revenue",
    description: "Architecting engineered conversion funnels for growth.",
    cta: "Audit My Site",
    ctaLink: "/offers/revenue-roadmap",
    image: "/hero-chaos.jpg",
    stat: "+412%",
    statLabel: "Revenue Lift",
    icon: Zap
  },
  {
    id: 2,
    title: "Elite Analytics. Absolute Control.",
    subtitle: "Precision Data Protocol",
    description: "Total visibility into user intent. Scalability with certainty.",
    cta: "View Intelligence",
    ctaLink: "/services/analytics",
    image: "/hero-analytics.jpg",
    stat: "24/7",
    statLabel: "Active Monitoring",
    icon: Activity
  },
  {
    id: 3,
    title: "Engineered For Peak Performance",
    subtitle: "Revenue Generation Engine",
    description: "Dominating search results and crushing targets.",
    cta: "Start Engineering",
    ctaLink: "/offers/fix-sprint",
    image: "/hero-funnel.jpg",
    stat: "$10M+",
    statLabel: "Capital Generated",
    icon: Target
  }
]

interface VerticalSplitHeroProps {
  slides?: HeroSlide[]
}

export default function VerticalSplitHero({ slides: cmsSlides }: VerticalSplitHeroProps) {
  const slides = cmsSlides && cmsSlides.length > 0 ? cmsSlides : defaultSlides
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isTouch = useTouchDevice()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth - 0.5) * 30)
      mouseY.set((clientY / innerHeight - 0.5) * 30)
    }

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isTouch, mouseX, mouseY])

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  return (
    <div ref={containerRef} className="relative h-[100dvh] w-full bg-black overflow-hidden selection:bg-accent/30">

      {/* Visual Component: 45% Width Right Side (Desktop Only) */}
      <div className="absolute inset-y-0 right-0 w-[45%] h-full overflow-hidden bg-black z-0 hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              className="relative w-full h-full transition-all duration-1000"
              style={{ x: mouseX, y: mouseY }}
            >
              <Image
                src={slides[activeSlide].image}
                alt={slides[activeSlide].title}
                fill
                className="object-cover opacity-100"
                priority
                sizes="45vw"
              />
              {/* Subtle overlay for the split effect */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Visual Layer (Full screen background on mobile/tablet) */}
      <div className="absolute inset-0 h-full overflow-hidden bg-black z-0 lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[activeSlide].image}
              alt={slides[activeSlide].title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Narrative Overlay (The Content) */}
        <div className="lg:col-span-12 flex flex-col justify-center px-8 md:px-12 lg:px-24 h-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 max-w-2xl"
            >
              <div className="flex items-start">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/30/40 border border-accent/20 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[11px] font-bold text-accent uppercase tracking-widest leading-none pt-[1px]">
                    {slides[activeSlide].subtitle}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-6xl lg:text-[3.5rem] xl:text-[4.5rem] font-bold tracking-tighter leading-[0.9] uppercase text-white drop-shadow-2xl">
                  {slides[activeSlide].title}
                </h1>

                <p className="text-xs md:text-base lg:text-lg text-zinc-400 max-w-md font-medium leading-relaxed border-l-2 border-accent/30 pl-6">
                  {slides[activeSlide].description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link href={slides[activeSlide].ctaLink}>
                  <Button size="xl" className="px-12 rounded-full bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-base group shadow-[0_20px_40px_rgba(255,100,0,0.2)] transition-transform hover:scale-105">
                    {slides[activeSlide].cta}
                    <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button variant="link" className="text-zinc-500 hover:text-white hover:no-underline uppercase font-black tracking-[0.4em] text-xs flex items-center gap-4 group px-0 border-none bg-transparent hover:bg-transparent">
                    <div className="w-12 h-[1px] bg-zinc-800 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                    THE EVIDENCE
                  </Button>
                </Link>
              </div>

              {/* Live Metadata */}
              <div className="pt-6 flex gap-12 border-t border-white/5">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white italic">{slides[activeSlide].stat}</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-zinc-600">{slides[activeSlide].statLabel}</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-3xl font-bold text-white italic">Elite</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Performance Grade</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Control Interface */}
        <div className="absolute bottom-10 right-10 flex items-center gap-6 z-30">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === activeSlide ? 'bg-accent scale-110 shadow-[0_0_10px_rgba(234,88,12,0.4)]' : 'bg-zinc-900 hover:bg-zinc-700'}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all group shadow-2xl relative"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            {isPlaying && (
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle cx="50%" cy="50%" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="100.5" strokeDashoffset="100.5" className="text-accent">
                  <animate attributeName="stroke-dashoffset" from="100.5" to="0" dur="8s" repeatCount="indefinite" />
                </circle>
              </svg>
            )}
          </button>
        </div>

        {/* Status indicator */}

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-zinc-500"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-accent to-transparent" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </div>
  )
}
