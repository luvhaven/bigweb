'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
    value: number
    suffix?: string
    prefix?: string
    duration?: number
}

export default function AnimatedCounter({
    value,
    suffix = '',
    prefix = '',
    duration = 2
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
        duration: duration * 1000
    })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
            }
        })
    }, [springValue, prefix, suffix])

    return <span ref={ref} />
}
