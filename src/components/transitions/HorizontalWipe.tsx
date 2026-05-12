'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HorizontalWipeProps {
    onComplete?: () => void
    direction?: 'in' | 'out'
    duration?: number
    fromRight?: boolean
}

export default function HorizontalWipe({
    onComplete,
    direction = 'in',
    duration = 0.9,
    fromRight = true,
}: HorizontalWipeProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const startX = fromRight ? 100 : -100
        const endX = 0

        const tl = gsap.timeline({
            onComplete: () => {
                if (direction === 'out') {
                    container.style.display = 'none'
                }
                onComplete?.()
            },
        })

        if (direction === 'in') {
            tl.fromTo(
                container,
                {
                    xPercent: startX,
                    filter: 'blur(0px)',
                },
                {
                    xPercent: endX,
                    filter: 'blur(20px)',
                    duration: duration * 0.5,
                    ease: 'power2.in',
                }
            ).to(container, {
                filter: 'blur(0px)',
                duration: duration * 0.5,
                ease: 'power2.out',
            })
        } else {
            tl.to(container, {
                xPercent: fromRight ? -100 : 100,
                filter: 'blur(20px)',
                duration,
                ease: 'power2.inOut',
            })
        }

        return () => {
            tl.kill()
        }
    }, [direction, duration, fromRight, onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black pointer-events-none"
            style={{
                willChange: 'transform, filter',
            }}
        />
    )
}
