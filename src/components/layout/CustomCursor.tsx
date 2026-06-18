'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply spring physics for the buttery, elite feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea')) {
        setHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea')) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 64 : 16,
          height: hovering ? 64 : 16,
          backgroundColor: hovering ? 'var(--color-bg-primary)' : 'var(--color-gold-bright)',
          border: hovering ? '2px solid var(--color-gold-bright)' : 'none',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: hovering ? 'difference' : 'normal',
        }}
        animate={{
          scale: hovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* Subtle outer glow when not hovering */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: 48,
          height: 48,
          backgroundColor: 'transparent',
          border: '1px solid rgba(212, 175, 106, 0.2)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        animate={{
          scale: hovering ? 0 : 1,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  );
}
