'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isActive = true;

    // Fast-tracking for dot
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0,
        });
      }

      // Check if hovering a clickable element
      const target = e.target as HTMLElement;
      const isClickable = !!target.closest('a, button, input, [role="button"], .tilt-card');
      setIsHovering(isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth-tracking loop for ring
    const render = () => {
      if (!isActive) return;
      
      // Easing speed
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: ringX,
          y: ringY,
        });
      }

      requestAnimationFrame(render);
    };
    render();

    return () => {
      isActive = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="cursor-dot" 
        style={{
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
          // Upgraded to exclusion mode for inverted spotlight effect against complex WebGL/Text
          mixBlendMode: 'exclusion', 
          background: 'white',
          boxShadow: isHovering ? '0 0 10px white' : 'none'
        }}
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          mixBlendMode: 'difference',
          filter: isHovering ? 'url(#chromatic-aberration)' : 'none',
        }}
      />
      
      {/* SVG Filter for subtle chromatic aberration on cursor hover state */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="chromatic-aberration">
            <feOffset in="SourceGraphic" dx="2" dy="0" result="Red" />
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="Blue" />
            <feMerge>
              <feMergeNode in="Red" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="Blue" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </>
  );
}
