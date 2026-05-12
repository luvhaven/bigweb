'use client';

import { useEffect, useRef } from 'react';

// --- Inline value noise (no dependencies) ---
function hash(x: number, y: number): number {
  let h = ((x * 127.1 + y * 311.7) | 0) * 1664525 + 1013904223;
  h = ((h >> 16) ^ h) * 0x45d9f3b;
  h = ((h >> 16) ^ h);
  return ((h & 0x7fffffff) / 0x7fffffff);
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function noise2D(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = smoothstep(fx);
  const uy = smoothstep(fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

interface Props {
  opacity?: number;
  color?: string;
  particleCount?: number;
  speed?: number;
}

export default function NoiseField({
  opacity = 0.4,
  color = '212, 175, 106',
  particleCount = 300,
  speed = 0.0004,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let raf: number;
    let t = 0;

    const mouse = { x: -9999, y: -9999 };

    // Particles
    type Particle = { x: number; y: number; speed: number; size: number; alpha: number };
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = canvas.width = rect?.width ?? window.innerWidth;
      H = canvas.height = rect?.height ?? window.innerHeight;

      // Respawn particles on resize
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        speed: 0.6 + Math.random() * 1.0,
        size: 0.8 + Math.random() * 1.2,
        alpha: 0.3 + Math.random() * 0.5,
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = () => {
      // Fade trail — do NOT clear fully (creates flowing trails)
      ctx.fillStyle = 'rgba(8, 7, 6, 0.12)';
      ctx.fillRect(0, 0, W, H);

      t += speed;

      for (const p of particles) {
        const nx = p.x / W * 3;
        const ny = p.y / H * 3;

        // Get noise angle
        const angle = noise2D(nx + t, ny + t * 0.5) * Math.PI * 4;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulsion = dist < 120 ? ((120 - dist) / 120) * 2.5 : 0;
        const repAngle = Math.atan2(dy, dx);

        p.x += Math.cos(angle) * p.speed + Math.cos(repAngle) * repulsion;
        p.y += Math.sin(angle) * p.speed + Math.sin(repAngle) * repulsion;

        // Wrap around edges
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        // Brightness boost near mouse
        const glow = dist < 200 ? 1 + (1 - dist / 200) * 0.8 : 1;
        const alpha = Math.min(1, p.alpha * opacity * glow * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [opacity, color, particleCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
