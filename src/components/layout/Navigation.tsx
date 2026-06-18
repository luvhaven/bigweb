'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from '@/lib/hooks';
import { NAV_LINKS, SERVICES } from '@/lib/constants';
import { ArrowRight, Mail, MapPin, ChevronDown } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';

function Logo() {
  const pathname = usePathname();
  const lenis = useLenis();
  
  const handleClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <Link href="/" className="logo-mark" aria-label="BIGWEB Digital Home" onClick={handleClick}>
      {/* Geometric mark */}
      <span className="logo-gem" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="9" height="9" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="12" y="1" width="9" height="9" fill="currentColor" opacity="0.8"/>
          <rect x="1" y="12" width="9" height="9" fill="currentColor" opacity="0.4"/>
          <rect x="12" y="12" width="9" height="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
        </svg>
      </span>
      {/* Wordmark */}
      <span className="logo-wordmark">
        <span className="logo-big">BIG</span><span className="logo-web">WEB</span>
        <span className="logo-digital">Digital</span>
      </span>
    </Link>
  );
}

export default function Navigation() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const pathname = usePathname();
  
  // Do not render global navigation in the admin dashboard
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeServiceHover, setActiveServiceHover] = useState<string | null>(null);

  const isScrolled = scrollY > 60;
  const isHidden = scrollDirection === 'down' && scrollY > 200 && !menuOpen && !megaMenuOpen;

  useEffect(() => { 
    setMenuOpen(false); 
    setMegaMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);
  
  useEffect(() => {
    document.body.style.overflow = (menuOpen || megaMenuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, megaMenuOpen]);

  // Handle setting default active service when mega menu opens
  useEffect(() => {
    if (megaMenuOpen && !activeServiceHover && SERVICES.length > 0) {
      setActiveServiceHover(SERVICES[0].slug);
    }
  }, [megaMenuOpen, activeServiceHover]);

  const activeServiceData = SERVICES.find(s => s.slug === activeServiceHover) || SERVICES[0];

  return (
    <>
      <nav 
        className={`nav ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`} 
        style={{
          borderBottom: (isScrolled || megaMenuOpen) ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
          transition: 'border-color 0.3s ease',
          background: megaMenuOpen ? 'var(--color-bg-primary)' : ''
        }}
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        <div className="nav-inner">
          <Logo />

          <div className="nav-links">
            {NAV_LINKS.map(link => {
              if (link.label === 'Services') {
                return (
                  <div 
                    key={link.href} 
                    className={`nav-link nav-services-trigger ${pathname.includes('/services') ? 'active' : ''} ${megaMenuOpen ? 'menu-open' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', userSelect: 'none' }}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    aria-haspopup="true"
                    aria-expanded={megaMenuOpen}
                  >
                    {link.label}
                    <motion.div 
                      initial={false}
                      animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'flex', color: megaMenuOpen ? 'var(--color-gold-bright)' : 'inherit', opacity: 0.7 }}
                    >
                      <ChevronDown size={14} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                  onMouseEnter={() => setMegaMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <button 
              className="nav-cmd-hint"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(212, 175, 106, 0.05)', border: '1px solid rgba(212, 175, 106, 0.2)',
                padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
                color: 'var(--color-text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em'
              }}
              title="Press Cmd+K to Search"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span style={{ fontFamily: 'monospace', opacity: 0.7 }}>⌘K</span>
            </button>
            <Link href="/contact" className="btn btn-primary nav-cta">
              Book a Free Call <ArrowRight size={14} />
            </Link>
          </div>

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.line 
                x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                animate={menuOpen ? { x1: 6, y1: 6, x2: 18, y2: 18 } : { x1: 4, y1: 6, x2: 20, y2: 6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.line 
                x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.line 
                x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                animate={menuOpen ? { x1: 6, y1: 18, x2: 18, y2: 6 } : { x1: 4, y1: 18, x2: 20, y2: 18 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            </motion.svg>
          </button>
        </div>

        {/* Desktop Mega Menu Overlay */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              className="desktop-mega-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                height: 'calc(100vh - 80px)', // Full viewport minus nav height
                background: 'rgba(5, 5, 5, 0.98)',
                backdropFilter: 'blur(40px)',
                display: 'flex',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'white',
                cursor: 'default',
                overflow: 'hidden'
              }}
            >
              {/* Left Column: Service List */}
              <div 
                data-lenis-prevent="true"
                style={{ 
                flex: '1', 
                padding: 'var(--space-16) var(--space-24)', 
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-8)',
                overflowY: 'auto'
              }}>
                <p className="section-label" style={{ marginBottom: 0 }}>Select a Service</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {SERVICES.map((service, index) => (
                    <Link 
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onMouseEnter={() => setActiveServiceHover(service.slug)}
                      onClick={() => setMegaMenuOpen(false)}
                      style={{
                        padding: 'var(--space-4) 0',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: activeServiceHover === service.slug ? 'var(--color-gold-bright)' : 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                        transform: activeServiceHover === service.slug ? 'translateX(10px)' : 'translateX(0)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)'
                      }}
                    >
                      <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', opacity: 0.5 }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Service Details Reveal */}
              <div style={{ flex: '1.2', padding: 'var(--space-16) var(--space-24)', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeServiceHover}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  >
                    <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                      <div style={{ background: 'rgba(212,175,106,0.1)', padding: 'var(--space-3) var(--space-4)', borderRadius: '0', border: '1px dashed rgba(212,175,106,0.4)' }}>
                        <p style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-gold-muted)', marginBottom: '4px', letterSpacing: '0.1em' }}>Investment</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-gold-bright)', fontWeight: 600 }}>{activeServiceData?.price}</p>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: 'var(--space-3) var(--space-4)', borderRadius: '0', border: '1px dashed rgba(255,255,255,0.15)' }}>
                        <p style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '4px', letterSpacing: '0.1em' }}>Timeline</p>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-text-primary)', fontWeight: 600 }}>{activeServiceData?.timeline}</p>
                      </div>
                    </div>

                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--space-4)' }}>
                      {activeServiceData?.outcome}
                    </h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '600px', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
                      {activeServiceData?.heroSubtitle}
                    </p>

                    <Link 
                      href={`/services/${activeServiceData?.slug}`}
                      onClick={() => setMegaMenuOpen(false)}
                      className="btn btn-outline group"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      View Full Details <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            role="dialog" 
            aria-modal="true"
            data-lenis-prevent="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%', transition: { delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-24) var(--space-8) var(--space-8)',
              overflowY: 'auto'
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-6)' }}>
              {NAV_LINKS.map((link, i) => {
                if (link.label === 'Services') {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, transition: { delay: i * 0.05, duration: 0.2 } }}
                      transition={{ delay: 0.1 + (i * 0.1), type: "spring", stiffness: 300, damping: 24 }}
                    >
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        style={{
                          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                          color: pathname.includes('/services') ? 'var(--color-gold-bright)' : 'var(--color-text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          lineHeight: 1.1,
                          fontWeight: 600,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {link.label}
                        <motion.div 
                          initial={false}
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          style={{ display: 'flex', color: mobileServicesOpen ? 'var(--color-gold-bright)' : 'inherit' }}
                        >
                          <ChevronDown size={28} strokeWidth={2.5} />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', paddingLeft: 'var(--space-4)', marginTop: 'var(--space-4)' }}
                          >
                            {SERVICES.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                  display: 'block',
                                  fontSize: '1.25rem',
                                  color: 'var(--color-text-secondary)',
                                  padding: 'var(--space-2) 0',
                                  fontFamily: 'var(--font-body)',
                                }}
                              >
                                {s.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { delay: i * 0.05, duration: 0.2 } }}
                    transition={{ delay: 0.1 + (i * 0.1), type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        color: pathname === link.href ? 'var(--color-gold-bright)' : 'var(--color-text-primary)',
                        textDecoration: 'none',
                        display: 'block',
                        lineHeight: 1.1,
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 + (NAV_LINKS.length * 0.1), type: "spring", stiffness: 300, damping: 24 }}
                style={{ marginTop: 'var(--space-4)' }}
              >
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  onClick={() => setMenuOpen(false)}
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem' }}
                >
                  Apply for Partnership <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                marginTop: 'auto',
                paddingTop: 'var(--space-8)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--color-text-tertiary)',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} /> hello@bigwebdigital.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} /> Lagos, NG
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
