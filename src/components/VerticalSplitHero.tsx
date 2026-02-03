'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { ArrowRight, Play, Pause, ChevronDown, ChevronRight, ChevronLeft, FlaskConical, Target, Activity, Lock, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import ParticleBackground from '@/components/effects/ParticleBackground'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import TextReveal from '@/components/ui/TextReveal'

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
    title: "Award-Winning Digital Experiences",
    subtitle: "Web Development & Design",
    description: "We create stunning, high-performance websites and applications that drive real business results. From concept to launch, we deliver digital excellence.",
    cta: "View Our Work",
    ctaLink: "/case-studies",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
    stat: "500+",
    statLabel: "Projects Delivered",
    icon: Zap
  },
  {
    id: 2,
    title: "AI-Powered Automation",
    subtitle: "Intelligent Business Solutions",
    description: "Transform your operations with cutting-edge AI and automation. We build intelligent systems that work 24/7 to grow your business and delight your customers.",
    cta: "Explore AI Solutions",
    ctaLink: "/services/ai-automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    stat: "10x",
    statLabel: "Efficiency Gains",
    icon: Activity
  },
  {
    id: 3,
    title: "Lightning-Fast Performance",
    subtitle: "Speed & Optimization",
    description: "Every millisecond counts. We optimize your digital presence for blazing-fast load times, better SEO rankings, and higher conversion rates.",
    cta: "Boost Performance",
    ctaLink: "/services/optimization",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    stat: "100/100",
    statLabel: "Performance Score",
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

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const ActiveIcon = slides[activeSlide].icon

  return (
    <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#050505] selection:bg-orange-500/30">
      {/* Industrial Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(249,115,22,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 pointer-events-none" />
        <ParticleBackground />
      </div>

      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-12 items-center">

        {/* Left Panel: The Narrative */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center px-8 md:px-12 lg:px-24 pt-24 lg:pt-0 relative overflow-hidden bg-gradient-to-r from-black/80 via-black/40 to-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 max-w-2xl"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20"
                >
                  <ActiveIcon className="w-5 h-5 text-orange-500" />
                </motion.div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 block">The Laboratory Protocol</span>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{slides[activeSlide].subtitle}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic">
                  <TextReveal text={slides[activeSlide].title.split(' ')[0]} className="block text-white" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800 block">
                    <TextReveal text={slides[activeSlide].title.split(' ').slice(1).join(' ')} delay={0.2} />
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-xl font-medium leading-relaxed italic border-l-2 border-orange-500/30 pl-6">
                  {slides[activeSlide].description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link href={slides[activeSlide].ctaLink}>
                  <Button size="xl" className="px-12 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-lg group shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
                    <Zap className="w-6 h-6 mr-3" />
                    {slides[activeSlide].cta}
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button variant="link" className="text-zinc-500 hover:text-white hover:no-underline uppercase font-black tracking-widest text-xs flex items-center gap-3 group px-0 border-none bg-transparent hover:bg-transparent">
                    View Evidence <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Live Metadata */}
              <div className="pt-12 flex gap-12 border-t border-white/5 opacity-40">
                <div>
                  <div className="text-2xl font-black text-white italic">{slides[activeSlide].stat}</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-zinc-600">{slides[activeSlide].statLabel}</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-2xl font-black text-white italic">Elite</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Performance Grade</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Panel: The Visual Machine */}
        <div className="hidden lg:block lg:col-span-7 relative h-full overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                style={{ x: mouseX, y: mouseY }}
              >
                <Image
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  fill
                  className="object-cover opacity-60"
                  priority
                  sizes="60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Industrial Controls */}
          <div className="absolute bottom-12 right-12 flex items-center gap-8 z-20">
            <div className="flex flex-col items-end gap-2 pr-8 border-r border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">System Clock</span>
              <div className="flex gap-3">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-700 ${idx === activeSlide ? 'w-12 bg-orange-600' : 'w-4 bg-zinc-800 hover:bg-zinc-600'}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl flex items-center justify-center text-white hover:bg-orange-600 hover:border-orange-500 transition-all group shadow-2xl"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              {isPlaying && (
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                  <circle cx="50%" cy="50%" r="28" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="180" strokeDashoffset="180" className="text-orange-500">
                    <animate attributeName="stroke-dashoffset" from="180" to="0" dur="8s" repeatCount="indefinite" />
                  </circle>
                </svg>
              )}
            </button>
          </div>

          {/* Status Hologram Effect */}
          <div className="absolute top-24 right-12 text-right space-y-2 opacity-20 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 justify-end text-[10px] font-black uppercase tracking-widest text-orange-500">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Core_System: Active
            </div>
            <div className="text-4xl font-black text-white italic leading-none">{String(activeSlide + 1).padStart(2, '0')}</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-zinc-500"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </div>
  )
}
