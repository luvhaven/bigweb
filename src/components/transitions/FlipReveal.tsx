'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface FlipRevealProps {
    onComplete?: () => void
    direction?: 'in' | 'out'
    duration?: number
    axis?: 'x' | 'y'
}

export default function FlipReveal({
    onComplete,
    direction = 'in',
    duration = 1.2,
    axis = 'y',
}: FlipRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const rotateProperty = axis === 'y' ? 'rotateY' : 'rotateX'
        const startRotation = direction === 'in' ? -90 : 0
        const endRotation = direction === 'in' ? 0 : 90

        const tl = gsap.timeline({
            onComplete: () => {
                if (direction === 'out') {
                    container.style.display = 'none'
                }
                onComplete?.()
            },
        })

        tl.fromTo(
            container,
            {
                [rotateProperty]: startRotation,
                opacity: direction === 'in' ? 0 : 1,
            },
            {
                [rotateProperty]: endRotation,
                opacity: direction === 'in' ? 1 : 0,
                duration,
                ease: 'power3.inOut',
            }
        )

        return () => {
            tl.kill()
        }
    }, [direction, duration, axis, onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black pointer-events-none"
            style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            }}
        />
    )
}
