'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Math variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Setup spring physics for butter-smooth return to center
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse displacement to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  // Dynamic light glare effect
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.2]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['-100%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['-100%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates between -0.5 and 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        perspective: 1000,
        transformStyle: 'preserve-3d',
        height: '100%',
        display: 'block'
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {children}
        
        {/* Pointer-reactive light glare */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 50%, rgba(212,175,106,1) 0%, transparent 60%)',
            left: glareX,
            top: glareY,
            opacity: glareOpacity,
            mixBlendMode: 'screen',
            zIndex: 10,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
