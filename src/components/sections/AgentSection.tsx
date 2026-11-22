'use client';

import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Activity,
  Lock
} from 'lucide-react';
import SarangReviews from './SarangReviews';
import { useAgentChat } from '@/context/AgentChatContext';
import JnanaChatWorkspace from './agent/JnanaChatWorkspace';
import KarmaExecutionStudio from './agent/KarmaExecutionStudio';
import DrishtiRiskObservatory from './agent/DrishtiRiskObservatory';

export type SarangTab = 'jnana' | 'karma' | 'drishti';

const SARANG_TABS: {
  id: SarangTab;
  name: string;
  shortLabel: string;
  tagline: string;
  badge?: string;
  isLocked?: boolean;
  icon: any;
}[] = [
  {
    id: 'jnana',
    name: 'JNANA',
    shortLabel: 'WISDOM',
    tagline: 'Think. Understand. Discover.',
    icon: Sparkles
  },
  {
    id: 'karma',
    name: 'KARMA',
    shortLabel: 'EXECUTE',
    tagline: 'Turn Intelligence into Action.',
    badge: 'Coming Soon',
    isLocked: true,
    icon: Zap
  },
  {
    id: 'drishti',
    name: 'DRISHTI',
    shortLabel: 'MONITOR',
    tagline: 'Monitor. Anticipate. Strategise.',
    badge: 'Coming Soon',
    isLocked: true,
    icon: Activity
  }
];

/* -------------------------------------------------------------------------- */
/* Main Agent Section Component (Single Platform Architecture Orchestrator)   */
/* -------------------------------------------------------------------------- */
export default function AgentSection() {
  const { 
    activeTab,
    setActiveTab,
    openHeroChat
  } = useAgentChat();

  return (
    <section id="agent" className="py-24 border-t border-slate-800/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-600/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3 shadow-cyan-glow">
            <Bot className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>Section 5 · Central Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Meet Sarang — Unified Insurance Intelligence
          </h2>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              A single tripartite AI platform bridging domain underwriting, execution automation, and risk monitoring.
            </span>
            <a
              href="#sarang-reviews"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-950/80 border border-gold-500/40 text-gold-300 text-xs font-bold hover:border-gold-400 transition-all shadow-sm"
            >
              <span>★ 5.0 Benchmark</span>
              <span className="text-slate-400">•</span>
              <span className="underline decoration-gold-500/50">Evaluations & Reviews ↓</span>
            </a>
          </div>
        </div>

        {/* Sleek Tabbed Platform Navigation Menu */}
        <div id="sarang-workspace-top" className="max-w-4xl mx-auto mb-6 scroll-mt-24">
          <div className="p-1.5 sm:p-2 rounded-2xl glass-card border border-cyan-500/30 bg-navy-950/80 shadow-2xl grid grid-cols-3 gap-2">
            {SARANG_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'jnana') {
                      openHeroChat();
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  className={`relative py-3.5 px-2 sm:px-6 rounded-xl transition-all duration-300 w-full flex flex-col items-center justify-center group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/90 via-navy-900 to-blue-950/90 text-white border border-cyan-400 shadow-cyan-glow'
                      : 'text-slate-400 hover:text-white hover:bg-navy-900/50 border border-transparent hover:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    {/* Top Row: Icon, Main Title, and Badge (if any) */}
                    <div className="flex flex-row items-center justify-center space-x-2 mb-1">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                      <span className="text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap">
                        {tab.name}
                      </span>
                      {tab.badge && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-navy-900 text-gold-400 border border-gold-500/40 shrink-0">
                          <Lock className="w-2.5 h-2.5 text-gold-400" />
                          <span>{tab.badge}</span>
                        </span>
                      )}
                    </div>

                    {/* Subtitle: Directly below top row */}
                    <span className={`text-[10px] font-bold tracking-widest uppercase text-center block ${
                      isActive ? 'text-cyan-300' : 'text-slate-400'
                    }`}>
                      {tab.shortLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: JNANA (WISDOM) — The Interactive Chat Console */}
        {activeTab === 'jnana' && <JnanaChatWorkspace />}

        {/* Tab 2: KARMA (EXECUTE) — Autonomous Execution Studio */}
        {activeTab === 'karma' && (
          <div className="animate-fadeIn">
            <KarmaExecutionStudio />
          </div>
        )}

        {/* Tab 3: DRISHTI (MONITOR) — Risk Observatory */}
        {activeTab === 'drishti' && (
          <div className="animate-fadeIn">
            <DrishtiRiskObservatory />
          </div>
        )}

        {/* Sarang AI Reviews & Community Ratings Feed */}
        <SarangReviews />

      </div>
    </section>
  );
}
