'use client';

import { useEffect, useRef } from 'react';

interface Props {
  gridSize?: number;
  dotColor?: string;
  glowColor?: string;
  opacity?: number;
  glowRadius?: number;
}

export default function GridDistortion({
  gridSize = 36,
  dotColor = '212, 175, 106',
  glowColor = '212, 175, 106',
  opacity = 0.35,
  glowRadius = 160,
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
    const mouse = { x: -9999, y: -9999 };
    let t = 0;

    type Dot = { x: number; y: number; baseX: number; baseY: number };
    let dots: Dot[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = canvas.width = rect?.width ?? window.innerWidth;
      H = canvas.height = rect?.height ?? window.innerHeight;

      dots = [];
      const cols = Math.ceil(W / gridSize) + 1;
      const rows = Math.ceil(H / gridSize) + 1;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * gridSize;
          const y = r * gridSize;
          dots.push({ x, y, baseX: x, baseY: y });
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      for (const dot of dots) {
        const dx = dot.baseX - mouse.x;
        const dy = dot.baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Proximity effect
        const inRange = dist < glowRadius;
        const proximity = inRange ? 1 - dist / glowRadius : 0;

        // Subtle breathing pulse
        const pulse = Math.sin(t + dot.baseX * 0.01 + dot.baseY * 0.01) * 0.5 + 0.5;

        // Dot size
        const baseSize = 0.8;
        const size = baseSize + proximity * 2.0 + pulse * 0.2;

        // Alpha
        const baseAlpha = 0.08 + pulse * 0.04;
        const alpha = Math.min(1, (baseAlpha + proximity * 0.4) * opacity);

        // Magnetic displacement toward mouse
        if (inRange) {
          const angle = Math.atan2(dy, dx);
          const pull = proximity * 4;
          dot.x = dot.baseX - Math.cos(angle) * pull;
          dot.y = dot.baseY - Math.sin(angle) * pull;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.1;
          dot.y += (dot.baseY - dot.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);

        if (inRange && proximity > 0.3) {
          // Gold glow for close dots
          ctx.fillStyle = `rgba(${glowColor}, ${alpha})`;
          // Draw glow ring
          ctx.shadowBlur = 10 * proximity;
          ctx.shadowColor = `rgba(${glowColor}, ${proximity * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(${dotColor}, ${alpha})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [gridSize, dotColor, glowColor, opacity, glowRadius]);

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
