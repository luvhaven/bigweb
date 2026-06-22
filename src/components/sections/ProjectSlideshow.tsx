'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const IMAGES = [
  '/projects/luxury-ecommerce.png',
  '/projects/fintech-banking.png',
  '/projects/ai-agent-platform.png',
  '/projects/b2b-enterprise-software.png',
  '/projects/high-end-real-estate.png',
  '/projects/saas-dashboard.png',
  '/projects/fashion-ecommerce.png',
  '/projects/web3-crypto.png',
];

const AUTO_INTERVAL = 3000;

export default function ProjectSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Mouse Parallax Physics (glides the entire container slightly)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const containerX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%']);
  const containerY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % IMAGES.length);
  };

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, AUTO_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMob = () => setIsMobile(window.innerWidth < 768);
    checkMob();
    window.addEventListener('resize', checkMob);
    return () => window.removeEventListener('resize', checkMob);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1500px'
      }}
    >


      <motion.div
        style={{
          x: containerX,
          y: containerY,
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          height: isMobile ? '400px' : '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        {IMAGES.map((src, index) => {
          // Calculate wrapping offset (-2 to +2 for 5 visible cards)
          let offset = index - activeIndex;
          if (offset > IMAGES.length / 2) offset -= IMAGES.length;
          if (offset < -IMAGES.length / 2) offset += IMAGES.length;

          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          // Define positions for spread-out hand of cards
          let animateProps;
          if (offset === 0) {
            animateProps = { x: '0%', y: '0%', rotateZ: 0, scale: 1, zIndex: 10, opacity: 1, filter: 'blur(0px) brightness(1)' };
          } else if (offset === 1) {
            animateProps = { x: isMobile ? '25%' : '45%', y: '5%', rotateZ: 6, scale: 0.85, zIndex: 8, opacity: 1, filter: 'blur(1px) brightness(0.6)' };
          } else if (offset === 2) {
            animateProps = { x: isMobile ? '45%' : '85%', y: '12%', rotateZ: 12, scale: 0.7, zIndex: 6, opacity: 1, filter: 'blur(3px) brightness(0.3)' };
          } else if (offset === -1) {
            animateProps = { x: isMobile ? '-25%' : '-45%', y: '5%', rotateZ: -6, scale: 0.85, zIndex: 8, opacity: 1, filter: 'blur(1px) brightness(0.6)' };
          } else if (offset === -2) {
            animateProps = { x: isMobile ? '-45%' : '-85%', y: '12%', rotateZ: -12, scale: 0.7, zIndex: 6, opacity: 1, filter: 'blur(3px) brightness(0.3)' };
          } else {
            // Hidden cards waiting in reserve
            animateProps = { x: offset > 0 ? '120%' : '-120%', y: '20%', rotateZ: offset > 0 ? 20 : -20, scale: 0.5, zIndex: 0, opacity: 0, filter: 'blur(10px) brightness(0)' };
          }

          return (
            <motion.div
              key={src}
              initial={false}
              animate={animateProps}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] // Elegant easeOut for smooth swiping
              }}
              onMouseEnter={() => isActive && setPaused(true)}
              onMouseLeave={() => isActive && setPaused(false)}
              onClick={() => {
                if (!isActive && isVisible) setActiveIndex(index);
              }}
              style={{
                position: 'absolute',
                width: isMobile ? '80%' : '500px', // Card width relative to container
                height: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: isActive
                  ? '0 30px 60px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,106,0.15), 0 0 40px rgba(212,175,106,0.05)'
                  : '0 20px 40px rgba(0,0,0,0.6)',
                background: '#0a0a0b',
                cursor: isActive ? 'default' : 'pointer',
                border: isActive ? '1px solid rgba(212,175,106,0.2)' : '1px solid rgba(255,255,255,0.03)',
              }}
            >
              <Image
                src={src}
                alt="Featured Project"
                fill
                sizes="(max-width: 768px) 80vw, 500px"
                priority={Math.abs(offset) <= 1}
                style={{ objectFit: 'cover' }}
              />

              {/* Minimal gradient wrapper for depth, but no loud texts */}
              <div style={{
                position: 'absolute', inset: 0,
                background: isActive
                  ? 'linear-gradient(to top, rgba(10,10,11,0.5) 0%, transparent 40%)'
                  : 'transparent',
                pointerEvents: 'none',
                transition: 'background 0.8s ease'
              }} />
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
