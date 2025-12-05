'use client'

import React, { useState, useLayoutEffect, MouseEvent } from 'react'

interface RippleProps {
    children: React.ReactNode
    className?: string
    color?: string
    duration?: number
    onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

export default function Ripple({
    children,
    className = '',
    color = 'rgba(255, 255, 255, 0.3)',
    duration = 600,
    onClick
}: RippleProps) {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; size: number; id: number }>>([])

    useLayoutEffect(() => {
        let timeoutIds: NodeJS.Timeout[] = []

        if (ripples.length > 0) {
            const lastRipple = ripples[ripples.length - 1]
            const timeoutId = setTimeout(() => {
                setRipples((prevState) => prevState.filter((ripple) => ripple.id !== lastRipple.id))
            }, duration)
            timeoutIds.push(timeoutId)
        }

        return () => {
            timeoutIds.forEach((id) => clearTimeout(id))
        }
    }, [ripples, duration])

    const addRipple = (event: MouseEvent<HTMLDivElement>) => {
        const container = event.currentTarget.getBoundingClientRect()
        const size = Math.max(container.width, container.height)
        const x = event.clientX - container.left - size / 2
        const y = event.clientY - container.top - size / 2

        const newRipple = {
            x,
            y,
            size,
            id: Date.now(),
        }

        setRipples((prevState) => [...prevState, newRipple])
        if (onClick) onClick(event)
    }

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseDown={addRipple}
        >
            {children}
            <div className="absolute inset-0 pointer-events-none rounded-[inherit]">
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        style={{
                            top: ripple.y,
                            left: ripple.x,
                            width: ripple.size,
                            height: ripple.size,
                            backgroundColor: color,
                            animationDuration: `${duration}ms`,
                        }}
                        className="absolute rounded-full opacity-75 animate-ripple scale-0"
                    />
                ))}
            </div>
        </div>
    )
}
