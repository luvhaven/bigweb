'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

/**
 * GlobalCursor — signature premium cursor used by clay.global, Akaru, etc.
 *
 * Behaviors:
 *   • Small dot (12px) that lerps toward the mouse via spring physics
 *   • Expands to 56px pill on <a>, <button> hover (magnetic feel)
 *   • Changes internal label to "View →" when hovering .ep-card (portfolio items)
 *   • Completely hidden on touch / coarse-pointer devices
 *   • Inverts/blends on light surfaces via mix-blend-mode: difference
 */
export default function GlobalCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<'default' | 'hover' | 'view' | 'drag'>('default')
    const [visible, setVisible] = useState(false)

    const rawX = useMotionValue(-100)
    const rawY = useMotionValue(-100)

    const x = useSpring(rawX, { stiffness: 500, damping: 38, mass: 0.4 })
    const y = useSpring(rawY, { stiffness: 500, damping: 38, mass: 0.4 })

    useEffect(() => {
        // Hide on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return

        const move = (e: MouseEvent) => {
            rawX.set(e.clientX)
            rawY.set(e.clientY)
            if (!visible) setVisible(true)
        }

        const enter = (e: MouseEvent) => {
            const t = e.target as HTMLElement
            if (t.closest('.ep-card')) {
                setState('view')
            } else if (t.closest('a, button, [role="button"], label')) {
                setState('hover')
            }
        }

        const leave = (e: MouseEvent) => {
            const t = e.relatedTarget as HTMLElement | null
            if (!t || (!t.closest('.ep-card') && !t.closest('a, button, [role="button"], label'))) {
                setState('default')
            }
        }

        window.addEventListener('mousemove', move, { passive: true })
        document.addEventListener('mouseover', enter)
        document.addEventListener('mouseout', leave)
        document.addEventListener('mouseleave', () => setVisible(false))
        document.addEventListener('mouseenter', () => setVisible(true))

        return () => {
            window.removeEventListener('mousemove', move)
            document.removeEventListener('mouseover', enter)
            document.removeEventListener('mouseout', leave)
        }
    }, [rawX, rawY, visible])

    // Hide cursor natively when our custom one is active
    useEffect(() => {
        if (visible) {
            document.documentElement.style.cursor = 'none'
        } else {
            document.documentElement.style.cursor = ''
        }
        return () => { document.documentElement.style.cursor = '' }
    }, [visible])

    const isExpanded = state === 'hover' || state === 'view'

    return (
        <motion.div
            ref={cursorRef}
            className="pointer-events-none fixed z-[9999] top-0 left-0"
            style={{ x, y }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ opacity: { duration: 0.2 } }}
        >
            {/* Cursor body — shifts by -50% to center on mouse */}
            <motion.div
                className="relative flex items-center justify-center rounded-full mix-blend-difference"
                animate={{
                    width: state === 'view' ? 90 : isExpanded ? 56 : 12,
                    height: state === 'view' ? 90 : isExpanded ? 56 : 12,
                    x: state === 'view' ? -45 : isExpanded ? -28 : -6,
                    y: state === 'view' ? -45 : isExpanded ? -28 : -6,
                    backgroundColor: state === 'default' ? '#ffffff' : 'hsl(38 56% 52%)',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.6 }}
            >
                <AnimatePresence mode="wait">
                    {state === 'view' && (
                        <motion.span
                            key="view-label"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.18 }}
                            className="text-[10px] font-bold tracking-wide text-black whitespace-nowrap"
                        >
                            View →
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Trailing ring — appears on hover */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key="ring"
                        className="absolute top-1/2 left-1/2 rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        initial={{ width: 56, height: 56, opacity: 0 }}
                        animate={{ width: state === 'view' ? 110 : 72, height: state === 'view' ? 110 : 72, opacity: 0.3 }}
                        exit={{ width: 12, height: 12, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}
