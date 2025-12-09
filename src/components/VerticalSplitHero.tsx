'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Play, Pause, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleBackground from '@/components/effects/ParticleBackground'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import TextReveal from '@/components/ui/TextReveal'


gsap.registerPlugin(ScrollTrigger)

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

import heroConversion from '@/assets/hero-conversion.png'
import heroSeo from '@/assets/hero-seo.png'
import heroTech from '@/assets/hero-tech.png'

// ... (keep existing imports)

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "Turn Visitors Into Customers",
    subtitle: "AI-Powered Growth That Works",
    description: "Stop losing sales to poor UX. We build conversion-optimized websites that turn your traffic into revenue—averaging 4x conversion increases for our clients.",
    cta: "Get Your Free Growth Audit",
    ctaLink: "/contact",
    image: heroConversion.src,
    stat: "4x",
    statLabel: "Your Conversions"
  },
  {
    id: 2,
    title: "Dominate Your Market",
    subtitle: "SEO & Performance Architecture",
    description: "Rank higher, load faster, and outperform competitors. Our technical SEO and performance optimization strategies put your brand at the top of search results.",
    cta: "Start Dominating Today",
    ctaLink: "/services/seo-growth",
    image: heroSeo.src,
    stat: "#1",
    statLabel: "Search Rankings"
  },
  {
    id: 3,
    title: "Future-Proof Technology",
    subtitle: "Next-Gen Web Development",
    description: "Built on the latest stack (Next.js 15, React 19). Scalable, secure, and ready for whatever the future of the web brings.",
    cta: "Build The Future",
    ctaLink: "/services/web-development",
    image: heroTech.src,
    stat: "100%",
    statLabel: "Scalability"
  }
]

export default function VerticalSplitHero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
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
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(249,115,22,0.05),transparent_50%)]" />
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background/90 pointer-events-none" />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-12">

        {/* Left Content Panel */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center px-6 lg:px-12 relative pt-40 lg:pt-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                {slides[activeSlide].subtitle}
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <TextReveal
                  text={slides[activeSlide].title.split(' ')[0]}
                  className="block text-foreground"
                  delay={0.2}
                  type="char"
                />
                <span className="block gradient-text-luxury">
                  <TextReveal
                    text={slides[activeSlide].title.split(' ').slice(1).join(' ')}
                    delay={0.5}
                    type="char"
                  />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed animate-fade-up animation-stagger-4">
                {slides[activeSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4 animate-fade-up animation-stagger-5">
                <Link href={slides[activeSlide].ctaLink}>
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white rounded-full px-8 py-6 text-lg shadow-glow transition-all hover:scale-105 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">
                      {slides[activeSlide].cta}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg border-white/10 hover:bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <span className="relative z-10">View Our Work</span>
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </Button>
                </Link>
              </div>

              {/* Animated Stat */}
              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-white">
                    <AnimatedCounter
                      value={parseFloat(slides[activeSlide].stat.replace(/[^0-9.]/g, ''))}
                      prefix={slides[activeSlide].stat.includes('#') ? '#' : ''}
                      suffix={slides[activeSlide].stat.includes('%') ? '%' : slides[activeSlide].stat.includes('x') ? 'x' : ''}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {slides[activeSlide].statLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Controls */}
          <div className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
            <Button variant="ghost" size="icon" onClick={prevSlide} className="rounded-full bg-black/20 backdrop-blur-md text-white">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex gap-2 items-center">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === activeSlide ? 'w-8 bg-accent' : 'bg-white/30'
                    }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={nextSlide} className="rounded-full bg-black/20 backdrop-blur-md text-white">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Right Visual Panel */}
        <div className="hidden lg:block lg:col-span-7 relative h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_20%)]"
            >
              <motion.img
                src={slides[activeSlide].image}
                alt={slides[activeSlide].title}
                className="w-full h-full object-cover"
                style={{
                  x: mouseX,
                  y: mouseY,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className="group relative flex items-center justify-end"
              >
                <span className={`absolute right-8 text-sm font-medium transition-all duration-300 ${idx === activeSlide ? 'opacity-100 translate-x-0 text-accent' : 'opacity-0 translate-x-4 text-white'
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
            className="absolute bottom-12 right-12 p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 group"
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
