'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Activity,
    Heart,
    Thermometer,
    Moon,
    Wind,
    User,
    Calendar,
    Bell,
    Settings,
    Users,
    AlertCircle,
    CheckCircle2,
    TrendingUp
} from 'lucide-react'

const VITALS = [
    { id: 'heart', label: 'Heart Rate', value: 72, unit: 'bpm', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10', status: 'Normal' },
    { id: 'temp', label: 'Body Temp', value: 36.6, unit: '°C', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-500/10', status: 'Normal' },
    { id: 'sleep', label: 'Sleep', value: 7.5, unit: 'hrs', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-500/10', status: 'Optimal' },
    { id: 'oxygen', label: 'SpO2', value: 98, unit: '%', icon: Wind, color: 'text-sky-500', bg: 'bg-sky-500/10', status: 'Excellent' },
]

const ALERTS = [
    { id: 1, type: 'warning', message: 'Irregular heart rhythm detected during sleep', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Daily step goal achieved (10,000 steps)', time: '5 hours ago' },
    { id: 3, type: 'info', message: 'Weekly health report is ready', time: '1 day ago' },
]

export default function HealthTrackDemo() {
    const [activeView, setActiveView] = useState('Overview')
    const [heartRate, setHeartRate] = useState(72)

    // Simulate live heart rate
    useEffect(() => {
        const interval = setInterval(() => {
            setHeartRate(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center justify-center py-10 bg-transparent">
            {/* Phone Frame */}
            <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] shadow-2xl ring-8 ring-white/5 border-[8px] border-black overflow-hidden backdrop-blur-xl">
                {/* Status Bar Mock */}
                <div className="absolute top-0 inset-x-0 h-14 bg-white/90 backdrop-blur-md z-50 flex items-center justify-between px-6 pt-2">
                    <span className="text-xs font-bold text-slate-900">9:41</span>
                    <div className="flex gap-1.5">
                        <div className="w-4 h-2.5 bg-slate-900 rounded-[1px]" />
                        <div className="w-0.5 h-2.5 bg-slate-900/30 rounded-[1px]" />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="h-full bg-slate-50 flex flex-col pt-14 pb-20 overflow-hidden text-slate-900 font-sans">
                    {/* View Header */}
                    <div className="px-6 py-4 flex items-center justify-between shrink-0">
                        <div>
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Welcome back</h2>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Alex M.</h1>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://i.pravatar.cc/150?u=health" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar">
                        <motion.div
                            key={activeView}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeView === 'Overview' && <OverviewView heartRate={heartRate} />}
                            {activeView === 'Schedule' && <AppointmentsView />}
                            {activeView === 'Community' && <CommunityView />}
                            {activeView === 'Settings' && <SettingsView />}
                        </motion.div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-0 inset-x-0 h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-40 pb-5">
                        <NavItem icon={Activity} label="Overview" active={activeView === 'Overview'} onClick={() => setActiveView('Overview')} />
                        <NavItem icon={Calendar} label="Schedule" active={activeView === 'Schedule'} onClick={() => setActiveView('Schedule')} />
                        <NavItem icon={Users} label="Community" active={activeView === 'Community'} onClick={() => setActiveView('Community')} />
                        <NavItem icon={Settings} label="Settings" active={activeView === 'Settings'} onClick={() => setActiveView('Settings')} />
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-300 rounded-full z-50"></div>
                </div>
            </div>
        </div>

    )
}

// View Components
const OverviewView = ({ heartRate }: { heartRate: number }) => (
    <div className="space-y-6">
        {/* Heart Rate Card */}
        <div className="p-5 rounded-[2rem] bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 opacity-90">
                    <Heart className="w-5 h-5 fill-white/50" />
                    <span className="text-sm font-bold">Heart Rate</span>
                </div>
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-black tracking-tighter">{heartRate}</span>
                    <span className="text-lg font-medium opacity-80 mb-2">bpm</span>
                </div>
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ width: ["40%", "60%", "45%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-white/80"
                    />
                </div>
            </div>
            <Activity className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10" />
        </div>

        {/* Vitals Grid (Compact) */}
        <div className="grid grid-cols-2 gap-4">
            {VITALS.filter(v => v.id !== 'heart').map((vital) => (
                <div key={vital.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-32 transition-transform hover:scale-[1.02]">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${vital.bg} ${vital.color}`}>
                        <vital.icon className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="text-2xl font-bold text-slate-800">{vital.value}</span>
                        <span className="text-xs text-slate-400 ml-1">{vital.unit}</span>
                        <p className="text-xs font-bold text-slate-500 mt-1">{vital.label}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const AppointmentsView = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Today</h2>
            <button className="text-rose-500 text-xs font-bold uppercase tracking-wider">See All</button>
        </div>
        {[
            { id: 1, doctor: 'Dr. Sharma', specialty: 'Cardio', time: '10:00 AM', color: 'bg-teal-500' },
            { id: 2, doctor: 'Dr. Chen', specialty: 'GP', time: '2:30 PM', color: 'bg-blue-500' },
            { id: 3, doctor: 'Dr. Rivera', specialty: 'Physio', time: '4:15 PM', color: 'bg-indigo-500' },
        ].map((apt) => (
            <div key={apt.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-black text-slate-400">
                    {apt.time.split(' ')[0]}
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{apt.doctor}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{apt.specialty}</p>
                </div>
            </div>
        ))}
        <button className="w-full py-4 rounded-2xl bg-black text-white font-bold text-sm shadow-xl active:scale-95 transition-transform">
            Book New Visit
        </button>
    </div>
)

const CommunityView = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Challenges</h2>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[2rem] text-white overflow-hidden relative">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-lg mb-1">Early Birds</h3>
                        <p className="text-white/70 text-xs">Full week streak!</p>
                    </div>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium">Active</div>
                </div>
                <div className="flex -space-x-3 mb-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-indigo-500" />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-[10px] flex items-center justify-center border-2 border-indigo-500">+42</div>
                </div>
                <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-white w-3/4 h-full" />
                </div>
            </div>
            <TrendingUp className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/10 rotate-12" />
        </div>

        <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Leaderboard</h3>
            {[
                { name: 'Sarah J.', score: '98%', rank: 1 },
                { name: 'Mike T.', score: '95%', rank: 2 },
                { name: 'You', score: '92%', rank: 3 },
            ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${user.rank === 1 ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-500'}`}>#{user.rank}</div>
                        <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">{user.score}</span>
                </div>
            ))}
        </div>
    </div>
)

const SettingsView = () => (
    <div className="space-y-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 mb-4 overflow-hidden relative">
                <img src="https://i.pravatar.cc/150?u=a" alt="User" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-black text-slate-900">Alex Morgan</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">Premium Member</p>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-400 uppercase font-bold text-left mb-1">Height</div>
                    <div className="text-sm font-black text-slate-900 text-left">182 cm</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                    <div className="text-xs text-slate-400 uppercase font-bold text-left mb-1">Weight</div>
                    <div className="text-sm font-black text-slate-900 text-left">75 kg</div>
                </div>
            </div>
        </div>

        <div className="space-y-3">
            {['Notifications', 'Privacy', 'Devices', 'Support'].map(item => (
                <button key={item} className="w-full bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    {item}
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">→</div>
                </button>
            ))}
        </div>
    </div>
)

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-1 p-2 w-14 group relative">
        {active && <motion.div layoutId="nav-bg" className="absolute -top-3 w-8 h-1 bg-rose-500 rounded-full" />}
        <div className={`transition-all duration-300 ${active ? 'text-rose-600 -translate-y-1' : 'text-slate-300 group-hover:text-slate-400'}`}>
            <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
        </div>
        <span className={`text-[9px] font-bold tracking-tight ${active ? 'text-rose-600' : 'text-transparent group-hover:text-slate-300'} transition-colors`}>
            {label}
        </span>
    </button>
)
