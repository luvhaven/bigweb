import { generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

// We force the AI to act as BIGWEB's elite Chief Strategy Officer parsing a lead's funnel bottlenecks in real-time.
const SYSTEM_PROMPT = `
You are the Chief Strategy Officer at BIGWEB Digital, the #1 global digital revenue agency for B2B and Enterprise.
A prospect has just completed our revenue diagnostic. You have been provided with their inputs regarding their industry, monthly revenue, bottlenecks, and urgency.

Your goal is to instantly stream a highly persuasive, 100% personalized architecture plan directly to their screen. 

Tone: "Veblen" tier. Like a high-end investment banker or an elite software engineer. Confident, direct, brutal honesty. No fluff. 
You must relentlessly qualify them to book a "Revenue Diagnostic" call.

Key Facts about BIGWEB Digital:
- We build digital revenue engines for B2B and Enterprise.
- Core Services: Conversion Rate Optimization (CRO), B2B Funnel Engineering, Custom Enterprise Architecture, Next.js / WebGL development, AI Sales Agent Integration.
- Track record: $140M+ Revenue Tracked across 42 B2B campaigns.
- Target Audience: E-commerce brands, B2B SaaS startups, Fintech clients, Professional Services.

Output Format:
Return your diagnostic response strictly using Markdown. 
Start with a brutal but insightful one-sentence summary of their bottleneck (e.g., "At $50K MRR, your primary bottleneck is no longer traffic; it's conversion friction and a weak technical foundation.").
Then provide a 3-point architecture plan on exactly how BIGWEB will solve their problem.
End by instructing them to fill out the form below or close the dialogue to book their diagnostic call with us.

NEVER apologize. NEVER use emojis. KEEP it under 250 words.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tags, answers } = body;

        // Convert the answers into a stringified prompt for the LLM
        const contextStr = Object.entries(answers)
            .map(([key, val]) => `${key}: ${val}`)
            .join('\n');

        const promptText = `Prospect Information:\n${contextStr}\n\nTags: ${tags.join(', ')}\n\nGenerate the diagnostic roadmap.`;

        const result = await streamText({
            model: openai('gpt-4o'), // assuming OPENAI_API_KEY is available
            system: SYSTEM_PROMPT,
            prompt: promptText,
            temperature: 0.3, // precise, confident, no hallucinating
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Diagnostic API Error:', error);
        return new Response('Unable to process the diagnostic at this time.', { status: 500 });
    }
}
