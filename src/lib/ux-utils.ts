/**
 * SMOOTH SCROLL BEHAVIOR
 * Enhances scroll experience across the site
 */

export const initSmoothScroll = () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault()
            const href = this.getAttribute('href')
            if (href) {
                const target = document.querySelector(href)
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
                }
            }
        })
    })
}

/**
 * INTERSECTION OBSERVER UTILITIES
 * For lazy loading and scroll animations
 */

export const createScrollObserver = (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) => {
    const defaultOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        ...options
    }

    return new IntersectionObserver(callback, defaultOptions)
}

/**
 * FOCUS TRAP UTILITY
 * For modals and overlays
 */

export const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus()
                e.preventDefault()
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus()
                e.preventDefault()
            }
        }
    }

    element.addEventListener('keydown', handleTabKey)
    firstFocusable?.focus()

    return () => {
        element.removeEventListener('keydown', handleTabKey)
    }
}

/**
 * DEBOUNCE UTILITY
 * For performance optimization
 */

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

/**
 * THROTTLE UTILITY
 * For scroll and resize events
 */

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * PRELOAD IMAGES
 * For better perceived performance
 */

export const preloadImages = (urls: string[]) => {
    urls.forEach(url => {
        const img = new Image()
        img.src = url
    })
}

/**
 * DETECT REDUCED MOTION
 * Respect user preferences
 */

export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * SCROLL TO TOP
 * Smooth scroll to page top
 */

export const scrollToTop = (smooth = true) => {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    })
}

/**
 * GET SCROLL PROGRESS
 * Returns scroll progress as percentage
 */

export const getScrollProgress = (): number => {
    if (typeof window === 'undefined') return 0
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    return (winScroll / height) * 100
}
