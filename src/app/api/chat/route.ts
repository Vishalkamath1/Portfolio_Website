import { NextRequest, NextResponse } from 'next/server';
import { OWNER_PROFILE, CAREER_JOURNEY, EXPERTISE_ITEMS, INITIAL_PROJECTS } from '@/data/portfolioData';

export async function POST(req: NextRequest) {
  try {
    const { message, mode } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Valid message string required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Build the rich domain-informed system prompt
    const systemPrompt = `You are SARANG AI, the central Insurance & Artificial Intelligence Guardian representing ${OWNER_PROFILE.name}.
Visual Identity: Friendly silver/white-blue robot with a glowing cyan face, gold forehead mark, saffron scarf, golden arrows and quiver, and the ornate golden Sarang Dhanush bow.
Tone: Professional, analytical, domain-grounded, encouraging, and guardian-like.

OWNER BACKGROUND (Truthful, authentic credentials):
- Total Experience: 7.4 years in the Indian insurance sector.
- GMC & GPA Underwriting: 4.5 years. Specialized in Group Medical Cover (GMC) and Group Personal Accident (GPA) corporate quotations, loss ratio analysis, Incurred Claims Ratio (ICR) management, and policy wordings.
- Life Insurance Sales: 2.9 years. Individual client risk profiling, protection planning, and customer advisory.
- Advanced Excel Modeler: Deep expertise in burn cost calculation, demographic morbidity weighting, claims distribution matrices, and broker quote spreadsheets.
- Insurance AI & Automation: Currently developing practical AI prototypes (GMC clause cross-comparer, GPA risk classifier, burn-cost visualizers, employee census cleaners).
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
Always emphasize that your answers are for informational, decision-support, and demonstration purposes only. You do NOT render legally binding underwriting decisions, policy issuances, or formal quote commitments. Format your response clearly with Markdown formatting.`;

    // 1. Live Google Gemini API Integration
    if (apiKey && apiKey.trim().length > 15) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey.trim());
        
        // Priority model: gemini-3.8-flash, with fallback to gemini-flash-latest
        const modelNames = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-2.5-flash'];
        let replyText = '';

        for (const mName of modelNames) {
          try {
            const model = genAI.getGenerativeModel({ 
              model: mName,
              systemInstruction: systemPrompt 
            });
            const result = await model.generateContent(message);
            replyText = result.response.text();
            if (replyText) break;
          } catch (modelErr: any) {
            console.warn(`Model ${mName} attempt:`, modelErr?.message);
          }
        }

        if (replyText) {
          return NextResponse.json({
            reply: replyText,
            mode: mode || 'general',
            isLive: true,
            provider: 'Google Gemini 3.8 Flash'
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini call encountered error, using domain backup:', geminiError?.message);
      }
    }

    // 2. High-Fidelity Domain Fallback if API key is not present or offline
    const query = message.toLowerCase();
    let reply = '';

    if (query.includes('difference') && (query.includes('gmc') || query.includes('gpa'))) {
      reply = `### Key Differences: GMC vs. GPA Underwriting

1. **Group Medical Cover (GMC)**:
   - **Scope**: Covers hospitalization expenses (cashless and reimbursement) resulting from illness, disease, and accidental injuries.
   - **Core Metrics**: Incurred Claims Ratio (ICR), demographic morbidity weighting, corporate maternity sub-limits, corporate buffer allocations, and room rent capping.
   - **Risk Factor**: Frequency-driven (high volume of frequent claims, predictable within standard actuarial loss curves).

2. **Group Personal Accident (GPA)**:
   - **Scope**: Covers death, Permanent Total Disablement (PTD), Permanent Partial Disablement (PPD), and Temporary Total Disablement (TTD) strictly arising from external, violent, accidental means.
   - **Core Metrics**: Occupational hazard grading (IRDAI Class I: Desk/Office, Class II: Supervisors/Light Industry, Class III: Heavy Industrial/Hazardous Operations).
   - **Risk Factor**: Severity-driven (lower claim frequency, but severe financial impact per claim).

${OWNER_PROFILE.name} has managed underwriting portfolios for both GMC and GPA for **4.5 years**, developing custom Excel pricing engines for both.`;
    } else if (query.includes('burn cost') || query.includes('calculate')) {
      reply = `### How Burn Cost Is Calculated in Corporate GMC Underwriting

**Burn Cost** represents the pure risk premium required simply to break even on projected claim payouts, before loading for administrative overhead, broker brokerage, and insurer profit margin.

1. **Historical Claims Ingestion**: Clean past 2–3 policy years of member claims data (Paid Claims + Outstanding Claims + IBNR factor).
2. **Exposure Normalization**: Adjust for changes in average employee headcount across policy years to compute **Claims Per Life (CPL)**.
3. **Medical Inflation Loading**: Apply standard healthcare trend inflation (typically 10%–14% annually in India).
4. **Benefit Structure Modeling**: Re-price impact of proposed co-pays (e.g., 10% co-pay on parents), room rent restrictions (e.g., 1% of Sum Insured), or maternity sub-limits.
5. **Burn Cost Formula**:
   \\[
   \\text{Burn Cost per Life} = \\frac{\\text{Adjusted Incurred Claims} \\times (1 + \\text{Medical Inflation})}{\\text{Projected Member Lives}}
   \\]

${OWNER_PROFILE.name} built automated Excel macro models to model these scenarios in minutes during live corporate broker negotiations.`;
    } else if (query.includes('icr') || query.includes('incurred claim')) {
      reply = `### Incurred Claims Ratio (ICR) in Insurance Underwriting

**ICR (Incurred Claims Ratio)** is the benchmark metric measuring underwriting portfolio health:

\\[
\\text{ICR} = \\frac{\\text{Claims Paid} + \\text{Closing Outstanding Claims} - \\text{Opening Outstanding Claims}}{\\text{Earned Premium}} \\times 100\\%
\\]

- **Healthy Underwriter ICR**: Typically between **75% to 85%**.
- **Portfolio Threat**: An ICR above 90% threatens underwriter viability and mandates loading or benefit restructuring during renewals.
- **Why It Matters**: ${OWNER_PROFILE.name} utilizes historical ICR tracking to pinpoint whether loss spikes stem from corporate family-floater parents or specific chronic disease escalations.`;
    } else {
      reply = `Greetings! As **SARANG AI**, I represent ${OWNER_PROFILE.name}'s **7.4 years of insurance domain expertise** (4.5 years in GMC/GPA underwriting and 2.9 years in Life advisory) alongside practical AI automation workflows. 

You asked regarding: **"${message}"** in **${(mode || 'general').toUpperCase()}** mode.

Feel free to explore:
- GMC/GPA policy wordings, exclusions, or IRDAI guidelines
- Advanced Excel burn-cost calculation mechanics
- How AI can augment underwriter productivity without replacing human authority

*Notice: All advice is informational decision-support and does not constitute a binding insurance commitment.*`;
    }

    return NextResponse.json({
      reply,
      mode: mode || 'general',
      isLive: false,
      isDemoMode: true
    });
  } catch (error: any) {
    console.error('Chat API general error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI query' },
      { status: 500 }
    );
  }
}
