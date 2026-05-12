'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, Home, Briefcase, Zap, FileText, Mail, Settings, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useChat } from '@ai-sdk/react';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  
  // Vercel AI SDK
  // @ts-ignore - Bypass AI SDK versioning type mismatches
  const chatProps = useChat({
    api: '/api/chat',
    onFinish: () => {
      playSound('pop');
    }
  } as any);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = chatProps as any;

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const playSound = useAudioFeedback();

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => {
          if (!open) playSound('pop');
          return !open;
        });
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    playSound('thud');
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="command-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(8, 7, 6, 0.6)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh'
          }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '640px', padding: '0 16px' }}
          >
            <div className="cmdk-wrapper">
              <Command>
                <div className="cmdk-input-wrapper">
                  <Search size={18} color="var(--color-text-secondary)" />
                  <Command.Input placeholder="Type a command or search..." autoFocus />
                </div>

                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>

                  <Command.Group heading="Navigation">
                    <Command.Item onSelect={() => runCommand(() => router.push('/'))}>
                      <Home size={14} /> Home
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => router.push('/work'))}>
                      <Briefcase size={14} /> Our Work
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => router.push('/services'))}>
                      <Zap size={14} /> Services
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => router.push('/insights'))}>
                      <FileText size={14} /> Insights
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => router.push('/contact'))}>
                      <Mail size={14} /> Contact
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Quick Actions">
                    <Command.Item onSelect={() => runCommand(() => window.location.href = 'mailto:hello@bigwebdigital.com')}>
                      <Mail size={14} /> Email BIGWEB
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}>
                      Scroll to Top
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Admin">
                    <Command.Item onSelect={() => runCommand(() => router.push('/admin'))}>
                      <Settings size={14} /> Admin Dashboard
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Secure">
                    <Command.Item onSelect={() => runCommand(() => router.push('/client'))}>
                      <Lock size={14} /> Client Portal
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="BIGWEB AI">
                    <Command.Item onSelect={() => {
                      setAiMode(true);
                      playSound('pop');
                    }}>
                      <Zap size={14} color="var(--color-gold-bright)" /> Ask AI Concierge
                    </Command.Item>
                  </Command.Group>

                </Command.List>
              </Command>

              <AnimatePresence>
                {aiMode && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(17, 17, 20, 0.95)',
                      backdropFilter: 'blur(20px)',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-bright)', fontSize: '14px', fontWeight: 600 }}>
                        <Zap size={16} /> BIGWEB AI Concierge
                      </div>
                      <button onClick={() => setAiMode(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}>
                        Close AI
                      </button>
                    </div>

                    <div ref={chatScrollRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ background: 'rgba(212, 175, 106, 0.05)', border: '1px solid rgba(212, 175, 106, 0.2)', padding: '12px 16px', borderRadius: '12px', color: 'var(--color-text-primary)', fontSize: '14px', alignSelf: 'flex-start', maxWidth: '85%', lineHeight: 1.5 }}>
                        Hello. I'm the BIGWEB AI. What's your current revenue bottleneck?
                      </div>
                      {(messages || []).map((msg: any) => (
                        <div key={msg.id} style={{ 
                          background: msg.role === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(212, 175, 106, 0.05)', 
                          border: `1px solid ${msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(212, 175, 106, 0.2)'}`,
                          padding: '12px 16px', 
                          borderRadius: '12px', 
                          color: 'var(--color-text-primary)', 
                          fontSize: '14px', 
                          alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                          maxWidth: '85%',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap'
                        }}>
                          {msg.content}
                        </div>
                      ))}
                      {isLoading && (
                        <div style={{ alignSelf: 'flex-start', color: 'var(--color-gold-muted)', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                          <Loader2 size={14} className="spin" /> Processing...
                        </div>
                      )}
                    </div>

                    <form onSubmit={(e) => {
                      if (!input.trim() || isLoading) {
                        e.preventDefault();
                        return;
                      }
                      playSound('tick');
                      handleSubmit(e);
                    }} style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask anything..." 
                        disabled={isLoading}
                        style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--color-text-primary)', fontSize: '14px', outline: 'none', opacity: isLoading ? 0.5 : 1 }}
                      />
                      <button type="submit" disabled={isLoading} style={{ background: 'var(--color-gold-bright)', color: 'var(--color-bg-primary)', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.5 : 1 }}>
                        Send
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Styles for CMDK */}
      <style dangerouslySetInnerHTML={{__html: `
        .cmdk-wrapper {
          background: rgba(17, 17, 20, 0.8);
          border: 1px solid rgba(212, 175, 106, 0.2);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212, 175, 106, 0.1);
        }
        .cmdk-input-wrapper {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          gap: 12px;
        }
        [cmdk-input] {
          font-family: var(--font-inter);
          border: none;
          width: 100%;
          font-size: 16px;
          background: transparent;
          color: var(--color-text-primary);
          outline: none;
        }
        [cmdk-input]::placeholder {
          color: var(--color-text-muted);
        }
        [cmdk-list] {
          max-height: 400px;
          overflow: auto;
          padding: 8px;
          overscroll-behavior: contain;
        }
        [cmdk-group-heading] {
          padding: 8px 12px;
          color: var(--color-text-muted);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }
        [cmdk-item] {
          content-visibility: auto;
          cursor: pointer;
          height: 44px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 12px;
          color: var(--color-text-secondary);
          user-select: none;
          transition: all 0.1s ease;
        }
        [cmdk-item][aria-selected="true"] {
          background: rgba(212, 175, 106, 0.1);
          color: var(--color-gold-bright);
        }
        [cmdk-item]:active {
          background: rgba(212, 175, 106, 0.2);
        }
        [cmdk-empty] {
          font-size: 14px;
          padding: 32px;
          white-space: pre-wrap;
          text-align: center;
          color: var(--color-text-muted);
        }
      `}} />
    </AnimatePresence>
  );
}
