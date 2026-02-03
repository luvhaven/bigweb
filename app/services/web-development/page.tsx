'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  DollarSign,
  Zap,
  Shield,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Rocket,
  Award,
  Code,
  Cpu,
  Globe,
  Server,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import SkyPulseDemo from '@/components/demos/SkyPulseDemo'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Revenue Engine™"
const PRODUCT_TAGLINE = "High-Velocity Monetization Architecture"

// Outcome-focused benefits
const outcomes = [
  {
    title: "Monetization Velocity",
    description: "We engineer platforms that don't just exist—they sell. Every interaction is architected to maximize customer lifetime value.",
    icon: DollarSign,
    metric: "347%",
    metricLabel: "Average ROI"
  },
  {
    title: "Clinical Performance",
    description: "Every millisecond counts. We deliver sub-2s load times across global nodes, ensuring zero conversion leakage due to latency.",
    icon: Zap,
    metric: "<2s",
    metricLabel: "Node Latency"
  },
  {
    title: "Industrial Uptime",
    description: "Your business never sleeps. Our serverless architecture scales to infinite traffic with 99.99% forensic reliability.",
    icon: Server,
    metric: "99.99%",
    metricLabel: "Uptime SLA"
  }
]

// Social proof metrics
const socialProof = [
  { value: "$47M+", label: "Capital Processed" },
  { value: "2.8M+", label: "Visitors Converted" },
  { value: "156%", label: "Conversion Lift" },
  { value: "Elite", label: "Engine Status" }
]

// Transformation roadmap
const transformation = [
  {
    phase: "Phase 01",
    title: "Conversion Audit",
    outcome: "We surgically identify leakage points in your current funnel and map a blueprint for aggressive revenue capture.",
    deliverables: ["Logic Leak Audit", "Revenue Mapping", "Stack Blueprint"]
  },
  {
    phase: "Phase 02",
    title: "Platform Engineering",
    outcome: "We deploy our proprietary 'Revenue Engine' primitives, building a sub-second, conversion-first infrastructure.",
    deliverables: ["Engine Core Build", "API Orchestration", "Stress Testing"]
  },
  {
    phase: "Phase 03",
    title: "Velocity Scale",
    outcome: "The engine is live. We implement live telemetry and iterative optimization to compound your growth indefinitely.",
    deliverables: ["Live Telemetry", "Recursive Growth", "Global Locking"]
  }
]

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
      <ServiceSchema
        name={`${PRODUCT_NAME} - Elite Web Engineering by BIGWEB`}
        description={`${PRODUCT_TAGLINE}. Premium web development for businesses serious about dominating their market. Sub-2-second performance, 3X conversion rates, industrial-scale infrastructure.`}
        serviceType="Web Development"
        ratingValue={5.0}
        reviewCount={68}
      />

      <AdvancedNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-mesh">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[5%] right-[5%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] animate-pulse-slow" />
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
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-orange-500/20 shadow-[0_0_20px_rgba(234,88,12,0.1)] mb-8"
            >
              <Cpu className="w-4 h-4 text-orange-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">
                Engineering System: {PRODUCT_NAME}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.85] italic"
            >
              The Revenue<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-red-600">
                Engine™
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base md:text-xl font-bold tracking-[0.4em] text-orange-500 uppercase italic mb-8"
            >
              {PRODUCT_TAGLINE}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-tight mb-12 font-light"
            >
              We build <strong className="text-white font-black italic">industrial-scale platforms</strong> that convert traffic into capital with surgical precision.
              <br />
              <span className="text-white font-black underline decoration-orange-500 underline-offset-8">Latency is your quietest competitor.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            >
              <Link
                href="/contact?plan=revenue-system"
                className="group relative px-10 py-5 rounded-xl bg-orange-600 text-white font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-all hover:scale-105 shadow-2xl shadow-orange-500/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-5 h-5" />
                  Start My Engine
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              <Link
                href="#proof"
                className="px-10 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all font-bold"
              >
                Inspect Performance
              </Link>
            </motion.div>

            {/* Engineering Telemetry */}
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

      {/* Live Proof Section */}
      <section id="proof" className="py-32 relative bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Activity className="w-4 h-4" /> Live Performance Node
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
              Clinical <span className="text-zinc-800">Uptime</span>
            </h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto uppercase font-bold tracking-widest">
              Inspect the underlying telemetry of our globally distributed edge infrastructure.
            </p>
          </div>

          <SkyPulseDemo />

          <div className="mt-24 grid md:grid-cols-4 gap-6">
            {[
              { name: "Next.js", cat: "Monolith Core", desc: "RSC & Partial Prerendering" },
              { name: "Edge Runtime", cat: "Global Delivery", desc: "0ms Cold Starts" },
              { name: "Postgres Pro", cat: "Data Integrity", desc: "Forced Persistence" },
              { name: "Stripe Connect", cat: "Capital Flow", desc: "Global Payment Mesh" }
            ].map((tech, i) => (
              <div key={i} className="bg-black border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 transition-all group">
                <div className="text-orange-500 font-black text-lg mb-2 group-hover:scale-105 transition-transform uppercase italic">{tech.name}</div>
                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">{tech.cat}</div>
                <p className="text-[10px] text-zinc-600 font-medium">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Benefits */}
      <section className="py-32 relative overflow-hidden bg-[#050505]">
        <div className="container mx-auto px-6 mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
            The <span className="text-orange-500">Revenue</span> Method
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            We don't build websites. We engineer <strong className="text-white italic">capital amplification systems</strong>.
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
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all duration-500"
              >
                <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                  <outcome.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                  <div className="text-5xl font-black text-orange-500 italic tracking-tighter">{outcome.metric}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Process */}
      <section id="process" className="py-40 relative bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 italic">
              The <span className="text-orange-500">Engineering</span> Loop
            </h2>
            <p className="text-xl text-zinc-500 uppercase tracking-widest font-black">
              How we architect your digital dominance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {transformation.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-orange-500/20 transition-all relative group"
              >
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-orange-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                  Phase {i + 1}
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                  </div>
                  <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                  <div className="flex flex-wrap gap-3">
                    {step.deliverables.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/5 border border-orange-500/10">
                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
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
        <div className="absolute inset-0 bg-orange-600/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-10"
              >
                <Shield className="w-4 h-4" /> Industrial SLA Active
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                Start your <span className="text-orange-600">Takeover</span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                Do not let ancient infrastructure cap your business potential.
                <br />
                <strong className="text-white italic">The Revenue Engine is primed.</strong>
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                <Code className="w-8 h-8" />
                Start My Engine
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/services/web-development" />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Web Development', url: '/services/web-development' }
        ]}
      />

      <Footer />
    </main>
  )
}
