'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Download, FileText, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ExitIntentModal() {
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const hasDismissed = sessionStorage.getItem('exit-modal-dismissed')
        if (hasDismissed) return

        let triggered = false
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !triggered && !dismissed) {
                triggered = true
                setTimeout(() => setVisible(true), 300)
            }
        }

        // Also trigger after 45s for mobile users
        const timer = setTimeout(() => {
            if (!triggered && !dismissed) {
                triggered = true
                setVisible(true)
            }
        }, 45000)

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleDismiss()
            }
        }

        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('keydown', handleKeyDown)
            clearTimeout(timer)
        }
    }, [dismissed])

    const handleDismiss = () => {
        if (!visible) return
        setVisible(false)
        setDismissed(true)
        sessionStorage.setItem('exit-modal-dismissed', '1')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || status === 'loading') return
        setStatus('loading')

        try {
            const res = await fetch('/api/blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()

            if (data.success) {
                setDownloadUrl(data.downloadUrl)
                setStatus('success')
                // Start auto-download if URL is available
                if (data.downloadUrl) {
                    const link = document.createElement('a')
                    link.href = data.downloadUrl
                    link.download = '90-Day-Conversion-Blueprint-BIGWEB.pdf'
                    link.click()
                }
                // Auto-dismiss after 6s
                setTimeout(handleDismiss, 6000)
            } else {
                setStatus('error')
                setTimeout(() => setStatus('idle'), 3000)
            }
        } catch {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    if (!mounted) return null

    return (
        <AnimatePresence>
            {visible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleDismiss}
                        className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[301] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative max-w-lg w-full rounded-3xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #0d0d0d 0%, #111 100%)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                boxShadow: '0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Animated accent glow */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/5 rounded-full blur-[80px]" />
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/3 rounded-full blur-[80px]" />
                            </div>

                            {/* Top accent line */}
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                            <div className="relative p-10 md:p-12">
                                {/* Close */}
                                <button
                                    type="button"
                                    onClick={handleDismiss}
                                    className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center text-zinc-600 hover:text-white hover:border-white/[0.2] transition-all duration-300 z-50"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center py-6"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6"
                                            >
                                                <CheckCircle2 className="w-10 h-10 text-accent" />
                                            </motion.div>
                                            <h4 className="font-display text-2xl md:text-3xl text-white mb-3">Blueprint Unlocked!</h4>
                                            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                                Your download should start automatically.<br />
                                                Check your email — we just sent you the full framework.
                                            </p>
                                            {downloadUrl && (
                                                <a
                                                    href={downloadUrl}
                                                    download="90-Day-Conversion-Blueprint-BIGWEB.pdf"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download Again
                                                </a>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            {/* PDF Preview Icon */}
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-12 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center shrink-0">
                                                    <FileText className="w-6 h-6 text-accent" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent">Free Download</span>
                                                        <Sparkles className="w-3 h-3 text-accent" />
                                                    </div>
                                                    <p className="text-xs text-zinc-500 mt-0.5">The 90-Day Conversion Blueprint · PDF</p>
                                                </div>
                                            </div>

                                            <h3 className="font-display text-3xl md:text-[2.5rem] tracking-tight text-white mb-4 leading-[1.1]">
                                                Steal our exact playbook for{' '}
                                                <em className="italic text-accent">7-figure conversions.</em>
                                            </h3>

                                            <p className="text-sm text-zinc-500 leading-relaxed mb-8">
                                                The precise UI/UX and growth framework we use to engineer high-converting platforms for industry leaders. No fluff. Pure strategy.
                                            </p>

                                            {/* What's inside */}
                                            <div className="grid grid-cols-2 gap-2 mb-8">
                                                {[
                                                    'Conversion Architecture',
                                                    'Revenue Funnel Maps',
                                                    'UX Psychology Tactics',
                                                    '90-Day Growth Roadmap',
                                                ].map((item) => (
                                                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
                                                        <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-3">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                        placeholder="Your best email"
                                                        required
                                                        disabled={status === 'loading'}
                                                        className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all disabled:opacity-50"
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={status === 'loading'}
                                                        className="group relative px-6 py-3 bg-white rounded-xl text-[#0a0a0a] text-sm font-semibold flex items-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 shrink-0 disabled:opacity-50"
                                                    >
                                                        {status === 'loading' ? (
                                                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <>
                                                                Download
                                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                                {status === 'error' && (
                                                    <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                                                )}
                                                <p className="text-[11px] text-zinc-700">
                                                    No spam, ever. Unsubscribe instantly at any time.
                                                </p>
                                            </form>

                                            <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
                                                <Link
                                                    href="/case-studies"
                                                    onClick={handleDismiss}
                                                    className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                                                >
                                                    View our work first →
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={handleDismiss}
                                                    className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors"
                                                >
                                                    No thanks
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom accent line */}
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
