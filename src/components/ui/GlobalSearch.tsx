'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, ArrowRight, Home, Mail, Phone, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SearchResult {
    title: string
    description: string
    href: string
    category: 'page' | 'service' | 'action'
}

const searchData: SearchResult[] = [
    { title: 'Home', description: 'Return to homepage', href: '/', category: 'page' },
    { title: 'Portfolio', description: 'View our work', href: '/portfolio', category: 'page' },
    { title: 'About Us', description: 'Learn about our team', href: '/about', category: 'page' },
    { title: 'Contact', description: 'Get in touch', href: '/contact', category: 'page' },
    { title: 'Web Development', description: 'Custom web applications', href: '/services/web-development', category: 'service' },
    { title: 'Mobile Apps', description: 'iOS and Android development', href: '/services/mobile-apps', category: 'service' },
    { title: 'UI/UX Design', description: 'Beautiful user experiences', href: '/services/ui-ux-design', category: 'service' },
    { title: 'SEO & Marketing', description: 'Grow your online presence', href: '/services/seo-growth', category: 'service' },
    { title: 'Get Quote', description: 'Request a project estimate', href: '/estimator', category: 'action' },
    { title: 'Website Maintenance', description: '24/7 security, speed & uptime', href: '/services/maintenance', category: 'service' },
]

export default function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>(searchData)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (query.trim() === '') {
            setResults(searchData)
        } else {
            const filtered = searchData.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filtered)
        }
        setSelectedIndex(0)
    }, [query])

    const handleSelect = useCallback((href: string) => {
        setIsOpen(false)
        setQuery('')
        router.push(href)
    }, [router])

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex(prev => (prev + 1) % results.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length)
            } else if (e.key === 'Enter' && results[selectedIndex]) {
                e.preventDefault()
                handleSelect(results[selectedIndex].href)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, results, selectedIndex, handleSelect])

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-secondary/50 hover:bg-secondary rounded-lg text-sm text-muted-foreground transition-colors"
            >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <kbd className="ml-auto px-2 py-0.5 bg-background rounded text-xs border border-border">
                    <Command className="w-3 h-3 inline" />K
                </kbd>
            </button>

            {/* Search Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-start justify-center pt-[20vh] px-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                                <Search className="w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search pages, services, or actions..."
                                    className="flex-1 bg-transparent outline-none text-lg"
                                    autoFocus
                                />
                                <kbd className="px-2 py-1 bg-secondary rounded text-xs border border-border">ESC</kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-[400px] overflow-y-auto">
                                {results.length === 0 ? (
                                    <div className="p-8 text-center text-muted-foreground">
                                        No results found for "{query}"
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        {results.map((result, index) => (
                                            <button
                                                key={result.href}
                                                onClick={() => handleSelect(result.href)}
                                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-colors ${index === selectedIndex ? 'bg-accent text-white' : 'hover:bg-secondary/50'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === selectedIndex ? 'bg-white/20' : 'bg-accent/10'
                                                    }`}>
                                                    {result.category === 'page' && <FileText className="w-5 h-5" />}
                                                    {result.category === 'service' && <Home className="w-5 h-5" />}
                                                    {result.category === 'action' && <Mail className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold">{result.title}</div>
                                                    <div className={`text-sm ${index === selectedIndex ? 'text-white/80' : 'text-muted-foreground'}`}>
                                                        {result.description}
                                                    </div>
                                                </div>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 border-t border-border bg-secondary/30 flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↑↓</kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↵</kbd>
                                        Select
                                    </span>
                                </div>
                                <span>Press ESC to close</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
