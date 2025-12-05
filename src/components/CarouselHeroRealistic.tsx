'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageFlip } from 'page-flip';

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

const CarouselHeroRealistic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canFlipPrev, setCanFlipPrev] = useState(false);
  const [canFlipNext, setCanFlipNext] = useState(true);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!bookRef.current) return;

    // Initialize PageFlip with realistic settings for book spreads
    const pageFlip = new PageFlip(bookRef.current, {
      width: 600, // Width per page (half of spread)
      height: 800, // Height
      size: 'stretch', // Stretch to container
      minWidth: 315,
      maxWidth: 2000,
      minHeight: 400,
      maxHeight: 1200,
      drawShadow: true, // Realistic shadow
      flippingTime: 1000, // 1 second flip duration
      usePortrait: false, // Landscape mode
      startZIndex: 0,
      autoSize: true, // Auto-adjust to container
      maxShadowOpacity: 0.5, // Shadow intensity
      showCover: false, // No separate cover
      mobileScrollSupport: true, // Touch support
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 30, // Pixels to trigger flip
      showPageCorners: true, // Show page corners for realism
      disableFlipByClick: false, // Allow click to flip
    });

    pageFlipRef.current = pageFlip;

    // Load pages
    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    // Event listeners
    pageFlip.on('flip', (e: any) => {
      const newPage = e.data;
      // Each spread is 2 pages, so divide by 2 for slide index
      const slideIndex = Math.floor(newPage / 2);
      setActiveIndex(slideIndex);
      updateNavigationState(newPage);
    });

    pageFlip.on('changeOrientation', () => {
      pageFlip.updateFromHtml();
    });

    pageFlip.on('changeState', (e: any) => {
      updateNavigationState(pageFlip.getCurrentPageIndex());
    });

    // Handle window resize
    const handleResize = () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.updateFromHtml();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
      }
    };
  }, []);

  const updateNavigationState = (pageIndex: number) => {
    if (!pageFlipRef.current) return;
    const totalPages = heroSlides.length * 2; // 2 pages per slide
    setCanFlipPrev(pageIndex > 0);
    setCanFlipNext(pageIndex < totalPages - 1);
  };

  // Auto-play timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused && pageFlipRef.current && canFlipNext) {
        pageFlipRef.current.flipNext();
      } else if (!isPaused && pageFlipRef.current && !canFlipNext) {
        // Loop back to start
        pageFlipRef.current.flip(0);
      }
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, canFlipNext]);

  const handleNext = () => {
    if (pageFlipRef.current && canFlipNext) {
      pageFlipRef.current.flipNext();
    }
  };

  const handlePrev = () => {
    if (pageFlipRef.current && canFlipPrev) {
      pageFlipRef.current.flipPrev();
    }
  };

  const handleSlideClick = (index: number) => {
    if (pageFlipRef.current) {
      // Jump to the left page of the spread (even page number)
      pageFlipRef.current.flip(index * 2);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Vertical Image Stack - Left Side */}
      <div className="absolute left-0 top-0 h-full w-[10vw] flex flex-col gap-3 z-40 p-4">
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

      {/* PageFlip Book Container */}
      <div className="absolute left-[11vw] top-0 w-[88vw] h-full flex items-center justify-center ml-2">
        <div className="relative w-full h-full max-w-[1400px] max-h-[1000px]">
          {/* Book Container */}
          <div 
            ref={bookRef} 
            className="book-container w-full h-full"
            style={{
              perspective: '2000px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Pages - Each slide creates 2 pages (left and right spread) */}
            {heroSlides.map((slide, index) => (
              <React.Fragment key={slide.id}>
                {/* Left Page of Spread */}
                <div 
                  className="page bg-black relative overflow-hidden"
                  data-density="hard"
                >
                  {/* Left half of image */}
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full object-cover"
                      style={{ 
                        width: '200%', 
                        objectPosition: 'left center',
                        transform: 'translateX(0)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                  </div>

                  {/* Content on left page */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="w-full px-8 md:px-12">
                      <div className="backdrop-blur-sm bg-black/20 p-6 md:p-8 rounded-2xl border border-white/10">
                        <p className="text-accent text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 font-semibold flex items-center gap-2">
                          <span className="w-6 h-px bg-accent" />
                          {slide.subtitle}
                        </p>
                        
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                          {slide.title}
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* Page Number */}
                  <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-white/40 text-xs md:text-sm font-medium">
                    {index * 2 + 1}
                  </div>
                </div>

                {/* Right Page of Spread */}
                <div 
                  className="page bg-black relative overflow-hidden"
                  data-density="hard"
                >
                  {/* Right half of image */}
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full object-cover"
                      style={{ 
                        width: '200%', 
                        objectPosition: 'right center',
                        transform: 'translateX(-50%)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent" />
                  </div>

                  {/* Content on right page */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="w-full px-8 md:px-12">
                      <div className="backdrop-blur-sm bg-black/20 p-6 md:p-8 rounded-2xl border border-white/10">
                        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                          {slide.description}
                        </p>

                        <Button 
                          size="lg" 
                          className="bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-accent/50 transition-all group"
                        >
                          {slide.cta}
                          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Page Number */}
                  <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-white/40 text-xs md:text-sm font-medium">
                    {index * 2 + 2}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={!canFlipPrev}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
            canFlipPrev
              ? 'border-accent bg-accent/10 text-accent hover:bg-accent/20'
              : 'border-white/20 text-white/20 cursor-not-allowed'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Page Indicators */}
        <div className="flex items-center gap-2">
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

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!canFlipNext}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${
            canFlipNext
              ? 'border-accent bg-accent/10 text-accent hover:bg-accent/20'
              : 'border-white/20 text-white/20 cursor-not-allowed'
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pause/Play */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-12 h-12 rounded-full border-2 border-accent/40 hover:border-accent hover:bg-accent/10 flex items-center justify-center text-accent transition-all hover:scale-110"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
      </div>

      {/* Page Counter */}
      <div className="absolute top-8 right-8 z-40 text-white font-bold text-lg">
        <span className="text-4xl">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="text-white/50"> / {String(heroSlides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default CarouselHeroRealistic;
