'use client'

import { motion, Variants } from 'framer-motion'

interface LetterRevealProps {
    text: string
    className?: string
    delay?: number
    stagger?: number
}

export default function LetterReveal({
    text,
    className = "",
    delay = 0,
    stagger = 0.05
}: LetterRevealProps) {
    const words = text.split(" ")

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay * i },
        }),
    }

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: "tween",
                ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier for smooth reveal
                duration: 0.8
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)',
            transition: {
                type: "tween",
                ease: [0.25, 0.1, 0.25, 1.0],
                duration: 0.8
            },
        },
    }

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0">
                    {Array.from(word).map((letter, i) => (
                        <motion.span key={i} variants={child} className="inline-block">
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.span>
    )
}
