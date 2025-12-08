'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Mouse position
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Smooth spring physics
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
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

        const handleMouseDown = () => setIsActive(true)
        const handleMouseUp = () => setIsActive(false)
        const handleHoverStart = () => setIsHovering(true)
        const handleHoverEnd = () => setIsHovering(false)

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        // Add hover listeners to interactive elements
        const interactiveSelectors = 'a, button, input, textarea, [role="button"], .cursor-hover'
        const interactiveElements = document.querySelectorAll(interactiveSelectors)

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHoverStart)
            el.addEventListener('mouseleave', handleHoverEnd)
        })

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newElements = document.querySelectorAll(interactiveSelectors)
                    newElements.forEach(el => {
                        el.removeEventListener('mouseenter', handleHoverStart)
                        el.removeEventListener('mouseleave', handleHoverEnd)
                        el.addEventListener('mouseenter', handleHoverStart)
                        el.addEventListener('mouseleave', handleHoverEnd)
                    })
                }
            })
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            observer.disconnect()

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
                "fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference",
                !isVisible && "opacity-0"
            )}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: '-50%',
                translateY: '-50%'
            }}
        >
            {/* Core Dot (Digital Pulse Center) */}
            <motion.div
                className={cn(
                    "relative flex items-center justify-center",
                )}
            >
                {/* Main Cursor Dot */}
                <motion.div
                    className={cn(
                        "w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(249,115,22,0.8)]",
                        isHovering ? "w-2 h-2" : "w-2 h-2"
                    )}
                    animate={{
                        scale: isHovering ? 0.5 : 1,
                    }}
                />

                {/* Outer Ring (Pulse Effect) */}
                <motion.div
                    className="absolute border border-accent rounded-full opacity-50"
                    animate={{
                        width: isHovering ? 48 : 24,
                        height: isHovering ? 48 : 24,
                        borderColor: isHovering ? "rgba(249,115,22, 0.8)" : "rgba(249,115,22, 0.3)",
                        borderWidth: isHovering ? 2 : 1,
                        scale: isActive ? 0.8 : 1
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }}
                />

                {/* Digital Crosshair / Decoration */}
                <AnimatePresence>
                    {isHovering && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 90 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute w-full h-[1px] bg-accent/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute h-full w-[1px] bg-accent/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12"
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
