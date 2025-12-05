'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUp, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

export default function FloatingActionButton() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end"
          >
            {/* Quick Actions when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-3"
                >
                  {/* Contact */}
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-2xl flex items-center justify-center group relative"
                      data-tooltip="Contact Us"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </motion.button>
                  </Link>

                  {/* Call */}
                  <motion.a
                    href="tel:+1234567890"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-2xl flex items-center justify-center group relative"
                    data-tooltip="Call Us"
                  >
                    <Phone className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main FAB */}
            <div className="flex flex-col items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-orange-600 text-white shadow-2xl hover:shadow-accent/50 flex items-center justify-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <ArrowUp className="w-6 h-6 relative z-10" />

                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/50"
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </motion.button>

              {/* Expand/Collapse Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border"
              >
                {isExpanded ? 'Less' : 'More'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
