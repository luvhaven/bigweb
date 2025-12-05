'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Crown, Award, Rocket, Target, Shield, Globe, Clock } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const advantages = [
  {
    icon: Rocket,
    title: 'Launch Faster Than Competitors',
    description: 'Get to market in 30 days while others are still planning',
  },
  {
    icon: Target,
    title: 'Every Pixel Optimized to Convert',
    description: 'Design decisions backed by data, not opinions',
  },
  {
    icon: Shield,
    title: 'Sleep Easy With Bank-Level Security',
    description: 'Enterprise-grade protection for your peace of mind',
  },
  {
    icon: Globe,
    title: 'Built to Scale to Millions',
    description: 'Infrastructure that grows with your success',
  },
  {
    icon: Clock,
    title: 'Help When You Need It Most',
    description: '24/7 support from experts who care about your success',
  },
  {
    icon: Award,
    title: '3x ROI in 90 Days or We Work Free',
    description: 'We guarantee results or keep working until you profit',
    featured: true,
  },
]

export default function CompetitiveEdge() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden bg-gradient-mesh texture-noise">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-full px-4 md:px-6 py-2 md:py-3 backdrop-blur-md mb-4 md:mb-6"
          >
            <Crown className="w-4 h-4 md:w-5 md:h-5 text-accent" />
            <span className="text-accent text-xs md:text-sm font-medium uppercase tracking-wider">
              Competitive Edge
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 px-2"
          >
            Why Smart Businesses
            <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent block md:inline">
              {' '}
              Choose Us
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2"
          >
            Results that speak louder than promises. Here's what sets us apart and drives real ROI for your business.
          </motion.p>
        </div>

        {/* Advantages Grid - Static Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl bg-card/30 border border-border hover:border-accent/30 hover:bg-accent/5 backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {advantage.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
