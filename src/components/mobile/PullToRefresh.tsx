'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PullToRefresh({ children }: { children: React.ReactNode }) {
    const [startY, setStartY] = useState(0)
    const [pulling, setPulling] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [pullDistance, setPullDistance] = useState(0)
    const router = useRouter()
    const controls = useAnimation()
    const containerRef = useRef<HTMLDivElement>(null)

    const THRESHOLD = 80

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY === 0) {
                setStartY(e.touches[0].clientY)
                setPulling(true)
            }
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (!pulling) return
            const y = e.touches[0].clientY
            const diff = y - startY

            if (diff > 0 && window.scrollY === 0) {
                // Resistance effect
                const distance = Math.min(diff * 0.5, THRESHOLD * 1.5)
                setPullDistance(distance)
                controls.set({ y: distance })

                if (e.cancelable) e.preventDefault()
            }
        }

        const handleTouchEnd = async () => {
            if (!pulling) return
            setPulling(false)

            if (pullDistance > THRESHOLD) {
                setRefreshing(true)
                controls.start({ y: THRESHOLD })

                // Simulate refresh
                await new Promise(resolve => setTimeout(resolve, 1500))
                router.refresh()

                setRefreshing(false)
                setPullDistance(0)
                controls.start({ y: 0 })
            } else {
                setPullDistance(0)
                controls.start({ y: 0 })
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('touchstart', handleTouchStart)
            container.addEventListener('touchmove', handleTouchMove, { passive: false })
            container.addEventListener('touchend', handleTouchEnd)
        }

        return () => {
            if (container) {
                container.removeEventListener('touchstart', handleTouchStart)
                container.removeEventListener('touchmove', handleTouchMove)
                container.removeEventListener('touchend', handleTouchEnd)
            }
        }
    }, [pulling, startY, pullDistance, controls, router])

    return (
        <div ref={containerRef} className="relative min-h-screen">
            <div className="absolute top-0 left-0 right-0 flex justify-center pt-4 pointer-events-none">
                <motion.div
                    animate={{ rotate: refreshing ? 360 : pullDistance * 2 }}
                    transition={{ duration: refreshing ? 1 : 0, repeat: refreshing ? Infinity : 0, ease: "linear" }}
                    style={{ opacity: Math.min(pullDistance / THRESHOLD, 1) }}
                >
                    <Loader2 className="w-6 h-6 text-accent" />
                </motion.div>
            </div>

            <motion.div animate={controls} className="relative bg-background">
                {children}
            </motion.div>
        </div>
    )
}
