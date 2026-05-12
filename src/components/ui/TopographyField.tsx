'use client';

import { useEffect, useRef } from 'react';

// Simple inline noise
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

export default function TopographyField() {
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

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      W = canvas.width = rect?.width ?? window.innerWidth;
      H = canvas.height = rect?.height ?? window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.001;

      // Draw topographic lines by evaluating noise in a grid
      const res = 15; // resolution
      const cols = Math.floor(W / res) + 1;
      const rows = Math.floor(H / res) + 1;

      // We'll draw dots where the noise value crosses certain thresholds (contour lines)
      ctx.fillStyle = 'rgba(212, 175, 106, 0.06)';
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * res;
          const y = r * res;
          
          // Get noise value (0 to 1)
          const n = noise2D(x * 0.002, y * 0.002 - t);
          
          // Contour levels
          const contourInterval = 0.1;
          const remainder = n % contourInterval;
          
          // If close to a contour line, draw a dot
          if (remainder < 0.015) {
            ctx.fillRect(x, y, 1.5, 1.5);
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

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
