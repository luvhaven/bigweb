'use client';

import React from 'react';

export default function AbstractGeometry({
  size = 600,
  stroke = 'var(--color-gold-muted)',
  opacity = 0.05,
  className = '',
  style,
}: {
  size?: number;
  stroke?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div 
      className={`abstract-geometry-container ${className}`}
      style={{ 
        width: size, height: size, opacity, 
        pointerEvents: 'none', position: 'absolute', zIndex: 0,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', animation: 'spin-slow 60s linear infinite' }}>
        <circle cx="50" cy="50" r="48" stroke={stroke} strokeWidth="0.2" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="38" stroke={stroke} strokeWidth="0.3" opacity="0.5" />
        <path d="M50 2 L50 98 M2 50 L98 50" stroke={stroke} strokeWidth="0.2" opacity="0.3" />
        <rect x="25" y="25" width="50" height="50" stroke={stroke} strokeWidth="0.2" transform="rotate(45 50 50)" />
        <circle cx="50" cy="50" r="28" stroke={stroke} strokeWidth="0.4" strokeDasharray="1 6" />
      </svg>
    </div>
  );
}
