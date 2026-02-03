'use client'

import React from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white flex items-center justify-center h-screen font-sans selection:bg-orange-600/30">
        <div className="relative text-center max-w-xl p-6">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-[size:40px_40px] pointer-events-none" />

          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-orange-600/10 border border-orange-500/20 mb-8 shadow-[0_0_50px_rgba(234,88,12,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
          </div>

          <h2 className="text-5xl font-black mb-6 uppercase italic tracking-tighter">
            System <span className="text-orange-600">Critical</span>
          </h2>

          <p className="text-xl text-zinc-500 mb-12 font-medium leading-relaxed">
            Our automated protocols encountered a critical root exception. We are diagnosticating the core failure.
          </p>

          <button
            onClick={() => reset()}
            className="h-16 px-10 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-900/40"
          >
            Initiate System Restore
          </button>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">Root Diagnostic Logs</p>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-500">
              STATUS: CORE_FAILURE
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
