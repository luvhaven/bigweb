'use client'

import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Parallax, Autoplay, Keyboard, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import { Star, Quote, Pause, Play } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/parallax'

const testimonials = [
  {
    id: 1,
    quote: "Working with this team transformed our entire digital strategy. They didn't just build a website—they built a revenue-generating machine that exceeded all our KPIs.",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechVision Inc",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=90",
    rating: 5,
    metric: "300% ROI Increase",
  },
  {
    id: 2,
    quote: "The level of craftsmanship and attention to detail is unmatched. Every pixel perfect, every interaction smooth. Our users have never been more engaged.",
    author: "Michael Rodriguez",
    role: "VP of Product",
    company: "CloudScale",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=90",
    rating: 5,
    metric: "98% User Satisfaction",
  },
  {
    id: 3,
    quote: "From discovery to launch, the process was seamless. They understood our vision and delivered beyond our expectations. Best agency we've worked with, hands down.",
    author: "Emily Thompson",
    role: "Marketing Director",
    company: "GrowthLab",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=90",
    rating: 5,
    metric: "2 Week Launch",
  },
  {
    id: 4,
    quote: "The results speak for themselves. Our conversion rate tripled, bounce rate dropped significantly, and revenue is up 250%. This investment paid for itself in 3 months.",
    author: "David Park",
    role: "Founder",
    company: "StartupHub",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=90",
    rating: 5,
    metric: "250% Revenue Growth",
  },
]

const CarouselTestimonialsAdvanced = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [quoteKey, setQuoteKey] = useState(0)
  const [isEmerging, setIsEmerging] = useState(false)
  const [clickedThumbnailY, setClickedThumbnailY] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
    // Trigger quote animation on each slide change
    setQuoteKey(prev => prev + 1)
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

  const goToSlide = (index: number, thumbnailIndex?: number) => {
    if (swiperRef.current && index !== activeIndex) {
      // Trigger emergence animation
      setIsEmerging(true)
      
      // Calculate thumbnail position for emergence effect
      if (thumbnailIndex !== undefined && thumbnailRefs.current[thumbnailIndex]) {
        const thumbnailEl = thumbnailRefs.current[thumbnailIndex]
        const rect = thumbnailEl.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const thumbnailCenter = rect.top + rect.height / 2
        const relativeY = (thumbnailCenter / viewportHeight) * 100
        setClickedThumbnailY(relativeY)
      }
      
      swiperRef.current.slideToLoop(index)
      
      // Reset emergence after animation completes
      setTimeout(() => {
        setIsEmerging(false)
      }, 1500)
    }
  }

  return (
    <section className="relative min-h-screen py-20 bg-background overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-bold">Testimonials</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it—hear from the companies we've helped transform
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative h-[600px] flex">
        {/* Vertical Thumbnail Navigation - Right Side */}
        <div className="absolute right-0 top-0 h-full w-[8vw] flex flex-col gap-2 z-40 p-2">
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={testimonial.id}
              ref={(el) => { thumbnailRefs.current[index] = el }}
              onClick={() => goToSlide(index, index)}
              className={`relative flex-1 overflow-hidden cursor-pointer group transition-all duration-300 rounded-lg ${
                index === activeIndex ? 'opacity-100 ring-2 ring-accent' : 'opacity-60 hover:opacity-80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
              
              {index === activeIndex && (
                <motion.div
                  layoutId="activeTestimonialIndicator"
                  className="absolute right-0 top-0 bottom-0 w-1 bg-accent"
                  transition={{ duration: 0.3 }}
                />
              )}

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-xs">
                {String(index + 1).padStart(2, '0')}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Main Swiper Container */}
        <div className="absolute left-0 top-0 w-[90vw] h-full pr-[10vw]">
          <Swiper
            modules={[EffectCreative, Parallax, Autoplay, Keyboard, Mousewheel]}
            effect="creative"
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-100%', 0, -400],
                rotate: [0, 0, -10],
              },
              next: {
                shadow: true,
                translate: ['100%', 0, -400],
                rotate: [0, 0, 10],
              },
            }}
            parallax={true}
            speed={1200}
            loop={true}
            autoplay={{
              delay: 6000,
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
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
            className="h-full w-full"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="relative">
                <div className="h-full flex items-center">
                  <div className="container mx-auto px-12 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      {/* Left: Image with Parallax and Emergence */}
                      <motion.div
                        className="relative h-[500px] rounded-2xl overflow-hidden"
                        data-swiper-parallax="-200"
                        initial={isEmerging ? { 
                          opacity: 0, 
                          scale: 0.3,
                          y: `${clickedThumbnailY - 50}vh`,
                          x: '40vw'
                        } : {}}
                        animate={isEmerging ? { 
                          opacity: 1, 
                          scale: 1,
                          y: 0,
                          x: 0
                        } : {}}
                        transition={isEmerging ? { 
                          duration: 0.7,
                          delay: 0,
                          ease: [0.16, 1, 0.3, 1]
                        } : {}}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Floating Metric Badge */}
                        <motion.div
                          className="absolute bottom-6 left-6 right-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: isEmerging ? 0.9 : 0.5 }}
                        >
                          <div className="px-6 py-4 bg-accent/90 backdrop-blur-md rounded-xl shadow-2xl shadow-accent/30">
                            <p className="text-white font-bold text-xl text-center">{testimonial.metric}</p>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Right: Content with Parallax */}
                      <div className="space-y-6">
                        {/* Quote Icon with Parallax and Bounce Animation */}
                        <motion.div
                          data-swiper-parallax="-300"
                          data-swiper-parallax-opacity="0"
                          data-swiper-parallax-duration="600"
                          initial={isEmerging ? { 
                            opacity: 0,
                            scale: 0.3,
                            y: `${clickedThumbnailY - 50}vh`,
                            x: '20vw'
                          } : {}}
                          animate={isEmerging ? { 
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            x: 0
                          } : {}}
                          transition={isEmerging ? { 
                            duration: 0.6,
                            delay: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                          } : {}}
                        >
                          <motion.div
                            key={quoteKey}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: isEmerging ? 1.2 : 0.4,
                              type: "spring", 
                              stiffness: 200,
                              damping: 12
                            }}
                          >
                            <Quote className="w-16 h-16 text-accent" />
                          </motion.div>
                        </motion.div>

                        {/* Rating with Parallax and Emergence */}
                        <motion.div
                          className="flex gap-1"
                          data-swiper-parallax="-250"
                          data-swiper-parallax-opacity="0"
                          data-swiper-parallax-duration="700"
                          initial={isEmerging ? { 
                            opacity: 0,
                            y: `${clickedThumbnailY - 50}vh`,
                            x: '20vw'
                          } : {}}
                          animate={isEmerging ? { 
                            opacity: 1,
                            y: 0,
                            x: 0
                          } : {}}
                          transition={isEmerging ? { 
                            duration: 0.5,
                            delay: 1.0,
                            ease: [0.16, 1, 0.3, 1]
                          } : {}}
                        >
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                delay: isEmerging ? 1.3 + i * 0.08 : 0.3 + i * 0.05, 
                                type: "spring",
                                stiffness: 300,
                                damping: 15
                              }}
                            >
                              <Star className="w-6 h-6 fill-accent text-accent drop-shadow-lg" />
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Quote with Parallax and Emergence */}
                        <motion.div
                          data-swiper-parallax="-200"
                          data-swiper-parallax-opacity="0"
                          data-swiper-parallax-duration="800"
                          initial={isEmerging ? { 
                            opacity: 0,
                            y: 20
                          } : {}}
                          animate={isEmerging ? { 
                            opacity: 1,
                            y: 0
                          } : {}}
                          transition={isEmerging ? { 
                            duration: 0.5,
                            delay: 1.2,
                            ease: [0.16, 1, 0.3, 1]
                          } : {}}
                        >
                          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
                            "{testimonial.quote}"
                          </blockquote>
                        </motion.div>

                        {/* Author Info with Parallax and Emergence */}
                        <motion.div
                          data-swiper-parallax="-150"
                          data-swiper-parallax-opacity="0"
                          data-swiper-parallax-duration="900"
                          initial={isEmerging ? { 
                            opacity: 0,
                            y: 20
                          } : {}}
                          animate={isEmerging ? { 
                            opacity: 1,
                            y: 0
                          } : {}}
                          transition={isEmerging ? { 
                            duration: 0.4,
                            delay: 1.3,
                            ease: [0.16, 1, 0.3, 1]
                          } : {}}
                        >
                          <div className="pt-6 border-t border-border/50">
                            <p className="text-xl font-bold text-foreground">{testimonial.author}</p>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1">
                              <span className="text-accent">●</span>
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </motion.div>

                        {/* Controls with Parallax and Emergence */}
                        <motion.div
                          className="flex items-center gap-4 pt-6"
                          data-swiper-parallax="-100"
                          data-swiper-parallax-opacity="0"
                          data-swiper-parallax-duration="1000"
                          initial={isEmerging ? { 
                            opacity: 0,
                            y: 20
                          } : {}}
                          animate={isEmerging ? { 
                            opacity: 1,
                            y: 0
                          } : {}}
                          transition={isEmerging ? { 
                            duration: 0.4,
                            delay: 1.4,
                            ease: [0.16, 1, 0.3, 1]
                          } : {}}
                        >
                          {/* Pause/Play Button */}
                          <button
                            onClick={toggleAutoplay}
                            className="w-10 h-10 rounded-full border-2 border-border hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-all hover:scale-110"
                          >
                            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                          </button>

                          {/* Progress Dots */}
                          <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="group relative"
                              >
                                <div
                                  className={`h-1 transition-all duration-300 rounded-full ${
                                    index === activeIndex
                                      ? 'w-12 bg-accent shadow-lg shadow-accent/50'
                                      : 'w-8 bg-muted-foreground/30 hover:bg-accent/50'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>

                          {/* Counter */}
                          <div className="ml-auto flex items-center gap-2 text-foreground">
                            <span className="text-2xl font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-lg text-muted-foreground">{String(testimonials.length).padStart(2, '0')}</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
    </section>
  )
}

export default CarouselTestimonialsAdvanced
