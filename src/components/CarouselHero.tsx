'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { gsap } from 'gsap';

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
];

const CarouselHero = () => {
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
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex]);

  const handleNext = () => {
    const next = (activeIndex + 1) % heroSlides.length;
    setNextIndex(next);
    setIsFolding(true);
    setTimeout(() => {
      setActiveIndex(next);
      setIsFolding(false);
    }, 700);
  };

  const handleSlideClick = (index: number) => {
    if (index !== activeIndex) {
      setNextIndex(index);
      setIsFolding(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsFolding(false);
      }, 800);
    }
  };

  const activeSlide = heroSlides[activeIndex];
  const currentSlide = heroSlides[activeIndex];
  const nextSlide = heroSlides[nextIndex];

  return (
    <section 
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Vertical Image Stack - Left Side (10vw) with margin */}
      <div className="absolute left-0 top-0 h-full w-[10vw] flex flex-col gap-3 z-30 p-4">
        {heroSlides.map((slide, index) => (
          <motion.button
            key={slide.id}
            onClick={() => handleSlideClick(index)}
            className={`relative flex-1 overflow-hidden cursor-pointer group transition-all duration-300 ${
              index === activeIndex ? 'opacity-100' : 'opacity-60 hover:opacity-80'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            
            {/* Active Indicator */}
            {index === activeIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Slide Number */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-sm">
              {String(index + 1).padStart(2, '0')}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Main Content Area with Book-Fold Animation - with left margin */}
      <div className="absolute left-[11vw] top-0 w-[88vw] h-full overflow-hidden ml-2" style={{ perspective: '3000px' }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
          >
            {/* Next Open Book (Underneath) - Shows after transition completes OR during fold */}
            <div className="absolute inset-0">
              <img
                src={isFolding ? nextSlide.image : activeSlide.image}
                alt={isFolding ? nextSlide.title : activeSlide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Current Open Book - Stays visible until right page flips */}
            {isFolding && (
              <>
                {/* Left Page of Current Book (Static - Never Moves) */}
                <div className="absolute inset-0 w-[calc(50%-6px)] z-10">
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="absolute inset-0 w-[200%] h-full object-cover"
                      style={{ left: '0' }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>

                {/* Right Page of Current Book (Folds Over) */}
                <motion.div
                  className="absolute inset-0 left-[calc(50%+6px)] w-[calc(50%-6px)] origin-left z-20"
                  style={{ transformStyle: 'preserve-3d' }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 60,
                    damping: 22,
                  }}
                >
                  {/* Front: Right Page of Current Book */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="absolute inset-0 w-[200%] h-full object-cover"
                      style={{ right: '0', left: 'auto' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40" />
                    {/* Enhanced shadow for depth */}
                    <div className="absolute inset-0 shadow-2xl" style={{ boxShadow: 'inset -15px 0 30px rgba(0,0,0,0.6)' }} />
                    {/* Page spine shadow */}
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.3)' }} />
                  </div>

                  {/* Back: Shows Left Page of Next Book (mirrored) */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <img
                      src={nextSlide.image}
                      alt={nextSlide.title}
                      className="absolute inset-0 w-[200%] h-full object-cover scale-x-[-1]"
                      style={{ right: '0', left: 'auto' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/40" />
                    {/* Enhanced shadow on back side */}
                    <div className="absolute inset-0" style={{ boxShadow: 'inset 15px 0 30px rgba(0,0,0,0.7)' }} />
                    {/* Soft glow effect */}
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="relative h-full flex items-center z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: isFolding ? 0.5 : 0 }}
          >
            <div className="container mx-auto px-12 max-w-4xl">
              <motion.div
                className="backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/10"
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-accent text-sm uppercase tracking-widest mb-4 font-semibold flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isFolding ? 0.7 : 0.2 }}
                >
                  <span className="w-8 h-px bg-accent" />
                  {activeSlide.subtitle}
                </motion.p>
                
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isFolding ? 0.8 : 0.3 }}
                >
                  {activeSlide.title}
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isFolding ? 0.9 : 0.4 }}
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isFolding ? 1 : 0.5 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-accent/50 transition-all group"
                  >
                    {activeSlide.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPaused(!isPaused);
                    }}
                    className="w-12 h-12 rounded-full border-2 border-white/40 hover:border-accent hover:bg-accent/10 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideClick(index)}
            className="group relative"
          >
            <div className={`h-1 transition-all duration-300 ${
              index === activeIndex ? 'w-12 bg-accent' : 'w-8 bg-white/30 hover:bg-white/50'
            }`} />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-40 text-white font-bold text-lg">
        <span className="text-4xl">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="text-white/50"> / {String(heroSlides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default CarouselHero;
