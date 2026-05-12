'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After'
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="before-after-container"
      ref={containerRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        userSelect: 'none'
      }}
    >
      {/* Before Image (Background) */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image 
          src={beforeImage}
          alt={beforeLabel}
          fill
          style={{ objectFit: 'cover' }}
          draggable={false}
          unoptimized={beforeImage.includes('supabase')}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff' }}>
          {beforeLabel}
        </div>
      </div>

      {/* After Image (Clipped) */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0,
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
        }}
      >
        <Image 
          src={afterImage}
          alt={afterLabel}
          fill
          style={{ objectFit: 'cover' }}
          draggable={false}
          unoptimized={afterImage.includes('supabase')}
        />
        <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--color-gold-bright)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bg-primary)' }}>
          {afterLabel}
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          backgroundColor: 'var(--color-gold-bright)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--color-gold-bright)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0,0,0,0.5)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18-6-6 6-6" />
            <path d="m15 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
