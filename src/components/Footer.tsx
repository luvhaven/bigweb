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
    { name: 'AI Solutions', href: '/services/ai-solutions' },
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
  { href: '#', label: 'Facebook' },
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'LinkedIn' },
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
      <div className="absolute inset-0 bg-secondary/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-2">
                <BrandLogo className="h-10 w-auto text-foreground" />
              </div>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Crafting digital experiences that define the future. We build premium websites and applications for ambitious brands.
            </p>

            {/* Newsletter */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the latest insights on web trends and tech.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                  required
                />
                <Button type="submit" size="icon" className="bg-accent hover:bg-accent-dark shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>


          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                Services
                <span className="h-px flex-1 bg-border ml-4" />
              </h3>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                Company
                <span className="h-px flex-1 bg-border ml-4" />
              </h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                Contact
                <span className="h-px flex-1 bg-border ml-4" />
              </h3>
              <ul className="flex flex-col gap-6">
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-0.5">Global Presence</h4>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      North America, Europe, Asia & Africa
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-0.5">Email Us</h4>
                    <a href="mailto:hello@bigwebdigital.com" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                      hello@bigwebdigital.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-0.5">Call Us</h4>
                    <a href="tel:+2347030576537" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                      +234 (703) 057-6537
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BigWeb Digital. All rights reserved.
          </p>

          {/* Text-based Social Links */}
          <div className="flex gap-6 items-center">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors uppercase tracking-wider"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
