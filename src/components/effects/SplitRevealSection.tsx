'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface SplitRevealSectionProps {
    children: React.ReactNode
    splitDirection?: 'vertical' | 'horizontal'
    className?: string
    zIndex?: number
}

export default function SplitRevealSection({ children, splitDirection = 'vertical', className = '', zIndex = 1 }: SplitRevealSectionProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const upperRef = useRef<HTMLDivElement>(null)
    const lowerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const upper = upperRef.current
        const lower = lowerRef.current

        if (!section || !upper || !lower) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=100%',
                    scrub: 1,
                    pin: true,
                    pinSpacing: false, // critical for revealing the next section underneath
                    anticipatePin: 1
                }
            })

            if (splitDirection === 'vertical') {
                tl.to(upper, { yPercent: -100, ease: 'none' }, 0)
                  .to(lower, { yPercent: 100, ease: 'none' }, 0)
            } else {
                tl.to(upper, { xPercent: -100, ease: 'none' }, 0)
                  .to(lower, { xPercent: 100, ease: 'none' }, 0)
            }
        }, section)

        return () => ctx.revert()
    }, [splitDirection])

    return (
        <section ref={sectionRef} className={`relative overflow-hidden ${className}`} style={{ zIndex }}>
            {/* Split top/left */}
            <div ref={upperRef} className="absolute inset-0 origin-top overflow-hidden" style={{ clipPath: splitDirection === 'vertical' ? 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' : 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>
                <div className="absolute inset-0">{children}</div>
            </div>
            
            {/* Split bottom/right */}
            <div ref={lowerRef} className="absolute inset-0 origin-bottom overflow-hidden" style={{ clipPath: splitDirection === 'vertical' ? 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}>
                <div className="absolute inset-0">{children}</div>
            </div>

            {/* Hidden original for layout footprint */}
            <div className="opacity-0 pointer-events-none">{children}</div>
        </section>
    )
}
