'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync() {
  useLenis((lenis) => {
    // Sync Lenis scroll position → GSAP ScrollTrigger
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Connect Lenis ticker to GSAP ticker for in-sync animations
    const update = (time: number) => {
      ScrollTrigger.update();
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for buttery scroll
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.08,
      duration: 1.6,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
