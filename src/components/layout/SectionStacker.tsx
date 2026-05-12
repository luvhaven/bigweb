'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionStacker({ children, index }: { children: React.ReactNode, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <div ref={containerRef} style={{ position: 'sticky', top: 0, height: 'auto', zIndex: index, overflow: 'hidden' }}>
      <motion.div style={{ scale, opacity, y, filter, transformOrigin: 'top center' }}>
        {children}
      </motion.div>
    </div>
  );
}
