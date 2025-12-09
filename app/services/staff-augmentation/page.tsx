'use client'

import { motion } from "framer-motion"
import { ArrowRight, Check, Code, Shield, Users, Zap, Briefcase, Globe, Cpu, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ParticleBackground from "@/components/effects/ParticleBackground"
import RelatedServices from "@/components/services/RelatedServices"
import Navigation from "@/components/AdvancedNavigation"

export default function StaffAugmentation() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navigation />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
                    <ParticleBackground />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />
                </div>

                <div className="container relative z-20 px-6 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            Squad Extraction Protocol
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                            Scale Your Team <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-accent">
                                Without The Friction
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            Deploy pre-vetted, elite engineering squads into your workflow in 48 hours. Zero recruitment fees. Zero HR headaches. 100% Code Velocity.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/contact">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold">
                                    Deploy A Squad
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/estimator">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 font-medium">
                                    Calculate Cost Savings
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Problem / Solution Grid */}
            <section className="py-24 relative">
                <div className="container px-6 mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Traditional Hiring is <span className="text-red-400">Broken</span>.
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "90+ days to hire a Senior Engineer",
                                    "Expensive recruitment fees (20-30%)",
                                    "High turnover & retention risks",
                                    "Cultural misalignment & onboarding lag"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-lg text-muted-foreground">
                                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                                The <span className="text-accent">BigWeb</span> Way.
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "Deploy in 48-72 Hours",
                                    "Zero overhead / Payroll managed by us",
                                    "Top 1% Talent (Pre-vetted)",
                                    "Timezone Aligned (UTC +/- 2)"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-lg">
                                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                            <Check className="w-4 h-4 text-accent" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Talent Profiles */}
            <section className="py-24 bg-card/30 border-y border-white/5">
                <div className="container px-6 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Battle-Ready Talent</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Our engineers don't just write code. They architect solutions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Frontend Specialist",
                                icon: Code,
                                skills: ["React / Next.js", "TypeScript", "Tailwind / Framer", "Three.js"],
                                desc: "Pixel-perfect implementation of complex UI/UX."
                            },
                            {
                                title: "Backend Architect",
                                icon: Cpu,
                                skills: ["Node.js / Python", "PostgreSQL / Redis", "AWS / Docker", "GraphQL"],
                                desc: "Scalable, secure, and high-performance API design."
                            },
                            {
                                title: "Product Designer",
                                icon: Palette,
                                skills: ["Figma / Sketch", "User Research", "Prototyping", "Design Systems"],
                                desc: "Creating intuitive and beautiful user journeys."
                            }
                        ].map((profile, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-background/50 border border-white/10 rounded-2xl p-8 hover:border-accent/50 transition-colors group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                    <profile.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{profile.title}</h3>
                                <p className="text-muted-foreground mb-6">{profile.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium border border-white/5">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ / Process */}
            <section className="py-24">
                <div className="container px-6 mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12">Deployment Protocol</h2>
                    <div className="grid gap-8 text-left">
                        {[
                            { step: "01", title: "Discovery Call", text: "We analyze your roadmap and technical gaps." },
                            { step: "02", title: "Squad Assembly", text: "We handpick the perfect unit from our bench." },
                            { step: "03", title: "Integration", text: "Team joins your Slack/Jira. Kickoff in 48h." },
                            { step: "04", title: "Execution", text: "Daily standups, weekly sprints, continuous shipping." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                                <span className="text-4xl font-bold text-accent/50">{item.step}</span>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="container relative z-10 px-6 mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Inject Talent?</h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Stop waiting for "perfect" candidates. Start building with a perfect team.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-accent hover:bg-accent-dark text-white font-bold shadow-lg shadow-accent/25">
                            Book A Consultation
                        </Button>
                    </Link>
                </div>
            </section>

            <RelatedServices currentPath="/services/staff-augmentation" />

        </div>
    )
}
