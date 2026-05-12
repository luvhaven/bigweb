'use client'

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/hooks/useAuth'
import { LenisProvider } from '@/components/providers/LenisProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LenisProvider>
        {children}
        <Toaster />
      </LenisProvider>
    </AuthProvider>
  )
}
