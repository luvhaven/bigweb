'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TrackingRadar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const radarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !radarRef.current) return;

        // Pulse rings continuously
        gsap.to('.radar-ring', {
            scale: 1.5,
            opacity: 0,
            duration: 3,
            stagger: 0.8,
            repeat: -1,
            ease: "power2.out"
        });

        // Subtly track mouse
        const handleMouseMove = (e: MouseEvent) => {
            if (!radarRef.current) return;
            const { clientX, clientY } = e;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            // Small tracking offset
            const xOffset = (clientX - cx) * 0.05;
            const yOffset = (clientY - cy) * 0.05;

            gsap.to(radarRef.current, {
                x: xOffset,
                y: yOffset,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                ref={radarRef}
                style={{
                    position: 'relative',
                    width: '500px',
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mixBlendMode: 'screen',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle, rgba(212,175,106,0.15) 0%, transparent 70%)'
                    }}
                />
                {/* Tracking rings */}
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="radar-ring"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '1px solid rgba(212,175,106,0.4)',
                            boxShadow: '0 0 20px rgba(212,175,106,0.1) inset',
                        }}
                    />
                ))}

                {/* Center dot */}
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-gold-bright)',
                    boxShadow: '0 0 15px var(--color-gold-bright)',
                }} />

                {/* Scanning sweep */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, transparent 70%, rgba(212,175,106,0.4) 100%)',
                    animation: 'spin 4s linear infinite',
                }} />
            </div>

            <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
