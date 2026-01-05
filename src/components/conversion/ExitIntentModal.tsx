'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Gift, Sparkles, CheckCircle, Smartphone, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


export default function ExitIntentModal() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasShown, setHasShown] = useState(false)
    const [step, setStep] = useState<'offer' | 'form' | 'success'>('offer')
    const [url, setUrl] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true)
                setHasShown(true)
            }
        }

        document.addEventListener('mouseleave', handleMouseLeave)
        return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }, [hasShown])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { createClient } = await import('@/lib/supabase/client')
            const supabase = createClient()

            const { error } = await supabase.from('cms_leads').insert([{
                email,
                type: 'audit',
                message: `Audit Request for: ${url}`,
                metadata: { url, source: 'exit_intent' }
            }])

            if (error) throw error
            setStep('success')
        } catch (error) {
            console.error('Error submitting lead:', error)
            // Optional: show error state
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[10001]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "20px" }}
                        className="fixed top-1/2 left-1/2 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden z-[10002] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Premium Glow Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        {/* Content */}
                        <div className="relative p-8 md:p-10">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-4 z-50 p-2 text-white/40 hover:text-white transition-colors hover:rotate-90 duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <AnimatePresence mode="wait">
                                {step === 'offer' && (
                                    <motion.div
                                        key="offer"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6 text-center"
                                    >
                                        <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow rotate-3 transform hover:rotate-6 transition-transform duration-500">
                                            <Gift className="w-10 h-10 text-white" />
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                            Wait! Don't Leave <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">Empty Handed</span>
                                        </h2>

                                        <p className="text-white/60 text-lg leading-relaxed">
                                            Get a specialized <span className="text-white font-semibold">Growth Audit</span> for your website or app (worth $500) completely free. Data-driven insights to double your conversions.
                                        </p>

                                        <div className="pt-4">
                                            <Button
                                                size="lg"
                                                onClick={() => setStep('form')}
                                                className="w-full bg-white text-black hover:bg-gray-100 font-bold h-14 text-lg rounded-xl shadow-lg hover:scale-[1.02] transition-all"
                                            >
                                                Claim My Free Audit
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Button>
                                            <button
                                                onClick={() => setIsVisible(false)}
                                                className="text-white/30 hover:text-white text-sm mt-4 transition-colors font-medium"
                                            >
                                                No thanks, I don't want free growth insights
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'form' && (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-white mb-2">Where should we look?</h3>
                                            <p className="text-white/50 text-sm">Enter your details for the deep-dive analysis.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-white/70">Website or App URL</Label>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-3.5 w-5 h-5 text-white/30" />
                                                    <Input
                                                        value={url}
                                                        onChange={(e) => setUrl(e.target.value)}
                                                        placeholder="https://yourbrand.com"
                                                        className="pl-10 h-12 bg-white/5 border-white/10 text-white focus:border-accent rounded-xl"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-white/70">Email Address</Label>
                                                <div className="relative">
                                                    <Smartphone className="absolute left-3 top-3.5 w-5 h-5 text-white/30" />
                                                    <Input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="you@company.com"
                                                        className="pl-10 h-12 bg-white/5 border-white/10 text-white focus:border-accent rounded-xl"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-accent hover:bg-accent-dark text-white font-bold h-14 text-lg rounded-xl shadow-glow mt-2"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center gap-2">
                                                        <Sparkles className="w-5 h-5 animate-spin" />
                                                        Analyzing...
                                                    </span>
                                                ) : (
                                                    'Unlock My Audit'
                                                )}
                                            </Button>
                                        </form>

                                        <button
                                            onClick={() => setStep('offer')}
                                            className="w-full text-center text-white/30 hover:text-white text-sm"
                                        >
                                            Back
                                        </button>
                                    </motion.div>
                                )}

                                {step === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-6 py-8"
                                    >
                                        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white">You're In The Queue!</h3>
                                        <p className="text-white/60 text-lg">
                                            We've received your request. Our expert team is analyzing {url} and will send the report to {email} within 24 hours.
                                        </p>
                                        <Button
                                            onClick={() => setIsVisible(false)}
                                            variant="outline"
                                            className="mt-4 border-white/10 text-white hover:bg-white/5"
                                        >
                                            Close & Continue Browsing
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

