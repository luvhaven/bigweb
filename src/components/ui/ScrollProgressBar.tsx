'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
    const [isVisible, setIsVisible] = useState(false)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        const handleScroll = () => {
            // Show progress bar after scrolling past hero (e.g., 100vh)
            setIsVisible(window.scrollY > window.innerHeight * 0.5)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!isVisible) return null

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-accent/20 z-[9998] origin-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="h-full bg-gradient-to-r from-accent via-accent-dark to-accent"
                style={{ scaleX }}
            />
        </motion.div>
    )
}
