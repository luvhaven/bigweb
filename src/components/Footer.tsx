'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Award, Star, Globe2 } from 'lucide-react';
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

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.04] relative overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Global Reach Background (Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] opacity-[0.02] pointer-events-none flex items-center justify-center">
        <Globe2 className="w-[800px] h-[800px] text-white" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-20 md:py-28 relative z-10">

        {/* Full-width Newsletter CTA */}
        <div className="mb-20 p-8 md:p-12 rounded-3xl border border-white/[0.06] bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 50%, rgba(212,168,83,0.05) 0%, transparent 60%)' }} />
          <div className="max-w-xl relative z-10">
            <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-3">Join <span className="text-accent italic">The Lab.</span></h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Get our latest conversion protocols, design engineering insights, and tear-downs delivered to your inbox every Tuesday. Join 5,000+ growth leaders.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="relative w-full md:w-auto min-w-[320px] z-10">
            {subStatus === 'success' ? (
              <div className="flex items-center gap-3 px-5 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                You&apos;re in. Check your inbox.
              </div>
            ) : (
              <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden focus-within:border-accent/50 focus-within:bg-white/[0.05] transition-all">
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
            {subStatus === 'error' && (
              <p className="text-xs text-red-400 mt-2 ml-1">Something went wrong. Please try again.</p>
            )}
          </form>
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

            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              The world&apos;s most revenue-focused web engineering agency. Trusted by ambitious founders and Fortune 500 brands alike.
            </p>

            {/* Global Reach / Timezones */}
            <div className="pt-4 border-t border-white/[0.04] max-w-xs">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 mb-3 block">Global Reach</div>
              <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-zinc-500 font-mono">
                <span>San Francisco <span className="text-emerald-500/50">•</span></span>
                <span>London <span className="text-emerald-500/50">•</span></span>
                <span>Dubai <span className="text-emerald-500/50">•</span></span>
                <span>Singapore</span>
              </div>
            </div>

            {/* Contact */}
            <div className="pt-2 space-y-2">
              <a href="mailto:hello@bigwebdigital.com" className="block text-sm text-zinc-500 hover:text-white transition-colors">
                hello@bigwebdigital.com
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
                    { label: 'Revenue Systems', href: '/services/revenue-systems' },
                    { label: 'Funnel Architecture', href: '/services/funnel-architecture' },
                    { label: 'Conversion Optimization', href: '/services/conversion-optimization' },
                    { label: 'Performance & Trust', href: '/services/trust-optimization' },
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
                    { label: 'Fix Sprint', href: '/offers/fix-sprint' },
                    { label: 'Revenue System', href: '/offers/revenue-system' },
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

        {/* Awards & Recognition Strip */}
        <div className="py-10 border-t border-white/[0.04] flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {[
            { icon: Trophy, text: "Awwwards SOTD" },
            { icon: Award, text: "FWA of the Day" },
            { icon: Star, text: "Top B2B Agency '26" },
            { icon: Globe2, text: "Global Excellence" }
          ].map((award, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold tracking-wide text-zinc-300">
              <award.icon className="w-5 h-5 text-accent" />
              {award.text}
            </div>
          ))}
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
