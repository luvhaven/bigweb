'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function PortfolioCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-accent/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-500/20 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 85, 39, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 85, 39, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        {/* Animated Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
              x: ['-100%', '0%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Let's Create Something Amazing
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 leading-tight"
          >
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-accent via-orange-500 to-purple-500 bg-clip-text text-transparent">
              Your Digital Vision?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Join hundreds of ambitious brands who've elevated their digital presence with our 
            award-winning solutions. Your project could be our next success story.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/estimator">
              <Button size="lg" className="text-lg px-10 py-7 group shadow-2xl shadow-accent/20">
                <Zap className="mr-2 w-5 h-5" />
                Get Instant Estimate
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2">
                <TrendingUp className="mr-2 w-5 h-5" />
                Schedule a Call
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '3.2x', label: 'Avg ROI Increase' },
              { value: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by industry leaders and innovative startups worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {['Stripe', 'Shopify', 'AWS', 'Vercel', 'Netlify'].map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 0.5, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className="text-2xl font-bold text-foreground/50 hover:text-foreground transition-all"
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 C150,80 350,0 600,50 C850,100 1050,20 1200,50 L1200,120 L0,120 Z"
            fill="hsl(var(--background))"
            initial={{ d: "M0,50 C150,80 350,0 600,50 C850,100 1050,20 1200,50 L1200,120 L0,120 Z" }}
            animate={{
              d: [
                "M0,50 C150,80 350,0 600,50 C850,100 1050,20 1200,50 L1200,120 L0,120 Z",
                "M0,70 C150,40 350,80 600,50 C850,20 1050,100 1200,50 L1200,120 L0,120 Z",
                "M0,50 C150,80 350,0 600,50 C850,100 1050,20 1200,50 L1200,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </section>
  )
}
