import Link from 'next/link';
import { getServices } from '@/lib/data';

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
    </svg>
  );
}

export default async function Footer() {
  const SERVICES = await getServices();
  const tier1 = SERVICES.filter((s: { tier: number }) => s.tier === 1);
  const tier2 = SERVICES.filter((s: { tier: number }) => s.tier === 2);
  const tier3 = SERVICES.filter((s: { tier: number }) => s.tier === 3);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="logo-mark" aria-label="BIGWEB Digital Home">
            <span className="logo-gem" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="12" y="1" width="9" height="9" fill="currentColor" opacity="0.8"/>
                <rect x="1" y="12" width="9" height="9" fill="currentColor" opacity="0.4"/>
                <rect x="12" y="12" width="9" height="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
              </svg>
            </span>
            <span className="logo-wordmark">
              <span className="logo-big">BIG</span><span className="logo-web">WEB</span>
              <span className="logo-digital">Digital</span>
            </span>
          </Link>

          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X / Twitter">
              <XIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
              <YouTubeIcon />
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            {[...tier1, ...tier2.slice(0, 2)].map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">More Services</h4>
            {[...tier2.slice(2), ...tier3.slice(0, 2)].map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/work">Work</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <Link href="/contact">Book a Call</Link>
            <a href="mailto:hello@bigwebdigital.com">hello@bigwebdigital.com</a>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', paddingTop: 'var(--space-1)' }}>
              Lagos, Nigeria
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BIGWEB Digital. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/client">Client Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
