'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calendar, Mail } from 'lucide-react';
import { ContactForm } from '@/components/sections/ContactForm';

type Step = 'goal' | 'revenue' | 'qualified' | 'disqualified';

export default function DynamicQualifier() {
  const [step, setStep] = useState<Step>('goal');
  const [goal, setGoal] = useState<string | null>(null);
  const [revenue, setRevenue] = useState<string | null>(null);

  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);
    setStep('revenue');
  };

  const handleRevenueSelect = (selectedRevenue: string) => {
    setRevenue(selectedRevenue);
    if (selectedRevenue === '0-10k') {
      setStep('disqualified');
    } else {
      setStep('qualified');
    }
  };

  const reset = () => {
    setGoal(null);
    setRevenue(null);
    setStep('goal');
  };

  const slideVariants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  return (
    <div style={{ position: 'relative', minHeight: '400px' }}>
      <AnimatePresence mode="wait">
        
        {step === 'goal' && (
          <motion.div key="goal" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-6)', fontFamily: 'var(--font-display)' }}>
              1. What is your primary revenue bottleneck?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                'We have traffic, but our conversion rate is terrible.',
                'Our website feels outdated and doesn\'t reflect our value.',
                'We need a custom SaaS or web application built.',
                'I\'m not sure, I just know we are leaving money on the table.'
              ].map((text, i) => (
                <button
                  key={i}
                  onClick={() => handleGoalSelect(text)}
                  style={{
                    textAlign: 'left',
                    padding: 'var(--space-4)',
                    background: 'var(--color-bg-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: 'var(--text-base)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold-muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  {text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'revenue' && (
          <motion.div key="revenue" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <button onClick={() => setStep('goal')} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: 'var(--space-6)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-6)', fontFamily: 'var(--font-display)' }}>
              2. What is your current monthly revenue?
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
              Be honest. This helps us ensure we can actually provide a positive ROI for you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { id: '0-10k', label: 'Under $10,000 / mo' },
                { id: '10-50k', label: '$10,000 - $50,000 / mo' },
                { id: '50k+', label: '$50,000+ / mo' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleRevenueSelect(tier.id)}
                  style={{
                    textAlign: 'left',
                    padding: 'var(--space-4)',
                    background: 'var(--color-bg-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: 'var(--text-base)',
                    fontWeight: 600
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold-muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'disqualified' && (
          <motion.div key="disqualified" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
             <button onClick={reset} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: 'var(--space-6)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <ArrowLeft size={14} /> Start Over
            </button>
            <div style={{ padding: 'var(--space-8)', background: 'rgba(212, 175, 106, 0.05)', border: '1px solid rgba(212, 175, 106, 0.2)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, marginBottom: 'var(--space-4)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                We might not be the right fit (yet).
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                Based on your current revenue, our minimum engagement size would likely put too much strain on your cash flow. We only take on clients when we are 100% certain we can generate a massive positive ROI.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                However, we still want to help. Send us an email and we can point you to some free resources or lower-cost partners.
              </p>
              <a href="mailto:hello@bigwebdigital.com" className="btn btn-outline" style={{ display: 'inline-flex' }}>
                <Mail size={16} /> Email Us Anyway
              </a>
            </div>
          </motion.div>
        )}

        {step === 'qualified' && (
          <motion.div key="qualified" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
             <button onClick={() => setStep('revenue')} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: 'var(--space-6)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <ArrowLeft size={14} /> Back
            </button>
            <div style={{ marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', borderRadius: '20px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>
                <Calendar size={14} /> Fast-Track Available
              </span>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, marginBottom: 'var(--space-2)', fontFamily: 'var(--font-display)' }}>
                You qualify for a priority diagnostic.
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                Skip the waitlist. Fill out your details below and we will send you a direct calendar link to book your call.
              </p>
            </div>
            <ContactForm />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
