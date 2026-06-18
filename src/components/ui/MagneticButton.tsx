'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export default function MagneticButton({ href, onClick, children, className = '', type = 'button', style }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Framer Motion Springs for silky smooth haptic physics
  const x = useSpring(0, { stiffness: 400, damping: 25, mass: 0.5 });
  const y = useSpring(0, { stiffness: 400, damping: 25, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = btn.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      if (glowRef.current) {
        const glowX = clientX - left;
        const glowY = clientY - top;
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      }

      // Magnetic Pull
      const strength = 20;
      const pullX = (distanceX / (width / 2)) * strength;
      const pullY = (distanceY / (height / 2)) * strength;

      x.set(Math.max(-strength, Math.min(strength, pullX)));
      y.set(Math.max(-strength, Math.min(strength, pullY)));
    };

    const handleMouseEnter = () => setHovering(true);
    
    const handleMouseLeave = () => {
      setHovering(false);
      x.set(0);
      y.set(0);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  const glowContent = (
    <div 
      ref={glowRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '150%',
        paddingBottom: '150%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 106, 0.3) 0%, transparent 60%)',
        opacity: hovering ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );

  const containerStyle: React.CSSProperties = {
    ...style,
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
  };

  const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      ref={buttonRef}
      style={{ x, y, ...containerStyle }}
      whileTap={{ scale: 0.95 }}
      className={`magnetic-btn ${className}`}
      data-cursor-hover
      onClick={onClick}
    >
      {glowContent}
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 'inherit', width: '100%', justifyContent: 'inherit', pointerEvents: 'none' }}>
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} style={{ display: 'inline-block' }}>
        <MotionWrapper>{children}</MotionWrapper>
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      style={{ padding: 0, border: 'none', background: 'none' }}
      onClick={(e) => {
        if (onClick) onClick();
      }}
    >
      <MotionWrapper>{children}</MotionWrapper>
    </button>
  );
}
