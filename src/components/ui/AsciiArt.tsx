'use client';

import { useEffect, useRef } from 'react';

// Simple inline noise
function hash(x: number, y: number): number {
  let h = (x * 127.1 + y * 311.7) | 0;
  h = ((h ^ (h >> 16)) * 0x45d9f3b) | 0;
  h = ((h ^ (h >> 16)) * 0x45d9f3b) | 0;
  return ((h ^ (h >> 16)) & 0x7fffffff) / 0x7fffffff;
}

function noise2D(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy), b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

const CHARS = ['·', '·', '·', '·', '-', '|', '/', '\\', '+', '×', '○', '◦'];
const CHARS_BRIGHT = ['◈', '◉', '⬡', '⬢', '◆', '▪', '▸', '⟩', '⎕', '⊕'];

interface Props {
  rows?: number;
  cols?: number;
  speed?: number;
  color?: string;
}

export default function AsciiArt({
  rows = 18,
  cols = 60,
  speed = 0.3,
  color = '212, 175, 106',
}: Props) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pre = preRef.current;
    if (!pre) return;

    let t = 0;
    let raf: number;

    // Dynamically scale cols/rows to container
    const parent = pre.parentElement;
    const computedCols = parent ? Math.floor(parent.offsetWidth / 14) : cols;
    const computedRows = parent ? Math.floor(parent.offsetHeight / 22) : rows;

    const draw = () => {
      t += speed * 0.007;
      const lines: string[] = [];

      for (let r = 0; r < computedRows; r++) {
        let line = '';
        for (let c = 0; c < computedCols; c++) {
          // Two noise octaves for richness
          const n1 = noise2D(c * 0.12 + t, r * 0.15 + t * 0.7);
          const n2 = noise2D(c * 0.06 - t * 0.4, r * 0.08 + t * 0.3);
          const n = (n1 * 0.7 + n2 * 0.3);

          if (n > 0.86) {
            line += CHARS_BRIGHT[Math.floor(n * CHARS_BRIGHT.length) % CHARS_BRIGHT.length];
          } else if (n > 0.62) {
            line += CHARS[Math.floor(n * CHARS.length) % CHARS.length];
          } else {
            line += ' ';
          }
        }
        lines.push(line);
      }

      pre.textContent = lines.join('\n');
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [rows, cols, speed, color]);

  return (
    <pre
      ref={preRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        fontFamily: '"Courier New", "Lucida Console", monospace',
        fontSize: '13px',
        lineHeight: '22px',
        letterSpacing: '0.06em',
        color: `rgba(${color}, 0.08)`,
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        whiteSpace: 'pre',
        padding: '0 8px',
      }}
    />
  );
}
