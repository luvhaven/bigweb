export const caseStudies = [
    {
        slug: 'fintech-revolution',
        title: 'FinTech Revolution: AI-Powered Banking App',
        client: 'NeoBank Corp',
        summary: 'Redesigned a legacy banking platform into an AI-driven mobile experience, increasing user engagement by 400%.',
        challenge: 'The client struggled with a 10-year-old legacy system that was losing users to modern competitors. They needed a complete overhaul without disrupting service for 2M+ users.',
        solution: 'We architected a hybrid migration strategy, rebuilding the frontend in React Native while gradually replacing backend services with Node.js microservices.',
        results: [
            '400% Increase in Daily Active Users',
            '2.5M App Downloads in 6 Months',
            '4.9/5 App Store Rating (up from 2.1)',
            '30% Reduction in Operational Costs'
        ],
        technologies: ['React Native', 'Node.js', 'TensorFlow', 'AWS'],
        image: '/portfolio/fintech.jpg',
        author: {
            name: 'Alex Rivera',
            role: 'Lead Architect',
            image: '/team/alex-rivera.jpg',
        },
        date: '2025-08-15',
    },
    {
        slug: 'global-ecommerce',
        title: 'Global E-Commerce Scale: 10M+ SKU Platform',
        client: 'FashionGlobal',
        summary: 'Architected a headless commerce solution for a global retailer, handling peak traffic of 100k requests/second.',
        challenge: 'Black Friday crashes were costing the client millions. They needed a platform that could scale infinitely and load instantly globally.',
        solution: 'We implemented a headless architecture using Next.js on the edge, coupled with a Redis caching layer and Shopify Plus for transaction processing.',
        results: [
            '99.99% Uptime during Black Friday',
            '30% Conversion Rate Uplift',
            '200ms Average Page Load Time',
            'Zero Downtime Deployment Pipeline'
        ],
        technologies: ['Next.js', 'Shopify Plus', 'Redis', 'Vercel'],
        image: '/portfolio/ecommerce.jpg',
        author: {
            name: 'Sarah Chen',
            role: 'UX Director',
            image: '/team/sarah-chen.jpg',
        },
        date: '2025-06-10',
    },
    {
        slug: 'healthcare-ai',
        title: 'Healthcare AI: Diagnostic Assistant',
        client: 'MedTech Solutions',
        summary: 'Developed an HIPAA-compliant AI assistant to help radiologists detect anomalies with 98% accuracy.',
        challenge: 'Radiologists were overwhelmed with scan volume, leading to potential burnout and missed diagnoses. The client needed an AI second opinion tool.',
        solution: 'We trained a custom computer vision model on 100k+ anonymized scans, wrapped in a secure, HIPAA-compliant Python backend.',
        results: [
            '98% Diagnostic Accuracy',
            '50% Faster Scan Analysis',
            'Full HIPAA Compliance Certification',
            'Adopted by 5 Major Hospital Networks'
        ],
        technologies: ['Python', 'PyTorch', 'AWS', 'Docker'],
        image: '/portfolio/healthcare.jpg',
        author: {
            name: 'Alex Rivera',
            role: 'AI Lead',
            image: '/team/alex-rivera.jpg',
        },
        date: '2025-03-22',
    },
]
