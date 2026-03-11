'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, ArrowRight } from 'lucide-react'

/* ─── Fallback project data ─── */
const FALLBACK_PROJECTS = [
  {
    id: 'velocity-engine',
    slug: 'velocity-engine',
    title: 'Velocity Engine',
    category: 'Fintech · Revenue System',
    tagline: 'The fintech that moved money at the speed of thought.',
    description: 'Re-engineered the entire transaction flow for a Series B fintech — sub-second settlement, 3× throughput, and a UI that converted skeptical CFOs into champions.',
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
    accent: '#10b981',
    results: [{ label: 'Transaction Speed', value: '-82%' }, { label: 'Revenue Impact', value: '+$2.4M' }],
  },
  {
    id: 'nexus-flow',
    slug: 'nexus-flow',
    title: 'Nexus Flow',
    category: 'SaaS · Conversion Strategy',
    tagline: 'A SaaS pricing page that became a growth engine.',
    description: 'Pricing architecture overhaul that turned a leaky funnel into a precision acquisition machine. 127% increase in enterprise upgrades in quarter one.',
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    year: '2024',
    accent: '#6366f1',
    results: [{ label: 'Enterprise Upgrades', value: '+127%' }, { label: 'Churn Reduction', value: '-34%' }],
  },
  {
    id: 'elevate-commerce',
    slug: 'elevate-commerce',
    title: 'Elevate Commerce',
    category: 'Luxury Retail · Ecommerce',
    tagline: 'Luxury commerce that commands premium prices.',
    description: 'Immersive commerce architecture that took a boutique brand from six figures to eight-figure annual revenue.',
    cover_image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    year: '2025',
    accent: '#d4a853',
    results: [{ label: 'Conversion Rate', value: '+340%' }, { label: 'AOV Increase', value: '+67%' }],
  },
  {
    id: 'vanguard-capital',
    slug: 'vanguard-capital',
    title: 'Vanguard Capital',
    category: 'Institutional Finance · Brand',
    tagline: '$18M in institutional commitments from a digital presence.',
    description: 'High-authority digital identity translating track record into institutional respect — and capital allocation.',
    cover_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
    accent: '#f59e0b',
    results: [{ label: 'Lead Quality', value: '+210%' }, { label: 'Commitments', value: '$18M' }],
  },
  {
    id: 'meridian-health',
    slug: 'meridian-health',
    title: 'Meridian Health',
    category: 'HealthTech · Product Design',
    tagline: 'Digital trust in an industry where trust saves lives.',
    description: 'Patient-facing platform that reduced appointment no-show rates by 61% through precision UX design.',
    cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
    accent: '#ec4899',
    results: [{ label: 'No-show Reduction', value: '-61%' }, { label: 'NPS Score', value: '+48pts' }],
  },
]

/* Normalize raw DB row → uniform shape */
function normalizeProject(p: any, fallback: (typeof FALLBACK_PROJECTS)[0]) {
  const accent =
    p.accent ||
    p.accentColor ||
    (p.tech_stack && p.tech_stack.length > 0 ? p.tech_stack[0] : fallback.accent)
  const img = p.cover_image_url || p.hero_image_url || p.thumbnail_url || p.image || fallback.cover_image_url
  const tag = p.tagline || p.summary || p.outcome || fallback.tagline
  const desc = p.description || p.solution || p.challenge || tag
  const yr = p.year
    ? p.year
    : p.published_at && !isNaN(new Date(p.published_at).getTime())
    ? String(new Date(p.published_at).getFullYear())
    : fallback.year

  const rawResults = p.results
  let results: { label: string; value: string }[] = []
  if (Array.isArray(rawResults) && rawResults.length > 0) {
    results = rawResults.slice(0, 2).map((r: any) =>
      typeof r === 'object' ? { label: r.label || r.metric || '', value: r.value || '' } : { label: '', value: String(r) }
    )
  }

  return {
    id: p.id || p.slug || fallback.id,
    slug: p.slug || fallback.slug,
    title: p.title || fallback.title,
    category: p.category || p.industry || fallback.category,
    tagline: tag,
    description: desc,
    cover_image_url: img,
    year: yr,
    accent,
    results,
  }
}

/* ─── Result badge ─── */
function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/[0.07]">
      <TrendingUp size={11} style={{ color }} />
      <span className="text-[11px] font-bold text-white tabular-nums">{value}</span>
      <span className="text-[9px] text-zinc-500">{label}</span>
    </div>
  )
}

/* ─── Main component ─── */
export default function ElitePortfolio({
  title = 'Selected Work',
  showViewAll = true,
  initialProjects = [],
}: {
  title?: string
  showViewAll?: boolean
  initialProjects?: any[]
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)   // outer wrapper — sets scroll height
  const stickyRef = useRef<HTMLDivElement>(null)    // sticky viewport stage
  const [ready, setReady] = useState(false)

  // Normalise projects
  const raw = initialProjects.length > 0 ? initialProjects : FALLBACK_PROJECTS
  const projects = raw.map((p, i) => normalizeProject(p, FALLBACK_PROJECTS[i % FALLBACK_PROJECTS.length]))
  const count = projects.length

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    gsap.registerPlugin(ScrollTrigger)

    const cards = gsap.utils.toArray<HTMLElement>('.ep-card')
    if (cards.length === 0) return

    // ── Constants ──────────────────────────────────────────────
    const REST_SCALE = 0.72       // final resting scale (72% of viewport width — clearly visible)
    const ENTER_SCALE = 1.18      // start scale: wider than screen
    const STACK_DY = 20           // px each stacked card shifts upward
    const SCRUB = 0.9

    // Initial state: all cards invisible
    gsap.set(cards, { opacity: 0, scale: ENTER_SCALE, y: '100vh' })

    // Card 0: starts at center, just scaled up & invisible
    gsap.set(cards[0], { y: 0, scale: ENTER_SCALE, opacity: 0 })

    // ── Build timeline pinned to wrapper ──────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        // Each card gets 100vh of scroll distance; last card also has 60vh "hold" after stacking
        end: `+=${count * 100 + 60}vh`,
        pin: stickyRef.current,
        pinSpacing: false,           // wrapper provides spacing via its own height
        scrub: SCRUB,
        anticipatePin: 1,
      },
    })

    cards.forEach((card, i) => {
      const isLast = i === count - 1
      const prevCards = cards.slice(0, i)

      if (i === 0) {
        // Card 0: animate in (scale down + fade in)
        tl.to(card, {
          opacity: 1,
          scale: REST_SCALE,
          y: 0,
          ease: 'power2.out',
          duration: 1,
        }, 0)
      } else {
        // Subsequent cards slide up from below + (unless last) zoom out to REST_SCALE
        tl.to(card, {
          opacity: 1,
          scale: isLast ? REST_SCALE : REST_SCALE,   // last already set correctly
          y: `${-(i) * STACK_DY}px`,                 // small upward shift per layer
          ease: 'power2.out',
          duration: 1,
        }, i)   // each card enters at its own label = i seconds into timeline

        // As card i arrives, push all previous cards slightly further up/darker
        if (prevCards.length > 0) {
          prevCards.forEach((prev, pi) => {
            const depth = i - pi                     // how many layers deep
            tl.to(prev, {
              scale: REST_SCALE - depth * 0.04,      // stack compression
              y: `${-(i) * STACK_DY + pi * STACK_DY - depth * 8}px`,
              filter: `brightness(${Math.max(0.25, 1 - depth * 0.22)})`,
              ease: 'power1.out',
              duration: 1,
            }, i)
          })
        }
      }
    })

    // Hold the completed stack for a moment before unpinning
    tl.to({}, { duration: 0.6 })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [ready, count])

  return (
    <section className="relative bg-[#020202] text-white">
      {/* Section intro — above the pinned stage */}
      <div className="relative pt-24 md:pt-32 pb-10 px-6 lg:px-16 container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-accent">{title}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[68px] tracking-tight leading-[1.05] text-white">
              Engineered{' '}
              <em className="not-italic text-zinc-500 font-display">for impact.</em>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs lg:text-right">
            Every project is a business transformation — not just a website. Scroll to explore the work.
          </p>
        </div>
      </div>

      {/* ── Scroll container ───────────────────────────────────
          Height = (count * 100vh) + 60vh hold + the viewport itself.
          The sticky stage sits at top:0.
      */}
      <div
        ref={wrapperRef}
        style={{ height: `${count * 100 + 60}vh` }}
        className="relative"
      >
        {/* Sticky viewport stage */}
        <div
          ref={stickyRef}
          className="sticky top-0 w-full h-screen overflow-hidden"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* ── Footer row ─────────────────────────────────────── */}
      <div className="relative z-10 bg-[#020202] py-20 px-6 lg:px-16 container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.04]">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-700">
            {projects.length} elite transformations
          </p>
          {showViewAll && (
            <Link
              href="/case-studies"
              className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group px-6 py-3 rounded-full border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02]"
            >
              View Full Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── Individual card ─── */
function ProjectCard({ project: p, index: i }: { project: ReturnType<typeof normalizeProject>; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="ep-card absolute inset-0 flex items-center justify-center px-4 md:px-10 will-change-transform"
      style={{ zIndex: i + 1 }}
    >
      {/*
        Card itself: max-width keeps it from ever spanning 100% — the GSAP
        scale handles the "bigger than screen" feel on entry.
      */}
      <Link
        href={`/case-studies/${p.slug}`}
        className="relative w-full max-w-[1500px] h-[80vh] rounded-[2rem] overflow-hidden flex bg-[#080808] border border-white/[0.07] shadow-[0_40px_100px_rgba(0,0,0,0.8)] group"
        style={{ willChange: 'transform, filter, opacity' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ── Full-bleed background image ── */}
        {p.cover_image_url && (
          <img
            src={p.cover_image_url}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
            style={{
              transform: hovered ? 'scale(1.07)' : 'scale(1.02)',
              filter: hovered ? 'brightness(0.5) saturate(1.15)' : 'brightness(0.3) saturate(0.75)',
            }}
          />
        )}

        {/* ── Two-column layout overlay ── */}
        {/* Left column: dark frosted glass text panel */}
        <div className="absolute inset-0 flex z-[2]">
          {/* Left 55% — content */}
          <div
            className="w-[55%] md:w-[50%] h-full flex flex-col justify-between p-8 md:p-12 lg:p-16"
            style={{
              background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 70%, transparent 100%)',
              backdropFilter: 'blur(1px)',
            }}
          >
            {/* Top meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: p.accent }} />
                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: p.accent }}>
                  {p.category}
                </span>
              </div>
              <span className="hidden md:flex text-[10px] font-mono tracking-[0.2em] text-white/25 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.015]">
                {p.year}
              </span>
            </div>

            {/* Middle — Title & tagline */}
            <div className="flex-1 flex flex-col justify-center py-8">
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-[68px] text-white leading-[1.02] tracking-tight mb-5">
                {p.title}
              </h3>
              <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg hidden sm:block">
                {p.tagline}
              </p>
            </div>

            {/* Bottom — metrics + CTA */}
            <div className="flex flex-col gap-5">
              {p.results.length > 0 && (
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {p.results.map((r, ri) => (
                    <Metric key={ri} label={r.label} value={r.value} color={p.accent} />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 group/cta">
                <div
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                  style={{
                    background: p.accent,
                    transform: hovered ? 'scale(1.14) rotate(-6deg)' : 'scale(1)',
                  }}
                >
                  <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-mono mb-0.5">Deep dive</p>
                  <p className="text-sm font-bold tracking-[0.15em] uppercase text-white/80 group-hover/cta:text-white transition-colors duration-300">
                    Explore Case Study
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 45% — image focus indicator */}
          <div className="flex-1 relative">
            {/* Right-side subtle gradient to blend edge */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />
          </div>
        </div>

        {/* ── Top accent glow line ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] z-[4] transition-opacity duration-700"
          style={{
            background: `linear-gradient(90deg, ${p.accent}00 0%, ${p.accent} 30%, ${p.accent} 70%, ${p.accent}00 100%)`,
            opacity: hovered ? 0.9 : 0.25,
          }}
        />

        {/* ── Bottom edge glow ── */}
        <div
          className="absolute bottom-0 left-[10%] right-[10%] h-[1px] z-[4] transition-opacity duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)`,
            opacity: hovered ? 0.6 : 0,
          }}
        />

        {/* ── Card number — editorial flair ── */}
        <span className="absolute bottom-8 right-10 font-mono text-[120px] font-black leading-none select-none z-[1] pointer-events-none"
          style={{ color: `${p.accent}08` }}>
          {String(i + 1).padStart(2, '0')}
        </span>
      </Link>
    </div>
  )
}
