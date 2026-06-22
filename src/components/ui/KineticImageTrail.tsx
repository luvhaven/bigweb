'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface KineticImageTrailProps {
    images: string[];
}

export default function KineticImageTrail({ images }: KineticImageTrailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

    // State machine for tracking trail logic
    const state = useRef({
        currentIndex: 0,
        lastMousePos: { x: 0, y: 0 },
        distanceThreshold: 100, // Distance to travel before popping a new image
        zIndex: 10,
    });

    useEffect(() => {
        if (!containerRef.current || images.length === 0) return;

        // Set initial state of all images (hidden and scaled down)
        gsap.set(imageRefs.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { lastMousePos, distanceThreshold } = state.current;

            const deltaX = clientX - lastMousePos.x;
            const deltaY = clientY - lastMousePos.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > distanceThreshold) {
                state.current.lastMousePos = { x: clientX, y: clientY };

                const targetImage = imageRefs.current[state.current.currentIndex];

                if (targetImage) {
                    // Increment z-index so newest image is on top
                    state.current.zIndex++;
                    targetImage.style.zIndex = state.current.zIndex.toString();

                    // Move the physical image anchor to the exact cursor
                    gsap.set(targetImage, { x: clientX, y: clientY });

                    // Animate the pop-in mechanism
                    const tl = gsap.timeline();
                    tl.fromTo(
                        targetImage,
                        { opacity: 0, scale: 0.2, rotation: gsap.utils.random(-15, 15) },
                        { opacity: 1, scale: 1, rotation: gsap.utils.random(-5, 5), duration: 0.6, ease: 'back.out(1.5)' }
                    )
                        // Then fade and drop out
                        .to(
                            targetImage,
                            { opacity: 0, scale: 0.8, y: '+=100', duration: 0.8, ease: 'power2.inOut', delay: 0.4 }
                        );
                }

                // Loop array
                state.current.currentIndex = (state.current.currentIndex + 1) % images.length;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [images.length]);

    if (!images || images.length === 0) return null;

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
        >
            {images.map((src, i) => (
                <img
                    key={i}
                    ref={(el) => { imageRefs.current[i] = el; }}
                    src={src}
                    alt="Trail frame"
                    style={{
                        position: 'absolute',
                        width: '280px',
                        height: '360px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(212,175,106,0.3)',
                        willChange: 'transform, opacity',
                    }}
                />
            ))}
        </div>
    );
}
