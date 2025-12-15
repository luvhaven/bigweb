'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight, ArrowLeft, Check, Sparkles, TrendingUp, Clock, Users,
    Zap, Target, Globe, Smartphone, Code, Palette, LineChart, Shield,
    Mail, Download, Share2, Calculator, ChevronRight, Brain, Rocket,
    Layers, MessageSquare, Star, Laptop, Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface AIProjectEstimatorProps {
    mode?: 'section' | 'full'
}

// 1. SERVICES (Clear, Benefit-Driven, Recognizable)
const services = [
    {
        id: 'brand-identity',
        title: 'Premium Brand Identity',
        icon: Palette,
        description: 'Build a world-class visual system that commands market attention.',
        basePrice: 5000,
        multiplier: 1.2,
        features: ['Logo & Visual Systems', 'Brand Strategy', 'Guidelines', 'Motion Design']
    },
    {
        id: 'web-application',
        title: 'Custom Web Application',
        icon: Laptop,
        description: 'Scalable, high-performance platforms tailored to your unique business logic.',
        basePrice: 8000,
        multiplier: 1.5,
        features: ['React/Next.js Architecture', 'Cloud Infrastructure', 'API Integration', 'Admin Panels']
    },
    {
        id: 'mobile-app',
        title: 'Mobile App Development',
        icon: Smartphone,
        description: 'Native iOS & Android experiences that users love and retain.',
        basePrice: 10000,
        multiplier: 1.8,
        features: ['Cross-Platform (React Native)', 'Offline Capabilities', 'App Store Optimization', 'Push Notifications']
    },
    {
        id: 'ecommerce',
        title: 'E-Commerce Solution',
        icon: Globe,
        description: 'Global-ready online stores optimized for maximum conversion and sales.',
        basePrice: 7000,
        multiplier: 1.6,
        features: ['Shopify/Custom Headless', 'Payment Gateways', 'Inventory Sync', 'Conversion Design']
    },
    {
        id: 'growth-seo',
        title: 'Growth Marketing & SEO',
        icon: TrendingUp,
        description: 'Data-driven strategies to dominate search results and capture leads.',
        basePrice: 3000,
        multiplier: 1.1,
        features: ['Technical SEO', 'Content Strategy', 'Funnel Optimization', 'Analytics Setup']
    },
    {
        id: 'ai-automation',
        title: 'AI & Process Automation',
        icon: Brain,
        description: 'Leverage custom AI to automate workflows and unlock business insights.',
        basePrice: 6000,
        multiplier: 1.4,
        features: ['LLM Integration', 'Chatbots', 'Data Processing', 'Workflow Automation']
    }
]

// 2. SCOPES
const scopes = [
    { id: 'starter', label: 'MVP / Starter', multiplier: 1.0, duration: '4-8 weeks', description: 'Essential features to validate product-market fit.' },
    { id: 'growth', label: 'Growth / Scale', multiplier: 1.6, duration: '3-4 months', description: 'Robust feature set for scaling user base and revenue.' },
    { id: 'enterprise', label: 'Enterprise Suite', multiplier: 2.5, duration: '6+ months', description: 'Full-scale ecosystem with maximum security and compliance.' }
]

// 3. TIMELINES
const timelines = [
    { id: 'standard', label: 'Standard Pace', multiplier: 1.0, desc: 'Balanced development cycle.' },
    { id: 'accelerated', label: 'Accelerated', multiplier: 1.25, desc: 'Priority resources for faster launch.' },
    { id: 'rush', label: 'Rapid Launch', multiplier: 1.5, desc: 'Maximum velocity with dedicated sprint team.' }
]

// 4. EXTRAS
const additionalFeatures = [
    { id: 'ai-integration', label: 'Gen-AI Integration', price: 2500, icon: Sparkles },
    { id: 'animations', label: 'Advanced Motion UI', price: 1500, icon: Zap },
    { id: 'multilingual', label: 'Multi-Language', price: 2000, icon: Globe },
    { id: 'analytics', label: 'Advanced Analytics', price: 1200, icon: LineChart },
    { id: 'security', label: 'Enterprise Security', price: 3000, icon: Shield },
    { id: 'cms', label: 'Headless CMS', price: 1800, icon: Layers }
]

export default function AIProjectEstimator({ mode = 'section' }: AIProjectEstimatorProps) {
    const [step, setStep] = useState(1)
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [selectedScope, setSelectedScope] = useState<string | null>(null)
    const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null)
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [teamSize, setTeamSize] = useState([4])
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [generating, setGenerating] = useState(false)
    const [aiMessage, setAiMessage] = useState('')

    const totalSteps = 5

    // AI Message Logic
    useEffect(() => {
        const messages = [
            "Awaiting input...",
            "Analyzing complexity...",
            "Calibrating timeline...",
            "Optimizing feature set...",
            "Finalizing proposal..."
        ]
        setAiMessage(messages[step - 1] || "Processing...")
    }, [step])

    // Calculation Logic
    const estimate = useMemo(() => {
        if (!selectedService || !selectedScope || !selectedTimeline) return null

        const service = services.find(s => s.id === selectedService) || services[0]
        const scope = scopes.find(s => s.id === selectedScope) || scopes[0]
        const timeline = timelines.find(t => t.id === selectedTimeline) || timelines[0]

        let base = service.basePrice * service.multiplier * scope.multiplier
        let total = base * timeline.multiplier

        // Add features
        const featuresCost = selectedFeatures.reduce((acc, fid) => {
            const f = additionalFeatures.find(feat => feat.id === fid)
            return acc + (f ? f.price : 0)
        }, 0)

        total += featuresCost

        // Team Multiplier
        const teamMult = 1 + ((teamSize[0] - 2) * 0.05)
        total *= teamMult

        return {
            low: Math.round(total * 0.9),
            high: Math.round(total * 1.1),
            duration: scope.duration,
            roi: Math.round(total * 4.2)
        }
    }, [selectedService, selectedScope, selectedTimeline, selectedFeatures, teamSize])

    // HANDLERS
    const nextStep = () => { if (step < totalSteps) setStep(s => s + 1) }
    const prevStep = () => { if (step > 1) setStep(s => s - 1) }

    // Auto-advance helper
    const handleServiceSelect = (id: string) => {
        setSelectedService(id)
        setTimeout(nextStep, 400) // Small delay for visual feedback
    }

    const handleScopeSelect = (id: string) => {
        setSelectedScope(id)
        setTimeout(nextStep, 400)
    }

    const handleTimelineSelect = (id: string) => {
        setSelectedTimeline(id)
        setTimeout(nextStep, 400)
    }

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    }

    const handleSubmit = async () => {
        if (!email) return toast.error("Please provide your work email")
        setGenerating(true)
        await new Promise(r => setTimeout(r, 2000))
        toast.success("Proposal sent to " + email)
        setGenerating(false)
    }

    return (
        <section id="ai-estimator-section" className="relative h-screen max-h-[1080px] overflow-hidden bg-background text-foreground flex flex-col pt-16 lg:pt-0">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto h-full flex flex-col lg:flex-row relative z-10">

                {/* LEFT COLUMN: Interaction Area (60%) */}
                <div className="w-full lg:w-[60%] h-full flex flex-col px-4 lg:px-12 py-8 overflow-y-auto no-scrollbar">

                    {/* Header Steps */}
                    <div className="mb-8 lg:mb-12 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <BotAvatar />
                            <div>
                                <h2 className="text-sm font-bold text-accent tracking-wider uppercase">AI Estimator</h2>
                                <p className="text-xs text-muted-foreground">{aiMessage}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(s => (
                                <div key={s} className={cn("h-1.5 w-8 rounded-full transition-all duration-500", step >= s ? "bg-accent" : "bg-secondary")} />
                            ))}
                        </div>
                    </div>

                    {/* DYNAMIC CONTENT AREA */}
                    <div className="flex-1 flex flex-col justify-center min-h-[400px]">
                        <AnimatePresence mode="wait">

                            {/* STEP 1: SERVICE */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    <h1 className="text-2xl lg:text-4xl font-bold leading-tight">What would you like to build?</h1>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {services.map(s => (
                                            <SelectionCard
                                                key={s.id}
                                                selected={selectedService === s.id}
                                                onClick={() => handleServiceSelect(s.id)}
                                                icon={s.icon}
                                                title={s.title}
                                                subtitle={s.description}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: SCOPE */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    <h1 className="text-2xl lg:text-4xl font-bold leading-tight">Determine your project scope.</h1>
                                    <div className="grid grid-cols-1 gap-3">
                                        {scopes.map(s => (
                                            <SelectionCard
                                                key={s.id}
                                                selected={selectedScope === s.id}
                                                onClick={() => handleScopeSelect(s.id)}
                                                title={s.label}
                                                subtitle={s.description}
                                                rightText={s.duration}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: TIMELINE */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    <h1 className="text-2xl lg:text-4xl font-bold leading-tight">How fast do you need this?</h1>
                                    <div className="grid grid-cols-1 gap-3">
                                        {timelines.map(t => (
                                            <SelectionCard
                                                key={t.id}
                                                selected={selectedTimeline === t.id}
                                                onClick={() => handleTimelineSelect(t.id)}
                                                title={t.label}
                                                subtitle={t.desc}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: FEATURES */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4"
                                >
                                    <h1 className="text-2xl lg:text-4xl font-bold leading-tight">Enhance with premium features.</h1>
                                    <div className="grid grid-cols-2 gap-3">
                                        {additionalFeatures.map(f => (
                                            <SelectionCard
                                                key={f.id}
                                                selected={selectedFeatures.includes(f.id)}
                                                onClick={() => toggleFeature(f.id)}
                                                icon={f.icon}
                                                title={f.label}
                                                multiMode
                                            />
                                        ))}
                                    </div>
                                    <div className="pt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm">Dedicated Team Size: {teamSize[0]} Experts</span>
                                        </div>
                                        <Slider value={teamSize} onValueChange={setTeamSize} min={2} max={10} step={1} />
                                    </div>
                                    <Button onClick={nextStep} className="w-full h-12 text-base bg-accent hover:bg-accent-light text-white rounded-xl mt-2">
                                        View Final Estimate <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </motion.div>
                            )}

                            {/* STEP 5: RESULTS */}
                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <h1 className="text-2xl lg:text-4xl font-bold leading-tight">Your Strategic Blueprint</h1>
                                    <p className="text-base text-muted-foreground">We've generated a comprehensive breakdown based on your inputs.</p>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium ml-1">Company / Organization</label>
                                            <Input
                                                value={company} onChange={e => setCompany(e.target.value)}
                                                className="bg-secondary/50 border-white/5 h-12 rounded-xl px-5 text-base"
                                                placeholder="Acme Corp"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium ml-1">Work Email</label>
                                            <Input
                                                value={email} onChange={e => setEmail(e.target.value)}
                                                type="email"
                                                className="bg-secondary/50 border-white/5 h-12 rounded-xl px-5 text-base"
                                                placeholder="name@company.com"
                                            />
                                        </div>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={generating}
                                            className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent-light text-white rounded-xl shadow-[0_0_40px_-10px_rgba(var(--accent),0.4)] transition-all transform hover:scale-[1.02]"
                                        >
                                            {generating ? <span className="animate-pulse">Processing...</span> : "Send Detailed Proposal"}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-4 shrink-0 h-12 flex items-center">
                        {step > 1 && (
                            <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-foreground pl-0 h-auto py-2">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Live Estimate (40%, Sticky) */}
                <div className="hidden lg:flex w-[40%] h-full bg-secondary/30 backdrop-blur-md border-l border-white/5 flex-col p-8 justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

                    {/* Live Data Card */}
                    <motion.div
                        className="relative z-10 bg-card border border-white/10 rounded-2xl p-6 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-accent/20 rounded-lg">
                                <Calculator className="w-5 h-5 text-accent" />
                            </div>
                            <span className="font-bold text-base tracking-wide uppercase text-muted-foreground">Live Estimate</span>
                        </div>

                        {estimate ? (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Estimated Investment Range</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-foreground tracking-tight">${(estimate.low / 1000).toFixed(0)}k</span>
                                        <span className="text-xl text-muted-foreground"> - ${(estimate.high / 1000).toFixed(0)}k</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" /> Timeline</span>
                                        <span className="font-semibold">{estimate.duration}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Projected ROI</span>
                                        <span className="font-semibold text-green-400">+${(estimate.roi / 1000).toFixed(0)}k</span>
                                    </div>
                                </div>

                                {/* Dynamic Summary List */}
                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    {selectedService && <Badge>{services.find(s => s.id === selectedService)?.title}</Badge>}
                                    {selectedScope && <Badge variant="outline">{scopes.find(s => s.id === selectedScope)?.label}</Badge>}
                                    {selectedFeatures.length > 0 && <Badge variant="secondary">+{selectedFeatures.length} Extras</Badge>}
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 text-center text-muted-foreground">
                                <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                <p className="text-sm">Make selections to generate<br />a real-time estimate.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// SUB-COMPONENTS
function SelectionCard({ selected, onClick, icon: Icon, title, subtitle, rightText, multiMode = false }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group relative flex items-start text-left gap-3 p-4 rounded-xl border transition-all duration-300",
                selected
                    ? "bg-accent text-white border-accent shadow-lg shadow-accent/20 scale-[1.02]"
                    : "bg-secondary/40 border-white/5 hover:bg-secondary/80 hover:border-white/10"
            )}
        >
            {Icon && (
                <div className={cn("p-2 rounded-lg shrink-0 transition-colors", selected ? "bg-white/20" : "bg-background/50 group-hover:bg-background")}>
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                    <h3 className="font-bold text-base truncate pr-2">{title}</h3>
                    {rightText && <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0", selected ? "bg-white/20" : "bg-black/20")}>{rightText}</span>}
                    {multiMode && selected && <div className="bg-white/20 p-0.5 rounded-full shrink-0"><Check className="w-3 h-3" /></div>}
                </div>
                {subtitle && <p className={cn("text-xs leading-relaxed line-clamp-2", selected ? "text-white/90" : "text-muted-foreground group-hover:text-foreground/80")}>{subtitle}</p>}
            </div>
        </button>
    )
}

function Badge({ children, variant = 'default' }: any) {
    const variants = {
        default: "bg-accent/20 text-accent border-accent/20",
        outline: "bg-transparent border-white/20 text-muted-foreground",
        secondary: "bg-secondary text-foreground border-transparent"
    }
    return (
        <span className={cn("inline-block px-3 py-1 rounded-md text-xs font-medium border mr-2 mb-2", variants[variant as keyof typeof variants])}>
            {children}
        </span>
    )
}

function BotAvatar() {
    return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent fill-accent/20" />
            </div>
        </div>
    )
}
