import Link from 'next/link'

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
            <h1 className="text-4xl font-bold mb-4 text-red-500">Access Denied</h1>
            <p className="text-gray-400 mb-8 max-w-md text-center">
                You do not have the required permissions to view this page.
                Please contact your system administrator if you believe this is an error.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/admin/login"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                    Back to Login
                </Link>
                <Link
                    href="/"
                    className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
