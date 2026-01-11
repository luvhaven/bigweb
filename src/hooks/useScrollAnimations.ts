'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

/**
 * ELITE SCROLL ANIMATIONS
 * Award-winning scroll-driven animations using GSAP
 * Parallax, reveals, counters, and cinematic sequences
 */

interface UseScrollAnimationOptions {
    trigger?: string
    start?: string
    end?: string
    scrub?: boolean | number
    markers?: boolean
    once?: boolean
}

// Hook for basic scroll reveal
export function useScrollReveal(options: UseScrollAnimationOptions = {}) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const animation = gsap.fromTo(
            element,
            {
                opacity: 0,
                y: 100,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: options.start || 'top 85%',
                    end: options.end || 'bottom 20%',
                    toggleActions: options.once ? 'play none none none' : 'play reverse play reverse',
                    markers: options.markers || false
                }
            }
        )

        return () => {
            animation.kill()
        }
    }, [options])

    return elementRef
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5, options: UseScrollAnimationOptions = {}) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const animation = gsap.to(element, {
            y: () => -window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                markers: options.markers || false
            }
        })

        return () => {
            animation.kill()
        }
    }, [speed, options])

    return elementRef
}

// Hook for stagger animation (children animate in sequence)
export function useStaggerReveal(staggerDelay: number = 0.1, options: UseScrollAnimationOptions = {}) {
    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const children = container.children

        const animation = gsap.fromTo(
            children,
            {
                opacity: 0,
                y: 60,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: staggerDelay,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: options.start || 'top 80%',
                    toggleActions: options.once ? 'play none none none' : 'play reverse play reverse',
                    markers: options.markers || false
                }
            }
        )

        return () => {
            animation.kill()
        }
    }, [staggerDelay, options])

    return containerRef
}

// Hook for number counter animation
export function useCounterAnimation(target: number, duration: number = 2) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const obj = { value: 0 }

        const animation = gsap.to(obj, {
            value: target,
            duration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate: () => {
                if (element) {
                    element.textContent = Math.floor(obj.value).toLocaleString()
                }
            }
        })

        return () => {
            animation.kill()
        }
    }, [target, duration])

    return elementRef
}

// Hook for clip-path reveal (cinematic entrance)
export function useClipReveal(direction: 'vertical' | 'horizontal' | 'diagonal' = 'vertical', options: UseScrollAnimationOptions = {}) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        let fromClip = ''
        let toClip = 'inset(0% 0% 0% 0%)'

        switch (direction) {
            case 'vertical':
                fromClip = 'inset(100% 0% 0% 0%)'
                break
            case 'horizontal':
                fromClip = 'inset(0% 100% 0% 0%)'
                break
            case 'diagonal':
                fromClip = 'inset(100% 100% 0% 0%)'
                break
        }

        const animation = gsap.fromTo(
            element,
            {
                clipPath: fromClip
            },
            {
                clipPath: toClip,
                duration: 1.5,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: element,
                    start: options.start || 'top 75%',
                    toggleActions: 'play none none none',
                    markers: options.markers || false
                }
            }
        )

        return () => {
            animation.kill()
        }
    }, [direction, options])

    return elementRef
}

// Hook for character-by-character text reveal
export function useTextReveal(options: UseScrollAnimationOptions = {}) {
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = elementRef.current
        if (!element || !element.textContent) return

        // Split text into individual characters
        const text = element.textContent
        element.innerHTML = text
            .split('')
            .map((char) => `<span class="inline-block opacity-0" style="transform: translateY(50px)">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('')

        const chars = element.querySelectorAll('span')

        const animation = gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: options.start || 'top 80%',
                toggleActions: 'play none none none',
                markers: options.markers || false
            }
        })

        return () => {
            animation.kill()
            if (element) element.textContent = text // Restore original text
        }
    }, [options])

    return elementRef
}
