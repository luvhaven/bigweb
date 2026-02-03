'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

interface FAQ {
    id: string
    question: string
    answer: string
    category: string
}

interface FAQSectionProps {
    category?: string
    title?: string
    showAll?: boolean
}

export default function FAQSection({ category = 'general', title = 'Everything You Need To Know', showAll = false }: FAQSectionProps) {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [activeIndex, setActiveIndex] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchFAQs() {
            let query = supabase
                .from('cms_faqs')
                .select('*')
                .order('sort_order', { ascending: true })

            if (!showAll) {
                // If specific category requested, we fetch 'general' AND that category usually, 
                // but let's stick to strict category if provided, unless it's default.
                // Actually, let's just fetch everything for now and filter or sort, 
                // but for efficiency let's filter by category if strict.
                // However, usually "general" FAQs are good to show everywhere.
                // Let's rely on the props.
                if (category !== 'all-mixed') {
                    query = query.in('category', ['general', category])
                }
            }

            const { data } = await query

            if (data) {
                setFaqs(data as FAQ[])
            }
            setIsLoading(false)
        }
        fetchFAQs()
    }, [category, showAll])

    const toggleAccordion = (id: string) => {
        setActiveIndex(activeIndex === id ? null : id)
    }

    if (!isLoading && faqs.length === 0) return null

    return (
        <section className="py-40 bg-black relative border-t border-zinc-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-left mb-32 border-l-4 border-orange-600 pl-12 relative overflow-hidden">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-12">
                        Clinical_Queries_v2.0
                    </div>
                    <h2 className="text-6xl md:text-[11rem] font-black italic tracking-tighter uppercase mb-12 leading-[0.75] text-white">
                        Common <br /><span className="text-zinc-800">Inquiries.</span>
                    </h2>
                    <p className="text-zinc-500 text-2xl md:text-5xl font-medium leading-none tracking-tight max-w-5xl">
                        Technical responses to the infrastructure questions most agencies deflect. <span className="text-white italic underline underline-offset-8 decoration-orange-600">Pure_Transparency</span>.
                    </p>
                </div>

                <div className="space-y-px bg-zinc-900 border border-zinc-900">
                    {isLoading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-black animate-pulse border-b border-zinc-900" />
                        ))
                    ) : (
                        faqs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className={`transition-all duration-500 border-b border-zinc-900 ${activeIndex === faq.id ? 'bg-zinc-950' : 'bg-black hover:bg-zinc-950'}`}
                            >
                                <button
                                    onClick={() => toggleAccordion(faq.id)}
                                    className="w-full flex items-center justify-between p-12 text-left group"
                                >
                                    <div className="flex items-center gap-12">
                                        <span className="text-[11px] font-mono font-bold text-zinc-800 group-hover:text-orange-600 transition-colors uppercase tracking-[0.4em]">LOG_0{index + 1}</span>
                                        <h3 className={`text-2xl font-black uppercase italic tracking-tighter transition-all ${activeIndex === faq.id ? 'text-orange-600' : 'text-white'}`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <span className={`transition-transform duration-500 ${activeIndex === faq.id ? 'rotate-180 text-orange-600' : 'text-zinc-700'}`}>
                                        {activeIndex === faq.id ? <Minus className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-12 pb-16 pl-[168px] text-zinc-500 text-xl font-medium leading-[1.1] tracking-tight max-w-4xl border-t border-zinc-950 pt-10">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
