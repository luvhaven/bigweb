'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, MapPin, Phone, ArrowRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import BrandLogo from '@/components/branding/BrandLogo'

const footerLinks = {
  services: [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'UI/UX Design', href: '/services/ui-ux-design' },
    { name: 'SEO & Growth', href: '/services/seo-growth' },
    { name: 'E-Commerce', href: '/services/ecommerce' },
    { name: 'AI Consulting', href: '/services/ai-consulting' },
    { name: 'GAIO (AI Optimization)', href: '/services/gaio' },
    { name: 'Staff Augmentation', href: '/services/staff-augmentation' },
    { name: 'Website Maintenance', href: '/services/maintenance' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]
}

const socialLinks = [
  { href: 'https://facebook.com/bigwebdigital', label: 'Facebook' },
  { href: 'https://twitter.com/bigwebdigital', label: 'Twitter' },
  { href: 'https://instagram.com/bigwebdigital', label: 'Instagram' },
  { href: 'https://linkedin.com/company/bigweb-digital', label: 'LinkedIn' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription
    setEmail('')
  }

  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-secondary/2 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter Column - Consolidated for premium feel */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block group">
              <BrandLogo className="h-8 w-auto text-foreground opacity-90 hover:opacity-100 transition-opacity" />
            </Link>

            <div className="pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Newsletter</p>
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
          </div>

          {/* Links Grid - Clean & Minimal */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Services 1 */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-4">Services</h3>
              <ul className="space-y-2.5">
                {footerLinks.services.slice(0, 5).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services 2 */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-4 opacity-0 md:opacity-100 select-none">More</h3>
              <ul className="space-y-2.5">
                {footerLinks.services.slice(5).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-4">Company</h3>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-4">Connect</h3>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@bigwebdigital.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group">
                    <Mail className="w-3.5 h-3.5 text-accent/70 group-hover:text-accent" /> hello@bigwebdigital.com
                  </a>
                </li>
                <li>
                  <a href="tel:+2347030576537" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group">
                    <Phone className="w-3.5 h-3.5 text-accent/70 group-hover:text-accent" /> +234 (703) 057-6537
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-accent/70 mt-0.5 shrink-0" />
                  <span>Global Presence<br /><span className="text-xs opacity-60">NA, EU, Asia, Africa</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Ultra Minimal */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} BigWeb Digital.
          </p>

          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} className="text-muted-foreground/60 hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">{social.label}</span>
                {/* Icons would be better here, fitting 'premium' vibe, assuming lucide imports available or just text if preferred, sticking to text for safety as requested by user's 'premium' generally implies clean */}
                <span className="text-xs font-medium uppercase tracking-wider hover:underline decoration-accent/50 offset-2">{social.label}</span>
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href} className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
