'use client'

import React, { useMemo } from 'react'
import { useCanvasFrame, CanvasProps } from './useCanvasFrame'

interface Column {
    x: number
    y: number
    speed: number
    chars: string[]
    lastUpdate: number
}

const FONT_SIZE = 14
const CHARACTERS = '0101010101XYZAOB'

export const AliveData: React.FC<CanvasProps> = ({ className, themeColor = '#10b981' }) => {
    const columns = useMemo<Column[]>(() => [], [])
    const initialized = useMemo(() => ({ current: false }), [])

    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number }) => {
        if (!initialized.current) {
            const colCount = Math.floor(width / FONT_SIZE)
            for (let i = 0; i < colCount; i++) {
                columns.push({
                    x: i * FONT_SIZE,
                    y: Math.random() * -height, // Start above
                    speed: 1 + Math.random() * 2,
                    chars: [], // Will generate on fly
                    lastUpdate: 0
                })
            }
            initialized.current = true
        }

        // Fade background (Trail effect)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.fillRect(0, 0, width, height)

        ctx.font = `${FONT_SIZE}px monospace`

        columns.forEach(col => {
            // Mouse Interaction: "Decoder" 
            // If mouse is near, slow down and glow
            const dx = mouse.x - col.x
            // Check robustly if mouse is within vertical column roughly
            const dist = Math.abs(dx)
            const isHovered = dist < 50

            if (isHovered) {
                ctx.fillStyle = '#ffffff' // Glow white
                // col.y += col.speed * 0.2 // Slow motion
            } else {
                ctx.fillStyle = themeColor
                // col.y += col.speed
            }

            // Draw character
            const char = CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
            ctx.fillText(char, col.x, col.y)

            // Reset if bottom reached
            if (col.y > height && Math.random() > 0.98) {
                col.y = 0
            }

            // Move
            col.y += isHovered ? col.speed * 0.5 : col.speed
        })
    }

    const canvasRef = useCanvasFrame(draw, 30) // 30 FPS for matrix feel

    return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}
