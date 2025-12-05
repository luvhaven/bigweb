'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutGrid,
    Folder,
    Bell,
    Calendar,
    Settings,
    Search,
    MoreHorizontal,
    Video,
    FileText,
    MessageSquare,
    ThumbsUp,
    ChevronDown,
    ChevronRight,
    Users,
    TrendingUp,
    CheckCircle2,
    Clock,
    AlertCircle,
    User,
    Mail,
    Lock,
    Globe
} from 'lucide-react'

// TechCorp Logo matching the mockup
const TechCorpLogo = () => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            TC
        </div>
        <span className="font-semibold text-lg text-white">TechCorp</span>
    </div>
)

export default function TechCorpDemo() {
    const [activeView, setActiveView] = useState('Dashboard')

    return (
        <div className="flex h-full bg-[#0a0e1a] text-slate-300 font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 bg-[#0f1419] border-r border-slate-800/50 flex flex-col shrink-0">
                <div className="p-5">
                    <TechCorpLogo />
                </div>

                <div className="px-4 mb-2">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Doorderdoe</p>
                </div>

                <nav className="flex-1 px-3 space-y-0.5">
                    <SidebarItem
                        icon={LayoutGrid}
                        label="Dashboard"
                        active={activeView === 'Dashboard'}
                        onClick={() => setActiveView('Dashboard')}
                    />
                    <SidebarItem
                        icon={Folder}
                        label="Projects"
                        active={activeView === 'Projects'}
                        onClick={() => setActiveView('Projects')}
                    />
                    <SidebarItem
                        icon={Bell}
                        label="Notifications"
                        active={activeView === 'Notifications'}
                        onClick={() => setActiveView('Notifications')}
                    />
                    <SidebarItem
                        icon={Calendar}
                        label="Events"
                        active={activeView === 'Events'}
                        onClick={() => setActiveView('Events')}
                    />

                    <div className="mt-6 mb-2 px-2">
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Priorities</p>
                    </div>
                    <SidebarItem icon={LayoutGrid} label="Categorize" hasSubmenu />
                    <SidebarItem icon={LayoutGrid} label="Status" hasSubmenu />
                    <SidebarItem icon={Folder} label="Project" />
                    <SidebarItem icon={Bell} label="Notifications" />
                    <SidebarItem
                        icon={Settings}
                        label="Settings"
                        active={activeView === 'Settings'}
                        onClick={() => setActiveView('Settings')}
                    />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0e1a]">
                {/* Header */}
                <header className="h-14 border-b border-slate-800/50 flex items-center justify-between px-6 shrink-0 bg-[#0f1419]">
                    <div className="flex items-center gap-6">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-[#1a1f2e] border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                            />
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <button className="text-slate-400 hover:text-white transition-colors">Overview</button>
                            <button className="text-white font-medium border-b-2 border-blue-500 pb-0.5">Dashboard</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 rounded-lg p-2 transition-colors">
                            <img src="https://i.pravatar.cc/150?u=admin" alt="User" className="w-8 h-8 rounded-full" />
                            <div className="text-left">
                                <p className="text-sm font-medium text-white">Adain Simfmm</p>
                                <p className="text-xs text-slate-500">Moderator</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeView}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeView === 'Dashboard' && <DashboardView />}
                            {activeView === 'Projects' && <ProjectsView />}
                            {activeView === 'Notifications' && <NotificationsView />}
                            {activeView === 'Events' && <EventsView />}
                            {activeView === 'Settings' && <SettingsView />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

// Dashboard View
const DashboardView = () => (
    <div className="grid grid-cols-12 gap-6">
        {/* Team Activity Feed */}
        <div className="col-span-12 lg:col-span-5 bg-[#0f1419] rounded-xl border border-slate-800/50 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Team Activity Feed</h2>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        Real-time
                    </span>
                    <button className="p-1 hover:bg-slate-800 rounded">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>
            <p className="text-xs text-slate-500 mb-4">Real-time updates to connect with teammates.</p>

            <div className="space-y-4">
                <ActivityItem
                    name="Adain Simfmm"
                    time="7 days ago"
                    message="#techCorp 0.1-narration changes in the Instructopm: Team Activity codinge teams!"
                    likes={184}
                    comments={6}
                />
                <ActivityItem
                    name="Rosha Projarit"
                    time="1 days ago"
                    message="Uncover rewards and merlist team commentaries who iluminate team their design"
                    likes={128}
                    comments={0}
                />
            </div>
            <button className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1 transition-colors">
                Show more <ChevronRight className="w-4 h-4" />
            </button>
        </div>

        {/* Project Status */}
        <div className="col-span-12 lg:col-span-7 bg-[#0f1419] rounded-xl border border-slate-800/50 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Project Status</h2>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Kanban
                    </span>
                    <button className="p-1 hover:bg-slate-800 rounded">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <KanbanColumn title="Complete">
                    <KanbanCard title="Project Examiner Implict" users={1} color="teal" />
                    <KanbanCard title="Project Product Information" users={1} color="teal" />
                </KanbanColumn>
                <KanbanColumn title="Runtod">
                    <KanbanCard title="Project analysis Indecation" users={2} color="teal" />
                    <KanbanCard title="Project advise baals Crs" users={2} color="teal" />
                </KanbanColumn>
                <KanbanColumn title="Building">
                    <KanbanCard title="Project amendment toalus" users={1} color="orange" />
                    <KanbanCard title="Project team information" users={1} color="orange" />
                </KanbanColumn>
            </div>
        </div>

        {/* Key Metrics */}
        <div className="col-span-12 lg:col-span-6 bg-[#0f1419] rounded-xl border border-slate-800/50 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Key Metrics</h2>
                <button className="p-1 hover:bg-slate-800 rounded">
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
                {[
                    { height: 45, color: 'bg-purple-500' },
                    { height: 55, color: 'bg-blue-500' },
                    { height: 35, color: 'bg-purple-500' },
                    { height: 65, color: 'bg-blue-500' },
                    { height: 50, color: 'bg-purple-500' },
                    { height: 75, color: 'bg-blue-500' },
                    { height: 45, color: 'bg-purple-500' },
                    { height: 85, color: 'bg-blue-500' },
                    { height: 55, color: 'bg-purple-500' },
                    { height: 70, color: 'bg-blue-500' },
                    { height: 60, color: 'bg-purple-500' },
                    { height: 90, color: 'bg-blue-500' },
                ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${bar.height}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className={`${bar.color} rounded-t`}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-500">
                <span>User</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Des</span>
            </div>
        </div>

        {/* Project Velocity */}
        <div className="col-span-12 lg:col-span-6 bg-[#0f1419] rounded-xl border border-slate-800/50 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Project Velocity</h2>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">21~150</span>
                    <button className="p-1 hover:bg-slate-800 rounded">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>
            <div className="h-48 flex items-end justify-between gap-1.5">
                {[40, 35, 30, 45, 85, 50, 40, 35, 55, 75, 65, 90].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full gap-1">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height * 0.6}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className="bg-blue-500 rounded-sm"
                        />
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height * 0.4}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className="bg-purple-500 rounded-sm"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
            </div>
        </div>

        {/* Collaboration Tools */}
        <div className="col-span-12 lg:col-span-6 bg-[#0f1419] rounded-xl border border-slate-800/50 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Collaboration Tools</h2>
                <button className="p-1 hover:bg-slate-800 rounded">
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
                <CollabTool icon={Video} label="Video Call" time="57 minute ago" />
                <CollabTool icon={FileText} label="File Sharing" time="11 minute ago" />
                <CollabTool icon={MessageSquare} label="Chat" time="12 minute ago" />
            </div>
            <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Video className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <Users className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors">
                    <MessageSquare className="w-5 h-5 text-white" />
                </button>
                <input
                    type="text"
                    placeholder="Type in anything..."
                    className="flex-1 bg-[#1a1f2e] border border-slate-800 rounded-full px-4 py-2.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
                <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>

        {/* Performance Overview */}
        <div className="col-span-12 lg:col-span-6 bg-[#0f1419] rounded-xl border border-slate-800/50 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Performance Overview</h2>
                <button className="p-1 hover:bg-slate-800 rounded">
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
            </div>
            <div className="h-48 relative">
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0,100 Q50,80 100,90 T200,70 T300,85 T400,75"
                        fill="url(#gradient1)"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    />
                    <motion.path
                        d="M0,80 Q50,60 100,70 T200,50 T300,65 T400,55"
                        fill="url(#gradient2)"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.2 }}
                    />
                    <motion.path
                        d="M0,120 Q50,100 100,110 T200,90 T300,105 T400,95"
                        fill="url(#gradient3)"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.4 }}
                    />
                </svg>
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
            </div>
        </div>
    </div>
)

// Projects View
const ProjectsView = () => (
    <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">All Projects</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                <Folder className="w-4 h-4" />
                New Project
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
                { title: 'Website Redesign', status: 'In Progress', progress: 75, team: 4, color: 'blue' },
                { title: 'Mobile App Development', status: 'In Progress', progress: 45, team: 6, color: 'purple' },
                { title: 'API Integration', status: 'Completed', progress: 100, team: 3, color: 'green' },
                { title: 'Database Migration', status: 'Planning', progress: 15, team: 5, color: 'orange' },
                { title: 'Security Audit', status: 'In Progress', progress: 60, team: 2, color: 'red' },
                { title: 'Performance Optimization', status: 'Planning', progress: 10, team: 3, color: 'cyan' },
            ].map((project, i) => (
                <div key={i} className="bg-[#0f1419] rounded-xl border border-slate-800/50 p-5 hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-white">{project.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${project.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                            project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-orange-500/10 text-orange-400'
                            }`}>
                            {project.status}
                        </span>
                    </div>
                    <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-${project.color}-500 rounded-full`} style={{ width: `${project.progress}%` }} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {Array.from({ length: project.team }).map((_, j) => (
                                <img
                                    key={j}
                                    src={`https://i.pravatar.cc/150?u=team${i}${j}`}
                                    alt="Team"
                                    className="w-6 h-6 rounded-full border-2 border-[#0f1419]"
                                />
                            ))}
                        </div>
                        <button className="p-1 hover:bg-slate-800 rounded">
                            <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

// Notifications View
const NotificationsView = () => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>
        <div className="space-y-3">
            {[
                { type: 'success', icon: CheckCircle2, title: 'Project completed', message: 'Website Redesign project has been marked as complete', time: '2 hours ago' },
                { type: 'info', icon: MessageSquare, title: 'New comment', message: 'Mei commented on your task in Mobile App Development', time: '4 hours ago' },
                { type: 'warning', icon: Clock, title: 'Deadline approaching', message: 'API Integration deadline is in 2 days', time: '1 day ago' },
                { type: 'error', icon: AlertCircle, title: 'Build failed', message: 'Latest deployment failed. Check logs for details', time: '1 day ago' },
                { type: 'info', icon: Users, title: 'Team member added', message: 'Nia Mbeki joined Database Migration project', time: '2 days ago' },
            ].map((notif, i) => (
                <div key={i} className="bg-[#0f1419] rounded-xl border border-slate-800/50 p-4 hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notif.type === 'success' ? 'bg-green-500/10 text-green-400' :
                            notif.type === 'warning' ? 'bg-orange-500/10 text-orange-400' :
                                notif.type === 'error' ? 'bg-red-500/10 text-red-400' :
                                    'bg-blue-500/10 text-blue-400'
                            }`}>
                            <notif.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{notif.title}</h3>
                            <p className="text-sm text-slate-400 mb-2">{notif.message}</p>
                            <span className="text-xs text-slate-500">{notif.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

// Events View
const EventsView = () => (
    <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Add Event
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { title: 'Team Standup', date: 'Dec 3, 2024', time: '9:00 AM', attendees: 8, type: 'Meeting' },
                { title: 'Product Demo', date: 'Dec 5, 2024', time: '2:00 PM', attendees: 15, type: 'Presentation' },
                { title: 'Sprint Planning', date: 'Dec 8, 2024', time: '10:00 AM', attendees: 12, type: 'Planning' },
                { title: 'Code Review Session', date: 'Dec 10, 2024', time: '3:00 PM', attendees: 6, type: 'Review' },
            ].map((event, i) => (
                <div key={i} className="bg-[#0f1419] rounded-xl border border-slate-800/50 p-5 hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="font-semibold text-white mb-1">{event.title}</h3>
                            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400">
                                {event.type}
                            </span>
                        </div>
                        <button className="p-1 hover:bg-slate-800 rounded">
                            <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{event.attendees} attendees</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

// Settings View
const SettingsView = () => (
    <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
        <div className="space-y-6">
            <div className="bg-[#0f1419] rounded-xl border border-slate-800/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Profile Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            defaultValue="Adain Simfmm"
                            className="w-full bg-[#1a1f2e] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                        <input
                            type="email"
                            defaultValue="adain@techcorp.com"
                            className="w-full bg-[#1a1f2e] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Role</label>
                        <select className="w-full bg-[#1a1f2e] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50">
                            <option>Moderator</option>
                            <option>Admin</option>
                            <option>User</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-[#0f1419] rounded-xl border border-slate-800/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded-lg">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-300">Email Notifications</span>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-700 text-blue-500 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded-lg">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-300">Push Notifications</span>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-700 text-blue-500 focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded-lg">
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-300">Public Profile</span>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-700 text-blue-500 focus:ring-blue-500" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                    Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    </div>
)

// Helper Components
const SidebarItem = ({ icon: Icon, label, active, onClick, hasSubmenu }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${active
            ? 'bg-blue-500/10 text-blue-400'
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon className="w-4 h-4" />
            <span>{label}</span>
        </div>
        {hasSubmenu && <ChevronDown className="w-3 h-3" />}
    </button>
)

const ActivityItem = ({ name, time, message, likes, comments }: any) => (
    <div className="flex gap-3">
        <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white">{name}</span>
                <span className="text-xs text-slate-500">{time}</span>
            </div>
            <p className="text-sm text-slate-400 mb-2">{message}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-3 h-3" />
                    <span>{comments}</span>
                </button>
                <button className="hover:text-blue-400 transition-colors">Reply</button>
            </div>
        </div>
    </div>
)

const KanbanColumn = ({ title, children }: any) => (
    <div>
        <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">{title}</h3>
            <button className="p-1 hover:bg-slate-800 rounded">
                <MoreHorizontal className="w-3 h-3 text-slate-400" />
            </button>
        </div>
        <div className="space-y-2">{children}</div>
    </div>
)

const KanbanCard = ({ title, users, color }: any) => (
    <div className={`p-3 rounded-lg border ${color === 'teal' ? 'bg-teal-500/10 border-teal-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}>
        <p className="text-xs text-white mb-2">{title}</p>
        <div className="flex -space-x-2">
            {Array.from({ length: users }).map((_, i) => (
                <img
                    key={i}
                    src={`https://i.pravatar.cc/150?u=user${i}`}
                    alt="User"
                    className="w-5 h-5 rounded-full border-2 border-[#0f1419]"
                />
            ))}
        </div>
    </div>
)

const CollabTool = ({ icon: Icon, label, time }: any) => (
    <div className="bg-[#1a1f2e] rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#1f2533] transition-colors cursor-pointer">
        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div className="text-center">
            <p className="text-xs font-medium text-white">{label}</p>
            <p className="text-[10px] text-slate-500">{time}</p>
        </div>
    </div>
)
