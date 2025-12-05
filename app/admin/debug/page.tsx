'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'

export default function DebugPage() {
    const [logs, setLogs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toISOString().split('T')[1]} - ${msg}`])

    const runTest = async () => {
        setLoading(true)
        setLogs([])
        addLog('🚀 Starting connection test...')

        try {
            // 1. Check Env Vars
            addLog('Checking environment variables...')
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

            if (!url) addLog('❌ NEXT_PUBLIC_SUPABASE_URL is missing')
            else addLog(`✅ URL found: ${url.substring(0, 15)}...`)

            if (!key) addLog('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing')
            else addLog('✅ Key found')

            if (!url || !key) throw new Error('Missing credentials')

            // 2. Test Supabase Client
            addLog('Testing Supabase Client query...')
            const { data, error } = await supabase.from('testimonials').select('count', { count: 'exact', head: true })

            if (error) {
                addLog('❌ Query failed!')
                addLog(`Error: ${JSON.stringify(error, null, 2)}`)
                console.error('Debug Query Error:', error)
            } else {
                addLog('✅ Query successful!')
                addLog(`Data: ${JSON.stringify(data)}`)
            }

            // 3. Test Direct Fetch (Bypass Client)
            addLog('Testing direct fetch...')
            const directUrl = `${url}/rest/v1/testimonials?select=*&limit=1`
            const response = await fetch(directUrl, {
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`
                }
            })

            addLog(`Fetch status: ${response.status}`)
            if (!response.ok) {
                const text = await response.text()
                addLog(`Fetch error body: ${text}`)
            } else {
                const json = await response.json()
                addLog('✅ Direct fetch successful')
            }

        } catch (err: any) {
            addLog(`❌ Test crashed: ${err.message}`)
            console.error(err)
        } finally {
            setLoading(false)
            addLog('🏁 Test complete')
        }
    }

    const sqlFix = `-- Run this in your Supabase SQL Editor to fix the recursion error:

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role text;
BEGIN
  IF auth.uid() IS NULL THEN RETURN NULL; END IF;
  SELECT role INTO _role FROM profiles WHERE id = auth.uid();
  RETURN _role;
END;
$$;

DROP POLICY IF EXISTS "Admins and editors can manage testimonials" ON testimonials;
CREATE POLICY "Admins and editors can manage testimonials" ON testimonials FOR ALL USING (
  get_current_user_role() IN ('admin', 'editor')
);

-- Repeat for other tables (services, portfolio_items, etc) using get_current_user_role()
-- See supabase/migrations/20250128000002_fix_rls_recursion.sql for full script
`

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Supabase Connection Debugger</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="p-4 border rounded bg-secondary/10">
                        <p className="mb-4">Click the button below to run a comprehensive connection test.</p>
                        <Button onClick={runTest} disabled={loading}>
                            {loading ? 'Running...' : 'Run Diagnostics'}
                        </Button>
                    </div>

                    <div className="bg-black/90 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px] overflow-auto whitespace-pre-wrap">
                        {logs.length === 0 ? 'Ready to test...' : logs.join('\n')}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 border rounded bg-blue-500/10 border-blue-200">
                        <h2 className="font-bold mb-2">💡 How to fix "Infinite Recursion"</h2>
                        <p className="text-sm mb-4">
                            If you see <code>infinite recursion detected</code>, it means your database policies are stuck in a loop.
                            Run the SQL below in your Supabase Dashboard to fix it.
                        </p>
                        <div className="relative">
                            <pre className="bg-secondary p-4 rounded text-xs overflow-auto max-h-[300px]">
                                {sqlFix}
                            </pre>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                    navigator.clipboard.writeText(sqlFix)
                                    alert('SQL copied to clipboard!')
                                }}
                            >
                                Copy SQL
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
