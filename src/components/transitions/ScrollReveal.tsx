'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
    children: ReactNode
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
    delay?: number
    duration?: number
    stagger?: number
    className?: string
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    stagger = 0,
    className = '',
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const childElements = stagger > 0 ? element.children : [element]

        let fromVars: gsap.TweenVars = { opacity: 0 }

        switch (direction) {
            case 'up':
                fromVars.y = 40
                break
            case 'down':
                fromVars.y = -40
                break
            case 'left':
                fromVars.x = 40
                break
            case 'right':
                fromVars.x = -40
                break
            case 'fade':
                // Only opacity
                break
        }

        const animation = gsap.fromTo(
            childElements,
            fromVars,
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                stagger: stagger > 0 ? stagger : 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        )

        return () => {
            animation.kill()
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === element) {
                    trigger.kill()
                }
            })
        }
    }, [direction, delay, duration, stagger])

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    )
}
