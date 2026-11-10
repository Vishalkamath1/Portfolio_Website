'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  BookOpen, 
  Activity,
  ArrowRight,
  Lock,
  Upload,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Sliders,
  Eye,
  Clock
} from 'lucide-react';
import { SUGGESTED_QUESTIONS, OWNER_PROFILE } from '@/data/portfolioData';
import { ChatMessage, SpecialistMode } from '@/types';

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

const SPECIALIST_MODES: { id: SpecialistMode; name: string; desc: string; icon: any }[] = [
  { id: 'general', name: 'General', desc: 'Overview & Portfolio queries', icon: Sparkles },
  { id: 'underwriting', name: 'Underwriting', desc: 'GMC & GPA risk, ICR & burn costing', icon: Cpu },
  { id: 'claims', name: 'Claims', desc: 'Cashless pre-auth & exclusions', icon: Activity },
  { id: 'knowledge', name: 'Knowledge', desc: 'IRDAI regulations & policy clauses', icon: BookOpen },
  { id: 'analytics', name: 'Analytics', desc: 'Loss ratios & Excel models', icon: Layers },
  { id: 'automation', name: 'Automation', desc: 'Census cleaning & AI pipelines', icon: Zap },
];

/* -------------------------------------------------------------------------- */
/* KARMA: Autonomous Execution Studio (Drag & Drop + Processing UI)          */
/* -------------------------------------------------------------------------- */
function KarmaWorkspace() {
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

/* -------------------------------------------------------------------------- */
/* DRISHTI: Risk Observatory (Analytics Dashboard & Metrics Monitoring)       */
/* -------------------------------------------------------------------------- */
function DrishtiDashboard() {
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

/* -------------------------------------------------------------------------- */
/* Main Agent Section Component (Single Platform Architecture)                */
/* -------------------------------------------------------------------------- */
export default function AgentSection() {
  const [activeTab, setActiveTab] = useState<SarangTab>('jnana');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'sarang',
      text: `Shri Sita Ram! I'm SARANG.
YOUR INSURANCE AI INTELLIGENCE COMPANION

I am an AI-powered assistant designed to bridge the gap between insurance domain expertise and intelligent technology. Built around practical insurance knowledge and AI-driven problem-solving, I can help you explore underwriting strategies, evaluate insurance risks, understand technical concepts, and discover automation opportunities.

From insurance intelligence to AI innovation — let's build smarter solutions together.

What would you like to explore today?`,
      timestamp: 'Just now',
      suggestedActions: SUGGESTED_QUESTIONS
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
        const replyText = data.reply || getDemoResponse(query, activeMode);
        
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'sarang',
            text: replyText,
            timestamp: 'Just now'
          }
        ]);
      } else {
        // Fallback to intelligent local demo responses
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'sarang',
              text: getDemoResponse(query, activeMode),
              timestamp: 'Just now'
            }
          ]);
        }, 500);
      }
    } catch {
      // Offline fallback
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'sarang',
            text: getDemoResponse(query, activeMode),
            timestamp: 'Just now'
          }
        ]);
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
        text: `Shri Sita Ram! I'm SARANG.
YOUR INSURANCE AI INTELLIGENCE COMPANION

I am an AI-powered assistant designed to bridge the gap between insurance domain expertise and intelligent technology. Built around practical insurance knowledge and AI-driven problem-solving, I can help you explore underwriting strategies, evaluate insurance risks, understand technical concepts, and discover automation opportunities.

From insurance intelligence to AI innovation — let's build smarter solutions together.

What would you like to explore today?`,
        timestamp: 'Just now',
        suggestedActions: SUGGESTED_QUESTIONS
      }
    ]);
  };

  const currentTab = SARANG_TABS.find(t => t.id === activeTab) || SARANG_TABS[0];

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
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-medium">
            A single tripartite AI platform bridging domain underwriting, execution automation, and risk monitoring.
          </p>
        </div>

        {/* Sleek Tabbed Platform Navigation Menu */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="p-1.5 sm:p-2 rounded-2xl glass-card border border-cyan-500/30 bg-navy-950/80 shadow-2xl grid grid-cols-3 gap-2">
            {SARANG_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-3.5 px-2 sm:px-6 rounded-xl text-center transition-all duration-300 flex flex-col items-center justify-center group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/90 via-navy-900 to-blue-950/90 text-white border border-cyan-400 shadow-cyan-glow'
                      : 'text-slate-400 hover:text-white hover:bg-navy-900/50 border border-transparent hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                    <span className="text-xs sm:text-sm font-black tracking-wider uppercase">
                      {tab.name}
                    </span>
                    {tab.badge && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-navy-900 text-gold-400 border border-gold-500/40 shrink-0">
                        <Lock className="w-2.5 h-2.5 text-gold-400" />
                        <span className="hidden md:inline">{tab.badge}</span>
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${
                    isActive ? 'text-cyan-300' : 'text-slate-400'
                  }`}>
                    {tab.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Mission Tagline Display */}
          <div className="mt-4 flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-navy-900/90 border border-cyan-500/30 shadow-md backdrop-blur-md text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="text-slate-400 font-medium">Tagline:</span>
              <span className="text-white font-bold tracking-wide italic">
                "{currentTab.tagline}"
              </span>
            </div>
          </div>
        </div>

        {/* Tab 1: JNANA (WISDOM) — The Interactive Chat Console */}
        {activeTab === 'jnana' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
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
                    <span>SYSTEM INTELLIGENCE</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    An advanced AI-powered insurance intelligence ecosystem combining 7+ years of GMC & GPA underwriting expertise with AI engineering, intelligent automation, and advanced Excel frameworks. Designed to demonstrate practical solutions for underwriting, risk assessment, claims analytics, and insurance process optimization.
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
                        <span className="text-[10px] text-cyan-300 bg-cyan-950 border border-cyan-500/30 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                          {currentTab.name} Mode
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
        )}

        {/* Tab 2: KARMA (EXECUTE) — Autonomous Execution Studio */}
        {activeTab === 'karma' && (
          <div className="animate-fadeIn">
            <KarmaWorkspace />
          </div>
        )}

        {/* Tab 3: DRISHTI (MONITOR) — Risk Observatory */}
        {activeTab === 'drishti' && (
          <div className="animate-fadeIn">
            <DrishtiDashboard />
          </div>
        )}

      </div>
    </section>
  );
}
