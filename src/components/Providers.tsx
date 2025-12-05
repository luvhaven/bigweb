'use client'

import { Toaster } from 'sonner'
import { AuthProvider } from '@/hooks/useAuth'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
          className: 'toast',
        }}
        richColors
      />
    </AuthProvider>
  )
}
