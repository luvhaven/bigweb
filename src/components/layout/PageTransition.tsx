'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// SVG Curve configurations
const initialPath = `M 0 100 V 100 Q 50 100 100 100 V 100 z`;
const middlePath = `M 0 100 V 50 Q 50 0 100 50 V 100 z`;
const targetPath = `M 0 100 V 0 Q 50 0 100 0 V 100 z`;
const exitMiddlePath = `M 0 0 V 50 Q 50 100 100 50 V 0 z`;
const exitFinalPath = `M 0 0 V 0 Q 50 0 100 0 V 0 z`;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // First load reveal
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.1 }
      );
      return;
    }

    const tl = gsap.timeline();
    const svg = svgRef.current;
    const path = pathRef.current;

    if (!svg || !path) return;

    // Reset SVG position for entry
    gsap.set(svg, { top: 0, bottom: 'auto', pointerEvents: 'all' });
    gsap.set(path, { attr: { d: initialPath } });

    // 1. Wave Up (Enter)
    tl.to(path, {
      attr: { d: middlePath },
      duration: 0.4,
      ease: 'power2.in',
    })
    .to(path, {
      attr: { d: targetPath },
      duration: 0.4,
      ease: 'power2.out',
    });

    // 2. Swap Content
    tl.call(() => {
      setDisplayChildren(children);
      window.scrollTo(0, 0);
      // Reset container for new specific clip-path reveal later
      gsap.set(containerRef.current, { opacity: 0, y: 40, filter: 'blur(8px)' });
    });

    // Reset SVG for wave down
    tl.call(() => {
      gsap.set(svg, { top: 'auto', bottom: 0 });
      gsap.set(path, { attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' } }); // full screen rect
    });

    // 3. Wave Down (Exit)
    tl.to(path, {
      attr: { d: exitMiddlePath },
      duration: 0.4,
      ease: 'power2.in',
    })
    .to(path, {
      attr: { d: exitFinalPath },
      duration: 0.4,
      ease: 'power2.out',
    });

    // Unblock pointers
    tl.set(svg, { pointerEvents: 'none' });

    // 4. Content Reveal
    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out',
    }, '-=0.6');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <path
          ref={pathRef}
          d={initialPath}
          fill="#0A0A0B"
        />
      </svg>
      <div ref={containerRef} style={{ willChange: 'transform, opacity, filter' }}>
        {displayChildren}
      </div>
    </>
  );
}
