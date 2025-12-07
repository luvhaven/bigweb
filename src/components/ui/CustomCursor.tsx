'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleHoverStart = () => setIsHovering(true)
        const handleHoverEnd = () => setIsHovering(false)

        window.addEventListener('mousemove', moveCursor)

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHoverStart)
            el.addEventListener('mouseleave', handleHoverEnd)
        })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart)
                el.removeEventListener('mouseleave', handleHoverEnd)
            })
        }
    }, [cursorX, cursorY, isVisible, isMounted])

    if (!isMounted) return null

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference",
                !isVisible && "opacity-0"
            )}
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: '-50%',
                y: '-50%'
            }}
        >
            <motion.div
                className={cn(
                    "w-full h-full rounded-full bg-white transition-all duration-300",
                    isHovering ? "scale-150 bg-accent mix-blend-normal opacity-50" : "scale-50 opacity-100"
                )}
            />
        </motion.div>
    )
}
