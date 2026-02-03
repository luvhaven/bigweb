'use client'

import { motion } from 'framer-motion'
import {
  Smartphone,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  Bell,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  Rocket,
  BarChart,
  Heart,
  Target,
  Activity,
  Cpu,
  Globe,
  Lock,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import HealthTrackDemo from '@/components/demos/HealthTrackDemo'

// Product Branding
const PRODUCT_NAME = "The Pocket Empire™"
const PRODUCT_TAGLINE = "High-Fidelity Mobile Dominance"

// Outcome-focused benefits
const outcomes = [
  {
    title: "Habit Engineering",
    description: "We don't just build apps—we engineer daily routines. Our UX logic is surgically designed to maximize daily active users (DAU).",
    icon: Heart,
    metric: "73%",
    metricLabel: "Daily Retention"
  },
  {
    title: "Clinical Latency",
    description: "Zero friction is our standard. We deliver buttery-smooth 60fps native performance across all device nodes and operating systems.",
    icon: Zap,
    metric: "60fps",
    metricLabel: "Locked Cadence"
  },
  {
    title: "Attention Orchestration",
    description: "Strategic push telemetry that drives engagement without fatigue. Convert users into brand advocates through high-fidelity touchpoints.",
    icon: Bell,
    metric: "5X",
    metricLabel: "Engagement Lift"
  }
]

// Social proof
const socialProof = [
  { value: "2.4M+", label: "Units Deployed" },
  { value: "890K+", label: "Daily Sessions" },
  { value: "4.8★", label: "Platform Rating" },
  { value: "Elite", label: "App Tier" }
]

// Transformation phases
const transformation = [
  {
    phase: "Phase 01",
    title: "User Psychology Audit",
    outcome: "We surgically analyze target behavior patterns to architect a habit loop that fits seamlessly into the user's daily reality.",
    deliverables: ["Behavior Mapping", "Habit Logic", "Engagement Blueprint"]
  },
  {
    phase: "Phase 02",
    title: "Native Engineering",
    outcome: "We deploy our proprietary 'Empire' primitives to build a sub-millisecond, native-first infrastructure for iOS and Android.",
    deliverables: ["Engine Core Build", "Native Bridging", "Uptime Logic"]
  },
  {
    phase: "Phase 03",
    title: "Growth Scaling",
    outcome: "The empire is live. We implement live session telemetry and iterative retention optimization to compound growth indefinitely.",
    deliverables: ["Live Telemetry", "Store Domination", "Global Locking"]
  }
]

export default function MobileAppsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-violet-500/30">
      <ServiceSchema
        name={`${PRODUCT_NAME} - Elite Mobile App Development by BIGWEB`}
        description={`${PRODUCT_TAGLINE}. Premium iOS & Android apps that drive daily engagement. 73% daily active users, 4.8★ average rating, native 60fps performance.`}
        serviceType="Mobile App Development"
        ratingValue={5.0}
        reviewCount={17}
      />

      <AdvancedNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-mesh">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[5%] right-[5%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" />
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
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)] mb-12"
            >
              <Smartphone className="w-4 h-4 text-violet-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">
                Engineering System: {PRODUCT_NAME}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85] italic"
            >
              The Pocket<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-600 to-indigo-600">
                Empire™
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-2xl font-bold tracking-widest text-violet-500 uppercase italic mb-12"
            >
              {PRODUCT_TAGLINE}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto leading-tight mb-20 font-light"
            >
              We engineer <strong className="text-white font-black italic">industrial-scale mobile platforms</strong> that live in your customers' hands.
              <br />
              <span className="text-white font-black underline decoration-violet-500 underline-offset-8">Engagement is the only metric that matters.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
            >
              <Link
                href="/contact"
                className="group relative px-12 py-6 rounded-2xl bg-violet-600 text-white font-black uppercase tracking-widest text-lg hover:bg-violet-500 transition-all hover:scale-105 shadow-2xl shadow-violet-500/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6" />
                  Start My Project
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              <Link
                href="#proof"
                className="px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-lg hover:bg-white/10 transition-all font-bold"
              >
                Inspect Performance
              </Link>
            </motion.div>

            {/* Mobile Telemetry */}
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
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Activity className="w-4 h-4" /> Live UX Node
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
              Clinical <span className="text-zinc-800">UX</span>
            </h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto uppercase font-bold tracking-widest">
              Inspect the underlying telemetry of our globally distributed mobile infrastructure.
            </p>
          </div>

          <HealthTrackDemo />

          <div className="mt-24 grid md:grid-cols-4 gap-6">
            {[
              { name: "React Native", cat: "Monolith Core", desc: "Cross-Platform Fidelity" },
              { name: "Native Swift/Kotlin", cat: "Performance Locking", desc: "0ms Jitter" },
              { name: "Postgres Realtime", cat: "Data Integrity", desc: "Forced Sync" },
              { name: "Biometric Ops", cat: "Security Framework", desc: "Forensic Auth" }
            ].map((tech, i) => (
              <div key={i} className="bg-black border border-white/5 p-6 rounded-2xl hover:border-violet-500/20 transition-all group">
                <div className="text-violet-500 font-black text-lg mb-2 group-hover:scale-105 transition-transform uppercase italic">{tech.name}</div>
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
            The <span className="text-violet-500">Empire</span> Method
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Mobile is the <strong className="text-white italic">most intimate</strong> interface your business has with the world.
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
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-all duration-500"
              >
                <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                  <outcome.icon className="w-8 h-8 text-violet-500" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                  <div className="text-5xl font-black text-violet-500 italic tracking-tighter">{outcome.metric}</div>
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
              The <span className="text-violet-500">Engineering</span> Loop
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
                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-violet-500/20 transition-all relative group"
              >
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-violet-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                  Phase {i + 1}
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-violet-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                  </div>
                  <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                  <div className="flex flex-wrap gap-3">
                    {step.deliverables.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/5 border border-violet-500/10">
                        <CheckCircle2 className="w-4 h-4 text-violet-400" />
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
        <div className="absolute inset-0 bg-violet-600/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-widest mb-10"
              >
                <Lock className="w-4 h-4" /> Market Occupied
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                Occupy the <span className="text-violet-600">Home Screen</span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                Do not settle for mobile web invisibility.
                <br />
                <strong className="text-white italic">The Pocket Empire is ready to start.</strong>
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                <Smartphone className="w-8 h-8" />
                Start My Mobile Empire
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/services/mobile-apps" />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Mobile Apps', url: '/services/mobile-apps' }
        ]}
      />

      <Footer />
    </main>
  )
}
