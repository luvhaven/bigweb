import gsap from 'gsap'

/**
 * Creates a FLIP (First, Last, Invert, Play) animation
 * Useful for smooth element transitions between states
 */
export function flip(
    element: HTMLElement,
    callback: () => void,
    options: gsap.TweenVars = {}
) {
    const first = element.getBoundingClientRect()

    callback()

    const last = element.getBoundingClientRect()

    const deltaX = first.left - last.left
    const deltaY = first.top - last.top
    const deltaW = first.width / last.width
    const deltaH = first.height / last.height

    return gsap.fromTo(
        element,
        {
            x: deltaX,
            y: deltaY,
            scaleX: deltaW,
            scaleY: deltaH,
        },
        {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.6,
            ease: 'power2.out',
            ...options,
        }
    )
}

/**
 * Creates a magnetic hover effect
 */
export function magneticHover(element: HTMLElement, strength = 0.3) {
    const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        gsap.to(element, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
        })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
    }
}

/**
 * Creates a smooth counter animation
 */
export function animateCounter(
    element: HTMLElement,
    endValue: number,
    options: { duration?: number; decimals?: number } = {}
) {
    const { duration = 2, decimals = 0 } = options

    const obj = { value: 0 }

    return gsap.to(obj, {
        value: endValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = obj.value.toFixed(decimals)
        },
    })
}

/**
 * Creates a text reveal animation (character by character)
 */
export function revealText(element: HTMLElement, options: gsap.TweenVars = {}) {
    const text = element.textContent || ''
    element.innerHTML = text
        .split('')
        .map((char) => `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')

    const chars = element.querySelectorAll('.char')

    return gsap.fromTo(
        chars,
        {
            opacity: 0,
            y: 20,
            filter: 'blur(8px)',
        },
        {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.02,
            duration: 0.8,
            ease: 'power2.out',
            ...options,
        }
    )
}

/**
 * Creates a morphing shape animation
 */
export function morphShape(
    element: SVGElement,
    targetPath: string,
    options: gsap.TweenVars = {}
) {
    return gsap.to(element, {
        attr: { d: targetPath },
        duration: 1,
        ease: 'power2.inOut',
        ...options,
    })
}

/**
 * Creates a wave animation for multiple elements
 */
export function createWave(elements: HTMLElement[] | NodeListOf<Element>, options = {}) {
    return gsap.fromTo(
        elements,
        { y: 0 },
        {
            y: -10,
            stagger: {
                each: 0.1,
                repeat: -1,
                yoyo: true,
            },
            duration: 0.5,
            ease: 'sine.inOut',
            ...options,
        }
    )
}

/**
 * Batch utility for scroll-triggered animations
 */
export function batchScrollReveal(selector: string, options = {}) {
    const elements = document.querySelectorAll(selector)

    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            y: 50,
        },
        {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: selector,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            ...options,
        }
    )
}
