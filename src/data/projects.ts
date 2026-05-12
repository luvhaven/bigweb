export const PROJECTS = [
    {
        id: 'techcorp-platform',
        name: 'TechCorp Enterprise OS',
        title: 'Unified Enterprise Intelligence & Collaboration Platform',
        category: 'SaaS / Enterprise OS',
        description: 'Engineered a mission-critical collaboration ecosystem for Fortune 500 teams, replacing legacy data silos with a real-time intelligence layer.',
        longDescription: 'A comprehensive architectural overhaul of TechCorp\'s global operations. We deployed a custom micro-frontend architecture that unified disparate workflows, resulting in a 40% measurable lift in team velocity. The system handles 10M+ daily concurrent events with sub-50ms latency.',
        challenge: 'TechCorp faced critical operational friction due to fragmented legacy stacks and asynchronous data silos, leading to an 18% annual revenue leak in communication overhead.',
        solution: 'We engineered a "Single Source of Truth" platform utilizing a real-time event-bus architecture. Integrated predictive analytics, role-based contextual UI, and automated compliance guardrails to eliminate manual friction.',
        results: [
            { label: 'Operational Velocity', value: '+42%' },
            { label: 'Platform Adoption', value: '98.5%' },
            { label: 'Friction Reduction', value: '65%' },
            { label: 'System Uptime', value: '99.99%' }
        ],
        image_url: '/artifacts/techcorp_platform_dashboard_1764589013521.png',
        gallery: [
            '/artifacts/techcorp_platform_dashboard_1764589013521.png',
        ],
        technologies: ['React', 'Node.js', 'AWS EventBridge', 'GraphQL Federation', 'Redis'],
        client: 'TechCorp International',
        year: '2024'
    },
    {
        id: 'finpay-wallet',
        name: 'FinPay Quantum Wallet',
        title: 'Institutional-Grade Digital Asset Custody & Payment Rails',
        category: 'Fintech / Blockchain',
        description: 'Bridging institutional liquidity with consumer-grade frictionlessness through a bank-grade mobile payment ecosystem.',
        longDescription: 'FinPay is a high-security digital asset gateway designed to handle mass-market crypto adoption. We engineered multi-party computation (MPC) cold-storage protocols within a consumer app experience, securing over $100M in transactional volume in its first quarter.',
        challenge: 'The "Complexity Gap"—consumer users found blockchain transactions intimidating, while institutional audits required zero-compromise security protocols that usually break UX.',
        solution: 'We implemented biometric-based key sharding, real-time AML/KYC automated verification, and a proprietary "Gas-Agnostic" transaction layer to remove technical barriers for non-crypto natives.',
        results: [
            { label: 'Transaction Vol.', value: '$100M+' },
            { label: 'Security Audits', value: 'Passed' },
            { label: 'Avg. UX CSAT', value: '4.95/5' },
            { label: 'KYC Sync Time', value: '-85%' }
        ],
        image_url: '/artifacts/finpay_wallet_app_1764589030619.png',
        gallery: ['/artifacts/finpay_wallet_app_1764589030619.png'],
        technologies: ['React Native', 'Rust', 'Ethers.js', 'Firebase Auth', 'MPC Vaults'],
        client: 'FinPay Global',
        year: '2024'
    },
    {
        id: 'healthtrack-app',
        name: 'HealthTrack AI Engine',
        title: 'Predictive Biometric Analytics & Remote Patient Monitoring',
        category: 'MedTech / AI',
        description: 'Translating raw telemetry from wearable sensors into clinical-grade predictive health outcomes using ML-driven pattern recognition.',
        longDescription: 'HealthTrack Pro utilizes deep learning ensembles to detect cardiovascular anomalies before they present as symptoms. By processing billions of telemetry points, we provided clinicians with a proactive diagnostic dashboard that reduced emergency department readmissions by 22%.',
        challenge: 'Noise-to-Signal ratio. Wearable data is notoriously erratic. We needed to filter environmental noise while maintaining 99%+ sensitivity for critical medical events.',
        solution: 'Engineered a distributed data pipeline using TensorFlow for real-time edge processing. Implemented HIPAA-compliant encryption-at-rest and a "Patient-First" data sovereignty architecture.',
        results: [
            { label: 'Diagnostic Sensitivity', value: '99.8%' },
            { label: 'Readmission Drop', value: '22%' },
            { label: 'Provider Efficiency', value: '3x' },
            { label: 'Live Data Streams', value: '500k+' }
        ],
        image_url: '/artifacts/healthtrack_dashboard_1764589047595.png',
        gallery: ['/artifacts/healthtrack_dashboard_1764589047595.png'],
        technologies: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL Timescale', 'GCP'],
        client: 'HealthTrack Systems',
        year: '2023'
    },
    {
        id: 'luxury-fashion',
        name: 'Maison 3D Experience',
        title: 'Spatial Commerce & High-Fidelity 3D Boutique Rendering',
        category: 'E-Commerce / Spatial Web',
        description: 'Redefining digital luxury through a WebGL-powered spatial commerce engine with photorealistic AR try-on capabilities.',
        longDescription: 'For Maison De Luxe, we eliminated the "Digital Discount" perception. We built a high-fidelity 3D rendering pipeline that streams boutique-quality assets to any device, increasing high-ticket conversion rates by 35% through tactile digital experiences.',
        challenge: 'Web Performance vs. Visual Quality. Standard 3D assets are too heavy for mobile web, but compression kills the "Luxury Feel" essential for high-ticket sales.',
        solution: 'Developed a custom glTF secondary streaming engine with level-of-detail (LOD) management. Integrated 8th Wall for browser-based AR try-ons without requiring an app download.',
        results: [
            { label: 'Conversion Lift', value: '+35%' },
            { label: 'High-Ticket Sales', value: '+28%' },
            { label: 'Avg. Time on Page', value: '5.2m' },
            { label: 'AR Engagement', value: '72%' }
        ],
        image_url: '/artifacts/luxury_fashion_ecommerce_1764589064929.png',
        gallery: ['/artifacts/luxury_fashion_ecommerce_1764589064929.png'],
        technologies: ['Next.js', 'Three.js / R3F', 'Shopify Hydrogen', 'Vercel', 'WebGL'],
        client: 'Maison De Luxe',
        year: '2024'
    },
    {
        id: 'ai-content-studio',
        name: 'OmniCreative AI Studio',
        title: 'Generative Workflow Orchestration for Media Agencies',
        category: 'AI / Creative Dev',
        description: 'A multi-modal co-pilot for high-volume creative agencies, automating assets generation from concept to delivery.',
        longDescription: 'AI Content Studio is a middleware layer that connects professional creative workflows with the state-of-the-art generative models. We reduced asset production cycles from days to minutes for global marketing teams, maintaining strict brand voice alignment.',
        challenge: 'Prompt Engineering Fatigue and Brand Inconsistency. Generative models without guardrails produce "hallucinations" that professional agencies cannot risk.',
        solution: 'We built a vector-database-backed "Brand Memory" system. LLMs are constrained by agency-specific style guides, ensuring every output is pre-aligned with client brand identity.',
        results: [
            { label: 'Production Speed', value: '15x' },
            { label: 'Agency Savings', value: '60%' },
            { label: 'Asset Consistency', value: '100%' },
            { label: 'User Satisfaction', value: '94%' }
        ],
        image_url: '/artifacts/ai_content_studio_1764589081328.png',
        gallery: ['/artifacts/ai_content_studio_1764589081328.png'],
        technologies: ['OpenAI / Anthropic', 'Pinecone', 'React', 'Node.js', 'Redis'],
        client: 'Creative AI Labs',
        year: '2024'
    }
]
