export const PROJECTS = [
    {
        id: 'techcorp-platform',
        name: 'TechCorp Enterprise Platform',
        title: 'TechCorp Enterprise Platform',
        category: 'SaaS',
        description: 'Cloud-based collaboration platform for enterprise teams',
        longDescription: 'A comprehensive overhaul of TechCorp\'s internal collaboration tools, resulting in a unified platform that increased team productivity by 40%. We built a scalable, secure, and intuitive interface that handles millions of daily interactions.',
        challenge: 'TechCorp was struggling with fragmented tools and data silos, leading to communication breakdowns and inefficiency. They needed a centralized solution that could scale with their rapid growth.',
        solution: 'We designed and developed a custom microservices architecture with a React-based frontend. Key features include real-time messaging, project management dashboards, and automated reporting workflows.',
        results: [
            { label: 'Productivity Increase', value: '40%' },
            { label: 'User Adoption', value: '95%' },
            { label: 'Reduction in Support Tickets', value: '60%' }
        ],
        image_url: '/artifacts/techcorp_platform_dashboard_1764589013521.png',
        gallery: [
            '/artifacts/techcorp_platform_dashboard_1764589013521.png',
            // Add more if available
        ],
        technologies: ['React', 'Node.js', 'AWS', 'GraphQL'],
        client: 'TechCorp Inc.',
        year: '2024'
    },
    {
        id: 'finpay-wallet',
        name: 'FinPay Digital Wallet',
        title: 'FinPay Digital Wallet',
        category: 'Fintech',
        description: 'Secure mobile payment solution with cryptocurrency integration',
        longDescription: 'FinPay is a next-generation digital wallet that bridges the gap between traditional banking and cryptocurrency. We focused on bank-grade security while maintaining a frictionless user experience.',
        challenge: 'Building a trustable financial app that simplifies complex crypto transactions for the average user, while adhering to strict regulatory compliance.',
        solution: 'We implemented biometric authentication, real-time fraud detection, and a simplified UI for crypto exchanges. The app supports multi-currency accounts and instant peer-to-peer transfers.',
        results: [
            { label: 'Transactions Processed', value: '$10M+' },
            { label: 'Active Users', value: '50k+' },
            { label: 'App Store Rating', value: '4.9' }
        ],
        image_url: '/artifacts/finpay_wallet_app_1764589030619.png',
        gallery: ['/artifacts/finpay_wallet_app_1764589030619.png'],
        technologies: ['React Native', 'Node.js', 'Blockchain', 'Firebase'],
        client: 'FinPay Ltd.',
        year: '2024'
    },
    {
        id: 'healthtrack-app',
        name: 'HealthTrack Pro',
        title: 'HealthTrack Pro',
        category: 'Healthcare',
        description: 'AI-powered health monitoring platform',
        longDescription: 'HealthTrack Pro leverages AI to provide personalized health insights. It connects with wearable devices to track vitals and predict potential health issues before they become critical.',
        challenge: 'Processing vast amounts of real-time health data accurately and presenting it in an understandable way to users and healthcare providers.',
        solution: 'We utilized machine learning algorithms to analyze vital signs. The dashboard visualizes trends and alerts users to anomalies. HIPAA-compliant architecture ensures data privacy.',
        results: [
            { label: 'Accuracy Rate', value: '99.8%' },
            { label: 'Data Points Processed', value: '1B+' },
            { label: 'Partner Clinics', value: '200+' }
        ],
        image_url: '/artifacts/healthtrack_dashboard_1764589047595.png',
        gallery: ['/artifacts/healthtrack_dashboard_1764589047595.png'],
        technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
        client: 'HealthTrack Systems',
        year: '2023'
    },
    {
        id: 'luxury-fashion',
        name: 'Luxury Fashion Store',
        title: 'Luxury Fashion Store',
        category: 'E-Commerce',
        description: 'Premium e-commerce experience with AR try-on',
        longDescription: 'An immersive e-commerce platform for a high-end fashion brand. The site features 3D product views and AR try-on capabilities, bringing the boutique experience to the digital world.',
        challenge: 'Replicating the tactile and exclusive feel of luxury shopping online, and reducing return rates through better visualization.',
        solution: 'We integrated WebGL for 3D model rendering and WebAR for virtual try-ons. The design focuses on minimalism and high-quality imagery to highlight the products.',
        results: [
            { label: 'Conversion Rate', value: '+35%' },
            { label: 'Return Rate Reduction', value: '20%' },
            { label: 'Avg. Session Duration', value: '4m' }
        ],
        image_url: '/artifacts/luxury_fashion_ecommerce_1764589064929.png',
        gallery: ['/artifacts/luxury_fashion_ecommerce_1764589064929.png'],
        technologies: ['Next.js', 'Three.js', 'Shopify Headless', 'Vercel'],
        client: 'Maison De Luxe',
        year: '2024'
    },
    {
        id: 'ai-content-studio',
        name: 'AI Content Studio',
        title: 'AI Content Studio',
        category: 'AI',
        description: 'Next-generation content creation platform',
        longDescription: 'AI Content Studio empowers creators to generate text, images, and videos in seconds. It serves as a co-pilot for creative professionals, streamlining the production workflow.',
        challenge: 'Creating an interface that makes complex generative AI models accessible and intuitive for non-technical creatives.',
        solution: 'We built a drag-and-drop interface with natural language prompting. The backend orchestrates multiple AI models to deliver high-quality outputs with low latency.',
        results: [
            { label: 'Content Generated', value: '5M+' },
            { label: 'User Efficiency Gain', value: '10x' },
            { label: 'Monthly Active Users', value: '100k' }
        ],
        image_url: '/artifacts/ai_content_studio_1764589081328.png',
        gallery: ['/artifacts/ai_content_studio_1764589081328.png'],
        technologies: ['OpenAI API', 'React', 'Node.js', 'Redis'],
        client: 'Creative AI Labs',
        year: '2024'
    },
    {
        id: 'crypto-exchange',
        name: 'CryptoVault Exchange',
        title: 'CryptoVault Exchange',
        category: 'Fintech',
        description: 'Institutional-grade cryptocurrency trading platform',
        longDescription: 'CryptoVault is designed for high-frequency traders and institutions. It offers sub-millisecond latency, advanced charting tools, and deep liquidity pools.',
        challenge: 'Ensuring zero downtime and handling massive spikes in trading volume during market volatility.',
        solution: 'We implemented a high-performance matching engine in Rust and a distributed microservices architecture. The frontend uses WebSockets for real-time data streaming.',
        results: [
            { label: 'Uptime', value: '99.999%' },
            { label: 'Trade Execution', value: '<1ms' },
            { label: 'Daily Volume', value: '$500M' }
        ],
        image_url: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80'],
        technologies: ['Rust', 'React', 'WebSockets', 'Kubernetes'],
        client: 'Vault Financial',
        year: '2023'
    },
    {
        id: 'ecosmart-home',
        name: 'EcoSmart Home',
        title: 'EcoSmart Home',
        category: 'IoT',
        description: 'Smart home automation app for energy efficiency',
        longDescription: 'EcoSmart Home connects all smart devices in a household to optimize energy usage. It learns user habits and automatically adjusts lighting and climate control to save money and the planet.',
        challenge: 'Interoperability between hundreds of different smart device brands and protocols.',
        solution: 'We developed a universal hub software that translates various IoT protocols (Zigbee, Z-Wave, WiFi) into a unified control layer. The app provides a simple, beautiful interface for complex automation.',
        results: [
            { label: 'Avg. Energy Savings', value: '25%' },
            { label: 'Devices Connected', value: '1M+' },
            { label: 'Carbon Offset', value: '50k Tons' }
        ],
        image_url: '/artifacts/ecosmart-mockup.png',
        gallery: ['/artifacts/ecosmart-mockup.png'],
        technologies: ['Flutter', 'IoT', 'Node.js', 'MQTT'],
        client: 'GreenLiving Co.',
        year: '2024'
    },
    {
        id: 'urban-eats',
        name: 'Urban Eats',
        title: 'Urban Eats',
        category: 'Mobile App',
        description: 'Hyper-local food delivery experience',
        longDescription: 'Urban Eats focuses on connecting foodies with hidden local gems. Unlike major delivery apps, it curates a selection of high-quality, authentic local restaurants and street food vendors.',
        challenge: 'Competing in a saturated market by offering a unique value proposition and superior user experience.',
        solution: 'We focused on "food discovery" with a visually rich, Instagram-like feed. The logistics engine optimizes for short-distance, eco-friendly deliveries (bikes/walkers).',
        results: [
            { label: 'Local Partners', value: '500+' },
            { label: 'Order Growth', value: '200% YoY' },
            { label: 'Customer Retention', value: '80%' }
        ],
        image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80'],
        technologies: ['React Native', 'Node.js', 'PostGIS', 'Stripe'],
        client: 'Urban Ventures',
        year: '2023'
    },
    {
        id: 'neon-realty',
        name: 'Neon Realty',
        title: 'Neon Realty',
        category: 'Real Estate',
        description: 'Immersive 3D real estate browsing platform',
        longDescription: 'Neon Realty transforms the home buying process with virtual tours. Users can walk through properties in high-fidelity 3D from the comfort of their couch.',
        challenge: 'Streaming high-quality 3D assets to web browsers without lag or long load times.',
        solution: 'We implemented progressive streaming and level-of-detail (LOD) rendering. The platform supports VR headsets for a fully immersive experience.',
        results: [
            { label: 'Time on Site', value: '15m' },
            { label: 'Sales Velocity', value: '+2x' },
            { label: 'Virtual Tours', value: '10k+' }
        ],
        image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'],
        technologies: ['React', 'Three.js', 'WebGL', 'Django'],
        client: 'Neon Properties',
        year: '2024'
    }
]
