'use client';

import React from 'react';
import { 
  Activity, 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Lock, 
  Clock 
} from 'lucide-react';

export default function DrishtiRiskObservatory() {
  return (
    <div className="relative rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden shadow-2xl bg-navy-950/90 p-6 sm:p-8">
      {/* Dashboard Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gold-950/90 border border-gold-400/50 flex items-center justify-center text-gold-400 shadow-gold-glow">
            <Activity className="w-6 h-6 text-gold-300" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>SARANG DRISHTI · Risk Observatory</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-950 text-gold-300 border border-gold-500/40">
                MONITOR
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Continuous Portfolio Telemetry, Loss-Ratio Anomaly Detection & Predictive Alerts
            </p>
          </div>
        </div>

        {/* Real-time status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Telemetry Feeds: 42 Portfolios Active</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Overall Portfolio ICR', val: '78.4%', sub: 'Healthy Target Band: 75%-85%', color: 'text-emerald-400' },
          { label: 'Active Corporate Accounts', val: '42 Schemes', sub: '38 GMC / 4 GPA Portfolios', color: 'text-cyan-400' },
          { label: 'Morbidity Index Drift', val: '+4.2%', sub: 'Driven by Parental Floater claims', color: 'text-amber-400' },
          { label: 'Renewal Variance Forecast', val: '±3.5%', sub: 'Actuarial model confidence 94%', color: 'text-gold-400' }
        ].map((kpi, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-navy-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">{kpi.label}</div>
            <div className={`text-2xl font-black ${kpi.color} mt-1`}>{kpi.val}</div>
            <div className="text-[10px] text-slate-500 mt-1">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* 4 Analytics Chart Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Card 1: Loss Ratio Tracker */}
        <div className="glass-card rounded-2xl p-5 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Monthly ICR Drift vs. Target Ceiling
              </h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-500/30">
              12 Months
            </span>
          </div>
          {/* Mock Bar Visual */}
          <div className="h-32 flex items-end gap-2 pt-4 px-2 border-b border-slate-800">
            {[68, 72, 75, 71, 79, 82, 84, 88, 81, 78, 76, 78].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div 
                  className={`w-full rounded-t transition-all ${h > 85 ? 'bg-amber-400' : 'bg-cyan-500/70'}`}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Apr</span>
            <span className="text-amber-400 font-semibold">--- Max Threshold: 85%</span>
            <span>Mar</span>
          </div>
        </div>

        {/* Card 2: Demographic Breakdown */}
        <div className="glass-card rounded-2xl p-5 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Morbidity & Demographic Distribution
              </h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-gold-950 text-gold-400 font-bold border border-gold-500/30">
              Lives Split
            </span>
          </div>
          {/* Mock Progress Bands */}
          <div className="space-y-3 pt-2">
            {[
              { label: 'Employee Self (18-35)', pct: '48%', color: 'bg-cyan-400' },
              { label: 'Spouse Floater', pct: '28%', color: 'bg-blue-500' },
              { label: 'Dependent Children', pct: '16%', color: 'bg-indigo-500' },
              { label: 'Dependent Parents (60+)', pct: '8%', color: 'bg-gold-500' }
            ].map((row, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>{row.label}</span>
                  <span className="font-bold text-white">{row.pct}</span>
                </div>
                <div className="h-2 rounded-full bg-navy-900 overflow-hidden">
                  <div className={`h-full ${row.color}`} style={{ width: row.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Claims Severity Matrix */}
        <div className="glass-card rounded-2xl p-5 border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Claims Severity vs. Frequency Heatmap
              </h4>
            </div>
            <span className="text-[10px] text-slate-400">GMC + GPA</span>
          </div>
          <div className="h-28 rounded-lg bg-navy-900/60 border border-slate-800 flex items-center justify-center p-4 text-center">
            <div className="space-y-1">
              <div className="text-xs text-slate-300 font-semibold">High Frequency / Low Severity: Maternity & Daycare</div>
              <div className="text-[11px] text-slate-500">Low Frequency / High Severity: Cardiac, Oncology & GPA PTD</div>
            </div>
          </div>
        </div>

        {/* Card 4: Network Cashless Ratio */}
        <div className="glass-card rounded-2xl p-5 border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gold-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Cashless Pre-Auth vs. Reimbursement Ratio
              </h4>
            </div>
            <span className="text-[10px] text-slate-400">TPA Settlement</span>
          </div>
          <div className="h-28 rounded-lg bg-navy-900/60 border border-slate-800 flex items-center justify-around p-4">
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-400">74%</div>
              <div className="text-[10px] text-slate-400">Cashless Network</div>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-2xl font-black text-slate-300">26%</div>
              <div className="text-[10px] text-slate-400">Reimbursement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Translucent Locked Glass-Morphism Overlay */}
      <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-[5px] z-20 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-6 sm:p-8 rounded-3xl glass-card border border-gold-400/40 shadow-2xl bg-navy-950/90 space-y-4 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-amber-600/20 border border-gold-400/50 flex items-center justify-center text-gold-300 mx-auto shadow-gold-glow">
            <Lock className="w-7 h-7 text-gold-300" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-950/90 text-gold-300 text-[10px] font-bold uppercase tracking-widest border border-gold-500/40 mb-2">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>Phase 3 Observatory · In Active R&D</span>
            </div>
            <h4 className="text-xl font-black text-white tracking-tight">
              DRISHTI Risk Observatory
            </h4>
            <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mt-0.5">
              Monitor. Anticipate. Strategise.
            </p>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Continuous telemetry engines for portfolio loss-ratio forecasting, demographic morbidity shift alerts, and automated corporate renewal warnings are currently in development.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gold-300 font-semibold">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>Private Preview — Underwriting Telemetry Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
