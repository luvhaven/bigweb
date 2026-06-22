'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Next.js 16 Client Component handling all complex cross-component spatial morphing
export default function GSAPGlobalMorphs() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Breakpoint check for graceful mobile degradation
        if (window.innerWidth < 768) return;

        /* =========================================================================
           MORPH 1: Hero Blob to Structured Product Grid
           Action: The golden blob under the Hero headline warps into the solid 
                   background of the ProjectSlideshow/Showreel block.
           ========================================================================= */
        const heroBlob = document.querySelector('.morph-hero-blob');
        const projectGrid = document.querySelector('#project-slideshow');

        if (heroBlob && projectGrid) {
            // Pin the blob and warp its geometry safely using native GPU acceleration
            gsap.to(heroBlob, {
                scrollTrigger: {
                    trigger: projectGrid,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: 1,
                },
                y: '50vh',           // Translate down to intercept the grid
                scaleX: 10,          // Warp into a massive horizontal band
                scaleY: 10,
                borderRadius: '0%',  // Rigid structured geometry
                opacity: 0.1,        // Fade smoothly into the background grid lighting
                ease: 'power2.inOut',
            });
        }

        /* =========================================================================
           MORPH 2: Audit Timeline to Core Value Metric Grid (Reality Check)
           Action: As the vertical progress line ends, it splashes outward. The target 
                   cards below it start as tiny circular clips and violently expand 
                   into their full bounds alongside the timeline conclusion.
           ========================================================================= */
        const metricCards = gsap.utils.toArray('.rc-card-new');
        const growthPathLine = document.querySelector('.growth-morph-laser');

        if (growthPathLine && metricCards.length) {
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: '#reality-check',
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 0.5,
                }
            });

            // Split and warp out effect
            tl2.to(growthPathLine, {
                scaleX: 200,
                opacity: 0,
                ease: 'power4.in',
                duration: 0.5
            }, 0);

            // Cards expand from the laser collision point via clip-path
            metricCards.forEach((card: any, i) => {
                gsap.fromTo(card,
                    { clipPath: 'circle(0% at center)' },
                    {
                        clipPath: 'circle(150% at center)',
                        ease: 'power3.out',
                        duration: 1,
                    }
                );
                tl2.add(gsap.to(card, { clipPath: 'circle(150% at center)', duration: 0.5, ease: 'power2.out' }), i * 0.1);
            });
        }

        /* =========================================================================
           MORPH 3: Calculator Widget to Fullscreen CTA Mask
           Action: Pinned calculator shrinks its bounds dynamically into a liquid 
                   mask, pulling the final dark CTA section upwards through itself.
           ========================================================================= */
        const calculator = document.querySelector('.roi-grid');
        const ctaSection = document.querySelector('#final-cta');
        const simulatorSection = document.querySelector('#roi-simulator');

        if (calculator && ctaSection && simulatorSection) {
            // By pinning the entire simulator structure, we generate a flawless scroll hiatus
            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: simulatorSection,
                    start: 'bottom bottom',
                    end: '+=800',  // Wait for 800px of scrolling
                    pin: true,
                    scrub: 1,
                }
            });

            // The widget's outer boundary liquifies
            tl3.to(calculator, {
                borderRadius: '50%',
                scale: 0.8,
                ease: 'power2.inOut',
                duration: 0.4
            })
                // Then explodes outwards expanding as a viewport clipping mask
                .to(calculator, {
                    scale: 25,
                    opacity: 0, // Reveal the dark backdrop beneath structurally
                    ease: 'power4.inOut',
                    duration: 0.6
                });
        }

    }, { scope: containerRef });

    return <div ref={containerRef} style={{ display: 'none', pointerEvents: 'none' }} />;
}
