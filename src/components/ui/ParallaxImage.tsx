'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // Higher number = more movement
}

export default function ParallaxImage({ src, alt, className = "", speed = 0.2 }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth the scroll
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400
  });

  // Calculate the Y transform based on speed.
  // If speed is 0.2, it will move from -10% to 10%
  const yRange = speed * 100;
  const y = useTransform(smoothProgress, [0, 1], [`-${yRange}%`, `${yRange}%`]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: `-${yRange}%`,
          left: 0,
          right: 0,
          bottom: `-${yRange}%`,
          y,
          width: '100%',
          height: `${100 + (yRange * 2)}%`
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          priority
          className="parallax-inner-img"
        />
      </motion.div>
    </div>
  );
}
