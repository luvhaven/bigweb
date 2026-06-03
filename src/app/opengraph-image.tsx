import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Route segment config
export const alt = 'BIGWEB Digital';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0a0a0b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '80px',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                {/* Background glow */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(212,175,106,0.15) 0%, transparent 70%)' }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', left: '-20%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(212,175,106,0.1) 0%, transparent 70%)' }}></div>

                {/* Top: Logo */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg width="40" height="40" viewBox="0 0 22 22" fill="none" style={{ marginRight: '20px' }}>
                        <rect x="1" y="1" width="9" height="9" stroke="#D4AF6A" strokeWidth="1.5" />
                        <rect x="12" y="1" width="9" height="9" fill="#D4AF6A" opacity="0.8" />
                        <rect x="1" y="12" width="9" height="9" fill="#D4AF6A" opacity="0.4" />
                        <rect x="12" y="12" width="9" height="9" stroke="#D4AF6A" strokeWidth="1.5" strokeDasharray="2 2" />
                    </svg>
                    <div style={{ display: 'flex', fontSize: '32px', fontWeight: 800, letterSpacing: '0.1em' }}>
                        <span style={{ color: '#F2F0EB' }}>BIG</span>
                        <span style={{ color: '#F2F0EB', opacity: 0.7 }}>WEB</span>
                        <span style={{ color: '#D4AF6A', marginLeft: '12px' }}>Digital</span>
                    </div>
                </div>

                {/* Middle: Headline */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '72px', fontWeight: 900, color: '#F2F0EB', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '24px' }}>
                        We don't build websites.<br />
                        <span style={{ color: '#D4AF6A' }}>We engineer cash flow.</span>
                    </div>
                    <div style={{ fontSize: '32px', color: '#9B9793', lineHeight: 1.4, maxWidth: '900px' }}>
                        The #1 digital revenue agency for B2B and enterprise. Find out exactly where you're losing money, and let us fix it.
                    </div>
                </div>

                {/* Bottom: Stats */}
                <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '42px', fontWeight: 800, color: '#D4AF6A', marginBottom: '8px' }}>$140M+</span>
                        <span style={{ fontSize: '20px', color: '#5A5753', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Revenue Tracked</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '42px', fontWeight: 800, color: '#D4AF6A', marginBottom: '8px' }}>42</span>
                        <span style={{ fontSize: '20px', color: '#5A5753', letterSpacing: '0.05em', textTransform: 'uppercase' }}>B2B Campaigns</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '42px', fontWeight: 800, color: '#D4AF6A', marginBottom: '8px' }}>+288%</span>
                        <span style={{ fontSize: '20px', color: '#5A5753', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Average Client Lift</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
