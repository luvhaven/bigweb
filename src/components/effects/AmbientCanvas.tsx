'use client'

import { useEffect, useRef } from 'react'

interface AmbientCanvasProps {
  /** Number of floating particles */
  particleCount?: number
  /** Show subtle dot grid */
  grid?: boolean
  /** Orb color in hex, defaults to accent gold */
  orbColor?: string
  className?: string
}

export default function AmbientCanvas({
  particleCount = 40,
  grid = true,
  orbColor = 'rgba(212,168,83,',
  className = '',
}: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let W = 0, H = 0

    // ── Responsive resize ──
    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // ── Particles ──
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.3 + 0.05,
    }))

    // ── Slow drifting orbs ──
    const orbs = [
      { x: 0.2, y: 0.25, r: 0.35, t: 0, speed: 0.0003, alpha: 0.045 },
      { x: 0.8, y: 0.7,  r: 0.28, t: Math.PI, speed: 0.00025, alpha: 0.04 },
      { x: 0.55, y: 0.45, r: 0.2, t: 1, speed: 0.0004, alpha: 0.025 },
    ]

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // ─ Dot grid ─
      if (grid) {
        const step = 44
        ctx.fillStyle = 'rgba(255,255,255,0.04)'
        for (let gx = step / 2; gx < W; gx += step) {
          for (let gy = step / 2; gy < H; gy += step) {
            ctx.beginPath()
            ctx.arc(gx, gy, 0.75, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // ─ Orbs ─
      orbs.forEach((o) => {
        o.t += o.speed
        const ox = (o.x + Math.sin(o.t) * 0.08) * W
        const oy = (o.y + Math.cos(o.t * 1.3) * 0.06) * H
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r * Math.min(W, H))
        grad.addColorStop(0, `${orbColor}${o.alpha})`)
        grad.addColorStop(1, `${orbColor}0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(ox, oy, o.r * Math.min(W, H), 0, Math.PI * 2)
        ctx.fill()
      })

      // ─ Particles ─
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
        ctx.fill()
      })

      // ─ Particle connections ─
      if (frame % 2 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 120) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(212,168,83,${0.04 * (1 - dist / 120)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [particleCount, grid, orbColor])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
