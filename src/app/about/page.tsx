import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import LiquidGradient from '@/components/ui/LiquidGradient';
import GridDistortion from '@/components/ui/GridDistortion';
import { getTeamMembers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About \u2014 BIGWEB Digital',
  description: "We're a revenue-obsessed digital agency. We don't build pretty websites. We build machines that convert traffic into money.",
};

const VALUES = [
  {
    num: '01',
    title: 'Outcomes over aesthetics.',
    desc: "We've killed more \"award-worthy\" designs than we can count because they didn't convert. We'll always choose a 3% conversion lift over a design trophy.",
  },
  {
    num: '02',
    title: 'Honest before comfortable.',
    desc: "If we think you're not ready for what we offer, we'll tell you. If the problem isn't in your website, we'll tell you that too. Honesty builds longer relationships.",
  },
  {
    num: '03',
    title: 'Specificity over scope creep.',
    desc: "Every engagement we offer has a defined scope, a defined deliverable, and a defined outcome. You always know what you're getting \u2014 before you pay.",
  },
  {
    num: '04',
    title: 'Data, then intuition.',
    desc: 'Opinions are cheap. Data is expensive. We start every project by understanding what the numbers say \u2014 then we apply expertise on top of evidence.',
  },
];

const TEAM_STATS = [
  { num: 'Since 2018', label: 'Building elite revenue systems' },
  { num: '40+', label: 'Businesses transformed' },
  { num: '$2M+', label: 'In client revenue generated' },
  { num: '94%', label: 'Client retention rate' },
];

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <LiquidGradient />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <span className="section-label">WHO WE ARE</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 6vw, var(--text-8xl))',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 820,
              marginBottom: 'var(--space-8)',
            }}>
              We stopped building<br />pretty websites.{' '}
              <span className="text-gold">We started<br />building revenue.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)', maxWidth: 640, lineHeight: 1.75 }}>
              BIGWEB Digital was built by people who spent years watching businesses pour money into beautiful websites that did nothing.
            </p>
          </AnimateIn>

          {/* Inline stats strip */}
          <AnimateIn delay={3}>
            <div className="about-hero-stats">
              {TEAM_STATS.map((s) => (
                <div key={s.label} className="about-hero-stat">
                  <span className="about-hero-stat-num">{s.num}</span>
                  <span className="about-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Mission narrative */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="about-two-col">
            {/* Decorative visual / quote */}
            <AnimateIn>
              <div className="about-visual">
                <div className="about-visual-card" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'grayscale(0.8) brightness(0.2)', zIndex: 0
                  }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="about-visual-rule" />
                    <p className="about-visual-quote">
                      &ldquo;We made a deliberate choice: stop optimizing for aesthetics and start optimizing for outcomes. Our team combines deep frontend engineering, behavioral UX research, conversion rate optimization, and AI engineering &mdash; all pointed at one goal. Your revenue.&rdquo;
                    </p>
                    <div className="about-visual-author">
                      <span className="about-visual-rule-small" />
                      <span>BIGWEB Digital Founding Principle</span>
                    </div>
                  </div>
                </div>

                {/* Stats block */}
                <div className="about-stat-grid">
                  {TEAM_STATS.map((s) => (
                    <div key={s.label} className="about-stat-block">
                      <span className="about-stat-num">{s.num}</span>
                      <span className="about-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Narrative */}
            <div className="about-narrative">
              <AnimateIn delay={1}>
                <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                  We watched agencies celebrate award-winning design while clients&apos; revenue stayed flat. We watched &ldquo;growth strategists&rdquo; sell 6-month retainers with no defined deliverables and no accountability. We watched businesses pour money into ads without ever fixing the leaking funnel on the other end.
                </p>
              </AnimateIn>
              <AnimateIn delay={2}>
                <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                  So we built something different. A digital agency where every engagement has a defined scope, a defined deliverable, and a measurable outcome. Where &ldquo;we&apos;ll know it when we see it&rdquo; is not an acceptable project brief. Where revenue is the only metric that matters.
                </p>
              </AnimateIn>
              <AnimateIn delay={3}>
                <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                  We are selective. We take on clients we can genuinely help. We will tell you if you&apos;re not ready for what we offer. And when we do engage &mdash; we treat your growth like it&apos;s our own.
                </p>
              </AnimateIn>

              {/* Two-stat highlight */}
              <AnimateIn delay={4}>
                <div className="about-highlight-stats">
                  <div className="about-hl-stat">
                    <span className="about-hl-num">Since 2018</span>
                    <span className="about-hl-label">Building elite revenue systems</span>
                  </div>
                  <div className="about-hl-sep" />
                  <div className="about-hl-stat">
                    <span className="about-hl-num text-gold">Outcomes first</span>
                    <span className="about-hl-label">Philosophy since day one</span>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <GridDistortion opacity={0.2} gridSize={50} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <span className="section-label">HOW WE WORK</span>
            <h2 className="section-headline">Four principles.<br />Non-negotiable.</h2>
          </AnimateIn>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <AnimateIn key={v.num} delay={i + 1}>
                <div className="about-value-card card">
                  <span className="about-value-num">{v.num}</span>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <AnimateIn>
            <span className="section-label">THE TEAM</span>
            <h2 className="section-headline">The people behind<br />the numbers.</h2>
            <p style={{ maxWidth: 540, marginBottom: 'var(--space-12)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              High-ticket engagements deserve to know who they&apos;re working with. Here&apos;s who will be in your corner.
            </p>
          </AnimateIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            {teamMembers.map((member: { id: string; name: string; role: string; bio: string; initials: string; image: string | null }, i: number) => (
              <AnimateIn key={member.id} delay={i + 1}>
                <div className="card" style={{ padding: 'var(--space-8)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                    {/* Avatar: real photo if available, initials fallback */}
                    <div style={{
                      width: 60, height: 60, borderRadius: '50%',
                      flexShrink: 0, overflow: 'hidden', position: 'relative',
                      border: '2px solid rgba(212,175,106,0.35)',
                      background: 'linear-gradient(135deg, rgba(212,175,106,0.15), rgba(212,175,106,0.03))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="60px"
                          style={{ objectFit: 'cover', objectPosition: 'center top' }}
                          unoptimized={member.image.includes('daniel-orz.vercel.app')}
                        />
                      ) : (
                        <span style={{
                          fontSize: 14, fontWeight: 800,
                          color: 'var(--color-gold-bright)',
                          letterSpacing: '0.05em',
                        }}>
                          {member.initials}
                        </span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>{member.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold-bright)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 2 }}>{member.role}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.75, flex: 1 }}>{member.bio}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <AnimateIn>
            <div className="about-cta-block">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, var(--text-5xl))', fontWeight: 900, marginBottom: 'var(--space-4)', lineHeight: 1.15 }}>
                Work with people who care<br />about your <span className="text-gold">revenue.</span>
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: 460, margin: '0 auto var(--space-8)', fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
                Book a free diagnostic call. We&apos;ll look at your digital presence and tell you exactly where the opportunity is.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <MagneticButton href="/contact" className="btn btn-primary btn-lg">
                  Book a Free Call <ArrowRight size={16} />
                </MagneticButton>
                <Link href="/services" className="btn btn-outline btn-lg">
                  View Services
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
