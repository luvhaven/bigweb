'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import KineticImageTrail from '@/components/ui/KineticImageTrail';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
    id: string;
    slug: string;
    client: string;
    problem: string;
    delivered: string;
    result: string;
    metric: string;
    metric_label: string;
    image: string;
    location: string;
    tags: string[];
    timeline: string;
}

export default function WorkClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
    const heroRef = useRef<HTMLElement>(null);
    const casesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    // Extract valid images for the kinetic trail
    const trailImages = caseStudies.map(cs => cs.image).filter(Boolean);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            if (heroRef.current) {
                const els = heroRef.current.querySelectorAll('.work-anim');
                gsap.fromTo(els,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'expo.out', delay: 0.2 }
                );
            }

            // Case studies stagger
            if (casesRef.current) {
                const cards = casesRef.current.querySelectorAll('.case-card');
                cards.forEach((card) => {
                    gsap.fromTo(card,
                        { opacity: 0, y: 80 },
                        {
                            opacity: 1, y: 0,
                            duration: 1, ease: 'expo.out',
                            scrollTrigger: { trigger: card, start: 'top 80%' },
                        }
                    );
                });
            }

            // CTA
            if (ctaRef.current) {
                gsap.fromTo(ctaRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.8, stagger: 0.12, ease: 'expo.out',
                        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Cinematic Mouse Trail Background */}
            <KineticImageTrail images={trailImages} />

            {/* Hero */}
            <section ref={heroRef} style={{ paddingTop: 'calc(var(--nav-height) + var(--space-32))', paddingBottom: 'var(--space-20)', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
                <div className="container" style={{ pointerEvents: 'all' }}>
                    <span className="work-anim" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
                        Client Outcomes
                    </span>
                    <h1 className="work-anim" style={{
                        opacity: 0, fontSize: 'clamp(3rem, 7vw, var(--text-8xl))',
                        marginBottom: 'var(--space-6)',
                    }}>
                        Results, not <span className="accent-italic">reports.</span>
                    </h1>
                    <p className="work-anim" style={{ opacity: 0, fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)', maxWidth: 560, lineHeight: 1.75, marginBottom: 'var(--space-10)' }}>
                        Every case study below represents a business that was underperforming digitally — and now isn&apos;t. Real clients, real numbers, real timelines.
                    </p>

                    {/* Stats */}
                    <div className="work-anim" style={{
                        opacity: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '1px', background: 'var(--color-bg-border)', border: '1px solid var(--color-bg-border)',
                        maxWidth: 500,
                    }}>
                        {[
                            { num: '288%', label: 'Avg revenue increase' },
                            { num: '$140K+', label: 'Annual lift per client' },
                            { num: '94%', label: 'Client retention' },
                        ].map((s) => (
                            <div key={s.label} style={{ background: 'var(--color-bg-primary)', padding: 'var(--space-5)', textAlign: 'center' }}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-text-primary)' }}>{s.num}</div>
                                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)', marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <div ref={casesRef}>
                {caseStudies.map((cs, i) => (
                    <section key={cs.id} className="case-card" style={{
                        padding: 'var(--space-20) 0',
                        background: 'var(--color-bg-primary)',
                        position: 'relative',
                        overflow: 'hidden',
                        borderBottom: '1px solid rgba(212,175,106,0.1)',
                        opacity: 0,
                    }}>
                        {/* Vibrant Ambient Glow behind each section */}
                        <div style={{
                            position: 'absolute', top: '50%', left: i % 2 === 0 ? '0%' : '100%',
                            transform: 'translate(-50%, -50%)',
                            width: '80vw', height: '80vw',
                            background: i % 2 === 0
                                ? 'radial-gradient(circle, rgba(212,175,106,0.15) 0%, rgba(10,10,11,0) 60%)'
                                : 'radial-gradient(circle, rgba(144,115,255,0.1) 0%, rgba(10,10,11,0) 60%)',
                            pointerEvents: 'none', zIndex: 0
                        }} />
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: 'var(--space-12)',
                                alignItems: 'center',
                            }}>
                                {/* Left: Narrative */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--color-bg-border)', lineHeight: 1 }}>{`0${i + 1}`}</span>
                                        <div>
                                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{cs.client}</h2>
                                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>{cs.location}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'var(--space-6)' }}>
                                        {(cs.tags as string[]).map((tag: string) => (
                                            <span key={tag} style={{ fontSize: 'var(--text-xs)', padding: '3px 8px', border: '1px solid var(--color-bg-border)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{tag}</span>
                                        ))}
                                    </div>

                                    <div style={{ marginBottom: 'var(--space-5)' }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold-bright)', marginBottom: 4, display: 'block' }}>The Problem</span>
                                        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{cs.problem}</p>
                                    </div>

                                    <div style={{ marginBottom: 'var(--space-5)' }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold-bright)', marginBottom: 4, display: 'block' }}>What We Delivered</span>
                                        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{cs.delivered}</p>
                                    </div>

                                    <div style={{ padding: 'var(--space-5)', background: 'rgba(212,175,106,0.04)', border: '1px solid var(--color-gold-muted)', marginBottom: 'var(--space-5)' }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-gold-bright)', marginBottom: 4, display: 'block' }}>The Result</span>
                                        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--color-text-primary)', fontWeight: 500 }}>{cs.result}</p>
                                    </div>

                                    <Link href={`/work/${cs.slug}`} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: 'var(--text-base)', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 10px 30px -10px rgba(212,175,106,0.4)' }}>
                                        Explore Full Case Study <ArrowRight size={16} />
                                    </Link>
                                </div>

                                {/* Right: Big metric */}
                                <div style={{
                                    position: 'relative', overflow: 'hidden', minHeight: 320,
                                    border: '1px solid var(--color-bg-border)', display: 'flex',
                                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                    textAlign: 'center', padding: 'var(--space-12)',
                                }}>
                                    {cs.image && (
                                        <>
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                backgroundImage: `url(${cs.image})`,
                                                backgroundSize: 'cover', backgroundPosition: 'center',
                                                filter: 'brightness(0.5) contrast(1.2) saturate(1.4)', zIndex: 0,
                                                transition: 'transform 0.5s ease',
                                            }} className="case-image-bg" />
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.9), rgba(10,10,11,0.2))', zIndex: 0 }} />
                                        </>
                                    )}
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{
                                            fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, var(--text-7xl))',
                                            fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1,
                                        }}>{cs.metric}</div>
                                        <div style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-gold-bright)', marginTop: 'var(--space-3)' }}>{cs.metric_label}</div>
                                        <div style={{ width: 40, height: 1, background: 'var(--color-bg-border)', margin: 'var(--space-5) auto' }} />
                                        <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-tertiary)' }}>Achieved in</div>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 4 }}>{cs.timeline}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* CTA */}
            <section ref={ctaRef} style={{ padding: 'var(--space-24) 0', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
                        Your Business Next
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, var(--text-5xl))', fontWeight: 900, margin: 'var(--space-4) 0 var(--space-6)', lineHeight: 1.15 }}>
                        Ready to become a case study?
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto var(--space-8)', fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
                        Request a private audit and we&apos;ll map out the exact revenue opportunity hiding in your current digital presence.
                    </p>
                    <MagneticButton href="/contact" className="btn btn-primary btn-lg">
                        Request Private Audit <ArrowRight size={16} />
                    </MagneticButton>
                </div>
            </section>
        </>
    );
}
