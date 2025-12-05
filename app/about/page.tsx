'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Users, Target, Lightbulb } from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every decision we make is backed by data and focused on achieving measurable business outcomes that matter to your bottom line",
  },
  {
    icon: Lightbulb,
    title: "Innovation Leaders",
    description: "We don't follow trends—we set them. Our team stays ahead of the curve to deliver cutting-edge solutions that give you a competitive advantage",
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "Your success is our success. We become an extension of your team, invested in your growth and committed to long-term results",
  },
  {
    icon: Award,
    title: "Excellence Obsessed",
    description: "We're perfectionists who sweat the details. From pixel-perfect design to lightning-fast performance, quality is non-negotiable",
  },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>

        <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold letter-spacing-wide mb-6"
            >
              We are <span className="text-accent">BIGWEB</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              A digital powerhouse transforming ambitious brands into industry dominators through strategic web experiences that convert
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
                  Our Story
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold letter-spacing-wide mb-6">
                  Built by obsession, driven by results
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  BIGWEB was founded in 2010 by a team of visionary technologists and designers who refused to accept the status quo. We recognized that in the AI era, your digital presence isn't just a brochure—it's your primary engine for growth.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  Over the last decade, we've evolved into a global digital powerhouse. We don't just build websites; we engineer digital ecosystems that dominate markets.
                </p>

                <div className="grid grid-cols-2 gap-8 py-6 border-t border-white/10">
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">150+</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">Successful Projects</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">$500M+</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">Client Revenue Generated</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">98%</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">Client Retention</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">15+</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">Industry Awards</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent transition-all duration-500"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6"
                  >
                    <value.icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  <h4 className="text-xl font-bold letter-spacing-wide mb-3">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold letter-spacing-wide mb-6">
              Ready to dominate your industry?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's build a digital experience that doesn't just compete—it dominates
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary-foreground letter-spacing-wide group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main >
  )
}
