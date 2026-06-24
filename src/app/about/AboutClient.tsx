'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';
import KineticText from '@/components/ui/KineticText';

gsap.registerPlugin(ScrollTrigger);

const LiquidSphere = dynamic(() => import('@/components/ui/LiquidSphere'), { ssr: false });

interface Value { num: string; title: string; desc: string; }
interface TeamStat { num: string; label: string; }
interface TeamMember { id: string; name: string; role: string; bio: string; initials: string; image: string | null; }

export default function AboutClient({ teamMembers, values, teamStats }: { teamMembers: TeamMember[]; values: Value[]; teamStats: TeamStat[] }) {
    const heroRef = useRef<HTMLElement>(null);
    const missionRef = useRef<HTMLElement>(null);
    const valuesRef = useRef<HTMLElement>(null);
    const teamRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            if (heroRef.current) {
                const els = heroRef.current.querySelectorAll('.about-anim');
                gsap.fromTo(els,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'expo.out', delay: 0.2 }
                );
            }

            // Mission
            if (missionRef.current) {
                const els = missionRef.current.querySelectorAll('.mission-anim');
                gsap.fromTo(els,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out',
                        scrollTrigger: { trigger: missionRef.current, start: 'top 75%' },
                    }
                );
            }

            // Values
            if (valuesRef.current) {
                const cards = valuesRef.current.querySelectorAll('.value-card');
                gsap.fromTo(cards,
                    { opacity: 0, y: 60, scale: 0.96 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.8, stagger: 0.12, ease: 'expo.out',
                        scrollTrigger: { trigger: valuesRef.current, start: 'top 75%' },
                    }
                );
            }

            // Team
            if (teamRef.current) {
                const cards = teamRef.current.querySelectorAll('.team-card');
                gsap.fromTo(cards,
                    { opacity: 0, y: 50, scale: 0.97 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.8, stagger: 0.1, ease: 'expo.out',
                        scrollTrigger: { trigger: teamRef.current, start: 'top 75%' },
                    }
                );
            }

            // CTA
            if (ctaRef.current) {
                gsap.fromTo(ctaRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.8, stagger: 0.15, ease: 'expo.out',
                        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Hero */}
            <section ref={heroRef} style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', paddingBottom: 'var(--space-20)', position: 'relative', overflow: 'hidden' }}>
                {/* Unique WebGL morphing wireframe sphere — About page signature */}
                <LiquidSphere />
                {/* Gradient overlay so text stays crisp over the WebGL layer */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse at 70% 50%, rgba(10,10,11,0.4) 0%, rgba(10,10,11,0.92) 65%)' }} />
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <span className="about-anim" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
                        Who We Are
                    </span>
                    <h1 className="about-anim" style={{
                        opacity: 0, fontSize: 'clamp(3rem, 6vw, var(--text-7xl))',
                        lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: 820, marginBottom: 'var(--space-8)',
                    }}>
                        <KineticText>We stopped building</KineticText><br />
                        <KineticText>pretty websites.</KineticText> <span className="accent-italic">We started building revenue.</span>
                    </h1>
                    <p className="about-anim" style={{ opacity: 0, fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)', maxWidth: 640, lineHeight: 1.75 }}>
                        BIGWEB Digital was built by people who spent years watching businesses pour money into beautiful websites that did nothing.
                    </p>

                    {/* Stats */}
                    <div className="about-anim" style={{
                        opacity: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1px', background: 'var(--color-bg-border)', border: '1px solid var(--color-bg-border)', marginTop: 'var(--space-12)',
                    }}>
                        {teamStats.map((s) => (
                            <div key={s.label} style={{ background: 'var(--color-bg-primary)', padding: 'var(--space-6)', textAlign: 'center' }}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 4 }}>{s.num}</div>
                                <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section ref={missionRef} style={{ padding: 'var(--space-20) 0', background: 'var(--color-bg-secondary)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-12)', alignItems: 'start' }}>
                    <div className="mission-anim" style={{ opacity: 0 }}>
                        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--color-bg-border)', padding: 'var(--space-10)', background: 'var(--color-bg-primary)' }}>
                            <div style={{ width: 50, height: 2, background: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }} />
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, lineHeight: 1.6, color: 'var(--color-text-primary)', fontStyle: 'italic' }}>
                                &ldquo;We made a deliberate choice: stop optimizing for aesthetics and start optimizing for outcomes.&rdquo;
                            </p>
                            <div style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ width: 30, height: 1, background: 'var(--color-bg-border)' }} />
                                <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-tertiary)' }}>BIGWEB Founding Principle</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mission-anim" style={{ opacity: 0, fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                            We watched agencies celebrate award-winning design while clients&apos; revenue stayed flat. We watched &ldquo;growth strategists&rdquo; sell 6-month retainers with no defined deliverables and no accountability.
                        </p>
                        <p className="mission-anim" style={{ opacity: 0, fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                            So we built something different. A digital agency where every engagement has a defined scope, a defined deliverable, and a measurable outcome.
                        </p>
                        <p className="mission-anim" style={{ opacity: 0, fontSize: 'var(--text-base)', lineHeight: 1.75, color: 'var(--color-text-primary)', fontWeight: 500, borderLeft: '2px solid var(--color-gold-bright)', paddingLeft: 'var(--space-5)' }}>
                            We are selective. We take on clients we can genuinely help. When we engage — we treat your growth like it&apos;s our own.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section ref={valuesRef} style={{ padding: 'var(--space-24) 0' }}>
                <div className="container">
                    <div style={{ marginBottom: 'var(--space-12)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
                            How We Work
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, var(--text-5xl))', fontWeight: 800, lineHeight: 1.1 }}>
                            Four principles.<br />Non-negotiable.
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
                        {values.map((v) => (
                            <div key={v.num} className="value-card" style={{
                                background: 'var(--color-bg-secondary)', padding: 'var(--space-10)',
                                boxShadow: 'var(--shadow-card)',
                                borderRadius: '4px',
                                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#111114'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-secondary)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                            >
                                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--color-bg-border)', lineHeight: 1, display: 'block', marginBottom: 'var(--space-6)' }}>{v.num}</span>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-3)', color: 'var(--color-text-primary)' }}>{v.title}</h3>
                                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section ref={teamRef} style={{ padding: 'var(--space-24) 0', background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <div style={{ marginBottom: 'var(--space-12)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
                            The Team
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, var(--text-5xl))', fontWeight: 800, lineHeight: 1.1 }}>
                            The people behind<br />the numbers.
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                        {teamMembers.map((member) => (
                            <div key={member.id} className="team-card" style={{
                                background: 'var(--color-bg-secondary)', padding: 'var(--space-8)',
                                display: 'flex', flexDirection: 'column',
                                boxShadow: 'var(--shadow-card)',
                                borderRadius: '4px',
                                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#111114'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-bg-secondary)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                                    <div style={{
                                        width: 80, height: 80, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', position: 'relative',
                                        border: '2px solid rgba(212,175,106,0.25)', background: 'linear-gradient(135deg, rgba(212,175,106,0.1), rgba(212,175,106,0.02))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {member.image ? (
                                            <Image src={member.image} alt={member.name} fill sizes="80px"
                                                style={{ objectFit: 'cover', objectPosition: member.name === 'Daniel Oriazowan' ? 'center 5%' : 'center top' }}
                                                unoptimized={member.image.includes('daniel-orz.vercel.app')} />
                                        ) : (
                                            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-gold-bright)', letterSpacing: '0.05em' }}>{member.initials}</span>
                                        )}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>{member.name}</div>
                                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold-bright)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 2 }}>{member.role}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.75, flex: 1 }}>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} style={{ padding: 'var(--space-24) 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', marginBottom: 'var(--space-4)', lineHeight: 1.15 }}>
                        Work with people who care<br />about your <span className="accent-italic">revenue.</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: 460, margin: '0 auto var(--space-8)', fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
                        Request a private audit. We&apos;ll analyze your digital infrastructure and expose exactly where the opportunity is.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <MagneticButton href="/contact" className="btn btn-primary btn-lg">
                            Request Private Audit <ArrowRight size={16} />
                        </MagneticButton>
                        <Link href="/services" className="btn btn-outline btn-lg">View Services</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
