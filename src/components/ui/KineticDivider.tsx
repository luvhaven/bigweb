'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * KineticDivider: A scroll-triggered, world-class section divider.
 * It features a gold "scanning" head that travels along a dashed line.
 */
export default function KineticDivider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const scannerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 95%',
                end: 'bottom 5%',
                toggleActions: 'play none none none'
            }
        });

        // 1. Reveal the line
        tl.fromTo(lineRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 0.1, duration: 1.5, ease: 'power4.out' }
        );

        // 2. The "Scan" pulse
        tl.fromTo(scannerRef.current,
            { x: '-100%', opacity: 0 },
            { x: '100%', opacity: 1, duration: 2.5, ease: 'expo.inOut' },
            0.5
        );

        tl.to(scannerRef.current, { opacity: 0, duration: 1 }, "-=1");

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '1px',
                position: 'relative',
                margin: 'var(--space-20) 0',
                overflow: 'hidden'
            }}
        >
            {/* The Main Track */}
            <div
                ref={lineRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, var(--color-gold-bright) 50%, transparent)',
                    transformOrigin: 'center'
                }}
            />

            {/* The Kinetic Scanner Head */}
            <div
                ref={scannerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '30%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, var(--color-gold-bright), transparent)',
                    filter: 'blur(2px) drop-shadow(0 0 8px var(--color-gold-bright))',
                    zIndex: 2
                }}
            />
        </div>
    );
}
