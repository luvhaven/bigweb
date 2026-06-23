'use client';

import { useEffect, useRef } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactWizard from '@/components/sections/ContactWizard';
import TrackingRadar from '@/components/ui/TrackingRadar';

gsap.registerPlugin(ScrollTrigger);

export default function ContactClient() {
    const heroRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            if (heroRef.current) {
                const els = heroRef.current.querySelectorAll('.contact-anim');
                gsap.fromTo(els,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'expo.out', delay: 0.2 }
                );
            }

            // Form section
            if (formRef.current) {
                const els = formRef.current.querySelectorAll('.form-anim');
                gsap.fromTo(els,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.9, stagger: 0.12, ease: 'expo.out',
                        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
                    }
                );
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Hero */}
            <section ref={heroRef} style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', paddingBottom: 'var(--space-16)', position: 'relative', overflow: 'hidden' }}>
                <TrackingRadar />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <span className="contact-anim" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-6)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
                        Get In Touch
                    </span>
                    <h1 className="contact-anim" style={{
                        opacity: 0, fontSize: 'clamp(2.5rem, 5vw, var(--text-7xl))',
                        lineHeight: 1.1, marginBottom: 'var(--space-6)', maxWidth: 800,
                    }}>
                        You&apos;ve identified the problem.<br />
                        <span className="accent-italic">Let&apos;s build the fix.</span>
                    </h1>
                    <p className="contact-anim" style={{ opacity: 0, maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                        The audit is private. In 20 minutes, we&apos;ll tell you exactly where your revenue is leaking and give you a clear path to fixing it — whether you hire us or not.
                    </p>
                </div>
            </section>

            {/* Form + Info */}
            <section ref={formRef} style={{ padding: 'var(--space-16) 0 var(--space-24)', background: 'var(--color-bg-secondary)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-12)' }}>
                    {/* Form */}
                    <div className="form-anim" style={{ opacity: 0 }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                            Request your private audit
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-8)', lineHeight: 1.6, maxWidth: 440 }}>
                            Fill out the form below. We&apos;ll review your digital presence and respond within 4 hours.
                        </p>
                        <ContactWizard />
                    </div>

                    {/* Info */}
                    <div>
                        <div className="form-anim" style={{
                            opacity: 0, border: '1px solid var(--color-bg-border)', padding: 'var(--space-10)',
                            background: 'var(--color-bg-primary)', marginBottom: 'var(--space-6)',
                        }}>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', color: 'var(--color-text-primary)' }}>
                                What happens next
                            </h3>
                            {[
                                { num: '1', title: 'We review your submission', desc: 'Within 4 hours, we look at your website and preliminary data.' },
                                { num: '2', title: 'We schedule the call', desc: 'A 20-minute video call at a time that works for you.' },
                                { num: '3', title: 'We diagnose, honestly', desc: "We tell you exactly what we see, what we'd recommend, and whether we're the right fit." },
                            ].map((step) => (
                                <div key={step.num} style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                                    <span style={{
                                        width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid var(--color-bg-border)', fontSize: 'var(--text-xs)', fontWeight: 700,
                                        color: 'var(--color-gold-bright)', flexShrink: 0,
                                    }}>{step.num}</span>
                                    <div>
                                        <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block', marginBottom: 4 }}>{step.title}</strong>
                                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact details */}
                        <div className="form-anim" style={{ opacity: 0, display: 'grid', gap: 'var(--space-4)' }}>
                            {[
                                { icon: <Mail size={18} />, label: 'Email', value: 'hello@bigwebdigital.com', href: 'mailto:hello@bigwebdigital.com' },
                                { icon: <MapPin size={18} />, label: 'Location', value: 'Lagos, Nigeria' },
                                { icon: <Clock size={18} />, label: 'Response Time', value: 'Within 4 hours' },
                            ].map((d) => (
                                <div key={d.label} style={{
                                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                    padding: 'var(--space-3) var(--space-4)',
                                    border: '1px solid var(--color-bg-border)', background: 'var(--color-bg-primary)',
                                }}>
                                    <span style={{ color: 'var(--color-gold-bright)' }}>{d.icon}</span>
                                    <div>
                                        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-text-tertiary)', display: 'block' }}>{d.label}</span>
                                        {d.href ? (
                                            <a href={d.href} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{d.value}</a>
                                        ) : (
                                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{d.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Limited availability */}
                        <div className="form-anim" style={{
                            opacity: 0, marginTop: 'var(--space-6)',
                            padding: 'var(--space-6)', border: '1px solid var(--color-gold-muted)',
                            background: 'rgba(212,175,106,0.04)',
                        }}>
                            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', marginBottom: 'var(--space-3)' }}>
                                ✦ Limited availability
                            </p>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                We accept a limited number of new clients per quarter to protect quality. Current intake is open &mdash; enquire now to secure a slot.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
