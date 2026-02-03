'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, User, MessageSquare, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

interface ContactFormProps {
    type?: string
    title?: string
    description?: string
    defaultOffer?: string
}

export default function ContactForm({
    type = 'contact',
    title = 'Get In Touch',
    description = 'Tell us about your project and we\'ll get back to you within 24 hours.',
    defaultOffer = ''
}: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        plan: defaultOffer,
        revenue: '',
    })

    // Update form data if defaultOffer prop changes
    useEffect(() => {
        if (defaultOffer) {
            setFormData(prev => ({ ...prev, plan: defaultOffer }))
        }
    }, [defaultOffer])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            const { data, error: dbError } = await supabase
                .from('cms_leads')
                .insert({
                    type: type,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    plan: formData.plan || null,
                    revenue: formData.revenue || null,
                    status: 'new',
                    metadata: {
                        company: formData.company,
                        source: 'contact_form',
                        submitted_at: new Date().toISOString()
                    }
                })
                .select()

            if (dbError) {
                console.error('Supabase error:', dbError)
                throw new Error(dbError.message || 'Failed to submit form')
            }

            setIsSuccess(true)

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '', company: '', message: '', plan: '', revenue: '' })
                setIsSuccess(false)
            }, 5000)

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
                className="glass-card rounded-2xl p-10 text-center border-accent/20"
            >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/30">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                    Thanks for reaching out, <strong className="text-foreground">{formData.name}</strong>.
                    We'll get back to you at <strong className="text-foreground">{formData.email}</strong> within 24 hours.
                </p>
            </motion.div>
        )
    }

    return (
        <div className="glass-card rounded-2xl p-8 border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
            {/* Active Context Badge */}
            <div className="mb-8 relative z-10">
                <div className="flex items-center gap-3 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    {formData.plan ? `Targeting: ${formData.plan.replace('-', ' ').toUpperCase()}` : 'Lab Access: Open'}
                </div>

                <h3 className="text-3xl font-black mb-3 text-white italic tracking-tighter uppercase">{title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed max-w-md">
                    {description}
                </p>

                {formData.plan === 'revenue-system' && (
                    <div className="mt-6 p-4 bg-orange-600/10 border border-orange-500/20 rounded-xl flex items-start gap-4">
                        <Building className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                        <div>
                            <div className="text-xs font-black uppercase tracking-widest text-orange-500 mb-1">Enterprise Application</div>
                            <p className="text-xs text-zinc-400 font-medium">You are applying for a full system rebuild. This requires a preliminary architectural audit ($0).</p>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-base">
                            Full Name <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative group">
                            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                            <Input
                                id="name"
                                placeholder="John Doe"
                                className="pl-10 h-12 bg-secondary/50 border-white/10"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-base">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@company.com"
                                className="pl-10 h-12 bg-secondary/50 border-white/10"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="company" className="text-base">
                            Company (Optional)
                        </Label>
                        <div className="relative group">
                            <Building className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                            <Input
                                id="company"
                                placeholder="Your Company"
                                className="pl-10 h-12 bg-secondary/50 border-white/10"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="offer" className="text-base">
                            Interested In <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formData.plan}
                            onValueChange={(value) => setFormData({ ...formData, plan: value })}
                        >
                            <SelectTrigger className="h-12 bg-secondary/50 border-white/10 group-focus-within:border-accent/50 transition-colors">
                                <SelectValue placeholder="Select an Offer" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                                <SelectItem value="diagnostic" className="cursor-pointer font-medium focus:bg-orange-600 focus:text-white">Conversion Diagnostic ($500)</SelectItem>
                                <SelectItem value="fix-sprint" className="cursor-pointer font-medium focus:bg-orange-600 focus:text-white">7-Day Fix Sprint ($1,500)</SelectItem>
                                <SelectItem value="revenue-system" className="cursor-pointer font-medium focus:bg-orange-600 focus:text-white">Full Revenue System ($25k+)</SelectItem>
                                <SelectItem value="retainer" className="cursor-pointer font-medium focus:bg-orange-600 focus:text-white">Optimization Retainer ($2.5k/m)</SelectItem>
                                <SelectItem value="general" className="cursor-pointer font-medium focus:bg-zinc-800">General Inquiry</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">
                        Message <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative group">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                        <Textarea
                            id="message"
                            placeholder="Tell us about your project..."
                            className="pl-10 min-h-32 bg-secondary/50 border-white/10 resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full h-14 text-sm font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-orange-600 hover:text-white shadow-xl transition-all duration-300 rounded-none group"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ENCRYPTING_DATA...
                        </>
                    ) : (
                        <>
                            {formData.plan === 'revenue-system' ? 'SUBMIT APPLICATION' :
                                formData.plan === 'diagnostic' ? 'REQUEST DIAGNOSTIC' :
                                    formData.plan === 'fix-sprint' ? 'CHECK SPRINT AVAILABILITY' :
                                        'INITIATE TRANSMISSION'}
                            <Send className="w-4 h-4 ml-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                    We respect your privacy. Your information will never be shared.
                </p>
            </form>
        </div>
    )
}
