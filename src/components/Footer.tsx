'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Award, Star, Globe2 } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';
import { useGlobalContent } from "@/context/GlobalContentContext";
import { InfiniteMarquee } from '@/components/effects/InfiniteMarquee';

interface FooterData {
  settings: {
    contact_email?: string
    contact_phone?: string
    social_links?: Record<string, string>
    site_name?: string
  } | null
  sections: any[]
}

export default function Footer({ footerData }: { footerData?: FooterData | null }) {
  const { settings: ctxSettings } = useGlobalContent();
  // Prefer server-side footerData.settings over context
  const settings = footerData?.settings || ctxSettings;
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  const FOOTER_MARQUEE = ['Strategy', 'Design', 'Engineering', 'Revenue', 'Analytics', 'Automation', 'Mobile', 'E-Commerce', 'SEO', 'Performance']

  return (
    <footer className="bg-[#080808] border-t border-white/[0.04] relative overflow-hidden">
      {/* ─── Marquee band ─── */}
      <div className="border-b border-white/[0.03] py-4 overflow-hidden">
        <InfiniteMarquee
          items={FOOTER_MARQUEE}
          speed={35}
          separator="○"
          itemClassName="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-800 px-10"
        />
      </div>

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      {/* Global Reach Background (Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] opacity-[0.02] pointer-events-none flex items-center justify-center">
        <Globe2 className="w-[800px] h-[800px] text-white" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-20 md:py-28 relative z-10">

        {/* Full-width Newsletter CTA: The Lab */}
        <div className="mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent rounded-[2.5rem] blur-3xl opacity-30 pointer-events-none" />
          <div className="relative p-10 md:p-16 rounded-[2.5rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-md overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110" />
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 relative z-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent">Internal Protocol</span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6">
                  Join <span className="text-accent italic">The Lab.</span>
                </h3>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl font-light">
                  Direct intelligence for the next 1%. We share the conversion frameworks, engineering breakthroughs, and UI psychology patterns we use for our $100M+ partners.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="w-full lg:w-auto min-w-[380px]">
                {subStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h4 className="text-white font-medium mb-1">Access Granted</h4>
                    <p className="text-emerald-400/60 text-xs">Verify your session in your inbox.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative group/input">
                      <input
                        type="email"
                        placeholder="your@work-email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-5 text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all text-base"
                        required
                      />
                      <button
                        data-cursor="Join"
                        type="submit"
                        disabled={subStatus === 'loading'}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-white rounded-xl text-black font-bold text-sm hover:bg-accent transition-colors flex items-center gap-2 group/btn disabled:opacity-50"
                      >
                        {subStatus === 'loading' ? (
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            Subscribe
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono tracking-wider ml-2 uppercase">
                      Exclusively for directors & founders. 0% Spam.
                    </p>
                  </div>
                )}
                {subStatus === 'error' && (
                  <p className="text-xs text-red-400 mt-4 text-center">Protocol failure. Please re-authenticate.</p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <BrandLogo variant="full" showIcon animate={false} className="h-7 brightness-[10]" />
            </Link>

            {/* Availability status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-emerald-400">
                Available for projects
              </span>
            </div>

            <div className="space-y-4 max-w-sm">
               <h4 className="text-white font-display text-2xl tracking-tight leading-snug">
                 Engineering elite platforms for the <em className="text-accent font-medium">digital-first era.</em>
               </h4>
               <p className="text-sm text-zinc-500 leading-relaxed font-light">
                 We bridge the gap between high-performance engineering and breathtaking design to create revenue-generating assets for the world&apos;s most ambitious brands.
               </p>
            </div>

            {/* Global Reach / Technical Status */}
            <div className="pt-4 border-t border-white/[0.04] max-w-xs">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 mb-4 block">Global Presence</div>
              <div className="grid grid-cols-2 gap-y-4 text-[11px] font-mono">
                <div className="flex flex-col">
                  <span className="text-zinc-500 uppercase tracking-widest">SF / PST</span>
                  <span className="text-zinc-700">08:00 — 18:00</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 uppercase tracking-widest">LDN / GMT</span>
                  <span className="text-zinc-700">09:00 — 19:00</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 uppercase tracking-widest">DXB / GST</span>
                  <span className="text-zinc-700">10:00 — 20:00</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-zinc-500 uppercase tracking-widest">SGP / SGT</span>
                  <span className="text-zinc-700">09:00 — 19:00</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="pt-6 space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-700 mb-1">Direct Line</div>
              <a href="mailto:hello@bigwebdigital.com" className="group flex items-center gap-3 text-lg md:text-xl text-white hover:text-accent transition-all duration-300">
                <span className="border-b border-white/20 group-hover:border-accent/50 pb-0.5">hello@bigwebdigital.com</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
                  Services
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Website Engineering', href: '/services/web-development' },
                    { label: 'Mobile Applications', href: '/services/mobile-apps' },
                    { label: 'UI/UX Product Design', href: '/services/ui-ux-design' },
                    { label: 'SEO & GAIO Authority', href: '/services/seo' },
                    { label: 'E-Commerce Systems', href: '/services/ecommerce' },
                    { label: 'AI Automation', href: '/services/ai-automation' },
                    { label: 'Analytics & Intelligence', href: '/services/analytics' },
                    { label: 'Managed Maintenance', href: '/services/maintenance' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="link-shimmer text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
                  Packages
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Revenue Roadmap', href: '/offers/revenue-roadmap' },
                    { label: 'The Monolith™ System', href: '/offers/revenue-system' },
                    { label: 'Growth Retainer', href: '/offers/retainer' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="link-shimmer text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
                  Company
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Case Studies', href: '/case-studies' },
                    { label: 'About', href: '/about' },
                    { label: 'Careers', href: '/careers' },
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
                <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
                  Connect
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'LinkedIn', href: 'https://linkedin.com/company/bigwebdigital' },
                    { label: 'X / Twitter', href: 'https://x.com/bigwebdigital' },
                    { label: 'Instagram', href: 'https://instagram.com/bigwebdigital' },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-500 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition Strip: The Hall of Excellence */}
        <div className="py-12 border-t border-white/[0.04] relative">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 px-4">
            {[
              { icon: Trophy, text: "Awwwards SOTD", sub: "Digital Engineering" },
              { icon: Award, text: "FWA of the Day", sub: "User Experience" },
              { icon: Star, text: "Top B2B Agency", sub: "Fortune 500 Choice" },
              { icon: Globe2, text: "Global Excellence", sub: "2026 Selection" }
            ].map((award, i) => (
              <div key={i} className="flex items-center gap-4 group/award">
                <div className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center group-hover/award:border-accent/40 transition-colors">
                  <award.icon className="w-4 h-4 text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-widest text-white uppercase">{award.text}</span>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">{award.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-zinc-600">
            © {year || '2026'} BIGWEB Digital. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer >
  );
}
