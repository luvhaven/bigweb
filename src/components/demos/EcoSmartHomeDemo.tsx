'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Home,
    Thermometer,
    Zap,
    Droplets,
    Lightbulb,
    Lock,
    Fan,
    Music,
    Sun,
    Moon,
    CloudRain,
    Power,
    Plus,
    MoreVertical,
    Wifi
} from 'lucide-react'

const ROOMS = [
    { id: 'living', name: 'Living Room', devices: 8, temp: 22, active: true },
    { id: 'kitchen', name: 'Kitchen', devices: 5, temp: 23, active: true },
    { id: 'bedroom', name: 'Master Bedroom', devices: 6, temp: 21, active: false },
    { id: 'office', name: 'Office', devices: 4, temp: 22, active: true },
]

const SCENES = [
    { id: 'morning', name: 'Morning', icon: Sun, color: 'bg-orange-500' },
    { id: 'away', name: 'Away', icon: Lock, color: 'bg-slate-500' },
    { id: 'movie', name: 'Movie Night', icon: Music, color: 'bg-purple-500' },
    { id: 'sleep', name: 'Good Night', icon: Moon, color: 'bg-indigo-500' },
]

export default function EcoSmartHomeDemo() {
    const [activeRoom, setActiveRoom] = useState('living')
    const [temperature, setTemperature] = useState(22)
    const [lights, setLights] = useState(80)

    return (
        <div className="flex h-full bg-[#F2F4F8] font-sans overflow-hidden text-slate-800 selection:bg-emerald-500/30">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                        <Home className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">EcoSmart</span>
                </div>

                <div className="px-6 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <CloudRain className="w-5 h-5" />
                                <span className="font-medium">Rainy</span>
                            </div>
                            <span className="text-2xl font-bold">18°</span>
                        </div>
                        <div className="flex items-center justify-between text-emerald-100 text-sm">
                            <span>H: 20° L: 16°</span>
                            <span>Humidity: 65%</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <div className="px-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Dashboard</div>
                    <NavItem icon={Home} label="Overview" active />
                    <NavItem icon={Zap} label="Energy" />
                    <NavItem icon={Lock} label="Security" />
                    <NavItem icon={Droplets} label="Water" />

                    <div className="px-2 mt-8 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Rooms</div>
                    {ROOMS.map(room => (
                        <button
                            key={room.id}
                            onClick={() => setActiveRoom(room.id)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeRoom === room.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <span>{room.name}</span>
                            {room.active && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        </button>
                    ))}
                    <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-emerald-600 transition-colors">
                        <Plus className="w-4 h-4" /> Add Room
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                        <img src="https://i.pravatar.cc/150?u=home" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                        <div>
                            <p className="text-sm font-bold">The Smiths</p>
                            <p className="text-xs text-slate-500">Admin Access</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Living Room</h1>
                        <p className="text-slate-500">8 devices active • 22°C</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
                            <Wifi className="w-4 h-4 text-emerald-500" />
                            Online
                        </div>
                        <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-colors shadow-sm">
                            <Power className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Scenes */}
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Scenes</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {SCENES.map((scene) => (
                            <button key={scene.id} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/30 hover:shadow-md transition-all group">
                                <div className={`w-12 h-12 rounded-xl ${scene.color} text-white flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 transition-opacity`}>
                                    <scene.icon className="w-6 h-6" />
                                </div>
                                <span className="font-medium text-slate-700">{scene.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-12 gap-8">
                    {/* Climate Control */}
                    <div className="col-span-12 lg:col-span-4">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-full flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-6 left-6 flex items-center gap-2 text-slate-500">
                                <Thermometer className="w-5 h-5" />
                                <span className="font-medium">Climate</span>
                            </div>

                            {/* Circular Slider Simulation */}
                            <div className="relative w-48 h-48 mt-8 mb-8 flex items-center justify-center">
                                <svg className="w-full h-full rotate-[135deg]" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="50" />
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="120" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-slate-800">{temperature}°</span>
                                    <span className="text-sm text-slate-400">Heating</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full px-4">
                                <button onClick={() => setTemperature(t => t - 1)} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                                    <MinusIcon />
                                </button>
                                <div className="flex-1 text-center">
                                    <span className="text-sm font-medium text-slate-500">Target: 24°</span>
                                </div>
                                <button onClick={() => setTemperature(t => t + 1)} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Devices Grid */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-2 gap-4">
                            <DeviceCard icon={Lightbulb} name="Main Lights" status={`${lights}%`} active color="text-yellow-500" bg="bg-yellow-500/10">
                                <input
                                    type="range"
                                    value={lights}
                                    onChange={(e) => setLights(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-yellow-500 mt-3"
                                />
                            </DeviceCard>
                            <DeviceCard icon={Fan} name="Air Purifier" status="Auto" active color="text-blue-500" bg="bg-blue-500/10" />
                            <DeviceCard icon={Lock} name="Smart Lock" status="Locked" active color="text-emerald-500" bg="bg-emerald-500/10" />
                            <DeviceCard icon={Music} name="Speaker" status="Playing" active color="text-purple-500" bg="bg-purple-500/10" />
                            <DeviceCard icon={VideoIcon} name="CCTV" status="Recording" active color="text-red-500" bg="bg-red-500/10" />
                            <DeviceCard icon={Wifi} name="Wi-Fi Mesh" status="Excellent" active color="text-indigo-500" bg="bg-indigo-500/10" />
                        </div>
                    </div>
                </div>

                {/* Energy Chart (Simulated) */}
                <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <h3 className="font-bold text-slate-800">Energy Usage</h3>
                        </div>
                        <select className="bg-slate-50 border-none text-sm font-medium text-slate-600 rounded-lg px-3 py-1.5 focus:ring-0">
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="h-48 flex items-end justify-between gap-2 px-2">
                        {[40, 65, 45, 80, 55, 70, 40].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden h-full">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="absolute bottom-0 left-0 right-0 bg-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity rounded-t-xl"
                                    />
                                </div>
                                <span className="text-xs font-medium text-slate-400">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

const NavItem = ({ icon: Icon, label, active }: any) => (
    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'
        }`}>
        <Icon className="w-5 h-5" />
        {label}
    </button>
)

const DeviceCard = ({ icon: Icon, name, status, active, color, bg, children }: any) => (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500/30 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className={`w-8 h-5 rounded-full p-0.5 transition-colors ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-3' : 'translate-x-0'}`} />
            </div>
        </div>
        <h4 className="font-bold text-slate-800">{name}</h4>
        <p className="text-sm text-slate-500">{status}</p>
        {children}
    </div>
)

const MinusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
)

const VideoIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
)
