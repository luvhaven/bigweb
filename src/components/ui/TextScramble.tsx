'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TextScrambleProps {
    children: string
    className?: string
    scrambleSpeed?: number
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?'

export default function TextScramble({ children, className, scrambleSpeed = 30 }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children)
    const isHovering = useRef(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const scramble = () => {
        let iteration = 0

        if (intervalRef.current) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                children
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return children[index]
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)]
                    })
                    .join('')
            )

            if (iteration >= children.length) {
                if (intervalRef.current) clearInterval(intervalRef.current)
            }

            iteration += 1 / 3
        }, scrambleSpeed)
    }

    const handleMouseEnter = () => {
        isHovering.current = true
        scramble()
    }

    const handleMouseLeave = () => {
        isHovering.current = false
        // Optional: could scramble back or just reset? 
        // Usually decoding on hover-start is enough.
        // Let's ensure it resolves if they leave quickly.
    }

    useEffect(() => {
        // Cleanup
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    return (
        <span
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {displayText}
        </span>
    )
}
