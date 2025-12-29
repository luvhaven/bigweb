import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
    try {
        const { path } = await request.json()

        if (path) {
            revalidatePath(path)
            console.log(`Revalidated path: ${path}`)
            return NextResponse.json({ revalidated: true, now: Date.now() })
        }

        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'Missing path to revalidate',
        }, { status: 400 })
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
    }
}
