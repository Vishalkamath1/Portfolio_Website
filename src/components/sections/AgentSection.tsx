'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  BookOpen, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { SUGGESTED_QUESTIONS, OWNER_PROFILE } from '@/data/portfolioData';
import { ChatMessage, SpecialistMode } from '@/types';

const SPECIALIST_MODES: { id: SpecialistMode; name: string; desc: string; icon: any }[] = [
  { id: 'general', name: 'General', desc: 'Overview & Portfolio queries', icon: Sparkles },
  { id: 'underwriting', name: 'Underwriting', desc: 'GMC & GPA risk, ICR & burn costing', icon: Cpu },
  { id: 'claims', name: 'Claims', desc: 'Cashless pre-auth & exclusions', icon: Activity },
  { id: 'knowledge', name: 'Knowledge', desc: 'IRDAI regulations & policy clauses', icon: BookOpen },
  { id: 'analytics', name: 'Analytics', desc: 'Loss ratios & Excel models', icon: Layers },
  { id: 'automation', name: 'Automation', desc: 'Census cleaning & AI pipelines', icon: Zap },
];

export default function AgentSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'sarang',
      text: `Greetings! I am **SARANG AI**, your central Insurance & AI Intelligence Guardian. 

I am equipped with **${OWNER_PROFILE.name}'s 7.4 years of insurance domain expertise**—specializing in Group Medical (GMC) and Group Personal Accident (GPA) underwriting, advanced Excel burn costing, and applied AI automation.

How may I assist you today? You can select a suggested topic below or ask anything about GMC underwriting, ICR calculations, or our AI prototypes.`,
      timestamp: 'Just now',
      suggestedActions: SUGGESTED_QUESTIONS.slice(0, 3)
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<SpecialistMode>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Intelligent demo response generator when Gemini API route is running in demo mode
  const getDemoResponse = (query: string, mode: SpecialistMode): string => {
    const q = query.toLowerCase();

    if (q.includes('difference') && (q.includes('gmc') || q.includes('gpa'))) {
      return `### Key Differences: GMC vs. GPA Underwriting

1. **Group Medical Cover (GMC)**:
   - **Scope**: Covers hospitalization expenses (cashless and reimbursement) resulting from illness, disease, and accidental injuries.
   - **Core Metrics**: Incurred Claims Ratio (ICR), demographic morbidity weighting, corporate maternity sub-limits, corporate buffer allocations, and room rent capping.
   - **Risk Factor**: Frequency-driven (high volume of frequent claims, predictable within standard actuarial loss curves).

2. **Group Personal Accident (GPA)**:
   - **Scope**: Covers death, Permanent Total Disablement (PTD), Permanent Partial Disablement (PPD), and Temporary Total Disablement (TTD) strictly arising from external, violent, accidental means.
   - **Core Metrics**: Occupational hazard grading (IRDAI Class I: Desk/Office, Class II: Supervisors/Light Industry, Class III: Heavy Industrial/Hazardous Operations).
   - **Risk Factor**: Severity-driven (lower claim frequency, but severe financial impact per claim).

${OWNER_PROFILE.name} has managed underwriting portfolios for both GMC and GPA for **4.5 years**, developing custom Excel pricing engines for both.`;
    }

    if (q.includes('burn cost') || q.includes('calculate')) {
      return `### How Burn Cost Is Calculated in Corporate GMC Underwriting

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
    }

    if (q.includes('icr') || q.includes('incurred claim')) {
      return `### Incurred Claims Ratio (ICR) in Insurance Underwriting

**ICR (Incurred Claims Ratio)** is the benchmark metric measuring underwriting portfolio health:

\\[
\\text{ICR} = \\frac{\\text{Claims Paid} + \\text{Closing Outstanding Claims} - \\text{Opening Outstanding Claims}}{\\text{Earned Premium}} \\times 100\\%
\\]

- **Healthy Underwriter ICR**: Typically between **75% to 85%**.
- **Portfolio Threat**: An ICR above 90% threatens underwriter viability and mandates loading or benefit restructuring during renewals.
- **Why It Matters**: ${OWNER_PROFILE.name} utilizes historical ICR tracking to pinpoint whether loss spikes stem from corporate family-floater parents or specific chronic disease escalations.`;
    }

    if (q.includes('project') || q.includes('ai') || q.includes('built')) {
      return `### AI Projects Developed by ${OWNER_PROFILE.name}

1. **GMC Policy Clause & Exclusion AI Comparer**: Semantic diff engine highlighting sub-limit reductions between broker slips and carrier standard terms.
2. **GPA Occupational Risk Classifier**: Maps non-standard corporate designations to IRDAI Class I/II/III hazard bands.
3. **Corporate Burn Cost Visualizer**: Interactive scenario engine for corporate account renewals.
4. **Census Cleanse Engine**: Advanced automation to sanitize messy corporate employee Excel census sheets.
5. **Cashless Pre-Auth Claim Triage**: Prototype concept parsing hospital discharge summaries.

Explore all projects in Section 4 above!`;
    }

    return `Thank you for asking about **"${query}"** in **${mode.toUpperCase()}** mode. 

As the **SARANG AI Guardian**, I draw upon ${OWNER_PROFILE.name}'s **7.4 years of insurance experience** (4.5 years in GMC/GPA underwriting and 2.9 years in Life advisory) alongside practical AI automation workflows. 

Feel free to ask more specific questions regarding:
- GMC/GPA policy wordings, exclusions, or IRDAI guidelines
- Advanced Excel burn-cost calculation mechanics
- How AI can augment underwriter productivity without replacing human authority`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
      specialistMode: activeMode
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Attempt server route /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, mode: activeMode })
      });

      if (response.ok) {
        const data = await response.json();
        const botReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'sarang',
          text: data.reply || getDemoResponse(query, activeMode),
          timestamp: 'Just now',
          specialistMode: activeMode
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        // Fallback to intelligent local demo responses
        setTimeout(() => {
          const fallbackReply: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'sarang',
            text: getDemoResponse(query, activeMode),
            timestamp: 'Just now',
            specialistMode: activeMode
          };
          setMessages((prev) => [...prev, fallbackReply]);
        }, 600);
      }
    } catch (err) {
      // Local fallback for offline/demo environment
      setTimeout(() => {
        const fallbackReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'sarang',
          text: getDemoResponse(query, activeMode),
          timestamp: 'Just now',
          specialistMode: activeMode
        };
        setMessages((prev) => [...prev, fallbackReply]);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'sarang',
        text: `Session reinitialized. I am **SARANG AI**, your central Insurance Guardian. Ask me anything about ${OWNER_PROFILE.name}'s underwriting experience or GMC/GPA insurance concepts!`,
        timestamp: 'Just now',
        suggestedActions: SUGGESTED_QUESTIONS.slice(0, 3)
      }
    ]);
  };

  return (
    <section id="agent" className="py-24 border-t border-slate-800/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-600/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3 shadow-cyan-glow">
            <Bot className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>Section 5 · Central Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Meet Sarang — Your Intelligent Companion
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            LEARN • AUTOMATE • INNOVATE
          </p>
        </div>

        {/* Main Agent Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Guardian Identity & Specialist Modes */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Identity Card */}
            <div className="glass-card rounded-2xl p-6 border-cyan-500/30 overflow-hidden relative group">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-cyan-glow bg-navy-950 shrink-0">
                  <Image
                    src="/sarang-guardian.jpeg"
                    alt="Sarang - Your Intelligent Companion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span>SARANG AI</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold">
                      Online
                    </span>
                  </h3>
                  <p className="text-xs text-gold-400 font-semibold tracking-wide">
                    Sarang - Your Intelligent Companion
                  </p>
                  <p className="text-[11px] text-slate-400">
                    LEARN • AUTOMATE • INNOVATE
                  </p>
                </div>
              </div>

              {/* Identity Narrative Breakdown */}
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase text-[10px] tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Guardian Persona Specifications</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Friendly silver/white-blue guardian robot with a glowing cyan face, gold forehead mark, saffron scarf, and precision arrows—symbolizing razor-sharp insurance underwriting accuracy and risk shielding.
                </p>
              </div>

              {/* Specialist Modes Selector */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Specialist Domain Modes</span>
                  <span className="text-cyan-400 font-semibold">{activeMode}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {SPECIALIST_MODES.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = activeMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                          isActive
                            ? 'bg-cyan-950/90 border-cyan-400 shadow-cyan-glow text-white'
                            : 'bg-navy-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{mode.name}</span>
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                        </div>
                        <span className="text-[10px] text-slate-400 line-clamp-1">
                          {mode.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legal & Informational Disclaimer */}
              <div className="mt-4 p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-[11px] text-amber-300/90 leading-relaxed">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Informational Notice:</strong> SARANG AI provides underwriting guidance and portfolio insights. It does not make binding underwriting or policy coverage commitments.
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Chat Interface */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow rounded-2xl border border-cyan-500/30 shadow-2xl flex flex-col h-[650px] overflow-hidden bg-navy-950/90">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-navy-900/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/50">
                    <Image
                      src="/sarang-guardian.jpeg"
                      alt="Sarang - Your Intelligent Companion"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Sarang - Your Intelligent Companion</span>
                      <span className="text-[10px] text-cyan-300 bg-cyan-950 border border-cyan-500/30 px-1.5 py-0.2 rounded font-semibold capitalize">
                        {activeMode} Mode
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      LEARN • AUTOMATE • INNOVATE
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleResetChat}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                  title="Reset Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[88%] sm:max-w-[80%]">
                      {msg.sender === 'sarang' && (
                        <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-cyan-400/40 shrink-0 bg-navy-900">
                          <Image
                            src="/sarang-guardian.jpeg"
                            alt="Sarang - Your Intelligent Companion"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-cyan-glow'
                            : 'glass-panel border-cyan-500/20 text-slate-200 rounded-bl-none shadow-md'
                        }`}
                      >
                        <div className="whitespace-pre-line prose prose-invert prose-sm max-w-none">
                          {msg.text}
                        </div>
                      </div>
                    </div>

                    {/* Suggested Question Actions on Welcome */}
                    {msg.suggestedActions && (
                      <div className="mt-3 pl-9 flex flex-wrap gap-2">
                        {msg.suggestedActions.map((action, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleSendMessage(action)}
                            className="text-left text-xs px-3 py-1.5 rounded-lg bg-navy-900/90 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <span>{action}</span>
                            <ArrowRight className="w-3 h-3 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-end gap-2">
                    <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-cyan-400/40 shrink-0 bg-navy-900">
                      <Image
                        src="/sarang-guardian.jpeg"
                        alt="Sarang - Your Intelligent Companion"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="glass-panel border-cyan-500/20 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-xs text-slate-400 ml-1">Analyzing underwriting knowledge...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Quick Row */}
              <div className="px-4 py-2 bg-navy-900/50 border-t border-slate-800/60 overflow-x-auto flex gap-2 no-scrollbar">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-md bg-navy-950 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <div className="p-3 sm:p-4 bg-navy-900/80 border-t border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask about GMC underwriting, burn cost, ICR or ${OWNER_PROFILE.name}'s projects...`}
                    disabled={isLoading}
                    className="flex-1 bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-cyan-glow shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
