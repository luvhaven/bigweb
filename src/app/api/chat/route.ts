// Removed StreamingTextResponse import as it is deprecated in ai SDK v4+

export const runtime = 'edge';

// Mock response for portfolio demo purposes
const MOCK_RESPONSE = `Welcome to BIGWEB Digital. I am the AI Concierge.

Based on your inquiry, here is how we can accelerate your revenue:
1. **Conversion Architecture:** We rebuild funnels that plug your traffic leaks.
2. **Behavioral UX:** We design interfaces that anticipate user intent.
3. **Generative AI Integration:** Like the interface you are currently using, we can embed sentient agents into your product.

Are you ready to audit your current infrastructure?`;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Create a ReadableStream that yields chunks of the mock response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const words = MOCK_RESPONSE.split(' ');

      // Stream word by word with a slight delay to simulate an LLM
      for (let i = 0; i < words.length; i++) {
        // AI SDK expects specific chunk formatting for its stream
        const text = i === words.length - 1 ? words[i] : words[i] + ' ';
        controller.enqueue(encoder.encode('0:"' + text.replace(/"/g, '\\"') + '"\n'));
        
        // Wait 20-50ms between words
        await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 20));
      }
      controller.close();
    },
  });

  // Respond with the stream
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Vercel-AI-Data-Stream': 'v1'
    }
  });
}
