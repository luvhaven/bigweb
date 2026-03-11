'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, ArrowRight } from 'lucide-react'

/* ─── Fallback projects ─── */
const FALLBACK_PROJECTS = [
  {
    id: 'velocity-engine',
    slug: 'velocity-engine',
    title: 'Velocity Engine',
    category: 'Fintech · Revenue System',
    tagline: 'The fintech that moved money at the speed of thought.',
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
    cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
    accent: '#ec4899',
    results: [{ label: 'No-show Reduction', value: '-61%' }, { label: 'NPS Score', value: '+48pts' }],
  },
]

function normalizeProject(p: any, fallback: (typeof FALLBACK_PROJECTS)[0]) {
  const accent = p.accent || p.accentColor || (Array.isArray(p.tech_stack) && p.tech_stack[0]) || fallback.accent
  const img = p.cover_image_url || p.hero_image_url || p.thumbnail_url || fallback.cover_image_url
  const tag = p.tagline || p.summary || p.outcome || fallback.tagline
  const yr = p.year ? p.year
    : (p.published_at && !isNaN(new Date(p.published_at).getTime()))
      ? String(new Date(p.published_at).getFullYear()) : fallback.year
  let results: { label: string; value: string }[] = []
  if (Array.isArray(p.results) && p.results.length > 0) {
    results = p.results.slice(0, 2).map((r: any) =>
      typeof r === 'object' ? { label: r.label || '', value: r.value || '' } : { label: '', value: String(r) }
    )
  }
  return {
    id: p.id || fallback.id,
    slug: p.slug || fallback.slug,
    title: p.title || fallback.title,
    category: p.category || fallback.category,
    tagline: tag,
    cover_image_url: img,
    year: yr,
    accent,
    results,
  }
}

/* ─── Metric badge ─── */
function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/[0.06]">
      <TrendingUp size={10} style={{ color }} />
      <span className="text-[11px] font-bold text-white tabular-nums">{value}</span>
      <span className="text-[9px] text-zinc-500">{label}</span>
    </div>
  )
}

/* ─── Individual sticky card ─── */
function StickyCard({
  project: p,
  index,
  total,
}: {
  project: ReturnType<typeof normalizeProject>
  index: number
  total: number
}) {
  const [hovered, setHovered] = useState(false)

  // Each card sticks at a slightly different top offset to create the stack effect
  const stickyTop = `${8 + index * 12}px`

  return (
    <div
      className="sticky"
      style={{ top: stickyTop, zIndex: index + 1 }}
    >
      <div
        className="mx-auto w-full transition-all duration-700 ease-out"
        style={{
          maxWidth: `${1440 - index * 0}px`,
          // Cards behind (lower index) shrink and darken as new cards stack over them
          // This is driven by CSS custom props — JS will update them on scroll
        }}
      >
        <Link
          href={`/case-studies/${p.slug}`}
          id={`portfolio-card-${index}`}
          className="ep-card relative flex rounded-[2rem] overflow-hidden bg-[#080808] border border-white/[0.07] shadow-[0_40px_120px_rgba(0,0,0,0.85)] group"
          style={{
            height: '80vh',
            willChange: 'transform',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Full bg image */}
          {p.cover_image_url && (
            <img
              src={p.cover_image_url}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: hovered ? 'scale(1.06)' : 'scale(1.02)',
                filter: hovered ? 'brightness(0.5) saturate(1.1)' : 'brightness(0.28) saturate(0.8)',
                transition: 'transform 2s ease-out, filter 0.8s ease',
              }}
            />
          )}

          {/* Left content panel */}
          <div
            className="absolute inset-0 flex"
            style={{ zIndex: 2 }}
          >
            <div
              className="w-full md:w-[52%] h-full flex flex-col justify-between p-8 md:p-12 lg:p-16"
              style={{
                background: 'linear-gradient(108deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.85) 65%, transparent 100%)',
              }}
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: p.accent, boxShadow: `0 0 8px ${p.accent}80` }}
                  />
                  <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: p.accent }}>
                    {p.category}
                  </span>
                </div>
                <span className="hidden md:inline-flex text-[10px] font-mono tracking-[0.2em] text-white/20 px-3 py-1.5 rounded-full border border-white/[0.05]">
                  {p.year}
                </span>
              </div>

              {/* Center */}
              <div className="flex-1 flex flex-col justify-center py-8">
                <h3
                  className="font-display text-4xl md:text-5xl lg:text-[64px] xl:text-[72px] text-white leading-[1.0] tracking-tight mb-5"
                >
                  {p.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base lg:text-[17px] leading-relaxed max-w-md hidden sm:block">
                  {p.tagline}
                </p>
              </div>

              {/* Bottom */}
              <div className="flex flex-col gap-5">
                {p.results.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.results.map((r, ri) => (
                      <Metric key={ri} label={r.label} value={r.value} color={p.accent} />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                    style={{
                      background: p.accent,
                      transform: hovered ? 'scale(1.14) rotate(-8deg)' : 'scale(1)',
                    }}
                  >
                    <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-600 uppercase tracking-[0.25em] font-mono mb-0.5">Deep dive</p>
                    <p className="text-sm font-bold tracking-[0.15em] uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                      Explore Case Study
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] z-[3] transition-opacity duration-700"
            style={{
              background: `linear-gradient(90deg, ${p.accent}00 5%, ${p.accent} 35%, ${p.accent} 65%, ${p.accent}00 95%)`,
              opacity: hovered ? 1 : 0.2,
            }}
          />

          {/* Big decorative number */}
          <span
            className="absolute bottom-6 right-8 font-mono font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: 'clamp(80px, 12vw, 140px)',
              color: `${p.accent}06`,
              zIndex: 1,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </Link>
      </div>
    </div>
  )
}

/* ─── Main export ─── */
export default function ElitePortfolio({
  title = 'Selected Work',
  showViewAll = true,
  initialProjects = [],
}: {
  title?: string
  showViewAll?: boolean
  initialProjects?: any[]
}) {
  const raw = initialProjects.length > 0 ? initialProjects : FALLBACK_PROJECTS
  const projects = raw.map((p, i) => normalizeProject(p, FALLBACK_PROJECTS[i % FALLBACK_PROJECTS.length]))

  return (
    <section className="bg-[#020202] text-white">
      {/* Section header */}
      <div className="relative pt-24 md:pt-32 pb-16 px-6 lg:px-16 container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-accent">{title}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] tracking-tight leading-[1.05] text-white">
              Engineered{' '}
              <em className="not-italic text-zinc-600 font-display">for impact.</em>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs lg:text-right">
            Every project is a business transformation. Scroll to explore.
          </p>
        </div>
      </div>

      {/* Stacking cards — pure CSS sticky */}
      <div className="px-4 md:px-8 lg:px-12 pb-0 space-y-4">
        {projects.map((p, i) => (
          <StickyCard key={p.id} project={p} index={i} total={projects.length} />
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-[#020202] py-24 px-6 lg:px-16 container mx-auto">
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
