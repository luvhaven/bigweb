'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Trash2, Mail, Star, Archive, MoreVertical, Reply, Clock, User, ChevronRight } from 'lucide-react'
import { messagesAPI } from '@/lib/api/messages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  content?: string // Assuming content field exists
  created_at: string
  read: boolean
  starred?: boolean // New field for UI state
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const data = await messagesAPI.getAll()
      // Add some dummy content if missing for demo purposes
      const enrichedData = data.map((msg: any) => ({
        ...msg,
        content: msg.content || "This is a sample message content because the API might not return it in the list view. In a real app, this would be the actual inquiry text from the user.",
        starred: false
      }))
      setMessages(enrichedData || [])
      if (enrichedData.length > 0 && !selectedMessageId) {
        setSelectedMessageId(enrichedData[0].id)
      }
    } catch (error) {
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      await messagesAPI.delete(id)
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessageId === id) {
        setSelectedMessageId(null)
      }
      toast.success('Message deleted')
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setMessages(messages.map(m => m.id === id ? { ...m, starred: !m.starred } : m))
  }

  const filteredMessages = messages.filter(msg => {
    const matchesSearch =
      msg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === 'unread') return matchesSearch && !msg.read
    if (filter === 'starred') return matchesSearch && msg.starred
    return matchesSearch
  })

  const selectedMessage = messages.find(m => m.id === selectedMessageId)

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <AdminHeader
        title="Inbox"
        description="Manage your communications."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => loadMessages()}>
            Refresh
          </Button>
        </div>
      </AdminHeader>

      <div className="flex-1 flex gap-6 overflow-hidden bg-card border border-border rounded-2xl shadow-sm">
        {/* Sidebar List */}
        <div className="w-full md:w-[400px] flex flex-col border-r border-border bg-secondary/5">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search inbox..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('unread')}
                className="flex-1"
              >
                Unread
              </Button>
              <Button
                variant={filter === 'starred' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('starred')}
                className="flex-1"
              >
                Starred
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No messages found</div>
              ) : (
                filteredMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessageId(msg.id)}
                    className={`flex flex-col gap-2 p-4 text-left transition-colors border-b border-border/50 hover:bg-accent/5 ${selectedMessageId === msg.id ? 'bg-accent/10 border-l-4 border-l-accent' : 'border-l-4 border-l-transparent'
                      }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-center gap-2">
                        {!msg.read && <div className="w-2 h-2 rounded-full bg-accent" />}
                        <span className={`font-medium ${!msg.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-medium truncate pr-4">{msg.subject}</span>
                      <div
                        role="button"
                        onClick={(e) => toggleStar(msg.id, e)}
                        className={`hover:text-yellow-400 transition-colors ${msg.starred ? 'text-yellow-400' : 'text-muted-foreground/30'}`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {msg.content}
                    </p>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Message Detail View */}
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          {selectedMessage ? (
            <>
              {/* Toolbar */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" title="Archive">
                    <Archive className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Mark as spam">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Snooze
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <ScrollArea className="flex-1 p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                  {/* Header */}
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-2xl font-bold leading-tight">{selectedMessage.subject}</h2>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-secondary/50">Inbox</Badge>
                        {selectedMessage.starred && <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Starred</Badge>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border border-border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedMessage.name}`} />
                        <AvatarFallback>{selectedMessage.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-lg">{selectedMessage.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(selectedMessage.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {selectedMessage.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Body */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.content}
                    </p>
                  </div>

                  {/* Reply Box */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="bg-secondary/20 rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                        <Reply className="w-4 h-4" />
                        Reply to <span className="font-medium text-foreground">{selectedMessage.name}</span>
                      </div>
                      <Input
                        className="bg-background border-border mb-4"
                        placeholder="Write your reply..."
                      />
                      <div className="flex justify-end">
                        <Button className="gap-2">
                          <Mail className="w-4 h-4" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <Mail className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}
