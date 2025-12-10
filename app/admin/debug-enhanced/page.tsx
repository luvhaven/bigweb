'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'

export default function AdminDebugEnhanced() {
    const [tests, setTests] = useState<Record<string, { status: 'idle' | 'running' | 'success' | 'error', message: string, details?: string }>>({})
    const [running, setRunning] = useState(false)

    const updateTest = (name: string, status: 'idle' | 'running' | 'success' | 'error', message: string, details?: string) => {
        setTests(prev => ({ ...prev, [name]: { status, message, details } }))
    }

    const runDiagnostics = async () => {
        setRunning(true)
        setTests({})

        // Test 1: Check if environment variables are defined
        updateTest('env', 'running', 'Checking environment variables...')
        await new Promise(resolve => setTimeout(resolve, 500))

        const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
        const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (hasUrl && hasKey) {
            updateTest('env', 'success', 'Environment variables loaded',
                `URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...`)
        } else {
            updateTest('env', 'error', 'Missing environment variables',
                `URL: ${hasUrl ? 'SET' : 'MISSING'} | KEY: ${hasKey ? 'SET' : 'MISSING'}`)
            setRunning(false)
            return
        }

        // Test 2: Test Supabase client initialization
        updateTest('client', 'running', 'Testing Supabase client initialization...')
        await new Promise(resolve => setTimeout(resolve, 500))

        try {
            // Try to access auth
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
            if (sessionError) throw sessionError
            updateTest('client', 'success', 'Supabase client initialized',
                `Session: ${sessionData.session ? 'Active' : 'No session'}`)
        } catch (err: any) {
            updateTest('client', 'error', 'Client initialization failed', err.message)
            setRunning(false)
            return
        }

        // Test 3: Test database connection
        updateTest('database', 'running', 'Testing database connection...')
        await new Promise(resolve => setTimeout(resolve, 500))

        try {
            const { data, error } = await supabase.from('admin_users').select('count').limit(1)
            if (error) throw error
            updateTest('database', 'success', 'Database connection successful',
                'Can query admin_users table')
        } catch (err: any) {
            updateTest('database', 'error', 'Database connection failed',
                `Error: ${err.message} | Code: ${err.code || 'unknown'}`)
        }

        // Test 4: Test auth state
        updateTest('auth', 'running', 'Checking authentication state...')
        await new Promise(resolve => setTimeout(resolve, 500))

        try {
            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) throw error

            if (session) {
                updateTest('auth', 'success', 'User is authenticated',
                    `Email: ${session.user.email}`)
            } else {
                updateTest('auth', 'error', 'Not authenticated',
                    'No active session - try logging in')
            }
        } catch (err: any) {
            updateTest('auth', 'error', 'Auth check failed', err.message)
        }

        // Test 5: Test RLS policies
        updateTest('rls', 'running', 'Testing Row Level Security policies...')
        await new Promise(resolve => setTimeout(resolve, 500))

        try {
            const tables = ['portfolio_projects', 'blog_posts', 'testimonials', 'services']
            const results = await Promise.all(
                tables.map(table => supabase.from(table).select('count').limit(1))
            )
            const failed = results.filter(r => r.error).length

            if (failed === 0) {
                updateTest('rls', 'success', 'RLS policies allow access',
                    `All ${tables.length} tables accessible`)
            } else {
                updateTest('rls', 'error', 'RLS policies blocking access',
                    `${failed}/${tables.length} tables blocked`)
            }
        } catch (err: any) {
            updateTest('rls', 'error', 'RLS test failed', err.message)
        }

        setRunning(false)
    }

    useEffect(() => {
        runDiagnostics()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Admin System Diagnostics
                    </h1>
                    <p className="text-gray-400">Comprehensive system health check</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">System Tests</h2>
                        <Button
                            onClick={runDiagnostics}
                            disabled={running}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {running ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Running...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Run Again
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {Object.entries(tests).map(([name, test]) => (
                            <div
                                key={name}
                                className="p-4 rounded-lg bg-gray-900/50 border border-gray-700"
                            >
                                <div className="flex items-start gap-3">
                                    {test.status === 'running' && (
                                        <RefreshCw className="w-5 h-5 text-blue-400 animate-spin mt-0.5 flex-shrink-0" />
                                    )}
                                    {test.status === 'success' && (
                                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    )}
                                    {test.status === 'error' && (
                                        <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold capitalize text-white">
                                            {name.replace('_', ' ')}
                                        </div>
                                        <div className="text-sm text-gray-300 mt-1">{test.message}</div>
                                        {test.details && (
                                            <div className="text-xs text-gray-500 mt-1 font-mono bg-black/30 p-2 rounded">
                                                {test.details}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold text-blue-300 mb-2">Solutions</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-1">
                                    <li>Env vars missing? Check .env.local exists</li>
                                    <li>Client errors? Verify Supabase project URL</li>
                                    <li>RLS blocking? Check policies in Supabase dashboard</li>
                                    <li>Not authenticated? Try /admin/login</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <div className="text-sm">
                            <p className="font-semibold text-purple-300 mb-2">Quick Actions</p>
                            <div className="space-y-2 text-gray-300">
                                <a href="/admin/login" className="block hover:text-purple-400 transition-colors">
                                    → Go to Login Page
                                </a>
                                <a href="/admin" className="block hover:text-purple-400 transition-colors">
                                    → Open Dashboard
                                </a>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="block hover:text-purple-400 transition-colors text-left"
                                >
                                    → Reload Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
