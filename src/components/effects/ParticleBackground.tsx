'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        let mouseX = 0
        let mouseY = 0

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles()
        }

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string
            originalX: number
            originalY: number

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.originalX = this.x
                this.originalY = this.y
                this.size = Math.random() * 2 + 0.5
                this.speedX = Math.random() * 0.5 - 0.25
                this.speedY = Math.random() * 0.5 - 0.25
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                // Mouse interaction
                const dx = mouseX - this.x
                const dy = mouseY - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const maxDistance = 100

                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (maxDistance - distance) / maxDistance
                    const directionX = forceDirectionX * force * 2
                    const directionY = forceDirectionY * force * 2

                    this.x -= directionX
                    this.y -= directionY
                } else {
                    if (this.x !== this.originalX) {
                        const dx = this.x - this.originalX
                        this.x -= dx * 0.02
                    }
                    if (this.y !== this.originalY) {
                        const dy = this.y - this.originalY
                        this.y -= dy * 0.02
                    }
                }

                if (this.x > canvas!.width) this.x = 0
                if (this.x < 0) this.x = canvas!.width
                if (this.y > canvas!.height) this.y = 0
                if (this.y < 0) this.y = canvas!.height
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const initParticles = () => {
            particles = []
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000)
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.x
            mouseY = e.y
        }

        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('mousemove', handleMouseMove)

        resizeCanvas()
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    )
}
