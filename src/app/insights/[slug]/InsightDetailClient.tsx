'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import { NewsletterForm } from '@/components/sections/ContactForm';

type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  body?: string;
  read_time: string;
  image: string;
};

function renderMarkdown(md: string) {
  // Simple markdown-to-HTML renderer for article body
  const lines = md.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginTop: 'var(--space-12)', marginBottom: 'var(--space-4)' }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-3)' }}>{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ marginBottom: 'var(--space-6)', paddingLeft: 'var(--space-6)' }}>
          {items.map((item, j) => <li key={j} style={{ marginBottom: 'var(--space-2)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />)}
        </ul>
      );
      continue;
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(<p key={i} style={{ marginBottom: 'var(--space-6)' }} dangerouslySetInnerHTML={{ __html: inlineMd(line) }} />);
    }
    i++;
  }
  return elements;
}

function inlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color: var(--color-text-primary); font-weight: 600;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background: var(--color-bg-secondary); padding: 2px 6px; border-radius: 3px; font-size: 0.9em;">$1</code>');
}

export default function InsightDetailClient({
  article,
  relatedArticles,
}: {
  article: Article;
  relatedArticles: Article[];
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero / Cover */}
      <section className="section" style={{ position: 'relative', height: '80vh', minHeight: '600px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', padding: 0 }}>
        <div 
          style={{
            position: 'absolute',
            inset: -100,
            backgroundImage: `url(${article.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(0.6) brightness(0.3)',
            transform: `translateY(${scrollY * 0.4}px)`,
            zIndex: 0,
          }} 
          aria-hidden="true"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,7,6,0.1) 0%, rgba(8,7,6,1) 100%)', zIndex: 1 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 'var(--space-12)' }}>
          <AnimateIn>
            <Link href="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-gold-muted)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 'var(--space-8)' }} data-cursor-hover>
              <ArrowLeft size={16} /> Back to Insights
            </Link>
          </AnimateIn>
          
          <AnimateIn delay={1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', padding: 'var(--space-1) var(--space-3)', border: '1px solid var(--color-gold-muted)', borderRadius: '100px' }}>
                {article.category}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                {article.read_time}
              </span>
            </div>
          </AnimateIn>

          <AnimateIn delay={2}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-7xl))', fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1.1, marginBottom: 'var(--space-6)', maxWidth: 1000, color: 'var(--color-text-primary)' }}>
              {article.title}
            </h1>
          </AnimateIn>

          <AnimateIn delay={3}>
            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)', maxWidth: 700, lineHeight: 1.6 }}>
              {article.excerpt}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Article Body */}
      <section className="section" style={{ background: 'var(--color-bg-primary)', paddingTop: 'var(--space-12)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <AnimateIn>
            <div className="prose" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>
              {article.body ? renderMarkdown(article.body) : (
                <p><em>Article content coming soon.</em></p>
              )}
            </div>
          </AnimateIn>
          
          {/* Author / Share */}
          <AnimateIn delay={1}>
            <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-bg-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-bright)', fontWeight: 700 }}>
                  BW
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>BIGWEB Strategy Team</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>Published automatically</div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Newsletter Inject */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center', padding: 'var(--space-12)', border: '1px solid var(--color-bg-border)', borderRadius: '12px' }}>
          <AnimateIn>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Enjoying this read?</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>Join 5,000+ leaders getting our best revenue insights delivered weekly.</p>
            <NewsletterForm />
          </AnimateIn>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <AnimateIn>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 700 }}>Keep Reading</h2>
              <Link href="/insights" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-gold-bright)', fontWeight: 600 }} data-cursor-hover>
                View All <ArrowUpRight size={16} />
              </Link>
            </div>
          </AnimateIn>
          
          <div className="insights-grid">
            {relatedArticles.map((rel, i) => (
              <AnimateIn key={rel.slug} delay={i + 1}>
                <Link href={`/insights/${rel.slug}`} className="ins-card card" data-cursor-hover style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${rel.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'grayscale(0.6) brightness(0.4)', transition: 'all 0.6s ease',
                    zIndex: 0
                  }} className="ins-bg" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(8,7,6,0.95) 100%)', zIndex: 0 }} />
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end', gap: 'var(--space-4)', minHeight: '260px', paddingTop: 'var(--space-16)' }}>
                    <div>
                      <span className="ins-cat">{rel.category}</span>
                      <h3 className="ins-card-title">{rel.title}</h3>
                    </div>
                    <div className="ins-meta">
                      <span className="ins-time">{rel.read_time}</span>
                      <span className="ins-read">Read <ArrowUpRight size={13} /></span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
