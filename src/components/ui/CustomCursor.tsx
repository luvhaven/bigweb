'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const auraRef = useRef<HTMLDivElement>(null)

    const [isVisible, setIsVisible] = useState(false)
    const [hoverText, setHoverText] = useState<string | null>(null)
    const pos = useRef({ x: 0, y: 0 })
    const vel = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const ring = ringRef.current;

        if (!cursor || !dot || !ring) return;

        gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
        gsap.set(cursor, { opacity: 0 });

        const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
        const xToRing = gsap.quickTo(ring, "x", { duration: 0.6, ease: "power3" });
        const yToRing = gsap.quickTo(ring, "y", { duration: 0.6, ease: "power3" });

        let isHovering = false;

        const handleMouseMove = (e: MouseEvent) => {
            setIsVisible(true);
            gsap.to(cursor, { opacity: 1, duration: 0.3 });

            xToDot(e.clientX);
            yToDot(e.clientY);

            if (!isHovering) {
                xToRing(e.clientX);
                yToRing(e.clientY);
            } else {
                // If hovering over a card, follow mouse exactly with a slight float
                xToRing(e.clientX);
                yToRing(e.clientY);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as Element).closest('a, button, .cursor-hover') as HTMLElement;
            if (!target) return;

            isHovering = true;
            const label = target.getAttribute('data-cursor-label') ||
                (target.tagName === 'A' ? 'GO' :
                    target.tagName === 'BUTTON' ? 'CLICK' : null);

            setHoverText(label);

            const isCard = target.classList.contains('cursor-hover');

            if (isCard) {
                // Large floating text bubble
                gsap.to(ring, {
                    width: 70, height: 70,
                    backgroundColor: 'rgba(212,175,106, 0.95)',
                    borderColor: 'transparent',
                    duration: 0.4, ease: 'back.out(1.5)'
                });
                gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
            } else {
                // Button snap shrink
                gsap.to(ring, {
                    width: 45, height: 45,
                    backgroundColor: 'rgba(255,255,255, 0.1)',
                    borderColor: 'rgba(255,255,255, 0.6)',
                    duration: 0.3, ease: 'power2.out'
                });
                gsap.to(dot, { scale: 0, duration: 0.2 });
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const currentTarget = (e.target as Element).closest('a, button, .cursor-hover') as HTMLElement;
            const relatedTarget = e.relatedTarget as Element | null;

            if (currentTarget && (!relatedTarget || !currentTarget.contains(relatedTarget))) {
                isHovering = false;
                setHoverText(null);

                // Reset
                gsap.to(ring, {
                    width: 28, height: 28,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255, 0.4)',
                    duration: 0.5, ease: 'back.out(1.2)'
                });
                gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
            }
        };

        const handleMouseDown = () => {
            gsap.to(ring, { scale: 0.8, duration: 0.2 });
        };
        const handleMouseUp = () => {
            gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div ref={cursorRef} className={cn("fixed inset-0 pointer-events-none z-[10000] opacity-0 transition-opacity duration-500 mix-blend-difference", !isVisible && "hidden")}>
            <div
                ref={auraRef}
                className="fixed top-0 left-0 w-[150px] h-[150px] bg-white rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 opacity-0"
            />

            <div
                ref={ringRef}
                className="fixed top-0 left-0 border border-white/40 rounded-full flex items-center justify-center overflow-hidden origin-top-left"
                style={{ width: 28, height: 28, pointerEvents: 'none' }}
            >
                {hoverText && (
                    <span
                        ref={labelRef}
                        className="text-[9px] font-black tracking-[0.3em] text-[#050505] uppercase animate-pulse"
                    >
                        {hoverText}
                    </span>
                )}
            </div>

            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white origin-top-left"
                style={{ boxShadow: '0 0 15px rgba(255,255,255,0.6)' }}
            />
        </div>
    )
}
