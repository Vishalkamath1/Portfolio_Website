import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { OWNER_PROFILE, INITIAL_PROJECTS } from '@/data/portfolioData';

// Prevent Next.js from caching dynamic streaming responses
export const dynamic = 'force-dynamic';

function getFallbackResponse(query: string, mode: string = 'general'): string {
  const q = query.toLowerCase();

  if (q.includes('difference') || (q.includes('risk assessment') && (q.includes('gmc') || q.includes('gpa')))) {
    return `### Key Risk Assessment Techniques in GMC and GPA Underwriting

1. **Group Medical Cover (GMC) Risk Assessment**:
   - **Demographic Weighting**: Assessing employee age bracket distribution and parental dependency ratios.
   - **Historical Incurred Claims Ratio (ICR)**: Evaluating claims burning trends over a 2–3 year rolling window.
   - **Morbidity Risk Analysis**: Identifying chronic disease clusters, high-cost surgical claims, and corporate maternity sub-limits.
   - **Structuring Risk Mitigants**: Introducing room-rent capping (1% of SI), corporate buffers, and parental co-pays (10%-20%).

2. **Group Personal Accident (GPA) Risk Assessment**:
   - **Occupational Hazard Classification**: Categorizing workforce into IRDAI risk classes (Class I: Office/Desk, Class II: Site Supervisors/Light Industry, Class III: Heavy Manufacturing/Hazardous).
   - **Coverage Structuring**: Designing Table of Benefits across Death, Permanent Total Disablement (PTD), Permanent Partial Disablement (PPD), and Temporary Total Disablement (TTD).
   - **Accumulation & Catastrophe Risk**: Analyzing multi-life accumulation risk during corporate flights or transit.

${OWNER_PROFILE.name} has managed both GMC and GPA portfolios for **4.5 years**, developing custom pricing models to ensure sustainable loss ratios.`;
  }

  if (q.includes('burn cost') || q.includes('renewal') || q.includes('calculate')) {
    return `### How an Automated Burn Cost Model Calculates Renewal Pricing

**Burn Cost** represents the pure risk premium required simply to break even on projected claim payouts, before loading for administrative overhead, broker brokerage, and insurer profit margin.

1. **Historical Claims Ingestion**: Clean past 2–3 policy years of member claims data (Paid Claims + Outstanding Claims + IBNR factor).
2. **Exposure Normalization**: Adjust for changes in average employee headcount across policy years to compute **Claims Per Life (CPL)**.
3. **Medical Inflation Loading**: Apply standard healthcare trend inflation (typically 10%–14% annually in India).
4. **Benefit Structure Modeling**: Re-price impact of proposed co-pays (e.g., 10% co-pay on parents), room rent restrictions (e.g., 1% of Sum Insured), or maternity sub-limits.

${OWNER_PROFILE.name} built automated Excel macro models to model these scenarios in minutes during live corporate broker negotiations.`;
  }

  if (q.includes('loss ratio') || q.includes('icr') || q.includes('profitability')) {
    return `### Evaluating Loss Ratios and Portfolio Profitability

**ICR (Incurred Claims Ratio)** is the benchmark metric measuring underwriting portfolio health:

\\[
\\text{ICR} = \\frac{\\text{Claims Paid} + \\text{Closing Outstanding Claims} - \\text{Opening Outstanding Claims}}{\\text{Earned Premium}} \\times 100\\%
\\]

- **Healthy Underwriter ICR**: Typically between **75% to 85%**.
- **Portfolio Threat**: An ICR above 90% threatens underwriter viability and mandates loading or benefit restructuring during renewals.
- **Trend Diagnostics**: ${OWNER_PROFILE.name} breaks down loss trends into claim frequency (claims per 1,000 lives) and severity (average cost per claim) to detect whether spikes stem from parental floaters or provider bill inflation.`;
  }

  return `Thank you for consulting **JNANA AI** in **${mode.toUpperCase()}** mode regarding: "${query}".

As the **SARANG AI Guardian**, I draw upon ${OWNER_PROFILE.name}'s **7.4 years of frontline insurance experience** (4.5 years in GMC/GPA underwriting and 2.9 years in Life advisory) alongside practical AI automation workflows.

Feel free to ask more specific questions regarding:
- GMC/GPA policy wordings, exclusions, or IRDAI guidelines
- Advanced Excel burn-cost calculation mechanics
- How AI can augment underwriter productivity without replacing human authority`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, mode } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response('Valid message string is required', { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Domain-grounded system instruction representing Vishal Kamath
    const systemInstruction = `You are JNANA — the Wisdom & Intelligence Core of SARANG AI, representing ${OWNER_PROFILE.name}.
Visual Identity: Friendly silver/white-blue robot with a glowing cyan visor, gold forehead tilak, saffron sash, and the golden Sarang bow.
Tone: Professional, analytical, domain-grounded, encouraging, and guardian-like.

OWNER BACKGROUND (Truthful, authentic insurance credentials):
- Total Experience: 7.4 years in the Indian insurance sector.
- GMC & GPA Underwriting: 4.5 years. Specialized in Group Medical Cover (GMC) and Group Personal Accident (GPA) corporate quotations, loss ratio analysis, Incurred Claims Ratio (ICR) management, demographic morbidity weighting, and policy wordings.
- Life Insurance Sales & Advisory: 2.9 years. Individual client risk profiling, protection planning, and customer advisory.
- Advanced Excel Modeler: Deep expertise in burn cost calculation, demographic morbidity weighting, claims distribution matrices, and broker quote spreadsheets.
- Insurance AI & Automation: Currently developing practical AI prototypes (GMC clause cross-comparer, GPA risk classifier, burn-cost visualizers, employee census sanitizers).
- IMPORTANT: Never claim false advanced software engineering degrees, SQL, or deep data science qualifications. Present as an authentic insurance underwriter using AI tools to solve frontline operational bottlenecks.

PORTFOLIO PROJECTS CONTEXT:
${INITIAL_PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.tagline}. Impact: ${p.businessImpact}`).join('\n')}

CURRENT SPECIALIST MODE: ${(mode || 'general').toUpperCase()}
- UNDERWRITING: Emphasize GMC/GPA risk grading, ICR thresholds (75%-85% healthy), burn cost pricing, demographic weighting, and corporate co-pays.
- CLAIMS: Emphasize cashless pre-authorizations, non-payable medical items, exclusions, and TPA coordination.
- KNOWLEDGE: Emphasize IRDAI guidelines, standard exclusions, pre-existing disease rules, and GPA Table of Benefits (Death, PTD, PPD, TTD).
- ANALYTICS: Emphasize ICR formulas, IBNR factors, claims frequency vs. severity curves, and Excel modeling.
- AUTOMATION: Emphasize employee census sanitization, prompt engineering for clause comparison, and underwriter-in-the-loop workflows.
- GENERAL: Overview of Vishal Kamath's portfolio, journey, and AI prototypes.

REGULATORY & COMPLIANCE GUARDRAIL:
Always emphasize that your answers are for informational, decision-support, and demonstration purposes only. You do NOT render legally binding underwriting decisions, policy issuances, or formal quote commitments. Format your response cleanly with standard Markdown formatting.`;

    // Live Google Gemini API Integration with streaming
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey.trim());

        // Target gemini-2.0-flash as specified, with candidate fallbacks for resilience
        const candidateModels = ['gemini-2.0-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
        let streamResult = null;

        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction: systemInstruction,
            });
            streamResult = await model.generateContentStream(message);
            if (streamResult) break;
          } catch (modelErr: any) {
            console.warn(`[JNANA API] Model ${modelName} unavailable, falling back:`, modelErr?.message);
          }
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
            },
          });
        }
      } catch (geminiError: any) {
        console.warn('[JNANA API] Gemini setup error, using domain fallback:', geminiError?.message);
      }
    }

    // High-fidelity fallback if Gemini is offline or API key is absent
    const fallbackText = getFallbackResponse(message, mode);
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
