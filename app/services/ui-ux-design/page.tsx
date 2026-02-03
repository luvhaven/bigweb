'use client'

import { motion } from 'framer-motion'
import {
  Palette,
  Layout,
  MousePointer2,
  Smartphone,
  ArrowRight,
  Eye,
  Zap,
  Award,
  CheckCircle2,
  Rocket,
  Layers,
  Component,
  Figma,
  PenTool,
  Monitor,
  Smile
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Experience Engine™"
const PRODUCT_TAGLINE = "High-Fidelity Interaction Architecture"

// Outcome-focused benefits
const outcomes = [
  {
    title: "Visual Dominance",
    description: "We craft elite brand identities that instantly signal market leadership. Your competition becomes background noise.",
    icon: Award,
    metric: "Premium",
    metricLabel: "Perception"
  },
  {
    title: "Conversion-Led UX",
    description: "Every pixel is engineered to guide the user towards high-value actions. Scientific precision meets artistic brilliance.",
    icon: MousePointer2,
    metric: "+85%",
    metricLabel: "Click-Through"
  },
  {
    title: "Atomic Scalability",
    description: "We build living design systems that allow your brand to scale infinitely without losing visual integrity.",
    icon: Component,
    metric: "100%",
    metricLabel: "Consistency"
  }
]

// Social proof
const socialProof = [
  { value: "11", label: "Design Awards" },
  { value: "150+", label: "Brands Elevated" },
  { value: "4.5X", label: "Engagement Lift" },
  { value: "Elite", label: "Aesthetic Status" }
]

// Transformation phases
const transformation = [
  {
    phase: "Phase 01",
    title: "Visual DNA Mapping",
    outcome: "We surgically analyze your brand's core and map a visual strategy that aligns with your master business goals.",
    deliverables: ["Color Psychology", "Typography Mesh", "Style Lockdown"]
  },
  {
    phase: "Phase 02",
    title: "High-Fidelity Interface",
    outcome: "We craft breathtaking 100% custom interfaces with glassmorphism, micro-animations, and elite polish.",
    deliverables: ["Figma Library", "Interaction Design", "Responsive Mesh"]
  },
  {
    phase: "Phase 03",
    title: "System Handoff",
    outcome: "The engine is complete. We deliver an atomic component library that ensures permanent design consistency.",
    deliverables: ["Component Library", "UX Guidelines", "Asset Lockdown"]
  }
]

export default function UIUXPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-rose-500/30">
      <ServiceSchema
        name={`${PRODUCT_NAME} - Elite UI/UX Design by BIGWEB`}
        description={`${PRODUCT_TAGLINE}. Premium visual identities and conversion-led UX. Atomic design systems, high-fidelity interfaces, design awards winner.`}
        serviceType="UI/UX Design"
        ratingValue={5.0}
        reviewCount={150}
      />

      <AdvancedNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-mesh">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)] mb-8"
            >
              <PenTool className="w-4 h-4 text-rose-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400">
                Creative System: {PRODUCT_NAME}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.85] italic"
            >
              The Experience<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-600 to-orange-600">
                Engine™
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base md:text-xl font-bold tracking-[0.4em] text-rose-500 uppercase italic mb-8"
            >
              {PRODUCT_TAGLINE}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-tight mb-12 font-light"
            >
              We don't just design pages. We architect <strong className="text-white font-black italic">high-fidelity interactions</strong> that turn skeptics into brand advocates.
              <br />
              <span className="text-white font-black underline decoration-rose-500 underline-offset-8">Mediocrity is the silent killer.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            >
              <Link
                href="/contact"
                className="group relative px-10 py-5 rounded-xl bg-rose-600 text-white font-black uppercase tracking-widest text-sm hover:bg-rose-500 transition-all hover:scale-105 shadow-2xl shadow-rose-500/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Palette className="w-5 h-5" />
                  Start My Design
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              <Link
                href="#process"
                className="px-10 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all font-bold"
              >
                View Architecture
              </Link>
            </motion.div>

            {/* Creative Telemetry */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-50 border-t border-white/5 pt-12">
              {socialProof.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-white italic mb-1">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Outcomes */}
      <section className="py-32 relative overflow-hidden bg-[#080808]">
        <div className="container mx-auto px-6 mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
            The <span className="text-rose-500">Outcome</span> Mesh
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Design is not decoration. It is the <strong className="text-white italic">conversion layer</strong> of your business.
          </p>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all duration-500"
              >
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                  <outcome.icon className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                  <div className="text-5xl font-black text-rose-500 italic tracking-tighter">{outcome.metric}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Architecture Tools */}
      <section className="py-24 border-t border-white/5 border-b bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-rose-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Powering The Engine</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Stack Intelligence</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Figma Mastery", desc: "Enterprise-grade real-time collaboration and atomic component libraries.", icon: Figma },
              { title: "Motion Frameworks", desc: "Framer Motion & GSAP for physics-based sub-60fps fluid interactions.", icon: Zap },
              { title: "Visual Validation", desc: "Microscopic heatmapping and A/B testing frameworks to verify intent.", icon: Eye },
            ].map((tool, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-black border border-white/5 hover:border-rose-500/20 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase italic">{tool.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Timeline */}
      <section id="process" className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 italic">
              The <span className="text-rose-500">Design</span> Loop
            </h2>
            <p className="text-xl text-zinc-500 uppercase tracking-widest font-black">
              How we architect your visual dominance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {transformation.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-rose-500/20 transition-all relative group"
              >
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-rose-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                  Phase {i + 1}
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-rose-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                  </div>
                  <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                  <div className="flex flex-wrap gap-3">
                    {step.deliverables.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/5 border border-rose-500/10">
                        <CheckCircle2 className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-600/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest mb-10"
              >
                <Eye className="w-4 h-4" /> Lab Inspection Ready
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                Start your <span className="text-rose-600">Ascension</span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                Do not let mediocre design cap your revenue potential.
                <br />
                <strong className="text-white italic">The Experience Engine is primed.</strong>
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                <Palette className="w-8 h-8" />
                Begin Design
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/services/ui-ux-design" />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'UI/UX Design', url: '/services/ui-ux-design' }
        ]}
      />

      <Footer />
    </main >
  )
}
