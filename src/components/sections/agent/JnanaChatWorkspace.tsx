'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  ArrowRight 
} from 'lucide-react';
import { OWNER_PROFILE } from '@/data/portfolioData';
import { ChatMessage, SpecialistMode } from '@/types';
import { 
  useAgentChat, 
  SPECIALIST_AGENTS, 
  AGENT_PLACEHOLDERS, 
  AGENT_GREETINGS, 
  GENERAL_JNANA_GREETING 
} from '@/context/AgentChatContext';

const QUICK_PROMPTS: Record<string, string[]> = {
  'gpa-claims-helpdesk': [
    "Assess Permanent Partial Disablement (PPD) claim for loss of toe index.",
    "Evaluate insurer rejection based on delayed claim intimation in GPA.",
    "Draft a 3-tier grievance escalation letter for an accidental injury claim."
  ],
  'irdai-health-decoder': [
    "Decode IRDAI master circular on cashless turnaround times (1-hour/3-hour).",
    "Explain moratorium period rules after 60 months of continuous coverage.",
    "Compare standard room-rent capping vs proportionate deduction clause."
  ],
  'insurance-ai-architect': [
    "How to calculate burning cost for an 850-life corporate GMC renewal?",
    "Model loss ratio impact of introducing a 15% parental co-pay.",
    "Design an automated underwriter census sanitization pipeline."
  ],
  'gmc-gpa-knowledge-hub': [
    "Explain difference between Risk Class I, II, and III in GPA underwriting.",
    "Standard market benchmarks for corporate maternity sub-limits.",
    "How to structure corporate buffer clauses for critical illnesses?"
  ],
  general: [
    "Explain key risk assessment techniques in GMC & GPA underwriting.",
    "How does an automated burn cost model calculate renewal pricing?",
    "Evaluate portfolio ICR trends: what triggers premium loadings?"
  ]
};

export default function JnanaChatWorkspace() {
  const { 
    activeAgentId, 
    messages, 
    setMessages, 
    openSpecialistChat,
    activeAgent,
    resetChat
  } = useAgentChat();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<SpecialistMode>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync activeMode with activeAgentId
  useEffect(() => {
    if (!activeAgentId) {
      setActiveMode('general');
    } else if (activeAgentId === 'gmc-gpa-knowledge-hub') {
      setActiveMode('underwriting');
    } else if (activeAgentId === 'gpa-claims-helpdesk') {
      setActiveMode('claims');
    } else if (activeAgentId === 'irdai-health-decoder') {
      setActiveMode('knowledge');
    } else if (activeAgentId === 'insurance-ai-architect') {
      setActiveMode('automation');
    }
  }, [activeAgentId]);

  // Clean up any in-flight stream on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Safety fallback for greeting initialization if messages list is empty
  useEffect(() => {
    if (messages.length === 0) {
      if (activeAgentId && AGENT_GREETINGS[activeAgentId]) {
        setMessages([
          {
            id: `agent-greeting-${activeAgentId}-${Date.now()}`,
            sender: 'sarang',
            text: AGENT_GREETINGS[activeAgentId],
            timestamp: 'Just now',
          }
        ]);
      } else {
        setMessages([
          {
            id: `agent-greeting-general-${Date.now()}`,
            sender: 'sarang',
            text: GENERAL_JNANA_GREETING,
            timestamp: 'Just now',
          }
        ]);
      }
    }
  }, [activeAgentId, messages.length, setMessages]);

  const scrollToBottom = (smooth = true) => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Auto-scroll chat container to bottom during active conversation or streaming
  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      scrollToBottom();
    }
  }, [messages.length, isLoading]);

  // Clean single scroll-to-top reset for chat container on mode switch
  useEffect(() => {
    if (activeAgentId && chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTop = 0;
    }
  }, [activeAgentId]);

  // Intelligent demo response generator when Gemini API route is running in demo mode
  const getDemoResponse = (query: string, mode: SpecialistMode): string => {
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
5. **Burn Cost Formula**:
   \\[
   \\text{Burn Cost per Life} = \\frac{\\text{Adjusted Incurred Claims} \\times (1 + \\text{Medical Inflation})}{\\text{Projected Member Lives}}
   \\]

${OWNER_PROFILE.name} built automated Excel macro models to model these scenarios in minutes during live corporate broker negotiations.`;
    }

    if (q.includes('loss ratio') || q.includes('icr') || q.includes('profitability') || q.includes('trends')) {
      return `### Evaluating Loss Ratios, Claims Trends, and Portfolio Profitability

**ICR (Incurred Claims Ratio)** is the benchmark metric measuring underwriting portfolio health:

\\[
\\text{ICR} = \\frac{\\text{Claims Paid} + \\text{Closing Outstanding Claims} - \\text{Opening Outstanding Claims}}{\\text{Earned Premium}} \\times 100\\%
\\]

- **Healthy Underwriter ICR**: Typically between **75% to 85%**.
- **Portfolio Threat**: An ICR above 90% threatens underwriter viability and mandates loading or benefit restructuring during renewals.
- **Trend Diagnostics**: ${OWNER_PROFILE.name} breaks down loss trends into claim frequency (claims per 1,000 lives) and severity (average cost per claim) to detect whether spikes stem from parental floaters or provider bill inflation.`;
    }

    if (q.includes('automation') || q.includes('repetitive') || q.includes('operations')) {
      return `### Practical AI Automation Solutions for Repetitive Insurance Operations

1. **Automated Employee Census Cleaning**:
   - Replaces manual VLOOKUPs with NLP-based fuzzy matching to correct mismatched DOBs, relationship tags, and employee IDs in minutes.
2. **Broker Slip & Policy Clause Semantic Diff**:
   - Compares incoming broker tender slips against standard carrier master policies, automatically flagging non-standard benefit changes and co-pay dilutions.
3. **GPA Occupational Risk Auto-Classifier**:
   - Maps non-standard corporate designations to IRDAI Risk Classes (I, II, III) using LLM reasoning.
4. **Instant Burn Cost Calculator**:
   - Ingests past claims dump and returns projected renewal premium scenarios across co-pay levers.`;
    }

    if (q.includes('project') || q.includes('tool') || q.includes('showcase') || q.includes('ai')) {
      return `### AI Tools Developed by ${OWNER_PROFILE.name}

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

    const aiMessageId = (Date.now() + 1).toString();
    const initialAiMessage: ChatMessage = {
      id: aiMessageId,
      sender: 'sarang',
      text: '',
      timestamp: 'Just now'
    };

    // Include the active session's prior messages (including initial UI activation greeting)
    const chatHistory = messages
      .filter((m) => m.text && m.text.trim().length > 0)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        sender: m.sender,
        text: m.text
      }));

    // Immediately push user message and placeholder assistant message for instant UI feedback
    setMessages((prev) => [...prev, userMessage, initialAiMessage]);
    setInput('');
    setIsLoading(true);

    // Abort any existing stream before starting a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      // Connect to the streaming /api/jnana Gemini route
      const response = await fetch('/api/jnana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({ 
          message: query, 
          mode: activeAgentId || activeMode || 'general',
          chatHistory 
        })
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';

      // Stream chunks word-by-word into the UI state as they arrive
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, text: accumulatedText } : msg
          )
        );
      }

      // Fallback if the stream closed empty
      if (!accumulatedText.trim()) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, text: getDemoResponse(query, activeMode) } : msg
          )
        );
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        console.log('[Jnana Chat] Stream aborted by reset');
        return;
      }
      console.warn('[Jnana Chat] Streaming error, using domain fallback:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, text: getDemoResponse(query, activeMode) } : msg
        )
      );
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
      setIsLoading(false);
    }
  };

  const handleResetChat = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // 1. Immediately abort any in-flight streaming fetch
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch {
        // ignore
      }
      abortControllerRef.current = null;
    }

    // 2. Clear input and loading state
    setIsLoading(false);
    setInput('');
    setActiveMode('general');

    // 3. Trigger clean context reset back to General Jnana mode
    resetChat();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
      {/* Left Column: Visual Guardian Identity & Specialist Modes */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Visual Identity Card */}
        <div className="glass-card rounded-2xl p-6 border-cyan-500/30 overflow-hidden relative group">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-cyan-400/50 bg-cyan-950 shadow-cyan-glow shrink-0">
              <Image
                src="/sarang-logo.webp"
                alt="Sarang AI Agent Logo"
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>SARANG AI</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold">
                  Online
                </span>
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-gold-400 font-semibold tracking-wide">
                  Enterprise Insurance Intelligence
                </span>
              </div>
            </div>
          </div>

          {/* 3-metric Domain Authority strip */}
          <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-navy-950/90 border border-slate-800/90 text-center">
            <div>
              <div className="text-xs font-black text-cyan-400">7+ Years</div>
              <div className="text-[9px] text-slate-400 uppercase font-semibold leading-tight">Domain Expert- GMC & GPA</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-xs font-black text-gold-400">3 Engines</div>
              <div className="text-[9px] text-slate-400 uppercase font-semibold leading-tight">JNANA, KARMA, DRISHTI</div>
            </div>
            <div>
              <div className="text-xs font-black text-emerald-400">IRDAI</div>
              <div className="text-[9px] text-slate-400 uppercase font-semibold">Aligned</div>
            </div>
          </div>

          {/* Identity Narrative Breakdown */}
          <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase text-[10px] tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>SYSTEM INTELLIGENCE</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              An advanced AI-powered insurance intelligence ecosystem combining 7+ years of GMC & GPA underwriting expertise with AI engineering, intelligent automation, and advanced Excel frameworks. Designed to demonstrate practical solutions for underwriting, risk assessment, claims analytics, and insurance process optimization.
            </p>
          </div>

          {/* Special Ability Modes Selector */}
          <div className="pt-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Special Ability Modes</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SPECIALIST_AGENTS.map((agent) => {
                const isActive = activeAgentId === agent.id;
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openSpecialistChat(agent.id, { forceScroll: true });
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-cyan-950/90 border-cyan-400 shadow-cyan-glow text-white'
                        : 'bg-navy-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold leading-tight line-clamp-1">{agent.badge}</span>
                      <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    </div>
                    <p 
                      style={{ writingMode: 'horizontal-tb', wordBreak: 'break-word' }}
                      className="text-[10px] text-slate-400 line-clamp-1"
                    >
                      {agent.description || agent.desc}
                    </p>
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
      <div id="sarang-chat" className="lg:col-span-7 scroll-mt-24">
        <div className="glass-panel-glow rounded-2xl border border-cyan-500/30 shadow-2xl flex flex-col h-[420px] lg:h-[450px] overflow-hidden bg-navy-950/90">
          
          {/* Chat Header */}
          <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-navy-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 bg-cyan-950 shadow-cyan-glow shrink-0">
                <Image
                  src="/sarang-logo.webp"
                  alt="Sarang AI Agent Logo"
                  fill
                  className="object-contain p-1"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Sarang - Your Intelligent Companion</span>
                </div>
                <div className="text-[11px] text-cyan-400 font-medium truncate max-w-[200px] sm:max-w-[300px]">
                  {activeAgent ? `Active: ${activeAgent.badge}` : 'LEARN • EXECUTE • MONITOR'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (activeAgentId) handleResetChat(e);
                }}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-950/90 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 tracking-wider uppercase transition-colors ${
                  activeAgentId ? 'hover:border-cyan-400 cursor-pointer' : 'cursor-default'
                }`}
                title={activeAgentId ? 'Click to return to General GMC & GPA Mode' : 'Active Domain Engine'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate max-w-[180px]">
                  {activeAgent ? activeAgent.badge : 'JNANA DOMAIN ENGINE'}
                </span>
                {activeAgentId && <span className="text-slate-400 hover:text-white ml-0.5">×</span>}
              </button>
              <button
                type="button"
                onClick={handleResetChat}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4"/>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div 
            ref={chatScrollContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[radial-gradient(rgba(56,189,248,0.08)_1px,transparent_1px)] [background-size:18px_18px]"
          >
            {messages.length === 0 ? (
              <div className="h-full min-h-[180px] flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/50 bg-cyan-950 shadow-cyan-glow mb-3">
                  <Image
                    src="/sarang-logo.webp"
                    alt="Sarang AI Agent Logo"
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>
                <p className="text-xs text-slate-300 font-semibold mb-1">
                  Sarang - Your Intelligent Companion
                </p>
                <p className="text-[11px] text-slate-500 max-w-xs">
                  Ask any insurance underwriting or technical question below or select a recommended prompt to start.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[90%] sm:max-w-[85%]">
                    {msg.sender === 'sarang' && (
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/50 bg-cyan-950 shadow-sm shrink-0">
                        <Image
                          src="/sarang-logo.webp"
                          alt="Sarang AI Agent Logo"
                          fill
                          className="object-contain p-0.5"
                          sizes="32px"
                        />
                      </div>
                    )}

                    <div
                      className={`text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl rounded-br-none p-3.5 shadow-cyan-glow'
                          : 'border-l-2 border-l-cyan-400 bg-navy-900/90 border border-slate-800/90 rounded-2xl rounded-tl-sm p-3.5 shadow-lg text-slate-200'
                      }`}
                    >
                      {msg.sender === 'sarang' && (
                        <div className="flex items-center justify-between text-[10px] pb-1.5 mb-2 border-b border-slate-800/80 text-slate-400">
                          <span className="font-bold text-cyan-400 tracking-wide truncate max-w-[220px]">
                            {activeAgent ? activeAgent.badge : 'Sarang'}
                          </span>
                          {msg.timestamp && (
                            <span className="text-[10px] text-slate-500 font-medium shrink-0 ml-2">
                              {msg.timestamp}
                            </span>
                          )}
                        </div>
                      )}

                      <div 
                        style={{ writingMode: 'horizontal-tb', wordBreak: 'break-word' }}
                        className="whitespace-pre-line prose prose-invert prose-sm max-w-none"
                      >
                        {msg.text ? (
                          <>
                            {msg.text}
                            {isLoading && msg.id === messages[messages.length - 1]?.id && (
                              <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
                            )}
                          </>
                        ) : (
                          <div className="flex items-center gap-1.5 py-1">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Starter Chips: Rendered ONLY for the 4 Specialist AI Projects */}
            {activeAgentId && messages.length <= 1 && !isLoading && (
              <div className="pt-2 pb-1 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Recommended Underwriting Prompts</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {(QUICK_PROMPTS[activeAgentId] || []).map((promptText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInput(promptText);
                        const inputEl = document.getElementById('sarang-inline-input') as HTMLInputElement | null;
                        inputEl?.focus();
                      }}
                      className="text-left text-xs px-3 py-2 rounded-xl bg-navy-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all flex items-center justify-between group shadow-sm"
                    >
                      <span className="line-clamp-1">{promptText}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400/60 group-hover:text-cyan-300 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form & Command Dock */}
          <div className="p-3 sm:p-3.5 bg-navy-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="sarang-inline-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={(activeAgentId && AGENT_PLACEHOLDERS[activeAgentId]) || activeAgent?.placeholder || `Ask about GMC underwriting, burn cost, ICR or ${OWNER_PROFILE.name}'s projects...`}
                disabled={isLoading}
                className="flex-1 bg-navy-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-cyan-glow shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 text-center text-[10px] text-slate-500 font-medium tracking-wide">
              Built on 7+ Years of GMC & GPA Underwriting Expertise • Press Enter ↵ to send
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
