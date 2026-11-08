'use client';

import React, { useState } from 'react';
import { EXPERTISE_ITEMS } from '@/data/portfolioData';
import { 
  ShieldCheck, 
  UserCheck, 
  Workflow, 
  FileSpreadsheet, 
  Cpu, 
  Zap, 
  Lightbulb, 
  Sparkles,
  CheckCircle2,
  Layers
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
  UserCheck: <UserCheck className="w-6 h-6 text-cyan-400" />,
  Workflow: <Workflow className="w-6 h-6 text-cyan-400" />,
  FileSpreadsheet: <FileSpreadsheet className="w-6 h-6 text-gold-400" />,
  Cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
  Zap: <Zap className="w-6 h-6 text-gold-400" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-cyan-400" />
};

export default function ExpertiseSection() {
  const [filter, setFilter] = useState<'all' | 'core_insurance' | 'technical_ai'>('all');

  const filteredItems = EXPERTISE_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="expertise" className="py-24 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-cyan-600/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-gold-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5 text-gold-400" />
            <span>Section 3 · Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Underwriting & AI Expertise
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Authentic domain proficiencies bridging two distinct fields. Combining battle-tested corporate health underwriting and rigorous numerical modelling with real-world AI implementation and process automation.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow'
                  : 'glass-panel text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              All 7 Competencies
            </button>
            <button
              onClick={() => setFilter('core_insurance')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filter === 'core_insurance'
                  ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow'
                  : 'glass-panel text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              Core Insurance & Underwriting
            </button>
            <button
              onClick={() => setFilter('technical_ai')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                filter === 'technical_ai'
                  ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow'
                  : 'glass-panel text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              AI Tools & Automation
            </button>
          </div>
        </div>

        {/* 7 Professional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all group"
            >
              <div>
                {/* Header with Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                    {ICON_MAP[item.iconName] || <ShieldCheck className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-navy-950/80 border border-slate-800 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.summary}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2 border-t border-slate-800/80 pt-4">
                  {item.bullets.map((b, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="capitalize">{item.category.replace('_', ' ')}</span>
                <span className="text-gold-400 font-semibold group-hover:translate-x-1 transition-transform">Verified Skill →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
