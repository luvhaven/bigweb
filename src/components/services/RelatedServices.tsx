'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Code, Shield, Users, Zap, Bot, Search, ShoppingCart, Smartphone, BarChart3, Brain } from 'lucide-react'

interface RelatedServicesProps {
    currentPath: string
}

const allServices = [
    { name: 'Staff Augmentation', path: '/services/staff-augmentation', icon: Users, desc: 'Scale your team with elite engineering squads on demand.' },
    { name: 'Platform Maintenance', path: '/services/maintenance', icon: Shield, desc: 'Industrial security, updates, and 99.99% uptime hardening.' },
    { name: 'GAIO (AI Optimization)', path: '/services/gaio', icon: Bot, desc: 'Master the AI search era — ChatGPT, Gemini, and Claude.' },
    { name: 'Web Engineering', path: '/services/web-development', icon: Code, desc: 'High-performance custom stacks and conversion-first platforms.' },
    { name: 'E-Commerce', path: '/services/ecommerce', icon: ShoppingCart, desc: 'High-converting storefronts engineered around buyer psychology.' },
    { name: 'Mobile Ecosystems', path: '/services/mobile-apps', icon: Smartphone, desc: 'Native iOS and Android apps that dominate in their category.' },
    { name: 'Data Analytics', path: '/services/analytics', icon: BarChart3, desc: 'Turn raw data into forensic business clarity and revenue signals.' },
    { name: 'AI Strategy', path: '/services/ai-consulting', icon: Brain, desc: 'Expert advisory for enterprise-scale AI transformation.' },
    { name: 'CRO & Performance', path: '/services/conversion-optimization', icon: Zap, desc: 'Surgical optimization that extracts maximum revenue from traffic.' },
    { name: 'SEO Growth', path: '/services/seo-growth', icon: Search, desc: 'Compounding organic growth that monopolizes keyword landscapes.' },
]

export default function RelatedServices({ currentPath }: RelatedServicesProps) {
    const filteredServices = allServices.filter(s => s.path !== currentPath).slice(0, 3)

    return (
        <section className="py-24 border-t border-white/[0.04] bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                    <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-4 block">
                            Explore More
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight">
                            Other solutions
                        </h2>
                    </div>
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-300 flex-shrink-0"
                    >
                        View all services
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {filteredServices.map((service, i) => (
                        <motion.div
                            key={service.path}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                href={service.path}
                                className="group flex flex-col h-full p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.10] hover:bg-white/[0.025] transition-all duration-700 relative overflow-hidden"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: 'radial-gradient(300px circle at 50% 0%, rgba(255,255,255,0.02), transparent 60%)' }}
                                />

                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center group-hover:border-white/[0.14] transition-colors duration-500">
                                        <service.icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-white/[0.04] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
                                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                                    </div>
                                </div>

                                <h3 className="font-display text-base text-white tracking-tight mb-3 group-hover:text-zinc-100 transition-colors duration-300">
                                    {service.name}
                                </h3>
                                <p className="text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors duration-500 flex-1">
                                    {service.desc}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
