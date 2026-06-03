'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const PROJECTS = [
  { src: '/projects/luxury-ecommerce.png', label: 'Luxury E-Commerce', metric: '+124%', mLabel: 'Conversion Rate' },
  { src: '/projects/fintech-banking.png', label: 'Fintech App', metric: '$2.4M', mLabel: 'New Pipeline' },
  { src: '/projects/ai-agent-platform.png', label: 'AI SaaS Platform', metric: '43%', mLabel: 'CAC Reduction' },
  { src: '/projects/b2b-enterprise-software.png', label: 'Enterprise Software', metric: '3x', mLabel: 'Sales Velocity' },
  { src: '/projects/high-end-real-estate.png', label: 'Real Estate Developer', metric: '$12M', mLabel: 'Direct Bookings' },
  { src: '/projects/saas-dashboard.png', label: 'B2B SaaS', metric: '94%', mLabel: 'Retention Lift' },
  { src: '/projects/fashion-ecommerce.png', label: 'Fashion Retail', metric: '+88%', mLabel: 'AOV Increase' },
  { src: '/projects/web3-crypto.png', label: 'Web3 Platform', metric: '6.2M', mLabel: 'Total Volume' },
  { src: '/projects/architecture-portfolio.png', label: 'Architecture Firm', metric: '14+', mLabel: 'Commercial Leads' },
  { src: '/projects/automotive-ev.png', label: 'Automotive / EV', metric: '-40%', mLabel: 'Cost Per Lead' },
  { src: '/projects/luxury-hospitality.png', label: 'Luxury Hospitality', metric: '$4.1M', mLabel: 'Online Revenue' },
  { src: '/projects/fintech-wealth.png', label: 'Wealth Management', metric: '+210%', mLabel: 'Form Completions' },
  { src: '/projects/creative-agency.png', label: 'Brand Agency', metric: '45+', mLabel: 'Enterprise Accounts' },
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
      setActiveIndex((current) => (current + 1) % PROJECTS.length);
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
        {PROJECTS.map((project, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === prevIndex;

          if (!isActive && !isPrev) return null;

          return (
            <div
              key={project.src}
              className={`ps-pure-slide ${transitioning && isActive ? 'ps-pure-enter' : isActive ? 'ps-pure-active' : 'ps-pure-exit'}`}
              style={{ zIndex: isActive ? (transitioning ? 3 : 2) : 1 }}
            >
              <div className="ps-pure-img-wrap">
                <Image
                  src={project.src}
                  alt={project.label}
                  fill
                  sizes="100vw"
                  priority={index < 2} // Preload first two
                  className="ps-pure-img"
                  quality={75}
                />

                {/* ── B2B ROI Data Overlay ── */}
                <div style={{ position: 'absolute', bottom: '12%', left: '10%', zIndex: 10, pointerEvents: 'none' }}>
                  <div style={{ display: 'inline-block', backdropFilter: 'blur(16px)', background: 'rgba(10,10,11,0.7)', border: '1px solid rgba(212,175,106,0.2)', padding: 'var(--space-4) var(--space-6)', borderRadius: '4px' }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold-bright)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px', fontWeight: 600 }}>{project.label}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, var(--text-5xl))', color: 'var(--color-text-primary)', fontWeight: 700, lineHeight: 1 }}>{project.metric}</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{project.mLabel}</span>
                    </div>
                  </div>
                </div>

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
