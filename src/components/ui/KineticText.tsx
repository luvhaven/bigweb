'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  children: string;
  type?: 'words' | 'chars';
  animation?: 'blur' | 'skew' | 'scramble' | 'reveal';
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: boolean;
}

export default function KineticText({
  children,
  type = 'words',
  animation = 'blur',
  delay = 0,
  duration = 1,
  stagger = 0.05,
  scrollTrigger = false,
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split logic
  const elements = useMemo(() => {
    if (type === 'chars') {
      return children.split('').map((char, index) => (
        <span
          key={index}
          className="kinetic-item"
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            willChange: 'transform, opacity, filter'
          }}
        >
          {char}
        </span>
      ));
    }
    // Words
    return children.split(' ').map((word, index, arr) => (
      <React.Fragment key={index}>
        <span
          className="kinetic-item"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity, filter'
          }}
        >
          {word}
        </span>
        {index < arr.length - 1 && <span>&nbsp;</span>}
      </React.Fragment>
    ));
  }, [children, type]);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.kinetic-item');
    if (!items.length) return;

    const ctx = gsap.context(() => {
      // Configuration based on animation type
      let fromVars: gsap.TweenVars = { opacity: 0 };
      let toVars: gsap.TweenVars = { opacity: 1, duration, stagger, delay };

      switch (animation) {
        case 'blur':
          fromVars = { opacity: 0, filter: 'blur(12px)', scale: 1.1, y: 20 };
          toVars = { ...toVars, filter: 'blur(0px)', scale: 1, y: 0, ease: 'power3.out' };
          break;
        case 'skew':
          fromVars = { opacity: 0, y: 50, skewY: 10, transformOrigin: 'left top' };
          toVars = { ...toVars, y: 0, skewY: 0, ease: 'power4.out' };
          break;
        case 'scramble':
          // Simulate scramble via rapid y movement + opacity
          fromVars = { opacity: 0, y: -20, rotateX: 90 };
          toVars = { ...toVars, y: 0, rotateX: 0, ease: 'back.out(1.7)' };
          break;
        case 'reveal':
          fromVars = { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' };
          toVars = { ...toVars, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'expo.out' };
          break;
      }

      if (scrollTrigger) {
        toVars.scrollTrigger = {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        };
        // Remove delay if triggered by scroll to prevent weird pops
        delete toVars.delay;
      }

      toVars.onComplete = () => {
        gsap.set(items, { clearProps: 'all' });
      };

      // Ensure they start completely invisible
      gsap.set(items, fromVars);
      gsap.to(items, toVars);
    }, containerRef);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, scrollTrigger]);

  return (
    <div ref={containerRef} style={{ perspective: '1000px', display: 'inline-block' }}>
      {elements}
    </div>
  );
}
