import CapabilityPageLayout from '@/components/services/CapabilityPageLayout';
import { getPageSections } from '@/lib/data/cms';

export default async function WebEngineeringPage() {
    const route = '/services/web-engineering';
    const sections = await getPageSections(route);

    return (
        <CapabilityPageLayout
            sections={sections}
            title="Conversion Website Engineering"
            subtitle="SYSTEM_ARCHITECT_V1"
            description="We design and build websites engineered to guide decisions, remove friction, and convert traffic into action."
            includes={['UI/UX Design', 'Frontend Development', 'Backend Systems', 'Performance Optimization', 'Mobile Architecture', 'Conversion Layouts']}
            features={[
                {
                    title: "Decision Architecture",
                    desc: "We limit choices to guide users toward the conversion event. Every element has a job.",
                    icon: "Layout"
                },
                {
                    title: "Visual Hierarchy",
                    desc: "Every pixel is placed to support the narrative arc of the sale. We control the eye.",
                    icon: "Eye"
                },
                {
                    title: "Code Velocity",
                    desc: "Sub-100ms load times to prevent bounce and maximize trust. Speed is a feature.",
                    icon: "Rocket"
                }
            ]}
            problem={{
                title: "The Latency Trap",
                desc: "53% of mobile visits are abandoned if a site takes longer than 3 seconds to load. Most 'modern' websites are bloated with uncompressed assets and blocking scripts that bleed revenue.",
                sideNot: "DETECTED_LATENCY_SPIKE_AT_RENDER"
            }}
            methodology={{
                title: "Engineering Protocol",
                steps: [
                    { title: "Code Audit", desc: "We strip your current build to the studs, identifying legacy bloat." },
                    { title: "Modular Reconstruction", desc: "Rebuilding core components with React Server Components for instant hydration." },
                    { title: "Edge Deployment", desc: "Pushing logic to the edge (Vercel/Cloudflare) to reduce TTFB to <50ms." },
                    { title: "Conversion Validation", desc: "Stress-testing layout shifts against conversion KPIs." }
                ]
            }}
            techStack={[
                { category: "Core Framework", tools: ["Next.js", "React Server Components", "TypeScript"] },
                { category: "Performance", tools: ["Vercel Edge Functions", "Redis/Upstash", "TurboPack"] },
                { category: "Styling", tools: ["TailwindCSS", "Framer Motion", "CSS Modules"] },
                { category: "Quality Assurance", tools: ["Playwright", "Lighthouse CI", "Jest"] }
            ]}
            benefits={[
                {
                    title: "Higher Revenue Per Visitor",
                    desc: "Turn more existing traffic into paying customers by removing structural friction."
                },
                {
                    title: "Brand Authority",
                    desc: "Position yourself as the undisputed leader in your sector with elite-tier aesthetics."
                }
            ]}
        />
    );
}
