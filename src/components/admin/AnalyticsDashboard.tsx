
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, Globe, Smartphone, Monitor, ArrowUp, ArrowDown, Activity } from 'lucide-react';

// Mock Data for Initial Render (Will be replaced by API data)
const MOCK_VISITS = [
    { time: '00:00', visitors: 12 }, { time: '04:00', visitors: 8 },
    { time: '08:00', visitors: 45 }, { time: '12:00', visitors: 120 },
    { time: '16:00', visitors: 160 }, { time: '20:00', visitors: 85 },
    { time: '23:59', visitors: 30 },
];

const DEVICE_DATA = [
    { name: 'Mobile', value: 400, color: '#10b981' },
    { name: 'Desktop', value: 300, color: '#3b82f6' },
    { name: 'Tablet', value: 100, color: '#f59e0b' },
];

const COUNTRY_DATA = [
    { country: 'United States', visitors: 450, code: 'US' },
    { country: 'United Kingdom', visitors: 210, code: 'GB' },
    { country: 'Germany', visitors: 180, code: 'DE' },
    { country: 'India', visitors: 150, code: 'IN' },
    { country: 'Canada', visitors: 120, code: 'CA' },
];

export default function AnalyticsDashboard() {
    const [liveVisitors, setLiveVisitors] = useState(12);
    const [timeRange, setTimeRange] = useState('today');

    // Simulate Live Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveVisitors(prev => Math.max(5, prev + Math.floor(Math.random() * 5) - 2));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Real-time Analytics</h2>
                    <p className="text-white/60">Monitor your traffic and visitor insights.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-400 font-bold">{liveVisitors} Live Visitors</span>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard icon={Users} label="Total Visitors" value="1,245" change="+12%" />
                <MetricCard icon={Activity} label="Page Views" value="3,890" change="+8%" />
                <MetricCard icon={Globe} label="Countries" value="24" change="+2" />
                <MetricCard icon={Smartphone} label="Mobile %" value="58%" change="-1%" isNegative />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-[#1a1c20] p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Traffic Overview</h3>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_VISITS}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="time" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="visitors" stroke="#10b981" fillOpacity={1} fill="url(#colorVisits)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Device Breakdown */}
                <div className="bg-[#1a1c20] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-6">Device Breakdown</h3>
                    <div className="h-[200px] mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={DEVICE_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {DEVICE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                        {DEVICE_DATA.map((device) => (
                            <div key={device.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                                    <span className="text-white/60 text-sm">{device.name}</span>
                                </div>
                                <span className="text-white font-medium">{Math.round((device.value / 800) * 100)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Countries & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Countries */}
                <div className="bg-[#1a1c20] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-6">Top Countries</h3>
                    <div className="space-y-4">
                        {COUNTRY_DATA.map((item, i) => (
                            <div key={item.country} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-white/40 font-mono w-4">{i + 1}</span>
                                    <div className="w-8 h-6 bg-white/10 rounded flex items-center justify-center text-xs font-bold">
                                        {item.code}
                                    </div>
                                    <span className="text-white font-medium">{item.country}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: `${(item.visitors / 500) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-white/60 text-sm w-12 text-right">{item.visitors}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-time Log */}
                <div className="bg-[#1a1c20] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-6">Live Activity Feed</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 text-sm">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-white/40 font-mono">Just now</span>
                                <span className="text-white">New visitor from <span className="text-emerald-400">London, UK</span></span>
                                <span className="text-white/40 ml-auto">Mobile</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, change, isNegative }: any) {
    return (
        <div className="bg-[#1a1c20] p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-white/60">
                    <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isNegative ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                    {change}
                </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-white/40 text-sm">{label}</div>
        </div>
    );
}
