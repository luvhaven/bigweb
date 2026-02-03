'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Check, LucideIcon, Code, Layout, Smartphone, Lock, Rocket, Eye, Terminal,
    Shield, Timer, Search, ShieldCheck, Activity, CheckCircle2, Cpu, Zap, BarChart3,
    Users, Network, Microscope, FlaskConical, Bot, Sparkles, Target, Layers, GitBranch
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdvancedNavigation from '@/components/AdvancedNavigation';
import Footer from '@/components/Footer';
import type { PageSection } from '@/types/database';

interface CapabilityPageLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    heroImage?: string; // Optional background image/pattern
    includes: string[];
    features?: { title: string; desc: string; icon?: string }[];
    benefits?: { title: string; desc: string }[];
    problem?: { title: string; desc: string; sideNot?: string };
    methodology?: { title: string; steps: { title: string; desc: string }[] };
    techStack?: { category: string; tools: string[] }[];
    sections?: PageSection[];
}

export default function CapabilityPageLayout({
    title,
    subtitle,
    description,
    includes,
    features,
    benefits,
    problem,
    methodology,
    techStack,
    sections
}: CapabilityPageLayoutProps) {
    // Map icons for dynamic features
    const iconMap: Record<string, any> = {
        Code, Layout, Smartphone, Lock, Rocket, Eye, Terminal, ArrowRight, Check, Shield, Timer, Search, ShieldCheck, Activity, CheckCircle2, Cpu, Zap, BarChart3, Users, Network, Microscope, FlaskConical, Bot, Sparkles, Target, Layers, GitBranch
    };

    // If we have dynamic sections, we might want to override or append
    // For now, let's allow dynamic hero and other sections
    const dynamicHero = sections?.find(s => s.section_type === 'hero');
    const dynamicFeatures = sections?.filter(s => s.section_type === 'features');
    const dynamicBenefits = sections?.find(s => s.section_type === 'benefits');
    const dynamicProblem = sections?.find(s => s.section_type === 'problem');
    const dynamicMethodology = sections?.find(s => s.section_type === 'methodology');
    const dynamicCTA = sections?.find(s => s.section_type === 'cta');
    const dynamicTechStack = sections?.find(s => s.section_type === 'tech_stack');

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 font-sans">
            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] bg-[size:40px_40px]" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -left-20 top-1/2 w-[400px] h-[400px] bg-purple-900/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">{subtitle}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase italic">
                                {(dynamicHero?.title || title).split(' ').map((word, i, arr) => (
                                    <span key={i} className={i === arr.length - 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600' : 'text-white'}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-2xl mb-12">
                                {dynamicHero?.description || description}
                            </p>

                            {/* Includes Chips */}
                            <div className="flex flex-wrap gap-3 mb-16">
                                {includes.map((item, i) => (
                                    <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-mono text-zinc-300 uppercase tracking-wider hover:border-orange-500/50 transition-colors cursor-default">
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link href="/contact">
                                    <Button className="h-16 px-10 rounded-none bg-white text-black hover:bg-orange-500 hover:text-white font-black uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(249,115,22,0.3)]">
                                        Initiate Engagement
                                    </Button>
                                </Link>
                                <Link href="#details">
                                    <Button variant="outline" className="h-16 px-10 rounded-none border-zinc-800 text-zinc-400 hover:text-white hover:border-white font-bold uppercase tracking-[0.2em] text-xs">
                                        Explore Intelligence
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Diagnostic / Problem Framing */}
            {(dynamicProblem || problem) && (
                <section className="py-24 border-y border-white/5 bg-[#050505] relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-5">
                                <div className="text-[10px] font-bold text-red-500 uppercase tracking-[0.4em] mb-6 animate-pulse">Critical_Friction_Detected</div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-6 leading-[0.9]">{dynamicProblem?.title || problem?.title}</h2>
                                <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-transparent mb-8" />
                            </div>
                            <div className="md:col-span-7">
                                <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-8">
                                    "{dynamicProblem?.description || problem?.desc}"
                                </p>
                                {(dynamicProblem?.metadata?.sideNote || problem?.sideNot) && (
                                    <div className="p-6 border-l-2 border-red-500/20 bg-red-900/5 text-xs font-mono text-red-400/80 uppercase tracking-widest leading-loose">
                                        ⚠ Diagnostic Note: {dynamicProblem?.metadata?.sideNote || problem?.sideNot}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Deep Dive / Features Grid */}
            {(dynamicFeatures && dynamicFeatures.length > 0 || features) && (
                <section id="details" className="py-24 border-t border-white/5 bg-[#080808]">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dynamicFeatures && dynamicFeatures.length > 0
                                ? dynamicFeatures.map((section, i) => {
                                    const Icon = iconMap[section.metadata?.icon] || Code;
                                    return (
                                        <div key={section.id} className="p-8 border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all duration-300 group">
                                            <Icon className="w-8 h-8 text-zinc-600 group-hover:text-orange-500 transition-colors mb-6" />
                                            <h3 className="text-xl font-black uppercase italic text-white mb-4 group-hover:translate-x-1 transition-transform">{section.title}</h3>
                                            <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{section.description}</p>
                                        </div>
                                    )
                                })
                                : features?.map((feature, i) => {
                                    const Icon = feature.icon ? iconMap[feature.icon] : null;
                                    return (
                                        <div key={i} className="p-8 border border-white/5 bg-white/[0.02] hover:border-orange-500/30 transition-all duration-300 group">
                                            {Icon && (
                                                <Icon className="w-8 h-8 text-zinc-600 group-hover:text-orange-500 transition-colors mb-6" />
                                            )}
                                            <h3 className="text-xl font-black uppercase italic text-white mb-4 group-hover:translate-x-1 transition-transform">{feature.title}</h3>
                                            <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{feature.desc}</p>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </section>
            )}

            {/* Benefits / Philosophy */}
            {benefits && (
                <section className="py-24 bg-[#050505]">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                                    The <span className="text-zinc-700">Advantage.</span>
                                </h2>
                                <ul className="space-y-8">
                                    {dynamicBenefits?.metadata?.items
                                        ? dynamicBenefits.metadata.items.map((benefit: any, i: number) => (
                                            <li key={i} className="flex gap-6 group">
                                                <div className="w-12 h-12 shrink-0 border border-zinc-800 flex items-center justify-center text-zinc-600 font-mono font-bold group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                                                    0{i + 1}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white uppercase tracking-wide mb-2">{benefit.title}</h4>
                                                    <p className="text-zinc-500 text-sm leading-relaxed">{benefit.desc}</p>
                                                </div>
                                            </li>
                                        ))
                                        : benefits?.map((benefit, i) => (
                                            <li key={i} className="flex gap-6 group">
                                                <div className="w-12 h-12 shrink-0 border border-zinc-800 flex items-center justify-center text-zinc-600 font-mono font-bold group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                                                    0{i + 1}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white uppercase tracking-wide mb-2">{benefit.title}</h4>
                                                    <p className="text-zinc-500 text-sm leading-relaxed">{benefit.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="relative h-[600px] border border-white/5 bg-[#0A0A0A] overflow-hidden hidden lg:block">
                                {/* Abstract technical visualization placeholder */}
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-[size:20px_20px]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-orange-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-orange-500 uppercase tracking-widest animate-pulse">
                                    Processing_Data
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Methodology / Process */}
            {methodology && (
                <section className="py-24 bg-[#080808] border-y border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-white tracking-tighter mb-4">{methodology.title}</h2>
                            <div className="w-24 h-1 bg-orange-600 mx-auto" />
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {methodology.steps.map((step, i) => (
                                <div key={i} className="relative p-8 border border-white/5 bg-black hover:border-orange-500/30 transition-all duration-300 group">
                                    <div className="absolute -top-4 -left-4 text-4xl font-black text-zinc-900 italic select-none group-hover:text-orange-900/20 transition-colors">0{i + 1}</div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-3 group-hover:text-orange-500 transition-colors">{step.title}</h3>
                                        <div className="w-8 h-[2px] bg-zinc-800 mb-4 group-hover:bg-orange-500 transition-colors" />
                                        <p className="text-xs text-zinc-500 leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Tech Stack / Intelligence */}
            {techStack && (
                <section className="py-20 bg-[#050505]">
                    <div className="container mx-auto px-6">
                        <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em] text-center mb-12">Deployed_Intelligence_Stack</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {techStack.map((category, i) => (
                                <div key={i} className="space-y-4">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-zinc-900 pb-2">{category.category}</h4>
                                    <ul className="space-y-2">
                                        {category.tools.map((tool, j) => (
                                            <li key={j} className="text-xs text-zinc-500 font-mono hover:text-orange-500 transition-colors cursor-default">
                                                :: {tool}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Footer Wrapper */}
            <Footer />
        </main>
    );
}
