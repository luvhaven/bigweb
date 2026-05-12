'use client'

import dynamic from 'next/dynamic'

const TechStack3D = dynamic(() => import('./TechStack3D'), {
    ssr: false,
    loading: () => <div className="h-[80vh] w-full bg-black flex items-center justify-center text-accent uppercase font-black tracking-widest animate-pulse">Initializing 3D Environment...</div>
})

export default function ClientTechStack3D() {
    return <TechStack3D />
}
