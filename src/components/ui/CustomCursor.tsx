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

    // Smooth spring physics for the main dot
    const dotConfig = { damping: 30, stiffness: 600, mass: 0.1 }
    const dotX = useSpring(cursorX, dotConfig)
    const dotY = useSpring(cursorY, dotConfig)

    // Elastic physics for the outer ring (lagging effect)
    const ringConfig = { damping: 20, stiffness: 100, mass: 0.8 }
    const ringX = useSpring(cursorX, ringConfig)
    const ringY = useSpring(cursorY, ringConfig)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const [hoverText, setHoverText] = useState<string | null>(null)

    useEffect(() => {
        if (!isMounted) return

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseDown = () => setIsActive(true)
        const handleMouseUp = () => setIsActive(false)

        const handleHoverStart = (e: MouseEvent) => {
            setIsHovering(true)
            const target = e.currentTarget as HTMLElement
            const label = target.getAttribute('data-cursor-label') ||
                (target.tagName === 'A' ? 'GO' :
                    target.tagName === 'BUTTON' ? 'CLICK' : null)
            setHoverText(label)
        }

        const handleHoverEnd = () => {
            setIsHovering(false)
            setHoverText(null)
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        const interactiveSelectors = 'a, button, input, textarea, [role="button"], .cursor-hover'

        const attachListeners = () => {
            const elements = document.querySelectorAll(interactiveSelectors)
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart as any)
                el.addEventListener('mouseleave', handleHoverEnd)
            })
        }

        attachListeners()

        const observer = new MutationObserver(() => {
            attachListeners()
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            observer.disconnect()
        }
    }, [cursorX, cursorY, isVisible, isMounted])

    if (!isMounted) return null

    return (
        <div className={cn("fixed inset-0 pointer-events-none z-[9999]", !isVisible && "hidden")}>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent z-20"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    boxShadow: '0 0 15px rgba(255,107,53,0.8)'
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1
                }}
            />

            {/* Trailing Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 border border-accent rounded-full z-10 box-border"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovering ? 80 : 30,
                    height: isHovering ? 80 : 30,
                    backgroundColor: isHovering ? "rgba(255,107,53,0.05)" : "transparent",
                    borderColor: isHovering ? "rgba(255,107,53, 0.8)" : "rgba(255,107,53, 0.3)",
                    borderWidth: isHovering ? 2 : 1,
                    scale: isActive ? 0.9 : 1
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                {/* Text Label inside ring */}
                <AnimatePresence>
                    {hoverText && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center text-[10px] font-black tracking-[0.2em] text-accent uppercase"
                        >
                            {hoverText}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Interaction Glow */}
            <motion.div
                className="fixed top-0 left-0 w-[150px] h-[150px] bg-accent/10 rounded-full blur-[40px] -z-10"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: isHovering ? 0.3 : 0,
                    scale: isHovering ? 1.5 : 1
                }}
            />
        </div>
    )
}
