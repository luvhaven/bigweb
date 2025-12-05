'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Wallet,
    Settings,
    Bell,
    Search,
    ChevronDown,
    TrendingUp,
    Clock,
    DollarSign,
    Bitcoin
} from 'lucide-react'

// Simulated Data
const ORDER_BOOK_ASKS = Array.from({ length: 15 }, (_, i) => ({
    price: 45000 + i * 50 + Math.random() * 20,
    amount: Math.random() * 2,
    total: Math.random() * 10
})).reverse()

const ORDER_BOOK_BIDS = Array.from({ length: 15 }, (_, i) => ({
    price: 44900 - i * 50 - Math.random() * 20,
    amount: Math.random() * 2,
    total: Math.random() * 10
}))

const TRADES = Array.from({ length: 20 }, (_, i) => ({
    price: 45000 + (Math.random() - 0.5) * 500,
    amount: Math.random() * 0.5,
    time: new Date(Date.now() - i * 1000).toLocaleTimeString(),
    type: Math.random() > 0.5 ? 'buy' : 'sell'
}))

export default function CryptoVaultDemo() {
    const [activeTab, setActiveTab] = useState('spot')
    const [orderType, setOrderType] = useState('limit')
    const [side, setSide] = useState('buy')
    const [price, setPrice] = useState('45,230.50')
    const [amount, setAmount] = useState('')

    return (
        <div className="flex flex-col h-full bg-[#0B0E11] text-slate-300 font-sans overflow-hidden selection:bg-emerald-500/30">
            {/* Header */}
            <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 shrink-0 bg-[#0B0E11]">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-lg tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Bitcoin className="w-5 h-5" />
                        </div>
                        CryptoVault
                    </div>
                    <div className="h-6 w-px bg-white/5" />
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <button className="text-white">Exchange</button>
                        <button className="text-slate-500 hover:text-slate-300 transition-colors">Markets</button>
                        <button className="text-slate-500 hover:text-slate-300 transition-colors">Derivatives</button>
                        <button className="text-slate-500 hover:text-slate-300 transition-colors">Earn</button>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#151920] border border-white/5">
                        <span className="text-xs text-slate-500">BTC/USD</span>
                        <span className="text-sm font-bold text-emerald-400">$45,230.50</span>
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> +2.4%
                        </span>
                    </div>
                    <div className="h-6 w-px bg-white/5" />
                    <button className="text-slate-400 hover:text-white"><Search className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-white"><Settings className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-white"><Bell className="w-4 h-4" /></button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px]">
                        <img src="https://i.pravatar.cc/150?u=crypto" alt="User" className="w-full h-full rounded-full border-2 border-[#0B0E11]" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Column: Order Book & Trades */}
                <div className="w-72 border-r border-white/5 flex flex-col shrink-0">
                    {/* Order Book */}
                    <div className="flex-1 flex flex-col min-h-0 border-b border-white/5">
                        <div className="h-10 flex items-center justify-between px-3 border-b border-white/5">
                            <span className="text-xs font-medium text-slate-400">Order Book</span>
                            <MoreHorizontal className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="px-3 py-2 space-y-[1px]">
                                {ORDER_BOOK_ASKS.map((order, i) => (
                                    <div key={i} className="flex justify-between text-xs relative group cursor-pointer hover:bg-white/5">
                                        <span className="text-red-400 font-mono relative z-10">{order.price.toFixed(2)}</span>
                                        <span className="text-slate-500 relative z-10">{order.amount.toFixed(4)}</span>
                                        <span className="text-slate-400 relative z-10">{order.total.toFixed(2)}</span>
                                        <div className="absolute top-0 right-0 bottom-0 bg-red-500/10" style={{ width: `${Math.random() * 40}%` }} />
                                    </div>
                                ))}
                            </div>
                            <div className="py-2 px-3 border-y border-white/5 bg-[#151920] flex items-center justify-between">
                                <span className="text-lg font-bold text-emerald-400">45,230.50</span>
                                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="px-3 py-2 space-y-[1px]">
                                {ORDER_BOOK_BIDS.map((order, i) => (
                                    <div key={i} className="flex justify-between text-xs relative group cursor-pointer hover:bg-white/5">
                                        <span className="text-emerald-400 font-mono relative z-10">{order.price.toFixed(2)}</span>
                                        <span className="text-slate-500 relative z-10">{order.amount.toFixed(4)}</span>
                                        <span className="text-slate-400 relative z-10">{order.total.toFixed(2)}</span>
                                        <div className="absolute top-0 right-0 bottom-0 bg-emerald-500/10" style={{ width: `${Math.random() * 40}%` }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Trades */}
                    <div className="h-1/3 flex flex-col min-h-0">
                        <div className="h-10 flex items-center justify-between px-3 border-b border-white/5">
                            <span className="text-xs font-medium text-slate-400">Recent Trades</span>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
                            {TRADES.map((trade, i) => (
                                <div key={i} className="flex justify-between text-xs mb-1">
                                    <span className={`font-mono ${trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {trade.price.toFixed(1)}
                                    </span>
                                    <span className="text-slate-500">{trade.amount.toFixed(4)}</span>
                                    <span className="text-slate-600">{trade.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Column: Chart */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#0B0E11]">
                    <div className="h-12 border-b border-white/5 flex items-center justify-between px-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-white">BTC/USD</span>
                            <div className="flex items-center gap-1 bg-[#151920] rounded p-0.5">
                                {['15m', '1H', '4H', '1D', '1W'].map((t) => (
                                    <button key={t} className={`px-2 py-0.5 text-xs rounded ${t === '1H' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <button className="hover:text-white"><Activity className="w-4 h-4" /></button>
                            <button className="hover:text-white"><Settings className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="flex-1 relative p-4">
                        {/* Simulated Chart */}
                        <div className="w-full h-full relative border border-white/5 rounded-lg bg-[#0F1216] overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="border-r border-b border-white/5" />
                                ))}
                            </div>
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path
                                    d="M0,300 L50,280 L100,310 L150,250 L200,270 L250,220 L300,240 L350,180 L400,200 L450,150 L500,170 L550,120 L600,140 L650,100 L700,120 L750,80 L800,100 L850,50 L900,70 L950,40 L1000,60 L1050,20 L1100,40 L1150,10"
                                    fill="url(#chartGradient)"
                                    stroke="#10B981"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </svg>
                            {/* Candlesticks (Simulated) */}
                            <div className="absolute inset-0 flex items-end justify-between px-4 pb-8 opacity-50">
                                {Array.from({ length: 30 }).map((_, i) => {
                                    const height = Math.random() * 40 + 10
                                    const isGreen = Math.random() > 0.4
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-1 w-2">
                                            <div className={`w-[1px] h-4 ${isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                            <div
                                                className={`w-full ${isGreen ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                style={{ height: `${height}px` }}
                                            />
                                            <div className={`w-[1px] h-4 ${isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Trading Form */}
                <div className="w-80 border-l border-white/5 flex flex-col shrink-0 bg-[#151920]">
                    <div className="flex border-b border-white/5">
                        <button
                            onClick={() => setSide('buy')}
                            className={`flex-1 py-3 text-sm font-bold transition-colors ${side === 'buy' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => setSide('sell')}
                            className={`flex-1 py-3 text-sm font-bold transition-colors ${side === 'sell' ? 'text-red-400 border-b-2 border-red-400 bg-red-500/5' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Sell
                        </button>
                    </div>

                    <div className="p-4 space-y-6">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>Available</span>
                            <span className="text-white font-mono">2.4503 BTC</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-2 p-1 bg-[#0B0E11] rounded-lg border border-white/5">
                                {['Limit', 'Market', 'Stop'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setOrderType(type.toLowerCase())}
                                        className={`flex-1 py-1.5 text-xs font-medium rounded ${orderType === type.toLowerCase() ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Price (USD)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-[#0B0E11] border border-white/10 rounded-lg py-2.5 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">USD</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-slate-500">Amount (BTC)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-[#0B0E11] border border-white/10 rounded-lg py-2.5 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">BTC</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {['25%', '50%', '75%', '100%'].map((p) => (
                                    <button key={p} className="py-1 bg-[#0B0E11] border border-white/5 rounded text-xs text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors">
                                        {p}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-4">
                                <button className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-[0.98] ${side === 'buy' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'}`}>
                                    {side === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto p-4 border-t border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-white">Assets</span>
                            <Wallet className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                                        <Bitcoin className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm text-slate-300">Bitcoin</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-white font-mono">2.45 BTC</div>
                                    <div className="text-xs text-slate-500">$110,814</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <span className="text-[10px] font-bold">Ξ</span>
                                    </div>
                                    <span className="text-sm text-slate-300">Ethereum</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-white font-mono">14.2 ETH</div>
                                    <div className="text-xs text-slate-500">$32,450</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

// Helper Icon
const MoreHorizontal = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
)
