'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Download, Lock } from 'lucide-react';
import './playbook.css';
import LiquidGradient from '@/components/ui/LiquidGradient';

function PlaybookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Basic gatekeeping (in a real app, verify a secure JWT or session token)
    if (searchParams.get('access') === 'granted') {
      setAuthorized(true);
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  if (!authorized) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-muted)' }}>
          <Lock size={16} /> Verifying Access...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Visual background for web view only */}
      <div className="print:hidden" style={{ position: 'fixed', inset: 0, zIndex: -1, opacity: 0.3 }}>
        <LiquidGradient />
      </div>

      <div className="playbook-container">
        <header className="playbook-header">
          {/* BIGWEB Logo Branding */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <span style={{ color: 'var(--color-gold-bright)' }}>
              <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="12" y="1" width="9" height="9" fill="currentColor" opacity="0.8"/>
                <rect x="1" y="12" width="9" height="9" fill="currentColor" opacity="0.4"/>
                <rect x="12" y="12" width="9" height="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
              </svg>
            </span>
            <span className="print-logo-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
              <span style={{ fontWeight: 900 }}>BIG</span><span style={{ fontWeight: 300 }}>WEB</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginTop: '-4px' }}>Digital</span>
            </span>
          </div>
          
          <span className="playbook-subtitle">Proprietary Document</span>
          <h1 className="playbook-title">The Conversion Physics Playbook</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
            How we generated $140M in additional revenue across 42 B2B campaigns in 2025.
          </p>
        </header>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">01 // The Physics of Conversion</span>
          <h2 className="playbook-chapter-title">Traffic is a Commodity. Trust is an Asset.</h2>
          <div className="playbook-content">
            <p>
              The digital landscape is fundamentally broken. Companies are pouring millions into paid acquisition, fighting over pennies in CPC arbitrage, while ignoring the fact that their landing pages are leaking 98% of that traffic.
            </p>
            <p>
              Most B2B organizations treat their website as a digital brochure. We treat it as a physics problem. Every pixel, every millisecond of load time, every word of copy either adds momentum to the user&apos;s journey or introduces friction. Traffic acquisition can be bought instantly, but if your conversion infrastructure is flawed, you are simply accelerating your burn rate.
            </p>
            
            <div className="playbook-insight">
              <p>"You don't need more traffic. You need less friction."</p>
            </div>

            <h3>The Law of Digital Entropy</h3>
            <p>
              In physics, entropy dictates that systems naturally degrade into disorder. In digital marketing, this translates to user attention. From the moment a prospect clicks your ad, their attention begins to decay. Your job is not to "capture" their attention—it is to continually manufacture momentum so that their intent to purchase outpaces their natural tendency to bounce.
            </p>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">02 // Cognitive Load & The Friction Tax</span>
          <h2 className="playbook-chapter-title">The Cost of Making Users Think</h2>
          <div className="playbook-content">
            <p>
              Every time a user lands on your site, they arrive with a finite "budget" of cognitive energy. If they have to figure out what you do, who you do it for, and why they should care, they spend that budget rapidly.
            </p>
            <p>
              We call this the <strong>Cognitive Load Tax</strong>. When the tax is too high, the budget hits zero before they reach your pricing page or book a demo. Friction isn't just a slow-loading image; friction is ambiguity. Friction is corporate jargon that requires translation. Friction is a primary CTA that says "Learn More" instead of "Start Free Trial."
            </p>
            <h3>How to Audit Your Own Cognitive Load:</h3>
            <ul>
              <li style={{ marginBottom: '12px' }}><strong>The 5-Second Test:</strong> Can a stranger understand exactly what you sell and who you sell it to in 5 seconds?</li>
              <li style={{ marginBottom: '12px' }}><strong>The Jargon Purge:</strong> Remove words like "synergy," "robust," and "next-generation." Speak to outcomes, not features.</li>
              <li style={{ marginBottom: '12px' }}><strong>Visual Hierarchy:</strong> Ensure your H1, subheadline, and primary CTA are the only elements fighting for immediate visual dominance.</li>
            </ul>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">03 // The Speed of Trust</span>
          <h2 className="playbook-chapter-title">Zero-To-Belief in 3 Seconds</h2>
          <div className="playbook-content">
            <p>
              Trust is not built through claims; it is built through proof. If your hero section says "We are the leading enterprise software," the user feels skepticism. If you show a verifiable outcome—"How we saved Company X $2.4M in 90 days"—the user feels momentum.
            </p>
            <p>
              The modern consumer requires proof immediately. This means your value proposition cannot exist in a vacuum. It must be tethered to undeniable reality.
            </p>
            <div className="playbook-insight">
              <p>"Marketing makes promises. Conversion physics requires proof."</p>
            </div>
            <h3>Injecting Proof at the Point of Friction:</h3>
            <p>
              Do not bury your case studies on a separate page. Inject micro-testimonials right next to your pricing tiers. Place client logos directly beneath your hero CTA. When you ask a user for their email address, counter the friction of that ask by placing a trust indicator (like a G2 rating or a data privacy badge) within their peripheral vision.
            </p>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">04 // Aesthetic Authority</span>
          <h2 className="playbook-chapter-title">Institutional Framing & Design Language</h2>
          <div className="playbook-content">
            <p>
              People buy from institutions, not freelancers. Your digital presence must project an aura of scale, permanence, and inevitable success. This is achieved through highly disciplined typography, restrained color palettes, and flawless performance.
            </p>
            <p>
              A slow website implies a slow company. A cluttered UI implies disorganized thinking.
            </p>
            <h3>The Components of Aesthetic Authority:</h3>
            <ul>
              <li style={{ marginBottom: '12px' }}><strong>Negative Space:</strong> White space (or dark space) is a luxury asset. It forces focus and implies that you are confident enough to let your core message breathe.</li>
              <li style={{ marginBottom: '12px' }}><strong>Motion Polish:</strong> Micro-interactions and smooth transitions signal high engineering standards. If your buttons feel "heavy" or "magnetic," the user subconsciously associates that quality with your product.</li>
              <li style={{ marginBottom: '12px' }}><strong>Typographic Hierarchy:</strong> Use premium fonts. Restrict your scale to mathematical proportions (e.g., Major Third or Golden Ratio) to ensure visual harmony.</li>
            </ul>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">05 // Behavioral Economics in B2B</span>
          <h2 className="playbook-chapter-title">Hacking the B2B Buying Brain</h2>
          <div className="playbook-content">
            <p>
              B2B buyers like to believe they are perfectly rational, data-driven entities. They are not. They are humans terrified of making a career-ending mistake. 
            </p>
            <p>
              In B2B, the primary driver is not "desire for gain," but <strong>"mitigation of risk."</strong> Therefore, your conversion strategy must focus on systematically de-risking the decision for the buyer.
            </p>
            <div className="playbook-insight">
              <p>"Nobody gets fired for buying IBM. Your goal is to become the IBM of your niche."</p>
            </div>
            <h3>Deploying Economic Triggers:</h3>
            <p>
              <strong>Loss Aversion:</strong> Frame your solution not just by what they gain, but by what they are currently losing every day they don't use you. Calculate their "cost of inaction."<br/><br/>
              <strong>Social Proof (The Bandwagon Effect):</strong> Use the exact job titles of your target audience in your testimonials. "VPs of Engineering trust us" is far more effective than "People trust us."
            </p>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">06 // Anatomy of a High-Converting Hero</span>
          <h2 className="playbook-chapter-title">The Above-The-Fold Algorithm</h2>
          <div className="playbook-content">
            <p>
              The hero section is responsible for 80% of your bounce rate. It has one job: buy you enough attention to get the user to scroll. It is not the place to explain everything you do.
            </p>
            <h3>The Perfect Hero Formula:</h3>
            <ol>
              <li style={{ marginBottom: '12px' }}><strong>The Eyebrow (Context):</strong> A small, highly specific label above the H1 (e.g., "For Enterprise SaaS").</li>
              <li style={{ marginBottom: '12px' }}><strong>The H1 (The Promise):</strong> An outcome-driven headline. Not "HR Software," but "Cut Your Hiring Cycle by 14 Days."</li>
              <li style={{ marginBottom: '12px' }}><strong>The Subheadline (The Mechanism):</strong> How you achieve the promise, establishing credibility.</li>
              <li style={{ marginBottom: '12px' }}><strong>The Primary CTA (The Next Step):</strong> Low friction, high clarity. ("Start Free Trial" &gt; "Submit").</li>
              <li style={{ marginBottom: '12px' }}><strong>The Social Proof (The Safety Net):</strong> Logos or a micro-review immediately below the CTA.</li>
            </ol>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">07 // Friction Engineering</span>
          <h2 className="playbook-chapter-title">When to Add Friction. When to Remove It.</h2>
          <div className="playbook-content">
            <p>
              While reducing friction is generally the rule, <strong>Positive Friction</strong> is a highly advanced tactic used to increase lead quality and perceived value.
            </p>
            <h3>Removing Negative Friction:</h3>
            <p>
              Eliminate unnecessary form fields. If you only need their email to start, don't ask for their phone number, company size, and favorite color. Reduce the number of clicks required to reach the core value.
            </p>
            <h3>Adding Positive Friction:</h3>
            <p>
              If you offer a high-ticket B2B service, a 1-click booking might attract unqualified leads. By adding a multi-step qualification form (asking about their revenue, biggest challenges, etc.), you introduce Positive Friction. This filters out bad leads, while simultaneously increasing the psychological investment of the good leads. They feel they are applying for something exclusive, rather than just filling out a contact form.
            </p>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">08 // Architecture of Proof</span>
          <h2 className="playbook-chapter-title">Structuring Irrefutable Validation</h2>
          <div className="playbook-content">
            <p>
              Most case studies are incredibly boring and poorly structured. They focus heavily on the vendor's methodology rather than the client's transformation.
            </p>
            <div className="playbook-insight">
              <p>"Your client is the hero (Luke Skywalker). You are the guide (Yoda). Never position yourself as the hero."</p>
            </div>
            <h3>The "S-B-A-R" Case Study Model:</h3>
            <ul>
              <li style={{ marginBottom: '12px' }}><strong>Situation:</strong> The painful baseline. Quantify the bleeding. (e.g., "Losing $50k/mo to churn.")</li>
              <li style={{ marginBottom: '12px' }}><strong>Barrier:</strong> Why they couldn't fix it themselves.</li>
              <li style={{ marginBottom: '12px' }}><strong>Action:</strong> What you deployed (keep it brief and focused).</li>
              <li style={{ marginBottom: '12px' }}><strong>Result:</strong> The hard metrics. Revenue gained, time saved, risk mitigated.</li>
            </ul>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">09 // The Revenue Engine</span>
          <h2 className="playbook-chapter-title">Moving from Static to Dynamic Systems</h2>
          <div className="playbook-content">
            <p>
              The era of the static website is over. A true revenue engine adapts to the user's context. 
            </p>
            <p>
              By leveraging dynamic personalization, you can alter your hero copy based on the ad campaign the user clicked. You can swap out case studies based on the user's inferred industry. If a user has visited your pricing page three times without converting, your system should automatically deploy an exit-intent offer or trigger an automated outreach email.
            </p>
            <p>
              <strong>Data is the fuel. Personalization is the engine. Conversion is the output.</strong>
            </p>
          </div>
        </section>

        <section className="playbook-chapter">
          <span className="playbook-chapter-number">10 // Deployment & Execution</span>
          <h2 className="playbook-chapter-title">The Next Steps</h2>
          <div className="playbook-content">
            <p>
              Reading about conversion physics is easy. Implementing it requires tearing down organizational assumptions and ego. We do not do "redesigns". We engineer revenue systems.
            </p>
            <p>
              If you are reading this, you have already taken the first step by bypassing the standard friction layers of the web. The next step is application. You must audit your cognitive load, inject proof at the point of friction, and establish aesthetic authority.
            </p>
            <p>
              We are currently accepting a limited number of partners for the upcoming quarter. If your revenue infrastructure is ready for institutional scale, return to the main site and book a strategy session.
            </p>
          </div>
        </section>

        <div className="playbook-action">
          <button 
            onClick={() => window.print()} 
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            <Download size={18} /> Save as PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default function PlaybookPage() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-muted)' }}><Lock size={16} /> Loading Playbook...</div>}>
      <PlaybookContent />
    </Suspense>
  );
}
