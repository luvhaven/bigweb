'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Hollywood-grade settings:
    // - duration: 1.2s -> Heavier, more deliberate feel "Luxury Car suspension"
    // - easing: easeOutQuart -> Smooth deceleration
    // - smoothWheel -> true

    const lenisOptions: any = {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        normalizeWheel: false,
        infinite: false,
    }

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    )
}
