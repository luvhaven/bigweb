'use client';

import { useMemo } from 'react';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export default function TextTestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  const row1 = useMemo(() => [...testimonials, ...testimonials].slice(0, 5), [testimonials]);
  const row2 = useMemo(() => [...testimonials, ...testimonials].slice(2, 7), [testimonials]);
  const row3 = useMemo(() => [...testimonials, ...testimonials].slice(4, 9), [testimonials]);

  const TestimonialCard = ({ item, i }: { item: Testimonial; i: number }) => {
    const isVideo = item.avatar && !!item.avatar.match(/\.(mp4|webm|ogg)$/i);

    return (
      <div key={i} className="marquee-card">
        <div className="marquee-card-header">
          <div className="marquee-card-avatar">
            {item.avatar && !isVideo ? (
              <Image src={item.avatar} alt={item.name} width={40} height={40} style={{ objectFit: 'cover' }} />
            ) : item.avatar && isVideo ? (
              <video src={item.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted loop autoPlay playsInline />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--color-bg-border)' }} />
            )}
          </div>
          <div className="marquee-card-info">
            <h4 className="marquee-name">{item.name}</h4>
            <span className="marquee-role">{item.role} @ {item.company}</span>
          </div>
        </div>
        <p className="marquee-quote">"{item.quote}"</p>
      </div>
    );
  };

  return (
    <div className="marquee-wrapper">
      <style dangerouslySetInnerHTML={{
        __html: `
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          background: transparent;
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          padding: var(--space-4) 0;
          position: relative;
        }
        .marquee-wrapper::before, .marquee-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15vw;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrapper::before { left: 0; background: linear-gradient(to right, var(--color-bg-primary), transparent); }
        .marquee-wrapper::after { right: 0; background: linear-gradient(to left, var(--color-bg-primary), transparent); }
        .marquee-lane { display: flex; gap: var(--space-6); width: max-content; }
        .marquee-lane.left { animation: marqueeLeft linear infinite; }
        .marquee-lane.right { animation: marqueeRight linear infinite; }
        .marquee-lane:hover { animation-play-state: paused; }
        .marquee-card {
          width: 400px; background: var(--color-bg-secondary); border: 1px solid var(--color-bg-border);
          border-radius: var(--radius-lg); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .marquee-card:hover { border-color: var(--color-gold-bright); box-shadow: 0 4px 20px rgba(212, 175, 106, 0.05); }
        .marquee-card-header { display: flex; alignItems: center; gap: var(--space-3); }
        .marquee-card-avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: var(--color-bg-border); flex-shrink: 0; }
        .marquee-card-info { display: flex; flex-direction: column; }
        .marquee-name { font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); line-height: 1.2; }
        .marquee-role { font-size: var(--text-xs); color: var(--color-text-secondary); }
        .marquee-quote { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; font-style: italic; }
        @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - (var(--space-6) / 2))); } }
        @keyframes marqueeRight { 0% { transform: translateX(calc(-50% - (var(--space-6) / 2))); } 100% { transform: translateX(0); } }
        @media (max-width: 768px) { .marquee-card { width: 300px; } }
      `}} />
      <div className="marquee-lane left" style={{ animationDuration: '45s' }}>
        {[...row1, ...row1, ...row1, ...row1].map((item, i) => <TestimonialCard item={item} i={i} key={'l1-' + i} />)}
      </div>
      <div className="marquee-lane right" style={{ animationDuration: '60s' }}>
        {[...row2, ...row2, ...row2, ...row2].map((item, i) => <TestimonialCard item={item} i={i} key={'l2-' + i} />)}
      </div>
      <div className="marquee-lane left" style={{ animationDuration: '35s' }}>
        {[...row3, ...row3, ...row3, ...row3].map((item, i) => <TestimonialCard item={item} i={i} key={'l3-' + i} />)}
      </div>
    </div>
  );
}
