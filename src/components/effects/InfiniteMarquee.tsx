'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'

interface MarqueeProps {
    items: string[]
    speed?: number
    direction?: 'left' | 'right'
    separator?: string
    className?: string
    itemClassName?: string
    pauseOnHover?: boolean
}

export function InfiniteMarquee({
    items,
    speed = 40,
    direction = 'left',
    separator = '✦',
    className = '',
    itemClassName = '',
    pauseOnHover = true,
}: MarqueeProps) {
    const baseX = useMotionValue(0)
    const [isPaused, setIsPaused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [contentWidth, setContentWidth] = useState(0)

    useEffect(() => {
        const el = containerRef.current?.querySelector('.marquee-track') as HTMLElement
        if (el) setContentWidth(el.offsetWidth / 2)
    }, [items])

    useAnimationFrame((_, delta) => {
        if (isPaused || contentWidth === 0) return
        const moveBy = (direction === 'left' ? -1 : 1) * speed * (delta / 1000)
        let next = baseX.get() + moveBy
        if (direction === 'left' && next <= -contentWidth) next += contentWidth
        if (direction === 'right' && next >= 0) next -= contentWidth
        baseX.set(next)
    })

    const doubled = [...items, ...items]

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden ${className}`}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                style={{ x: baseX }}
                className="flex whitespace-nowrap will-change-transform marquee-track"
            >
                {doubled.map((item, i) => (
                    <span key={i} className={`inline-flex items-center gap-8 ${itemClassName}`}>
                        <span className="leading-none">{item}</span>
                        <span className="text-accent/60 text-xs">{separator}</span>
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

export default InfiniteMarquee
