'use client'

import { useState } from 'react'
import { checkUserStatus } from './actions'

export default function DebugAuthPage() {
    const [email, setEmail] = useState('')
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState('')

    async function handleCheck(formData: FormData) {
        const email = formData.get('email') as string
        const res = await checkUserStatus(email)
        if (res.error) {
            setError(res.error)
            setResult(null)
        } else {
            setResult(res.data)
            setError('')
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-12 font-mono">
            <h1 className="text-2xl mb-8 text-red-500 font-bold border-b border-white/20 pb-4">
                ADMIN AUTH DEBUGGER
            </h1>

            <div className="max-w-xl space-y-8">
                <form action={handleCheck} className="flex gap-4">
                    <input
                        name="email"
                        placeholder="Enter email to check..."
                        className="flex-1 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold">
                        SCAN USER
                    </button>
                </form>

                {error && (
                    <div className="p-4 bg-red-900/20 border border-red-500 text-red-400 rounded">
                        ERROR: {error}
                    </div>
                )}

                {result && (
                    <div className="space-y-6">
                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded">
                            <h2 className="text-xl text-green-400 mb-4">Auth Status</h2>
                            <pre className="text-xs text-zinc-400 overflow-auto">
                                {JSON.stringify(result.auth, null, 2)}
                            </pre>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <StatusItem label="User Exists" value={result.auth ? 'YES' : 'NO'} />
                                <StatusItem label="Email Confirmed" value={result.auth?.email_confirmed_at ? 'YES' : 'NO'} />
                                <StatusItem label="Banned" value={result.auth?.banned_until ? 'YES' : 'NO'} />
                            </div>
                        </div>

                        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded">
                            <h2 className="text-xl text-blue-400 mb-4">Database Record (public.admin_users)</h2>
                            <pre className="text-xs text-zinc-400 overflow-auto">
                                {JSON.stringify(result.db, null, 2)}
                            </pre>
                            <StatusItem label="Record Found" value={result.db ? 'YES' : 'NO'} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function StatusItem({ label, value }: { label: string, value: string }) {
    const color = value === 'YES' ? 'text-green-500' : 'text-red-500'
    return (
        <div className="border border-zinc-800 p-2 rounded bg-black">
            <div className="text-zinc-500 text-xs uppercase">{label}</div>
            <div className={`font-bold ${color}`}>{value}</div>
        </div>
    )
}
