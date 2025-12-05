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
        <div className="flex h-full bg-slate-50 font-sans overflow-hidden text-slate-900 selection:bg-teal-500/30">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                        <Activity className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-800">HealthTrack</span>
                </div>

                <div className="px-6 mb-8">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=health" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Alex Morgan</p>
                            <p className="text-xs text-slate-500">Premium Member</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem icon={Activity} label="Overview" active={activeView === 'Overview'} onClick={() => setActiveView('Overview')} />
                    <NavItem icon={Calendar} label="Appointments" active={activeView === 'Appointments'} onClick={() => setActiveView('Appointments')} />
                    <NavItem icon={User} label="My Profile" active={activeView === 'My Profile'} onClick={() => setActiveView('My Profile')} />
                    <NavItem icon={Settings} label="Settings" active={activeView === 'Settings'} onClick={() => setActiveView('Settings')} />
                </nav>

                <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm">Health Score</span>
                    </div>
                    <div className="flex items-end gap-2 mb-1">
                        <span className="text-3xl font-bold">92</span>
                        <span className="text-sm text-teal-100 mb-1">/ 100</span>
                    </div>
                    <p className="text-xs text-teal-100">Top 5% of your age group</p>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
                {/* Header */}
                <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 z-10">
                    <h1 className="text-xl font-bold text-slate-800">{activeView}</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-bold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20">
                            Generate Report
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <motion.div
                        key={activeView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeView === 'Overview' && <OverviewView heartRate={heartRate} />}
                        {activeView === 'Appointments' && <AppointmentsView />}
                        {activeView === 'My Profile' && <ProfileView />}
                        {activeView === 'Settings' && <SettingsView />}
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

// View Components
const OverviewView = ({ heartRate }: { heartRate: number }) => (
    <>
        {/* Vitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {VITALS.map((vital) => (
                <div key={vital.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${vital.bg} ${vital.color}`}>
                            <vital.icon className="w-6 h-6" />
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${vital.status === 'Normal' || vital.status === 'Optimal' || vital.status === 'Excellent'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                            }`}>
                            {vital.status}
                        </span>
                    </div>
                    <div className="flex items-end gap-2 mb-1">
                        <span className="text-3xl font-bold text-slate-800">
                            {vital.id === 'heart' ? heartRate : vital.value}
                        </span>
                        <span className="text-sm text-slate-500 mb-1.5 font-medium">{vital.unit}</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{vital.label}</p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-800">Heart Rate History</h2>
                    <select className="bg-slate-50 border-none text-sm font-medium text-slate-600 rounded-lg px-3 py-1.5 focus:ring-0">
                        <option>Last 24 Hours</option>
                        <option>Last Week</option>
                    </select>
                </div>

                {/* Simulated Graph */}
                <div className="h-64 w-full relative">
                    <div className="absolute inset-0 grid grid-rows-4">
                        {[100, 80, 60, 40].map((val) => (
                            <div key={val} className="border-t border-slate-100 relative">
                                <span className="absolute -top-3 left-0 text-xs text-slate-400">{val}</span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 left-8 pt-4">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M0,150 C50,140 100,160 150,100 C200,80 250,120 300,110 C350,100 400,140 450,130 C500,120 550,90 600,100 C650,110 700,80 750,90 C800,100 850,120 900,110"
                                fill="url(#heartGradient)"
                                stroke="#F43F5E"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Recent Alerts</h2>
                <div className="space-y-4">
                    {ALERTS.map((alert) => (
                        <div key={alert.id} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${alert.type === 'warning' ? 'bg-rose-100 text-rose-600' :
                                alert.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                    'bg-blue-100 text-blue-600'
                                }`}>
                                {alert.type === 'warning' ? <AlertCircle className="w-5 h-5" /> :
                                    alert.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                                        <Bell className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-800 leading-snug mb-1">{alert.message}</p>
                                <p className="text-xs text-slate-500">{alert.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    View All History
                </button>
            </div>
        </div>
    </>
)

const AppointmentsView = () => (
    <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Upcoming Appointments</h2>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-bold hover:bg-teal-600 transition-colors">
                + Book Appointment
            </button>
        </div>
        <div className="space-y-4">
            {[
                { id: 1, doctor: 'Dr. Anika Sharma', specialty: 'Cardiologist', date: 'Dec 15, 2024', time: '10:00 AM', type: 'Check-up' },
                { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Physician', date: 'Dec 20, 2024', time: '2:30 PM', type: 'Follow-up' },
                { id: 3, doctor: 'Dr. Emily Brown', specialty: 'Nutritionist', date: 'Dec 28, 2024', time: '11:00 AM', type: 'Consultation' },
            ].map((apt) => (
                <div key={apt.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                                {apt.doctor.split(' ')[1][0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{apt.doctor}</h3>
                                <p className="text-sm text-slate-500">{apt.specialty}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-900">{apt.date}</p>
                            <p className="text-sm text-slate-500">{apt.time}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold">{apt.type}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const ProfileView = () => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=health" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Alex Morgan</h2>
                    <p className="text-slate-500">Premium Member since 2023</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                    <input type="email" defaultValue="alex.morgan@email.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                    <input type="number" defaultValue="32" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Blood Type</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>O+</option>
                    </select>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
                <button className="px-6 py-3 bg-teal-500 text-white rounded-lg font-bold hover:bg-teal-600 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    </div>
)

const SettingsView = () => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Preferences</h2>
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                    <div>
                        <p className="font-bold text-slate-900">Email Notifications</p>
                        <p className="text-sm text-slate-500">Receive health updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-teal-500 focus:ring-teal-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                    <div>
                        <p className="font-bold text-slate-900">Push Notifications</p>
                        <p className="text-sm text-slate-500">Get alerts for important health events</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-teal-500 focus:ring-teal-500" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                    <div>
                        <p className="font-bold text-slate-900">Data Sharing</p>
                        <p className="text-sm text-slate-500">Share health data with healthcare providers</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-teal-500 focus:ring-teal-500" />
                </div>
            </div>
        </div>
    </div>
)

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
        <Icon className="w-5 h-5" />
        {label}
    </button>
)
