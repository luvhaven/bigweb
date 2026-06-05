'use client';
import { useEffect, useRef } from 'react';

interface Particle {
    x: number; y: number;
    size: number;
    vx: number; vy: number;
    opacity: number; life: number; maxLife: number;
}

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let raf: number;
        let angle = 0;
        let mouse = { x: 0.5, y: 0.5 };
        let smoothMouse = { x: 0.5, y: 0.5 };
        const particles: Particle[] = [];

        const GOLD = 'rgba(212, 175, 106,';
        const CYAN = 'rgba(100, 210, 230,';

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const onMouse = (e: MouseEvent) => {
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = e.clientY / window.innerHeight;
        };

        const spawnParticle = () => {
            const life = 200 + Math.random() * 300;
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + 10,
                size: Math.random() * 1.2 + 0.3,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(Math.random() * 0.5 + 0.2),
                opacity: Math.random() * 0.35 + 0.05,
                life, maxLife: life,
            });
        };

        const draw = () => {
            // Smooth mouse tracking
            smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04;
            smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2 + (smoothMouse.x - 0.5) * 60;
            const cy = canvas.height / 2 + (smoothMouse.y - 0.5) * 40;
            const size = Math.min(canvas.width, canvas.height);

            // ── Rings ──────────────────────────────────────────────
            const rings = [
                { r: size * 0.44, lw: 0.4, dash: [3, 10], color: GOLD, alpha: 0.08, rotDir: 1 },
                { r: size * 0.35, lw: 0.5, dash: [], color: GOLD, alpha: 0.06, rotDir: -1 },
                { r: size * 0.26, lw: 0.6, dash: [1, 8], color: CYAN, alpha: 0.05, rotDir: 1 },
                { r: size * 0.18, lw: 0.4, dash: [4, 12], color: GOLD, alpha: 0.07, rotDir: -1 },
                { r: size * 0.10, lw: 0.3, dash: [], color: GOLD, alpha: 0.04, rotDir: 1 },
            ];

            rings.forEach(({ r, lw, dash, color, alpha, rotDir }, i) => {
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle * rotDir + i * 0.3);
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.setLineDash(dash);
                ctx.lineWidth = lw;
                ctx.strokeStyle = `${color} ${alpha})`;
                ctx.stroke();
                ctx.restore();
            });

            // ── Crosshair lines ─────────────────────────────────────
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle * 0.15);
            ctx.setLineDash([]);
            const hairLen = size * 0.46;
            [[0, -hairLen, 0, hairLen], [-hairLen, 0, hairLen, 0]].forEach(([x1, y1, x2, y2]) => {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineWidth = 0.3;
                ctx.strokeStyle = `${GOLD} 0.04)`;
                ctx.stroke();
            });
            ctx.restore();

            // ── Diagonal accent lines ────────────────────────────────
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle * 0.08 + Math.PI / 4);
            [[-size * 0.42, 0, size * 0.42, 0], [0, -size * 0.42, 0, size * 0.42]].forEach(([x1, y1, x2, y2]) => {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineWidth = 0.25;
                ctx.strokeStyle = `${GOLD} 0.03)`;
                ctx.stroke();
            });
            ctx.restore();

            // ── Rotating arc sweep ───────────────────────────────────
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle * -0.6);
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.38, 0, Math.PI * 0.35);
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = `${GOLD} 0.12)`;
            ctx.setLineDash([]);
            ctx.stroke();
            ctx.restore();

            // ── Particles ────────────────────────────────────────────
            if (Math.random() < 0.3) spawnParticle();
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy; p.life--;
                if (p.life <= 0) { particles.splice(i, 1); continue; }
                const fade = p.life / p.maxLife;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${GOLD} ${p.opacity * fade})`;
                ctx.fill();
            }

            angle += 0.0015;
            raf = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouse, { passive: true });
        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
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
