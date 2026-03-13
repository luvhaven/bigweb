'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Trophy, Award, Star, Globe2, MapPin } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';
import { useGlobalContent } from "@/context/GlobalContentContext";

interface FooterData {
  settings: {
    contact_email?: string
    contact_phone?: string
    social_links?: Record<string, string>
    site_name?: string
  } | null
  sections: any[]
}

// Live world clock for a given timezone
function WorldClock({ city, tz }: { city: string; tz: string }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      setTime(new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tz])
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-600">{city}</span>
      <span className="text-sm font-mono tabular-nums text-zinc-400">{time || '--:--:--'}</span>
    </div>
  )
}

export default function Footer({ footerData }: { footerData?: FooterData | null }) {
  const { settings: ctxSettings } = useGlobalContent();
  const settings = footerData?.settings || ctxSettings;
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef as any, { once: true, margin: '-100px' })

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subStatus === 'loading') return;
    setSubStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter_footer', notes: 'Subscribed via footer' }),
      });
      if (res.ok) {
        setSubStatus('success');
        setEmail('');
        setTimeout(() => setSubStatus('idle'), 5000);
      } else {
        setSubStatus('error');
        setTimeout(() => setSubStatus('idle'), 4000);
      }
    } catch {
      setSubStatus('error');
      setTimeout(() => setSubStatus('idle'), 4000);
    }
  };

  return (
    <footer ref={sectionRef} className="bg-[#060606] border-t border-white/[0.04] relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Full-bleed oversized CTA sign-off — the curtain climax */}
      <div className="relative overflow-hidden border-b border-white/[0.04]">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,168,83,0.06), transparent)' }} />
        <div className="container mx-auto px-6 lg:px-16 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-8"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent">Ready to build something world-class?</span>

            {/* Oversized CTA headline */}
            <h2
              className="font-display text-white leading-[0.9] tracking-tighter select-none"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 10rem)' }}
            >
              Start a<br />
              <em className="not-italic" style={{ color: 'hsl(38 56% 52%)' }}>Project.</em>
            </h2>

            <p className="text-zinc-500 text-base max-w-md leading-relaxed">
              We work with 3–4 new partners per quarter. If you&apos;re building something ambitious, let&apos;s talk.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 bg-white rounded-full" />
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative z-10 flex items-center gap-3 px-10 py-4 text-[#0a0a0a] font-bold text-[15px] tracking-wide">
                  Let&apos;s Talk
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                </span>
              </Link>
              <Link
                href="/case-studies"
                className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                View Our Work
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* World Clocks strip */}
      <div className="border-b border-white/[0.04]">
        <div className="container mx-auto px-6 lg:px-16 py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-700 flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Global Operations
            </span>
            <div className="flex flex-wrap items-center gap-8 md:gap-14">
              <WorldClock city="London" tz="Europe/London" />
              <WorldClock city="Lagos" tz="Africa/Lagos" />
              <WorldClock city="New York" tz="America/New_York" />
              <WorldClock city="Dubai" tz="Asia/Dubai" />
              <WorldClock city="Singapore" tz="Asia/Singapore" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-16 relative z-10">

        {/* Newsletter CTA */}
        <div className="mb-16 p-7 md:p-10 rounded-3xl border border-white/[0.06] bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 50%, rgba(212,168,83,0.05) 0%, transparent 60%)' }} />
          <div className="max-w-xl relative z-10">
            <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-2">Join <span className="text-accent italic">The Lab.</span></h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Conversion playbooks, design engineering insights, and teardowns delivered every Tuesday. Join 5,000+ growth leaders.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="relative w-full md:w-auto min-w-[300px] z-10">
            {subStatus === 'success' ? (
              <div className="flex items-center gap-3 px-5 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                You&apos;re in. Check your inbox.
              </div>
            ) : (
              <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden focus-within:border-accent/50 transition-all">
                <input
                  type="email"
                  placeholder="Your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder:text-zinc-600 px-5 py-4 flex-1 outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  className="px-5 py-4 text-white hover:text-accent transition-colors border-l border-white/[0.08] flex items-center justify-center group disabled:opacity-50"
                >
                  {subStatus === 'loading' ? (
                    <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <BrandLogo variant="full" animate={false} />
            </Link>

            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-emerald-400">
                Available for projects
              </span>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              The world&apos;s most revenue-focused web engineering agency. Trusted by ambitious founders and Fortune 500 brands alike.
            </p>

            <div className="pt-2 space-y-1">
              <a href="mailto:hello@bigwebdigital.com" className="block text-sm text-zinc-500 hover:text-white transition-colors">
                hello@bigwebdigital.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-4">Services</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Website Engineering', href: '/services/web-development' },
                    { label: 'Mobile Applications', href: '/services/mobile-apps' },
                    { label: 'UI/UX Product Design', href: '/services/ui-ux-design' },
                    { label: 'SEO & GAIO Authority', href: '/services/seo' },
                    { label: 'E-Commerce Systems', href: '/services/ecommerce' },
                    { label: 'AI Automation', href: '/services/ai-automation' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-4">Packages</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Revenue Roadmap', href: '/offers/revenue-roadmap' },
                    { label: 'The Monolith™ System', href: '/offers/revenue-system' },
                    { label: 'Growth Retainer', href: '/offers/retainer' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-4">Company</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Case Studies', href: '/case-studies' },
                    { label: 'About', href: '/about' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Contact', href: '/contact' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-4">Connect</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'LinkedIn', href: 'https://linkedin.com/company/bigwebdigital' },
                    { label: 'X / Twitter', href: 'https://x.com/bigwebdigital' },
                    { label: 'Instagram', href: 'https://instagram.com/bigwebdigital' },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Awards strip */}
        <div className="py-8 border-t border-white/[0.04] flex flex-wrap justify-center gap-8 md:gap-14 opacity-40 hover:opacity-80 transition-opacity duration-500">
          {[
            { icon: Trophy, text: "Awwwards SOTD" },
            { icon: Award, text: "FWA of the Day" },
            { icon: Star, text: "Top B2B Agency '26" },
            { icon: Globe2, text: "Global Excellence" }
          ].map((award, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm font-semibold tracking-wide text-zinc-400">
              <award.icon className="w-4 h-4 text-accent" />
              {award.text}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-zinc-700">
            © {year || '2026'} BIGWEB Digital. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-zinc-700 hover:text-zinc-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
