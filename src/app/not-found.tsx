import Link from 'next/link';
import { Metadata } from 'next';
import MagneticButton from '@/components/ui/MagneticButton';
import LiquidGradient from '@/components/ui/LiquidGradient';

export const metadata: Metadata = {
  title: '404 — You Took a Wrong Turn | BIGWEB Digital',
  description: 'This page doesn\'t exist. But your revenue leak does. Let\'s fix the thing that actually matters.',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)',
      }}
    >
      <LiquidGradient />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 720,
        }}
      >
        {/* Big 404 */}
        <div
          style={{
            fontSize: 'clamp(8rem, 20vw, 16rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(180deg, rgba(212,175,106,0.12) 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            border: '1px solid rgba(212,175,106,0.1)',
            borderRadius: 16,
            padding: '0 32px',
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          404
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-bright)',
            fontWeight: 600,
            marginBottom: 'var(--space-5)',
          }}
        >
          Diagnostic Complete
        </p>

        {/* Headline — on-brand */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, var(--text-5xl))',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 'var(--space-6)',
            color: 'var(--color-text-primary)',
          }}
        >
          This page doesn&apos;t exist.
          <br />
          <span style={{ color: 'var(--color-gold-bright)' }}>
            Your revenue leak does.
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-10)',
            maxWidth: 520,
            margin: '0 auto var(--space-10)',
          }}
        >
          Whatever you were looking for — it&apos;s not here. But while you&apos;re lost,
          let&apos;s find out exactly where your website is losing you money.
          That one we can solve.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton href="/contact" className="btn btn-primary btn-lg">
            Get My Free Diagnostic
          </MagneticButton>
          <MagneticButton href="/" className="btn btn-outline">
            Take Me Home
          </MagneticButton>
        </div>

        {/* Helpful nav links */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            display: 'flex',
            gap: 'var(--space-6)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { href: '/services', label: 'Our Services' },
            { href: '/work', label: 'Case Studies' },
            { href: '/insights', label: 'Insights' },
            { href: '/about', label: 'About Us' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="not-found-nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        <style>{`
          .not-found-nav-link {
            font-size: var(--text-sm);
            color: var(--color-text-tertiary);
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: color 0.2s, border-color 0.2s;
            padding-bottom: 2px;
          }
          .not-found-nav-link:hover {
            color: var(--color-text-primary);
            border-bottom-color: var(--color-gold-bright);
          }
        `}</style>
      </div>
    </div>
  );
}
