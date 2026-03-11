'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BrandLogo from '@/components/branding/BrandLogo'
import { useGlobalContent } from '@/context/GlobalContentContext'
import { ChevronDown, ArrowRight, X, ExternalLink } from 'lucide-react'

// ── Navigation structure ──────────────────────────────────────────────────────
const NAV_LINKS = [
  {
    label: 'Work',
    href: '/case-studies',
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Website Engineering', href: '/services/web-development', desc: 'Full-stack builds that perform' },
      { label: 'Revenue Systems', href: '/services/revenue-systems', desc: 'End-to-end growth architecture' },
      { label: 'Funnel Architecture', href: '/services/funnel-architecture', desc: 'Convert at every touchpoint' },
      { label: 'Conversion Optimization', href: '/services/conversion-optimization', desc: 'Data-backed CRO at scale' },
      { label: 'Performance & Trust', href: '/services/trust-optimization', desc: 'Speed, security, authority' },
    ],
  },
  {
    label: 'Packages',
    href: '/#pricing',
    children: [
      { label: 'Revenue Roadmap', href: '/offers/revenue-roadmap', desc: 'Expert strategy & audit', tag: 'Popular' },
      { label: 'Fix Sprint', href: '/offers/fix-sprint', desc: 'Quick, surgical performance gains' },
      { label: 'Growth Retainer', href: '/offers/retainer', desc: 'Ongoing optimization partner' },
      { label: 'Revenue System', href: '/offers/revenue-system', desc: 'End-to-end website + growth', tag: 'Best Value' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// ── Ease ──────────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

export default function AdvancedNavigation() {
  const pathname = usePathname()
  const { settings } = useGlobalContent() || { settings: {} }

  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 32)
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress(h > 0 ? (y / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close menus on route change ───────────────────────────────────────────
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  // ── Dropdown handlers ─────────────────────────────────────────────────────
  const handleEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenMenu(label)
  }, [])

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 180)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      if (pathname === '/') {
        e.preventDefault()
        document.getElementById(href.replace('/#', ''))?.scrollIntoView({ behavior: 'smooth' })
      }
      setMobileOpen(false)
    }
  }

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  if (!mounted) return null

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'py-2.5 bg-[#060606]/80 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
            : 'py-5 bg-transparent'
        }`}
      >
        {/* Scroll-progress bar */}
        <div
          className="absolute top-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent z-50 transition-transform duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Frosted glow seam when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        )}

        <div className="max-w-screen-xl mx-auto px-5 md:px-10 flex items-center gap-8">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link href="/" className="relative z-50 shrink-0 flex items-center">
            <BrandLogo variant="full" />
          </Link>

          {/* ── Vertical divider ─────────────────────────────────────────── */}
          <div className="hidden lg:block h-4 w-px bg-white/10 shrink-0" />

          {/* ── Desktop nav links ─────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href !== '/' &&
                link.href !== '/#pricing' &&
                (pathname === link.href || pathname?.startsWith(link.href + '/'))

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && handleEnter(link.label)}
                  onMouseLeave={() => link.children && handleLeave()}
                >
                  {/* Nav link */}
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative flex items-center gap-1 px-4 py-2 rounded-xl text-[12px] font-semibold tracking-[0.04em] uppercase transition-all duration-300 group ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-500 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Active pill */}
                    {isActive && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 bg-white/[0.06] rounded-xl"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}

                    <span className="relative z-10">{link.label}</span>

                    {link.children && (
                      <ChevronDown
                        className={`w-3 h-3 relative z-10 text-zinc-600 transition-transform duration-300 ${
                          openMenu === link.label ? 'rotate-180 text-accent' : ''
                        }`}
                      />
                    )}

                    {/* Hover underline */}
                    {!isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    )}
                  </Link>

                  {/* ── Dropdown ─────────────────────────────────────────── */}
                  <AnimatePresence>
                    {link.children && openMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="absolute top-full left-0 pt-3 min-w-[280px]"
                        onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }}
                        onMouseLeave={handleLeave}
                      >
                        <div className="relative bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/[0.07] rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                          {/* Top accent line */}
                          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent rounded-full" />

                          {link.children.map((child: any) => {
                            const childActive = pathname === child.href
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`group/item flex items-start justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                  childActive ? 'bg-white/[0.05]' : 'hover:bg-white/[0.04]'
                                }`}
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[13px] font-medium transition-colors duration-200 truncate ${childActive ? 'text-white' : 'text-zinc-300 group-hover/item:text-white'}`}>
                                      {child.label}
                                    </span>
                                    {child.tag && (
                                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20">
                                        {child.tag}
                                      </span>
                                    )}
                                  </div>
                                  {child.desc && (
                                    <span className="block text-[11px] text-zinc-600 mt-0.5 group-hover/item:text-zinc-500 transition-colors">
                                      {child.desc}
                                    </span>
                                  )}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-accent/0 group-hover/item:text-accent/80 transition-all duration-200 shrink-0 mt-0.5 -translate-x-1 group-hover/item:translate-x-0" />
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          {/* ── Desktop CTAs ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 ml-auto shrink-0">
            {/* Secondary — ghost */}
            <Link
              href="/case-studies"
              className="group px-4 py-2 text-[11px] font-semibold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors duration-300 rounded-xl hover:bg-white/[0.04]"
            >
              View Work
            </Link>

            {/* Primary — white pill */}
            <Link
              href="/contact"
              className="btn-magnetic relative group inline-flex items-center gap-2.5 px-6 py-2.5 bg-white rounded-full text-[#0a0a0a] text-[12px] font-bold tracking-[0.04em] uppercase overflow-hidden"
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 skew-x-12" />
              {/* Live dot */}
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="relative">Start a Project</span>
              <ArrowRight className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ── Mobile toggle ─────────────────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden ml-auto flex flex-col justify-center items-center w-9 h-9 gap-[5px] group"
            aria-label="Open menu"
          >
            <span className={`block h-px w-5 bg-white transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${mobileOpen ? 'w-5 -rotate-45 -translate-y-[4.5px]' : 'w-3.5 ml-auto'}`} />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-[200] bg-[#080808] overflow-y-auto flex flex-col"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/[0.03] rounded-full blur-[100px] translate-y-1/3" />
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05] relative z-10">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <BrandLogo variant="full" animate={false} />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-6 py-8 relative z-10">
              {NAV_LINKS.map((link, i) => {
                const hasChildren = !!link.children
                const isExpanded = mobileExpanded === link.label

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: EASE }}
                    className="border-b border-white/[0.04]"
                  >
                    {hasChildren ? (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                        className="w-full flex items-center justify-between py-5 group"
                      >
                        <span className={`text-2xl font-bold tracking-tight transition-colors ${isExpanded ? 'text-accent' : 'text-white group-hover:text-zinc-300'}`}>
                          {link.label}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-zinc-600 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-accent' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={(e) => { handleLinkClick(e, link.href); setMobileOpen(false) }}
                        className="flex items-center justify-between py-5 group"
                      >
                        <span className="text-2xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                          {link.label}
                        </span>
                        <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    )}

                    {/* Sub-links */}
                    <AnimatePresence>
                      {hasChildren && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 space-y-1 pl-3 border-l border-accent/20 ml-1 mb-2">
                            {link.children!.map((child: any) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/[0.04] transition-colors"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-medium text-zinc-400 group-hover:text-white transition-colors">
                                      {child.label}
                                    </span>
                                    {child.tag && (
                                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-accent/15 text-accent">
                                        {child.tag}
                                      </span>
                                    )}
                                  </div>
                                  {child.desc && (
                                    <span className="block text-[11px] text-zinc-600 mt-0.5">{child.desc}</span>
                                  )}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-accent/0 group-hover:text-accent/70 transition-colors shrink-0" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </nav>

            {/* Mobile CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45, ease: EASE }}
              className="px-6 pb-12 pt-6 space-y-3 border-t border-white/[0.05] relative z-10"
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-center gap-3 w-full py-4 bg-white text-[#0a0a0a] font-bold text-[14px] tracking-wide rounded-2xl overflow-hidden relative"
              >
                <span className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 skew-x-12" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="relative">Start a Project</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/case-studies"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 border border-white/10 rounded-2xl text-[13px] font-semibold tracking-widest uppercase text-zinc-500 hover:text-white hover:border-white/20 transition-colors"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
