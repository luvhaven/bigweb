/**
 * Design Tokens — BIGWEB Digital
 * ─────────────────────────────────
 * Single source of truth for all visual design decisions.
 * These tokens are consumed by Tailwind config and components.
 *
 * Principle: Two brand colors + semantic tokens.
 * Accent (gold) for premium/warmth. Electric for action/urgency.
 * All other UI is black, white, and zinc scale.
 */

// ─── Brand Colors ───
export const BRAND = {
    /** Primary accent — warm gold. Use for: highlights, CTAs, hover states */
    accent: '#d4a853',
    /** Electric — coolest blue/violet. Use for: data, tech, secondary CTA */
    electric: '#6366f1',
    /** Background — near-black with warmth */
    bg: '#0a0a0a',
    /** Surface — slightly lighter for cards */
    surface: '#0d0d0d',
    /** Surface elevated — for modals, overlays */
    surfaceElevated: '#141414',
} as const

// ─── Typography Scale ───
export const TYPE_SCALE = {
    /** Hero display — CinematicHero H1 */
    display: {
        size: 'clamp(3.5rem, 9vw, 8rem)',
        lineHeight: '0.94',
        letterSpacing: '-0.03em',
        weight: '900',
        font: 'var(--font-display)',
    },
    /** Section headline — H2 */
    heading1: {
        size: 'clamp(2.5rem, 5vw, 5rem)',
        lineHeight: '1.05',
        letterSpacing: '-0.025em',
        weight: '800',
    },
    /** Card headline — H3 */
    heading2: {
        size: 'clamp(1.5rem, 2.5vw, 2.25rem)',
        lineHeight: '1.15',
        letterSpacing: '-0.02em',
        weight: '700',
    },
    /** Subheadline / intro paragraph */
    body: {
        size: 'clamp(1rem, 1.2vw, 1.125rem)',
        lineHeight: '1.75',
        weight: '400',
    },
    /** Small body / descriptions */
    small: {
        size: '0.875rem',
        lineHeight: '1.65',
        weight: '400',
    },
    /** Mono / labels / tags */
    label: {
        size: '0.625rem',
        lineHeight: '1',
        letterSpacing: '0.2em',
        weight: '500',
        font: 'var(--font-mono)',
    },
} as const

// ─── Spacing Scale (4px baseline grid) ───
export const SPACING = {
    px: '1px',
    '0.5': '2px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
    '24': '96px',
    '32': '128px',
    '40': '160px',
    /** Section vertical padding — desktop */
    sectionY: '160px',
    /** Section vertical padding — mobile */
    sectionYSm: '112px',
    /** Container horizontal padding */
    containerX: '96px',
    containerXSm: '24px',
} as const

// ─── Border Radius ───
export const RADIUS = {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
} as const

// ─── Shadows ───
export const SHADOWS = {
    /** Subtle card depth */
    card: '0 1px 3px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)',
    /** Accent glow — use on featured elements */
    glow: '0 0 30px rgba(212,168,83,0.15), 0 0 60px rgba(212,168,83,0.08)',
    /** Section depth */
    section: '0 25px 50px -12px rgba(0,0,0,0.8)',
} as const

// ─── Transition Easing ───
export const EASING = {
    /** Standard smooth ease */
    smooth: [0.16, 1, 0.3, 1] as const,
    /** Snappy response for hover */
    snap: [0.2, 0, 0.3, 1] as const,
    /** Dramatic cinematic entrance */
    cinematic: [0.65, 0, 0.35, 1] as const,
    /** Spring-like overshoot */
    spring: [0.34, 1.56, 0.64, 1] as const,
} as const

// ─── Animation Durations ───
export const DURATION = {
    instant: 0.1,
    fast: 0.2,
    normal: 0.4,
    slow: 0.7,
    cinematic: 1.0,
    dramatic: 1.5,
} as const

// ─── z-index stack ───
export const Z_INDEX = {
    base: 0,
    raised: 10,
    dropdown: 20,
    sticky: 30,
    overlay: 40,
    modal: 50,
    toast: 60,
    cursor: 70,
    preloader: 100,
} as const

// ─── Breakpoints (matches Tailwind defaults) ───
export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const

// Type exports for component props
export type BrandColor = keyof typeof BRAND
export type SpacingKey = keyof typeof SPACING
export type EasingKey = keyof typeof EASING
