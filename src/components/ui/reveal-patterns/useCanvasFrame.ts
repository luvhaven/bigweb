'use client'

import { useEffect, useRef } from 'react'

export interface CanvasProps {
    className?: string
    themeColor?: string
}

export const useCanvasFrame = (
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, vx: number, vy: number }) => void,
    fps: number = 60
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let lastTime = 0
        const interval = 1000 / fps

        // Resize handler
        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth
                canvas.height = canvas.parentElement.clientHeight
            }
        }
        window.addEventListener('resize', resize)
        resize()

        // Mouse Tracker
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            const newX = e.clientX - rect.left
            const newY = e.clientY - rect.top

            // Calculate velocity
            mouseRef.current.vx = newX - mouseRef.current.x
            mouseRef.current.vy = newY - mouseRef.current.y
            mouseRef.current.x = newX
            mouseRef.current.y = newY
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Animation Loop
        const render = (time: number) => {
            const deltaTime = time - lastTime

            if (deltaTime > interval) {
                lastTime = time - (deltaTime % interval)
                draw(ctx, canvas.width, canvas.height, mouseRef.current)

                // Decay velocity
                mouseRef.current.vx *= 0.9
                mouseRef.current.vy *= 0.9
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render(0)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [draw, fps])

    return canvasRef
}
