'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const dotRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [cursorText, setCursorText] = useState('')
    const [mounted, setMounted] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    const dotSpring = { damping: 50, stiffness: 400, mass: 0.1 }
    const dotX = useSpring(mouseX, dotSpring)
    const dotY = useSpring(mouseY, dotSpring)

    useEffect(() => {
        setMounted(true)

        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const enter = (e: MouseEvent) => {
            const el = e.target as HTMLElement
            const closest = el.closest('[data-cursor]') as HTMLElement | null
            if (closest) {
                setIsHovering(true)
                setCursorText(closest.dataset.cursor || '')
            }
        }

        const leave = (e: MouseEvent) => {
            const el = e.target as HTMLElement
            if (!el.closest('[data-cursor]')) {
                setIsHovering(false)
                setCursorText('')
            }
        }

        const down = () => setIsClicking(true)
        const up = () => setIsClicking(false)

        window.addEventListener('mousemove', move)
        document.addEventListener('mouseover', enter)
        document.addEventListener('mouseout', leave)
        window.addEventListener('mousedown', down)
        window.addEventListener('mouseup', up)

        return () => {
            window.removeEventListener('mousemove', move)
            document.removeEventListener('mouseover', enter)
            document.removeEventListener('mouseout', leave)
            window.removeEventListener('mousedown', down)
            window.removeEventListener('mouseup', up)
        }
    }, [mouseX, mouseY])

    if (!mounted) return null

    return (
        <>
            {/* Outer trailing ring */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 80 : isClicking ? 28 : 40,
                        height: isHovering ? 80 : isClicking ? 28 : 40,
                        borderWidth: isHovering ? 1 : 1.5,
                        opacity: isHovering ? 0.8 : 0.6,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-full border border-white flex items-center justify-center"
                >
                    {cursorText && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-white text-[8px] font-mono font-bold uppercase tracking-widest whitespace-nowrap"
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>

            {/* Inner sharp dot */}
            <motion.div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 4 : isClicking ? 2 : 4,
                        height: isHovering ? 4 : isClicking ? 2 : 4,
                        opacity: isHovering ? 0 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                    className="rounded-full bg-white"
                />
            </motion.div>
        </>
    )
}
