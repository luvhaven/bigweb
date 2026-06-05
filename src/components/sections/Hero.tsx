'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FloatingParticles from '@/components/ui/FloatingParticles';
import MagneticButton from '@/components/ui/MagneticButton';
import SplitText from '@/components/ui/SplitText';
import ThreeWebBg from '@/components/ui/ThreeWebBg';
import Parallax from '@/components/ui/Parallax';
import { usePersonalization } from '@/hooks/usePersonalization';

const TICKER_ITEMS = [
  'Conversion Audit', '288% Revenue Growth', 'Landing Page Engine',
  'AI Sales Agent', 'Core Web Vitals Fix', 'Authority Redesign',
  'Revenue Funnel System', '$3.4M+ Per Client', 'CRO Retainer',
  'Business Intelligence', 'SaaS MVP Build', '94% Retention',
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const personalization = usePersonalization();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf: number;
    let mx = 0, my = 0, cx = 0.5, cy = 0.5;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };

    const tick = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;

      if (blob1Ref.current) {
        blob1Ref.current.style.transform =
          `translate(${(cx - 0.5) * -60}px, ${(cy - 0.5) * -40}px)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.transform =
          `translate(${(cx - 0.5) * 80}px, ${(cy - 0.5) * 60}px)`;
      }
      if (headlineRef.current) {
        headlineRef.current.style.transform =
          `translate(${(cx - 0.5) * -8}px, ${(cy - 0.5) * -5}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section ref={heroRef} className="hero" id="hero">

      {/* ── WebGL Neural Background (Floating Particles) ── */}
      <Parallax offset={150} className="absolute inset-0 w-full h-full -z-10">
        <FloatingParticles />
      </Parallax>

      {/* ── Ambient blobs (keep for color blending under the web) ── */}
      <div className="blob-layer" aria-hidden="true">
        <div ref={blob1Ref} className="blob blob-1" />
        <div ref={blob2Ref} className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ── Grid lines ── */}
      <div className="hero-grid" aria-hidden="true" />

      {/* ── Noise grain ── */}
      <div className="hero-noise" aria-hidden="true" />


      {/* ── Main content (Upward Drift) ── */}
      <Parallax offset={-80} className="relative z-10 w-full h-full">
        <div ref={headlineRef} className="hero-stage container">


          <h1 className="hero-h1">
            <span className={`hero-reveal hero-word-row ${loaded ? 'show' : ''}`}
              style={{ transitionDelay: '200ms' }}>
              Your {personalization.headlineNoun}
            </span>
            <span className={`hero-reveal hero-word-row hero-row-mid ${loaded ? 'show' : ''}`}
              style={{ transitionDelay: '380ms' }}>
              is&nbsp;
              <span className="hero-stroke-text">costing</span>
              &nbsp;you
            </span>
            <span className={`hero-reveal hero-word-row hero-row-gold text-gold-breathing ${loaded ? 'show' : ''}`}
              style={{ transitionDelay: '560ms' }}>
              money.
            </span>
          </h1>

          {/* Sub + CTA row */}
          <div className={`hero-bottom-row ${loaded ? 'show' : ''}`}>
            <div className="hero-sub-block">
              {/* Sub copy removed per user request */}
              <div className="hero-ctas">
                <MagneticButton href="/contact" className="btn btn-primary btn-lg hero-btn-main">
                  Apply for Strategy Session <ArrowRight size={16} />
                </MagneticButton>
                <Link href="/work" className="hero-ghost-link" data-cursor-hover>
                  See Client Outcomes <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Stats column removed per user request */}
          </div>

        </div>
      </Parallax>

      {/* ── Bottom ticker ── */}
      <div className={`hero-ticker-wrap ${loaded ? 'show' : ''}`} aria-hidden="true">
        <div className="hero-ticker-rule" />
        <div className="hero-ticker">
          <div className="hero-ticker-track">
            {doubled.map((item, i) => (
              <span key={i} className="hero-ticker-item">
                {item} <span className="hero-ticker-sep">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
