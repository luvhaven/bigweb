'use client';

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

interface VelocityTextProps {
  children: React.ReactNode;
  className?: string;
  baseVelocity?: number;
}

export default function VelocityText({ children, className = "", baseVelocity = 0 }: VelocityTextProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Skew text based on scroll velocity
  const skew = useTransform(smoothVelocity, [-1000, 0, 1000], [10, 0, -10]);
  const yOffset = useTransform(smoothVelocity, [-1000, 0, 1000], [-15, 0, 15]);

  return (
    <motion.div 
      style={{ 
        skewY: skew, 
        y: yOffset,
        display: 'inline-block',
        transformOrigin: 'center center'
      }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}
