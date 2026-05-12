'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Sparkles,
    Image as ImageIcon,
    Type,
    Video,
    Mic,
    Send,
    Download,
    Share2,
    MoreHorizontal,
    History,
    Settings,
    Wand2,
    Layers
} from 'lucide-react'

const GENERATED_IMAGES = [
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80'
]

export default function AIContentStudioDemo() {
    const [prompt, setPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [activeMode, setActiveMode] = useState('image')

    const handleGenerate = () => {
        if (!prompt) return
        setIsGenerating(true)
        setTimeout(() => setIsGenerating(false), 3000)
    }

    return (
        <div className="flex h-full bg-[#0A0A0A] font-sans overflow-hidden text-white selection:bg-purple-500/30">
            {/* Sidebar */}
            <div className="w-20 bg-[#111] border-r border-white/5 flex flex-col items-center py-6 shrink-0 z-20">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-purple-500/20">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>

                <nav className="flex-1 flex flex-col gap-4 w-full px-2">
                    <NavIcon icon={ImageIcon} active={activeMode === 'image'} onClick={() => setActiveMode('image')} />
                    <NavIcon icon={Type} active={activeMode === 'text'} onClick={() => setActiveMode('text')} />
                    <NavIcon icon={Video} active={activeMode === 'video'} onClick={() => setActiveMode('video')} />
                    <NavIcon icon={Mic} active={activeMode === 'audio'} onClick={() => setActiveMode('audio')} />
                </nav>

                <div className="flex flex-col gap-4 w-full px-2">
                    <NavIcon icon={History} />
                    <NavIcon icon={Settings} />
                    <div className="w-10 h-10 rounded-full bg-white/10 mx-auto mt-2 overflow-hidden border border-white/20">
                        <img src="https://i.pravatar.cc/150?u=ai" alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Header */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-10 bg-[#0A0A0A]/80 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            AI Content Studio
                        </h1>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/60 border border-white/5">BETA</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-white/40">Credits: 450/500</span>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium transition-colors border border-white/5">
                            Upgrade Plan
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 z-10">
                    {activeMode === 'image' && (
                        <div className="max-w-5xl mx-auto h-full flex flex-col">
                            {/* Generation Display */}
                            <div className="flex-1 grid grid-cols-2 gap-4 mb-8 min-h-[400px]">
                                {isGenerating ? (
                                    <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center animate-pulse">
                                        <Wand2 className="w-12 h-12 text-purple-500 mb-4 animate-spin-slow" />
                                        <p className="text-white/60 font-medium">Dreaming up your masterpiece...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="col-span-2 md:col-span-1 row-span-2 rounded-2xl overflow-hidden border border-white/10 relative group">
                                            <img src={GENERATED_IMAGES[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"><Download className="w-5 h-5" /></button>
                                                <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"><Share2 className="w-5 h-5" /></button>
                                            </div>
                                        </div>
                                        <div className="rounded-2xl overflow-hidden border border-white/10 relative group">
                                            <img src={GENERATED_IMAGES[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        </div>
                                        <div className="rounded-2xl overflow-hidden border border-white/10 relative group">
                                            <img src={GENERATED_IMAGES[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Prompt Input */}
                            <div className="bg-[#151515] border border-white/10 rounded-2xl p-2 flex flex-col gap-2 shadow-2xl shadow-black/50">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Describe what you want to create..."
                                    className="w-full bg-transparent border-none text-white placeholder:text-white/30 resize-none h-20 p-3 focus:ring-0 text-sm"
                                />
                                <div className="flex items-center justify-between px-2 pb-1">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
                                            <Layers className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                        <div className="h-4 w-px bg-white/10 mx-1" />
                                        <select className="bg-transparent text-xs text-white/60 border-none focus:ring-0 cursor-pointer hover:text-white">
                                            <option>1024 x 1024</option>
                                            <option>16:9</option>
                                            <option>9:16</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={!prompt && !isGenerating}
                                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isGenerating ? 'Generating...' : (
                                            <>
                                                Generate <Sparkles className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

const NavIcon = ({ icon: Icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all mx-auto ${active
                ? 'bg-white text-black shadow-lg shadow-white/10'
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
    >
        <Icon className="w-5 h-5" />
    </button>
)
