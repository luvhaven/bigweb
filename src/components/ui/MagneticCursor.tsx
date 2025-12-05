'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTouchDevice } from '@/hooks/useTouchDevice'

export default function MagneticCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const isTouch = useTouchDevice()

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        if (isTouch) return

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseDown = () => {
            document.body.classList.add('cursor-clicking')
        }

        const handleMouseUp = () => {
            document.body.classList.remove('cursor-clicking')
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [cursorX, cursorY, isTouch, isVisible])

    if (isTouch) return null

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm" />
        </motion.div>
    )
}
