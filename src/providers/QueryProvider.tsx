'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, ReactNode } from 'react'

interface QueryProviderProps {
    children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Stale time: 30 seconds for admin data
                        staleTime: 30 * 1000,
                        // Cache time: 5 minutes
                        gcTime: 5 * 60 * 1000,
                        // Retry failed requests once
                        retry: 1,
                        // Refetch on window focus for real-time feel
                        refetchOnWindowFocus: true,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    )
}
