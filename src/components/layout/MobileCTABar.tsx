'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MobileCTABar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    // Hide bar when scrolling down, show when scrolling up
    const st = ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        if (!barRef.current) return;
        if (self.direction === 1 && self.scroll() > 200) {
          gsap.to(barRef.current, { y: '100%', duration: 0.3, ease: 'power2.in' });
        } else {
          gsap.to(barRef.current, { y: '0%', duration: 0.3, ease: 'power2.out' });
        }
      }
    });

    return () => st.kill();
  }, [pathname]);

  if (
    pathname.startsWith('/admin') ||
    pathname === '/contact' ||
    pathname === '/playbook'
  ) {
    return null;
  }

  return (
    <>
      <div ref={barRef} className="mobile-cta-bar">
        <Link href="/contact" className="mobile-cta-link">
          Book Your Free Diagnostic
          <ArrowRight size={16} />
        </Link>
      </div>
      <style>{`
        .mobile-cta-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 90;
          padding: 12px 20px;
          background: var(--color-bg-secondary);
          border-top: 1px solid var(--color-bg-border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          will-change: transform;
        }
        .mobile-cta-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: var(--color-gold-bright);
          color: var(--color-bg-primary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 14px 20px;
          border-radius: 0; /* Match geometric button style */
          transition: opacity 0.2s ease;
        }
        .mobile-cta-link:hover {
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          .mobile-cta-bar {
            display: block;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-cta-link { transition: none; }
        }
      `}</style>
    </>
  );
}
