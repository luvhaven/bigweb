'use client';

import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  children: string;
  type?: 'words' | 'chars';
  delay?: number;
  className?: string;
}

export default function SplitText({ children, type = 'words', delay = 0, className = '' }: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = type === 'words' ? children.split(' ') : children.split('');

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {items.map((item, index) => {
        const isSpace = item === ' ' || item === '';
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              // Preserve spaces for words or chars
              marginRight: type === 'words' && index !== items.length - 1 ? '0.25em' : '0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
                opacity: isVisible ? 1 : 0,
                transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease`,
                transitionDelay: `${delay + index * 0.04}s`,
              }}
            >
              {isSpace ? '\u00A0' : item}
            </span>
          </span>
        );
      })}
    </span>
  );
}
