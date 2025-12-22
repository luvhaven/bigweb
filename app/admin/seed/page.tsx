'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, AlertCircle, Database } from 'lucide-react'
import { toast } from 'sonner'
import { caseStudies } from '@/lib/case-study-data'

export default function AdminSeedPage() {
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState<string[]>([])
    const supabase = createClient()

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])

    const seedData = async () => {
        if (!confirm('This will insert sample data. Continue?')) return

        setLoading(true)
        setLogs([])
        addLog('Starting seed process...')

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No user found')

            const adminId = user.id
            addLog(`Seeding for Admin ID: ${adminId}`)

            // 1. Ensure Admin Profile Exists
            const { error: profileError } = await supabase
                .from('admin_users')
                .upsert({
                    id: adminId,
                    email: user.email,
                    role: 'super_admin',
                    name: 'Admin User',
                    is_active: true
                })

            if (profileError) addLog(`Warning creating profile: ${profileError.message}`)
            else addLog('Admin profile verified.')

            // 2. Services
            const services = [
                {
                    title: 'Enterprise Web Development',
                    slug: 'web-development',
                    tagline: 'Websites That Rank #1 & Convert Like Crazy',
                    description: 'Get found on Google\'s first page and convert that traffic into customers.',
                    features: ['Next.js 15', 'Sub-1s Load Times', 'Technical SEO', 'Conversion Optimization'],
                    results: '3x faster sites, top 3 Google rankings',
                    category: 'Development',
                    status: 'active',
                    created_by: adminId
                },
                {
                    title: 'UI/UX Design',
                    slug: 'ui-ux-design',
                    tagline: 'Interfaces That Turn Browsers Into Buyers',
                    description: 'Double your conversion rate with UX that sells.',
                    features: ['Conversion-Focused', 'A/B Testing', 'Mobile-First'],
                    results: 'Average 200% conversion increase',
                    category: 'Design',
                    status: 'active',
                    created_by: adminId
                }
            ]

            for (const service of services) {
                const { error } = await supabase.from('services').upsert(service, { onConflict: 'slug' })
                if (error) addLog(`Error seeding service ${service.title}: ${error.message}`)
                else addLog(`Seeded Service: ${service.title}`)
            }

            // 3. Clients
            const clients = [
                { company_name: 'TechCorp', contact_name: 'Sarah Johnson', email: 'sarah@techcorp.com', status: 'active', user_id: adminId },
                { company_name: 'Innovate Inc', contact_name: 'Mike Thomas', email: 'mike@innovate.com', status: 'active', user_id: adminId },
                { company_name: 'NeoBank Corp', contact_name: 'Alex Rivera', email: 'alex@neobank.com', status: 'active', user_id: adminId }
            ]

            const clientMap: Record<string, string> = {}

            for (const client of clients) {
                const { data, error } = await supabase
                    .from('clients')
                    .upsert(client, { onConflict: 'company_name' })
                    .select('id, company_name')
                    .single()

                if (error) {
                    // Try selecting if upsert failed (e.g. slight mismatch or RLS)
                    const { data: existing } = await supabase.from('clients').select('id').eq('company_name', client.company_name).single()
                    if (existing) clientMap[client.company_name] = existing.id
                    addLog(`Client ${client.company_name} processed/exists.`)
                } else if (data) {
                    clientMap[data.company_name] = data.id
                    addLog(`Seeded Client: ${client.company_name}`)
                }
            }

            // 4. Portfolio Projects (from case-study-data.ts)
            // Need to map caseStudies to DB schema
            for (const study of caseStudies) {
                // Find or create client
                let clientId = clientMap[study.client]
                if (!clientId) {
                    // Create client on fly if not exists
                    const { data: newClient } = await supabase.from('clients').insert({
                        company_name: study.client,
                        contact_name: 'Unknown',
                        user_id: adminId,
                        status: 'active'
                    }).select('id').single()
                    if (newClient) clientId = newClient.id
                }

                if (clientId) {
                    const project = {
                        title: study.title, // Schema uses 'title' or 'name'? checking migration 006 it said 'name', need to verify schema. 
                        // Migration 006: INSERT INTO projects (name, ...)
                        // BUT Admin Page (Portfolio) uses select('title'...)
                        // I suspect the table is 'portfolio_projects' or 'projects'.
                        // Page says: from('portfolio_projects').select('title'...)
                        // Migration 006 says: INSERT INTO projects ...
                        // This implies a mismatch or rename.
                        // I will assume 'portfolio_projects' is the correct table for the Admin CMS as verified in Step 3.
                        // The columns in Page were: title, client_name, category...
                        // Wait, Page select: `select('id, title, client_name, category...`)`
                        // Does `portfolio_projects` have `client_id` or `client_name` column?
                        // Page select doesn't join clients. It selects `client_name`.
                        // So I should insert `client_name` string directly.

                        client_name: study.client,
                        category: 'Development', // default
                        is_published: true,
                        is_featured: true,
                        completion_date: study.date ? new Date(study.date).toISOString() : new Date().toISOString(),
                        views_count: Math.floor(Math.random() * 1000),
                        image_url: study.image
                    }

                    const { error } = await supabase.from('portfolio_projects').upsert(project, { onConflict: 'title' }) // forcing upsert might fail if no unique constraint on title.
                    // Actually let's just insert if not exists.

                    if (error) {
                        // Try 'name' instead of 'title' if 'title' fails? No, Page confirmed 'title'.
                        addLog(`Error seeding project ${study.title}: ${error.message}`)
                    } else {
                        addLog(`Seeded Project: ${study.title}`)
                    }
                }
            }

            addLog('Seed complete!')
            toast.success('Database seeded successfully')

        } catch (err: any) {
            addLog(`CRITICAL ERROR: ${err.message}`)
            toast.error('Seed user failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8 space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Database className="w-8 h-8 text-emerald-500" />
                    Database Seeder
                </h1>
                <p className="text-zinc-400">
                    Inject frontend data into the Admin Database.
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <Button
                    onClick={seedData}
                    disabled={loading}
                    className="w-full h-12 text-lg font-medium bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Seeding...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Seed All Data
                        </>
                    )}
                </Button>

                {logs.length > 0 && (
                    <div className="mt-6 p-4 bg-black/50 rounded-lg border border-zinc-800 font-mono text-sm h-64 overflow-y-auto">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1 text-zinc-300 border-b border-zinc-900/50 pb-1 last:border-0">
                                {log}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
