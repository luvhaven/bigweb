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

const CarouselHeroFixed = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused && !isTransitioning) {
        handleNext();
      }
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex, isTransitioning]);

  const handleNext = () => {
    if (isTransitioning) return;
    const next = (activeIndex + 1) % heroSlides.length;
    animatePageTurn(next);
  };

  const handleSlideClick = (index: number) => {
    if (index !== activeIndex && !isTransitioning) {
      animatePageTurn(index);
    }
  };

  const animatePageTurn = (nextIdx: number) => {
    setIsTransitioning(true);
    setNextIndex(nextIdx);

    if (!rightPageRef.current || !leftPageRef.current) return;

    const tl = gsap.timeline({
      onStart: () => {
        // Reset right page rotation
        gsap.set(rightPageRef.current, { rotateY: 0 });
      },
      onComplete: () => {
        setActiveIndex(nextIdx);
        setIsTransitioning(false);
        // Reset for next animation
        gsap.set(rightPageRef.current, { rotateY: 0 });
      }
    });

    // Left page shadow effect
    tl.to(leftPageRef.current, {
      filter: 'brightness(0.85)',
      duration: 0.6,
      ease: 'power1.inOut',
    }, 0);

    // Right page flips over with book-like physics
    tl.to(rightPageRef.current, {
      rotateY: -180,
      duration: 1.4,
      ease: 'power2.inOut',
    }, 0);

    // Restore left page brightness
    tl.to(leftPageRef.current, {
      filter: 'brightness(1)',
      duration: 0.6,
      ease: 'power1.inOut',
    }, 0.8);
  };

  const activeSlide = heroSlides[activeIndex];
  const currentSlide = heroSlides[activeIndex];
  const nextSlide = heroSlides[nextIndex];

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Vertical Image Stack - Left Side */}
      <div className="absolute left-0 top-0 h-full w-[10vw] flex flex-col gap-3 z-30 p-4">
        {heroSlides.map((slide, index) => (
          <motion.button
            key={slide.id}
            onClick={() => handleSlideClick(index)}
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

      {/* Main Content Area - Book Fold Effect */}
      <div className="absolute left-[11vw] top-0 w-[88vw] h-full overflow-hidden ml-2">
        <div className="relative w-full h-full" style={{ perspective: '2000px' }}>
          {/* Base/Next Image (Always visible underneath) */}
          <div className="absolute inset-0 z-0">
            <img
              src={isTransitioning ? nextSlide.image : activeSlide.image}
              alt={isTransitioning ? nextSlide.title : activeSlide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Book Pages - Only visible during transition */}
          {isTransitioning && (
            <div className="absolute inset-0 z-10">
              {/* Left Page (Static) */}
              <div
                ref={leftPageRef}
                className="absolute inset-y-0 left-0 w-[calc(50%-8px)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: '200%', objectPosition: 'left' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                  {/* Spine shadow */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/40 to-transparent" />
                </div>
              </div>

              {/* Right Page (Flips) */}
              <div
                ref={rightPageRef}
                className="absolute inset-y-0 left-[calc(50%+8px)] w-[calc(50%-8px)] z-20"
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
              >
                {/* Front Face - Current image right half */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: '200%', objectPosition: 'right', right: 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40" />
                  {/* Page edge shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/50 to-transparent" />
                </div>

                {/* Back Face - Next image left half (mirrored) */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <img
                    src={nextSlide.image}
                    alt={nextSlide.title}
                    className="absolute inset-0 h-full object-cover scale-x-[-1]"
                    style={{ width: '200%', objectPosition: 'right' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/40" />
                  {/* Back page glow */}
                  <div className="absolute inset-0" style={{ boxShadow: 'inset 15px 0 30px rgba(0,0,0,0.6)' }} />
                </div>
              </div>

              {/* Center Gap/Spine */}
              <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-sm" />
            </div>
          )}
        </div>

        {/* Content Overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0 flex items-center z-40 pointer-events-none"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: isTransitioning ? 0.6 : 0 }}
          >
            <div className="container mx-auto px-12 max-w-4xl pointer-events-auto">
              <motion.div
                className="backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/10"
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(0,0,0,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-accent text-sm uppercase tracking-widest mb-4 font-semibold flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isTransitioning ? 0.8 : 0.2 }}
                >
                  <span className="w-8 h-px bg-accent" />
                  {activeSlide.subtitle}
                </motion.p>
                
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isTransitioning ? 0.9 : 0.3 }}
                >
                  {activeSlide.title}
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isTransitioning ? 1 : 0.4 }}
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isTransitioning ? 1.1 : 0.5 }}
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

export default CarouselHeroFixed;
