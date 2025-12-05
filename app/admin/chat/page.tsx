'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageSquare,
    Send,
    User,
    Bot,
    Clock,
    MoreVertical,
    Archive,
    Trash2,
    Mail,
    Phone,
    Loader2,
    AlertCircle,
    Search,
    X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard, EmptyState, SectionHeader } from '@/components/admin/ui/GlassCard'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useChatSessions, useChatMessages, useSendMessage } from '@/hooks/useAdminData'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

export default function ChatPage() {
    const { data: sessions, isLoading: sessionsLoading } = useChatSessions()
    const [selectedSession, setSelectedSession] = useState<string | null>(null)
    const [messageInput, setMessageInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { data: messages, isLoading: messagesLoading } = useChatMessages(selectedSession || '')
    const sendMessage = useSendMessage()

    // Filter sessions
    const filteredSessions = sessions?.filter(s =>
    (s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.visitor_id.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedSession || !messageInput.trim()) return

        try {
            await sendMessage.mutateAsync({
                sessionId: selectedSession,
                content: messageInput.trim()
            })
            setMessageInput('')
        } catch (error) {
            console.error('Failed to send message:', error)
        }
    }

    const selectedSessionData = sessions?.find(s => s.id === selectedSession)

    return (
        <div className="h-[calc(100vh-8rem)]">
            <div className="flex flex-col md:flex-row gap-6 h-full">
                {/* Sessions List */}
                <GlassCard className="w-full md:w-80 shrink-0 flex flex-col">
                    <div className="p-4 border-b border-zinc-800">
                        <h2 className="font-semibold text-white mb-3">Live Chat</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-zinc-800/50 border-zinc-700 text-white text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {sessionsLoading ? (
                            <div className="p-4 space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3 animate-pulse">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800" />
                                        <div className="flex-1">
                                            <div className="h-4 w-24 bg-zinc-800 rounded mb-2" />
                                            <div className="h-3 w-full bg-zinc-800 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredSessions?.length === 0 ? (
                            <div className="p-4 text-center text-zinc-500 text-sm">
                                No conversations yet
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {filteredSessions?.map((session) => (
                                    <button
                                        key={session.id}
                                        onClick={() => setSelectedSession(session.id)}
                                        className={cn(
                                            'w-full p-4 text-left hover:bg-zinc-800/50 transition-colors',
                                            selectedSession === session.id && 'bg-zinc-800/50'
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-10 w-10 shrink-0">
                                                <AvatarFallback className={cn(
                                                    session.status === 'open'
                                                        ? 'bg-emerald-500/20 text-emerald-500'
                                                        : 'bg-zinc-700 text-zinc-400'
                                                )}>
                                                    {session.name?.charAt(0) || 'V'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-medium text-white truncate">
                                                        {session.name || 'Visitor'}
                                                    </span>
                                                    {session.unread_count > 0 && (
                                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs">
                                                            {session.unread_count}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-zinc-500 truncate">
                                                    {session.email || `ID: ${session.visitor_id.slice(0, 8)}...`}
                                                </p>
                                                <p className="text-xs text-zinc-600 mt-1">
                                                    {formatDistanceToNow(new Date(session.last_message_at), { addSuffix: true })}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </GlassCard>

                {/* Chat Area */}
                <GlassCard className="flex-1 flex flex-col min-h-0">
                    {selectedSession ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
                                            {selectedSessionData?.name?.charAt(0) || 'V'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium text-white">
                                            {selectedSessionData?.name || 'Visitor'}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                                            {selectedSessionData?.email && (
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {selectedSessionData.email}
                                                </span>
                                            )}
                                            <span className={cn(
                                                'flex items-center gap-1',
                                                selectedSessionData?.status === 'open' ? 'text-emerald-500' : 'text-zinc-500'
                                            )}>
                                                <span className={cn(
                                                    'w-2 h-2 rounded-full',
                                                    selectedSessionData?.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'
                                                )} />
                                                {selectedSessionData?.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSelectedSession(null)}
                                        className="md:hidden text-zinc-400"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-zinc-400">
                                                <MoreVertical className="w-5 h-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                            <DropdownMenuItem className="text-zinc-300">
                                                <Archive className="w-4 h-4 mr-2" />
                                                Archive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-400">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messagesLoading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                                    </div>
                                ) : messages?.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                                        <MessageSquare className="w-12 h-12 mb-2" />
                                        <p>No messages yet</p>
                                    </div>
                                ) : (
                                    <>
                                        {messages?.map((message: any) => (
                                            <motion.div
                                                key={message.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={cn(
                                                    'flex gap-3',
                                                    message.sender_type === 'agent' && 'flex-row-reverse'
                                                )}
                                            >
                                                <Avatar className="h-8 w-8 shrink-0">
                                                    <AvatarFallback className={cn(
                                                        message.sender_type === 'agent'
                                                            ? 'bg-emerald-500/20 text-emerald-500'
                                                            : 'bg-zinc-700 text-zinc-400'
                                                    )}>
                                                        {message.sender_type === 'agent' ? 'A' : 'V'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className={cn(
                                                    'max-w-[70%] rounded-2xl p-3',
                                                    message.sender_type === 'agent'
                                                        ? 'bg-emerald-500/20 text-white rounded-tr-sm'
                                                        : 'bg-zinc-800 text-zinc-200 rounded-tl-sm'
                                                )}>
                                                    <p className="text-sm">{message.content}</p>
                                                    <p className="text-xs text-zinc-500 mt-1">
                                                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800">
                                <div className="flex gap-2">
                                    <Input
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="bg-zinc-800/50 border-zinc-700 text-white"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={!messageInput.trim() || sendMessage.isPending}
                                        className="bg-emerald-500 hover:bg-emerald-600"
                                    >
                                        {sendMessage.isPending ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
                            <MessageSquare className="w-16 h-16 mb-4 text-zinc-700" />
                            <h3 className="text-lg font-medium text-zinc-400">No conversation selected</h3>
                            <p className="text-sm">Select a conversation from the list to start chatting</p>
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    )
}
