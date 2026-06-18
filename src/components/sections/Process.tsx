import AnimateIn from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import { Search, ClipboardCheck, Hammer, BarChart3 } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    title: 'Diagnose',
    duration: '1â€“3 days',
    description: "We don't guess. We analyze your analytics, user behavior, conversion data, and competitive landscape. We tell you exactly where money is leaking before we propose anything.",
    icon: <Search size={20} />,
    detail: 'Heatmaps Â· Session recording Â· Funnel analysis Â· Competitor audit',
  },
  {
    step: '02',
    title: 'Prescribe',
    duration: '1 day',
    description: "Based on the diagnosis, we recommend the exact service that fits your situation â€” not the most expensive option. We're playing the long game.",
    icon: <ClipboardCheck size={20} />,
    detail: 'Prioritized fix list Â· ROI estimates Â· Clear scope Â· Fixed price',
  },
  {
    step: '03',
    title: 'Build',
    duration: '2â€“3 weeks',
    description: "AI-assisted development, tight scopes, and daily communication. You're never left wondering what's happening. Most Tier 1 engagements go live in under 3 weeks.",
    icon: <Hammer size={20} />,
    detail: 'Weekly check-ins Â· Staging previews Â· Iterative delivery',
  },
  {
    step: '04',
    title: 'Measure',
    duration: 'Ongoing',
    description: "Every engagement ends with a results report. Not a pretty PDF â€” actual metrics. Revenue delta. Conversion rate changes. Traffic impact. We put our name on numbers.",
    icon: <BarChart3 size={20} />,
    detail: 'Revenue delta Â· Conversion rate Â· Traffic impact Â· Monthly review',
  },
];

export default function Process() {
  return (
    <section className="section" id="process" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <AnimateIn>
          <span className="section-label">OUR PROCESS</span>
        </AnimateIn>
        <div className="proc-header">
          <AnimateIn delay={1}>
            <h2 className="section-headline" style={{ marginBottom: 0 }}>
              No surprises.<br /><span className="text-gold">Just results.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p className="proc-sub">
              Four steps. Every engagement. Zero ambiguity about what happens next or what success looks like.
            </p>
          </AnimateIn>
        </div>

        <div className="proc-grid">
          {processSteps.map((s, i) => (
            <AnimateIn key={i} delay={i + 1}>
              <TiltCard maxTilt={8}>
                <div className="proc-card card" data-step={s.step}>
                  {/* Top: icon + duration */}
                  <div className="proc-card-top">
                    <div className="proc-icon-wrap">
                      <span className="proc-step-num">{s.step}</span>
                      <div className="proc-icon">{s.icon}</div>
                    </div>
                    <span className="proc-duration">{s.duration}</span>
                  </div>

                  {/* Title */}
                  <h3 className="proc-title">{s.title}</h3>

                  {/* Description */}
                  <p className="proc-desc">{s.description}</p>

                  {/* Detail tag row */}
                  <div className="proc-details">
                    {s.detail.split(' Â· ').map(d => (
                      <span key={d} className="proc-tag">{d}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </AnimateIn>
          ))}
        </div>
      </div>

      
    </section>
  );
}
