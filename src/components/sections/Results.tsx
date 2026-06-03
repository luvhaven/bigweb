'use client';

import { useRef, useEffect, useState } from 'react';
import AnimateIn from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import { useCountUp } from '@/lib/hooks';
import { Play, X } from 'lucide-react';

interface CaseStudy {
  client: string;
  problem: string;
  delivered: string;
  result: string;
  metric: string;
  metric_label: string;
  image: string;
  location?: string;
  timeline?: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  initials?: string;
  video_url?: string;
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

// Video lightbox
function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-8)',
      }}
    >
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 'var(--space-6)', right: 'var(--space-6)', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', color: '#fff', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <X size={20} />
      </button>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 900 }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={url.includes('youtube') ? url.replace('watch?v=', 'embed/') + '?autoplay=1' : url}
            allow="autoplay; fullscreen"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 8, border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Results({ caseStudies, testimonials }: { caseStudies: CaseStudy[]; testimonials: Testimonial[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="section" id="results" style={{ background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}

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
                  {result.location && (
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: 'var(--space-2)' }}>{result.location}</span>
                  )}
                  <p className="result-problem">&ldquo;{result.problem}&rdquo;</p>
                  <p className="result-delivered">{result.delivered}</p>
                  <p className="result-outcome">{result.result}</p>
                  {result.timeline && (
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold-muted)', marginTop: 'var(--space-3)', fontWeight: 600 }}>⏱ {result.timeline}</p>
                  )}
                </div>
              </TiltCard>
            </AnimateIn>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-strip">
          {testimonials.map((t, i) => (
            <AnimateIn key={i} delay={i + 1}>
              <div className="testimonial-card" style={{ position: 'relative' }}>
                {/* Stars */}
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="testimonial-star">★</span>
                  ))}
                </div>
                <span className="testimonial-quote-mark">&ldquo;</span>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  {/* Avatar with initials fallback */}
                  <div className="testimonial-avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,106,0.15)', flexShrink: 0 }}>
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-gold-bright)', fontFamily: 'var(--font-display)' }}>
                        {t.initials || t.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}, {t.company}</span>
                  </div>
                  {/* Video play button */}
                  {t.video_url && (
                    <button
                      onClick={() => setActiveVideo(t.video_url!)}
                      title="Watch video testimonial"
                      style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--color-gold-bright), var(--color-gold-mid))',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 12px rgba(212,175,106,0.3)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                    >
                      <Play size={14} fill="#0a0a0b" color="#0a0a0b" style={{ marginLeft: 2 }} />
                    </button>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
