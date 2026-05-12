'use client'

import React, { useMemo } from 'react'
import { useCanvasFrame, CanvasProps } from './useCanvasFrame'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    life: number
    maxLife: number
    colorOffset: number
}

const PARTICLE_COUNT = 400 // Dense "liquid" feel
const FLOW_SCALE = 0.01

export const RevenueFlow: React.FC<CanvasProps> = ({ className, themeColor = '#f59e0b' }) => {
    const particles = useMemo<Particle[]>(() => [], [])
    const initialized = useMemo(() => ({ current: false }), [])

    // Simple Perlin-ish noise for flow field direction (pseudo-random deterministic)
    const noise = (x: number, y: number) => {
        return Math.sin(x) * Math.cos(y)
    }

    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number, y: number, vx: number, vy: number }) => {
        if (!initialized.current) {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle(width, height))
            }
            initialized.current = true
        }

        // Fast fade for fluid trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.fillRect(0, 0, width, height)

        // Additive blending for "Golden Liquid" shine
        ctx.globalCompositeOperation = 'lighter'

        particles.forEach(p => {
            // 1. Flow Field Physics
            // Calculate angle based on position (Flow Field)
            const angle = noise(p.x * FLOW_SCALE, p.y * FLOW_SCALE) * Math.PI * 4

            // Apply flow force
            p.vx += Math.cos(angle) * 0.1
            p.vy += Math.sin(angle) * 0.1 - 0.2 // Built-in Upward drift (Revenue Growth)

            // 2. Mouse Turbulence
            // If mouse moves fast, create a "wake"
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 150) {
                const force = (150 - dist) / 150
                // Push away from mouse (Displacement)
                p.vx += (dx / dist) * force * 2
                p.vy += (dy / dist) * force * 2

                // Add mouse velocity influence (Drag)
                p.vx += mouse.vx * 0.1
                p.vy += mouse.vy * 0.1
            }

            // 3. Update Position & Friction
            p.x += p.vx
            p.y += p.vy
            p.vx *= 0.95 // Friction
            p.vy *= 0.95

            // 4. Wrap / Respawn
            if (p.x < 0) p.x = width
            if (p.x > width) p.x = 0
            if (p.y < 0) p.y = height
            if (p.y > height) {
                p.y = 0
                p.x = Math.random() * width
            }

            // 5. Draw
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
            const size = p.size * (1 + speed * 0.5) // Stretch based on speed

            ctx.beginPath()
            // Shift color slightly for richness (Gold -> Orange -> White)
            // Assuming themeColor is hex, we just use it as base. 
            // Ideally we'd parse it, but for simplicity/performance we overlay white
            ctx.fillStyle = themeColor

            // Draw diamond/shard shape for "Value/Gem" feel
            ctx.moveTo(p.x, p.y - size)
            ctx.lineTo(p.x + size * 0.6, p.y)
            ctx.lineTo(p.x, p.y + size)
            ctx.lineTo(p.x - size * 0.6, p.y)
            ctx.fill()

            // Highlight glint
            if (speed > 2) {
                ctx.fillStyle = '#ffffff'
                ctx.globalAlpha = 0.5
                ctx.fill()
                ctx.globalAlpha = 1
            }
        })

        ctx.globalCompositeOperation = 'source-over'
    }

    const createParticle = (w: number, h: number): Particle => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
        life: Math.random() * 100,
        maxLife: 100,
        colorOffset: Math.random()
    })

    const canvasRef = useCanvasFrame(draw, 60)

    return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}
