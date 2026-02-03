import CapabilityPageLayout from '@/components/services/CapabilityPageLayout';
import { getPageSections } from '@/lib/data/cms';

export default async function ConversionSciencePage() {
    const route = '/services/conversion-science';
    const sections = await getPageSections(route);

    return (
        <CapabilityPageLayout
            sections={sections}
            title="Evidence-Based Conversion Science"
            subtitle="EMPIRICAL_DATA_V1"
            description="We apply the scientific method to your marketing funnel, turning guesses into validated growth."
            includes={['A/B Testing', 'Multivariate Experimentation', 'Heatmap Analysis', 'Eye-Tracking Data', 'Statistical Significance']}
            features={[
                {
                    title: "Hypothesis Testing",
                    desc: "Every design change starts with a data-backed hypothesis. We don't guess; we test.",
                    icon: "FlaskConical"
                },
                {
                    title: "Neural Mapping",
                    desc: "Using AI to predict where users will look and click before we even launch.",
                    icon: "Bot"
                },
                {
                    title: "Statistical Rigor",
                    desc: "We only declare winners when data reaches 95%+ statistical significance.",
                    icon: "BarChart3"
                }
            ]}
            problem={{
                title: "The Opinion Trap",
                desc: "Most marketing decisions are based on the 'HiPPO' (Highest Paid Person's Opinion), leading to wasted budget and sub-optimal conversion rates.",
                sideNot: "DETECTED_SUBOPTIMAL_DECISION_FRAME"
            }}
            methodology={{
                title: "Science Protocol",
                steps: [
                    { title: "Data Collection", desc: "Aggregating GA4, Hotjar, and log data into a single truth source." },
                    { title: "Heuristic Analysis", desc: "Manually audits of the journey through a psychological lens." },
                    { title: "Split Testing", desc: "Running isolated experiments to isolate variables." },
                    { title: "Scale Deployment", desc: "Rolling out winning versions to 100% of traffic." }
                ]
            }}
            techStack={[
                { category: "Experimentation", tools: ["Optimizely", "VWO", "Google Optimize"] },
                { category: "Analytics", tools: ["GA4", "Mixpanel", "PostHog"] },
                { category: "Behavioral", tools: ["Hotjar", "Microsoft Clarity", "FullStory"] }
            ]}
            benefits={[
                {
                    title: "Validated ROI",
                    desc: "Stop wondering 'is this working?' and start seeing the proof in your bank account."
                },
                {
                    title: "Permanent Gains",
                    desc: "Unlike ads, conversion gains are cumulative and permanent. Scale your business, keep the results."
                }
            ]}
        />
    );
}
