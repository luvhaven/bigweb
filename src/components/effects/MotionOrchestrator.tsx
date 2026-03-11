'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface MotionOrchestratorProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    baseDelay?: number
    animateOnce?: boolean
    as?: any
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (custom: any) => ({
        opacity: 1,
        transition: {
            staggerChildren: custom.staggerDelay,
            delayChildren: custom.baseDelay,
        }
    })
}

// Pre-defined rich choreographies
export const MotionItemVariants: Record<string, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    },
    blurReveal: {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    }
}

export default function MotionOrchestrator({
    children,
    className = "",
    staggerDelay = 0.1,
    baseDelay = 0,
    animateOnce = true,
    as: Component = motion.div
}: MotionOrchestratorProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: animateOnce, margin: "-10% 0px" })

    return (
        <Component
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={{ staggerDelay, baseDelay }}
            className={className}
        >
            {children}
        </Component>
    )
}

export function MotionItem({
    children,
    className = "",
    variant = "fadeUp"
}: {
    children: ReactNode,
    className?: string,
    variant?: keyof typeof MotionItemVariants
}) {
    return (
        <motion.div variants={MotionItemVariants[variant]} className={className}>
            {children}
        </motion.div>
    )
}
