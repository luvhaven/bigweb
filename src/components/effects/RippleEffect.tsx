'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
    x: number
    y: number
    id: string
}

export default function RippleEffect() {
    const [ripples, setRipples] = useState<Ripple[]>([])

    useEffect(() => {
        let isMounted = true
        const handleClick = (e: MouseEvent) => {
            if (!isMounted) return
            const newRipple: Ripple = {
                x: e.clientX,
                y: e.clientY,
                id: Date.now().toString() + Math.random()
            }

            setRipples(prev => [...prev, newRipple])

            // Remove ripple after animation
            setTimeout(() => {
                if (isMounted) {
                    setRipples(prev => prev.filter(r => r.id !== newRipple.id))
                }
            }, 800)
        }

        document.addEventListener('click', handleClick)
        return () => {
            isMounted = false
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        className="absolute rounded-full bg-accent"
                        initial={{
                            x: ripple.x,
                            y: ripple.y,
                            width: 0,
                            height: 0,
                            opacity: 0.5,
                            translateX: '-50%',
                            translateY: '-50%'
                        }}
                        animate={{
                            width: 100,
                            height: 100,
                            opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}
