import { caseStudies as hardcodedCaseStudies } from '@/lib/case-study-data'

import { projectsAPI } from '@/lib/api/projects'
import { agency } from '@/config/agency'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, TrendingUp, FlaskConical, Target, Zap, Shield, BarChart3, ChevronRight, Activity, Search, Lock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Demos (Client-side components)
import VortexPayDemo from '@/components/demos/VortexPayDemo'
import AntroLogisticsDemo from '@/components/demos/AntroLogisticsDemo'
import NexusFlowDemo from '@/components/demos/NexusFlowDemo'
import AuraWearDemo from '@/components/demos/AuraWearDemo'
import AetherInsightsDemo from '@/components/demos/AetherInsightsDemo'
import VanguardCapitalDemo from '@/components/demos/VanguardCapitalDemo'
import ElevateCommerceDemo from '@/components/demos/ElevateCommerceDemo'
import SkyPulseDemo from '@/components/demos/SkyPulseDemo'
import PrismIdentityDemo from '@/components/demos/PrismIdentityDemo'

const DemoRegistry: { [key: string]: React.ComponentType } = {
    'VortexPayDemo': VortexPayDemo,
    'AntroLogisticsDemo': AntroLogisticsDemo,
    'NexusFlowDemo': NexusFlowDemo,
    'AuraWearDemo': AuraWearDemo,
    'AetherInsightsDemo': AetherInsightsDemo,
    'VanguardCapitalDemo': VanguardCapitalDemo,
    'ElevateCommerceDemo': ElevateCommerceDemo,
    'SkyPulseDemo': SkyPulseDemo,
    'PrismIdentityDemo': PrismIdentityDemo
}

interface CaseStudyPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
    const { slug } = await params
    const dbProject = await projectsAPI.getById(slug)
    const hardcodedStudy = hardcodedCaseStudies.find((s) => s.slug === slug)

    const study = dbProject || hardcodedStudy
    if (!study) return {}

    return {
        title: `${study.title || (study as any).name} | ${agency.name}`,
        description: (study as any).summary || (study as any).challenge?.substring(0, 160),
    }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { slug } = await params

    // 1. Try to fetch from database
    const dbProject = await projectsAPI.getById(slug)

    // 2. Try to find in hardcoded data for rich content fallback
    const hardcodedStudy = hardcodedCaseStudies.find((s) => s.slug === slug)

    if (!dbProject && !hardcodedStudy) {
        notFound()
    }

    // Merge DB data with hardcoded data
    const study = {
        slug: slug,
        title: dbProject?.title || hardcodedStudy?.title || 'Case Study',
        client: dbProject?.client_name || hardcodedStudy?.client || 'Client',
        summary: dbProject?.summary || hardcodedStudy?.summary || dbProject?.challenge?.substring(0, 150) + '...',
        challenge: dbProject?.challenge || hardcodedStudy?.challenge,
        solution: dbProject?.solution || hardcodedStudy?.solution,
        results: dbProject?.results
            ? (typeof dbProject.results === 'string' ? dbProject.results.split(', ') : dbProject.results)
            : (hardcodedStudy?.results || []),
        technologies: dbProject?.tech_stack || hardcodedStudy?.technologies || [],
        image: dbProject?.cover_image_url || hardcodedStudy?.image || '/images/projects/placeholder.png',
        author: hardcodedStudy?.author || {
            name: 'Julian Reed',
            role: 'UI/UX Architect',
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
        },
        date: hardcodedStudy?.date || '2025-12-01',
        demoComponent: hardcodedStudy?.demoComponent
    }

    const DemoComponent = (study.demoComponent && DemoRegistry[study.demoComponent]) ? DemoRegistry[study.demoComponent] : null;

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
            <AdvancedNavigation />


            {/* Cinematic Hero */}
            <section className="relative pt-48 pb-32 overflow-hidden bg-gradient-mesh">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl">
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center text-orange-500 font-black text-[10px] uppercase tracking-[0.5em] mb-16 hover:text-white transition-all group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
                            Evidence Registry
                        </Link>

                        <div className="space-y-8 mb-20">
                            <div className="flex flex-wrap gap-4">
                                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                    Case_{study.client}
                                </span>
                                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                    <Lock className="w-3 h-3" />
                                    Access: Secured
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
                                {study.title.split(':').map((part, i) => (
                                    <span key={i} className={i === 1 ? 'text-orange-500 block' : 'block text-white'}>
                                        {part}{i === 0 && study.title.includes(':') ? ':' : ''}
                                    </span>
                                ))}
                            </h1>
                        </div>

                    </div>
                </div>
            </section>

            {/* Immersive Visualization */}
            <section className="px-6 mb-40">
                <div className="container mx-auto">
                    {DemoComponent ? (
                        <div className="relative group">
                            <div className="absolute inset-0 bg-orange-600/10 blur-[120px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
                            <div className="relative z-10 scale-95 hover:scale-100 transition-transform duration-1000">
                                <DemoComponent />
                            </div>
                        </div>
                    ) : (
                        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-1000 group">
                            <Image
                                src={study.image}
                                alt={study.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                            <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                    )}
                </div>
            </section>

            {/* Forensic Deep Dive */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-24">
                        {/* Narrative Column */}
                        <div className="lg:col-span-8 space-y-40">
                            {/* Phase 01: The Challenge */}
                            <div className="relative">
                                <div className="absolute -left-16 top-0 text-[12rem] font-black text-white/[0.02] leading-none select-none italic">01</div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-16 h-[1px] bg-zinc-800" />
                                        <span className="text-zinc-500 font-black uppercase tracking-[0.5em] text-[10px]">Challenge Forensics</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase italic leading-[1.1]">
                                        Identifying the <br /><span className="text-zinc-600">Revenue Bottleneck.</span>
                                    </h2>
                                    <div className="prose prose-invert prose-2xl max-w-none text-zinc-400 font-medium leading-tight italic">
                                        <p>
                                            {study.challenge}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 02: The Solution */}
                            <div className="relative p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent pointer-events-none" />
                                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000">
                                    <Zap className="w-80 h-80 text-orange-500" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-24 h-[1px] bg-orange-900" />
                                        <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px]">Machine Implementation</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase italic leading-[0.9]">
                                        Conversion <br />Architecture.
                                    </h2>

                                    <div className="bg-black/60 backdrop-blur-3xl rounded-[2rem] p-10 border border-white/10 mb-12">
                                        <p className="text-2xl text-white font-black italic tracking-tight leading-relaxed">
                                            "{study.solution}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {study.technologies.map((tech, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/20 transition-all group/tech">
                                                <div className="p-1 rounded bg-orange-500/10 group-hover/tech:bg-orange-500/20 transition-colors">
                                                    <CheckCircle2 className="w-3 h-3 text-orange-500" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover/tech:text-white transition-colors">{tech}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Phase 03: The Results */}
                            <div className="relative">
                                <div className="absolute -left-16 top-0 text-[12rem] font-black text-white/[0.02] leading-none select-none italic">03</div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-16 h-[1px] bg-zinc-800" />
                                        <span className="text-zinc-500 font-black uppercase tracking-[0.5em] text-[10px]">Surgical ROI</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase italic leading-[1.1]">
                                        Evidence-Based <br /><span className="text-zinc-600">Transformation.</span>
                                    </h2>

                                    <div className="grid gap-6">
                                        {study.results.map((result, i) => (
                                            <div key={i} className="group flex items-center justify-between p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-orange-500/30 transition-all hover:bg-white/[0.03] shadow-2xl">
                                                <div className="flex items-center gap-8">
                                                    <div className="h-20 w-20 rounded-[1.5rem] bg-orange-500/5 flex items-center justify-center shrink-0 border border-orange-500/10 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                                        <Activity className="w-10 h-10 text-orange-500 group-hover:text-white transition-colors" />
                                                    </div>
                                                    <div>
                                                        <div className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase">{result}</div>
                                                        <div className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mt-2 flex items-center gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-orange-500" />
                                                            Verified Laboratory Outcome
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <ArrowUpRight className="w-10 h-10 text-zinc-800 group-hover:text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Scientist Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-48 space-y-10">
                                {/* Lead Scientist Card */}
                                <div className="p-10 rounded-[3rem] bg-[#0A0A0A] border border-white/10 relative overflow-hidden group shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-transparent pointer-events-none" />

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="relative w-32 h-32 mb-8 p-1 rounded-full border border-orange-500/30 bg-orange-500/5 group-hover:border-orange-500/60 transition-colors duration-500">
                                            <div className="w-full h-full rounded-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                                <Image
                                                    src={study.author.image}
                                                    alt={study.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-orange-600 text-white p-2 rounded-full shadow-2xl">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{study.author.name}</h3>
                                            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">{study.author.role}</p>
                                        </div>

                                        <div className="w-full h-[1px] bg-white/5 my-10" />

                                        <div className="space-y-6 w-full text-left">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                                <span>Audit Date</span>
                                                <span className="text-white">{study.date}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                                <span>Facility</span>
                                                <span className="text-white uppercase">Lab_019</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                                <span>Integrity</span>
                                                <span className="text-emerald-500 uppercase flex items-center gap-1">Encrypted</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Evidence Preview */}
                                <div className="p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group shadow-xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Next Evidence</span>
                                        <ChevronRight className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <h4 className="text-2xl font-black text-zinc-700 group-hover:text-white transition-colors leading-[0.9] uppercase italic tracking-tighter">
                                        Exploiting Scalability <br />Across High-Load <br />Infrastructures
                                    </h4>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Industrial CTA Overlay */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-600/5 blur-[150px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-6xl mx-auto p-16 md:p-32 rounded-[4rem] bg-[#0A0A0A] border border-white/10 relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:30px_30px]" />

                        <div className="relative z-10">
                            <div
                                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-12 shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all duration-700"
                            >
                                <Target className="w-4 h-4" /> Capacity Secured
                            </div>

                            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-[0.9]">
                                YOUR REVENUE <br /><span className="text-orange-600">IS WAITING.</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-20 font-medium leading-relaxed">
                                The conversion framework applied to {study.client} is available for your platform.
                                <br />
                                <strong className="text-white italic underline decoration-orange-600 underline-offset-8">Stop losing money to friction.</strong>
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                                >
                                    <Target className="w-8 h-8" />
                                    Get My Strategy
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-10 py-8 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
                                >
                                    Speak with an Engineer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
