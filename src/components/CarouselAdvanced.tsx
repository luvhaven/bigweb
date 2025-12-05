'use client'

import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Parallax, Autoplay, Keyboard, Mousewheel, Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Pause, Play } from 'lucide-react'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/parallax'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=90',
    title: 'Transform Your Digital Presence',
    subtitle: 'Award-Winning Design',
    description: 'We craft exceptional digital experiences that drive measurable results and accelerate your business growth.',
    cta: 'Start Your Project',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=90',
    title: 'Data-Driven Development',
    subtitle: 'Performance & Scale',
    description: 'Build lightning-fast websites and apps optimized for conversion with cutting-edge technology and best practices.',
    cta: 'See Our Work',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=90',
    title: '3X Your Conversion Rate',
    subtitle: 'Growth Engineering',
    description: 'Turn your website into a revenue-generating machine with our proven optimization strategies and techniques.',
    cta: 'Get Estimate',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=90',
    title: 'Partner With Experts',
    subtitle: 'Elite Development Team',
    description: 'Work with a dedicated team of designers and developers committed to your success and long-term growth.',
    cta: 'Meet The Team',
  },
]

const CarouselAdvanced = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPaused) {
        swiperRef.current.autoplay.start()
      } else {
        swiperRef.current.autoplay.stop()
      }
      setIsPaused(!isPaused)
    }
  }

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index)
    }
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Vertical Thumbnail Navigation - Left Side */}
      <div className="absolute left-0 top-0 h-full w-[10vw] flex flex-col gap-3 z-40 p-4">
        {heroSlides.map((slide, index) => (
          <motion.button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`relative flex-1 overflow-hidden cursor-pointer group transition-all duration-300 rounded-lg ${
              index === activeIndex ? 'opacity-100 ring-2 ring-accent' : 'opacity-60 hover:opacity-80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            
            {index === activeIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                transition={{ duration: 0.3 }}
              />
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-sm">
              {String(index + 1).padStart(2, '0')}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Main Swiper Container */}
      <div className="absolute left-[11vw] top-0 w-[88vw] h-full ml-2">
        <Swiper
          modules={[EffectCreative, Parallax, Autoplay, Keyboard, Mousewheel, Pagination, Navigation]}
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -500],
              rotate: [0, 0, -15],
            },
            next: {
              shadow: true,
              translate: ['120%', 0, -500],
              rotate: [0, 0, 15],
            },
          }}
          parallax={true}
          speed={1200}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          pagination={false}
          navigation={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={handleSlideChange}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative">
              {/* Background Image with Parallax */}
              <div
                className="absolute inset-0"
                data-swiper-parallax="-23%"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Multi-layer gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content Container with Parallax */}
              <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                  {/* Subtitle with Parallax */}
                  <div
                    data-swiper-parallax="-300"
                    data-swiper-parallax-opacity="0"
                    data-swiper-parallax-duration="600"
                  >
                    <p className="text-accent text-sm md:text-base uppercase tracking-widest mb-4 font-bold flex items-center gap-3">
                      <span className="w-12 h-px bg-accent" />
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Title with Parallax */}
                  <div
                    data-swiper-parallax="-200"
                    data-swiper-parallax-opacity="0"
                    data-swiper-parallax-duration="800"
                  >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 md:mb-8 leading-tight">
                      {slide.title.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.6 }}
                          className="inline-block mr-3 md:mr-4"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h1>
                  </div>

                  {/* Description with Parallax */}
                  <div
                    data-swiper-parallax="-100"
                    data-swiper-parallax-opacity="0"
                    data-swiper-parallax-duration="1000"
                  >
                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* CTA Button with Parallax */}
                  <div
                    data-swiper-parallax="-50"
                    data-swiper-parallax-opacity="0"
                    data-swiper-parallax-duration="1200"
                  >
                    <Link href={slide.cta === 'Get Estimate' ? '/estimator' : '/portfolio'}>
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-white text-base md:text-lg px-8 py-6 md:px-10 md:py-7 shadow-2xl hover:shadow-accent/50 transition-all group"
                      >
                        {slide.cta}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6">
        {/* Progress Indicators */}
        <div className="flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
            >
              <div
                className={`h-1 transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 bg-accent shadow-lg shadow-accent/50'
                    : 'w-8 bg-white/30 hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={toggleAutoplay}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>

        {/* Slide Counter */}
        <div className="hidden md:flex items-center gap-3 text-white">
          <span className="text-2xl font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="text-white/50">/</span>
          <span className="text-lg text-white/50">{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-8 left-8 z-40 hidden lg:flex items-center gap-3 text-white/60 text-sm">
        <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 font-mono">←</div>
        <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 font-mono">→</div>
        <span>Use arrow keys or scroll to navigate</span>
      </div>
    </section>
  )
}

export default CarouselAdvanced
