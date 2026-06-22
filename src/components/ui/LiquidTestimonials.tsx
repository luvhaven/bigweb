'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
}

const AUTO_INTERVAL = 3000;

export default function LiquidTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setProgress(0);
    };
    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setProgress(0);
    };
    const goTo = (i: number) => { setActiveIndex(i); setProgress(0); };

    // Auto-advance every AUTO_INTERVAL ms
    useEffect(() => {
        if (paused) return;
        intervalRef.current = setInterval(() => {
            setActiveIndex((p) => (p + 1) % testimonials.length);
            setProgress(0);
        }, AUTO_INTERVAL);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [paused, testimonials.length]);

    // Progress bar ticker (updates 60× per second)
    useEffect(() => {
        if (paused) return;
        const startTime = Date.now();
        progressRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            setProgress(Math.min((elapsed / AUTO_INTERVAL) * 100, 100));
        }, 16);
        return () => { if (progressRef.current) clearInterval(progressRef.current); };
    }, [activeIndex, paused]);

    const spring: Transition = {
        type: 'spring',
        damping: 18,
        stiffness: 90,
        mass: 1,
    };

    return (
        <div
            style={{ position: 'relative', width: '100%', padding: 'var(--space-12) 0', overflow: 'hidden' }}
        >
            {/* Card stage */}
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                position: 'relative', height: '460px',
            }}>
                {testimonials.map((t, index) => {
                    let offset = index - activeIndex;
                    if (offset < -1) offset += testimonials.length;
                    if (offset > 1) offset -= testimonials.length;
                    if (offset < -1 || offset > 1) return null;

                    const isActive = offset === 0;
                    const isLeft = offset === -1;
                    const isRight = offset === 1;

                    return (
                        <motion.div
                            key={index}
                            animate={{
                                x: isActive ? 0 : isLeft ? '-82%' : '82%',
                                scale: isActive ? 1 : 0.8,
                                opacity: isActive ? 1 : 0.22,
                                filter: isActive
                                    ? 'blur(0px) grayscale(0%) saturate(100%)'
                                    : 'blur(5px) grayscale(100%) saturate(0%)',
                            }}
                            transition={spring}
                            onClick={() => { if (isLeft) prev(); if (isRight) next(); }}
                            onMouseEnter={() => { if (isActive) setPaused(true); }}
                            onMouseLeave={() => { if (isActive) { setPaused(false); setProgress(0); } }}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                maxWidth: '660px',
                                zIndex: isActive ? 10 : 5,
                                cursor: isActive ? 'default' : 'pointer',
                            }}
                        >
                            <div style={{
                                background: isActive
                                    ? 'linear-gradient(145deg, #141209 0%, #0e0c08 100%)'
                                    : 'rgba(10,10,11,0.35)',
                                border: 'none',
                                borderRadius: '20px',
                                padding: 'var(--space-10)',
                                boxShadow: isActive
                                    ? '0 0 0 1px rgba(212,175,106,0.18), 0 32px 64px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.5), 0 0 80px rgba(212,175,106,0.03)'
                                    : 'none',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'box-shadow 0.5s ease',
                            }}>
                                {/* Subtle gold top-edge glow on active */}
                                {isActive && (
                                    <div style={{
                                        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.4), transparent)',
                                        pointerEvents: 'none',
                                    }} />
                                )}

                                {/* Decorative quote with momentum breaking physics */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : 60,
                                        opacity: isActive ? 0.4 : 0
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 600,
                                        damping: 10, // low damping forces overshoot/bounce back effect
                                        mass: 0.8,
                                        delay: isActive ? 0.1 : 0
                                    }}
                                    style={{
                                        position: 'absolute', top: '24px', right: '28px',
                                        color: 'var(--color-gold-bright)',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Quote size={80} strokeWidth={2} />
                                </motion.div>

                                {/* Stars */}
                                <div style={{ display: 'flex', gap: 3, marginBottom: 'var(--space-7)' }}>
                                    {[...Array(5)].map((_, s) => (
                                        <span key={s} style={{
                                            color: isActive ? 'var(--color-gold-bright)' : 'var(--color-text-tertiary)',
                                            fontSize: isActive ? '1rem' : '0.75rem',
                                            transition: 'all 0.4s ease',
                                            textShadow: isActive ? '0 0 8px rgba(212,175,106,0.5)' : 'none',
                                        }}>★</span>
                                    ))}
                                </div>

                                {/* Quote text */}
                                <p style={{
                                    fontSize: isActive ? 'clamp(1rem, 1.6vw, 1.2rem)' : '0.9rem',
                                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                                    lineHeight: 1.75,
                                    marginBottom: 'var(--space-8)',
                                    fontWeight: isActive ? 450 : 400,
                                    fontStyle: isActive ? 'italic' : 'normal',
                                    transition: 'color 0.4s ease, font-size 0.4s ease',
                                }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>

                                {/* Divider */}
                                <div style={{
                                    width: '100%', height: '1px',
                                    background: isActive
                                        ? 'linear-gradient(90deg, transparent, rgba(212,175,106,0.2), transparent)'
                                        : 'rgba(255,255,255,0.03)',
                                    marginBottom: 'var(--space-6)',
                                    transition: 'background 0.4s ease',
                                }} />

                                {/* Author */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                    <div style={{
                                        width: isActive ? 50 : 40, height: isActive ? 50 : 40,
                                        borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                                        boxShadow: isActive ? '0 0 0 2px var(--color-gold-bright), 0 0 16px rgba(212,175,106,0.2)' : 'none',
                                        background: 'var(--color-bg-border)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.4s ease',
                                    }}>
                                        {t.avatar ? (
                                            <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ color: 'var(--color-gold-bright)', fontWeight: 800, fontSize: 'var(--text-base)' }}>
                                                {t.name ? t.name.charAt(0) : '?'}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <div style={{
                                            fontWeight: 700,
                                            fontSize: isActive ? 'var(--text-base)' : 'var(--text-sm)',
                                            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                            transition: 'color 0.4s ease',
                                        }}>{t.name}</div>
                                        <div style={{
                                            fontSize: '0.7rem',
                                            color: isActive ? 'var(--color-gold-bright)' : 'var(--color-text-tertiary)',
                                            marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.12em',
                                            transition: 'color 0.4s ease',
                                        }}>{t.role} · {t.company}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Controls row */}
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                gap: 'var(--space-5)', marginTop: 'var(--space-6)',
            }}>
                {/* Prev */}
                <button
                    onClick={prev}
                    aria-label="Previous"
                    style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-text-tertiary)', cursor: 'pointer',
                        transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,106,0.4)'; e.currentTarget.style.color = 'var(--color-gold-bright)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Progress pills */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {testimonials.map((_, i) => {
                        const isA = i === activeIndex;
                        return (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Testimonial ${i + 1}`}
                                style={{
                                    position: 'relative', overflow: 'hidden',
                                    width: isA ? 40 : 6, height: 6,
                                    borderRadius: 9999,
                                    background: isA ? 'rgba(212,175,106,0.15)' : 'rgba(255,255,255,0.1)',
                                    border: 'none', cursor: 'pointer',
                                    transition: 'width 0.4s ease, background 0.3s ease',
                                }}
                            >
                                {/* Live progress fill on active pill */}
                                {isA && (
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, bottom: 0,
                                        width: `${progress}%`,
                                        background: 'var(--color-gold-bright)',
                                        borderRadius: 9999,
                                        boxShadow: '0 0 8px rgba(212,175,106,0.6)',
                                        transition: 'width 0.05s linear',
                                    }} />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Next */}
                <button
                    onClick={next}
                    aria-label="Next"
                    style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-text-tertiary)', cursor: 'pointer',
                        transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,106,0.4)'; e.currentTarget.style.color = 'var(--color-gold-bright)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Pause hint */}
            {paused && (
                <p style={{
                    textAlign: 'center', marginTop: 'var(--space-3)',
                    fontSize: '0.65rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'var(--color-text-tertiary)',
                }}>
                    Paused
                </p>
            )}
        </div>
    );
}
