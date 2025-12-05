'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Pause, Play } from 'lucide-react';

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
];

const CarouselTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFolding, setIsFolding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex]);

  const handleNext = () => {
    const next = (activeIndex + 1) % testimonials.length;
    setNextIndex(next);
    setIsFolding(true);
    setTimeout(() => {
      setActiveIndex(next);
      setIsFolding(false);
    }, 800);
  };

  const handleTestimonialClick = (index: number) => {
    if (index !== activeIndex) {
      setNextIndex(index);
      setIsFolding(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsFolding(false);
      }, 800);
    }
  };

  const activeTestimonial = testimonials[activeIndex];
  const currentTestimonial = testimonials[activeIndex];
  const nextTestimonial = testimonials[nextIndex];

  return (
    <section 
      className="relative min-h-screen py-20 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest text-accent mb-4">Testimonials</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it—hear from the companies we've helped transform
          </p>
        </motion.div>
      </div>

      <div className="relative h-[600px] flex">
        {/* Main Content Area - Left Side (65vw) */}
        <div className="w-[65vw] h-full flex items-center">
          <div className="container mx-auto px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: isFolding ? 0.5 : 0 }}
                className="max-w-3xl"
              >
                <motion.div
                  className="backdrop-blur-sm bg-card/30 p-8 rounded-2xl border border-border/50 hover:border-accent/30 transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: isFolding ? 0.7 : 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Quote className="w-16 h-16 text-accent mb-6" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div 
                    className="flex gap-1 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isFolding ? 0.8 : 0.3 }}
                  >
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: isFolding ? 0.8 + i * 0.05 : 0.3 + i * 0.05, type: "spring" }}
                      >
                        <Star className="w-6 h-6 fill-accent text-accent drop-shadow-lg" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Quote */}
                  <motion.blockquote 
                    className="text-3xl md:text-4xl font-medium leading-relaxed mb-8 text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isFolding ? 0.9 : 0.4 }}
                  >
                    "{activeTestimonial.quote}"
                  </motion.blockquote>

                  {/* Author Info */}
                  <motion.div 
                    className="flex items-center justify-between flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isFolding ? 1 : 0.5 }}
                  >
                    <div>
                      <p className="text-xl font-bold text-foreground">{activeTestimonial.author}</p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <span className="text-accent">●</span>
                        {activeTestimonial.role} at {activeTestimonial.company}
                      </p>
                    </div>

                    {/* Metric Badge */}
                    <motion.div 
                      className="px-6 py-3 bg-accent/10 border-2 border-accent rounded-full shadow-lg shadow-accent/20"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)" }}
                    >
                      <p className="text-accent font-bold whitespace-nowrap">{activeTestimonial.metric}</p>
                    </motion.div>
                  </motion.div>

                  {/* Controls */}
                  <motion.div 
                    className="flex items-center gap-4 mt-8 pt-6 border-t border-border/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: isFolding ? 1.1 : 0.6 }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPaused(!isPaused);
                      }}
                      className="w-10 h-10 rounded-full border-2 border-border hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-all hover:scale-110"
                    >
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </button>

                    {/* Progress Dots */}
                    <div className="flex items-center gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleTestimonialClick(index)}
                          className="group relative"
                        >
                          <div className={`h-1 transition-all duration-300 rounded-full ${
                            index === activeIndex ? 'w-12 bg-accent shadow-lg shadow-accent/50' : 'w-8 bg-muted-foreground/30 hover:bg-accent/50'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Image Carousel with Book-Fold - Right Side (35vw) */}
        <div className="w-[35vw] h-full relative">
          {/* Vertical Thumbnails Stack - Far Right (8vw) */}
          <div className="absolute right-0 top-0 h-full w-[8vw] flex flex-col gap-2 z-30">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => handleTestimonialClick(index)}
                className={`relative flex-1 overflow-hidden cursor-pointer group transition-all duration-300 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
                
                {/* Active Indicator */}
                {index === activeIndex && (
                  <motion.div
                    layoutId="activeTestimonialIndicator"
                    className="absolute right-0 top-0 bottom-0 w-1 bg-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Number */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Main Image with Book-Fold (25vw) */}
          <div className="absolute left-0 top-0 w-[25vw] h-full overflow-hidden" style={{ perspective: '3000px' }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
              >
                {/* Next Open Book (Underneath) - Shows after transition completes OR during fold */}
                <div className="absolute inset-0">
                  <img
                    src={isFolding ? nextTestimonial.image : activeTestimonial.image}
                    alt={isFolding ? nextTestimonial.author : activeTestimonial.author}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/10" />
                </div>

                {/* Current Open Book - Stays visible until right page flips */}
                {isFolding && (
                  <>
                    {/* Left Page of Current Book (Static) */}
                    <div className="absolute inset-0 w-1/2 z-10">
                      <div className="w-full h-full relative overflow-hidden">
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.author}
                          className="absolute inset-0 w-[200%] h-full object-cover"
                          style={{ left: '0' }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/10" />
                    </div>

                    {/* Right Page of Current Book (Folds Over) */}
                    <motion.div
                      className="absolute inset-0 left-1/2 w-1/2 origin-left z-20"
                      style={{ transformStyle: 'preserve-3d' }}
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: -180 }}
                      transition={{
                        duration: 1.6,
                        ease: [0.16, 1, 0.3, 1],
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                      }}
                    >
                      {/* Front: Right Page of Current Book */}
                      <div
                        className="absolute inset-0 w-full h-full overflow-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.author}
                          className="absolute inset-0 w-[200%] h-full object-cover"
                          style={{ right: '0', left: 'auto' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/10 to-background/20" />
                        <div className="absolute inset-0" style={{ boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.3)' }} />
                      </div>

                      {/* Back: Shows Left Page of Next Book (mirrored) */}
                      <div
                        className="absolute inset-0 w-full h-full overflow-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <img
                          src={nextTestimonial.image}
                          alt={nextTestimonial.author}
                          className="absolute inset-0 w-[200%] h-full object-cover scale-x-[-1]"
                          style={{ right: '0', left: 'auto' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/20" />
                        <div className="absolute inset-0" style={{ boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.3)' }} />
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute top-8 right-8 z-40 font-bold text-lg">
        <span className="text-4xl text-foreground">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="text-muted-foreground"> / {String(testimonials.length).padStart(2, '0')}</span>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default CarouselTestimonials;
