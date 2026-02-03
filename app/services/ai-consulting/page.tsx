'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  Lightbulb,
  Compass,
  ArrowRight,
  TrendingUp,
  Shield,
  Award,
  CheckCircle2,
  Rocket,
  GitBranch,
  Network,
  Cpu,
  Target,
  Activity,
  Lock,
  Eye,
  Zap,
  Key
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Neural Strategy™"
const PRODUCT_TAGLINE = "High-Fidelity AI Orchestration"

// Outcome-focused benefits
const outcomes = [
  {
    title: "Forensic Roadmap",
    description: "We surgically identify AI opportunities within your business DNA, providing a clinical path to implementation with zero guesswork.",
    icon: Compass,
    metric: "100%",
    metricLabel: "Clarity Index"
  },
  {
    title: "Tactical Implementation",
    description: "We oversee the full neural rollout, ensuring high-fidelity adoption and permanent competitive advantages in your sector.",
    icon: Target,
    metric: "Elite",
    metricLabel: "Strategy"
  },
  {
    title: "Capital Amplification",
    description: "AI is not an expense—it is a revenue engine. We unlock entirely new capital channels through specialized model orchestration.",
    icon: Key,
    metric: "$180M+",
    metricLabel: "Value Unlocked"
  }
]

// Social proof
const socialProof = [
  { value: "54", label: "Enterprises Calibrated" },
  { value: "4.9/5", label: "Protocol Rating" },
  { value: "85%", label: "Adoption Velocity" },
  { value: "Elite", label: "Strategy Tier" }
]

// Transformation phases
const transformation = [
  {
    phase: "Phase 01",
    title: "Neural Mapping",
    outcome: "We surgically analyze your operational flow to identify logic leakage and high-yield AI integration nodes.",
    deliverables: ["Neural Radar", "ROI Blueprint", "Risk Lockdown"]
  },
  {
    phase: "Phase 02",
    title: "Validation Loop",
    outcome: "We build high-fidelity rapid prototypes to verify intent and prove capital viability before global deployment.",
    deliverables: ["POC Method", "Stress Testing", "Logic Validation"]
  },
  {
    phase: "Phase 03",
    title: "Structural Rollout",
    outcome: "We oversee the permanent hard-wiring of AI into your systems, ensuring governed, scalable, and forensic performance.",
    deliverables: ["Node Deployment", "Governance Mesh", "Telemetry Setup"]
  }
]

export default function AIConsultingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      <ServiceSchema
        name={`${PRODUCT_NAME} - Elite AI Consulting by BIGWEB`}
        description={`${PRODUCT_TAGLINE}. Enterprise AI strategy that unlocks revenue. Strategic clarity, risk mitigation, and proven implementation roadmaps.`}
        serviceType="AI Consulting"
        ratingValue={4.9}
        reviewCount={54}
      />

      <AdvancedNavigation />

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-mesh">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" />
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
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)] mb-12"
            >
              <Lightbulb className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
                Strategy System: {PRODUCT_NAME}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85] italic"
            >
              The Neural<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600">
                Strategy™
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-2xl font-bold tracking-widest text-purple-500 uppercase italic mb-12"
            >
              {PRODUCT_TAGLINE}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto leading-tight mb-20 font-light"
            >
              We bridge the gap between <strong className="text-white font-black italic">neural potential</strong> and <strong className="text-white font-black italic">industrial profit</strong>.
              <br />
              <span className="text-white font-black underline decoration-purple-500 underline-offset-8">Consultation is over. Implementation has begun.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
            >
              <Link
                href="/contact"
                className="group relative px-12 py-6 rounded-2xl bg-purple-600 text-white font-black uppercase tracking-widest text-lg hover:bg-purple-500 transition-all hover:scale-105 shadow-2xl shadow-purple-500/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  Start My Strategy
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              <Link
                href="#process"
                className="px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-lg hover:bg-white/10 transition-all font-bold"
              >
                View Roadmap
              </Link>
            </motion.div>

            {/* Strategy Telemetry */}
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

      {/* Strategic Outcomes */}
      <section className="py-32 relative overflow-hidden bg-[#080808]">
        <div className="container mx-auto px-6 mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
            Neural <span className="text-purple-500">Forensics</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Transformation is not accidental. It is <strong className="text-white italic">surgically architected</strong>.
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
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-500"
              >
                <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                  <outcome.icon className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                  <div className="text-5xl font-black text-purple-500 italic tracking-tighter">{outcome.metric}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Stack */}
      <section className="py-24 border-t border-white/5 border-b bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-purple-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Powering The Strategy</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Market Intelligence</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Neural Radar", desc: "Clinical identification of competitive threats and technical logic gaps.", icon: Eye },
              { title: "Governance Mesh", desc: "Forced ethical and technical standards for industrial AI deployment.", icon: Lock },
              { title: "Logic Primitives", desc: "Hard-wired strategic frameworks designed specifically for Large Language systems.", icon: Zap },
            ].map((tool, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-black border border-white/5 hover:border-purple-500/20 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-8 h-8 text-purple-500" />
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
              The <span className="text-purple-500">Neural</span> Loop
            </h2>
            <p className="text-xl text-zinc-500 uppercase tracking-widest font-black">
              How we architect your digital transformation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {transformation.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-purple-500/20 transition-all relative group"
              >
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-purple-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                  Phase {i + 1}
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-purple-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                  </div>
                  <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                  <div className="flex flex-wrap gap-3">
                    {step.deliverables.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/5 border border-purple-500/10">
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
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
        <div className="absolute inset-0 bg-purple-600/5 blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-10"
              >
                <Rocket className="w-4 h-4" /> Vision Locked
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                Define your <span className="text-purple-600">Dominance</span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                Do not settle for AI participation. Engage the strategy that winners use.
                <br />
                <strong className="text-white italic">The Neural Strategy is ready to start.</strong>
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                <Compass className="w-8 h-8" />
                Start Strategy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/services/ai-consulting" />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'AI Consulting', url: '/services/ai-consulting' }
        ]}
      />

      <Footer />
    </main>
  )
}
