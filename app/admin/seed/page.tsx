'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, Database, Users, Star, FolderKanban, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { caseStudies } from '@/lib/case-study-data'

export default function AdminSeedPage() {
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState<string[]>([])
    const supabase = createClient()

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])

    const seedData = async () => {
        if (!confirm('This will seed EVERYTHING (Projects, Team, Testimonials, Offers). Continue?')) return

        setLoading(true)
        setLogs([])
        addLog('🚀 Initializing BigWeb Global Seed...')

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No user found. Please login first.')

            const adminId = user.id
            addLog(`✅ Authenticated as Admin: ${user.email}`)

            // 1. SEED TEAM MEMBERS
            addLog('👥 Seeding Team Members...')
            const team = [
                {
                    name: 'Alex Rivera',
                    role: 'CEO & Technical Director',
                    department: 'Leadership',
                    bio: '15+ years in full-stack development and AI architecture. Former Tech Lead at Google.',
                    avatar_url: '/team/alex-rivera.jpg',
                    is_leadership: true,
                    is_active: true,
                    sort_order: 1
                },
                {
                    name: 'Sarah Chen',
                    role: 'Chief Design Officer',
                    department: 'Design',
                    bio: 'Award-winning UI/UX strategist with a decade of experience crafting premium digital experiences.',
                    avatar_url: '/team/sarah-chen.jpg',
                    is_leadership: true,
                    is_active: true,
                    sort_order: 2
                },
                {
                    name: 'Julian Reed',
                    role: 'UI/UX Architect',
                    department: 'Design',
                    bio: 'Specialist in high-conversion interface architecture and behavioral design.',
                    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
                    is_leadership: false,
                    is_active: true,
                    sort_order: 3
                },
                {
                    name: 'Daniel Oriazowan',
                    role: 'Lead Conversion Engineer',
                    department: 'Development',
                    bio: 'Expert in Next.js performance and revenue-generating funnel re-engineering.',
                    avatar_url: '/images/team/daniel.jpg',
                    is_leadership: true,
                    is_active: true,
                    sort_order: 0
                }
            ]

            for (const member of team) {
                const { error } = await supabase.from('cms_team_members').upsert(member, { onConflict: 'name' })
                if (error) addLog(`❌ Team Error (${member.name}): ${error.message} (Code: ${error.code})`)
                else addLog(`✨ Team Seeding: ${member.name}`)
            }

            // 2. SEED TESTIMONIALS
            addLog('💬 Seeding Testimonials...')
            const testimonials = [
                {
                    client_name: 'Sarah Johnson',
                    client_role: 'CEO',
                    client_company: 'Karat Financial',
                    quote: "BIGWEB transformed our digital presence completely. Their attention to detail and creative approach exceeded our expectations. Our revenue increased by 40% in the first quarter post-launch.",
                    rating: 5,
                    is_featured: true,
                    avatar_url: 'https://i.pravatar.cc/150?u=sarah'
                },
                {
                    client_name: 'Michael Chen',
                    client_role: 'VP of Marketing',
                    client_company: 'Stellar',
                    quote: "Working with BIGWEB was a game-changer. They delivered a stunning website (Vortex Pay) that perfectly captures our brand essence and converted visitors at a 64% higher rate.",
                    rating: 5,
                    is_featured: true,
                    avatar_url: 'https://i.pravatar.cc/150?u=michael'
                },
                {
                    client_name: 'Emily Rodriguez',
                    client_role: 'Product Director',
                    client_company: 'Innovate',
                    quote: "The team's expertise in modern web technologies and design thinking is unmatched. They don't just build websites; they build revenue systems.",
                    rating: 5,
                    is_featured: false,
                    avatar_url: 'https://i.pravatar.cc/150?u=emily'
                }
            ]

            for (const t of testimonials) {
                const { error } = await supabase.from('cms_testimonials').upsert(t, { onConflict: 'client_name' })
                if (error) addLog(`❌ Testimonial Error (${t.client_name}): ${error.message} (Code: ${error.code})`)
                else addLog(`✨ Testimonial Seeded: ${t.client_name}`)
            }

            // 3. SEED GROWTH PACKAGES (OFFERS)
            addLog('🏷️ Seeding Growth Offers...')
            const offers = [
                {
                    title: 'The Revenue Website System',
                    slug: 'revenue-system',
                    description: 'Hand-coded Next.js ecosystem designed to rank #1 and drive massive conversion.',
                    price_display: '$1,997',
                    features: ['Next.js 15 Engine', 'AI Sales Agent', 'Enterprise SEO', 'Conversion Architecture'],
                    cta_text: 'Get Started',
                    cta_link: '/contact',
                    is_featured: true,
                    is_active: true,
                    sort_order: 1
                },
                {
                    title: 'AI Customer Boost',
                    slug: 'ai-boost',
                    description: 'Interactive AI Sales Agents integrated into your current site to qualify leads 24/7.',
                    price_display: 'Custom',
                    features: ['Custom Knowledge Base', '24/7 Availability', 'Lead Scoring', 'CRM Sync'],
                    cta_text: 'Learn More',
                    cta_link: '/services/ai-integration',
                    is_featured: false,
                    is_active: true,
                    sort_order: 2
                },
                {
                    title: 'GAIO Suite',
                    slug: 'gaio',
                    description: 'Optimization for ChatGPT, Gemini, and Perplexity to ensure your brand is the top answer.',
                    price_display: '$2,497/mo',
                    features: ['Semantic Optimization', 'LLM Relationship Mapping', 'Content Authority', 'Voice Search SEO'],
                    cta_text: 'Explore GAIO',
                    cta_link: '/services/gaio',
                    is_featured: true,
                    is_active: true,
                    sort_order: 0
                }
            ]

            for (const offer of offers) {
                const { error } = await supabase.from('cms_growth_packages').upsert(offer, { onConflict: 'slug' })
                if (error) addLog(`❌ Offer Error (${offer.title}): ${error.message} (Code: ${error.code})`)
                else addLog(`✨ Offer Seeded: ${offer.title}`)
            }

            // 4. SEED PROJECTS
            addLog('💼 Seeding Portfolio Projects...')
            for (const study of caseStudies) {
                const project = {
                    title: study.title,
                    slug: study.slug,
                    client_name: study.client,
                    challenge: study.challenge,
                    solution: study.solution,
                    results: Array.isArray(study.results) ? study.results.join(', ') : study.results,
                    cover_image_url: study.image,
                    is_published: true,
                    is_featured: true,
                    category: study.offer || 'Web Development',
                    tech_stack: study.technologies
                }

                const { error } = await supabase.from('cms_projects').upsert(project, { onConflict: 'slug' })
                if (error) addLog(`❌ Project Error (${study.title}): ${error.message} (Code: ${error.code})`)
                else addLog(`✨ Project Seeded: ${study.title}`)
            }

            addLog('🏆 GLOBAL SEED COMPLETE')
            toast.success('BigWeb Database fully synchronized')

        } catch (err: any) {
            addLog(`🛑 CRITICAL SEED FAILURE: ${err.message}`)
            toast.error('Global seed failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-12 space-y-12 font-sans selection:bg-emerald-500/30">
            <div className="space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 mb-8">
                    <Database className="w-8 h-8 text-emerald-500" />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter">BigWeb Backend Synchronization</h1>
                <p className="text-zinc-400 text-lg">
                    This tool synchronizes all "hardcoded" frontend data into the persistent Supabase backend.
                    This enables full CRUD functionality via the Admin Console.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-white/40 uppercase tracking-widest">Data Targets</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-zinc-300">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-bold uppercase tracking-widest">cms_team_members</span>
                            </li>
                            <li className="flex items-center gap-2 text-zinc-300">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-bold uppercase tracking-widest">cms_testimonials</span>
                            </li>
                            <li className="flex items-center gap-2 text-zinc-300">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-bold uppercase tracking-widest">cms_growth_packages</span>
                            </li>
                            <li className="flex items-center gap-2 text-zinc-300">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-bold uppercase tracking-widest">cms_projects</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-center">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Sync Protocol</p>
                        <p className="text-sm text-zinc-500 leading-relaxed italic">"OnConflict Upsert" ensures no duplicate data is created while updating existing records with the latest frontend definitions.</p>
                    </div>
                </div>

                <Button
                    onClick={seedData}
                    disabled={loading}
                    className="w-full h-16 text-xs font-black uppercase tracking-[0.4em] bg-white text-black hover:bg-emerald-500 hover:text-white transition-all rounded-2xl border-0 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Synchronizing Neural Map...
                        </div>
                    ) : (
                        "Initialize Global Synchronization"
                    )}
                </Button>

                {logs.length > 0 && (
                    <div className="mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">System_Logs</span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Core_Active</span>
                        </div>
                        <div className="p-6 bg-black/40 rounded-3xl border border-white/5 font-mono text-[11px] h-80 overflow-y-auto space-y-2 custom-scrollbar">
                            {logs.map((log, i) => (
                                <div key={i} className={`pb-2 border-b border-white/[0.02] last:border-0 ${log.includes('❌') ? 'text-red-400' : log.includes('✅') ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                    <span className="opacity-30 mr-3">{log.split(': ')[0]}</span>
                                    {log.split(': ')[1]}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
