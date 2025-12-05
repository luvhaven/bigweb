'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=90',
    title: 'Transform Your Digital Presence',
    subtitle: 'Award-Winning Design',
    description: 'We craft exceptional digital experiences that drive measurable results and accelerate your business growth.',
    cta: 'Start Your Project',
    color: '#FF6B35',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=90',
    title: 'Data-Driven Development',
    subtitle: 'Performance & Scale',
    description: 'Build lightning-fast websites and apps optimized for conversion with cutting-edge technology and best practices.',
    cta: 'See Our Work',
    color: '#4ECDC4',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=90',
    title: '3X Your Conversion Rate',
    subtitle: 'Growth Engineering',
    description: 'Turn your website into a revenue-generating machine with our proven optimization strategies and techniques.',
    cta: 'Get Estimate',
    color: '#A06CD5',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=90',
    title: 'Partner With Experts',
    subtitle: 'Elite Development Team',
    description: 'Work with a dedicated team of designers and developers committed to your success and long-term growth.',
    cta: 'Meet The Team',
    color: '#F38181',
  },
]

const CarouselCinematic = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Physics-based drag
  const x = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  
  // Parallax effects
  const rotateX = useTransform(xSpring, [-200, 200], [15, -15])
  const rotateY = useTransform(xSpring, [-200, 200], [-15, 15])

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % heroSlides.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])
  
  // Auto-play timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!isPaused && !isDragging) {
        handleNext()
      }
    }, 5000)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, activeIndex, isDragging])

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const currentSlide = heroSlides[activeIndex]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background Gradient */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentSlide.color}20, transparent 70%)`,
        }}
      />

      {/* Ambient Particles */}
      <div className="absolute inset-0 z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main 3D Carousel Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* 3D Card Stack */}
          <motion.div
            className="relative"
            style={{
              perspective: '2000px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ 
                  x: direction > 0 ? 1000 : -1000,
                  opacity: 0,
                  rotateY: direction > 0 ? 45 : -45,
                  scale: 0.8,
                }}
                animate={{ 
                  x: 0,
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                }}
                exit={{ 
                  x: direction > 0 ? -1000 : 1000,
                  opacity: 0,
                  rotateY: direction > 0 ? -45 : 45,
                  scale: 0.8,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 30,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, { offset, velocity }) => {
                  setIsDragging(false)
                  if (offset.x > 100 || velocity.x > 500) {
                    handlePrev()
                  } else if (offset.x < -100 || velocity.x < -500) {
                    handleNext()
                  }
                }}
                style={{
                  rotateX,
                  rotateY: useTransform(xSpring, [-200, 200], [10, -10]),
                }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                {/* Main Card */}
                <div className="relative aspect-[16/9] max-w-6xl mx-auto rounded-3xl overflow-hidden">
                  
                  {/* Background Image with Parallax */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      scale: useTransform(xSpring, [-200, 200], [1.1, 1.1]),
                      x: useTransform(xSpring, [-200, 200], [20, -20]),
                    }}
                  >
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Multi-layer Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
                  </motion.div>

                  {/* Glass Morphism Overlay */}
                  <div className="absolute inset-0 backdrop-blur-[2px]" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
                    
                    {/* Animated Badge */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${currentSlide.color}40, ${currentSlide.color}20)`,
                        border: `1px solid ${currentSlide.color}60`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <span 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentSlide.color }}
                      />
                      <span 
                        className="text-sm font-bold uppercase tracking-wider"
                        style={{ color: currentSlide.color }}
                      >
                        {currentSlide.subtitle}
                      </span>
                    </motion.div>

                    {/* Title with Stagger Animation */}
                    <motion.h1
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight max-w-4xl"
                      style={{
                        textShadow: '0 10px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      {currentSlide.title.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="inline-block mr-4"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                      className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed"
                      style={{
                        textShadow: '0 5px 20px rgba(0,0,0,0.5)',
                      }}
                    >
                      {currentSlide.description}
                    </motion.p>

                    {/* CTA Button with Hover Effects */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                    >
                      <Button
                        size="lg"
                        className="group relative px-8 py-6 text-lg font-bold overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${currentSlide.color}, ${currentSlide.color}CC)`,
                          border: 'none',
                        }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative flex items-center gap-3">
                          {currentSlide.cta}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Slide Number Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                    className="absolute top-8 right-8 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${currentSlide.color}, ${currentSlide.color}80)`,
                      boxShadow: `0 10px 40px ${currentSlide.color}40`,
                    }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </motion.div>

                  {/* Decorative Corner Elements */}
                  <motion.div
                    className="absolute top-0 left-0 w-32 h-32"
                    style={{
                      background: `linear-gradient(135deg, ${currentSlide.color}40, transparent)`,
                      borderRadius: '0 0 100% 0',
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  
                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32"
                    style={{
                      background: `linear-gradient(315deg, ${currentSlide.color}40, transparent)`,
                      borderRadius: '100% 0 0 0',
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1.5,
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white z-20"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white z-20"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Bottom Navigation Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            className="mt-12 flex items-center justify-center gap-8"
          >
            {/* Thumbnail Dots with Preview */}
            <div className="flex items-center gap-4">
              {heroSlides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => handleDotClick(index)}
                  className="group relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="w-3 h-3 rounded-full transition-all"
                    style={{
                      background: index === activeIndex ? slide.color : 'rgba(255,255,255,0.3)',
                      boxShadow: index === activeIndex ? `0 0 20px ${slide.color}` : 'none',
                    }}
                    animate={{
                      scale: index === activeIndex ? 1.5 : 1,
                    }}
                  />
                  
                  {/* Hover Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    whileHover={{ opacity: 1, y: -10, scale: 1 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none"
                  >
                    <div className="relative w-48 h-28 rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                        <p className="text-white text-xs font-bold">{slide.title}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPaused(!isPaused)}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </motion.button>

            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-white/60 text-sm font-mono">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: currentSlide.color,
                    boxShadow: `0 0 10px ${currentSlide.color}`,
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeIndex + 1) / heroSlides.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-white/60 text-sm font-mono">
                {String(heroSlides.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Keyboard Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 flex items-center gap-3 text-white/40 text-sm"
      >
        <div className="px-3 py-1 rounded bg-white/10 backdrop-blur-md font-mono">←</div>
        <div className="px-3 py-1 rounded bg-white/10 backdrop-blur-md font-mono">→</div>
        <span>Use arrow keys to navigate</span>
      </motion.div>
    </section>
  )
}

export default CarouselCinematic
