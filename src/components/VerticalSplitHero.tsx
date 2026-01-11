'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Play, Pause, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleBackground from '@/components/effects/ParticleBackground'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import TextReveal from '@/components/ui/TextReveal'


gsap.registerPlugin(ScrollTrigger)

// ... (interfaces)
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
  video?: string
}

// Default slides (Fallback)
const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Turn Underperforming Websites Into Revenue Systems",
    subtitle: "The Conversion Lab for Growth-Focused Founders",
    description: "We analyze, fix, and rebuild websites with a single goal: increasing your revenue. No fluff, no buzzwords, just engineered conversion outcomes.",
    cta: "Request a Conversion Diagnostic",
    ctaLink: "/offers/diagnostic",
    image: "/images/hero/revenue_system.png",
    stat: "+300%",
    statLabel: "Target ROI"
  },
  {
    id: 2,
    title: "Stop Losing Leads to Confusing Design",
    subtitle: "Conversion Engineers, Not Just Designers",
    description: "Pretty websites that don't sell are liabilities. We use data-driven psychology to clear bottlenecks and funnel visitors straight to your checkout or calendar.",
    cta: "Fix My Website Sprints",
    ctaLink: "/offers/fix-sprint",
    image: "/images/hero/design_fix.png",
    stat: "1-3",
    statLabel: "Sprint Weeks"
  },
  {
    id: 3,
    title: "Your In-House Growth Team Without the Overhead",
    subtitle: "Continuous Optimization Retainers",
    description: "Launch is just the starting line. We rigorously A/B test, monitor, and refine your site effectively acting as your dedicated CRO department.",
    cta: "Explore Optimization",
    ctaLink: "/offers/retainer",
    image: "/images/hero/growth_team.png",
    stat: "24/7",
    statLabel: "Monitoring"
  }
]

interface VerticalSplitHeroProps {
  cmsSlide?: HeroSlide
  slides?: HeroSlide[]
}

export default function VerticalSplitHero({ cmsSlide, slides: cmsSlides }: VerticalSplitHeroProps) {
  // Use CMS slides if provided, otherwise CMS slide (single), otherwise default
  const slides = cmsSlides && cmsSlides.length > 0 ? cmsSlides : (cmsSlide ? [cmsSlide] : defaultSlides)

  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true) // Always default to auto-play, will be controlled by slides.length check

  // If only 1 slide, force activeSlide to 0 and stop playing
  useEffect(() => {
    if (slides.length === 1) {
      setActiveSlide(0)
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
  }, [slides.length])

  // ... (rest of logic)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isTouch = useTouchDevice()

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth - 0.5) * 20)
      mouseY.set((clientY / innerHeight - 0.5) * 20)
    }

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isTouch, mouseX, mouseY])

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(249,115,22,0.05),transparent_50%)]" />
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background/90 pointer-events-none" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-12 items-center">

        {/* Left Content Panel */}
        <div className="lg:col-span-12 xl:col-span-5 h-full flex flex-col justify-center px-6 lg:px-20 relative pt-16 lg:pt-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-2 md:space-y-4 lg:space-y-6 max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]"
              >
                {slides[activeSlide].subtitle}
              </motion.div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-black tracking-tight leading-[1] uppercase">
                {slides[activeSlide].title.includes(' ') ? (
                  <>
                    <TextReveal
                      text={slides[activeSlide].title.split(' ').slice(0, 2).join(' ')}
                      className="block text-foreground mb-1"
                      delay={0.2}
                      type="char"
                    />
                    <span className="block gradient-text-luxury pb-1 overflow-hidden">
                      <TextReveal
                        text={slides[activeSlide].title.split(' ').slice(2).join(' ')}
                        delay={0.5}
                        type="char"
                      />
                    </span>
                  </>
                ) : (
                  <span className="block gradient-text-luxury pb-1">
                    <TextReveal
                      text={slides[activeSlide].title}
                      delay={0.2}
                      type="char"
                    />
                  </span>
                )}
              </h1>

              <p className="text-xs md:text-sm lg:text-base text-muted-foreground/90 max-w-xl leading-relaxed animate-fade-up animation-stagger-4 font-medium line-clamp-2 md:line-clamp-none">
                {slides[activeSlide].description}
              </p>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-1 animate-fade-up animation-stagger-5">
                <Link href={slides[activeSlide].ctaLink}>
                  <Button size="lg" className="h-10 md:h-12 bg-accent hover:bg-accent-dark text-white rounded-full px-5 md:px-8 text-xs md:text-sm font-bold shadow-glow transition-all hover:scale-105 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">
                      {slides[activeSlide].cta}
                      <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button variant="outline" size="lg" className="h-10 md:h-12 rounded-full px-5 md:px-8 text-xs md:text-sm font-bold border-white/10 hover:bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <span className="relative z-10">The Evidence</span>
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
            <Button variant="ghost" size="icon" onClick={prevSlide} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2 items-center">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeSlide ? 'w-6 bg-accent' : 'bg-white/30'
                    }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={nextSlide} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right Visual Panel */}
        <div className="hidden lg:block lg:col-span-12 xl:col-span-7 relative h-full overflow-hidden bg-black/5 border-l border-white/5">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_20%)]"
              >
                <div className="relative w-full h-full">
                  {/* Wrapped in div because motion.custom(Image) can be tricky with types, simple motion.div wrapper is safer for parallax */}
                  <motion.div
                    className="w-full h-full"
                    style={{
                      x: mouseX,
                      y: mouseY,
                    }}
                  >
                    <Image
                      src={slides[activeSlide].image}
                      alt={slides[activeSlide].title}
                      fill
                      className="object-cover"
                      priority={true}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fixed Controls Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Navigation Dots */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className="group relative flex items-center justify-end"
                >
                  <span className={`absolute right-10 text-xs font-bold transition-all duration-300 ${idx === activeSlide ? 'opacity-100 translate-x-0 text-accent' : 'opacity-0 translate-x-4 text-white'
                    }`}>
                    0{idx + 1}
                  </span>
                  <div className={`w-1 h-12 rounded-full transition-all duration-500 ${idx === activeSlide ? 'bg-accent h-24' : 'bg-white/20 group-hover:bg-white/40'
                    }`} />
                </button>
              ))}
            </div>

            {/* Play/Pause Control */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-12 right-12 p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 group pointer-events-auto"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}

              {/* Progress Ring */}
              {isPlaying && (
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="150"
                    strokeDashoffset="0"
                    className="opacity-20"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="150"
                    strokeDashoffset="150"
                    className="text-accent opacity-100"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="150"
                      to="0"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </div>
  )
}
