'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Native smooth scrolling is handled by CSS in index.css (html { scroll-behavior: smooth })
        // This component can be extended for more advanced smooth scrolling libraries like Lenis if needed.
        // For now, we rely on the native implementation for better performance and mobile support.
        document.documentElement.style.scrollBehavior = 'smooth'
        return () => {
            document.documentElement.style.scrollBehavior = 'auto'
        }
    }, [])

    return <>{children}</>
}
