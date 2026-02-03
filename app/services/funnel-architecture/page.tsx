import CapabilityPageLayout from '@/components/services/CapabilityPageLayout';
import { getPageSections } from '@/lib/data/cms';

export default async function FunnelArchitecturePage() {
    const route = '/services/funnel-architecture';
    const sections = await getPageSections(route);

    return (
        <CapabilityPageLayout
            sections={sections}
            title="Funnel & Journey Architecture"
            subtitle="PATHWAY_DESIGN_V3"
            description="We architect user journeys that move prospects from curiosity to commitment with clarity and intent."
            includes={['Journey Mapping', 'Lead Velocity Tracks', 'Behavioral Triggers', 'Conversion Loops', 'Friction Isolation']}
            features={[
                {
                    title: "Intent Mapping",
                    desc: "We align every page phase with the user's specific stage in the awareness cycle.",
                    icon: "Target"
                },
                {
                    title: "Friction Discovery",
                    desc: "Identifying the exact micro-moments where users drop off and why.",
                    icon: "Layers"
                },
                {
                    title: "Velocity Optimization",
                    desc: "Reducing the time between first touch and conversion through strategic staging.",
                    icon: "Zap"
                }
            ]}
            problem={{
                title: "The Choice Paradox",
                desc: "Too many options lead to zero action. Most funnels are leaky because they offer pathways that don't align with user motive.",
                sideNot: "DETECTED_PATHWAY_INEFFICIENCY"
            }}
            methodology={{
                title: "Architecture Protocol",
                steps: [
                    { title: "Behavioral Audit", desc: "Analyzing how users currently cross your digital threshold." },
                    { title: "Pathway Mapping", desc: "Designing a singular, undeniable route to the conversion event." },
                    { title: "High-Fidelity staging", desc: "Deploying high-intent landing zones that remove noise." },
                    { title: "Trigger Integration", desc: "Setting up behavioral triggers that catch users before they bounce." }
                ]
            }}
            techStack={[
                { category: "Tracking", tools: ["GTM", "Segment", "Heap"] },
                { category: "Logic", tools: ["PostHog", "Customer.io", "ActiveCampaign"] },
                { category: "Verification", tools: ["AB Tasty", "VWO", "Google Optimize"] }
            ]}
            benefits={[
                {
                    title: "Reduced Acquisition Cost",
                    desc: "Make every dollar of ad spend work harder by ensuring it lands on a journey built for conversion."
                },
                {
                    title: "Higher Lead Quality",
                    desc: "Filter for your dream clients automatically through pre-qualifying journey steps."
                }
            ]}
        />
    );
}
