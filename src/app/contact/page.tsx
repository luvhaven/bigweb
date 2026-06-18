import { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import TerminalQualifier from '@/components/sections/TerminalQualifier';
import LiquidGradient from '@/components/ui/LiquidGradient';

export const metadata: Metadata = {
  title: 'Book a Call — BIGWEB Digital',
  description: "Book a free 20-minute diagnostic call. We'll tell you exactly where your revenue is leaking — and how to fix it.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <LiquidGradient />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <span className="section-label">GET IN TOUCH</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-7xl))', fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1.1, marginBottom: 'var(--space-6)', maxWidth: 800 }}>
              You&apos;ve identified the problem.<br /><span className="text-gold">Let&apos;s build the fix.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p style={{ maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
              The diagnostic call is free. In 20 minutes, we&apos;ll tell you exactly where your revenue is leaking and give you a clear path to fixing it — whether you hire us or not.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container contact-grid">

          {/* Form column */}
          <div>
            <AnimateIn>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                Book your free diagnostic
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-8)', lineHeight: 1.6, maxWidth: 440 }}>
                Fill out the form and we&apos;ll reach out within 4 hours to schedule your 20-minute call.
              </p>
            </AnimateIn>
            <TerminalQualifier />
          </div>

          {/* Info column */}
          <div className="contact-info">
            <AnimateIn delay={2}>
              <div className="info-card card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  filter: 'grayscale(0.8) brightness(0.15)', zIndex: 0
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>
                    What happens next
                  </h3>
                  <div className="info-steps">
                    <div className="info-step">
                      <span className="info-step-num">1</span>
                      <div>
                        <strong>We review your submission</strong>
                        <p>Within 4 hours, we look at your website and preliminary data.</p>
                      </div>
                    </div>
                    <div className="info-step">
                      <span className="info-step-num">2</span>
                      <div>
                        <strong>We schedule the call</strong>
                        <p>A 20-minute video call at a time that works for you.</p>
                      </div>
                    </div>
                    <div className="info-step">
                      <span className="info-step-num">3</span>
                      <div>
                        <strong>We diagnose, honestly</strong>
                        <p>We tell you exactly what we see, what we&apos;d recommend, and whether we&apos;re the right fit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={3}>
              <div className="info-details">
                <div className="info-detail">
                  <Mail size={18} className="info-icon" />
                  <div>
                    <span className="info-detail-label">Email</span>
                    <a href="mailto:hello@bigwebdigital.com" className="info-detail-value">hello@bigwebdigital.com</a>
                  </div>
                </div>
                <div className="info-detail">
                  <MapPin size={18} className="info-icon" />
                  <div>
                    <span className="info-detail-label">Location</span>
                    <span className="info-detail-value">Lagos, Nigeria</span>
                  </div>
                </div>
                <div className="info-detail">
                  <Clock size={18} className="info-icon" />
                  <div>
                    <span className="info-detail-label">Response Time</span>
                    <span className="info-detail-value">Within 4 hours</span>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={4}>
              <div style={{ padding: 'var(--space-7)', border: '1px solid var(--color-gold-muted)', borderRadius: '6px', background: 'rgba(212,175,106,0.04)' }}>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-3)' }}>
                  ⚡ Limited availability
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  We take on a limited number of new clients per quarter to ensure quality. Current availability: accepting new clients for Q3 2026.
                </p>
              </div>
            </AnimateIn>
          </div>

        </div>
      </section>
    </>
  );
}
