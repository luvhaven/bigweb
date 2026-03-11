'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const auraRef = useRef<HTMLDivElement>(null)

    const [isVisible, setIsVisible] = useState(false)
    const [hoverText, setHoverText] = useState<string | null>(null)
    const pos = useRef({ x: 0, y: 0 })
    const vel = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (typeof window === 'undefined') return

        const cursor = cursorRef.current
        const dot = dotRef.current
        const ring = ringRef.current
        const aura = auraRef.current

        if (!cursor || !dot || !ring || !aura) return

        gsap.set(cursor, { opacity: 0 })

        const moveCursor = (e: MouseEvent) => {
            setIsVisible(true)

            // Calculate velocity for stretching
            const dx = e.clientX - pos.current.x
            const dy = e.clientY - pos.current.y

            pos.current.x = e.clientX
            pos.current.y = e.clientY

            vel.current.x = dx
            vel.current.y = dy

            const angle = Math.atan2(dy, dx) * (180 / Math.PI)
            const speed = Math.sqrt(dx * dx + dy * dy)
            const stretch = Math.min(speed / 10, 1.5)

            // Stretch dot based on movement
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                rotation: angle,
                scaleX: 1 + stretch,
                scaleY: 1 - stretch * 0.5,
                duration: 0.15,
                ease: 'power2.out',
            })

            // Elastic ring
            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.45,
                ease: 'expo.out',
            })

            gsap.to(aura, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'power2.out',
            })

            gsap.to(cursor, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        }

        const handleMouseDown = () => {
            gsap.to(ring, { scale: 0.6, duration: 0.2, ease: 'power2.out' })
            gsap.to(dot, { scale: 1.5, duration: 0.2, ease: 'back.out(2)' })
        }

        const handleMouseUp = () => {
            gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' })
            gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
        }

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLElement
            const label = target.getAttribute('data-cursor-label') ||
                (target.tagName === 'A' ? 'GO' :
                    target.tagName === 'BUTTON' ? 'CLICK' : null)

            setHoverText(label)

            // Snapping logic
            const rect = target.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            // Expand and Snap
            gsap.to(ring, {
                width: rect.width + 20,
                height: rect.height + 20,
                x: centerX,
                y: centerY,
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255, 0.1)',
                borderColor: 'rgba(255,255,255, 0.8)',
                duration: 0.4,
                ease: 'expo.out',
                overwrite: true
            })

            gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 })
            gsap.to(aura, { opacity: 0.4, scale: 1.5, duration: 0.4, filter: 'blur(40px)' })
        }

        const handleHoverEnd = () => {
            setHoverText(null)

            gsap.to(ring, {
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255, 0.4)',
                duration: 0.5,
                ease: 'elastic.out(1, 0.6)',
                overwrite: true
            })

            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 })
            gsap.to(aura, { opacity: 0, scale: 0.8, duration: 0.4 })
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        const interactiveSelectors = 'a, button, .cursor-hover'
        const attachListeners = () => {
            const elements = document.querySelectorAll(interactiveSelectors)
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart as any)
                el.addEventListener('mouseleave', handleHoverEnd)
            })
        }

        attachListeners()
        const observer = new MutationObserver(attachListeners)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            observer.disconnect()
        }
    }, [])

    return (
        <div ref={cursorRef} className={cn("fixed inset-0 pointer-events-none z-[10000] opacity-0 transition-opacity duration-500 mix-blend-difference", !isVisible && "hidden")}>
            <div
                ref={auraRef}
                className="fixed top-0 left-0 w-[150px] h-[150px] bg-white rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 opacity-0"
            />

            <div
                ref={ringRef}
                className="fixed top-0 left-0 border border-white/40 rounded-full flex items-center justify-center overflow-hidden origin-top-left"
                style={{ width: 28, height: 28, pointerEvents: 'none' }}
            >
                {hoverText && (
                    <span
                        ref={labelRef}
                        className="text-[9px] font-black tracking-[0.3em] text-[#050505] uppercase animate-pulse"
                    >
                        {hoverText}
                    </span>
                )}
            </div>

            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white origin-top-left"
                style={{ boxShadow: '0 0 15px rgba(255,255,255,0.6)' }}
            />
        </div>
    )
}
