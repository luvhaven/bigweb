'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, Database, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { caseStudies } from '@/lib/case-study-data'

export default function SyncPage() {
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState<string[]>([])
    const supabase = createClient()

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])

    const syncData = async () => {
        if (!confirm('This will synchronize all system data. Continue?')) return

        setLoading(true)
        setLogs([])
        addLog('🚀 Initializing BigWeb Neural Sync...')

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No user found. Please login first.')

            // 1. Ensure settings exist
            addLog('⚙️ Synchronizing Site Settings...')
            const { data: existingSettings } = await supabase.from('cms_settings').select('id').single()
            if (!existingSettings) {
                const { error } = await supabase.from('cms_settings').insert([{
                    site_name: 'BigWeb Digital',
                    site_description: 'Award-winning digital agency specialized in high-performance revenue systems.',
                    logo_url: '/logo.svg',
                    favicon_url: '/logo.svg'
                }])
                if (error) addLog(`❌ Settings Error: ${error.message}`)
                else addLog('✅ Default Settings Initialized')
            } else {
                addLog('✅ Settings Found')
            }

            // 2. SEED PROJECTS
            addLog('💼 Synchronizing Portfolio Projects...')
            for (const study of caseStudies) {
                const project = {
                    title: study.title,
                    slug: study.slug,
                    client_name: study.client,
                    summary: study.summary,
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
                if (error) addLog(`❌ Project Error (${study.title}): ${error.message}`)
                else addLog(`✨ Project Synced: ${study.title}`)
            }

            addLog('🏆 SYNC COMPLETE')
            toast.success('BigWeb Database Synchronized')

        } catch (err: any) {
            addLog(`🛑 CRITICAL FAILURE: ${err.message}`)
            toast.error('Sync failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-12 space-y-12">
            <div className="space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 mb-8">
                    <Database className="w-8 h-8 text-emerald-500" />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter">System Synchronization</h1>
                <p className="text-zinc-400 text-lg">
                    Synchronize all frontend data and ensure site settings are initialized.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl">
                <Button
                    onClick={syncData}
                    disabled={loading}
                    className="w-full h-16 text-xs font-black uppercase tracking-[0.4em] bg-white text-black hover:bg-emerald-500 hover:text-white transition-all rounded-2xl"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run Neural Sync"}
                </Button>

                {logs.length > 0 && (
                    <div className="mt-10 p-6 bg-black/40 rounded-3xl border border-white/5 font-mono text-[11px] h-80 overflow-y-auto space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className={`pb-2 border-b border-white/[0.02] last:border-0 ${log.includes('❌') ? 'text-red-400' : 'text-zinc-400'}`}>
                                {log}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
