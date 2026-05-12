'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface LeadCaptureModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    ctaText?: string
    triggerType?: 'audit' | 'demo' | 'consultation'
}

export default function LeadCaptureModal({
    isOpen,
    onClose,
    title,
    description,
    ctaText = "Get Access Now",
    triggerType = 'consultation'
}: LeadCaptureModalProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setIsSuccess(true)
            toast.success("Success! We'll be in touch shortly.")

            // Close after delay
            setTimeout(() => {
                onClose()
                setIsSuccess(false)
                setEmail('')
            }, 3000)
        }, 1500)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Gradient Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 blur-[100px] rounded-full" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {!isSuccess ? (
                            <div className="relative z-10">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="work@email.com"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white/5 border-white/10 focus:border-accent/50 text-white h-12 rounded-xl"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold text-base shadow-lg shadow-accent/20 transition-all hover:scale-[1.02]"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                {ctaText}
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        )}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 mt-4">
                                        <Lock className="w-3 h-3" />
                                        <span>Secure 256-bit encryption. No spam.</span>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                                <p className="text-zinc-400 text-sm">
                                    Check your inbox for next steps.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
