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
    const isInView = useInView(ref, { once: true, margin: "0px" })

    const words = text.split(" ")

    if (type === 'char') {
        return (
            <span ref={ref} className={className}>
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                key={`${wordIndex}-${charIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: delay + (wordIndex * 5 + charIndex) * 0.03, // Adjusted delay for smoother flow
                                    ease: [0.2, 0.65, 0.3, 0.9]
                                }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </span>
        )
    }

    // Simplified Reveal
    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{
                        duration: 0.8,
                        delay: delay + i * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block mr-[0.25em] whitespace-nowrap"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    )
}
