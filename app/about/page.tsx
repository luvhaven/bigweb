'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Award, Users, Target, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import { supabase } from '@/utils/supabase'
import Team from '@/components/Team'
import GlobalCommandCenter from '@/components/visualizations/GlobalCommandCenter'
// Globe is likely unused or can be re-imported if needed, but I'll skip if not essential
// or check if it's used. The previous file had it.
import Globe from '@/components/Globe'

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
    title: "Your Growth Partners",
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

  // Simple parallax or opacity transform
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent/30" ref={containerRef}>
      <ConversionNavigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
        <motion.div style={{ opacity, scale }} className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
            We Are <br />
            <span className="text-accent">Conversion Engineers.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We bridge the gap between "good looking" and "money making".
            We are the lab where revenue is manufactured.
          </p>
        </motion.div>

        {/* Background Globe/Vis */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Globe />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our DNA</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Most agencies are full of artists. We are full of scientists.
                We believe that websites exist for one reason: to convert strangers into customers.
              </p>
              <div className="grid gap-8">
                {values.map((v, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <v.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                      <p className="text-muted-foreground">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* Image or Visual */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-accent/5 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <GlobalCommandCenter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - The Humans behind the Algorithm */}
      <Team />

      <section className="py-24 bg-accent text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Engineer Your Growth?</h2>
          <Button asChild size="lg" variant="secondary" className="text-accent bg-white">
            <Link href="/offers/diagnostic">Start Your Diagnostic <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
