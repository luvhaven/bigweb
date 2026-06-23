'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ObsidianMorph: A cinematic, non-scroll-jacking spatial morph transition.
 * Features a physics-driven curvature and lighting morph that elevates 
 * the enclosed section as it enters the viewport.
 */
export default function ObsidianMorph({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMob = () => setIsMobile(window.innerWidth < 768);
        checkMob();
        window.addEventListener('resize', checkMob);
        return () => window.removeEventListener('resize', checkMob);
    }, []);

    // Track scroll progress passing through the viewport
    // 'start end': Top of the section enters the bottom of the viewport
    // 'start start': Top of the section hits the absolute top of the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start start']
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

    // The physical surface curvature morph
    const borderRadius = useTransform(smoothProgress, [0, 1], ['50vw 50vw 0 0', '0vw 0vw 0 0']);
    const scale = useTransform(smoothProgress, [0, 1], [0.95, 1]);
    const filter = useTransform(smoothProgress, [0, 1], ['brightness(0.3) contrast(1.2)', 'brightness(1) contrast(1)']);

    // Golden horizon glow that intensifies during the morph then settles into the edge
    const shadowAlpha = useTransform(smoothProgress, [0, 0.8, 1], [0, 0.25, 0]);
    const glowValue = useTransform(shadowAlpha, a => `0 -30px 100px rgba(212, 175, 106, ${a}), inset 0 2px 0px rgba(212, 175, 106, ${a * 2.5})`);

    // Guarantee perfectly identical DOM structures during SSR and Client passes
    // to prevent React hydration mismatches and ensure `useScroll` attaches properly.
    const isDesktopEnabled = mounted && !isMobile;

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', zIndex: 10 }}>
            {/* The monolithic morphing hull */}
            <motion.div
                style={{
                    borderTopLeftRadius: isDesktopEnabled ? borderRadius : 0,
                    borderTopRightRadius: isDesktopEnabled ? borderRadius : 0,
                    scale: isDesktopEnabled ? scale : 1,
                    filter: isDesktopEnabled ? filter : 'none',
                    boxShadow: isDesktopEnabled ? glowValue : 'none',
                    width: '100%',
                    background: isDesktopEnabled ? '#050505' : 'transparent',
                    position: 'relative',
                    overflow: 'hidden',
                    transformOrigin: 'bottom center',
                    willChange: 'transform, border-radius, filter',
                    opacity: (mounted && isMobile) ? smoothProgress : 1
                }}
            >
                {/* Immersive Edge Bleed (Inner organic glow) */}
                <motion.div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, height: '4px',
                        background: 'linear-gradient(90deg, transparent, var(--color-gold-bright), transparent)',
                        opacity: isDesktopEnabled ? shadowAlpha : 0,
                        filter: 'blur(3px)',
                        zIndex: 20,
                        pointerEvents: 'none'
                    }}
                />

                {children}
            </motion.div>
        </div>
    );
}
