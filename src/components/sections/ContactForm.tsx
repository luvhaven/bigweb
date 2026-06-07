'use client';

import { useState, Suspense, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [formDataState, setFormDataState] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [interestValue, setInterestValue] = useState('');
  const [prefilledName, setPrefilledName] = useState('');
  const [prefilledPrice, setPrefilledPrice] = useState('');

  useEffect(() => {
    if (searchParams) {
      const slug = searchParams.get('serviceslug') || searchParams.get('service');
      const name = searchParams.get('name');
      const price = searchParams.get('price');

      if (slug) {
        // Map common slugs to our form's exact select option values
        let mappedInterest = 'unsure';
        const str = slug.toLowerCase();
        if (str.includes('audit') || str.includes('diagnostic')) mappedInterest = 'audit';
        else if (str.includes('landing')) mappedInterest = 'landing';
        else if (str.includes('speed') || str.includes('vitals')) mappedInterest = 'speed';
        else if (str.includes('redesign')) mappedInterest = 'redesign';
        else if (str.includes('cro')) mappedInterest = 'cro';
        else if (str.includes('ai-agent') || str.includes('sales')) mappedInterest = 'ai-agent';
        else if (str.includes('funnel')) mappedInterest = 'funnel';
        else if (str.includes('dashboard')) mappedInterest = 'dashboard';
        else if (str.includes('transformation')) mappedInterest = 'transformation';
        else if (str.includes('saas') || str.includes('mvp')) mappedInterest = 'saas';
        else if (str.includes('ops')) mappedInterest = 'ai-ops';
        else if (str.includes('cto') || str.includes('partner')) mappedInterest = 'cto';

        setInterestValue(mappedInterest);
      }

      if (name) setPrefilledName(name);
      if (price) setPrefilledPrice(price);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          company: formData.get('company'),
          website: formData.get('website'),
          revenue: formData.get('revenue'),
          interest: formData.get('interest'),
          // Attach the prefilled context to the message so the team sees the exact locked recommendation
          message: prefilledName ? `[AI Recommended: ${prefilledName} at ${prefilledPrice}]\n\n${formData.get('message')}` : formData.get('message'),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setFormDataState({
        email: formData.get('email'),
        firstName: formData.get('firstName'),
      });
      setCheckoutMode(true);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout(type: 'diagnostic' | 'deposit') {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formDataState.email,
          firstName: formDataState.firstName,
          type,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to initialize checkout');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="form-success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{ padding: 'var(--space-10)', background: 'var(--color-bg-secondary)', borderRadius: 12, border: '1px solid rgba(212, 175, 106, 0.2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B35] to-transparent opacity-50" />

        {checkoutMode ? (
          <div className="relative z-10">
            <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 'var(--space-4)' }}>
              Priority Authorization Logic
            </div>
            <h3 style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', color: 'white', letterSpacing: '-0.03em' }}>
              Secure Your <br />
              <span style={{ color: '#FF6B35' }}>Strategy Session.</span>
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '400px', margin: '0 auto var(--space-8)' }}>
              You have been qualified. We only accept 2 sessions per week. Pay the $500 diagnostic fee to skip the review queue and book your instant slot now.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <button
                onClick={() => handleCheckout('diagnostic')}
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', height: '60px', fontSize: '18px' }}
              >
                {loading ? 'Processing...' : 'Pay $500 & Book Instantly'}
              </button>
              <button
                onClick={() => setCheckoutMode(false)}
                style={{ background: 'transparent', transition: 'all 0.3s', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '12px', cursor: 'pointer' }}
              >
                No thanks, I&apos;ll wait for the standard 4-hour review
              </button>
            </div>
          </div>
        ) : (
          <>
            <motion.div
              className="form-success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.2 }}
              style={{ width: 64, height: 64, borderRadius: '50%', background: '#FF6B35', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto var(--space-6)' }}
            >
              ✓
            </motion.div>
            <h3 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-3)', color: 'white' }}>Request Logged</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Our team is reviewing your revenue patterns. Expect an email with your next steps within 24 hours.</p>
          </>
        )}
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name *</label>
          <input type="text" id="firstName" name="firstName" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name *</label>
          <input type="text" id="lastName" name="lastName" className="form-input" required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email *</label>
        <input type="email" id="email" name="email" className="form-input" required />
      </div>

      <div className="form-group">
        <label htmlFor="company" className="form-label">Company / Business Name</label>
        <input type="text" id="company" name="company" className="form-input" />
      </div>

      <div className="form-group">
        <label htmlFor="website" className="form-label">Current Website URL</label>
        <input type="url" id="website" name="website" className="form-input" placeholder="https://" />
      </div>

      <div className="form-group">
        <label htmlFor="revenue" className="form-label">Monthly Revenue Range</label>
        <select id="revenue" name="revenue" className="form-input form-select">
          <option value="">Select a range</option>
          <option value="under-10k">Under $10,000</option>
          <option value="10k-50k">$10,000 – $50,000</option>
          <option value="50k-200k">$50,000 – $200,000</option>
          <option value="200k-500k">$200,000 – $500,000</option>
          <option value="500k-plus">$500,000+</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="interest" className="form-label">What are you most interested in?</label>
        <select
          id="interest"
          name="interest"
          className="form-input form-select"
          value={interestValue}
          onChange={(e) => setInterestValue(e.target.value)}
        >
          <option value="">Select a service</option>
          <option value="audit">Conversion Audit + Fix Sprint</option>
          <option value="landing">Landing Page Revenue Engine</option>
          <option value="speed">Site Speed &amp; Core Web Vitals Fix</option>
          <option value="redesign">Authority Redesign Package</option>
          <option value="cro">CRO Retainer Program</option>
          <option value="ai-agent">AI Sales Agent Build</option>
          <option value="funnel">Revenue Funnel System</option>
          <option value="dashboard">Business Intelligence Dashboard</option>
          <option value="transformation">Digital Revenue Transformation</option>
          <option value="saas">SaaS MVP Build</option>
          <option value="ai-ops">AI Ops Integration</option>
          <option value="cto">Fractional CTO / Digital Partner</option>
          <option value="unsure">Not sure yet — help me decide</option>
        </select>
        {prefilledName && (
          <div style={{ marginTop: 8, padding: '10px 12px', background: 'rgba(212,175,106,0.08)', border: '1px solid rgba(212,175,106,0.2)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Diagnosed Service: <strong style={{ color: '#D4AF6A' }}>{prefilledName}</strong></span>
            {prefilledPrice && <span style={{ fontSize: 12, fontWeight: 700, color: '#D4AF6A' }}>{prefilledPrice}</span>}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Tell us about your biggest challenge</label>
        <textarea
          id="message"
          name="message"
          className="form-input form-textarea"
          rows={4}
          placeholder="What's the #1 thing you'd fix about your digital presence if you could?"
        />
      </div>

      {error && (
        <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{error}</p>
      )}

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
        {loading ? 'Submitting...' : 'Request Your Free Diagnostic'} {!loading && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 'var(--space-4)' }}>
        No spam. No sales pressure. Just an honest conversation about your growth.
      </p>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-tertiary)' }}>Loading securely...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSubscribed(true);
    } catch {
      // Silently fail for newsletter
    } finally {
      setLoading(false);
    }
  }

  if (subscribed) {
    return (
      <p style={{ color: 'var(--color-gold-bright)', fontWeight: 500 }}>
        ✓ You&apos;re subscribed. Expect insights worth reading.
      </p>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="you@company.com"
        className="newsletter-input"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? '...' : 'Subscribe'} {!loading && <ArrowRight size={14} />}
      </button>
    </form>
  );
}
