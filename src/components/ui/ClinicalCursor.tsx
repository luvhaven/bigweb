'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function ClinicalCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 } // Tight, clinical snap
    const springX = useSpring(cursorX, springConfig)
    const springY = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const checkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Hueristic: Check if element is clickable or has pointer cursor
            if (
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', checkHover)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', checkHover)
        }
    }, [cursorX, cursorY])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference border border-white hidden md:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovering ? 1.5 : 1
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* Reticle Crosshair */}
                <div className="absolute top-1/2 left-1/2 w-[1px] h-full bg-white/50 -translate-x-1/2 -translate-y-1/2 scale-y-50" />
                <div className="absolute top-1/2 left-1/2 h-[1px] w-full bg-white/50 -translate-x-1/2 -translate-y-1/2 scale-x-50" />
            </motion.div>

            {/* Secondary trailing dot */}
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 bg-orange-500 rounded-full pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
        </>
    )
}
