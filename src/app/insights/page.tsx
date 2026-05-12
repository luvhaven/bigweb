import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import AsciiArt from '@/components/ui/AsciiArt';
import TopographyField from '@/components/ui/TopographyField';
import { getArticles } from '@/lib/data';
import { NewsletterForm } from '@/components/sections/ContactForm';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Insights — BIGWEB Digital',
  description: 'Our thinking on revenue, digital strategy, and the AI shift. Actionable insights for business leaders.',
};

export default async function InsightsPage() {
  const allArticles = await getArticles();
  const featured = allArticles[0];
  const rest = allArticles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))', background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <span className="section-label">INSIGHTS</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h1 className="insights-h1">
              Our thinking on revenue,<br />
              digital, and the <span className="text-gold text-gold-breathing">AI shift.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p className="insights-sub">
              Actionable insights from the intersection of strategy, technology, and revenue growth.
              No fluff. No thought-leadership theater.
            </p>
          </AnimateIn>
          <AnimateIn delay={3}>
            <div className="insights-stats">
              <div className="insights-stat">
                <span className="insights-stat-n">{allArticles.length}</span>
                <span className="insights-stat-l">articles published</span>
              </div>
              <div className="insights-stat-divider" />
              <div className="insights-stat">
                <span className="insights-stat-n">1/wk</span>
                <span className="insights-stat-l">newsletter cadence</span>
              </div>
              <div className="insights-stat-divider" />
              <div className="insights-stat">
                <span className="insights-stat-n">0</span>
                <span className="insights-stat-l">sponsored posts, ever</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="section" style={{ background: 'var(--color-bg-secondary)', paddingTop: 0 }}>
          <div className="container">
            <AnimateIn>
              <Link href={`/insights/${featured.slug}`} className="ins-featured card" data-cursor-hover style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${featured.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  filter: 'grayscale(0.6) brightness(0.4)', transition: 'all 0.6s ease',
                  zIndex: 0
                }} className="ins-bg" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(8,7,6,0.95) 100%)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', minHeight: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                    <span className="ins-cat">{featured.category}</span>
                    <span className="ins-badge">Featured</span>
                  </div>
                  <h2 className="ins-featured-title">{featured.title}</h2>
                  <p className="ins-featured-excerpt">{featured.excerpt}</p>
                  <div className="ins-meta">
                    <span className="ins-time">{featured.read_time}</span>
                    <span className="ins-read">Read Article <ArrowUpRight size={14} /></span>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="section" style={{ background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <TopographyField />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <p className="insights-grid-heading">All articles</p>
          </AnimateIn>
          <div className="insights-grid">
            {rest.map((article, i) => (
              <AnimateIn key={article.slug} delay={(i % 3) + 1}>
                <Link href={`/insights/${article.slug}`} className="ins-card card" data-cursor-hover style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${article.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'grayscale(0.6) brightness(0.4)', transition: 'all 0.6s ease',
                    zIndex: 0
                  }} className="ins-bg" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(8,7,6,0.95) 100%)', zIndex: 0 }} />
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end', gap: 'var(--space-4)', minHeight: '260px', paddingTop: 'var(--space-16)' }}>
                    <div>
                      <span className="ins-cat">{article.category}</span>
                      <h3 className="ins-card-title">{article.title}</h3>
                      <p className="ins-card-excerpt">{article.excerpt}</p>
                    </div>
                    <div className="ins-meta">
                      <span className="ins-time">{article.read_time}</span>
                      <span className="ins-read">Read <ArrowUpRight size={13} /></span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section" style={{ background: 'var(--color-bg-tertiary)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <AnimateIn>
            <span className="section-label">REVENUE INTELLIGENCE</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, var(--text-4xl))', fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1.15, margin: 'var(--space-4) 0 var(--space-4)' }}>
              One email. One insight.<br /><span className="text-gold">Every week.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={1}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
              We write one email per week on revenue, AI, and conversion strategy. No fluff, no filler, no sponsored content &mdash; ever. The next one arrives Tuesday.
            </p>
          </AnimateIn>
          <AnimateIn delay={2}>
            <NewsletterForm />
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
