'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu,
    Bell,
    Lock,
    Unlock,
    TrendingUp,
    TrendingDown,
    Send,
    Download,
    Bitcoin,
    Home,
    CreditCard,
    Clock,
    Settings,
    ChevronLeft,
    Search,
    Filter,
    QrCode,
    User,
    Shield,
    HelpCircle,
    LogOut,
    ArrowUpRight,
    ArrowDownLeft,
    Plus,
    ScanLine,
    Smartphone,
    Wallet,
    Eye,
    EyeOff,
    Copy,
    MapPin,
    Receipt,
    Split,
    Share2,
    CheckCircle2,
    X,
    PieChart,
    Zap,
    RefreshCw,
    MessageSquare,
    Camera,
    Image as ImageIcon,
    MoreHorizontal,
    ChevronRight,
    Globe,
    Moon,
    Smartphone as DeviceIcon,
    Fingerprint
} from 'lucide-react'

export default function FinPayDemo() {
    const [activeView, setActiveView] = useState('home')
    const [selectedCard, setSelectedCard] = useState(0)
    const [showTransactionDetail, setShowTransactionDetail] = useState<any>(null)

    // Scale logic for smaller screens
    const [scale, setScale] = useState(1)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const height = containerRef.current.clientHeight
                const width = containerRef.current.clientWidth
                // Calculate scale to fit 850px height (phone + padding)
                const scaleH = Math.min(1, (height - 40) / 800)
                const scaleW = Math.min(1, (width - 40) / 400)
                setScale(Math.min(scaleH, scaleW, 1))
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div ref={containerRef} className="flex items-center justify-center h-full bg-[#000000] overflow-hidden relative font-sans selection:bg-emerald-500/30">
            {/* Background glow effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10s]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />

            {/* Mobile Phone Frame - Scaled to fit */}
            <div
                className="relative w-[390px] h-[800px] bg-[#0a0a0a] rounded-[55px] shadow-2xl border-[6px] border-[#1a1a1a] overflow-hidden ring-1 ring-white/10 origin-center transition-transform duration-300"
                style={{ transform: `scale(${scale})` }}
            >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-black rounded-b-3xl z-50 flex justify-center items-end pb-1">
                    <div className="w-16 h-1 bg-[#1a1a1a] rounded-full" />
                </div>

                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-8 text-white text-[15px] z-40 pt-2">
                    <span className="font-semibold tracking-wide">9:41</span>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1 items-end h-3">
                            <div className="w-[3px] h-1.5 bg-white rounded-full" />
                            <div className="w-[3px] h-2.5 bg-white rounded-full" />
                            <div className="w-[3px] h-3 bg-white rounded-full" />
                            <div className="w-[3px] h-2 bg-white/30 rounded-full" />
                        </div>
                        <div className="w-6 h-3 border border-white/30 rounded-[4px] relative">
                            <div className="absolute inset-0.5 bg-white rounded-[1px]" style={{ width: '80%' }} />
                        </div>
                    </div>
                </div>

                {/* App Content */}
                <div className="h-full pt-14 bg-gradient-to-b from-[#0f1115] to-[#050505] overflow-hidden flex flex-col relative">
                    <AnimatePresence mode="wait">
                        {activeView === 'home' && <HomeView key="home" setActiveView={setActiveView} onTransactionClick={setShowTransactionDetail} />}
                        {activeView === 'cards' && <CardsView key="cards" setActiveView={setActiveView} />}
                        {activeView === 'transactions' && <TransactionsView key="transactions" setActiveView={setActiveView} onTransactionClick={setShowTransactionDetail} />}
                        {activeView === 'send' && <SendMoneyView key="send" setActiveView={setActiveView} />}
                        {activeView === 'settings' && <SettingsView key="settings" setActiveView={setActiveView} />}
                        {activeView === 'analytics' && <AnalyticsView key="analytics" setActiveView={setActiveView} />}
                        {activeView === 'exchange' && <ExchangeView key="exchange" setActiveView={setActiveView} />}
                        {activeView === 'add_money' && <AddMoneyView key="add_money" setActiveView={setActiveView} />}
                        {activeView === 'scan' && <ScanQRView key="scan" setActiveView={setActiveView} />}
                        {activeView === 'notifications' && <NotificationsView key="notifications" setActiveView={setActiveView} />}
                        {activeView === 'support' && <SupportView key="support" setActiveView={setActiveView} />}
                        {activeView === 'profile' && <ProfileView key="profile" setActiveView={setActiveView} />}
                        {activeView === 'security' && <SecurityView key="security" setActiveView={setActiveView} />}
                    </AnimatePresence>

                    {/* Bottom Navigation (Hidden on some views) */}
                    {!['scan', 'support'].includes(activeView) && (
                        <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-6 z-30">
                            <div className="flex items-center justify-around">
                                <NavButton icon={Home} label="Home" active={activeView === 'home'} onClick={() => setActiveView('home')} />
                                <NavButton icon={CreditCard} label="Cards" active={activeView === 'cards'} onClick={() => setActiveView('cards')} />
                                <NavButton icon={PieChart} label="Analytics" active={activeView === 'analytics'} onClick={() => setActiveView('analytics')} />
                                <NavButton icon={Clock} label="Activity" active={activeView === 'transactions'} onClick={() => setActiveView('transactions')} />
                                <NavButton icon={Settings} label="Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
                            </div>
                        </div>
                    )}

                    {/* Transaction Detail Modal */}
                    <AnimatePresence>
                        {showTransactionDetail && (
                            <TransactionDetailModal
                                transaction={showTransactionDetail}
                                onClose={() => setShowTransactionDetail(null)}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50" />
            </div>
        </div>
    )
}

// Home View
const HomeView = ({ setActiveView, onTransactionClick }: any) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide"
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-2">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('profile')}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-[#0a0a0a]">
                    JD
                </div>
                <div>
                    <div className="text-white/60 text-xs font-medium uppercase tracking-wider">Welcome back</div>
                    <div className="text-white font-bold text-sm">Rahul Gupta</div>
                </div>
            </div>
            <button
                onClick={() => setActiveView('notifications')}
                className="p-2.5 hover:bg-white/5 rounded-xl transition-colors relative"
            >
                <Bell className="w-6 h-6 text-white" strokeWidth={2} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-[#0f1115]" />
            </button>
        </div>

        {/* Total Balance & Chart */}
        <div className="mb-8 text-center">
            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Total Balance</div>
            <div className="text-5xl font-bold text-white tracking-tight mb-6">$15,240.50</div>

            {/* Interactive Chart Area */}
            <div className="h-24 w-full relative group cursor-crosshair">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,30 C20,30 20,10 40,15 C60,20 60,5 80,10 C90,12 100,0 100,0 L100,40 L0,40 Z"
                        fill="url(#balanceGradient)"
                    />
                    <path
                        d="M0,30 C20,30 20,10 40,15 C60,20 60,5 80,10 C90,12 100,0 100,0"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Hover Indicator */}
                    <line x1="60" y1="0" x2="60" y2="40" stroke="white" strokeWidth="1" strokeDasharray="2 2" className="opacity-0 group-hover:opacity-50 transition-opacity" />
                    <circle cx="60" cy="12" r="3" fill="#10b981" stroke="white" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </svg>
                <div className="absolute top-0 left-[60%] -translate-x-1/2 -translate-y-full bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    $14,850.20
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between gap-4 mb-8">
            <QuickActionButton icon={Plus} label="Add Money" onClick={() => setActiveView('add_money')} />
            <QuickActionButton icon={RefreshCw} label="Exchange" onClick={() => setActiveView('exchange')} />
            <QuickActionButton icon={ScanLine} label="Scan" onClick={() => setActiveView('scan')} />
            <QuickActionButton icon={MoreHorizontal} label="More" onClick={() => { }} />
        </div>

        {/* Main Card Preview */}
        <div className="relative mb-8 h-[200px] rounded-[32px] overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] duration-300 shadow-2xl shadow-black/50" onClick={() => setActiveView('cards')}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2d35] to-[#1a1c20] z-0" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay" />
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.08)'
                }}
            />
            <div className="relative z-20 p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="text-xl font-bold text-white tracking-wide">FINPAY</div>
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#eb001b]/80 mix-blend-screen" />
                        <div className="w-8 h-8 rounded-full bg-[#f79e1b]/80 mix-blend-screen" />
                    </div>
                </div>
                <div>
                    <div className="text-white/90 text-lg tracking-[0.15em] mb-1 font-mono">**** 0000</div>
                    <div className="flex justify-between items-center">
                        <div className="text-white/60 text-xs">Platinum Card</div>
                        <div className="text-emerald-400 text-xs font-bold">Active</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Recent Transactions */}
        <div>
            <div className="flex items-center justify-between mb-5 px-1">
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">Recent Activity</div>
                <button className="text-emerald-400 text-xs font-bold hover:text-emerald-300" onClick={() => setActiveView('transactions')}>See All</button>
            </div>
            <div className="space-y-1">
                <TransactionItem
                    icon={<div className="text-xl">☕</div>}
                    name="Starbucks"
                    date="Today, 9:41 AM"
                    amount="-$5.50"
                    onClick={() => onTransactionClick({ name: 'Starbucks', amount: '-$5.50', icon: '☕', date: 'Today, 9:41 AM', category: 'Food & Drink', location: 'New York, NY' })}
                />
                <TransactionItem
                    icon={<div className="text-xl">🍎</div>}
                    name="Apple Store"
                    date="Yesterday"
                    amount="-$999.00"
                    onClick={() => onTransactionClick({ name: 'Apple Store', amount: '-$999.00', icon: '🍎', date: 'Yesterday', category: 'Electronics', location: 'San Francisco, CA' })}
                />
                <TransactionItem
                    icon={<div className="text-xl">💰</div>}
                    name="Salary"
                    date="Friday"
                    amount="+$3,500.00"
                    isPositive
                    onClick={() => onTransactionClick({ name: 'Salary', amount: '+$3,500.00', icon: '💰', date: 'Friday', category: 'Income', location: 'Direct Deposit' })}
                />
            </div>
        </div>
    </motion.div>
)

// Exchange View
const ExchangeView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        <Header title="Exchange" onBack={() => setActiveView('home')} />

        <div className="bg-[#1a1c20] rounded-[32px] p-6 border border-white/5 mb-4">
            <div className="flex justify-between mb-2">
                <span className="text-white/60 text-sm">You pay</span>
                <span className="text-white/60 text-sm">Balance: $15,240.50</span>
            </div>
            <div className="flex justify-between items-center">
                <input type="number" placeholder="0" className="bg-transparent text-3xl font-bold text-white w-1/2 focus:outline-none" />
                <button className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-white font-medium">
                    <span className="text-xl">🇺🇸</span> USD <ChevronLeft className="w-4 h-4 -rotate-90" />
                </button>
            </div>
        </div>

        <div className="flex justify-center -my-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#2a2d35] border-4 border-[#0a0a0a] flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
            </div>
        </div>

        <div className="bg-[#1a1c20] rounded-[32px] p-6 border border-white/5 mb-8">
            <div className="flex justify-between mb-2">
                <span className="text-white/60 text-sm">You get</span>
                <span className="text-white/60 text-sm">Rate: 1 USD = 0.92 EUR</span>
            </div>
            <div className="flex justify-between items-center">
                <input type="number" placeholder="0" className="bg-transparent text-3xl font-bold text-white w-1/2 focus:outline-none" readOnly />
                <button className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-white font-medium">
                    <span className="text-xl">🇪🇺</span> EUR <ChevronLeft className="w-4 h-4 -rotate-90" />
                </button>
            </div>
        </div>

        <button className="w-full py-5 bg-emerald-500 rounded-[24px] text-white font-bold text-lg shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all">
            Review Order
        </button>
    </motion.div>
)

// Add Money View
const AddMoneyView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        <Header title="Add Money" onBack={() => setActiveView('home')} />

        <div className="flex flex-col items-center mb-8">
            <div className="relative w-full mb-8">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-white/40 text-4xl font-bold">$</span>
                <input type="number" placeholder="0" className="w-full bg-transparent border-b-2 border-white/10 px-16 py-6 text-center text-6xl font-bold text-white placeholder-white/10 focus:outline-none focus:border-emerald-500 transition-all" autoFocus />
            </div>

            <div className="flex gap-4 mb-8">
                {['+10', '+20', '+50', '+100'].map((amt) => (
                    <button key={amt} className="px-4 py-2 bg-white/5 rounded-xl text-white font-medium hover:bg-white/10 transition-colors">{amt}</button>
                ))}
            </div>
        </div>

        <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-4">Payment Method</div>
        <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between p-4 bg-[#1a1c20] rounded-2xl border border-emerald-500/50 cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black"><span className="font-bold text-xs">Pay</span></div>
                    <div className="text-white font-medium">Apple Pay</div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /></div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#1a1c20] rounded-2xl border border-white/5 cursor-pointer hover:bg-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><CreditCard className="w-5 h-5" /></div>
                    <div>
                        <div className="text-white font-medium">Debit Card</div>
                        <div className="text-white/40 text-xs">**** 8842</div>
                    </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-white/20" />
            </div>
        </div>

        <button className="w-full py-5 bg-emerald-500 rounded-[24px] text-white font-bold text-lg shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all">
            Add Money
        </button>
    </motion.div>
)

// Scan QR View
const ScanQRView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col bg-black relative">
        {/* Camera Placeholder */}
        <div className="absolute inset-0 bg-[#1a1c20]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 flex flex-col items-center">
                <Camera className="w-16 h-16 mb-4" />
                <p>Camera Preview</p>
            </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col">
            <div className="h-32 bg-black/50 backdrop-blur-sm flex items-end justify-between px-6 pb-6">
                <button onClick={() => setActiveView('home')} className="p-2 bg-white/10 rounded-full text-white"><X className="w-6 h-6" /></button>
                <h1 className="text-white font-bold text-lg">Scan Code</h1>
                <button className="p-2 bg-white/10 rounded-full text-white"><Zap className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-emerald-500 rounded-3xl relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-500 -mt-1 -ml-1 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-500 -mt-1 -mr-1 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-500 -mb-1 -ml-1 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-500 -mb-1 -mr-1 rounded-br-xl" />
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-500/50 animate-scan" />
                </div>
            </div>

            <div className="h-40 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-8 pb-8">
                <button className="flex flex-col items-center gap-2 text-emerald-400">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center"><QrCode className="w-6 h-6" /></div>
                    <span className="text-xs font-medium">Scan</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-white/60">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><ImageIcon className="w-6 h-6" /></div>
                    <span className="text-xs font-medium">Gallery</span>
                </button>
            </div>
        </div>
    </motion.div>
)

// Notifications View
const NotificationsView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        <Header title="Notifications" onBack={() => setActiveView('home')} />

        <div className="space-y-6">
            <div>
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-4">Today</div>
                <div className="space-y-4">
                    <NotificationItem icon={Shield} color="text-red-400" bg="bg-red-500/10" title="Security Alert" desc="New login detected from Mac OS X" time="2m ago" />
                    <NotificationItem icon={ArrowDownLeft} color="text-emerald-400" bg="bg-emerald-500/10" title="Payment Received" desc="You received $250 from Mike" time="1h ago" />
                </div>
            </div>
            <div>
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-4">Yesterday</div>
                <div className="space-y-4">
                    <NotificationItem icon={Zap} color="text-yellow-400" bg="bg-yellow-500/10" title="Special Offer" desc="Get 5% cashback on groceries" time="1d ago" />
                    <NotificationItem icon={CreditCard} color="text-blue-400" bg="bg-blue-500/10" title="Card Statement" desc="Your monthly statement is ready" time="1d ago" />
                </div>
            </div>
        </div>
    </motion.div>
)

// Support View
const SupportView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col bg-[#0a0a0a]">
        <div className="px-6 pt-2 pb-4 border-b border-white/5 bg-[#0a0a0a] z-10">
            <Header title="Support Chat" onBack={() => setActiveView('settings')} />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center"><span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">Today, 10:23 AM</span></div>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">FP</div>
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-white text-sm">Hi John! How can we help you today?</p>
                </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
                <div className="bg-emerald-500 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                    <p className="text-white text-sm">I have a question about my transaction limit.</p>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">FP</div>
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-white text-sm">Sure, I can help with that. Are you referring to your daily or monthly limit?</p>
                </div>
            </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
            <div className="flex items-center gap-3 bg-[#1a1c20] p-2 rounded-full border border-white/10">
                <button className="p-2 text-white/40 hover:text-white"><Plus className="w-5 h-5" /></button>
                <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
                <button className="p-2 bg-emerald-500 rounded-full text-white"><Send className="w-4 h-4" /></button>
            </div>
        </div>
    </motion.div>
)

// Profile View
const ProfileView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        <Header title="My Profile" onBack={() => setActiveView('home')} />

        <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl ring-4 ring-[#1a1c20] mb-4 relative">
                JD
                <div className="absolute bottom-0 right-0 bg-[#1a1c20] p-1.5 rounded-full">
                    <div className="bg-white p-1.5 rounded-full text-black"><Camera className="w-3 h-3" /></div>
                </div>
            </div>
            <h2 className="text-xl font-bold text-white">Rahul Gupta</h2>
            <p className="text-white/40 text-sm">@rahulgupta • Joined 2021</p>
        </div>

        <div className="space-y-6">
            <div className="bg-[#1a1c20] rounded-2xl p-4 border border-white/5 space-y-4">
                <DetailRow label="Full Name" value="Johnathan Doe" />
                <div className="h-px bg-white/5" />
                <DetailRow label="Email" value="john.doe@email.com" />
                <div className="h-px bg-white/5" />
                <DetailRow label="Phone" value="+1 (555) 123-4567" />
                <div className="h-px bg-white/5" />
                <DetailRow label="Address" value="123 Fintech St, NY" />
            </div>

            <button className="w-full py-4 bg-white/5 rounded-2xl text-white font-medium hover:bg-white/10 transition-colors">Edit Profile</button>
        </div>
    </motion.div>
)

// Security View
const SecurityView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        <Header title="Security" onBack={() => setActiveView('settings')} />

        <div className="space-y-4">
            <div className="bg-[#1a1c20] rounded-2xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Fingerprint className="w-5 h-5" /></div>
                        <span className="text-white font-medium">Face ID</span>
                    </div>
                    <div className="w-12 h-7 bg-emerald-500 rounded-full p-1 flex justify-end"><div className="w-5 h-5 bg-white rounded-full shadow-md" /></div>
                </div>
                <div className="h-px bg-white/5 my-2" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Lock className="w-5 h-5" /></div>
                        <span className="text-white font-medium">Change PIN</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20" />
                </div>
            </div>

            <div className="bg-[#1a1c20] rounded-2xl p-4 border border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><DeviceIcon className="w-5 h-5" /></div>
                        <span className="text-white font-medium">Devices</span>
                    </div>
                    <span className="text-white/40 text-sm">iPhone 14 Pro</span>
                </div>
            </div>
        </div>
    </motion.div>
)

// Cards View (Advanced)
const CardsView = ({ setActiveView }: any) => {
    const [frozen, setFrozen] = useState(false)
    const [showPin, setShowPin] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide"
        >
            <div className="flex items-center justify-between mb-8 mt-2">
                <button onClick={() => setActiveView('home')} className="p-2.5 hover:bg-white/5 rounded-xl transition-colors">
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-[17px] font-semibold text-white tracking-wide">Card Settings</h1>
                <div className="w-10" />
            </div>

            {/* Card Visual */}
            <div className="relative h-[220px] rounded-[32px] overflow-hidden p-7 flex flex-col justify-between mb-8 shadow-2xl shadow-black/50 transition-all duration-500" style={{ filter: frozen ? 'grayscale(100%)' : 'none' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#2a2d35] to-[#1a1c20]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 border border-white/10 rounded-[32px]" />

                <div className="relative z-10 flex justify-between items-start">
                    <div className="text-xl font-bold text-white tracking-wide">FINPAY</div>
                    {frozen && <Lock className="w-6 h-6 text-white/50" />}
                </div>

                <div className="relative z-10">
                    <div className="text-white/90 text-lg tracking-[0.15em] mb-2 font-mono">**** **** **** 0000</div>
                    <div className="flex justify-between items-end">
                        <div className="text-white/70 text-sm font-medium">Rahul Gupta</div>
                        <div className="text-white/50 text-xs">Exp 12/25</div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
                <div className="bg-[#1a1c20]/50 rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Lock className="w-5 h-5" /></div>
                            <span className="text-white font-medium">Freeze Card</span>
                        </div>
                        <Switch checked={frozen} onChange={setFrozen} />
                    </div>
                    <div className="h-px bg-white/5 my-2" />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Eye className="w-5 h-5" /></div>
                            <span className="text-white font-medium">Show PIN</span>
                        </div>
                        <button onClick={() => setShowPin(!showPin)} className="text-white/40 text-sm font-bold hover:text-white transition-colors">
                            {showPin ? '1234' : 'Reveal'}
                        </button>
                    </div>
                </div>

                <div className="bg-[#1a1c20]/50 rounded-2xl p-4 border border-white/5">
                    <ControlItem icon={Shield} label="Security Settings" onClick={() => setActiveView('security')} />
                    <ControlItem icon={Wallet} label="Add to Apple Wallet" />
                    <ControlItem icon={CreditCard} label="Replace Card" />
                    <ControlItem icon={X} label="Cancel Card" isDestructive />
                </div>
            </div>
        </motion.div>
    )
}

// Send Money View (Multi-step)
const SendMoneyView = ({ setActiveView }: any) => {
    const [step, setStep] = useState(1) // 1: Recipient, 2: Amount, 3: Success
    const [amount, setAmount] = useState('')

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide"
        >
            <div className="flex items-center justify-between mb-8 mt-2">
                <button onClick={() => step === 1 ? setActiveView('home') : setStep(step - 1)} className="p-2.5 hover:bg-white/5 rounded-xl transition-colors">
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-[17px] font-semibold text-white tracking-wide">
                    {step === 1 ? 'Select Recipient' : step === 2 ? 'Enter Amount' : 'Sent!'}
                </h1>
                <div className="w-10" />
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                            <input type="text" placeholder="Name, @username, phone" className="w-full bg-[#1a1c20] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/30" />
                        </div>
                        <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-4">Recent</div>
                        <div className="space-y-2">
                            {['Amara', 'Wei', 'Sofia', 'Carlos'].map((name, i) => (
                                <div key={i} onClick={() => setStep(2)} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl cursor-pointer transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2a2d35] to-[#1a1c20] flex items-center justify-center text-white font-bold">{name[0]}</div>
                                    <div className="text-white font-medium">{name}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">S</div>
                        <div className="text-white/60 mb-8">Sending to Amara</div>

                        <div className="relative mb-12">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 text-4xl font-bold">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="bg-transparent border-none text-center text-7xl font-bold text-white placeholder-white/10 focus:outline-none w-64"
                                autoFocus
                            />
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            className="w-full py-5 bg-emerald-500 rounded-[24px] text-white font-bold text-lg shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Send Now
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center h-[60vh]"
                    >
                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Sent Successfully!</h2>
                        <p className="text-white/60 mb-8">You sent ${amount} to Amara</p>
                        <button onClick={() => setActiveView('home')} className="px-8 py-3 bg-[#1a1c20] rounded-full text-white font-medium hover:bg-[#2a2d35] transition-colors">
                            Done
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// Analytics View
const AnalyticsView = ({ setActiveView }: any) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide"
    >
        <div className="flex items-center justify-between mb-8 mt-2">
            <button onClick={() => setActiveView('home')} className="p-2.5 hover:bg-white/5 rounded-xl transition-colors">
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-[17px] font-semibold text-white tracking-wide">Analytics</h1>
            <div className="w-10" />
        </div>

        <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1c20" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="180" strokeLinecap="round" className="opacity-80" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="220" strokeLinecap="round" className="opacity-80" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xs text-white/40 font-bold uppercase">Spent</div>
                    <div className="text-2xl font-bold text-white">$2,450</div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <CategoryItem color="bg-emerald-500" label="Shopping" amount="$1,200" percent="48%" />
            <CategoryItem color="bg-amber-500" label="Food & Drink" amount="$850" percent="35%" />
            <CategoryItem color="bg-indigo-500" label="Bills" amount="$400" percent="17%" />
        </div>
    </motion.div>
)

// Transaction Detail Modal
const TransactionDetailModal = ({ transaction, onClose }: any) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
    >
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full bg-[#1a1c20] rounded-t-[32px] p-6 border-t border-white/10"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />

            <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[#2a2d35] flex items-center justify-center text-4xl shadow-lg mb-4">
                    {transaction.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{transaction.amount}</h2>
                <p className="text-white/60">{transaction.name}</p>
            </div>

            <div className="space-y-4 mb-8">
                <DetailRow label="Status" value="Completed" />
                <DetailRow label="Date" value={transaction.date} />
                <DetailRow label="Category" value={transaction.category} />
                <DetailRow label="Location" value={transaction.location} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="py-3 bg-white/5 rounded-xl text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Receipt className="w-4 h-4" /> Receipt
                </button>
                <button className="py-3 bg-white/5 rounded-xl text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Split className="w-4 h-4" /> Split Bill
                </button>
            </div>
        </motion.div>
    </motion.div>
)

// Settings View
const SettingsView = ({ setActiveView }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        <Header title="Settings" onBack={() => setActiveView('home')} />
        <div className="space-y-3">
            <SettingsItem icon={User} label="Personal Details" onClick={() => setActiveView('profile')} />
            <SettingsItem icon={Shield} label="Security" onClick={() => setActiveView('security')} />
            <SettingsItem icon={Bell} label="Notifications" onClick={() => setActiveView('notifications')} />
            <SettingsItem icon={HelpCircle} label="Support" onClick={() => setActiveView('support')} />
            <SettingsItem icon={LogOut} label="Log Out" isDestructive />
        </div>
    </motion.div>
)

// Transactions View
const TransactionsView = ({ setActiveView, onTransactionClick }: any) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 overflow-y-auto px-6 pb-28 scrollbar-hide">
        <Header title="Activity" onBack={() => setActiveView('home')} />
        <div className="space-y-1">
            <TransactionItem icon={<div className="text-xl">☕</div>} name="Starbucks" date="Today, 9:41 AM" amount="-$5.50" onClick={() => onTransactionClick({ name: 'Starbucks', amount: '-$5.50', icon: '☕', date: 'Today, 9:41 AM', category: 'Food & Drink', location: 'New York, NY' })} />
            <TransactionItem icon={<div className="text-xl">🎬</div>} name="Netflix" date="Yesterday" amount="-$15.99" onClick={() => onTransactionClick({ name: 'Netflix', amount: '-$15.99', icon: '🎬', date: 'Yesterday', category: 'Entertainment', location: 'Subscription' })} />
            <TransactionItem icon={<div className="text-xl">🍎</div>} name="Apple Store" date="Yesterday" amount="-$999.00" onClick={() => onTransactionClick({ name: 'Apple Store', amount: '-$999.00', icon: '🍎', date: 'Yesterday', category: 'Electronics', location: 'San Francisco, CA' })} />
        </div>
    </motion.div>
)

// Helper Components
const Header = ({ title, onBack }: any) => (
    <div className="flex items-center justify-between mb-8 mt-2">
        <button onClick={onBack} className="p-2.5 hover:bg-white/5 rounded-xl transition-colors"><ChevronLeft className="w-6 h-6 text-white" /></button>
        <h1 className="text-[17px] font-semibold text-white tracking-wide">{title}</h1>
        <div className="w-10" />
    </div>
)

const NavButton = ({ icon: Icon, label, active, onClick }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 min-w-[60px] group">
        <div className={`relative p-2 rounded-2xl transition-all duration-300 ${active ? 'bg-emerald-500/10 scale-110' : 'bg-transparent group-hover:bg-white/5'}`}>
            <Icon className={`w-6 h-6 transition-colors duration-300 ${active ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/60'}`} strokeWidth={active ? 2.5 : 2} />
        </div>
        <span className={`text-[10px] font-medium transition-colors duration-300 ${active ? 'text-emerald-400' : 'text-white/40'}`}>{label}</span>
    </button>
)

const QuickActionButton = ({ icon: Icon, label, onClick }: any) => (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
        <div className="w-14 h-14 rounded-[20px] bg-[#1a1c20] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-105 group-active:scale-95 transition-all">
            <Icon className="w-6 h-6 text-emerald-400" />
        </div>
        <span className="text-[11px] font-medium text-white/60 group-hover:text-white transition-colors">{label}</span>
    </button>
)

const TransactionItem = ({ icon, name, date, amount, isPositive, onClick }: any) => (
    <div onClick={onClick} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-[20px] transition-all duration-200 cursor-pointer group active:scale-[0.98]">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2a2d35] flex items-center justify-center text-xl shadow-inner border border-white/5">
                {icon}
            </div>
            <div>
                <div className="text-white font-semibold text-[15px] mb-0.5">{name}</div>
                <div className="text-white/40 text-xs font-medium">{date}</div>
            </div>
        </div>
        <div className={`font-bold text-[15px] ${isPositive ? 'text-emerald-400' : 'text-white'}`}>{amount}</div>
    </div>
)

const NotificationItem = ({ icon: Icon, color, bg, title, desc, time }: any) => (
    <div className="flex gap-4 p-4 bg-[#1a1c20] rounded-2xl border border-white/5">
        <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <h3 className="text-white font-medium text-sm">{title}</h3>
                <span className="text-white/40 text-xs">{time}</span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
        </div>
    </div>
)

const Switch = ({ checked, onChange }: any) => (
    <button onClick={() => onChange(!checked)} className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-emerald-500' : 'bg-white/10'}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
)

const ControlItem = ({ icon: Icon, label, isDestructive, onClick }: any) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between py-3 hover:bg-white/5 rounded-lg px-2 transition-colors ${isDestructive ? 'text-red-400' : 'text-white'}`}>
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 opacity-70" />
            <span className="font-medium text-sm">{label}</span>
        </div>
        <ChevronLeft className="w-4 h-4 rotate-180 opacity-30" />
    </button>
)

const CategoryItem = ({ color, label, amount, percent }: any) => (
    <div className="flex items-center justify-between p-4 bg-[#1a1c20]/50 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-white font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-white font-bold">{amount}</span>
            <span className="text-white/40 text-xs font-medium bg-white/5 px-2 py-1 rounded-lg">{percent}</span>
        </div>
    </div>
)

const DetailRow = ({ label, value }: any) => (
    <div className="flex justify-between items-center">
        <span className="text-white/40 text-sm">{label}</span>
        <span className="text-white font-medium text-sm">{value}</span>
    </div>
)

const SettingsItem = ({ icon: Icon, label, isDestructive, onClick }: any) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all duration-200 group ${isDestructive ? 'text-[#ef4444]' : 'text-white'}`}>
        <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl transition-colors ${isDestructive ? 'bg-red-500/10 group-hover:bg-red-500/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-[15px]">{label}</span>
        </div>
        <ChevronLeft className="w-5 h-5 rotate-180 text-white/20 group-hover:text-white/40 transition-colors" />
    </button>
)
