'use client'

import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center">
      <h1 className="text-9xl font-black mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">Neural Link Terminated</h2>
      <p className="text-zinc-500 max-w-md mb-12">The requested coordinate does not exist within our current revenue systems architecture.</p>
      <Link href="/">
        <Button size="lg" className="rounded-2xl">
          <Home className="mr-2 w-5 h-5" />
          Back to Terminal
        </Button>
      </Link>
    </div>
  )
}
