'use client'

import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  Check,
  ArrowRight,
  CreditCard,
  Package,
  BarChart,
  Sparkles,
  Award,
  CheckCircle2,
  Rocket,
  Activity,
  Shield,
  Lock,
  Eye,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import LuxuryFashionDemo from '@/components/demos/LuxuryFashionDemo'

// Product Branding
const PRODUCT_NAME = "The Transaction Machine™"
const PRODUCT_TAGLINE = "High-Fidelity Capital Flow"

// Outcome-focused benefits
const outcomes = [
  {
    title: "Clinical Checkout",
    description: "We surgically eliminate checkout friction. Every millisecond of delay is a node of lost capital. Our machines convert with zero hesitation.",
    icon: ShoppingCart,
    metric: "+275%",
    metricLabel: "Conversion Lift"
  },
  {
    title: "Inventory Forensics",
    description: "Real-time global synchronization across all commerce channels. We ensure 100% data integrity between physical stock and digital storefronts.",
    icon: Package,
    metric: "100%",
    metricLabel: "Sync Integrity"
  },
  {
    title: "Capital Velocity",
    description: "Industrial-grade payment orchestration. Sub-2-second transaction speed even during global traffic surges. Fast stores generate more capital.",
    icon: Zap,
    metric: "<2s",
    metricLabel: "Flow Speed"
  }
]

// Social proof
const socialProof = [
  { value: "$18M+", label: "Capital Flow" },
  { value: "847K+", label: "Validated Sales" },
  { value: "68%", label: "Recovery Index" },
  { value: "Elite", label: "Commerce Tier" }
]

// Transformation phases
const transformation = [
  {
    phase: "Phase 01",
    title: "Revenue Forensics",
    outcome: "We surgically audit your entire funnel to identify logic leaks, friction nodes, and missed upsell opportunities.",
    deliverables: ["Funnel Audit", "Friction Matrix", "Revenue Blueprint"]
  },
  {
    phase: "Phase 02",
    title: "Conversion Injection",
    outcome: "We engineer a high-fidelity storefront using our proprietary 'Machine' primitives—optimized for maximum order value.",
    deliverables: ["Checkout Logic", "Smart Upsells", "Fidelity UX"]
  },
  {
    phase: "Phase 03",
    title: "Capital Acceleration",
    outcome: "The machine is live. We implement live transaction telemetry and A/B logic to compound your revenue growth indefinitely.",
    deliverables: ["Live Telemetry", "Optimization Mesh", "Global Locking"]
  }
]

export default function EcommercePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      <ServiceSchema
        name={`${PRODUCT_NAME} - Elite E-Commerce Engineering by BIGWEB`}
        description={`${PRODUCT_TAGLINE}. Premium e-commerce development that eliminates friction and maximizes revenue. 48% higher cart completion, zero inventory errors.`}
        serviceType="E-Commerce Development"
        ratingValue={5.0}
        reviewCount={23}
      />

      <AdvancedNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-mesh">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-emerald-500/20 shadow-[0_0_20_rgba(34,197,94,0.1)] mb-12"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
                Commerce System: {PRODUCT_NAME}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85] italic"
            >
              The Transaction<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-600 to-green-600">
                Machine™
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-2xl font-bold tracking-widest text-emerald-500 uppercase italic mb-12"
            >
              {PRODUCT_TAGLINE}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto leading-tight mb-20 font-light"
            >
              We engineer <strong className="text-white font-black italic">frictionless commerce engines</strong> that turn global traffic into permanent capital.
              <br />
              <span className="text-white font-black underline decoration-emerald-500 underline-offset-8">Browsing is temporary. Transactions are absolute.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
            >
              <Link
                href="/contact"
                className="group relative px-12 py-6 rounded-2xl bg-emerald-600 text-white font-black uppercase tracking-widest text-lg hover:bg-emerald-500 transition-all hover:scale-105 shadow-2xl shadow-emerald-500/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <DollarSign className="w-6 h-6" />
                  Launch Machine
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              <Link
                href="#proof"
                className="px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-lg hover:bg-white/10 transition-all font-bold"
              >
                Inspect Interface
              </Link>
            </motion.div>

            {/* Commerce Telemetry */}
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

      {/* Live Experience Section */}
      <section id="proof" className="py-32 relative bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Activity className="w-4 h-4" /> Live Transaction Node
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
              Frictionless <span className="text-zinc-800">Flow</span>
            </h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto uppercase font-bold tracking-widest">
              Every millisecond of delay is a node of lost capital. We engineer for zero hesitation.
            </p>
          </div>

          <LuxuryFashionDemo />

          <div className="mt-24 grid md:grid-cols-4 gap-6">
            {[
              { name: "One-Click Ops", cat: "Checkout Logic", desc: "0-Friction Flow" },
              { name: "Stripe Connect", cat: "Capital Bridge", desc: "Global Settlement" },
              { name: "Redis Sync", cat: "Inventory Logic", desc: "100% Data Integrity" },
              { name: "PCI Vaults", cat: "Security Framework", desc: "Encrypted Transactions" }
            ].map((tech, i) => (
              <div key={i} className="bg-black border border-white/5 p-6 rounded-2xl hover:border-emerald-500/20 transition-all group">
                <div className="text-emerald-500 font-black text-lg mb-2 group-hover:scale-105 transition-transform uppercase italic">{tech.name}</div>
                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">{tech.cat}</div>
                <p className="text-[10px] text-zinc-600 font-medium">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Grid */}
      <section className="py-32 relative overflow-hidden bg-[#050505]">
        <div className="container mx-auto px-6 mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
            The <span className="text-emerald-500">Machine</span> Mesh
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            E-commerce is not a website. It is a <strong className="text-white italic">capital conversion engine</strong>.
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
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                  <outcome.icon className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                  <div className="text-5xl font-black text-emerald-500 italic tracking-tighter">{outcome.metric}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Timeline */}
      <section id="process" className="py-40 relative bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 italic">
              The <span className="text-emerald-500">Transaction</span> Loop
            </h2>
            <p className="text-xl text-zinc-500 uppercase tracking-widest font-black">
              How we architect your digital revenue.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {transformation.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-emerald-500/20 transition-all relative group"
              >
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-emerald-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                  Phase {i + 1}
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-emerald-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                  </div>
                  <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                  <div className="flex flex-wrap gap-3">
                    {step.deliverables.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
        <div className="absolute inset-0 bg-emerald-600/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-10"
              >
                <Lock className="w-4 h-4" /> Revenue Locked
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                Occupy the <span className="text-emerald-600">Checkout</span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                Do not settle for cart abandonment.
                <br />
                <strong className="text-white italic">The Transaction Machine is ready for deployment.</strong>
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                <ShoppingCart className="w-8 h-8" />
                Start My Machine
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/services/ecommerce" />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'E-Commerce', url: '/services/ecommerce' }
        ]}
      />

      <Footer />
    </main>
  )
}
