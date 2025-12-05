'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight, ArrowLeft, Check, Sparkles, TrendingUp, Clock, Users,
    Zap, Target, Globe, Smartphone, Code, Palette, LineChart, Shield,
    Mail, Download, Share2, Calculator, ChevronRight, Brain, Rocket,
    Layers, MessageSquare, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { toast } from 'sonner'

interface AIProjectEstimatorProps {
    mode?: 'section' | 'full'
}

// Premium Service configurations
const services = [
    {
        id: 'brand-transformation',
        title: 'Brand Metamorphosis',
        icon: Palette,
        description: 'Redefine your market presence with a world-class identity system.',
        basePrice: 6000,
        multiplier: 1.2,
        features: ['Strategic Brand Positioning', 'Visual Identity System', 'Motion Design Guidelines', 'Brand Voice & Tone']
    },
    {
        id: 'custom-platform',
        title: 'Bespoke Digital Platform',
        icon: Code,
        description: 'Engineered for scalability, security, and high-performance.',
        basePrice: 10000,
        multiplier: 1.5,
        features: ['Microservices Architecture', 'Headless CMS Integration', 'Advanced API Development', 'Bank-Grade Security']
    },
    {
        id: 'mobile-ecosystem',
        title: 'Mobile Experience Ecosystem',
        icon: Smartphone,
        description: 'Native-quality experiences across all devices and touchpoints.',
        basePrice: 14000,
        multiplier: 1.8,
        features: ['iOS & Android Native/React Native', 'Offline-First Architecture', 'Biometric Authentication', 'Real-time Sync']
    },
    {
        id: 'global-commerce',
        title: 'Enterprise Commerce Core',
        icon: Globe,
        description: 'Global-ready e-commerce infrastructure for high-volume sales.',
        basePrice: 16000,
        multiplier: 2.0,
        features: ['Multi-Currency/Language', 'AI Product Recommendations', 'Automated Inventory Sync', 'Conversion Rate Optimization']
    },
    {
        id: 'market-dominance',
        title: 'Growth & Dominance Engine',
        icon: TrendingUp,
        description: 'Data-driven marketing infrastructure to capture market share.',
        basePrice: 3200,
        multiplier: 1.1,
        features: ['Technical SEO Audit', 'Content Strategy Engine', 'Conversion Funnel Optimization', 'Competitor Analysis']
    },
    {
        id: 'business-intelligence',
        title: 'AI & Business Intelligence',
        icon: Brain,
        description: 'Unlock actionable insights with custom AI and data dashboards.',
        basePrice: 4800,
        multiplier: 1.3,
        features: ['Predictive Analytics', 'Custom LLM Integration', 'Real-time KPI Dashboards', 'Automated Reporting']
    }
]

const scopes = [
    { id: 'market-entry', label: 'MVP / Market Entry', multiplier: 1.0, duration: '8-12 weeks', description: 'Essential features to validate product-market fit.' },
    { id: 'scale-growth', label: 'Growth & Scale', multiplier: 1.5, duration: '3-5 months', description: 'Robust feature set for scaling user base and revenue.' },
    { id: 'enterprise', label: 'Enterprise / Global', multiplier: 2.5, duration: '6-9 months', description: 'Full-scale ecosystem with maximum security and compliance.' }
]

const timelines = [
    { id: 'rapid-launch', label: 'Velocity Launch', multiplier: 1.3, weeks: 4, description: 'Accelerated development track with dedicated sprint team.' },
    { id: 'balanced', label: 'Standard Agile', multiplier: 1.0, weeks: 12, description: 'Balanced pace ensuring thorough testing and refinement.' },
    { id: 'strategic-build', label: 'Strategic Phasing', multiplier: 0.9, weeks: 24, description: 'Methodical rollout for complex, high-stakes environments.' }
]

const additionalFeatures = [
    { id: 'ai-integration', label: 'Generative AI Integration', price: 4800, icon: Sparkles, desc: 'Chatbots, content gen, etc.' },
    { id: 'custom-animations', label: 'Cinematic Motion UI', price: 2000, icon: Zap, desc: 'Award-winning interactions' },
    { id: 'multi-language', label: 'Global Localization', price: 3200, icon: Globe, desc: 'i18n architecture' },
    { id: '24-7-support', label: 'White-Glove SLA Support', price: 6000, icon: Shield, desc: '24/7 priority access' },
    { id: 'seo-optimization', label: 'Technical SEO Suite', price: 2400, icon: TrendingUp, desc: 'Core Web Vitals max' },
    { id: 'analytics-dashboard', label: 'Executive Data Suite', price: 2800, icon: LineChart, desc: 'Real-time insights' }
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

    // AI "Thinking" Effect
    useEffect(() => {
        if (step === 1) setAiMessage("Awaiting project parameters...")
        if (step === 2) setAiMessage("Analyzing complexity requirements...")
        if (step === 3) setAiMessage("Calculating resource allocation...")
        if (step === 4) setAiMessage("Optimizing feature set for ROI...")
        if (step === 5) setAiMessage("Finalizing strategic proposal...")
    }, [step])

    // Calculate pricing
    const estimate = useMemo(() => {
        if (!selectedService || !selectedScope || !selectedTimeline) return null

        const service = services.find(s => s.id === selectedService)
        const scope = scopes.find(s => s.id === selectedScope)
        const timeline = timelines.find(t => t.id === selectedTimeline)

        if (!service || !scope || !timeline) return null

        let basePrice = service.basePrice
        basePrice *= service.multiplier
        basePrice *= scope.multiplier
        basePrice *= timeline.multiplier

        const featuresPrice = selectedFeatures.reduce((sum, featureId) => {
            const feature = additionalFeatures.find(f => f.id === featureId)
            return sum + (feature?.price || 0)
        }, 0)

        const teamMultiplier = 1 + (teamSize[0] - 4) * 0.1
        const total = (basePrice + featuresPrice) * teamMultiplier

        return {
            base: Math.round(basePrice),
            features: featuresPrice,
            total: Math.round(total),
            duration: scope.duration,
            weeks: timeline.weeks,
            team: teamSize[0],
            roi: Math.round(total * 3.8) // Increased ROI multiplier for "premium" feel
        }
    }, [selectedService, selectedScope, selectedTimeline, selectedFeatures, teamSize])

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    const toggleFeature = (featureId: string) => {
        setSelectedFeatures(prev =>
            prev.includes(featureId)
                ? prev.filter(f => f !== featureId)
                : [...prev, featureId]
        )
    }

    const handleGenerateProposal = async () => {
        if (!email || !estimate) {
            toast.error('Please complete all steps')
            return
        }

        setGenerating(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2500))
            toast.success('Strategic Proposal sent to ' + email)

            // Reset form
            setTimeout(() => {
                setStep(1)
                setSelectedService(null)
                setSelectedScope(null)
                setSelectedTimeline(null)
                setSelectedFeatures([])
                setEmail('')
                setCompany('')
                setGenerating(false)
            }, 1000)
        } catch (error) {
            toast.error('Failed to generate proposal')
            setGenerating(false)
        }
    }

    const isStepValid = (stepNum: number) => {
        switch (stepNum) {
            case 1: return !!selectedService
            case 2: return !!selectedScope
            case 3: return !!selectedTimeline
            case 4: return true // Features are optional
            case 5: return !!email
            default: return false
        }
    }

    return (
        <section className={`relative ${mode === 'full' ? 'min-h-screen py-20' : 'py-24'} overflow-hidden`}>
            {/* Premium Background */}
            <div className="absolute inset-0 bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-sm">
                        <Brain className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-sm font-medium text-accent">AI-Powered Strategic Estimator</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-purple-500">
                            Transform Ideas Into Reality
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Get an instant, AI-powered strategic blueprint with precise cost projections, timelines, and ROI forecasts—tailored to your vision.
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Form Area */}
                        <div className="lg:col-span-8">
                            <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                                {/* Subtle border gradient */}
                                <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
                                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none" />

                                {/* Progress Indicator */}
                                <div className="mb-10">
                                    <div className="flex items-center justify-between text-sm font-medium text-muted-foreground mb-4">
                                        <span>Step {step} of {totalSteps}</span>
                                        <span className="text-accent flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" />
                                            {aiMessage}
                                        </span>
                                    </div>
                                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-accent"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(step / totalSteps) * 100}%` }}
                                            transition={{ duration: 0.5, ease: "circOut" }}
                                        />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {/* Step 1: Service Selection */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">What breakthrough are you building?</h3>
                                            <p className="text-muted-foreground mt-2">Select the service that aligns with your strategic vision.</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {services.map((service) => (
                                                    <motion.button
                                                        key={service.id}
                                                        onClick={() => setSelectedService(service.id)}
                                                        className={`p-6 rounded-2xl border transition-all text-left relative overflow-hidden group ${selectedService === service.id
                                                            ? 'border-accent bg-accent/10 shadow-[0_0_30px_-10px_rgba(var(--accent),0.3)]'
                                                            : 'border-white/5 hover:border-accent/30 hover:bg-white/5'
                                                            }`}
                                                        whileHover={{ scale: 1.02, y: -4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {/* Animated gradient background on hover */}
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-br from-accent/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100"
                                                            initial={{ opacity: 0 }}
                                                            whileHover={{ opacity: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                        <div className="relative z-10">
                                                            <service.icon className={`w-8 h-8 mb-4 transition-all duration-300 ${selectedService === service.id ? 'text-accent scale-110' : 'text-muted-foreground group-hover:text-accent group-hover:scale-110'}`} />
                                                            <h4 className="font-bold text-lg mb-2">{service.title}</h4>
                                                            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Scope */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Define your ambition level</h3>
                                            <p className="text-muted-foreground mt-2">Choose the scope that matches your market goals and growth trajectory.</p>
                                            <div className="space-y-4">
                                                {scopes.map((scope) => (
                                                    <motion.button
                                                        key={scope.id}
                                                        onClick={() => setSelectedScope(scope.id)}
                                                        className={`w-full p-6 rounded-2xl border transition-all text-left group ${selectedScope === scope.id
                                                            ? 'border-accent bg-accent/10'
                                                            : 'border-white/5 hover:border-accent/30 hover:bg-white/5'
                                                            }`}
                                                        whileHover={{ scale: 1.01 }}
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-bold text-xl">{scope.label}</h4>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                                                                <Clock className="w-3 h-3" />
                                                                {scope.duration}
                                                            </div>
                                                        </div>
                                                        <p className="text-muted-foreground mb-3">{scope.description}</p>
                                                        <div className="text-sm text-accent font-medium flex items-center gap-2">
                                                            <Layers className="w-4 h-4" />
                                                            {scope.multiplier}x Complexity Factor
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Timeline */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Select your velocity</h3>
                                            <p className="text-muted-foreground mt-2">Balance speed with quality—choose the timeline that fits your launch strategy.</p>
                                            <div className="space-y-4">
                                                {timelines.map((timeline) => (
                                                    <motion.button
                                                        key={timeline.id}
                                                        onClick={() => setSelectedTimeline(timeline.id)}
                                                        className={`w-full p-6 rounded-2xl border transition-all text-left group ${selectedTimeline === timeline.id
                                                            ? 'border-accent bg-accent/10'
                                                            : 'border-white/5 hover:border-accent/30 hover:bg-white/5'
                                                            }`}
                                                        whileHover={{ scale: 1.01 }}
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-bold text-xl">{timeline.label}</h4>
                                                            <div className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-full">
                                                                {timeline.weeks} weeks
                                                            </div>
                                                        </div>
                                                        <p className="text-muted-foreground">{timeline.description}</p>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Additional Features */}
                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Amplify your competitive advantage</h3>
                                            <p className="text-muted-foreground mt-2">Add premium features to dominate your market and accelerate growth.</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {additionalFeatures.map((feature) => (
                                                    <motion.button
                                                        key={feature.id}
                                                        onClick={() => toggleFeature(feature.id)}
                                                        className={`p-5 rounded-2xl border transition-all text-left ${selectedFeatures.includes(feature.id)
                                                            ? 'border-accent bg-accent/10'
                                                            : 'border-white/5 hover:border-accent/30 hover:bg-white/5'
                                                            }`}
                                                        whileHover={{ scale: 1.02 }}
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedFeatures.includes(feature.id) ? 'bg-accent text-white' : 'bg-secondary text-muted-foreground'
                                                                }`}>
                                                                {selectedFeatures.includes(feature.id) ? <Check className="w-5 h-5" /> : <feature.icon className="w-5 h-5" />}
                                                            </div>
                                                            <div>
                                                                <h5 className="font-bold text-base mb-1">{feature.label}</h5>
                                                                <p className="text-xs text-muted-foreground mb-2">{feature.desc}</p>
                                                                <div className="text-xs text-accent font-medium">
                                                                    +${(feature.price / 1000).toFixed(0)}k
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>

                                            {/* Team Size */}
                                            <div className="p-8 bg-secondary/20 rounded-2xl border border-white/5">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-accent/10 rounded-lg">
                                                            <Users className="w-5 h-5 text-accent" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold">Dedicated Team Size</h4>
                                                            <p className="text-xs text-muted-foreground">Experts dedicated to your project</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-3xl font-bold text-accent">{teamSize[0]}</span>
                                                </div>
                                                <Slider
                                                    value={teamSize}
                                                    onValueChange={setTeamSize}
                                                    min={2}
                                                    max={12}
                                                    step={1}
                                                    className="mb-4"
                                                />
                                                <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                    <span>Boutique (2-4)</span>
                                                    <span>Growth (5-8)</span>
                                                    <span>Enterprise (9-12)</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 5: Contact Details */}
                                    {step === 5 && (
                                        <motion.div
                                            key="step5"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500">Your strategic blueprint awaits</h3>
                                            <p className="text-muted-foreground mt-2">Enter your details to receive a comprehensive proposal with actionable insights.</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                                                            Company Name
                                                        </label>
                                                        <Input
                                                            value={company}
                                                            onChange={(e) => setCompany(e.target.value)}
                                                            placeholder="Acme Inc."
                                                            className="bg-white/5 border-white/10 h-12"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                                                            Work Email *
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="name@company.com"
                                                            required
                                                            className="bg-white/5 border-white/10 h-12"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl border border-accent/20">
                                                    <h4 className="font-bold mb-4 flex items-center gap-2 text-lg">
                                                        <Star className="w-5 h-5 text-accent fill-accent" />
                                                        Included in Proposal
                                                    </h4>
                                                    <ul className="space-y-4">
                                                        {[
                                                            'Comprehensive cost breakdown',
                                                            'Detailed timeline & milestones',
                                                            'Technology stack recommendation',
                                                            'Competitor analysis summary',
                                                            '30-min strategy consultation'
                                                        ].map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                                                    <Check className="w-3 h-3 text-accent" />
                                                                </div>
                                                                <span className="text-foreground/80">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                                    <Button
                                        variant="ghost"
                                        onClick={handleBack}
                                        disabled={step === 1}
                                        className="gap-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </Button>

                                    {step < totalSteps ? (
                                        <Button
                                            onClick={handleNext}
                                            disabled={!isStepValid(step)}
                                            className="gap-2 bg-accent hover:bg-accent/90 text-white px-8 h-12 rounded-xl shadow-lg shadow-accent/20"
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleGenerateProposal}
                                            disabled={!email || generating}
                                            className="gap-2 bg-accent hover:bg-accent/90 text-white px-8 h-12 rounded-xl shadow-lg shadow-accent/20 min-w-[200px]"
                                        >
                                            {generating ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    >
                                                        <Sparkles className="w-4 h-4" />
                                                    </motion.div>
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Rocket className="w-4 h-4" />
                                                    Unlock Proposal
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Live Estimate Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl"
                                >
                                    <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-accent/10 rounded-xl">
                                            <Calculator className="w-6 h-6 text-accent" />
                                        </div>
                                        Live Estimation
                                    </h4>

                                    {estimate ? (
                                        <div className="space-y-8">
                                            <div className="relative overflow-hidden p-8 bg-gradient-to-br from-accent to-primary rounded-2xl text-white shadow-lg">
                                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                                    <Sparkles className="w-24 h-24" />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="text-white/80 text-sm font-medium mb-1">Estimated Investment</div>
                                                    <div className="text-5xl font-bold mb-2 tracking-tight">
                                                        ${(estimate.total / 1000).toFixed(0)}k
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/80 text-sm">
                                                        <Clock className="w-4 h-4" />
                                                        {estimate.duration}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                                    <span className="text-muted-foreground">Base Architecture</span>
                                                    <span className="font-semibold">${(estimate.base / 1000).toFixed(0)}k</span>
                                                </div>
                                                {estimate.features > 0 && (
                                                    <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                                        <span className="text-muted-foreground">Premium Features</span>
                                                        <span className="font-semibold text-accent">+${(estimate.features / 1000).toFixed(0)}k</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                                    <span className="text-muted-foreground">Team Multiplier</span>
                                                    <span className="font-semibold">{estimate.team} Experts</span>
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-green-500">
                                                    <TrendingUp className="w-4 h-4" />
                                                    Projected 18-Month ROI
                                                </div>
                                                <div className="text-3xl font-bold text-foreground">
                                                    ${(estimate.roi / 1000).toFixed(0)}k
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    *Based on industry averages for similar digital transformations.
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 pt-4">
                                                <Button
                                                    variant="outline"
                                                    className="w-full gap-2 border-white/10 hover:bg-white/5"
                                                    onClick={() => toast.success('Downloading Estimate PDF...')}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    PDF
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full gap-2 border-white/10 hover:bg-white/5"
                                                    onClick={() => toast.success('Share link copied to clipboard')}
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                    Share
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-white/10 rounded-2xl">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                                                <Brain className="w-8 h-8 opacity-50" />
                                            </div>
                                            <p className="font-medium">AI Waiting for Input</p>
                                            <p className="text-xs mt-2 opacity-60">Complete the steps to generate your live estimate</p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
