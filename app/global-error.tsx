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
      <body className="bg-black text-white flex items-center justify-center h-screen font-sans selection:bg-accent/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/[0.05] blur-[160px] rounded-full pointer-events-none" />

        <div className="relative text-center max-w-2xl px-6 z-10">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-[2rem] bg-red-500/5 border border-red-500/20 mb-12 shadow-[0_0_50px_rgba(239,44,44,0.1)] relative group">
            <div className="absolute inset-0 bg-red-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-500 relative z-10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
          </div>

          <h2 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none mb-8">
            Critical <br />
            <span className="text-zinc-600 italic">Interruption.</span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 mb-16 max-w-lg mx-auto leading-relaxed font-light">
            Our core systems encountered a significant failure.
            We are working to restore service as quickly as possible.
          </p>

          <button
            onClick={() => reset()}
            className="group relative inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full text-sm font-bold tracking-[0.1em] uppercase transition-all duration-700 hover:scale-105 active:scale-95"
          >
            Restart Experience
          </button>

          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-6">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Diagnostic Information</span>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Signal: Disconnected
              </div>
              {error.digest && (
                <div className="px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Trace ID: {error.digest}
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
