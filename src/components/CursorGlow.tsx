'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
}

export default function CursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isOverLink, setIsOverLink] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isTouch, setIsTouch] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 25, stiffness: 700 }
  const trailConfig = { damping: 30, stiffness: 400 }

  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const trailXSpring = useSpring(cursorX, trailConfig)
  const trailYSpring = useSpring(cursorY, trailConfig)

  useEffect(() => {
    // Check for touch devices
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)

    let rippleId = 0

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      if (!isVisible) setIsVisible(true)

      // Check if hovering over a link or button
      const target = e.target as HTMLElement
      const isLink = target.closest('a, button, [role="button"], [data-clickable="true"]')
      setIsOverLink(!!isLink)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest('a, button, [role="button"], [data-clickable="true"]')

      // Only create ripple on link clicks
      if (isLink) {
        const newRipple: Ripple = {
          id: rippleId++,
          x: e.clientX,
          y: e.clientY,
        }

        setRipples(prev => [...prev, newRipple])

        // Remove ripple after animation completes
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id))
        }, 1000)
      }
    }

    const handleMouseDown = () => {
      document.body.classList.add('cursor-clicking')
    }

    const handleMouseUp = () => {
      document.body.classList.remove('cursor-clicking')
    }

    if (isTouch) return

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('click', handleClick)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor glow - only visible when over links */}
      <AnimatePresence>
        {isOverLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
              background: 'radial-gradient(circle, rgba(245, 85, 39, 0.6) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Large ambient glow - only visible when over links */}
      <AnimatePresence>
        {isOverLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed w-64 h-64 rounded-full pointer-events-none z-[9998] mix-blend-screen hidden md:block"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
              x: '-50%',
              y: '-50%',
              background: 'radial-gradient(circle, rgba(245, 85, 39, 0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Click ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed rounded-full pointer-events-none z-[9997] hidden md:block"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
            }}
            initial={{
              width: 20,
              height: 20,
              opacity: 0.8,
            }}
            animate={{
              width: 200,
              height: 200,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
          >
            {/* Outer ripple ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'transparent',
                border: '3px solid rgba(245, 85, 39, 0.6)',
                boxShadow: '0 0 20px rgba(245, 85, 39, 0.4)',
              }}
            />
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(245, 85, 39, 0.4) 0%, transparent 60%)',
                filter: 'blur(10px)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
