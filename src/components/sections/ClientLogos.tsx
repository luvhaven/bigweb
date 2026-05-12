import AnimateIn from '@/components/ui/AnimateIn';

// A mix of real-world-sounding premium business brand names your agency could work with
const LOGOS = [
  { name: 'Meridian Capital', abbr: 'MC' },
  { name: 'Vantage Health', abbr: 'VH' },
  { name: 'Axiom Group', abbr: 'AG' },
  { name: 'Stratum Labs', abbr: 'SL' },
  { name: 'Nexen Solutions', abbr: 'NS' },
  { name: 'Orbis Consulting', abbr: 'OC' },
  { name: 'Helix Digital', abbr: 'HD' },
  { name: 'Pillar & Stone', abbr: 'PS' },
];

export default function ClientLogos() {
  return (
    <section
      style={{
        background: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-bg-border)',
        borderBottom: '1px solid var(--color-bg-border)',
        padding: 'var(--space-12) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <AnimateIn>
        <p
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.15em',
            color: 'var(--color-text-tertiary)',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 'var(--space-8)',
          }}
        >
          Trusted by growth-stage businesses across 3 continents
        </p>
      </AnimateIn>

      {/* Scrolling logo marquee */}
      <div style={{ position: 'relative' }}>
        {/* Fade masks */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(to right, var(--color-bg-primary), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(to left, var(--color-bg-primary), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-12)',
            width: 'max-content',
            animation: 'logoScroll 30s linear infinite',
          }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="client-logo-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                whiteSpace: 'nowrap',
                opacity: 0.45,
                transition: 'opacity 0.3s ease',
                cursor: 'default',
              }}
            >
              {/* Abstract logo mark */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: '1px solid rgba(212,175,106,0.3)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 800,
                  color: 'var(--color-gold-bright)',
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                }}
              >
                {logo.abbr}
              </div>
              <span
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.02em',
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes logoScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes logoScroll { from, to { transform: none; } }
        }
        .client-logo-item:hover {
          opacity: 0.9 !important;
        }
      `}</style>
    </section>
  );
}
