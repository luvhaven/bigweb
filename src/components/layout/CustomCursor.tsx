'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Physics-driven cursor coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Elite physics config
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (magneticElement) {
        // If magnetic, calculate pull to center of element with subtle parallax
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Parallax depth calculation (cursor pulls toward center but tracks mouse slightly)
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // 0.2 factor = cursor moves 20% of the distance from center to actual mouse
        cursorX.set(centerX + distanceX * 0.2);
        cursorY.set(centerY + distanceY * 0.2);
      } else {
        // Normal tracking
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for generic hover states
      if (target.closest('a, button, [data-cursor-hover], input, textarea')) {
        setHovering(true);
      } else {
        setHovering(false);
      }

      // Check for magnetic pull (data-magnetic="true")
      const magnetic = target.closest('[data-magnetic="true"]') as HTMLElement;
      if (magnetic) {
        setMagneticElement(magnetic);
      } else {
        setMagneticElement(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);

    // Fallback if mouse leaves window
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [cursorX, cursorY, rawX, rawY, magneticElement]);

  if (!isVisible) return null;

  return (
    <>
      {/* 
        The core cursor dot. 
        It scales up and changes to 'difference' blend mode when hovering text or links.
      */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 80 : 12,
          height: hovering ? 80 : 12,
          backgroundColor: magneticElement ? 'rgba(212, 175, 106, 0.1)' : (hovering ? 'var(--color-text-primary)' : 'var(--color-gold-bright)'),
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: magneticElement ? 1.5 : (hovering ? 1 : 1),
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* 
        Subtle outer ring that only shows when NOT hovering or magnetic.
        Gives a premium targeting reticle feel.
      */}
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
          scale: hovering || magneticElement ? 0 : 1,
          opacity: hovering || magneticElement ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  );
}
