import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('🌱 Starting to seed 6 rich articles via Supabase REST...');

    const newArticles = [
        {
            title: 'The Shift from SEO to GAIO (Generative AI Optimization)',
            slug: 'shift-from-seo-to-gaio',
            excerpt: 'Traditional search is fracturing. Learn how to optimize your digital presence for LLMs like ChatGPT, Perplexity, and Gemini.',
            content: `# The Shift from SEO to GAIO (Generative AI Optimization)

For the past two decades, Search Engine Optimization (SEO) has been the cornerstone of digital marketing. Companies spent millions tweaking metadata, acquiring backlinks, and optimizing site speed to please Google's algorithms. 

But the landscape is fracturing. Today, users are bypassing traditional search engines altogether in favor of Large Language Models (LLMs) like ChatGPT, Claude, and Perplexity.

This marks the beginning of Generative AI Optimization (GAIO).

## What is GAIO?
Generative AI Optimization is the structural methodology of ensuring your brand, products, and insights are favorably cited by AI models when users ask direct questions. Unlike a search engine that returns ten blue links, an AI returns a synthesized, definitive answer. If you aren't part of that synthesized answer, you simply don't exist in the AI's reality.

### The Mechanics of Citation
LLMs rely on RAG (Retrieval-Augmented Generation) combined with their static training corpora. To optimize for them, you must provide strictly structured data, unambiguous brand entities, and high-density factual information. AI models prefer dense, authoritative content over keyword-stuffed filler.

## The Strategy for 2026
Stop writing for algorithms; write for logic parsers.
1. **Knowledge Graph Dominance**: Ensure all your company entities are perfectly interlinked.
2. **Dense Factuality**: Publish primary research, raw data, and unambiguous statistics. Models cite data, not opinion.
3. **Content Syndication**: Seed your insights across platforms that are definitively crawled by AI crawlers (Reddit, StackOverflow, heavily authoritative blogs).

The era of ten blue links is ending. The era of the definitive answer is here.`,
            category: 'Intelligence',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
            is_featured: true,
            is_published: true,
            read_time: '10 min read',
            views: 3120,
            created_at: new Date().toISOString()
        },
        {
            title: 'Architecting for Sub-Millisecond Latency in 2026',
            slug: 'architecting-sub-millisecond-latency',
            excerpt: 'Discover why speed is no longer a technical metric, but the ultimate conversion lever in enterprise software.',
            content: `# Architecting for Sub-Millisecond Latency in 2026

We've moved beyond the days where a 2-second load time was considered "acceptable." In high-stakes B2B SaaS and enterprise commerce, latency is directly correlated with revenue hemorrhage. E-commerce giant Amazon famously reported that every 100ms of latency cost them 1% in sales.

But how do we achieve sub-millisecond perceived latency?

## Edge Computing and Distributed Logic
The cloud is no longer a centralized data center; it's a global mesh. By pushing heavy server-side rendering logic to Edge function nodes (via Cloudflare or Vercel), we eliminate geographical network hops. 

## React Server Components (RSC)
By standardizing on frameworks like Next.js 15, we utilize React Server Components to stream data directly into the DOM tree before the client even parses JavaScript. This effectively brings Time to Interactive (TTI) to near-zero.

### The Death of the Loading Spinner
When you integrate Optimistic UI updates with RSCs, user actions (like adding to cart or updating a CRM database) are instantly reflected on the client side, while the server synchronization happens asynchronously in the background. The user never sees a spinner. They only experience a frictionless flow.

## The Bottom Line
If your digital platform still shows loading states, you are bleeding users to competitors who have engineered latency completely out of the equation.`,
            category: 'Engineering',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
            is_featured: true,
            is_published: true,
            read_time: '14 min read',
            views: 4500,
            created_at: new Date().toISOString()
        },
        {
            title: 'The Psychology of Premium UI: Why Aesthetic Excellence Sells',
            slug: 'psychology-of-premium-ui-sales',
            excerpt: 'Aesthetic-Usability Effect dictates that users perceive beautifully designed software as inherently more functional and trustworthy.',
            content: `# The Psychology of Premium UI: Why Aesthetic Excellence Sells

There is a long-standing myth in B2B software that "ugly but functional" is acceptable because enterprise users only care about features. This fundamentally misunderstands behavioral psychology.

The **Aesthetic-Usability Effect** is a well-documented cognitive bias indicating that users naturally perceive attractive interfaces as more usable. But beyond usability, aesthetic excellence generates something far more valuable: **Trust**.

## Implicit Authority
When a prospect lands on a digital property that utilizes flawless typography, smooth framer-motion kinetics, and surgical layouts, their brain implicitly maps those qualities onto your actual service. If the website is engineered with obsessive precision, the underlying product must be built the same way.

### The Apple Effect
Consider the unboxing experience of a premium laptop. The physical friction of the cardboard sliding, the smell of the packaging, the perfect alignment of the components. That premium physical aesthetic justifies the premium price tag.

In the digital world, your UI is the packaging.

## Micro-Interactions as Feedback Loops
A premium UI doesn't just sit there; it breathes. 
* A button that softly depresses and rebounds when clicked.
* A glassmorphic panel that blurs the underlying content dynamically.
* A 3D parallax hero stage that responds to the cursor.

These aren't just parlor tricks; they are constant neurological feedback loops telling the user: "This system is alive, it is watching your input, and it is executing flawlessly."

If you want to charge premium prices, you cannot show up with a commoditized aesthetic.`,
            category: 'Experience',
            image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd',
            is_featured: false,
            is_published: true,
            read_time: '12 min read',
            views: 2980,
            created_at: new Date().toISOString()
        },
        {
            title: 'Deploying Autonomous AI Agents in Customer Support',
            slug: 'autonomous-ai-agents-customer-support',
            excerpt: 'How leading enterprises are utilizing custom LLM agents to resolve 80% of support tickets without human intervention.',
            content: `# Deploying Autonomous AI Agents in Customer Support

Chatbots have a terrible reputation. For years, they were simply glorified decision trees that frustrated users and ultimately forced them to scream "SPEAK TO HUMAN" into the input field.

Autonomous AI Agents are not chatbots.

## The Agentic Shift
While a chatbot follows a script, an AI Agent uses an LLM (Large Language Model) as its reasoning engine. You equip the agent with tools (APIs, documentation access, CRM read/write abilities) and give it an objective. The agent dynamically charts the path to achieve that objective.

### The Real-World Application
Imagine a SaaS customer writing: *"My invoice is wrong, I downgraded last week but was charged the full amount."*

A traditional bot triggers the "Billing Flow" and asks for an invoice number.
An Autonomous Agent:
1. Validates the user's session via JWT token.
2. Calls the Stripe API to check the recent invoice.
3. Checks the internal database for the downgrade timestamp.
4. Identifies the discrepancy, issues a prorated refund via API.
5. Replies: *"I see the error. You downgraded on the 14th, but the billing cycle closed on the 15th before the webhook fired. I've already processed a $45 refund to your Visa ending in 4242."*

## The Financial Mechanics
Support teams scale linearly. AI agents scale infinitely. By utilizing agentic workflows, you can cut support overhead by 50% while simultaneously reducing customer response time from hours to seconds. The remaining human support staff shift from answering repetitive tasks to managing complex, high-value technical integrations.`,
            category: 'Intelligence',
            image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
            is_featured: true,
            is_published: true,
            read_time: '9 min read',
            views: 5200,
            created_at: new Date().toISOString()
        },
        {
            title: 'Monolithic Commerce is Dead: The Headless Era',
            slug: 'monolithic-commerce-is-dead-headless-era',
            excerpt: 'Why enterprise digital storefronts are abandoning traditional Shopify/Magento frontends for fully decoupled headless architectures.',
            content: `# Monolithic Commerce is Dead: The Headless Era

If your e-commerce frontend is tied to your inventory backend, your growth is inherently capped.

Traditional monolithic platforms (like standard Shopify, Magento, or WooCommerce) force you into rigid templating engines. You get the benefit of an all-in-one platform, but you pay the ultimate price: complete loss of performance control and aesthetic freedom.

## The Decoupled Future
Headless commerce separates the frontend presentation layer from the backend logic via APIs. You continue to use Shopify for checkout, inventory, and payment rails, but your actual website is a custom-built Next.js application.

### Why Does This Matter?
1. **Raw Speed**: Headless sites generated via Static Site Generation (SSG) load in under 200ms. Since speed directly correlates to Cart Abandonment, headless stores routinely see 20-40% conversion lifts immediately upon deployment.
2. **Omnichannel Dominance**: Because your backend is just an API, you can push products to an iOS app, a smart-watch, a VR environment, and a web storefront simultaneously without duplicating structural work.
3. **Limitless Design**: You are no longer constrained by Liquid templates. You can build cinematic WebGL product showcases, hyper-fluid transitions, and bespoke interactive cart experiences that are physically impossible on traditional platforms.

## The Cost of Transition
Transitioning to headless is an engineering investment. It requires utilizing intermediate layers (like Sanity CMS or Contentful) to manage non-product content. However, for stores generating over $5M in annual revenue, the conversion lift of a decoupled Next.js storefront offsets the development cost within the first 60 days.`,
            category: 'Engineering',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
            is_featured: false,
            is_published: true,
            read_time: '8 min read',
            views: 1800,
            created_at: new Date().toISOString()
        },
        {
            title: 'Forensic Conversion Rate Optimization (CRO)',
            slug: 'forensic-conversion-rate-optimization',
            excerpt: 'Stop relying on generic best practices. True CRO is an aggressive, data-driven science of eliminating psychological friction.',
            content: `# Forensic Conversion Rate Optimization (CRO)

Most agencies approach CRO like a guessing game. They change button colors from blue to red, rewrite a headline, and hope the analytics dashboard shows a green arrow next week. 

This is not optimization. This is gambling.

## The Forensic Approach
Forensic CRO relies on qualitative heatmapping, session recordings, and multivariate testing to discover the exact intersection of user intent and UI failure. 

At BIGWEB, we don't guess. We map user drop-off dynamically:
* Are users rage-clicking specific unlinked elements?
* How far down the viewport is the median scroll depth?
* Which specific form field causes the highest cart abandonment?

## Friction Points
The objective of a landing page is to generate momentum. Cognitive load destroys momentum.
If your pricing model requries a calculator to understand, you lose.
If your value proposition takes three paragraphs to explain, you lose.
If your contrast ratios make text unreadable on mobile devices on low brightness, you lose.

### The Fix
Optimization is subtraction. We systematically remove every element from the viewport that does not directly accelerate the user toward the primary Conversion Action. 

## Trust Signals
Once friction is removed, momentum must be fueled by Trust Signals. Authentic, verifiable data is the only currency that matters in B2B enterprise. 
Stop saying "We are the best." Start saying "$140M in generated client revenue across 42 campaigns in 2025."
Data defeats hesitation.`,
            category: 'Experience',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            is_featured: true,
            is_published: true,
            read_time: '11 min read',
            views: 4100,
            created_at: new Date().toISOString()
        }
    ];

    // Try parsing to 'articles' and 'blog_posts' based on data.ts schema fallbacks
    for (const article of newArticles) {
        const { error: err1 } = await supabase.from('blog_posts').upsert(article as any, { onConflict: 'slug' });
        const { error: err2 } = await supabase.from('articles').upsert(article as any, { onConflict: 'slug' });

        if (err1 && err2) {
            console.error('Failed to sync ' + article.slug + ' -> ', err1.message, err2.message);
        } else {
            console.log('✅ Synchronized article: ' + article.title);
        }
    }

    console.log('🎉 6 new rich articles successfully seeded to Supabase!');
}

main().catch(console.error);
