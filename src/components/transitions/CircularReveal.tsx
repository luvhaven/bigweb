'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CircularRevealProps {
    onComplete?: () => void
    direction?: 'in' | 'out'
    duration?: number
    originX?: number // 0-100 (percentage)
    originY?: number // 0-100 (percentage)
}

export default function CircularReveal({
    onComplete,
    direction = 'in',
    duration = 1.1,
    originX = 50,
    originY = 50,
}: CircularRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const tl = gsap.timeline({
            onComplete: () => {
                if (direction === 'out') {
                    container.style.display = 'none'
                }
                onComplete?.()
            },
        })

        if (direction === 'in') {
            // Circle expands to cover screen
            tl.fromTo(
                container,
                {
                    clipPath: `circle(0% at ${originX}% ${originY}%)`,
                },
                {
                    clipPath: `circle(150% at ${originX}% ${originY}%)`,
                    duration,
                    ease: 'expo.inOut',
                }
            )
        } else {
            // Circle contracts to reveal content
            tl.to(container, {
                clipPath: `circle(0% at ${originX}% ${originY}%)`,
                duration,
                ease: 'expo.inOut',
            })
        }

        return () => {
            tl.kill()
        }
    }, [direction, duration, originX, originY, onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black pointer-events-none"
            style={{
                willChange: 'clip-path',
            }}
        />
    )
}
