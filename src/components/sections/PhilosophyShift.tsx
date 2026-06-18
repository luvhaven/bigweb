'use client';

import { useEffect, useRef, useState } from 'react';
import AnimateIn from '@/components/ui/AnimateIn';
import NoiseField from '@/components/ui/NoiseField';
import VelocityText from '@/components/ui/VelocityText';

const COMPARISON = [
  { label: 'Accountability', old: 'Best effort', now: 'Revenue targets' },
  { label: 'Success metric', old: 'Client approval', now: 'Conversion rate' },
  { label: 'Pricing model', old: 'Time & materials', now: 'Fixed scope' },
  { label: 'Reporting', old: 'Vanity metrics', now: 'Revenue delta' },
];

export default function PhilosophyShift() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draw, setDraw] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDraw(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="philosophy" style={{ background: 'var(--color-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <NoiseField opacity={0.4} color="255, 255, 255" particleCount={250} speed={0.0003} />
      <div className="container philosophy-grid" ref={containerRef} style={{ position: 'relative', zIndex: 2 }}>
        <div className="philosophy-text">
          <AnimateIn>
            <span className="section-label">OUR PHILOSOPHY</span>
          </AnimateIn>
          <AnimateIn>
            <h2 className="section-headline" style={{ lineHeight: 1.1 }}>
              <VelocityText>We don&apos;t build websites.</VelocityText><br />
              <VelocityText>We build revenue.</VelocityText>
            </h2>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
              A website is infrastructure. So is plumbing. You don&apos;t brag about your
              plumbing — but you definitely notice when it&apos;s broken. What you actually
              care about is revenue, leads, and growth. So that&apos;s what we&apos;re
              accountable for.
            </p>
          </AnimateIn>
          <AnimateIn delay={3}>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
              Every agency will show you a beautiful portfolio. We&apos;ll show you
              conversion rates before and after. We&apos;ll show you cost-per-acquisition
              dropping. We&apos;ll show you a client who was generating $40,000 a month
              who is now generating $140,000 — from the same traffic.
            </p>
          </AnimateIn>
          <AnimateIn delay={4}>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.75, color: 'var(--color-text-primary)', fontWeight: 500, borderLeft: '2px solid var(--color-gold-muted)', paddingLeft: 'var(--space-5)' }}>
              That&apos;s not a service offering. That&apos;s a different business
              relationship entirely.
            </p>
          </AnimateIn>
        </div>

        <div className="philosophy-visual" ref={containerRef}>
          {/* Chart card */}
          <AnimateIn delay={2}>
            <div className="philosophy-chart-card">
              {/* Chart header */}
              <div className="philosophy-chart-header">
                <span className="philosophy-chart-title">Revenue vs. Traffic (same client, 6 months)</span>
                <div className="philosophy-legend">
                  <span className="legend-item">
                    <span className="legend-dot" style={{ background: 'var(--color-text-tertiary)' }} />
                    Traffic
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot" style={{ background: 'var(--color-gold-bright)' }} />
                    Revenue
                  </span>
                </div>
              </div>

              {/* SVG Chart */}
              <svg
                ref={svgRef}
                viewBox="0 0 400 240"
                xmlns="http://www.w3.org/2000/svg"
                className={`philosophy-chart ${draw ? 'draw' : ''}`}
              >
                {/* Y-axis labels */}
                <text x="8" y="50" fill="var(--color-text-tertiary)" fontSize="9" fontFamily="var(--font-body)">High</text>
                <text x="8" y="130" fill="var(--color-text-tertiary)" fontSize="9" fontFamily="var(--font-body)">Mid</text>
                <text x="8" y="210" fill="var(--color-text-tertiary)" fontSize="9" fontFamily="var(--font-body)">Low</text>

                {/* Grid lines */}
                <line x1="40" y1="30" x2="40" y2="220" stroke="var(--color-bg-border)" strokeWidth="0.5" />
                <line x1="40" y1="220" x2="390" y2="220" stroke="var(--color-bg-border)" strokeWidth="0.5" />
                {[80, 130, 175].map((y) => (
                  <line key={y} x1="40" y1={y} x2="390" y2={y} stroke="var(--color-bg-border)" strokeWidth="0.3" strokeDasharray="4 4" />
                ))}

                {/* X-axis labels */}
                {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map((m, i) => (
                  <text key={m} x={55 + i * 60} y={234} fill="var(--color-text-tertiary)" fontSize="9" fontFamily="var(--font-body)" textAnchor="middle">{m}</text>
                ))}

                {/* Traffic line (flat) */}
                <polyline
                  points="55,155 115,150 175,153 235,151 295,154 355,152"
                  fill="none"
                  stroke="var(--color-text-tertiary)"
                  strokeWidth="2"
                  className="chart-line traffic-line"
                />

                {/* Revenue line (climbing) — area fill */}
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-gold-bright)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="var(--color-gold-bright)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="55,200 55,190 115,170 175,140 235,105 295,70 355,42 355,220"
                  fill="url(#revenueGrad)"
                  className="chart-area"
                />
                <polyline
                  points="55,190 115,170 175,140 235,105 295,70 355,42"
                  fill="none"
                  stroke="var(--color-gold-bright)"
                  strokeWidth="2.5"
                  className="chart-line revenue-line"
                />

                {/* Data dots - Revenue */}
                {[
                  [55, 190], [115, 170], [175, 140], [235, 105], [295, 70], [355, 42]
                ].map(([cx, cy], i) => (
                  <circle key={`r${i}`} cx={cx} cy={cy} r="4" fill="var(--color-gold-bright)" stroke="var(--color-bg-secondary)" strokeWidth="2" className="chart-dot" style={{ animationDelay: `${1.5 + i * 0.1}s` }} />
                ))}

                {/* End label: Revenue */}
                <text x="362" y="46" fill="var(--color-gold-bright)" fontSize="10" fontFamily="var(--font-body)" fontWeight="700">+288%</text>
              </svg>

              {/* Comparison table */}
              <div className="philosophy-comparison">
                {COMPARISON.map((row, i) => (
                  <div key={row.label} className="philosophy-cmp-row" style={{ animationDelay: `${i * 0.12}s` }}>
                    <span className="philosophy-cmp-label">{row.label}</span>
                    <span className="philosophy-cmp-old">
                      <span className="philosophy-cmp-old-text">{row.old}</span>
                    </span>
                    <span className="philosophy-cmp-arrow">→</span>
                    <span className="philosophy-cmp-new">{row.now}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      
    </section>
  );
}
