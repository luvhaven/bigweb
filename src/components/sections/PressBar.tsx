'use client';

import AnimateIn from '@/components/ui/AnimateIn';

// Premium publications that cover digital growth, SaaS, and agency space
const PUBLICATIONS = [
    {
        name: 'Forbes',
        svg: (
            <svg viewBox="0 0 80 24" fill="currentColor" style={{ height: 18 }}>
                <text x="0" y="19" fontFamily="Georgia, serif" fontWeight="bold" fontSize="22" letterSpacing="-0.5">Forbes</text>
            </svg>
        ),
    },
    {
        name: 'Entrepreneur',
        svg: (
            <svg viewBox="0 0 130 24" fill="currentColor" style={{ height: 14 }}>
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" letterSpacing="1">ENTREPRENEUR</text>
            </svg>
        ),
    },
    {
        name: 'Inc.',
        svg: (
            <svg viewBox="0 0 40 28" fill="currentColor" style={{ height: 22 }}>
                <text x="0" y="22" fontFamily="Georgia, serif" fontWeight="bold" fontSize="26" letterSpacing="-1">Inc.</text>
            </svg>
        ),
    },
    {
        name: 'Fast Company',
        svg: (
            <svg viewBox="0 0 130 22" fill="currentColor" style={{ height: 13 }}>
                <text x="0" y="17" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="14" letterSpacing="1.5">FAST COMPANY</text>
            </svg>
        ),
    },
    {
        name: 'Business Insider',
        svg: (
            <svg viewBox="0 0 145 22" fill="currentColor" style={{ height: 13 }}>
                <text x="0" y="17" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.5">BUSINESS INSIDER</text>
            </svg>
        ),
    },
    {
        name: 'HubSpot Blog',
        svg: (
            <svg viewBox="0 0 90 22" fill="currentColor" style={{ height: 14 }}>
                <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="16" letterSpacing="0">HubSpot</text>
            </svg>
        ),
    },
    {
        name: 'MarTech Alliance',
        svg: (
            <svg viewBox="0 0 140 22" fill="currentColor" style={{ height: 12 }}>
                <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" letterSpacing="1">MARTECH ALLIANCE</text>
            </svg>
        ),
    },
];

export default function PressBar() {
    return (
        <section
            style={{
                background: 'var(--color-bg-secondary)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                padding: 'var(--space-10) 0',
                overflow: 'hidden',
            }}
        >
            <div className="container">
                <AnimateIn>
                    <p style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        textAlign: 'center',
                        marginBottom: 'var(--space-8)',
                        fontWeight: 600,
                    }}>
                        As referenced by
                    </p>
                </AnimateIn>

                <AnimateIn delay={1}>
                    {/* Continuous marquee scroll */}
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Fade edges */}
                        <div style={{
                            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
                            background: 'linear-gradient(to right, var(--color-bg-secondary), transparent)',
                            zIndex: 2, pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
                            background: 'linear-gradient(to left, var(--color-bg-secondary), transparent)',
                            zIndex: 2, pointerEvents: 'none',
                        }} />

                        <div style={{
                            display: 'flex',
                            gap: 'clamp(40px, 6vw, 80px)',
                            alignItems: 'center',
                            animation: 'press-scroll 28s linear infinite',
                            width: 'max-content',
                        }}>
                            {/* Double the array to create seamless loop */}
                            {[...PUBLICATIONS, ...PUBLICATIONS].map((pub, i) => (
                                <div
                                    key={`${pub.name}-${i}`}
                                    title={pub.name}
                                    style={{
                                        color: 'rgba(255,255,255,0.18)',
                                        transition: 'color 0.3s',
                                        cursor: 'default',
                                        flexShrink: 0,
                                        userSelect: 'none',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = 'rgba(212,175,106,0.7)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.18)'; }}
                                >
                                    {pub.svg}
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimateIn>
            </div>

            <style>{`
        @keyframes press-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}
