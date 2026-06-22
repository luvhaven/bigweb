'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function StickyMaskMorph({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Safe Breakpoint: Don't execute complex mask morphs on mobile to save performance
        if (window.innerWidth < 768) {
            gsap.set(maskRef.current, { clipPath: 'inset(0% 0% 0% 0% round 0px)' });
            return;
        }

        // Portal Expansion Pin: The wrapper freezes while expanding its viewport mask bounds
        gsap.to(maskRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'center center',
                end: '+=800', // 800px scrub track for a rapid, immersive portal wipe
                scrub: true,
                pin: true,
            },
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                position: 'relative',
                zIndex: 5
            }}
        >
            <div
                ref={maskRef}
                style={{
                    width: '100%',
                    height: '100%',
                    clipPath: 'inset(25% 15% 30% 15% round 120px)', // The origin pill cutout
                    willChange: 'clip-path'
                }}
            >
                {children}
            </div>
        </div>
    );
}
