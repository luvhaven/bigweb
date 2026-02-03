import CapabilityPageLayout from '@/components/services/CapabilityPageLayout';
import { getPageSections } from '@/lib/data/cms';

export default async function RevenueSystemsPage() {
    const route = '/services/revenue-systems';
    const sections = await getPageSections(route);

    return (
        <CapabilityPageLayout
            sections={sections}
            title="Revenue Management Systems"
            subtitle="COMMERCE_CORE_V1"
            description="We build the infrastructure that powers high-volume transactions and recurring revenue models."
            includes={['Subscription Logic', 'Billing Automation', 'Customer LTV Tracks', 'Churn Mitigation', 'Revenue Recovery']}
            features={[
                {
                    title: "Frictionless Billing",
                    desc: "Integrating Stripe/Adyen at the architecture level to ensure zero drop-off at checkout.",
                    icon: "Zap"
                },
                {
                    title: "Lifecycle Automation",
                    desc: "Automated upsells and credit card recovery based on user behavior data.",
                    icon: "Users"
                },
                {
                    title: "Intelligence Layer",
                    desc: "Real-time dashboards showing MRR, churn, and LTV without manual exports.",
                    icon: "BarChart3"
                }
            ]}
            problem={{
                title: "The Leakage Problem",
                desc: "Most revenue systems lose 15-20% of potential billing due to failed cards, complex checkouts, and lack of automated follow-up.",
                sideNot: "DETECTED_REVENUE_LEAK_IN_LOGS"
            }}
            methodology={{
                title: "Scale Protocol",
                steps: [
                    { title: "Flow Audit", desc: "Mapping current checkout steps to find abandonment spikes." },
                    { title: "API Integration", desc: "Setting up webhooks for real-time reconciliation." },
                    { title: "Churn Shield", desc: "Implementing dunning sequences that win back lost sales." },
                    { title: "LTV Optimization", desc: "Designing post-purchase paths that increase order value." }
                ]
            }}
            techStack={[
                { category: "Payment Engine", tools: ["Stripe", "Chargebee", "Paddle"] },
                { category: "CRM / Data", tools: ["HubSpot", "Segment", "Amplitude"] },
                { category: "Infrastructure", tools: ["Serverless Cron", "Kafka", "Postgres"] }
            ]}
            benefits={[
                {
                    title: "Predictable Growth",
                    desc: "Turn your revenue into a math problem. Predictable inputs lead to predictable outputs."
                },
                {
                    title: "Zero Admin Overhead",
                    desc: "Automate the grunt work of billing so you can focus on product and strategy."
                }
            ]}
        />
    );
}
