'use client';

import { useRef, useEffect, useState } from 'react';
import AnimateIn from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import { useCountUp } from '@/lib/hooks';
import { Play, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveCaseStudy(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="section" id="results" style={{ background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}

      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            layoutId={`card-${activeCaseStudy.client}`}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'var(--color-bg-primary)',
              overflowY: 'auto',
              display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', height: '60vh', minHeight: '400px', width: '100%', overflow: 'hidden' }}>
              <motion.div
                layoutId={`img-${activeCaseStudy.client}`}
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${activeCaseStudy.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.4
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-bg-primary) 0%, transparent 100%)' }} />

              <button
                onClick={() => setActiveCaseStudy(null)}
                style={{ position: 'absolute', top: 32, right: 32, zIndex: 10, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
              >
                <X size={24} />
              </button>

              <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, width: '100%' }}>
                <div className="container">
                  <motion.h2 layoutId={`client-${activeCaseStudy.client}`} style={{ fontSize: 'clamp(48px, 6vw, 84px)', fontWeight: 900, color: 'var(--color-text-primary)', marginBottom: 8, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
                    {activeCaseStudy.client}
                  </motion.h2>
                  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <motion.div layoutId={`metric-${activeCaseStudy.client}`} style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-gold-bright)' }}>
                      <SmartMetric metric={activeCaseStudy.metric} />
                      <span style={{ fontSize: '18px', display: 'block', color: 'var(--color-gold-muted)', fontWeight: 600 }}>{activeCaseStudy.metric_label}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container" style={{ padding: '64px 20px', display: 'grid', gap: 48, gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <h3 style={{ fontSize: '14px', color: 'var(--color-gold-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>The Bottleneck</h3>
                <p style={{ fontSize: '24px', lineHeight: 1.5, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)' }}>"{activeCaseStudy.problem}"</p>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', color: 'var(--color-gold-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>The Engineering</h3>
                <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{activeCaseStudy.delivered}</p>

                <h3 style={{ fontSize: '14px', color: 'var(--color-gold-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 40, marginBottom: 16 }}>The Return</h3>
                <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--color-text-primary)' }}>{activeCaseStudy.result}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <motion.div layoutId={`card-${result.client}`} onClick={() => setActiveCaseStudy(result)} style={{ cursor: 'pointer' }}>
                <TiltCard className="card result-card" maxTilt={4}>
                  <motion.div layoutId={`img-${result.client}`} className="result-card-bg" style={{ backgroundImage: `url(${result.image})` }} />
                  <div className="result-card-content" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div layoutId={`metric-${result.client}`} className="result-metric">
                      <SmartMetric metric={result.metric} />
                    </motion.div>
                    <p className="result-metric-label">{result.metric_label}</p>
                    <motion.span layoutId={`client-${result.client}`} className="result-client">{result.client}</motion.span>
                    {result.location && (
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: 'var(--space-2)' }}>{result.location}</span>
                    )}
                    <div style={{ marginTop: '32px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-gold-bright)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                        Read Deep Dive <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
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
