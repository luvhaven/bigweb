'use client';

import { useEffect, useRef } from 'react';

interface Props {
  intensity?: number;
}

export default function CinematicShine({ intensity = 1 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = containerRef.current;
    const shimmer = shimmerRef.current;
    if (!el || !shimmer) return;

    let isHovered = false;
    let shimmerRaf: number;

    const onMouseEnter = () => {
      if (isHovered) return;
      isHovered = true;
      
      // Animate the shimmer sweep across
      shimmer.style.transition = 'none';
      shimmer.style.left = '-60%';
      shimmer.style.opacity = '1';
      
      requestAnimationFrame(() => {
        shimmer.style.transition = 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        shimmer.style.left = '120%';
      });

      shimmerRaf = window.setTimeout(() => {
        shimmer.style.opacity = '0';
        isHovered = false;
      }, 900);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mousemove', onMouseMove);
      clearTimeout(shimmerRaf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="cinematic-shine-bg"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Blob 1 — top left, gold primary */}
      <div className="cs-blob cs-blob-1" />
      {/* Blob 2 — center, warm subtle */}
      <div className="cs-blob cs-blob-2" />
      {/* Blob 3 — bottom right, cool offset */}
      <div className="cs-blob cs-blob-3" />

      {/* Mouse-reactive spotlight */}
      <div
        className="cs-spotlight"
        style={{
          background: `radial-gradient(circle 500px at var(--mx, 50%) var(--my, 50%), rgba(212, 175, 106, 0.04) 0%, transparent 70%)`,
        }}
      />

      {/* Shimmer sweep */}
      <div
        ref={shimmerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '-60%',
          width: '40%',
          height: '100%',
          background: 'linear-gradient(105deg, transparent 0%, rgba(212,175,106,0.04) 40%, rgba(212,175,106,0.08) 50%, rgba(212,175,106,0.04) 60%, transparent 100%)',
          opacity: 0,
          pointerEvents: 'none',
          transform: 'skewX(-15deg)',
        }}
      />

      {/* Fine noise texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.4,
        }}
      />
    </div>
  );
}
