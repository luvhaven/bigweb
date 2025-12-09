'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react'

export default function AdminTestPage() {
    const [tests, setTests] = useState<Record<string, { status: 'pending' | 'success' | 'error', message: string }>>({})
    const [running, setRunning] = useState(false)

    const addTest = (name: string, status: 'pending' | 'success' | 'error', message: string) => {
        setTests(prev => ({ ...prev, [name]: { status, message } }))
    }

    const runTests = async () => {
        setRunning(true)
        setTests({})

        // Test 1: Environment Variables
        addTest('env', 'pending', 'Checking environment variables...')
        const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
        const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (hasUrl && hasKey) {
            addTest('env', 'success', 'Environment variables configured correctly')
        } else {
            addTest('env', 'error', `Missing: ${!hasUrl ? 'SUPABASE_URL ' : ''}${!hasKey ? 'SUPABASE_ANON_KEY' : ''}`)
        }

        // Test 2: Supabase Connection
        addTest('connection', 'pending', 'Testing Supabase connection...')
        try {
            const { data, error } = await supabase.from('admin_users').select('count').limit(1)
            if (error) throw error
            addTest('connection', 'success', 'Successfully connected to Supabase')
        } catch (error: any) {
            addTest('connection', 'error', `Connection failed: ${error.message}`)
        }

        // Test 3: Authentication
        addTest('auth', 'pending', 'Checking authentication status...')
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                addTest('auth', 'success', `Logged in as: ${session.user.email}`)
            } else {
                addTest('auth', 'error', 'Not authenticated (normal if not logged in)')
            }
        } catch (error: any) {
            addTest('auth', 'error', `Auth check failed: ${error.message}`)
        }

        // Test 4: Database Tables
        addTest('tables', 'pending', 'Checking database tables...')
        try {
            const tables = ['portfolio_projects', 'blog_posts', 'testimonials', 'services', 'contact_submissions']
            const results = await Promise.all(
                tables.map(table => supabase.from(table).select('count').limit(1))
            )
            const failedTables = results.filter((r, i) => r.error).map((r, i) => tables[i])

            if (failedTables.length === 0) {
                addTest('tables', 'success', `All ${tables.length} tables accessible`)
            } else {
                addTest('tables', 'error', `Cannot access: ${failedTables.join(', ')}`)
            }
        } catch (error: any) {
            addTest('tables', 'error', `Table check failed: ${error.message}`)
        }

        setRunning(false)
    }

    useEffect(() => {
        runTests()
    }, [])

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Admin System Diagnostics</h1>
                    <p className="text-zinc-400">Testing Supabase connection and admin functionality</p>
                </div>

                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Connection Tests</h2>
                        <Button
                            onClick={runTests}
                            disabled={running}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {running ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Running...
                                </>
                            ) : (
                                'Run Tests Again'
                            )}
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {Object.entries(tests).map(([name, test]) => (
                            <div
                                key={name}
                                className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700"
                            >
                                {test.status === 'pending' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin mt-0.5" />}
                                {test.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />}
                                {test.status === 'error' && <XCircle className="w-5 h-5 text-red-500 mt-0.5" />}
                                <div className="flex-1">
                                    <div className="font-medium capitalize">{name.replace('_', ' ')}</div>
                                    <div className="text-sm text-zinc-400">{test.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                    <h2 className="text-xl font-semibold mb-4">Environment Information</h2>
                    <div className="space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Supabase URL:</span>
                            <span className="text-emerald-400">
                                {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Missing'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Supabase Key:</span>
                            <span className="text-emerald-400">
                                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configured' : 'Missing'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Environment:</span>
                            <span className="text-emerald-400">{process.env.NODE_ENV}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-semibold text-blue-400 mb-1">Troubleshooting Tips:</p>
                            <ul className="list-disc list-inside text-zinc-300 space-y-1">
                                <li>If environment variables are missing, check .env.local file exists</li>
                                <li>For Vercel deployment, add env vars in Project Settings</li>
                                <li>Restart dev server after changing .env.local</li>
                                <li>Check Supabase dashboard for RLS policies and table permissions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
