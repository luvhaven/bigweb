'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowRight, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import BrandLogo from '@/components/branding/BrandLogo';
import { useGlobalContent } from "@/context/GlobalContentContext";

// Helper for dynamic icons
const IconMap: any = { Mail, MapPin, Phone, ArrowRight, Send, Facebook, Twitter, Instagram, Linkedin };

export default function Footer() {
  const { footer, settings } = useGlobalContent();
  const [email, setEmail] = useState('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Client-side only time to avoid hydration mismatch
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', '_').split('.')[0] + '_UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  // Group sections by column
  const columns: Record<number, any[]> = { 1: [], 2: [], 3: [], 4: [] };
  (footer as any[] || []).forEach((section: any) => {
    if (columns[section.column_position]) {
      columns[section.column_position].push(section);
      columns[section.column_position].sort((a: any, b: any) => a.sort_order - b.sort_order);
    }
  });

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      {/* Cinematic Background - Amped Up */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px] opacity-[0.1]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Unit */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="inline-block">
              <BrandLogo variant="full" className="h-10 brightness-[10]" />
            </Link>

            <p className="text-zinc-600 text-sm font-medium leading-relaxed max-w-sm uppercase tracking-tight">
              Clinical web engineering for global growth teams. We eliminate guesswork and deploy high-performance revenue engines.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-xs group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Input
                  type="email"
                  placeholder="INPUT_HIVE_MIND_EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-950/50 border-zinc-800 text-xs font-mono text-white placeholder:text-zinc-700 h-10 pr-10 rounded-lg focus:border-orange-500/50 focus:ring-0 transition-all uppercase tracking-widest"
                />
                <button type="submit" className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-zinc-600 hover:text-orange-500 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="space-y-6 pt-6 border-t border-zinc-900/50">
              <div className="flex flex-col gap-1 group">
                <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Global_Support</span>
                <a href="mailto:support@bigwebdigital.com" className="text-sm text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tighter italic font-mono flex items-center gap-2">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-orange-500 transition-colors" />
                  support@bigwebdigital.com
                </a>
              </div>
              <div className="flex flex-col gap-1 group">
                <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-widest group-hover:text-orange-600 transition-colors">Accounts_&_Billing</span>
                <a href="mailto:billing@bigwebdigital.com" className="text-sm text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-tighter italic font-mono flex items-center gap-2">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-orange-500 transition-colors" />
                  billing@bigwebdigital.com
                </a>
              </div>
            </div>
          </div>

          {/* Links Units */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h4 className="text-[10px] font-mono font-bold text-zinc-800 uppercase tracking-[0.5em] mb-10 flex items-center gap-2">
                  <div className="w-4 h-px bg-zinc-900" />
                  CAPABILITIES
                </h4>
                <ul className="space-y-6">
                  {[
                    { label: 'Website Engineering', href: '/services/web-engineering' },
                    { label: 'Funnel Architecture', href: '/services/funnel-architecture' },
                    { label: 'Revenue Systems', href: '/services/revenue-systems' },
                    { label: 'Conversion Science', href: '/services/conversion-science' },
                    { label: 'Trust Optimization', href: '/services/trust-optimization' },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-[11px] font-black text-zinc-600 hover:text-orange-600 uppercase tracking-widest transition-all block group">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">//</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-bold text-zinc-800 uppercase tracking-[0.5em] mb-10 flex items-center gap-2">
                  <div className="w-4 h-px bg-zinc-900" />
                  ENGAGEMENTS
                </h4>
                <ul className="space-y-6">
                  {[
                    { label: 'Revenue Roadmap', href: '/offers/revenue-roadmap' },
                    { label: 'Fix Sprint', href: '/offers/fix-sprint' },
                    { label: 'Growth Retainer', href: '/offers/retainer' },
                    { label: 'Revenue System', href: '/offers/revenue-system' },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-[11px] font-black text-zinc-600 hover:text-orange-600 uppercase tracking-widest transition-all block group">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">//</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-bold text-zinc-800 uppercase tracking-[0.5em] mb-10 flex items-center gap-2">
                  <div className="w-4 h-px bg-zinc-900" />
                  RESOURCES
                </h4>
                <ul className="space-y-6">
                  {[
                    { label: 'Our Process', href: '/how-it-works' },
                    { label: 'The Archive', href: '/case-studies' },
                    { label: 'Engineering Team', href: '/contact' },
                    { label: 'Client Login', href: '/login' },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-[11px] font-black text-zinc-600 hover:text-orange-600 uppercase tracking-widest transition-all block group">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">//</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-16 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono font-bold text-zinc-800 uppercase tracking-[0.5em]">System_Status</span>
              <span className="flex items-center gap-3 text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operational_Stable
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono font-bold text-zinc-800 uppercase tracking-[0.5em]">Terminal_Epoch</span>
              <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest tabular-nums">
                {time || 'INITIALIZING...'}
              </span>
            </div>
            <div className="flex flex-col gap-2 relative group">
              <span className="text-[9px] font-mono font-bold text-zinc-800 uppercase tracking-[0.5em] group-hover:text-orange-600 transition-colors">Engineering_Lab</span>
              <span className="text-[11px] font-black text-zinc-700 uppercase tracking-widest italic flex items-center gap-2">
                Tokyo_v4.2_Build <span className="text-zinc-800 opacity-50 px-1 border border-zinc-800 rounded text-[9px]">STABLE</span>
              </span>
            </div>
          </div>

          <div className="flex gap-12 items-center">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <Link key={link} href="#" className="text-[9px] font-mono font-bold text-zinc-600 hover:text-white uppercase tracking-[0.5em] transition-all">
                {link}
              </Link>
            ))}
            <span className="text-[9px] font-mono font-bold text-zinc-800 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} BIGWEB_Digital // ARCHITECT_V1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
