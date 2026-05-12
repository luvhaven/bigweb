// Performance monitoring utilities for Core Web Vitals

export function reportWebVitals(metric: any) {
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
        })
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric)
    }
}

// Preload critical resources
export function preloadCriticalAssets() {
    if (typeof window === 'undefined') return

    // Preload fonts
    const fontFiles = [
        '/fonts/SpaceGrotesk-Regular.woff2',
        '/fonts/SpaceGrotesk-Bold.woff2',
    ]

    fontFiles.forEach((font) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'font'
        link.type = 'font/woff2'
        link.href = font
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
    })
}

// Lazy load images with Intersection Observer
export function lazyLoadImages() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement
                const src = img.dataset.src
                if (src) {
                    img.src = src
                    img.classList.add('loaded')
                    observer.unobserve(img)
                }
            }
        })
    })

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img)
    })
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}
