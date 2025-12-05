'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
    type?: 'word' | 'char' | 'line'
}

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    type = 'word'
}: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    const words = text.split(" ")
    const chars = text.split("")

    if (type === 'char') {
        return (
            <span ref={ref} className={className}>
                {chars.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.2, 0.65, 0.3, 0.9] }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </span>
        )
    }

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 0.5, delay: delay + i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                        className="inline-block mr-[0.2em]"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}
