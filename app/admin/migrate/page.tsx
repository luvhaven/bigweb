'use client'

import { useEffect, useState } from 'react'

export default function MigratePage() {
    const [status, setStatus] = useState('Initializing...')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const runMigration = async () => {
            setStatus('Starting migration...')
            try {
                const response = await fetch('/api/cms-migration')
                const data = await response.json()

                if (data.success) {
                    setStatus('✅ Migration successful!')
                } else {
                    setStatus('❌ Migration failed')
                    setError(data.error)
                }
            } catch (err: any) {
                setStatus('💥 Connection error')
                setError(err.message)
            }
        }

        runMigration()
    }, [])

    return (
        <div className="p-20 font-sans">
            <h1 className="text-2xl font-bold mb-4">CMS Database Migration</h1>
            <div className={`p-4 rounded border ${error ? 'bg-red-900/20 border-red-500' : 'bg-emerald-900/20 border-emerald-500'}`}>
                <p className="text-xl">{status}</p>
                {error && <p className="mt-2 text-red-400 font-mono text-sm">{error}</p>}
            </div>
            <div className="mt-8">
                <a href="/admin/cms" className="text-blue-400 hover:underline">← Go to CMS Dashboard</a>
            </div>
        </div>
    )
}
