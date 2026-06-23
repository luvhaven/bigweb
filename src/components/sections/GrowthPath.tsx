'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    label: 'Conversion Audit',
    price: 'From $3k',
    type: 'Diagnostic',
    desc: "We diagnose exactly where revenue is leaking. You get a prioritized fix list with ROI estimates. If we can't find $10,000 in opportunity, we refund you.",
    color: 'rgba(212,175,106,0.3)',
    activeColor: 'rgba(212,175,106,1)',
  },
  {
    num: '02',
    label: 'CRO Retainer',
    price: 'Growth Track',
    type: 'Execution',
    desc: 'We execute the audit recommendations — A/B testing, landing pages, funnel fixes — and report on revenue impact monthly. Results compound.',
    color: 'rgba(212,175,106,0.5)',
    activeColor: 'rgba(212,175,106,1)',
  },
  {
    num: '03',
    label: 'Revenue Engine',
    price: 'Scale Track',
    type: 'Infrastructure',
    desc: 'Full-funnel infrastructure: paid traffic → optimized landing → email nurture → AI sales agent → booked call. The complete revenue machine.',
    color: 'rgba(212,175,106,0.8)',
    activeColor: '#FFF',
  },
  {
    num: '04',
    label: 'Digital Partner',
    price: 'Partnership',
    type: 'Symbiosis',
    desc: 'We become your embedded digital team. Strategy, execution, analytics, and iteration — every month. Not a vendor. A growth partner.',
    color: 'var(--color-gold-bright)',
    activeColor: '#FFF',
  },
];

export default function GrowthPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineRef.current) return;

      // The glowing laser line that traces progress
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: 0.5, // 0.5s lag for smooth "laser" feeling
          }
        }
      );

      // Node activation mechanics
      const nodes = sectionRef.current?.querySelectorAll('.circuit-node-wrapper');
      nodes?.forEach((node, i) => {
        // We trigger activation when the center of the viewport hits the node
        ScrollTrigger.create({
          trigger: node,
          start: 'top 60%',
          end: 'bottom top',
          onEnter: () => {
            gsap.to(node.querySelector('.circuit-dot'), { scale: 1.5, background: steps[i].activeColor, duration: 0.4, ease: 'back.out(2)' });
            gsap.to(node.querySelector('.circuit-glow'), { opacity: 0.6, scale: 2, duration: 0.4 });
            gsap.to(node.querySelector('.circuit-card'), { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' });
          },
          onLeaveBack: () => {
            gsap.to(node.querySelector('.circuit-dot'), { scale: 1, background: steps[i].color, duration: 0.4 });
            gsap.to(node.querySelector('.circuit-glow'), { opacity: 0, scale: 0.5, duration: 0.4 });
            gsap.to(node.querySelector('.circuit-card'), { opacity: 0.4, x: -30, filter: 'blur(4px)', duration: 0.5 });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="growth-path" style={{ padding: 'var(--space-32) 0', background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>

      {/* Background radial gradient fixed to section center */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(212,175,106,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)', boxShadow: '0 0 10px var(--color-gold-bright)' }} />
            The Circuit
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, var(--text-6xl))', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            From audit to <span style={{ color: 'var(--color-gold-bright)' }}>$140k+ asset.</span>
          </h2>
        </div>

        {/* The Circuit Board UI */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', paddingBottom: 'var(--space-10)' }}>

          {/* Base Track */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50px', width: 2, background: 'rgba(255,255,255,0.05)', marginLeft: -1 }} />

          {/* Glowing Laser Tracer */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: '50px', width: 2, marginLeft: -1,
              background: 'linear-gradient(to bottom, transparent, var(--color-gold-bright), #FFF)',
              transformOrigin: 'top center',
              boxShadow: '0 0 20px var(--color-gold-bright)',
              zIndex: 1
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
            {steps.map((step, i) => (
              <div key={i} className="circuit-node-wrapper" style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>

                {/* Node Tracker Column */}
                <div style={{ width: 100, display: 'flex', justifyContent: 'center', position: 'relative', marginTop: 30, flexShrink: 0 }}>

                  {/* Outer Ambient Glow */}
                  <div className="circuit-glow" style={{ position: 'absolute', top: '50%', left: '50%', width: 40, height: 40, transform: 'translate(-50%, -50%) scale(0.5)', background: step.activeColor, borderRadius: '50%', filter: 'blur(20px)', opacity: 0, pointerEvents: 'none' }} />

                  {/* Physical Node Dot */}
                  <div className="circuit-dot" style={{ width: 14, height: 14, borderRadius: '50%', background: step.color, border: '2px solid var(--color-bg-primary)', position: 'relative', zIndex: 3, transition: 'background 0.3s' }} />

                  <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: 10, fontWeight: 800, color: 'var(--color-text-tertiary)', letterSpacing: '0.2em' }}>
                    {step.num}
                  </span>
                </div>

                {/* Cyber Card Payload */}
                <div
                  className="circuit-card"
                  style={{
                    flex: 1, background: 'rgba(10,10,11,0.6)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.05)', padding: 'var(--space-8)',
                    opacity: 0.4, transform: 'translateX(-30px)', filter: 'blur(4px)',
                    borderLeft: `2px solid ${step.color}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                    <div>
                      <span style={{ fontSize: 10, color: 'var(--color-gold-bright)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: 4, display: 'block' }}>
                        {step.type}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-text-primary)', margin: 0 }}>
                        {step.label}
                      </h3>
                    </div>
                    <div style={{ padding: '6px 12px', background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.2)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-gold-bright)', letterSpacing: '0.1em' }}>
                      {step.price}
                    </div>
                  </div>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
