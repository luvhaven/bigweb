'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Command } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const quickLinks = [
  { name: 'Home', path: '/', key: 'h' },
  { name: 'Services', path: '/services', key: 's' },
  { name: 'Portfolio', path: '/portfolio', key: 'p' },
  { name: 'About', path: '/about', key: 'a' },
  { name: 'Blog', path: '/blog', key: 'b' },
  { name: 'Contact', path: '/contact', key: 'c' },
  { name: 'Get Estimate', path: '/estimator', key: 'e' },
]

export default function QuickAccessMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredLinks = quickLinks.filter(link =>
    link.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleNavigate = (path: string) => {
    router.push(path)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-50 hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 backdrop-blur-md border border-border shadow-lg hover:shadow-xl transition-all text-sm text-muted-foreground hover:text-foreground"
      >
        <Command className="w-4 h-4" />
        <span>Quick Access</span>
        <kbd className="px-2 py-1 text-xs bg-secondary rounded">⌘K</kbd>
      </motion.button>

      {/* Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90]"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl"
            >
              <div className="mx-4 bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-border">
                  <input
                    type="text"
                    placeholder="Search pages... (or use arrow keys)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                  />
                </div>

                {/* Links */}
                <div className="p-2 max-h-96 overflow-y-auto">
                  {filteredLinks.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No pages found
                    </div>
                  ) : (
                    filteredLinks.map((link, index) => (
                      <motion.button
                        key={link.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}
                        onClick={() => handleNavigate(link.path)}
                        className="w-full flex items-center justify-between p-3 rounded-lg transition-colors group"
                      >
                        <span className="text-sm font-medium group-hover:text-accent transition-colors">
                          {link.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <kbd className="px-2 py-1 text-xs bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {link.key}
                          </kbd>
                          <span className="text-xs text-muted-foreground">{link.path}</span>
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-secondary/20">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-secondary rounded">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-secondary rounded">↓</kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-secondary rounded">Enter</kbd>
                      <span>Select</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-secondary rounded">Esc</kbd>
                    <span>Close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
