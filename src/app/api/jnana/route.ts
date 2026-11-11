import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Prevent Next.js from caching dynamic streaming responses
export const dynamic = 'force-dynamic';

function getFallbackResponse(query: string): string {
  return `Thank you for asking: "${query}".

I am JNANA, your intelligent companion. How can I assist you with insurance underwriting, policy structures, risk calculations, or AI workflows today?`;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response('Valid message string is required', { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Live Google Gemini API Integration with streaming
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey.trim());

        // Ultra-fast streaming model with simple placeholder system instruction
        let streamResult = null;
        try {
          const model = genAI.getGenerativeModel({
            model: 'gemini-3.5-flash-lite',
            systemInstruction: 'You are a helpful AI assistant.',
          });
          streamResult = await model.generateContentStream(message);
        } catch {
          const fallbackModel = genAI.getGenerativeModel({
            model: 'gemini-3.8-flash',
            systemInstruction: 'You are a helpful AI assistant.',
          });
          streamResult = await fallbackModel.generateContentStream(message);
        }

        if (streamResult) {
          const encoder = new TextEncoder();
          const readableStream = new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of streamResult.stream) {
                  const chunkText = chunk.text();
                  if (chunkText) {
                    controller.enqueue(encoder.encode(chunkText));
                  }
                }
                controller.close();
              } catch (streamErr) {
                console.error('[JNANA API] Streaming error:', streamErr);
                controller.error(streamErr);
              }
            },
          });

          return new Response(readableStream, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Transfer-Encoding': 'chunked',
              'Cache-Control': 'no-cache, no-transform',
              'Connection': 'keep-alive',
              'X-Content-Type-Options': 'nosniff',
            },
          });
        }
      } catch (geminiError: any) {
        console.warn('[JNANA API] Gemini setup error, using fallback:', geminiError?.message);
      }
    }

    // High-fidelity fallback if Gemini is offline or API key is absent
    const fallbackText = getFallbackResponse(message);
    return new Response(fallbackText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error: any) {
    console.error('[JNANA API] Unhandled server error:', error);
    return new Response('An unexpected error occurred while communicating with Jnana AI.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
