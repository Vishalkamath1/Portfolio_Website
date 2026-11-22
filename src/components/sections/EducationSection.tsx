'use client';

import React from 'react';
import { EDUCATION_CERTIFICATIONS } from '@/data/portfolioData';
import { GraduationCap, Award, BookOpen, CheckCircle, Clock } from 'lucide-react';

export default function EducationSection() {
  const getTypeBadge = (type: string, badge?: string) => {
    if (badge) {
      if (badge.toUpperCase().includes('DEGREE') || badge.toUpperCase().includes('DIPLOMA')) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            {badge}
          </span>
        );
      }
      if (badge.toUpperCase().includes('INSURANCE')) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            <Award className="w-3.5 h-3.5" />
            {badge}
          </span>
        );
      }
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
          <Award className="w-3.5 h-3.5" />
          {badge}
        </span>
      );
    }
    switch (type) {
      case 'degree':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Degree
          </span>
        );
      case 'certification':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-gold-950 text-gold-300 border border-gold-500/30">
            <Award className="w-3.5 h-3.5" />
            Insurance Credential
          </span>
        );
      case 'course_in_progress':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            AI In Progress
          </span>
        );
    }
  };

  return (
    <section id="credentials" className="py-24 border-t border-slate-800/80 bg-navy-900/30 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-600/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-gold-600/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
            <span>Section 6 · Credentials & Learning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Education & Certifications
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            A verified record of formal academic foundation, regulatory insurance certifications, and active practical AI engineering upskilling.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {EDUCATION_CERTIFICATIONS.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  {getTypeBadge(item.type, item.badge)}
                  <span className="text-xs font-bold text-slate-400">
                    {item.yearOrStatus}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-gold-400 mb-3 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{item.issuer}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Milestone
                </span>
                <span className="text-slate-500 text-[11px]">Domain Validated</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}