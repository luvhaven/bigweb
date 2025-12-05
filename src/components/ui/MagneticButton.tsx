'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTouchDevice } from '@/hooks/useTouchDevice'

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    strength?: number
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    strength = 30
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const isTouch = useTouchDevice()

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isTouch) return

        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current!.getBoundingClientRect()

        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)

        setPosition({ x: x * 0.5, y: y * 0.5 })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    )
}
