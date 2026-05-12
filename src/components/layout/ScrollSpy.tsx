'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Start' },
  { id: 'reality-check', label: 'The Problem' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'services', label: 'Solutions' },
  { id: 'results', label: 'Proof' },
  { id: 'roi-simulator', label: 'ROI' },
  { id: 'pricing', label: 'Investment' },
];

export default function ScrollSpy() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="scroll-spy"
      style={{
        position: 'fixed',
        right: '2vw',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '16px'
      }}
    >
      {sections.map((section, idx) => {
        const isActive = activeSection === section.id;
        return (
          <div key={section.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span 
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                color: isActive ? 'var(--color-gold-bright)' : 'var(--color-text-muted)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(10px)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none'
              }}
            >
              {section.label}
            </span>
            <button
              onClick={() => {
                const el = document.getElementById(section.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label={`Scroll to ${section.label}`}
              style={{
                width: '6px',
                height: isActive ? '24px' : '6px',
                borderRadius: '3px',
                background: isActive ? 'var(--color-gold-bright)' : 'var(--color-text-muted)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>
        );
      })}
      {/* Hide on mobile via CSS media query injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .scroll-spy { display: none !important; }
        }
      `}} />
    </div>
  );
}
