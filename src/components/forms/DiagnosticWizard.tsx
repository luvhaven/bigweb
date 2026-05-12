'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Globe, Mail, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

export default function AuditWizard() {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        website_url: '',
        pain_point: '',
        name: '',
        email: '',
    })

    const handleNext = () => {
        if (step === 1) {
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
            if (!formData.website_url) {
                setError('Please enter your website URL')
                return
            }
            if (!urlPattern.test(formData.website_url)) {
                setError('Please enter a valid website address (e.g., https://example.com)')
                return
            }
        }
        if (step === 2 && !formData.pain_point) {
            setError('Please select a primary challenge')
            return
        }
        setError('')
        setStep(step + 1)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!formData.name) {
            setError('Please enter your name')
            return
        }
        if (!formData.email) {
            setError('Please enter your email')
            return
        }
        if (!emailPattern.test(formData.email)) {
            setError('Please enter a valid work email address')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            const { data, error: dbError } = await supabase
                .from('cms_leads')
                .insert({
                    type: 'audit',
                    name: formData.name,
                    email: formData.email,
                    website_url: formData.website_url,
                    pain_point: formData.pain_point,
                    status: 'new',
                    metadata: {
                        source: 'wizard_v1',
                        submitted_at: new Date().toISOString()
                    }
                })
                .select()

            if (dbError) {
                console.error('Database error details:', dbError)
                throw new Error(dbError.message || 'Failed to submit form')
            }

            console.log('Form submitted successfully:', data)
            setIsSuccess(true)
        } catch (err: any) {
            console.error('Submission error:', err)
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 max-w-lg mx-auto shadow-luxury text-center border-accent/20"
            >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/30">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 gradient-text">Request Received</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                    Our team has queued <strong className="text-foreground">{formData.website_url}</strong> for analysis.
                    You will receive your video breakdown via email within 48 hours.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-accent/20 hover:bg-accent/5">
                    Submit Another Site
                </Button>
            </motion.div>
        )
    }

    return (
        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-xl mx-auto shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
                <motion.div
                    className="h-full bg-gradient-to-r from-accent to-purple-600"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="mb-10 mt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4 border border-accent/20">
                    Step {step} of 3
                </span>
                <h2 className="text-3xl font-bold mt-1 tracking-tight">
                    {step === 1 && "Start Your Audit"}
                    {step === 2 && "Identify Blockers"}
                    {step === 3 && "Where should we send it?"}
                </h2>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="space-y-3">
                                <Label htmlFor="url" className="text-base">Website URL</Label>
                                <div className="relative group">
                                    <Globe className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                                    <Input
                                        id="url"
                                        placeholder="https://example.com"
                                        className="pl-12 h-14 text-lg bg-secondary/50 border-white/10 focus:border-accent/50 focus:ring-accent/20"
                                        value={formData.website_url}
                                        onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground">The URL we will analyze for conversion bottlenecks.</p>
                            </div>
                            <Button type="button" onClick={handleNext} className="w-full h-12 text-lg bg-accent hover:bg-accent-dark shadow-lg shadow-accent/20">
                                Next Step <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <Label className="text-base">What is your biggest pain point?</Label>
                                <div className="grid gap-3">
                                    {['Traffic but no sales', 'Low quality leads', 'High bounce rate', 'Site feels outdated', 'Other'].map((option) => (
                                        <div
                                            key={option}
                                            className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between group ${formData.pain_point === option ? 'border-accent bg-accent/10 ring-1 ring-accent shadow-lg' : 'border-white/10 bg-secondary/30 hover:bg-secondary/50 hover:border-accent/30'}`}
                                            onClick={() => setFormData({ ...formData, pain_point: option })}
                                        >
                                            <span className="text-base font-medium">{option}</span>
                                            {formData.pain_point === option && <CheckCircle2 className="w-5 h-5 text-accent" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-12 w-1/3">Back</Button>
                                <Button type="button" onClick={handleNext} className="w-full h-12 text-lg bg-accent hover:bg-accent-dark shadow-lg shadow-accent/20">
                                    Final Step
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-base">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="h-12 bg-secondary/50 border-white/10 text-lg"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base">Work Email</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@company.com"
                                            className="pl-12 h-12 bg-secondary/50 border-white/10 text-lg"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setStep(2)} className="h-12 w-1/3">Back</Button>
                                <Button type="submit" className="w-full h-12 text-lg bg-accent hover:bg-accent-dark shadow-lg shadow-accent/20" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Get My Audit"
                                    )}
                                </Button>
                            </div>
                            <p className="text-xs text-center text-muted-foreground opacity-70">
                                We respect your inbox. No spam, just the report. By clicking below, you agree to our terms.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    )
}
