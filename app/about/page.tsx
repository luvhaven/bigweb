'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Award, Users, Target, Lightbulb, FlaskConical, Binary, Shield, Activity, Lock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Team from '@/components/Team'
import GlobalCommandCenter from '@/components/visualizations/GlobalCommandCenter'

const values = [
  {
    icon: Target,
    title: "Outcome-Obsessed",
    description: "We don't care about vanity metrics. We care about Revenue, ROAS, and Conversion Rate. Every pixel we place has a job to do.",
  },
  {
    icon: Lightbulb,
    title: "Engineering > Art",
    description: "Design without data is just decoration. We are Conversion Engineers who build systems, not just pretty pictures.",
  },
  {
    icon: Users,
    title: "Growth Partners",
    description: "We work as your in-house CRO team. We are brutally honest about what's working and what isn't, because your growth is our case study.",
  },
  {
    icon: Award,
    title: "Scientific Process",
    description: "We don't guess. We test. Our 'Lab' methodology ensures that every change is a hypothesis validated by user data.",
  },
]

export default function AboutPage() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30" ref={containerRef}>
      <AdvancedNavigation />

      {/* Hero Section */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-mesh">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px]" />

        <motion.div style={{ opacity, scale }} className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-orange-500/20 mb-12 shadow-[0_0_30px_rgba(249,115,22,0.1)]"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
              About BIGWEB
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] uppercase italic">
            Conversion<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-zinc-700">Engineers.</span>
          </h1>

          <p className="text-xl md:text-3xl text-zinc-400 leading-tight max-w-4xl mx-auto mb-16 font-light italic">
            We bridge the gap between "aesthetic" and <strong className="text-white font-black italic underline decoration-orange-600 underline-offset-8">profitable</strong>.
            <br />
            We are the laboratory where revenue is manufactured.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-40 bg-black relative border-y border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic">Our DNA</h2>
                <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                  Most agencies are full of artists. We are full of scientists.
                  We believe that websites exist for one reason: <strong className="text-white italic">to convert strangers into capital flows.</strong>
                </p>
              </div>

              <div className="grid gap-10">
                {values.map((v, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                      <v.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-3 uppercase italic tracking-tight">{v.title}</h3>
                      <p className="text-zinc-500 font-medium leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden bg-white/[0.02] border border-white/10 relative p-8 backdrop-blur-3xl shadow-2xl">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                <div className="relative z-10 w-full h-full">
                  <GlobalCommandCenter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-40 relative overflow-hidden bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Why Choose <span className="text-orange-600">BIGWEB</span></h2>
            <p className="text-xl text-zinc-500 mt-6 max-w-2xl mx-auto">We combine technical excellence with business strategy to deliver measurable results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Enterprise Security", desc: "Bank-level encryption and data protection for your peace of mind." },
              { title: "Real-Time Sync", desc: "Instant updates across all platforms and devices." },
              { title: "24/7 Monitoring", desc: "Round-the-clock system health checks and performance tracking." },
              { title: "Precision Deployment", desc: "Zero-downtime releases with automated rollback protection." },
            ].map((tool, i) => (
              <div key={i} className="flex flex-col p-8 rounded-3xl bg-black border border-white/5 hover:border-orange-500/20 transition-all group">
                <div className="w-2 h-12 bg-orange-500/20 rounded-full mb-6 group-hover:bg-orange-500 transition-colors" />
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{tool.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium text-sm">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <div className="py-20 border-t border-white/5">
        <Team />
      </div>

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
                <Lock className="w-4 h-4" /> Lab Access Private
              </motion.div>

              <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                Ready to <span className="text-orange-600">Grow?</span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                Don't settle for average results.
                <br />
                <strong className="text-white italic">Let's build something exceptional together.</strong>
              </p>

              <Link href="/contact">
                <Button size="xl" className="h-20 px-16 rounded-[2rem] bg-white text-black hover:bg-zinc-100 font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                  Start Your Project
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
