'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pause, Play } from 'lucide-react';
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

const CarouselHeroUltraRealistic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!bookRef.current) return;

    let pageFlip: PageFlip | null = null;
    let isInitialized = false;

    // Initialize PageFlip with ultra-realistic settings
    try {
      pageFlip = new PageFlip(bookRef.current, {
        width: 700, // Width per page
        height: 900, // Height
        size: 'stretch',
        minWidth: 315,
        maxWidth: 2400,
        minHeight: 400,
        maxHeight: 1400,
        drawShadow: true,
        flippingTime: 1200, // Slower for more realism (1.2s)
        usePortrait: false,
        startZIndex: 0,
        autoSize: true,
        maxShadowOpacity: 0.7, // Darker shadows for depth
        showCover: false,
        mobileScrollSupport: true,
        clickEventForward: true,
        useMouseEvents: true,
        swipeDistance: 30,
        showPageCorners: true,
        disableFlipByClick: false,
      });

      pageFlipRef.current = pageFlip;

      // Event listeners - set up before loading pages
      if (pageFlip) {
        pageFlip.on('flip', (e: any) => {
          const newPage = e.data;
          const slideIndex = Math.floor(newPage / 2);
          setActiveIndex(slideIndex);
        });

        pageFlip.on('changeOrientation', () => {
          if (pageFlip) {
            pageFlip.updateFromHtml();
          }
        });
      }

      // Load pages after a small delay to ensure DOM is ready
      setTimeout(() => {
        const pages = document.querySelectorAll('.book-page');
        if (pages.length > 0 && pageFlip) {
          try {
            pageFlip.loadFromHTML(pages);
            isInitialized = true;
          } catch (error) {
            console.error('Error loading pages:', error);
          }
        }
      }, 100);
    } catch (error) {
      console.error('Error initializing PageFlip:', error);
    }

    // Handle window resize
    const handleResize = () => {
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.updateFromHtml();
        } catch (error) {
          console.error('Error updating on resize:', error);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Safe cleanup - only destroy if properly initialized
      if (pageFlipRef.current && isInitialized) {
        try {
          // PageFlip doesn't have a destroy method, just clear the ref
          pageFlipRef.current = null;
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    };
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      if (!isPaused && pageFlipRef.current) {
        try {
          const currentPage = pageFlipRef.current.getCurrentPageIndex();
          const totalPages = heroSlides.length * 2;
          
          if (currentPage < totalPages - 1) {
            pageFlipRef.current.flipNext();
          } else {
            pageFlipRef.current.flip(0); // Loop back to start
          }
        } catch (error) {
          console.error('Error during auto-play:', error);
        }
      }
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleSlideClick = (index: number) => {
    if (pageFlipRef.current) {
      try {
        // Jump to the left page of the spread (even page number)
        pageFlipRef.current.flip(index * 2);
      } catch (error) {
        console.error('Error flipping to page:', error);
      }
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

      {/* PageFlip Book Container - Right Area */}
      <div className="absolute left-[11vw] top-0 w-[88vw] h-full flex items-center justify-center ml-2">
        <div className="relative w-full h-full max-w-[2400px] max-h-[1400px] flex items-center justify-center">
          {/* Book Container */}
          <div 
            ref={bookRef} 
            className="book-wrapper"
            style={{
              perspective: '2500px',
              perspectiveOrigin: '50% 50%',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Pages - Each slide creates 2 pages (left and right spread) */}
            {heroSlides.map((slide, index) => (
              <React.Fragment key={slide.id}>
                {/* Left Page of Spread */}
                <div 
                  className="book-page"
                  data-density="hard"
                  style={{
                    backgroundColor: '#000',
                  }}
                >
                  <div className="page-content" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                    {/* Left half of image */}
                    <div style={{ position: 'absolute', inset: 0 }}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        style={{ 
                          width: '200%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'left center',
                          transform: 'translateX(0)',
                        }}
                      />
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent)' 
                      }} />
                    </div>

                    {/* Content on left page */}
                    <div style={{ 
                      position: 'relative', 
                      zIndex: 10, 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '0 3rem',
                    }}>
                      <div style={{ width: '100%' }}>
                        <div style={{
                          backdropFilter: 'blur(8px)',
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          padding: '2rem',
                          borderRadius: '1rem',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                          <p style={{
                            color: 'hsl(24.6 95% 53.1%)',
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '1rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}>
                            <span style={{ width: '2rem', height: '1px', backgroundColor: 'hsl(24.6 95% 53.1%)' }} />
                            {slide.subtitle}
                          </p>
                          
                          <h1 style={{
                            fontSize: 'clamp(2rem, 4vw, 4rem)',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '1.5rem',
                            lineHeight: 1.2,
                          }}>
                            {slide.title}
                          </h1>
                        </div>
                      </div>
                    </div>

                    {/* Page Number */}
                    <div style={{
                      position: 'absolute',
                      bottom: '2rem',
                      left: '2rem',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}>
                      {index * 2 + 1}
                    </div>
                  </div>
                </div>

                {/* Right Page of Spread */}
                <div 
                  className="book-page"
                  data-density="hard"
                  style={{
                    backgroundColor: '#000',
                  }}
                >
                  <div className="page-content" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                    {/* Right half of image */}
                    <div style={{ position: 'absolute', inset: 0 }}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        style={{ 
                          width: '200%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'right center',
                          transform: 'translateX(-50%)',
                        }}
                      />
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'linear-gradient(to left, rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent)' 
                      }} />
                    </div>

                    {/* Content on right page */}
                    <div style={{ 
                      position: 'relative', 
                      zIndex: 10, 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '0 3rem',
                    }}>
                      <div style={{ width: '100%' }}>
                        <div style={{
                          backdropFilter: 'blur(8px)',
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          padding: '2rem',
                          borderRadius: '1rem',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                          <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                          }}>
                            {slide.description}
                          </p>

                          <Button 
                            size="lg" 
                            className="bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-accent/50 transition-all group"
                          >
                            {slide.cta}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Page Number */}
                    <div style={{
                      position: 'absolute',
                      bottom: '2rem',
                      right: '2rem',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}>
                      {index * 2 + 2}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
        {/* Page Indicators */}
        <div className="flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideClick(index)}
              className="group relative"
            >
              <div className={`h-1 transition-all duration-300 rounded-full ${
                index === activeIndex ? 'w-12 bg-accent' : 'w-8 bg-white/30 hover:bg-white/50'
              }`} />
            </button>
          ))}
        </div>

        {/* Pause/Play */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-12 h-12 rounded-full border-2 border-accent/40 hover:border-accent hover:bg-accent/10 flex items-center justify-center text-accent transition-all hover:scale-110"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
      </div>

      {/* Page Counter - Top Right */}
      <div className="absolute top-8 right-8 z-40 text-white font-bold text-lg">
        <span className="text-4xl">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="text-white/50"> / {String(heroSlides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default CarouselHeroUltraRealistic;
