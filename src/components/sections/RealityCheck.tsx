'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    num: '01',
    stat: '0.4%',
    statLabel: 'avg. conversion rate',
    headline: '5,000 visitors. 12 sales.',
    body: "You're paying for traffic that disappears. Your homepage, pricing page, and checkout are full of friction your analytics won't tell you about.",
  },
  {
    num: '02',
    stat: '7s',
    statLabel: 'avg. decision time',
    headline: 'Your website looks 2019.',
    body: "Prospects arrive, see a dated design, and immediately assume your service quality matches. They leave before you get a chance to speak.",
  },
  {
    num: '03',
    stat: 'P3+',
    statLabel: 'where slow sites rank',
    headline: "You can't be found.",
    body: "Slow load times, sub-50 Core Web Vitals scores, poor mobile experience — Google's algorithm buries sites like yours on page 3 or beyond. Competitors with half your quality rank above you.",
  },
  {
    num: '04',
    stat: '24/7',
    statLabel: 'competitor AI is live',
    headline: 'Your competitor just got an AI sales team.',
    body: "While you sleep, their AI agent qualifies leads, books calls, and handles objections automatically — at a fraction of the cost of one salesperson.",
  },
];

export default function RealityCheck() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote mask reveal
      if (quoteRef.current) {
        const q = quoteRef.current;
        gsap.fromTo(q,
          { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
            duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: q, start: 'top 80%', end: 'top 40%', toggleActions: 'play none none none' },
          }
        );
      }

      // Cards stagger
      if (gridRef.current) {
        const cardEls = gridRef.current.querySelectorAll('.rc-card-new');
        gsap.fromTo(cardEls,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reality-check"
      style={{ padding: 'var(--space-24) 0', position: 'relative', overflow: 'hidden' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={quoteRef} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto var(--space-20)' }}>
          <div style={{ width: 60, height: 1, background: 'var(--color-gold-bright)', margin: '0 auto var(--space-8)' }} />
          <blockquote style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, var(--text-4xl))',
            fontWeight: 700, fontStyle: 'italic', lineHeight: 1.3, color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-4)',
          }}>
            &ldquo;We have traffic. Why aren&apos;t we getting sales?&rdquo;
          </blockquote>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            — Every business owner we&apos;ve ever spoken to
          </p>
          <div style={{ width: 60, height: 1, background: 'var(--color-gold-bright)', margin: 'var(--space-8) auto 0' }} />
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px', background: 'var(--color-bg-border)', border: '1px solid var(--color-bg-border)',
          }}
        >
          {cards.map((card) => (
            <TiltCard key={card.num} className="rc-card-new">
              <div
                style={{
                  height: '100%',
                  background: 'var(--color-bg-primary)', padding: 'var(--space-10)',
                  display: 'flex', flexDirection: 'column', position: 'relative',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#111114')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-bg-primary)')}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: 'var(--space-6)', right: 'var(--space-6)',
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-6xl)',
                    fontWeight: 900, color: 'var(--color-bg-border)', opacity: 0.3,
                    lineHeight: 1, pointerEvents: 'none',
                  }}
                >
                  {card.num}
                </span>

                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)',
                    fontWeight: 800, color: 'var(--color-gold-bright)', lineHeight: 1, marginBottom: 4,
                  }}>
                    {card.stat}
                  </div>
                  <span style={{
                    fontSize: 'var(--text-xs)', textTransform: 'uppercase',
                    letterSpacing: '0.15em', color: 'var(--color-text-tertiary)',
                  }}>
                    {card.statLabel}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
                  fontWeight: 700, lineHeight: 1.25, marginBottom: 'var(--space-4)',
                  color: 'var(--color-text-primary)', paddingRight: 'var(--space-8)',
                }}>
                  {card.headline}
                </h3>
                <p style={{
                  fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--color-text-secondary)',
                }}>
                  {card.body}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
