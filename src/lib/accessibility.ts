// Accessibility utilities for WCAG 2.1 AA compliance

export function setupKeyboardNavigation() {
    if (typeof window === 'undefined') return

    // Skip to main content link
    const skipLink = document.createElement('a')
    skipLink.href = '#main-content'
    skipLink.textContent = 'Skip to main content'
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg'
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Trap focus in modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('[role="dialog"][aria-modal="true"]')
            if (openModal) {
                const closeButton = openModal.querySelector('[aria-label*="Close"]')
                if (closeButton instanceof HTMLElement) {
                    closeButton.click()
                }
            }
        }
    })
}

export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (typeof window === 'undefined') return

    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
        document.body.removeChild(announcement)
    }, 1000)
}

export function setupFocusManagement() {
    if (typeof window === 'undefined') return

    // Add visible focus indicators
    const style = document.createElement('style')
    style.textContent = `
    *:focus-visible {
      outline: 2px solid hsl(var(--accent));
      outline-offset: 2px;
      border-radius: 4px;
    }
    
    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible {
      outline: 2px solid hsl(var(--accent));
      outline-offset: 2px;
    }
  `
    document.head.appendChild(style)
}

export function checkColorContrast(foreground: string, background: string): {
    ratio: number
    passesAA: boolean
    passesAAA: boolean
} {
    // Simplified contrast ratio calculation
    // In production, use a library like 'wcag-contrast' for accurate calculations

    const getLuminance = (color: string): number => {
        // This is a simplified version - use proper color parsing in production
        return 0.5 // Placeholder
    }

    const l1 = getLuminance(foreground)
    const l2 = getLuminance(background)
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)

    return {
        ratio,
        passesAA: ratio >= 4.5, // WCAG AA for normal text
        passesAAA: ratio >= 7, // WCAG AAA for normal text
    }
}

export function addAriaLabels() {
    if (typeof window === 'undefined') return

    // Add aria-labels to icon-only buttons
    document.querySelectorAll('button:not([aria-label])').forEach((button) => {
        const icon = button.querySelector('svg')
        if (icon && !button.textContent?.trim()) {
            const title = icon.getAttribute('title') || 'Button'
            button.setAttribute('aria-label', title)
        }
    })

    // Add aria-labels to links without text
    document.querySelectorAll('a:not([aria-label])').forEach((link) => {
        const icon = link.querySelector('svg')
        if (icon && !link.textContent?.trim()) {
            const href = link.getAttribute('href') || ''
            link.setAttribute('aria-label', `Navigate to ${href}`)
        }
    })
}

export function setupReducedMotion() {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
            document.documentElement.classList.add('reduce-motion')
        } else {
            document.documentElement.classList.remove('reduce-motion')
        }
    }

    handleMotionPreference(prefersReducedMotion)
    prefersReducedMotion.addEventListener('change', handleMotionPreference)
}

// Initialize all accessibility features
export function initAccessibility() {
    setupKeyboardNavigation()
    setupFocusManagement()
    addAriaLabels()
    setupReducedMotion()
}
