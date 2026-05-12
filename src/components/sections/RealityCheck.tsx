import AnimateIn from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import GridDistortion from '@/components/ui/GridDistortion';
import AbstractGeometry from '@/components/ui/AbstractGeometry';

const cards = [
  {
    num: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8L28 8L24 18H16L12 8Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M16 18L18 32H22L24 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="35" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    stat: '0.4%',
    statLabel: 'avg. conversion rate',
    headline: '5,000 visitors. 12 sales.',
    body: "You're paying for traffic that disappears. Your homepage, pricing page, and checkout are full of friction your analytics won't tell you about.",
  },
  {
    num: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L8 14V26L20 34L32 26V14L20 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M14 18L20 28L26 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <line x1="20" y1="12" x2="20" y2="18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    stat: '7s',
    statLabel: 'avg. decision time',
    headline: 'Your website looks 2019.',
    body: "Prospects arrive, see a dated design, and immediately assume your service quality matches. They leave before you get a chance to speak.",
  },
  {
    num: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <line x1="12" y1="28" x2="28" y2="12" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    stat: 'P3',
    statLabel: 'google ranking penalty',
    headline: "You can't be found.",
    body: "Slow load times, zero Core Web Vitals score, poor mobile experience — Google is actively ranking you below competitors who deserve it less.",
  },
  {
    num: '04',
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="10" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="16" y1="24" x2="24" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="28" cy="12" r="4" fill="currentColor" opacity="0.3" />
        <path d="M26 12L28 14L31 10" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    stat: '24/7',
    statLabel: 'competitor AI is live',
    headline: 'Your competitor just got an AI sales team.',
    body: "While you sleep, their AI agent qualifies leads, books calls, and handles objections automatically — at a fraction of the cost of one salesperson.",
  },
];

export default function RealityCheck() {
  return (
    <section className="section" id="reality-check" style={{ background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <GridDistortion opacity={0.25} />
      <AbstractGeometry size={800} opacity={0.03} stroke="var(--color-gold-bright)" style={{ top: -80, left: -80 }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Centred pull quote */}
        <AnimateIn>
          <div className="rc-quote-wrap">
            <div className="rc-quote-rule" />
            <blockquote className="rc-quote">
              &ldquo;We have traffic. Why aren&apos;t we getting sales?&rdquo;
            </blockquote>
            <p className="rc-quote-attr">— Every business owner we&apos;ve ever spoken to</p>
            <div className="rc-quote-rule" />
          </div>
        </AnimateIn>

        {/* Diagnosis grid */}
        <div className="rc-grid">
          {cards.map((card, i) => (
            <AnimateIn key={i} delay={i + 1}>
              <TiltCard maxTilt={10}>
                <div className="rc-card card">
                  {/* Top: icon + stat */}
                  <div className="rc-card-top">
                    <div className="rc-icon">{card.icon}</div>
                    <div className="rc-stat-block">
                      <span className="rc-stat">{card.stat}</span>
                      <span className="rc-stat-label">{card.statLabel}</span>
                    </div>
                  </div>
                  {/* Number watermark */}
                  <span className="rc-num" aria-hidden="true">{card.num}</span>
                  {/* Content */}
                  <h3 className="rc-headline">{card.headline}</h3>
                  <p className="rc-body">{card.body}</p>
                </div>
              </TiltCard>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
