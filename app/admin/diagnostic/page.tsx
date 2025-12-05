'use client'

export default function DiagnosticPage() {
    const envVars = {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***SET***' : 'NOT SET',
    }

    return (
        <div className="min-h-screen p-8 bg-background">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Environment Diagnostic</h1>

                <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold mb-2">Supabase URL</h2>
                        <code className="text-sm bg-secondary p-2 rounded block">
                            {envVars.supabaseUrl || '❌ NOT SET'}
                        </code>
                    </div>

                    <div className="p-4 border rounded-lg">
                        <h2 className="font-semibold mb-2">Supabase Anon Key</h2>
                        <code className="text-sm bg-secondary p-2 rounded block">
                            {envVars.supabaseKey}
                        </code>
                    </div>

                    <div className="p-4 border rounded-lg bg-blue-500/10">
                        <h2 className="font-semibold mb-2">✅ If both are set:</h2>
                        <p className="text-sm">Your environment variables are configured correctly.</p>
                    </div>

                    <div className="p-4 border rounded-lg bg-red-500/10">
                        <h2 className="font-semibold mb-2">❌ If NOT SET:</h2>
                        <ol className="text-sm space-y-1 list-decimal list-inside">
                            <li>Check that .env.local exists in the root directory</li>
                            <li>Verify the file contains NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                            <li>Restart the dev server completely (stop and start npm run dev)</li>
                            <li>Clear Next.js cache: delete .next folder and restart</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
