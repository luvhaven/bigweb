'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * StickyMaskMorph: A high-fidelity "Obsidian Portal" reveal.
 * It pins a 100vh section and expands a mask to reveal content seamlessly.
 * Optimized for Next.js 16 and mobile-safe degradation.
 */
export default function StickyMaskMorph({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Tablets and below get standard reveal
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!mounted || isMobile) return;

        gsap.registerPlugin(ScrollTrigger);

        // Define the expansion timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',      // Trigger when the section reaches top of viewport
                end: '+=1200',         // Immersion duration
                scrub: 1,              // Smooth micro-stutter tracking
                pin: true,             // Lock the viewport
                anticipatePin: 1,      // Prevent jumpiness on heavy pages
                invalidateOnRefresh: true,
            }
        });

        tl.to(maskRef.current, {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'power2.inOut',
        });

        // Ambient "True Obsidian" contrast boost
        tl.to(maskRef.current, {
            filter: 'brightness(1) contrast(1)',
            duration: 1
        }, 0);

    }, { scope: containerRef, dependencies: [mounted, isMobile] });

    if (!mounted) return <div className={className}>{children}</div>;

    return (
        <div
            ref={containerRef}
            className={`sticky-mask-container ${className}`}
            style={{
                width: '100%',
                height: isMobile ? 'auto' : '100vh',
                position: 'relative',
                overflow: isMobile ? 'visible' : 'hidden',
                background: 'var(--color-bg-primary)',
            }}
        >
            <div
                ref={maskRef}
                className="sticky-mask-portal"
                style={{
                    width: '100%',
                    height: '100%',
                    // Tablet/Mobile show full content, Desktop starts in portal
                    clipPath: isMobile ? 'none' : 'inset(30% 20% 30% 20% round 120px)',
                    willChange: 'clip-path, filter',
                    filter: isMobile ? 'none' : 'brightness(0.6) contrast(1.1)',
                    position: 'relative',
                    zIndex: 2,
                    background: 'var(--color-bg-primary)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Immersive Gold Edge Glow */}
                {!isMobile && (
                    <div className="portal-glow" style={{
                        position: 'absolute',
                        inset: 0,
                        boxShadow: 'inset 0 0 150px rgba(212, 175, 106, 0.08)',
                        pointerEvents: 'none',
                        zIndex: 1,
                        opacity: 1
                    }} />
                )}

                <div style={{ flex: 1, width: '100%' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
