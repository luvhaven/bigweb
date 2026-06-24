'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountUp } from '@/lib/hooks';
import TiltCard from '@/components/ui/TiltCard';
import TextTestimonialsMarquee from './TextTestimonialsMarquee';
import CinematicVideoTestimonials from './CinematicVideoTestimonials';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  client: string;
  problem: string;
  delivered: string;
  result: string;
  metric: string;
  metric_label: string;
  image: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

function SmartMetric({ metric }: { metric: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [start, setStart] = useState(false);

  const numericPart = parseFloat(metric.replace(/[^0-9.]/g, ''));
  const prefix = metric.match(/^[^0-9]+/) ? metric.match(/^[^0-9]+/)![0] : '';
  const suffix = metric.match(/[^0-9.]+$/) ? metric.match(/[^0-9.]+$/)![0] : '';

  const isNumeric = !isNaN(numericPart) && numericPart > 0;
  const isInteger = isNumeric && Number.isInteger(numericPart);
  const count = useCountUp(isInteger ? numericPart : 0, 2000, start);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStart(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
      {isNumeric && isInteger ? `${prefix}${count}${suffix}` : metric}
    </span>
  );
}

export default function Results({ caseStudies, testimonials }: { caseStudies: CaseStudy[]; testimonials: Testimonial[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        if (headerRef.current) gsap.set(headerRef.current.children, { opacity: 1, y: 0 });
        if (gridRef.current) gsap.set(gridRef.current.querySelectorAll('.result-card-new'), { opacity: 1, y: 0, scale: 1 });
        if (testimonialsRef.current) gsap.set(testimonialsRef.current.children, { opacity: 1, y: 0 });
        return;
      }

      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.9, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.result-card-new');
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
          }
        );
      }

      // Testimonials - Simple clean fade in
      if (testimonialsRef.current) {
        gsap.fromTo(testimonialsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="results" style={{ padding: 'var(--space-24) 0' }}>
      <div className="container">
        <div ref={headerRef} style={{
          marginBottom: 'var(--space-16)', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-8)', alignItems: 'end',
        }}>
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-gold-bright)',
              marginBottom: 'var(--space-6)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
              Client Outcomes
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, var(--text-5xl))',
              fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Numbers don&apos;t<br />have opinions.
            </h2>
          </div>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
            maxWidth: 380, borderLeft: '2px solid var(--color-bg-border)',
            paddingLeft: 'var(--space-4)', lineHeight: 1.7,
          }}>
            Real clients, real data, real timelines. Every metric below is verified and documented.
          </p>
        </div>

        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-16)',
        }}>
          {caseStudies.slice(0, 6).map((result, i) => (
            <TiltCard key={i} className="result-card-new">
              <div
                style={{
                  height: '100%', background: 'var(--color-bg-secondary)',
                  padding: 'var(--space-10)', display: 'flex', flexDirection: 'column',
                  position: 'relative', minHeight: 280,
                  boxShadow: 'var(--shadow-card)',
                  borderRadius: '4px',
                  transition: 'box-shadow 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#111114'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-secondary)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: 'var(--space-6)', right: 'var(--space-6)',
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-6xl)',
                    fontWeight: 900, color: 'var(--color-bg-border)', opacity: 0.25,
                    lineHeight: 1, pointerEvents: 'none',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span style={{
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--color-gold-bright)', fontWeight: 700, marginBottom: 'var(--space-6)',
                }}>
                  {result.metric_label || 'PERFORMANCE'}
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
                  fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-text-primary)',
                  paddingRight: 'var(--space-8)', lineHeight: 1.25,
                }}>
                  {result.client}
                </h3>

                <p style={{
                  fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-10)', flex: 1, lineHeight: 1.7,
                }}>
                  {result.problem}
                </p>

                <div>
                  <div style={{
                    fontSize: 'clamp(2rem, 3vw, var(--text-4xl))', color: 'var(--color-text-primary)',
                    marginBottom: 4, letterSpacing: '-0.02em',
                  }}>
                    <SmartMetric metric={result.metric} />
                  </div>
                  <p style={{
                    fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                  }}>
                    {result.result}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-24)', textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800 }}>Clients don&apos;t lie. Revenue doesn&apos;t either.</h3>
        </div>

        <CinematicVideoTestimonials testimonials={testimonials} />

        <div style={{ marginTop: 'var(--space-32)' }} ref={testimonialsRef}>
          <TextTestimonialsMarquee testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
