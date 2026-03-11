'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import gsap from 'gsap'
import CurtainWipe from './CurtainWipe'

interface PageTransitionProps {
    children: ReactNode
    pathname: string
}

type TransitionType = 'block' | 'circular' | 'flip' | 'wipe' | 'fade' | 'liquid'

// Route-based transition mapping
function getTransitionType(pathname: string): TransitionType {
    if (pathname === '/') return 'liquid'
    if (pathname.startsWith('/case-studies') && pathname !== '/case-studies') return 'flip'
    if (pathname === '/about') return 'circular'
    if (pathname.startsWith('/services')) return 'liquid'
    if (pathname === '/contact') return 'fade'
    return 'block'
}

export default function PageTransition({ children, pathname }: PageTransitionProps) {
    const [isExiting, setIsExiting] = useState(false)
    const [displayChildren, setDisplayChildren] = useState(children)
    const prevPathname = useRef(pathname)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (pathname !== prevPathname.current) {
            const newTransitionType = getTransitionType(pathname)
            setIsExiting(true)

            const transitionDuration = 900

            const timer = setTimeout(() => {
                setDisplayChildren(children)
                setIsExiting(false)
                prevPathname.current = pathname

                if (contentRef.current) {
                    gsap.fromTo(
                        contentRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'transform' }
                    )
                }

                window.scrollTo({ top: 0, behavior: 'instant' })
            }, transitionDuration)

            return () => clearTimeout(timer)
        } else {
            setDisplayChildren(children)
        }
    }, [pathname, children])

    const renderTransition = () => {
        if (!isExiting) return null

        return <CurtainWipe direction="in" onComplete={() => { }} />
    }

    return (
        <>
            {renderTransition()}
            <div ref={contentRef}>{displayChildren}</div>
        </>
    )
}
