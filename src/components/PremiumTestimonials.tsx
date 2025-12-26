'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { testimonialsAPI, type Testimonial } from '@/lib/api/testimonials'

export default function PremiumTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
    const safetyTimer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(safetyTimer)
  }, [])

  const loadTestimonials = async () => {
    try {
      const data = await testimonialsAPI.getFeatured()
      if (data && data.length > 0) {
        setTestimonials(data)
      } else {
        // Fallback to demo data if no testimonials in database
        setTestimonials([
          {
            id: '1',
            client_name: "Sarah Jenkins",
            client_role: "Marketing Director",
            client_company: "TechFlow Solutions",
            content: "BIGWEB transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 412% increase in conversions.",
            rating: 5,
            client_image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
            result_metric: "+412% Conversions",
            is_featured: true,
            status: 'active',
            order_index: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            client_name: "Kwame Osei",
            client_role: "Tech Founder",
            client_company: "Innovate Africa",
            content: "The scalability of the architecture they built allowed us to expand to three new countries in under six months. World-class engineering.",
            rating: 5,
            client_image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&q=80",
            result_metric: "3 New Markets",
            is_featured: true,
            status: 'active',
            order_index: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '3',
            client_name: "Lars Nielsen",
            client_role: "Product Lead",
            client_company: "Nordic Design Co.",
            content: "Minimalist, efficient, and incredibly powerful. They understood our Scandinavian design ethos perfectly while delivering robust functionality.",
            rating: 5,
            client_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
            result_metric: "200% Efficiency",
            is_featured: true,
            status: 'active',
            order_index: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '4',
            client_name: "Isabella Rossi",
            client_role: "Creative Director",
            client_company: "Milano Fashion",
            content: "A digital masterpiece. The animations and interactions feel so organic. Our luxury clientele finally has an online experience that matches our brand.",
            rating: 5,
            client_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
            result_metric: "Award Winning",
            is_featured: true,
            status: 'active',
            order_index: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '5',
            client_name: "Amir Al-Fayed",
            client_role: "CEO",
            client_company: "Future Vision Holdings",
            content: "We needed a partner who could execute at the speed of Dubai. BIGWEB delivered a complex enterprise solution weeks ahead of schedule.",
            rating: 5,
            client_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
            result_metric: "2x Revenue",
            is_featured: true,
            status: 'active',
            order_index: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ] as Testimonial[])
      }
    } catch (error) {
      setLoading(false)
      // Fallback to demo data if API fails
      setTestimonials([
        {
          id: '1',
          client_name: "Sarah Jenkins",
          client_role: "Marketing Director",
          client_company: "TechFlow Solutions",
          content: "BIGWEB transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 412% increase in conversions.",
          rating: 5,
          client_image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
          result_metric: "+412% Conversions",
          is_featured: true,
          status: 'active',
          order_index: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          client_name: "Kwame Osei",
          client_role: "Tech Founder",
          client_company: "Innovate Africa",
          content: "The scalability of the architecture they built allowed us to expand to three new countries in under six months. World-class engineering.",
          rating: 5,
          client_image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&q=80",
          result_metric: "3 New Markets",
          is_featured: true,
          status: 'active',
          order_index: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          client_name: "Lars Nielsen",
          client_role: "Product Lead",
          client_company: "Nordic Design Co.",
          content: "Minimalist, efficient, and incredibly powerful. They understood our Scandinavian design ethos perfectly while delivering robust functionality.",
          rating: 5,
          client_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
          result_metric: "200% Efficiency",
          is_featured: true,
          status: 'active',
          order_index: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ] as Testimonial[])
    } finally {
      setLoading(false)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection
      if (nextIndex < 0) return testimonials.length - 1
      if (nextIndex >= testimonials.length) return 0
      return nextIndex
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 8000)

    return () => clearInterval(timer)
  }, [currentIndex])

  if (loading || testimonials.length === 0) {
    return (
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-mesh texture-noise">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-mesh texture-noise">
      {/* Premium background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Real Results, Real Revenue
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-luxury">
            Trusted by <span className="gradient-text-luxury">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            From 4x conversion increases to multi-million dollar revenue growth—see what happens when you choose the right partner
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute w-full"
              >
                <div className="card-elite card-hover-premium p-8 md:p-12 relative overflow-hidden">
                  {/* Quote icon with bounce animation */}
                  <motion.div
                    className="absolute top-8 right-8 opacity-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2
                    }}
                  >
                    <Quote className="w-32 h-32 text-accent" />
                  </motion.div>

                  <div className="relative z-10">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed text-balance">
                      "{testimonials[currentIndex]?.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div className="flex items-center gap-4">
                        <motion.img
                          src={testimonials[currentIndex]?.client_image}
                          alt={testimonials[currentIndex]?.client_name}
                          className="w-16 h-16 rounded-full border-2 border-accent/30 shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        />
                        <div>
                          <div className="font-bold text-lg">{testimonials[currentIndex]?.client_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonials[currentIndex]?.client_role} at {testimonials[currentIndex]?.client_company}
                          </div>
                        </div>
                      </div>

                      {/* Result Badge */}
                      {testimonials[currentIndex]?.result_metric && (
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 to-orange-500/20 border border-accent/30">
                          <span className="text-accent font-bold text-lg">
                            {testimonials[currentIndex]?.result_metric}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full w-12 h-12 hover:bg-accent/10 transition-elegant"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? 'w-8 h-2 bg-accent'
                    : 'w-2 h-2 bg-accent/30 hover:bg-accent/50'
                    }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full w-12 h-12 hover:bg-accent/10 transition-elegant"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
