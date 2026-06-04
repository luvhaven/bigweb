'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxProps {
    children: ReactNode;
    offset?: number;
    className?: string;
}

export default function Parallax({ children, offset = 50, className = '' }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Convert the 0-1 scroll progress into a pixel offset transform
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    // Apply a light spring to smooth out any subpixel jitter
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.1 });

    return (
        <div ref={ref} className={className} style={{ overflow: 'visible', willChange: 'transform' }}>
            <motion.div style={{ y: smoothY, willChange: 'transform', width: '100%', height: '100%' }}>
                {children}
            </motion.div>
        </div>
    );
}
