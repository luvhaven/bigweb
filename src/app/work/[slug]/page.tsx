import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllCaseStudySlugs, getCaseStudyBySlug } from '@/lib/data';
import AnimateIn from '@/components/ui/AnimateIn';
import TopographyField from '@/components/ui/TopographyField';
import MagneticButton from '@/components/ui/MagneticButton';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import RevenueChart from '@/components/ui/RevenueChart';

export const revalidate = 0;

export async function generateStaticParams() {
  return getAllCaseStudySlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: 'Case Study Not Found' };
  return {
    title: `${cs.client} Case Study — BIGWEB Digital`,
    description: cs.problem,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  // Custom data trajectories per case study
  let chartData;
  switch (slug) {
    case 'lumirae-ecommerce-turnaround':
      chartData = [
        { month: 'Month 1', revenue: 450000, label: 'Audit & Baseline' },
        { month: 'Month 2', revenue: 480000, label: 'UX Redesign' },
        { month: 'Month 3', revenue: 850000, label: 'New Checkout Live' },
        { month: 'Month 4', revenue: 1600000, label: 'Q4 Scaling' },
        { month: 'Month 5', revenue: 2100000, label: 'Holiday Peak' },
        { month: 'Month 6', revenue: 2850000, label: 'New Revenue Baseline' },
      ];
      break;
    case 'aethelgard-legal-authority':
      chartData = [
        { month: 'Q1', revenue: 1200000, label: 'Legacy Site' },
        { month: 'Q2', revenue: 1100000, label: 'Rebranding Phase' },
        { month: 'Q3', revenue: 2400000, label: 'New Site Launch' },
        { month: 'Q4', revenue: 3800000, label: 'SEO Authority Achieved' },
        { month: 'Q1', revenue: 5400000, label: 'Enterprise Retainers' },
      ];
      break;
    case 'kinetixia-saas-funnel':
      chartData = [
        { month: 'Jan', revenue: 85000, label: 'High Churn Baseline' },
        { month: 'Feb', revenue: 82000, label: 'Onboarding Audit' },
        { month: 'Mar', revenue: 145000, label: 'AI Concierge Deployed' },
        { month: 'Apr', revenue: 210000, label: 'Trial Conversion Doubles' },
        { month: 'May', revenue: 340000, label: 'Viral Expansion' },
        { month: 'Jun', revenue: 485000, label: 'Negative Churn Achieved' },
      ];
      break;
    default:
      chartData = undefined; // Uses default in component
  }

  return (
    <article className="page-transition" style={{ position: 'relative' }}>
      <section className="section" style={{ position: 'relative', paddingTop: 'calc(var(--nav-height) + var(--space-8))' }}>
        <TopographyField />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimateIn>
            <Link href="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ArrowLeft size={16} /> Back to Work
            </Link>
          </AnimateIn>

          <AnimateIn delay={1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              {(cs.tags as string[]).map((tag: string) => (
                <span key={tag} className="work-case-tag" style={{ background: 'rgba(212, 175, 106, 0.1)' }}>{tag}</span>
              ))}
            </div>
            <h1 className="hero-title">{cs.client}</h1>
            <p className="hero-subtitle" style={{ maxWidth: '800px', marginTop: 'var(--space-4)' }}>
              {cs.location} — {cs.timeline}
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <AnimateIn delay={2}>
            <div style={{ width: '100%', height: '60vh', minHeight: '400px', borderRadius: 'var(--space-2)', overflow: 'hidden', marginBottom: 'var(--space-12)' }}>
              <img src={cs.image} alt={`${cs.client} Project`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </AnimateIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-12)' }}>
            <div>
              <AnimateIn>
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <h3 style={{ color: 'var(--color-text-accent)', textTransform: 'uppercase', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>The Problem</h3>
                  <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{cs.problem}</p>
                </div>
              </AnimateIn>
              <AnimateIn delay={1}>
                <div>
                  <h3 style={{ color: 'var(--color-text-accent)', textTransform: 'uppercase', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>The Solution</h3>
                  <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{cs.delivered}</p>
                </div>
              </AnimateIn>
            </div>

            <div>
              <AnimateIn delay={2}>
                <div className="work-case-result-block" style={{ padding: 'var(--space-8)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--space-2)', border: '1px solid var(--color-bg-border)' }}>
                  <span style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', lineHeight: 1, fontWeight: 300, color: 'var(--color-text-primary)', display: 'block', marginBottom: 'var(--space-2)' }}>{cs.metric}</span>
                  <p style={{ color: 'var(--color-text-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{cs.metric_label}</p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{cs.result}</p>
                </div>
              </AnimateIn>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-16)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <AnimateIn>
              <h2 className="section-title" style={{ marginBottom: 'var(--space-6)' }}>The Transformation</h2>
              <BeforeAfterSlider 
                beforeImage={cs.before_image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"} 
                afterImage={cs.image} 
                beforeLabel="Old Revenue Engine"
                afterLabel="BIGWEB System"
              />
            </AnimateIn>
          </div>

          <div style={{ marginTop: 'var(--space-16)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <AnimateIn>
              <h2 className="section-title" style={{ marginBottom: 'var(--space-6)' }}>The Trajectory</h2>
              <RevenueChart data={chartData} />
            </AnimateIn>
          </div>

          <div style={{ marginTop: 'var(--space-16)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <AnimateIn>
              <h2 className="section-title" style={{ marginBottom: 'var(--space-6)' }}>The Deep Dive</h2>
              <p className="prose" style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                {cs.full_content}
              </p>
            </AnimateIn>
          </div>

          <div style={{ marginTop: 'var(--space-24)', textAlign: 'center', borderTop: '1px solid var(--color-bg-border)', paddingTop: 'var(--space-12)' }}>
            <AnimateIn>
              <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)' }}>Ready for results like these?</h2>
              <MagneticButton>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Book a Revenue Audit
                </Link>
              </MagneticButton>
            </AnimateIn>
          </div>
        </div>
      </section>
    </article>
  );
}
