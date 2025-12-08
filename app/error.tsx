'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Segment Error:', error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
            <p className="mb-6 text-muted-foreground max-w-md">{error.message || "An unexpected error occurred."}</p>
            <div className="flex gap-4">
                <Button
                    onClick={() => reset()}
                    variant="default"
                >
                    Try again
                </Button>
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                >
                    Reload Page
                </Button>
            </div>
        </div>
    )
}
