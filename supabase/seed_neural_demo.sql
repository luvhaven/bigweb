-- Seed a Neural Case Study for Demonstration
-- Checks if project exists by slug, if not inserts it.

INSERT INTO public.portfolio_projects (
    title,
    slug,
    client_name,
    category,
    description,
    challenge,
    solution,
    results,
    live_url,
    github_url,
    completion_date,
    status,
    is_featured,
    technologies,
    deconstructed_view,
    technical_details,
    image_url,
    hero_image_url
)
VALUES (
    'Nexus FinTech Core',
    'nexus-fintech-core',
    'Nexus Financial',
    'FinTech Platform',
    'A high-frequency trading platform rebuilt for microsecond latency and infinite scalability using Rust and edge-deployed WebSocket clusters.',
    'Nexus needed to process 50,000 transactions per second with sub-5ms latency while maintaining strict regulatory compliance and real-time fraud detection.',
    'We implemented a custom matching engine in Rust, wrapped in a Node.js event mesh. State is managed via Redis Cluster with tiered persistence, and the frontend connects via a custom binary WebSocket protocol for maximum throughput.',
    '["99.999% Uptime", "< 2ms Avg Latency", "$4B+ Processed Daily"]',
    'https://nexus.demo.bigweb.io',
    'https://github.com/bigweb/nexus-core',
    '2025-11-15',
    'published',
    true,
    ARRAY['Rust', 'Node.js', 'Redis', 'WebSockets', 'React', 'WebGL'],
    true,
    '{
        "architecture_url": "",
        "api_latency": "1.8ms",
        "core_features": "• Custom Binary Protocol over WSS\n• Lock-free Rust Matching Engine\n• Distributed Ledger via Kafka\n• Edge-Computed Fraud Analysis"
    }'::jsonb,
    '/images/projects/nexus-dashboard.jpg',
    '/images/projects/nexus-hero.jpg'
)
ON CONFLICT (slug) 
DO UPDATE SET 
    deconstructed_view = true,
    technical_details = EXCLUDED.technical_details,
    technologies = EXCLUDED.technologies,
    results = EXCLUDED.results;
