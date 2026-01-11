'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function WhitePatternCTA() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Topographic Pattern Background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topographic" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Concentric circles creating topographic effect */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
              <path d="M25 0 L50 14.4 L50 28.9 L25 43.4 L0 28.9 L0 14.4 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topographic)" />
        </svg>
      </div>

      {/* Hexagon Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-accent to-orange-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* Sparkle badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-orange-50/50 border-2 border-accent/20 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Limited Time Offer
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-accent via-orange-600 to-red-600 bg-clip-text text-transparent mt-2">
                Digital Presence?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Join 500+ successful companies who have chosen excellence. Get a free consultation
              and discover how we can help you achieve your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/offers/diagnostic">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-accent to-orange-600 hover:from-accent hover:to-orange-700 text-white text-lg px-8 py-6 shadow-2xl hover:shadow-accent/40 transition-all group"
                >
                  Start Your Diagnostic
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-lg px-8 py-6 transition-all"
                >
                  Schedule Call
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>30-Day Money Back</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-gray-200 rounded-tl-3xl opacity-30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-gray-200 rounded-br-3xl opacity-30" />
    </section>
  )
}
