'use client'

/**
 * SectionAtmosphere — Per-section ambient lighting & motion system
 * ────────────────────────────────────────────────────────
 * Drop this inside any section to give it a unique visual atmosphere.
 * Now upgraded with AmbientCanvas for floating particles and dynamic grid.
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AmbientCanvas from './AmbientCanvas'

type AtmospherePreset =
    | 'warm'       // gold/amber
    | 'cool'       // deep indigo
    | 'emerald'    // soft green
    | 'neutral'    // pure dark 
    | 'gradient'   // dramatic sweep

interface SectionAtmosphereProps {
    preset?: AtmospherePreset
    intensity?: number   // 0–1, default 1
    parallax?: boolean   // scroll-parallax the glow orb
    particles?: boolean  // enable AmbientCanvas floating particles
    className?: string
}

const PRESETS: Record<AtmospherePreset, {
    orb1: { color: string; hex: string; x: string; y: string; size: string }
    orb2: { color: string; x: string; y: string; size: string }
    topLine: string
    grainOpacity: number
}> = {
    warm: {
        orb1: { color: 'rgba(212,168,83,0.06)', hex: 'rgba(212,168,83,', x: '80%', y: '20%', size: '800px' },
        orb2: { color: 'rgba(212,168,83,0.03)', x: '20%', y: '80%', size: '600px' },
        topLine: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.15), transparent)',
        grainOpacity: 0.025,
    },
    cool: {
        orb1: { color: 'rgba(99,102,241,0.07)', hex: 'rgba(99,102,241,', x: '15%', y: '30%', size: '700px' },
        orb2: { color: 'rgba(99,102,241,0.03)', x: '85%', y: '70%', size: '500px' },
        topLine: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.12), transparent)',
        grainOpacity: 0.02,
    },
    emerald: {
        orb1: { color: 'rgba(16,185,129,0.05)', hex: 'rgba(16,185,129,', x: '50%', y: '0%', size: '800px' },
        orb2: { color: 'rgba(16,185,129,0.03)', x: '85%', y: '100%', size: '400px' },
        topLine: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.10), transparent)',
        grainOpacity: 0.022,
    },
    neutral: {
        orb1: { color: 'rgba(255,255,255,0.02)', hex: 'rgba(255,255,255,', x: '30%', y: '50%', size: '900px' },
        orb2: { color: 'rgba(255,255,255,0.015)', x: '70%', y: '50%', size: '600px' },
        topLine: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
        grainOpacity: 0.018,
    },
    gradient: {
        orb1: { color: 'rgba(212,168,83,0.05)', hex: 'rgba(212,168,83,', x: '100%', y: '0%', size: '1000px' },
        orb2: { color: 'rgba(99,102,241,0.04)', x: '0%', y: '100%', size: '700px' },
        topLine: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.08), rgba(99,102,241,0.08), transparent)',
        grainOpacity: 0.03,
    },
}

export default function SectionAtmosphere({
    preset = 'neutral',
    intensity = 1,
    parallax = false,
    particles = true,
    className = '',
}: SectionAtmosphereProps) {
    const config = PRESETS[preset]
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

    const orbStyle1 = {
        background: `radial-gradient(circle at center, ${config.orb1.color}, transparent 70%)`,
        width: config.orb1.size,
        height: config.orb1.size,
        left: config.orb1.x,
        top: config.orb1.y,
        transform: 'translate(-50%, -50%)',
        opacity: intensity,
    }

    const orbStyle2 = {
        background: `radial-gradient(circle at center, ${config.orb2.color}, transparent 70%)`,
        width: config.orb2.size,
        height: config.orb2.size,
        left: config.orb2.x,
        top: config.orb2.y,
        transform: 'translate(-50%, -50%)',
        opacity: intensity,
    }

    return (
        <div
            ref={ref}
            aria-hidden
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
            {/* Ambient Animated Canvas */}
            {particles && (
                <AmbientCanvas grid={true} orbColor={config.orb1.hex} particleCount={30} />
            )}

            {/* Top separator line with color temperature */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: config.topLine }}
            />

            {/* Primary glow orb */}
            <motion.div
                className="absolute rounded-full blur-[120px]"
                style={{ ...orbStyle1, ...(parallax ? { y: orbY } : {}) }}
            />

            {/* Secondary glow orb */}
            <motion.div
                className="absolute rounded-full blur-[100px]"
                style={orbStyle2}
            />

            {/* Film grain texture layer */}
            <div
                className="absolute inset-0 mix-blend-overlay opacity-30"
                style={{
                    opacity: config.grainOpacity * intensity,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}
