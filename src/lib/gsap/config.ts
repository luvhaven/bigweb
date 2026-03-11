import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// Default GSAP configuration
export const gsapConfig = {
    defaults: {
        duration: 0.8,
        ease: 'power2.out',
    },
    scrollTrigger: {
        start: 'top 85%',
        toggleActions: 'play none none none',
    },
}

// Apply global GSAP defaults
gsap.defaults(gsapConfig.defaults)

// Custom easing functions
export const customEases = {
    smooth: 'cubic-bezier(0.76, 0, 0.24, 1)',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'back.out(1.7)',
    expo: 'expo.inOut',
}

// Utility to kill all ScrollTriggers
export function killAllScrollTriggers() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

// Utility to refresh all ScrollTriggers
export function refreshScrollTriggers() {
    ScrollTrigger.refresh()
}

// Utility to create a basic fade-in animation
export function fadeIn(element: HTMLElement | string, options = {}) {
    return gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            ...options,
        }
    )
}

// Utility to create a staggered fade-in animation
export function staggerFadeIn(elements: HTMLElement[] | string, options = {}) {
    return gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ...options,
        }
    )
}

// Utility to create a parallax effect
export function createParallax(element: HTMLElement | string, speed = 0.5) {
    return gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    })
}

// Utility to create a pinned section
export function createPinnedSection(
    element: HTMLElement | string,
    options: ScrollTrigger.Vars = {}
) {
    return ScrollTrigger.create({
        trigger: element,
        pin: true,
        start: 'top top',
        end: 'bottom bottom',
        ...options,
    })
}

// Utility to create horizontal scroll
export function createHorizontalScroll(
    container: HTMLElement | string,
    items: HTMLElement[] | string,
    options = {}
) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${typeof container === 'string' ? document.querySelector(container)?.scrollWidth : container.scrollWidth}`,
            ...options,
        },
    })

    tl.to(items, {
        xPercent: -100 * (Array.isArray(items) ? items.length - 1 : 1),
        ease: 'none',
    })

    return tl
}

// Utility for reduced motion preference
export function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
        gsap.globalTimeline.timeScale(100) // Speed up animations drastically
        ScrollTrigger.config({ limitCallbacks: true })
    }
}

// Initialize GSAP with reduced motion check
if (typeof window !== 'undefined') {
    respectReducedMotion()
}
