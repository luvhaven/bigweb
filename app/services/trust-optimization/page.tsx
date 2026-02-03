import CapabilityPageLayout from '@/components/services/CapabilityPageLayout';
import { getPageSections } from '@/lib/data/cms';

export default async function TrustOptimizationPage() {
    const route = '/services/trust-optimization';
    const sections = await getPageSections(route);

    return (
        <CapabilityPageLayout
            sections={sections}
            title="Performance & Trust Optimization"
            subtitle="INVISIBLE_FACTORS"
            description="We optimize the invisible factors that determine whether users trust and act."
            includes={['Core Web Vitals', 'SEO Foundations', 'Accessibility (WCAG)', 'Security Hardening', 'Trust Signals']}
            features={[
                {
                    title: "Instant Load",
                    desc: "Google loves fast sites. Users love them more. We aim for <500ms paint times.",
                    icon: "Timer"
                },
                {
                    title: "Credibility Stacking",
                    desc: "Badges, SSL, and subconscious signals that scream 'Safe' to the reptilian brain.",
                    icon: "Shield"
                },
                {
                    title: "Search Dominance",
                    desc: "Technical SEO that puts you in front of buyers at the exact moment of intent.",
                    icon: "Search"
                }
            ]}
            problem={{
                title: "The Invisible Wall",
                desc: "Users judge credibility in 50 milliseconds. Use generic design, stock photos, or slow loading, and they leave before reading a single word.",
                sideNot: "CREDIBILITY_SCORE_CRITICAL"
            }}
            methodology={{
                title: "Authority Protocol",
                steps: [
                    { title: "Core Vitals Audit", desc: "Identifying render-blocking resources that kill speed." },
                    { title: "Social Proof Stacking", desc: "Aggregating reviews, logos, and case studies into visual clusters." },
                    { title: "Accessibility Compliance", desc: "Ensuring 100% WCAG scores to signal professional robustness." },
                    { title: "Security Hardening", desc: "Implementing headers and SSL configs that banks use." }
                ]
            }}
            techStack={[
                { category: "Performance monitoring", tools: ["Google PageSpeed", "GTmetrix", "New Relic"] },
                { category: "Security", tools: ["Cloudflare Access", "OWASP ZAP", "Snyk"] },
                { category: "Compliance", tools: ["Axe DevTools", "Wave", "SortSite"] }
            ]}
            benefits={[
                {
                    title: "Traffic Retention",
                    desc: "Stop losing 50% of your clicks to slow loading screens. Keep what you pay for."
                },
                {
                    title: "Elite Perception",
                    desc: "A broken, slow site signals a broken business. We ensure you look invincible."
                }
            ]}
        />
    );
}
