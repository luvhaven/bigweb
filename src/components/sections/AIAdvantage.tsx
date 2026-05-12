'use client';

import { useEffect, useRef, useState } from 'react';
import AnimateIn from '@/components/ui/AnimateIn';
import AmbientGlow from '@/components/ui/AmbientGlow';
import TiltCard from '@/components/ui/TiltCard';
import AsciiArt from '@/components/ui/AsciiArt';
import { Bot, Workflow, Zap } from 'lucide-react';

const conversation = [
  {
    role: 'user',
    text: 'What are your pricing options?',
    delay: 600,
  },
  {
    role: 'agent',
    text: 'Great question. Based on what you\'ve shared, our Conversion Audit + Fix Sprint would be the best fit — typically $3,000–5,000 and pays for itself within the first month. Want me to book a 20-minute call with our team?',
    delay: 1600,
  },
  {
    role: 'user',
    text: 'Yes, that sounds good.',
    delay: 2800,
  },
  {
    role: 'agent',
    text: 'Done. You\'ll receive a calendar link in under 30 seconds. Is there anything else you\'d like to know before the call?',
    delay: 3600,
  },
];

const capabilities = [
  {
    icon: <Bot size={20} />,
    title: 'AI Sales Agents',
    description: 'Custom-trained chat agents that qualify leads, answer objections, and book calls — around the clock.',
  },
  {
    icon: <Workflow size={20} />,
    title: 'AI Workflow Automation',
    description: 'We eliminate manual work draining your team. Proposals, follow-ups, reporting — automated end-to-end.',
  },
  {
    icon: <Zap size={20} />,
    title: 'AI-Accelerated Delivery',
    description: 'What takes traditional agencies 12 weeks takes us 3. That speed advantage flows directly to you.',
  },
];

function ChatMockup() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          conversation.forEach((msg, i) => {
            const isAgent = msg.role === 'agent';
            // Show typing before agent messages
            if (isAgent) {
              setTimeout(() => setTyping(true), msg.delay - 400);
            }
            setTimeout(() => {
              setTyping(false);
              setShown(i + 1);
            }, msg.delay);
          });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      const container = bottomRef.current.parentElement;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [shown, typing]);

  return (
    <div ref={ref} className="chat-shell">
      {/* Window chrome */}
      <div className="chat-topbar">
        <div className="chat-dots">
          <span style={{ background: '#FF5F57' }} />
          <span style={{ background: '#FEBC2E' }} />
          <span style={{ background: '#28C840' }} />
        </div>
        <div className="chat-agent-id">
          <span className="chat-agent-status" />
          <span className="chat-agent-name">BIGWEB AI Agent</span>
          <span className="chat-agent-tag">Live Demo</span>
        </div>
        <div className="chat-secure">🔒 Encrypted</div>
      </div>

      {/* Messages */}
      <div className="chat-body">
        {/* Welcome banner */}
        <div className="chat-welcome">
          <div className="chat-welcome-avatar">BW</div>
          <p className="chat-welcome-text">
            Hey! I&apos;m BIGWEB&apos;s AI assistant. I can help you understand our services, pricing, and whether we&apos;re the right fit for your business.
          </p>
        </div>

        {conversation.slice(0, shown).map((msg, i) => (
          <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
            {msg.role === 'agent' && (
              <span className="chat-avatar-sm">BW</span>
            )}
            <div className="chat-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="chat-msg chat-msg-agent">
            <span className="chat-avatar-sm">BW</span>
            <div className="chat-bubble chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="chat-inputbar">
        <div className="chat-input-fake">Type your message…</div>
        <button className="chat-send-btn" aria-label="Send">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      
    </div>
  );
}

export default function AIAdvantage() {
  return (
    <section className="section ai-section" id="ai" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="ai-grid-bg" aria-hidden="true" />
      
      {/* Background Art */}
      <AsciiArt rows={20} cols={80} speed={0.4} color="212, 175, 106" />
      <AmbientGlow color="rgba(212, 175, 106, 0.4)" size="600px" opacity={0.3} blur="150px" top="-10%" right="-10%" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <AnimateIn>
          <span className="section-label">AI-NATIVE BY DESIGN</span>
        </AnimateIn>
        <AnimateIn delay={1}>
          <h2 className="section-headline" style={{ maxWidth: 680 }}>
            Your competitors just got a{' '}
            <span className="text-gold">24/7 sales team.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={2}>
          <p style={{ maxWidth: 620, marginBottom: 'var(--space-12)', fontSize: 'var(--text-lg)', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>
            The AI moment isn&apos;t coming. It&apos;s here. The agencies that will matter in 2026 use AI to deliver outcomes that weren&apos;t previously possible. At BIGWEB, AI is in every engagement — from our audit tools to the agents we build for you.
          </p>
        </AnimateIn>

        <div className="ai-layout">
          {/* Left: capabilities */}
          <div className="ai-caps">
            {capabilities.map((cap, i) => (
              <AnimateIn key={i} delay={i + 1}>
                <TiltCard maxTilt={8}>
                  <div className="ai-cap-card card">
                    <div className="ai-cap-icon">{cap.icon}</div>
                    <div>
                      <h3 className="ai-cap-title">{cap.title}</h3>
                      <p className="ai-cap-desc">{cap.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </AnimateIn>
            ))}
          </div>

          {/* Right: chat demo */}
          <AnimateIn delay={2}>
            <ChatMockup />
          </AnimateIn>
        </div>
      </div>

      
    </section>
  );
}
