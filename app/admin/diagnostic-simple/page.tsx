'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'

export default function AdminDiagnosticSimple() {
    const [logs, setLogs] = useState<string[]>([])

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    }

    useEffect(() => {
        const runDiagnostics = async () => {
            addLog('🔍 Starting diagnostics...')

            // Check environment
            addLog(`ENV Check: NEXT_PUBLIC_SUPABASE_URL = ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET ✅' : 'NOT SET ❌'}`)
            addLog(`ENV Check: NEXT_PUBLIC_SUPABASE_ANON_KEY = ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET ✅' : 'NOT SET ❌'}`)

            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                addLog('❌ CRITICAL: Environment variables not set!')
                addLog('💡 Solution: Check .env.local file exists and has correct values')
                addLog('💡 For production: Add env vars in Vercel dashboard')
                return
            }

            // Test connection
            addLog('🔌 Testing Supabase connection...')
            try {
                const { error } = await supabase.from('admin_users').select('count').limit(1)
                if (error) {
                    addLog(`❌ Connection failed: ${error.message}`)
                    addLog(`💡 Error code: ${error.code}`)
                } else {
                    addLog('✅ Connected to Supabase successfully!')
                }
            } catch (err: any) {
                addLog(`❌ Connection error: ${err.message}`)
            }

            // Test auth
            addLog('🔐 Checking auth status...')
            try {
                const { data, error } = await supabase.auth.getSession()
                if (error) {
                    addLog(`❌ Auth error: ${error.message}`)
                } else if (data.session) {
                    addLog(`✅ Logged in as: ${data.session.user.email}`)
                } else {
                    addLog('ℹ️  Not logged in (normal if you haven\'t logged in yet)')
                }
            } catch (err: any) {
                addLog(`❌ Auth check failed: ${err.message}`)
            }

            addLog('✅ Diagnostics complete!')
        }

        runDiagnostics()
    }, [])

    return (
        <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl mb-4 text-white">Admin Diagnostics Console</h1>
                <div className="bg-gray-900 p-4 rounded border border-green-900">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1 text-sm">
                            {log}
                        </div>
                    ))}
                    {logs.length === 0 && <div className="text-gray-500">Initializing...</div>}
                </div>
                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500 rounded text-blue-400 text-sm">
                    <p className="font-bold mb-2">Quick Actions:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Go to <a href="/admin/login" className="underline">/admin/login</a> to try logging in</li>
                        <li>Check console (F12) for detailed error messages</li>
                        <li>Verify .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
