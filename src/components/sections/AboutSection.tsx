'use client';

import React from 'react';
import { OWNER_PROFILE, CAREER_JOURNEY } from '@/data/portfolioData';
import { Shield, Briefcase, Zap, CheckCircle2, FileSpreadsheet, Sparkles, TrendingUp, Cpu } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 border-t border-slate-800/80 bg-navy-900/30 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5 text-gold-400" />
            <span>Section 2 · Professional Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            About Me & Career Evolution
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            A comprehensive look at my 7.4-year journey from frontline life insurance advisory into complex corporate group health underwriting, and the ongoing transition to applied insurance artificial intelligence.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Main Bio Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Domain Expertise Rooted in Real Underwriting</span>
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {OWNER_PROFILE.bio}
            </p>

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-navy-950/70 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-1">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Advanced Excel Modeler</span>
                </div>
                <p className="text-xs text-slate-400">
                  Extensive expertise building burn cost pricing models, demographic census sanitizers, and historical claim trend analyzers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-navy-950/70 border border-gold-500/20">
                <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Practical AI Integrator</span>
                </div>
                <p className="text-xs text-slate-400">
                  Focused on pragmatic prompt engineering, document cross-referencing, and workflow automation without speculative hype.
                </p>
              </div>
            </div>
          </div>

          {/* Underwriter Value Proposition Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 space-y-6 bg-gradient-to-br from-navy-900/90 to-navy-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Strategic Perspective
              </span>
              <span className="text-xs text-gold-400 font-semibold bg-gold-950/80 border border-gold-500/30 px-2 py-0.5 rounded">
                Underwriter-First AI
              </span>
            </div>

            <h4 className="text-lg font-bold text-white leading-snug">
              Why Domain Expertise Is The Secret Sauce for Insurance AI
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Generic software engineers lack intuition for policy exclusions, IBNR factors, corporate co-pays, and TPA billing disputes. 
              Because I have lived inside corporate broker quotations, member census anomalies, and claim rejection escalations for over 7 years, I know precisely where AI generates genuine leverage versus costly hallucinations.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Zero false claims of data science or engineering credentials.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Deep comprehension of IRDAI regulatory guidelines and GMC/GPA wordings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Underwriter-in-the-loop governance for all automated processes.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Timeline of 3 Milestones */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <TrendingUp className="w-5 h-5 text-gold-400" />
            <span>Career Milestones & Chronology</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAREER_JOURNEY.map((item, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 relative flex flex-col justify-between hover:border-cyan-400/50 transition-all group"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                    {item.period}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Phase {idx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.role}
                  </h4>
                  <p className="text-xs font-medium text-gold-400/90">
                    {item.focus}
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
