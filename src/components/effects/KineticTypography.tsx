'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface TextSegment {
    text: string
    className?: string
}

interface KineticTypographyProps {
    segments?: TextSegment[]
    text?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
    className?: string
    delay?: number
    duration?: number
    splitBy?: 'words' | 'chars'
    stagger?: number
}

export default function KineticTypography({
    segments,
    text,
    as: Tag = 'h2',
    className = '',
    delay = 0,
    duration = 0.8,
    splitBy = 'words',
    stagger = 0.02
}: KineticTypographyProps) {
    const containerRef = useRef<any>(null)
    const finalSegments = segments || (text ? [{ text }] : [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const innerElements = container.querySelectorAll('.kinetic-inner')

        // Initial state set to prevent FOUC
        gsap.set(innerElements, { opacity: 0 })

        const ctx = gsap.context(() => {
            gsap.to(innerElements, {
                scrollTrigger: {
                    trigger: container,
                    start: 'top 92%',
                    toggleActions: 'play none none reverse',
                    fastScrollEnd: true,
                    // Force refresh to handle dynamic layout shifts
                    onRefresh: (self) => {
                        if (self.progress > 0 && !self.isActive) {
                            gsap.set(innerElements, { y: '0%', opacity: 1 })
                        }
                    }
                },
                y: '0%',
                opacity: 1,
                duration: duration,
                ease: 'power3.out',
                stagger: stagger,
                delay: delay
            })
        }, container)

        // Ensure triggers are properly calculated after layout settles
        ScrollTrigger.refresh()

        return () => ctx.revert()
    }, [segments, text, splitBy, duration, delay, stagger])

    let globalCounter = 0

    return (
        <Tag
            ref={containerRef}
            className={`${className} perspective-[1000px]`}
            aria-label={text || segments?.map(s => s.text).join(' ')}
        >
            {finalSegments.map((segment, sIdx) => {
                const words = segment.text.split(splitBy === 'words' ? ' ' : '')
                return (
                    <span key={sIdx} className={segment.className}>
                        {words.map((word, wIdx) => {
                            const isEven = globalCounter % 2 === 0
                            globalCounter++

                            return (
                                <span
                                    key={wIdx}
                                    className="kinetic-outer overflow-hidden inline-block align-top"
                                    style={{ display: 'inline-block' }}
                                >
                                    <span
                                        className="kinetic-inner inline-block"
                                        style={{
                                            display: 'inline-block',
                                            transform: isEven ? 'translateY(110%)' : 'translateY(-110%)',
                                            opacity: 0
                                        }}
                                    >
                                        {word === '' && splitBy === 'chars' ? '\u00A0' : word}
                                    </span>
                                    {splitBy === 'words' && wIdx < words.length - 1 && '\u00A0'}
                                </span>
                            )
                        })}
                    </span>
                )
            })}
        </Tag>
    )
}
