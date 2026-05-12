import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';

interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  read_time: string;
  image: string;
}

export default function InsightsPreview({ articles }: { articles: Article[] }) {
  const [featured, ...rest] = articles.slice(0, 3);

  if (!featured) return null;

  return (
    <section className="section" id="insights" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">

        {/* Header row */}
        <div className="ip-header">
          <AnimateIn>
            <div>
              <span className="section-label">INSIGHTS</span>
              <h2 className="section-headline" style={{ marginBottom: 0 }}>
                Our thinking on revenue,<br />
                <span className="text-gold">digital, and the AI shift.</span>
              </h2>
            </div>
          </AnimateIn>
          <AnimateIn delay={2}>
            <Link href="/insights" className="ip-all-link">
              All articles <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>

        {/* Layout: featured left + 2 stacked right */}
        <div className="ip-grid">

          {/* Featured */}
          <AnimateIn delay={1}>
            <Link href={`/insights/${featured.slug}`} className="ip-featured card" data-cursor-hover>
                <div className="ip-card-bg" style={{ backgroundImage: `url(${featured.image})` }} />
                <div className="ip-featured-inner">
                  <span className="ip-cat">{featured.category}</span>
                  <h3 className="ip-featured-title">{featured.title}</h3>
                  <p className="ip-featured-excerpt">{featured.excerpt}</p>
                  <div className="ip-meta">
                    <span className="ip-readtime">{featured.read_time}</span>
                    <span className="ip-read-link">Read <ArrowUpRight size={13} /></span>
                  </div>
                </div>
            </Link>
          </AnimateIn>

          {/* Secondary stack */}
          <div className="ip-stack">
            {rest.map((article, i) => (
              <AnimateIn key={i} delay={i + 2}>
                <Link href={`/insights/${article.slug}`} className="ip-card card" data-cursor-hover>
                  <div className="ip-card-bg" style={{ backgroundImage: `url(${article.image})` }} />
                  <div className="ip-card-content">
                    <div>
                      <span className="ip-cat">{article.category}</span>
                      <h3 className="ip-card-title">{article.title}</h3>
                      <p className="ip-card-excerpt">{article.excerpt}</p>
                    </div>
                    <div className="ip-meta">
                      <span className="ip-readtime">{article.read_time}</span>
                      <span className="ip-read-link">Read <ArrowUpRight size={13} /></span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
