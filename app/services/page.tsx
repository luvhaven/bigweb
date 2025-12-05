'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ExpandingServices from '@/components/ExpandingServices'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'

const benefits = [
  "Free initial consultation and strategy session",
  "Dedicated project manager assigned to your account",
  "Transparent pricing with no hidden fees",
  "Ongoing support and maintenance packages available",
  "Money-back guarantee if we don't meet agreed KPIs",
  "Flexible payment plans for qualified projects"
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-sm uppercase tracking-widest text-accent mb-4">Our Services</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Services That <span className="text-accent">Transform Businesses</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We don't just build websites—we engineer digital growth machines that drive measurable ROI. 
              Every service is designed to convert visitors into customers and scale your revenue.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Get Instant Estimate
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expanding Services Cards */}
      <ExpandingServices />

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Why Partner With Us?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-card p-6 rounded-lg border border-border hover:border-accent transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Proven Process
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              A streamlined approach that delivers results on time and on budget
            </p>
            
            <div className="grid md:grid-cols-5 gap-4 text-center">
              {['Discovery', 'Strategy', 'Design', 'Develop', 'Launch'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <div className="text-4xl font-bold text-accent mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="font-semibold">{step}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a custom proposal tailored to your business goals and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                  Get Instant Estimate
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
