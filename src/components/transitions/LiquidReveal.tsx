'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LiquidRevealProps {
    direction?: 'in' | 'out'
    onComplete?: () => void
}

export default function LiquidReveal({ direction = 'in', onComplete }: LiquidRevealProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const filterRef = useRef<SVGFETurbulenceElement>(null)

    useEffect(() => {
        const overlay = overlayRef.current
        const filter = filterRef.current
        if (!overlay || !filter) return

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete()
            }
        })

        if (direction === 'in') {
            tl.set(overlay, { opacity: 1, scaleY: 0, transformOrigin: 'top' })
            tl.to(overlay, {
                scaleY: 1,
                duration: 1.2,
                ease: 'expo.inOut'
            })
            tl.to(filter, {
                attr: { baseFrequency: 0.05 },
                duration: 0.6,
                ease: 'power2.in'
            }, 0)
            tl.to(filter, {
                attr: { baseFrequency: 0 },
                duration: 0.6,
                ease: 'power2.out'
            }, 0.6)
        } else {
            tl.set(overlay, { opacity: 1, scaleY: 1, transformOrigin: 'bottom' })
            tl.to(overlay, {
                scaleY: 0,
                duration: 1,
                ease: 'expo.inOut',
                delay: 0.2
            })
            tl.to(filter, {
                attr: { baseFrequency: 0.08 },
                duration: 0.5,
                ease: 'power2.in'
            }, 0.2)
            tl.to(filter, {
                attr: { baseFrequency: 0 },
                duration: 0.5,
                ease: 'power2.out'
            }, 0.7)
        }

        return () => {
            tl.kill()
        }
    }, [direction])

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            <svg className="hidden">
                <filter id="liquid-filter">
                    <feTurbulence
                        ref={filterRef}
                        type="fractalNoise"
                        baseFrequency="0"
                        numOctaves="3"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="50"
                    />
                </filter>
            </svg>
            <div
                ref={overlayRef}
                className="w-full h-full bg-accent"
                style={{ filter: 'url(#liquid-filter)' }}
            />
        </div>
    )
}
