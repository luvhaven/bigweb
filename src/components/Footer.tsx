'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowRight, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import BrandLogo from '@/components/branding/BrandLogo';
import { useGlobalContent } from "@/context/GlobalContentContext";

// Helper for dynamic icons
const IconMap: any = { Mail, MapPin, Phone, ArrowRight, Send, Facebook, Twitter, Instagram, Linkedin };

export default function Footer() {
  const { footer, settings } = useGlobalContent();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  // Group sections by column
  const columns: Record<number, any[]> = { 1: [], 2: [], 3: [], 4: [] };
  footer.forEach((section: any) => {
    if (columns[section.column_position]) {
      columns[section.column_position].push(section);
      columns[section.column_position].sort((a: any, b: any) => a.sort_order - b.sort_order);
    }
  });

  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-secondary/2 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="border-b border-border/50">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Protocol</span>
              <span className="text-sm font-medium">ISO 27001 Certified</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Accuracy</span>
              <span className="text-sm font-medium">99.9% Data Integrity</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Ops Room</span>
              <span className="text-sm font-medium">24/7 Monitoring</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Velocity</span>
              <span className="text-sm font-medium">Sub-2s Load Standards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-flex items-center group mb-8">
              <BrandLogo variant="full" className="h-10" />
            </Link>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Client Support</span>
                <a href="mailto:support@bigwebdigital.com" className="text-sm hover:text-accent transition-colors">support@bigwebdigital.com</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Billing & Accounts</span>
                <a href="mailto:billing@bigwebdigital.com" className="text-sm hover:text-accent transition-colors">billing@bigwebdigital.com</a>
              </div>
            </div>

            {footer.filter(s => s.title === 'Brand & Lab' || s.section_title === 'Brand & Lab').map((section: any) => (
              <div key={section.id} className="pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{section.title || section.section_title}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{section.description}</p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50 border-white/10 focus:border-accent/50 h-10 text-sm pr-10 rounded-lg transition-all"
                      required
                    />
                    <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-10 w-10 text-accent hover:text-white p-0 hover:bg-transparent">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            ))}
          </div>

          {/* Columns 2-4: Links Grid */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
            {footer.filter(s => (s.title !== 'Brand & Lab' && s.section_title !== 'Brand & Lab')).map((section: any) => (
              <div key={section.id}>
                <h3 className="font-semibold text-sm text-foreground mb-4">{section.title || section.section_title}</h3>
                <ul className="space-y-2.5">
                  {(section.links || []).map((link: any, i: number) => {
                    const Icon = link.icon ? IconMap[link.icon] : null;
                    return (
                      <li key={i}>
                        {Icon ? (
                          <a href={link.href || link.url} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group">
                            <Icon className="w-3.5 h-3.5 text-accent/70 group-hover:text-accent" />
                            <span className="flex flex-col">
                              <span>{link.label}</span>
                              {link.sublabel && <span className="text-xs opacity-60">{link.sublabel}</span>}
                            </span>
                          </a>
                        ) : (
                          <Link href={link.href || link.url || '#'} className="text-sm text-muted-foreground hover:text-accent transition-colors block leading-tight">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} BIGWEB Digital - The Conversion Lab.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-6 items-center">
              <a href={settings?.facebook_url || '#'} className="text-muted-foreground/60 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="text-xs font-medium uppercase tracking-wider hover:underline decoration-accent/50 offset-2">Facebook</span>
              </a>
              <a href={settings?.twitter_url || '#'} className="text-muted-foreground/60 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="text-xs font-medium uppercase tracking-wider hover:underline decoration-accent/50 offset-2">Twitter</span>
              </a>
              <a href={settings?.instagram_url || '#'} className="text-muted-foreground/60 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="text-xs font-medium uppercase tracking-wider hover:underline decoration-accent/50 offset-2">Instagram</span>
              </a>
              <a href={settings?.linkedin_url || '#'} className="text-muted-foreground/60 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="text-xs font-medium uppercase tracking-wider hover:underline decoration-accent/50 offset-2">LinkedIn</span>
              </a>
            </div>

            <div className="w-px h-4 bg-white/10 hidden md:block" />

            <div className="flex gap-4 items-center">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((name) => (
                <Link
                  key={name}
                  href={`/${name.toLowerCase().replace(/ /g, '-')}`}
                  className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors leading-none"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
