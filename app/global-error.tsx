'use client'

import { useEffect } from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset?: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global Error:', error)
    }, [error])

    const handleReset = () => {
        if (reset && typeof reset === 'function') {
            reset()
        } else {
            // Fallback to page reload if reset is not available
            window.location.reload()
        }
    }

    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                    <p className="mb-4 text-red-500">{error?.message || 'An unknown error occurred'}</p>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    )
}
