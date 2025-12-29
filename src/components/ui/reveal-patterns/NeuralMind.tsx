'use client'

import React, { useMemo } from 'react'
import { useCanvasFrame, CanvasProps } from './useCanvasFrame'

interface Node {
    x: number
    y: number
    vx: number
    vy: number
    baseX: number
    baseY: number
    radius: number
    phase: number
    active: boolean
}

const PARTICLE_COUNT = 100
const CONNECTION_DIST = 120
const MOUSE_RADIUS = 200
const SPRING_STRENGTH = 0.05
const DAMPING = 0.9

export const NeuralMind: React.FC<CanvasProps> = ({ className, themeColor = '#10b981' }) => {
    const nodes = useMemo<Node[]>(() => [], [])
    const initialized = useMemo(() => ({ current: false }), [])

    // Hex to RGB helper for glow effects
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '16, 185, 129'
    }

    const rgbColor = useMemo(() => hexToRgb(themeColor), [themeColor])

    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number }) => {
        // Init logic
        if (!initialized.current) {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const x = Math.random() * width
                const y = Math.random() * height
                nodes.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    baseX: x,
                    baseY: y,
                    radius: Math.random() * 1.5 + 1,
                    phase: Math.random() * 6.28, // For pulsing
                    active: false
                })
            }
            initialized.current = true
        }

        // Clear with trail effect for "speed" feel
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)' // Slight trail
        ctx.fillRect(0, 0, width, height)

        // Additive blending for "glowing energy" look
        ctx.globalCompositeOperation = 'lighter'

        nodes.forEach((node, i) => {
            // 1. Mouse Physics (Spring)
            const dx = mouse.x - node.x
            const dy = mouse.y - node.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            // Activate node if touched
            if (dist < MOUSE_RADIUS) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
                const angle = Math.atan2(dy, dx)
                // Pull towards mouse slightly (Gravity)
                node.vx += Math.cos(angle) * force * 0.5
                node.vy += Math.sin(angle) * force * 0.5
                node.active = true
            } else {
                node.active = false
            }

            // 2. Base Drift & Damping
            // Drift back to randomness or keep floating
            node.x += node.vx
            node.y += node.vy

            // Friction
            node.vx *= DAMPING
            node.vy *= DAMPING

            // Ambient float
            node.x += Math.cos(node.phase) * 0.1
            node.y += Math.sin(node.phase) * 0.1
            node.phase += 0.02

            // Bounce walls
            if (node.x < 0 || node.x > width) node.vx *= -1
            if (node.y < 0 || node.y > height) node.vy *= -1

            // 3. Draw Connections (Synapses)
            // Optimization: Only check half the array to reduce O(N^2)
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeB = nodes[j]
                const dx2 = node.x - nodeB.x
                const dy2 = node.y - nodeB.y
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

                if (dist2 < CONNECTION_DIST) {
                    ctx.beginPath()
                    ctx.moveTo(node.x, node.y)
                    ctx.lineTo(nodeB.x, nodeB.y)

                    // Dynamic opacity based on distance & activity
                    const alpha = (1 - dist2 / CONNECTION_DIST) * (node.active || nodeB.active ? 0.8 : 0.2)
                    ctx.strokeStyle = `rgba(${rgbColor}, ${alpha})`
                    ctx.lineWidth = node.active ? 1.5 : 0.5
                    ctx.stroke()
                }
            }

            // 4. Draw Node
            const pulse = 1 + Math.sin(node.phase) * 0.3
            const radius = node.active ? node.radius * 2 * pulse : node.radius * pulse

            ctx.beginPath()
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
            // Core
            ctx.fillStyle = `rgba(${rgbColor}, ${node.active ? 1 : 0.5})`
            ctx.fill()

            // Glow halo
            if (node.active) {
                ctx.beginPath()
                ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${rgbColor}, 0.1)`
                ctx.fill()
            }
        })

        ctx.globalCompositeOperation = 'source-over'
    }

    const canvasRef = useCanvasFrame(draw, 60)

    return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}
