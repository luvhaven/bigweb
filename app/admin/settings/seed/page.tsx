'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import AdminHeader from '@/components/admin/AdminHeader'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export default function SeedPage() {
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState<string[]>([])

    const addLog = (msg: string) => setLogs(prev => [...prev, msg])

    const runSeed = async () => {
        if (!confirm('This will add sample data to your database. Continue?')) return

        setLoading(true)
        setLogs([])
        addLog('🚀 Starting seed process...')

        try {
            // 1. Seed Services
            addLog('📦 Seeding Services...')
            const services = [
                {
                    title: 'Custom Web Development',
                    slug: 'web-development',
                    short_description: 'High-performance, scalable web applications built with modern technologies.',
                    description: 'We build robust, scalable, and high-performance web applications tailored to your business needs. Using the latest technologies like Next.js, React, and Node.js, we ensure your digital presence is future-proof.',
                    icon: 'Code',
                    status: 'published',
                    is_featured: true,
                    order_index: 1,
                    features: ['Next.js & React', 'Server-side Rendering', 'API Integration', 'Performance Optimization'],
                    pricing: { starting_price: '$5,000' }
                },
                {
                    title: 'Mobile App Development',
                    slug: 'mobile-development',
                    short_description: 'Native and cross-platform mobile apps for iOS and Android.',
                    description: 'Reach your customers on their favorite devices with our mobile app development services. We create seamless, intuitive, and engaging mobile experiences using React Native and native technologies.',
                    icon: 'Smartphone',
                    status: 'published',
                    is_featured: true,
                    order_index: 2,
                    features: ['iOS & Android', 'React Native', 'Offline Mode', 'Push Notifications'],
                    pricing: { starting_price: '$8,000' }
                },
                {
                    title: 'UI/UX Design',
                    slug: 'ui-ux-design',
                    short_description: 'User-centric design that drives engagement and conversion.',
                    description: 'Great software starts with great design. Our expert designers create intuitive, beautiful, and accessible user interfaces that delight your users and drive business results.',
                    icon: 'Palette',
                    status: 'published',
                    is_featured: true,
                    order_index: 3,
                    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
                    pricing: { starting_price: '$3,000' }
                }
            ]

            for (const service of services) {
                const { error } = await supabase.from('services').upsert(service, { onConflict: 'slug' })
                if (error) throw error
            }
            addLog('✅ Services seeded!')

            // 2. Seed Portfolio
            addLog('🎨 Seeding Portfolio...')
            const portfolio = [
                {
                    title: 'Fintech Analytics Dashboard',
                    slug: 'fintech-dashboard',
                    excerpt: 'Real-time financial data visualization for a leading fintech firm.',
                    description: 'We developed a comprehensive analytics dashboard for a major fintech company. The platform processes millions of transactions in real-time, providing actionable insights to traders and analysts.',
                    client_name: 'FinCorp Global',
                    industry: 'Finance',
                    project_type: 'Web Application',
                    featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
                    status: 'published',
                    is_featured: true,
                    order_index: 1,
                    technologies: ['React', 'D3.js', 'Node.js', 'WebSockets'],
                    results: 'Reduced data latency by 90% and improved analyst productivity by 40%.'
                },
                {
                    title: 'Luxury E-commerce Platform',
                    slug: 'luxury-ecommerce',
                    excerpt: 'A premium shopping experience for a high-end fashion brand.',
                    description: 'We redesigned and re-platformed the e-commerce store for a luxury fashion brand. The new site features immersive video, 3D product views, and a seamless checkout process.',
                    client_name: 'Velour & Co.',
                    industry: 'Retail',
                    project_type: 'E-commerce',
                    featured_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
                    status: 'published',
                    is_featured: true,
                    order_index: 2,
                    technologies: ['Next.js', 'Shopify Plus', 'WebGL', 'Stripe'],
                    results: 'Increased conversion rate by 150% and mobile sales by 200%.'
                },
                {
                    title: 'Telehealth Mobile App',
                    slug: 'telehealth-app',
                    excerpt: 'Connecting patients with doctors through secure video consultations.',
                    description: 'We built a HIPAA-compliant mobile app that allows patients to book appointments, chat with doctors, and conduct video consultations securely from their phones.',
                    client_name: 'MediConnect',
                    industry: 'Healthcare',
                    project_type: 'Mobile App',
                    featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
                    status: 'published',
                    is_featured: true,
                    order_index: 3,
                    technologies: ['React Native', 'WebRTC', 'Node.js', 'PostgreSQL'],
                    results: 'Facilitated over 50,000 remote consultations in the first year.'
                }
            ]

            for (const item of portfolio) {
                const { error } = await supabase.from('portfolio_items').upsert(item, { onConflict: 'slug' })
                if (error) throw error
            }
            addLog('✅ Portfolio seeded!')

            // 3. Seed Testimonials
            addLog('💬 Seeding Testimonials...')
            const testimonials = [
                {
                    client_name: 'Sarah Johnson',
                    client_role: 'CEO',
                    client_company: 'TechStart Inc.',
                    content: 'BigWeb transformed our digital presence. Their team is incredibly talented and professional. The new website has significantly increased our lead generation.',
                    rating: 5,
                    status: 'active',
                    is_featured: true,
                    order_index: 1,
                    client_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
                },
                {
                    client_name: 'Michael Chen',
                    client_role: 'CTO',
                    client_company: 'FinCorp Global',
                    content: 'The technical expertise of the BigWeb team is unmatched. They delivered a complex financial dashboard ahead of schedule and it performs flawlessly.',
                    rating: 5,
                    status: 'active',
                    is_featured: true,
                    order_index: 2,
                    client_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
                },
                {
                    client_name: 'Emily Davis',
                    client_role: 'Marketing Director',
                    client_company: 'Velour & Co.',
                    content: 'Working with BigWeb was a pleasure. They understood our brand vision perfectly and translated it into a stunning e-commerce experience.',
                    rating: 5,
                    status: 'active',
                    is_featured: true,
                    order_index: 3,
                    client_image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
                }
            ]

            for (const t of testimonials) {
                // We don't have a unique slug for testimonials, so we just insert if not exists or similar.
                // For simplicity in this seed tool, we'll just insert. 
                // To avoid duplicates, we could check first, but upsert with ID is best. 
                // Since we don't have IDs here, we'll just insert.
                // Actually, let's just insert.
                const { error } = await supabase.from('testimonials').insert(t)
                if (error) throw error
            }
            addLog('✅ Testimonials seeded!')

            addLog('🎉 Seeding complete!')
            toast.success('Database seeded successfully')
        } catch (error: any) {
            console.error('Seeding error:', error)
            addLog(`❌ Error: ${error.message}`)
            toast.error('Failed to seed database')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <AdminHeader title="Seed Database" description="Populate your database with sample content" />

            <Card>
                <CardHeader>
                    <CardTitle>Content Seeding</CardTitle>
                    <CardDescription>
                        Click the button below to add sample services, projects, and testimonials.
                        This is useful for initial setup or testing.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={runSeed} disabled={loading}>
                        {loading ? 'Seeding...' : 'Run Seed Script'}
                    </Button>

                    {logs.length > 0 && (
                        <div className="mt-4 p-4 bg-secondary rounded-lg font-mono text-sm space-y-1">
                            {logs.map((log, i) => (
                                <div key={i}>{log}</div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
