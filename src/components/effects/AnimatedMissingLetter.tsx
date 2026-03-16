'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedMissingLetterProps {
    letter: string
    dropDistance?: string // e.g., '100vh', '500px'
    color?: string
    delay?: number
}

export default function AnimatedMissingLetter({ letter, dropDistance = '-80vh', color = '#d4a853', delay = 0 }: AnimatedMissingLetterProps) {
    const letterRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!letterRef.current || !containerRef.current) return

        const ctx = gsap.context(() => {
            gsap.fromTo(letterRef.current, 
                { 
                    y: dropDistance,
                    opacity: 0,
                    scale: 3,
                    rotation: -15
                },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        end: 'top 40%',
                        scrub: 1.5,
                    },
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    ease: 'bounce.out',
                    delay: delay
                }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [dropDistance, delay])

    return (
        <span ref={containerRef} className="relative inline-block overflow-visible w-[0.6em] text-center mx-[0.05em]">
            <span 
                ref={letterRef} 
                className="absolute left-0 right-0 z-50 inline-block font-black"
                style={{ color }}
            >
                {letter}
            </span>
            {/* Invisible spacer */}
            <span className="opacity-0">{letter}</span>
        </span>
    )
}
