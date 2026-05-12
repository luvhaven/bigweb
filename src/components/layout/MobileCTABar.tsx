'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function MobileCTABar() {
  const pathname = usePathname();
  // Hide on admin, contact (already has form), and playbook pages
  if (
    pathname.startsWith('/admin') ||
    pathname === '/contact' ||
    pathname === '/playbook'
  ) {
    return null;
  }

  return (
    <>
      <div className="mobile-cta-bar">
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
          border-radius: 8px;
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
