'use client';

export default function AmbientGlow({
  color = 'var(--color-gold-bright)',
  size = '400px',
  opacity = 0.15,
  blur = '100px',
  animation = 'pulse-glow 8s infinite alternate',
  top, left, right, bottom
}: {
  color?: string;
  size?: string;
  opacity?: number;
  blur?: string;
  animation?: string;
  top?: string; left?: string; right?: string; bottom?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur})`,
        animation,
        top, left, right, bottom,
        pointerEvents: 'none',
        zIndex: 0,
        borderRadius: '50%',
        transform: 'translate3d(0,0,0)' // Hardware acceleration
      }}
    />
  );
}
