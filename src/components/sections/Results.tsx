'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import { useCountUp } from '@/lib/hooks';

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
  const ref = useRef<HTMLDivElement>(null);
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

  return <div ref={ref} style={{ display: 'inline' }}>
    {isNumeric && isInteger ? `${prefix}${count}${suffix}` : metric}
  </div>;
}

export default function Results({ caseStudies, testimonials }: { caseStudies: CaseStudy[]; testimonials: Testimonial[] }) {
  return (
    <section className="section" id="results" style={{ background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Watermark */}
      <div className="results-watermark" aria-hidden="true">RESULTS</div>

      <div className="container">
        <AnimateIn>
          <span className="section-label">CLIENT OUTCOMES</span>
        </AnimateIn>
        <AnimateIn delay={1}>
          <h2 className="section-headline">Numbers don&apos;t have opinions.</h2>
        </AnimateIn>

        <div className="results-grid">
          {caseStudies.map((result, i) => (
            <AnimateIn key={i} delay={i + 1}>
              <TiltCard className="card result-card" maxTilt={8}>
                <div className="result-card-bg" style={{ backgroundImage: `url(${result.image})` }} />
                <div className="result-card-content">
                  <div className="result-metric">
                    <SmartMetric metric={result.metric} />
                  </div>
                  <p className="result-metric-label">{result.metric_label}</p>
                  <span className="result-client">{result.client}</span>
                  <p className="result-problem">&ldquo;{result.problem}&rdquo;</p>
                  <p className="result-delivered">{result.delivered}</p>
                  <p className="result-outcome">{result.result}</p>
                </div>
              </TiltCard>
            </AnimateIn>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-strip">
          {testimonials.map((t, i) => (
            <AnimateIn key={i} delay={i + 1}>
              <div className="testimonial-card">
                {/* Stars */}
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="testimonial-star">★</span>
                  ))}
                </div>
                <span className="testimonial-quote-mark">&ldquo;</span>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <Image src={t.avatar} alt={t.name} width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}, {t.company}</span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
