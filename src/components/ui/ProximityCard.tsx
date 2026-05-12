'use client';

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export default function ProximityCard({ children, className = "", innerClassName = "" }: { children: React.ReactNode, className?: string, innerClassName?: string }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      style={{ padding: '1px', borderRadius: 'inherit' }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 175, 106, 0.15),
              transparent 80%
            )
          `,
          zIndex: 0
        }}
      />
      <div className={`relative z-10 h-full w-full ${innerClassName}`} style={{ background: 'var(--color-bg-secondary)', borderRadius: 'inherit' }}>
        {children}
      </div>
    </div>
  );
}
