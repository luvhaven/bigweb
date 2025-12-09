'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Shield, Users, Zap, Bot, Search, ShoppingCart, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RelatedServicesProps {
    currentPath: string
}

const allServices = [
    {
        name: "Staff Augmentation",
        path: "/services/staff-augmentation",
        icon: Users,
        description: "Scale your team instantly with elite engineers.",
        color: "from-blue-600 to-indigo-600"
    },
    {
        name: "Website Maintenance",
        path: "/services/maintenance",
        icon: Shield,
        description: "24/7 security, updates, and performance monitoring.",
        color: "from-green-600 to-emerald-600"
    },
    {
        name: "GAIO (AI Optimization)",
        path: "/services/gaio",
        icon: Bot,
        description: "Optimize for the AI search era (ChatGPT, Gemini).",
        color: "from-purple-600 to-pink-600"
    },
    {
        name: "Web Development",
        path: "/services/web-development",
        icon: Code,
        description: "Award-winning custom websites and web apps.",
        color: "from-orange-500 to-red-500"
    },
    {
        name: "E-Commerce",
        path: "/services/ecommerce",
        icon: ShoppingCart,
        description: "High-converting online stores and marketplaces.",
        color: "from-cyan-500 to-blue-500"
    },
    {
        name: "Mobile Apps",
        path: "/services/mobile-apps",
        icon: Smartphone,
        description: "Native iOS and Android applications.",
        color: "from-pink-500 to-rose-500"
    }
]

export default function RelatedServices({ currentPath }: RelatedServicesProps) {
    // Filter out current service and take top 3 distinct ones
    const filteredServices = allServices
        .filter(s => s.path !== currentPath)
        .slice(0, 3)

    return (
        <section className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />

            <div className="container px-6 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore More Solutions</h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Comprehensive digital strategies to accelerate your growth.
                        </p>
                    </div>
                    <Link href="/services">
                        <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 rounded-full px-6">
                            View All Services
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {filteredServices.map((service, i) => (
                        <Link key={service.path} href={service.path} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="h-full p-8 rounded-2xl bg-card border border-white/5 hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                                        <service.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                                    {service.name}
                                </h3>
                                <p className="text-muted-foreground mb-6 line-clamp-2">
                                    {service.description}
                                </p>

                                <div className="flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
