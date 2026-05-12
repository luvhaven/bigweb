'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CurtainWipeProps {
    onComplete?: () => void
    direction?: 'in' | 'out'
}

export default function CurtainWipe({
    onComplete,
    direction = 'in',
}: CurtainWipeProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const overlay = overlayRef.current
        if (!container || !overlay) return

        const tl = gsap.timeline({
            onComplete: () => {
                onComplete?.()
            },
        })

        if (direction === 'in') {
            // Sweep UP from bottom to cover screen completely
            tl.fromTo(
                container,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    duration: 0.6,
                    ease: 'expo.inOut',
                }
            )
            // Add a slight brightness flash overlay on peak of transition
            tl.fromTo(
                overlay,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.inOut', yoyo: true, repeat: 1 },
                '-=0.3'
            )
        } else {
            // Sweep UP past the top to reveal the new page
            tl.fromTo(
                container,
                { yPercent: 0 },
                {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'expo.inOut',
                }
            )
        }

        return () => {
            tl.kill()
        }
    }, [direction, onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-[#010101] border-t border-accent/20"
        >
            <div ref={overlayRef} className="absolute inset-0 bg-accent/5 opacity-0 mix-blend-screen" />
            <div className="text-[10px] font-mono tracking-[0.5em] text-zinc-700 uppercase absolute bottom-12">
                BIGWEB
            </div>
        </div>
    )
}
