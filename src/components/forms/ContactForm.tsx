'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Send, Loader2, CheckCircle2, AlertCircle, ChevronRight, Compass, Zap, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

/* ── Package definitions ── */
const PACKAGES = [
    {
        id: 'revenue-roadmap',
        name: 'Revenue Roadmap',
        tagline: 'Strategic growth blueprint',
        price: '$4,997',
        note: 'one-time',
        desc: 'A forensic 2-week strategy sprint. Walk away with a battle-tested blueprint before a single pixel is designed.',
        color: '#6366f1',
        icon: Compass,
        cta: 'Book Discovery Sprint',
    },
    {
        id: 'revenue-system',
        name: 'The Monolith™ System',
        tagline: 'Complete revenue transformation',
        price: 'From $18,000',
        note: 'project-based',
        desc: 'Full-stack build — brand, engineering, CRO, and analytics — orchestrated as one unified revenue system.',
        color: '#d4a853',
        icon: Zap,
        badge: 'Most Chosen',
        cta: 'Start Your Project',
    },
    {
        id: 'retainer',
        name: 'Growth Retainer',
        tagline: 'Embedded senior growth team',
        price: 'From $6,000',
        note: '/ month',
        desc: 'Your dedicated senior team — CRO testing, dev sprints, analytics, and strategy every single month.',
        color: '#10b981',
        icon: Shield,
        cta: 'Apply for Retainer',
    },
    {
        id: 'general',
        name: 'General Inquiry',
        tagline: 'Not sure yet',
        price: null,
        note: null,
        desc: 'Tell us about your situation and we\'ll recommend the best path forward for your specific goals.',
        color: '#71717a',
        icon: ChevronRight,
        cta: 'Send Inquiry',
    },
]

const BUDGETS = [
    { id: 'under-5k', label: 'Under $5K' },
    { id: '5k-15k', label: '$5K – $15K' },
    { id: '15k-30k', label: '$15K – $30K' },
    { id: '30k-plus', label: '$30K+' },
    { id: 'not-sure', label: 'Not sure yet' },
]

const TIMELINES = [
    { id: 'asap', label: 'ASAP' },
    { id: '1-month', label: 'Within 1 month' },
    { id: '1-3-months', label: '1–3 months' },
    { id: '3-plus', label: '3+ months' },
]

interface FormState {
    name: string
    email: string
    company: string
    website: string
    package: string
    budget: string
    timeline: string
    message: string
}

export default function ContactForm({
    defaultPackage = '',
}: {
    defaultPackage?: string
}) {
    const [step, setStep] = useState<'package' | 'details' | 'success'>('package')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        company: '',
        website: '',
        package: defaultPackage,
        budget: '',
        timeline: '',
        message: '',
    })

    useEffect(() => {
        if (defaultPackage) {
            setForm(prev => ({ ...prev, package: defaultPackage }))
            if (defaultPackage !== 'general') setStep('details')
        }
    }, [defaultPackage])

    const selectedPkg = PACKAGES.find(p => p.id === form.package)

    const handlePackageSelect = (id: string) => {
        setForm(prev => ({ ...prev, package: id }))
        setTimeout(() => setStep('details'), 200)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) {
            setError('Please fill in all required fields.')
            return
        }
        setIsSubmitting(true)
        setError('')

        try {
            const { error: dbError } = await supabase.from('cms_leads').insert({
                type: 'contact',
                name: form.name,
                email: form.email,
                message: form.message,
                plan: form.package || null,
                status: 'new',
                metadata: {
                    company: form.company,
                    website: form.website,
                    budget: form.budget,
                    timeline: form.timeline,
                    source: 'contact_form',
                    submitted_at: new Date().toISOString(),
                },
            })
            if (dbError) throw new Error(dbError.message)
            setStep('success')
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputClass = `w-full bg-[#080808] border border-white/[0.07] rounded-xl px-4 py-3.5 text-white placeholder-zinc-600
        text-[14px] font-medium outline-none focus:border-white/20 focus:ring-0 transition-all duration-200
        hover:border-white/10`

    /* ── Step 1: Package selection ── */
    if (step === 'package') {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key="package-step"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">
                        What brings you here?
                    </p>
                    <div className="space-y-3">
                        {PACKAGES.map((pkg, i) => {
                            const Icon = pkg.icon
                            return (
                                <motion.button
                                    key={pkg.id}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                    onClick={() => handlePackageSelect(pkg.id)}
                                    className="w-full text-left group relative flex items-center gap-5 p-5 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
                                >
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: `${pkg.color}18`, border: `1px solid ${pkg.color}30` }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: pkg.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[14px] font-bold text-white tracking-tight">{pkg.name}</span>
                                            {pkg.badge && (
                                                <span
                                                    className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border"
                                                    style={{ color: pkg.color, borderColor: `${pkg.color}40`, background: `${pkg.color}12` }}
                                                >
                                                    {pkg.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-zinc-500 text-[12px] leading-relaxed truncate pr-4">{pkg.desc}</p>
                                    </div>
                                    {pkg.price && (
                                        <div className="text-right shrink-0">
                                            <div className="text-sm font-black font-display" style={{ color: pkg.color }}>{pkg.price}</div>
                                            <div className="text-[10px] text-zinc-700 font-mono">{pkg.note}</div>
                                        </div>
                                    )}
                                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse at left, ${pkg.color}08, transparent 70%)` }} />
                                </motion.button>
                            )
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }

    /* ── Step 3: Success ── */
    if (step === 'success') {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key="success-step"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-12"
                >
                    <div className="relative inline-flex items-center justify-center mb-8">
                        <div className="absolute w-24 h-24 rounded-full bg-emerald-500/10 animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="relative w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                        </div>
                    </div>
                    <h3 className="font-display font-black text-3xl text-white tracking-tighter italic mb-3">
                        We&apos;ve received you.
                    </h3>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-sm mx-auto mb-8">
                        Thanks, <span className="text-white font-semibold">{form.name}</span>. We&apos;ll review your brief and get back to you at{' '}
                        <span className="text-white font-semibold">{form.email}</span> within <span className="text-emerald-400 font-semibold">24 hours</span>.
                    </p>
                    {selectedPkg && (
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
                            style={{ color: selectedPkg.color, borderColor: `${selectedPkg.color}30`, background: `${selectedPkg.color}10` }}
                        >
                            {selectedPkg.name} — {selectedPkg.cta}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        )
    }

    /* ── Step 2: Details form ── */
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="details-step"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Selected package indicator + back */}
                <div className="flex items-center justify-between mb-8">
                    {selectedPkg && (
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-widest"
                            style={{ color: selectedPkg.color, borderColor: `${selectedPkg.color}35`, background: `${selectedPkg.color}10` }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: selectedPkg.color }} />
                            {selectedPkg.name}
                        </div>
                    )}
                    <button
                        onClick={() => setStep('package')}
                        className="text-[11px] text-zinc-600 hover:text-white transition-colors font-mono uppercase tracking-widest"
                    >
                        ← Change
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                className={inputClass}
                                placeholder="Your full name"
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                                Work Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                className={inputClass}
                                placeholder="you@company.com"
                                value={form.email}
                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    {/* Company + Website */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                                Company
                            </label>
                            <input
                                className={inputClass}
                                placeholder="Company name"
                                value={form.company}
                                onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                                Current Website
                            </label>
                            <input
                                className={inputClass}
                                placeholder="https://yoursite.com"
                                value={form.website}
                                onChange={e => setForm(p => ({ ...p, website: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
                            Project Budget
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {BUDGETS.map(b => (
                                <button
                                    key={b.id}
                                    type="button"
                                    onClick={() => setForm(p => ({ ...p, budget: b.id }))}
                                    className={`px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${
                                        form.budget === b.id
                                            ? 'border-accent/50 bg-accent/10 text-accent'
                                            : 'border-white/[0.06] text-zinc-500 hover:border-white/[0.14] hover:text-zinc-300'
                                    }`}
                                >
                                    {b.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
                            Desired Timeline
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {TIMELINES.map(t => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setForm(p => ({ ...p, timeline: t.id }))}
                                    className={`px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${
                                        form.timeline === t.id
                                            ? 'border-accent/50 bg-accent/10 text-accent'
                                            : 'border-white/[0.06] text-zinc-500 hover:border-white/[0.14] hover:text-zinc-300'
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                            Tell Us About Your Project <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={5}
                            className={`${inputClass} resize-none`}
                            placeholder="What are your goals? What's not working today? What does success look like in 6 months?"
                            value={form.message}
                            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2.5 text-sm text-red-400 bg-red-500/8 border border-red-500/15 px-4 py-3.5 rounded-xl">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full relative overflow-hidden flex items-center justify-center gap-3 py-4.5 rounded-2xl bg-white text-black font-black text-[13px] tracking-[0.1em] uppercase hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
                    >
                        <span className="absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 skew-x-12" />
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <span className="relative">{selectedPkg?.cta || 'Send Message'}</span>
                                <Send className="w-4 h-4 relative group-hover:translate-x-0.5 transition-transform" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-[11px] text-zinc-600 font-mono">
                        NDA signed on day one · 24-hour response guaranteed · No spam, ever.
                    </p>
                </form>
            </motion.div>
        </AnimatePresence>
    )
}
