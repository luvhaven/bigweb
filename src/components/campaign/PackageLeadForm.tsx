'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, Loader2, Sparkles, User, Mail, Phone, Building, Globe, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface PackageLeadFormProps {
    packageSlug: string
    packageName: string
    themeColor?: string
    onSuccess?: () => void
}

export default function PackageLeadForm({ packageSlug, packageName, themeColor = 'emerald', onSuccess }: PackageLeadFormProps) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        websiteUrl: '',
        message: ''
    })

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/campaign/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    packageSlug,
                    source: 'landing_page',
                    utm_source: new URLSearchParams(window.location.search).get('utm_source'),
                    utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
                    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
                })
            })

            if (response.ok) {
                setSuccess(true)
                onSuccess?.()
            }
        } catch (error) {
            console.error('Error submitting lead:', error)
        } finally {
            setLoading(false)
        }
    }

    const colorClasses = {
        emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
        blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
        violet: 'from-violet-500 to-violet-600 shadow-violet-500/25'
    }

    const steps = [
        { title: 'Your Info', fields: ['fullName', 'email'] },
        { title: 'Business', fields: ['phone', 'companyName'] },
        { title: 'Project', fields: ['websiteUrl', 'message'] }
    ]

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-6"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">You're In!</h3>
                <p className="text-white/60 mb-6">
                    We've received your request for {packageName}. Our team will contact you within 24 hours to discuss your project.
                </p>
                <p className="text-sm text-white/40">
                    Check your email for confirmation and next steps.
                </p>
            </motion.div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
                {steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step > i + 1
                                    ? 'bg-green-500 text-white'
                                    : step === i + 1
                                        ? `bg-gradient-to-r ${colorClasses[themeColor as keyof typeof colorClasses]} text-white shadow-lg`
                                        : 'bg-white/10 text-white/40'
                                }`}
                            animate={{ scale: step === i + 1 ? 1.1 : 1 }}
                        >
                            {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                        </motion.div>
                        <span className={`text-xs hidden md:block ${step === i + 1 ? 'text-white' : 'text-white/40'}`}>
                            {s.title}
                        </span>
                        {i < steps.length - 1 && (
                            <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-white/10'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label className="text-white/70 flex items-center gap-2">
                                <User className="w-4 h-4" /> Full Name
                            </Label>
                            <Input
                                value={formData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                placeholder="John Smith"
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white/70 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email Address
                            </Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                placeholder="john@company.com"
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent"
                            />
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label className="text-white/70 flex items-center gap-2">
                                <Phone className="w-4 h-4" /> Phone Number
                            </Label>
                            <Input
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white/70 flex items-center gap-2">
                                <Building className="w-4 h-4" /> Company Name
                            </Label>
                            <Input
                                value={formData.companyName}
                                onChange={(e) => updateField('companyName', e.target.value)}
                                placeholder="Acme Inc."
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent"
                            />
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label className="text-white/70 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Current Website (optional)
                            </Label>
                            <Input
                                value={formData.websiteUrl}
                                onChange={(e) => updateField('websiteUrl', e.target.value)}
                                placeholder="https://yoursite.com"
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white/70 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Tell us about your project
                            </Label>
                            <Textarea
                                value={formData.message}
                                onChange={(e) => updateField('message', e.target.value)}
                                placeholder="What are your goals for 2026?"
                                rows={3}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-accent resize-none"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
                {step > 1 && (
                    <Button
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        className="flex-1 h-12 border-white/10 text-white hover:bg-white/5"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                )}
                {step < 3 ? (
                    <Button
                        onClick={() => setStep(step + 1)}
                        disabled={step === 1 && (!formData.fullName || !formData.email)}
                        className={`flex-1 h-12 bg-gradient-to-r ${colorClasses[themeColor as keyof typeof colorClasses]} text-white shadow-lg hover:opacity-90`}
                    >
                        Continue
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`flex-1 h-12 bg-gradient-to-r ${colorClasses[themeColor as keyof typeof colorClasses]} text-white shadow-lg hover:opacity-90`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Securing Your Spot...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Claim My Package
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}
