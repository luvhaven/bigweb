'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface BlockRevealProps {
    onComplete?: () => void
    direction?: 'in' | 'out'
    rows?: number
    cols?: number
    duration?: number
}

export default function BlockReveal({
    onComplete,
    direction = 'in',
    rows = 6,
    cols = 8,
    duration = 0.8,
}: BlockRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        const blocks = containerRef.current?.querySelectorAll('.block')
        if (!blocks || blocks.length === 0) return

        const tl = gsap.timeline({
            onComplete: () => {
                setIsActive(false)
                onComplete?.()
            },
        })

        if (direction === 'in') {
            // Blocks cover the screen
            tl.from(blocks, {
                scaleY: 0,
                transformOrigin: 'bottom',
                stagger: {
                    amount: duration * 0.6,
                    from: 'random',
                    grid: [rows, cols],
                },
                ease: 'expo.inOut',
                duration: duration * 0.5,
            })
        } else {
            // Blocks reveal the content
            tl.to(blocks, {
                scaleY: 0,
                transformOrigin: 'top',
                stagger: {
                    amount: duration * 0.5,
                    from: 'random',
                    grid: [rows, cols],
                },
                ease: 'expo.inOut',
                duration: duration * 0.6,
            })
        }

        return () => {
            tl.kill()
        }
    }, [direction, rows, cols, duration, onComplete])

    if (!isActive) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {Array.from({ length: rows * cols }).map((_, i) => (
                <div
                    key={i}
                    className="block bg-accent"
                    style={{
                        willChange: 'transform',
                    }}
                />
            ))}
        </div>
    )
}
