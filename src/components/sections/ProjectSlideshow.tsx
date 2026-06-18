'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/projects/luxury-ecommerce.png',
  '/projects/fintech-banking.png',
  '/projects/ai-agent-platform.png',
  '/projects/b2b-enterprise-software.png',
  '/projects/high-end-real-estate.png',
  '/projects/saas-dashboard.png',
  '/projects/fashion-ecommerce.png',
  '/projects/web3-crypto.png',
  '/projects/architecture-portfolio.png',
  '/projects/automotive-ev.png',
  '/projects/luxury-hospitality.png',
  '/projects/fintech-wealth.png',
  '/projects/creative-agency.png',
];

const SLIDE_DURATION = 1400; // Fast-paced
const TRANSITION_DURATION = 400; // Snappy cuts

export default function ProjectSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    if (transitioning) return;
    setPrevIndex(activeIndex);
    setTransitioning(true);
    
    setTimeout(() => {
      setActiveIndex((current) => (current + 1) % IMAGES.length);
      setTimeout(() => {
        setTransitioning(false);
        setPrevIndex(null);
      }, 50);
    }, TRANSITION_DURATION);
  }, [activeIndex, transitioning]);

  useEffect(() => {
    intervalRef.current = setInterval(advance, SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [advance]);

  return (
    <section className="ps-section-pure" id="projects-reel" aria-label="Featured project showcase">
      <div className="ps-pure-reel" aria-hidden="true">
        
        {/* Render all images, but only animate the active ones to ensure they are preloaded and don't flash */}
        {IMAGES.map((src, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === prevIndex;
          
          if (!isActive && !isPrev) return null;

          return (
            <div 
              key={src} 
              className={`ps-pure-slide ${transitioning && isActive ? 'ps-pure-enter' : isActive ? 'ps-pure-active' : 'ps-pure-exit'}`}
              style={{ zIndex: isActive ? (transitioning ? 3 : 2) : 1 }}
            >
              <div className="ps-pure-img-wrap">
                <Image 
                  src={src} 
                  alt="Project Showcase" 
                  fill
                  sizes="100vw"
                  priority={index < 2} // Preload first two
                  className="ps-pure-img" 
                  quality={75}
                />
              </div>
            </div>
          );
        })}

          {/* Flash cut effect */}
          {transitioning && <div className="ps-pure-flash" />}

        {/* Cinematic Overlays (Vignette & Scanlines) */}
        <div className="ps-pure-vignette" />
        <div className="ps-pure-scan" />
        <div className="ps-pure-grain" />

        {/* Top & Bottom Cinematic Bars (Letterbox) */}
        <div className="ps-pure-letterbox ps-pure-letterbox-top" />
        <div className="ps-pure-letterbox ps-pure-letterbox-bottom" />
      </div>
    </section>
  );
}
