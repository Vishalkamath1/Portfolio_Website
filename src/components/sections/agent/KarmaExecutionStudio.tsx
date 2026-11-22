'use client';

import React from 'react';
import { 
  Zap, 
  Upload, 
  FileSpreadsheet, 
  Sliders, 
  Lock, 
  Clock 
} from 'lucide-react';

export default function KarmaExecutionStudio() {
  return (
    <div className="relative rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl bg-navy-950/90 p-6 sm:p-8">
      {/* Workspace Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-950/90 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-cyan-glow">
            <Zap className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>SARANG KARMA · Autonomous Execution Studio</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                EXECUTE
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Bulk Underwriting Normalization, Automated Census Parsing & Quotation Synthesis
            </p>
          </div>
        </div>

        {/* Workflow Pipelines Selector */}
        <div className="flex items-center gap-1.5 bg-navy-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40">
            Census Sanitizer
          </span>
          <span className="px-3 py-1.5 text-slate-400 font-medium">
            Burn Cost Engine
          </span>
          <span className="px-3 py-1.5 text-slate-400 font-medium">
            Clause Comparator
          </span>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Drag & Drop Zone & Action CTAs */}
        <div className="lg:col-span-7 space-y-5">
          {/* File Upload Zone */}
          <div className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-8 sm:p-10 text-center bg-navy-900/40 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-cyan-glow">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">
              Drag & Drop Corporate Member Census or Past Claims
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
              Upload raw corporate broker spreadsheets (.xlsx, .xls, .csv). Engine auto-detects header discrepancies, normalizes age bands, validates dependent relationships, and flags risk outliers.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 transition-colors cursor-pointer shadow-sm">
              <Upload className="w-4 h-4" />
              <span>Select File from Machine (.csv / .xlsx)</span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-slate-500 font-medium">
              <span>Formats: CSV, XLSX, XLS</span>
              <span>•</span>
              <span>Max Size: 50MB</span>
              <span>•</span>
              <span>Local Encryption</span>
            </div>
          </div>

          {/* Action Processing Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button 
              type="button"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-cyan-glow hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Run Autonomous Extraction & Pricing</span>
            </button>
            <button 
              type="button"
              className="px-4 py-3 rounded-xl glass-panel border border-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 hover:text-white hover:border-cyan-400/50 transition-colors"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Calibrate Morbidity Weights</span>
            </button>
            <button 
              type="button"
              className="px-4 py-3 rounded-xl bg-navy-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            >
              Download Template (.xlsx)
            </button>
          </div>
        </div>

        {/* Right Column: Execution Processing Pipeline Stream */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>Automated Processing Pipeline</span>
            <span className="text-cyan-400 text-[10px]">4 Stages</span>
          </div>
          {[
            { 
              step: '01', 
              title: 'Header Alignment & Deduplication', 
              desc: 'Normalizes employee ID, family floater tags, and sum insured bands across broker formats.', 
              status: 'Configured' 
            },
            { 
              step: '02', 
              title: 'Demographic Morbidity Scoring', 
              desc: 'Weights parental coverage ratio, average group age, and historical maternity claims volume.', 
              status: 'Ready' 
            },
            { 
              step: '03', 
              title: 'Pure Incurred Burn Cost Computation', 
              desc: 'Calculates pure risk premium per life with 12% healthcare medical inflation indexing.', 
              status: 'Ready' 
            },
            { 
              step: '04', 
              title: 'Underwriter Quote Slip Generation', 
              desc: 'Produces structured broker recommendation with recommended co-pay tiers and capping options.', 
              status: 'Standby' 
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-navy-950 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-500/30 font-semibold">{item.status}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Translucent Locked Glass-Morphism Overlay */}
      <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-[5px] z-20 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-6 sm:p-8 rounded-3xl glass-card border border-cyan-400/40 shadow-2xl bg-navy-950/90 space-y-4 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mx-auto shadow-cyan-glow">
            <Lock className="w-7 h-7 text-cyan-300" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/90 text-cyan-300 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/40 mb-2">
              <Zap className="w-3 h-3 text-gold-400" />
              <span>Phase 2 Workspace · In Active Development</span>
            </div>
            <h4 className="text-xl font-black text-white tracking-tight">
              KARMA Execution Studio
            </h4>
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mt-0.5">
              Turn Intelligence into Action.
            </p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Autonomous execution pipelines for bulk employee census normalization, automated quote slip synthesis, and underwriter Excel models are currently being trained and calibrated.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-cyan-300 font-semibold">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Private Preview — Underwriting Automation In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}
