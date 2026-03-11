'use client'

import { motion } from 'framer-motion'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Zap, Globe, Brain, Coffee, Heart, Shield } from 'lucide-react'

const openRoles = [
  {
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    type: 'Remote',
    level: 'Senior',
    desc: 'Architect and build elite web applications using Next.js, TypeScript, and modern infrastructure. You care about performance, UX impact, and code that lasts.',
  },
  {
    title: 'Lead UX/UI Designer',
    team: 'Design',
    type: 'Remote',
    level: 'Lead',
    desc: 'Create conversion-first interfaces that are also breathtakingly beautiful. You believe design is strategy, not decoration.',
  },
  {
    title: 'Growth Strategist',
    team: 'Strategy',
    type: 'Remote',
    level: 'Mid-Senior',
    desc: 'Own the revenue and growth strategy for a portfolio of ambitious client brands. You think in systems, not campaigns.',
  },
  {
    title: 'Technical SEO Specialist',
    team: 'Growth',
    type: 'Remote',
    level: 'Senior',
    desc: 'Build and execute technical SEO architectures that dominate organic search. You love crawl budgets, Core Web Vitals, and schema markup.',
  },
]

const values = [
  { icon: Zap, title: 'Move at Speed', desc: 'We move faster than our clients expect and produce higher quality than they imagined possible.' },
  { icon: Brain, title: 'Think in Systems', desc: 'We solve root causes, not symptoms. Every solution is designed to compound in value over time.' },
  { icon: Globe, title: 'Work from anywhere', desc: 'We are 100% remote, async-first, and built for people who produce extraordinary results on their own schedule.' },
  { icon: Heart, title: 'Love the Craft', desc: 'We hire people who are obsessed with their discipline. Mediocrity is not a word in our vocabulary.' },
  { icon: Coffee, title: 'Team That Cares', desc: 'World-class collaboration across time zones. We invest in each other\'s growth as much as we invest in our clients.' },
  { icon: Shield, title: 'Integrity First', desc: 'We only take on projects we believe in. We tell clients what they need to hear, not what they want to hear.' },
]

const benefits = [
  'Fully remote — work from anywhere on Earth',
  'Competitive salaries benchmarked to top-quartile',
  'Annual performance bonus tied to client outcomes',
  '$3,000/yr learning & development budget',
  'Latest hardware + software setup',
  'Async-first culture — no unnecessary meetings',
  '30 days PTO + local public holidays',
  'Access to elite network of industry leaders',
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <AdvancedNavigation />

      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/[0.015] rounded-full blur-[200px]" />
        </div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent block mb-8">Join The Team</span>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] tracking-tight text-white leading-[0.95] mb-10 max-w-5xl">
              Build the internet&apos;s most
              <br />
              <em className="italic text-zinc-500">ambitious agency.</em>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mb-12">
              We are a small team of extraordinary people who believe the web deserves better.
              If you want to do the best work of your career — while working with the world&apos;s most ambitious brands — you&apos;re in the right place.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-emerald-400">
                {openRoles.length} Open Positions
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 block mb-4">How We Work</span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-white">
              Our values.<em className="italic text-zinc-500"> Non-negotiable.</em>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-500 group"
              >
                <val.icon className="w-6 h-6 text-zinc-600 group-hover:text-accent transition-colors duration-500 mb-5" />
                <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{val.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 border-t border-white/[0.04]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 block mb-6">What You Get</span>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight text-white mb-8">
                Built for the <em className="italic text-zinc-500">exceptional.</em>
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                We invest heavily in the people who choose to build BIGWEB. Here&apos;s what being part of the team looks like.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="grid grid-cols-1 gap-3"
            >
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 py-3 border-b border-white/[0.04] last:border-0"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-sm text-zinc-400">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="roles" className="py-24 border-t border-white/[0.04]">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 block mb-4">Open Positions</span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-white">
              Your next <em className="italic text-zinc-500">chapter.</em>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {openRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Link
                  href={`mailto:careers@bigwebdigital.com?subject=${encodeURIComponent('Application: ' + role.title)}`}
                  className="group block p-8 md:p-10 rounded-2xl border border-white/[0.04] hover:border-white/[0.1] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[role.team, role.type, role.level].map(tag => (
                          <span key={tag} className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 border border-white/[0.06] px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors mb-3">
                        {role.title}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed max-w-xl group-hover:text-zinc-400 transition-colors">
                        {role.desc}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full border border-white/[0.06] flex items-center justify-center group-hover:border-white/[0.2] group-hover:bg-white/[0.04] transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] text-center"
          >
            <p className="text-zinc-500 text-sm mb-4">
              Don&apos;t see the right role? We hire exceptional people on their own terms.
            </p>
            <Link
              href="mailto:careers@bigwebdigital.com?subject=Speculative Application"
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors"
            >
              Send a speculative application <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
