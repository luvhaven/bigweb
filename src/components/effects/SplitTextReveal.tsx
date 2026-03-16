'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface SplitTextRevealProps {
    text: string
    className?: string
    wordClassName?: string
    delay?: number
    staggerChildren?: number
    threshold?: number
    once?: boolean
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
    mode?: 'slide' | 'fade' | 'rise'
}

const VARIANTS = {
    slide: {
        hidden: { y: '110%', opacity: 0 },
        visible: { y: '0%', opacity: 1 },
    },
    fade: {
        hidden: { opacity: 0, filter: 'blur(8px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
    },
    rise: {
        hidden: { y: 40, opacity: 0, rotateX: -20 },
        visible: { y: 0, opacity: 1, rotateX: 0 },
    },
}

export default function SplitTextReveal({
    text,
    className = '',
    wordClassName = '',
    delay = 0,
    staggerChildren = 0.08,
    threshold = 0.1,
    once = true,
    as: Tag = 'div',
    mode = 'slide',
}: SplitTextRevealProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref as React.RefObject<Element>, { once, amount: threshold })
    const words = text.split(' ')

    return (
        <Tag
            ref={ref as any}
            className={`overflow-hidden ${className}`}
            style={{ perspective: '1000px' }}
        >
            <motion.span
                className="inline-flex flex-wrap gap-x-[0.3em]"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{
                    visible: { transition: { staggerChildren, delayChildren: delay } },
                    hidden: {},
                }}
            >
                {words.map((word, i) => (
                    <span key={i} className="overflow-hidden inline-block">
                        <motion.span
                            className={`inline-block ${wordClassName}`}
                            variants={VARIANTS[mode]}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Tag>
    )
}
