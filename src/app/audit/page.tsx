'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Printer, Shield, CheckCircle2, AlertTriangle, Cpu, Database, Eye } from 'lucide-react';

export default function AuditReportPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Floating Control Bar */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-navy-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="/api/audit/download"
            download="SARANG_AI_Architecture_Audit_Report.md"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download .MD</span>
          </a>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 text-xs font-bold transition-all shadow-cyan-glow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Audit Document Container */}
      <main className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-10 border border-slate-800/90 shadow-2xl bg-navy-900/40">
        
        {/* Header Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5 text-gold-400" />
            <span>Architecture & Security Audit</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            SARANG AI — Comprehensive Architecture & Codebase Audit
          </h1>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
            <div><span className="text-slate-500 font-medium">Date:</span> Nov 15, 2026</div>
            <div><span className="text-slate-500 font-medium">Auditor:</span> Principal Architect</div>
            <div><span className="text-slate-500 font-medium">Stack:</span> Next.js 14.2 / TS 5.6</div>
            <div><span className="text-slate-500 font-medium">Status:</span> Production Verified</div>
          </div>
        </div>

        {/* Section 1: Health Scorecard */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            1. Executive Summary & Health Scorecard
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            A comprehensive architectural review was performed across the component hierarchy, state contexts, API endpoints, Supabase data access layer, and UI responsiveness layers. The application demonstrates solid TypeScript safety (<code className="text-cyan-400 bg-navy-950 px-1 py-0.5 rounded">0 build errors</code>) and resilient offline fallbacks, with technical debt primarily concentrated in unused legacy modal code and API route divergence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase">Component Modularity</span>
                <span className="text-sm font-black text-amber-400">78 / 100</span>
              </div>
              <p className="text-xs text-slate-400">471 lines of dead modal code; redundant DB fetch in Section 5.</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase">Supabase & API Efficiency</span>
                <span className="text-sm font-black text-amber-400">72 / 100</span>
              </div>
              <p className="text-xs text-slate-400"><code>/api/chat</code> unused while <code>/api/jnana</code> lacks underwriting prompt.</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase">Performance & UI</span>
                <span className="text-sm font-black text-emerald-400">88 / 100</span>
              </div>
              <p className="text-xs text-slate-400">Fast 22.5 kB page bundle; smooth scroll heuristics active.</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase">Type Safety & Build</span>
                <span className="text-sm font-black text-emerald-400">95 / 100</span>
              </div>
              <p className="text-xs text-slate-400">Strict TypeScript compilation (<code>tsc --noEmit</code> passed cleanly).</p>
            </div>
          </div>
        </section>

        {/* Section 2: Component Structure */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            2. Component Structure & Modularity
          </h2>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <span className="text-red-400 font-mono text-xs">[DEBT]</span>
              <span>Dead Code: SarangChatModal.tsx (471 Lines)</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Following the Section 5 upgrade to an integrated inline console, the popup modal was retired. The file is never imported, referenced, or rendered by any page or layout.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <span className="text-amber-400 font-mono text-xs">[REDUNDANCY]</span>
              <span>Duplicate DB Query & Unrendered Modal in AgentSection.tsx</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Both <code>ProjectsSection.tsx</code> and <code>AgentSection.tsx</code> invoke <code>fetchProjectsFromDb()</code> independently. In Section 5, <code>jnanaProjects</code> is computed but never rendered, and <code>selectedProject</code> is never set, leaving an un-triggered <code>&lt;ProjectModal&gt;</code> mounted.
            </p>
          </div>
        </section>

        {/* Section 3: Supabase & API Efficiency */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            3. Supabase & API Efficiency
          </h2>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-xs">[SYNC]</span>
              <span>API Route Divergence: /api/chat vs /api/jnana</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Section 5 submits messages directly to <code>/api/jnana</code>. However, <code>/api/chat</code> contains an authentic 60-line underwriting persona prompt (ICR thresholds, burn cost formulas, compliance guardrails) that <code>/api/jnana</code> currently lacks.
            </p>
            <div className="p-2.5 rounded-lg bg-navy-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
              Recommendation: Port system prompt into /api/jnana streaming handler and safely retire /api/chat.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <span className="text-amber-400 font-mono text-xs">[SECURITY]</span>
              <span>Admin Authentication Boundary</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The <code>/admin</code> dashboard verifies access via client-side <code>sessionStorage</code>. Introducing server-side Next.js <code>middleware.ts</code> will protect admin routes at the edge.
            </p>
          </div>
        </section>

        {/* Section 4: Prioritized Action Plan */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-l-4 border-cyan-400 pl-3">
            4. Prioritized Action Plan Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Domain</th>
                  <th className="py-2.5 px-3">Action Item</th>
                  <th className="py-2.5 px-3">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-red-400">P0</td>
                  <td className="py-2.5 px-3 font-medium">API Persona</td>
                  <td className="py-2.5 px-3">Port domain prompt from <code>/api/chat</code> into <code>/api/jnana</code></td>
                  <td className="py-2.5 px-3 text-cyan-400">Domain-accurate AI streaming</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-red-400">P0</td>
                  <td className="py-2.5 px-3 font-medium">Dead Code</td>
                  <td className="py-2.5 px-3">Delete <code>SarangChatModal.tsx</code> (471 lines)</td>
                  <td className="py-2.5 px-3 text-emerald-400">Cleaner repository</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-red-400">P0</td>
                  <td className="py-2.5 px-3 font-medium">Performance</td>
                  <td className="py-2.5 px-3">Remove redundant DB fetch & <code>ProjectModal</code> in Section 5</td>
                  <td className="py-2.5 px-3 text-emerald-400">Eliminates duplicate queries</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-amber-400">P1</td>
                  <td className="py-2.5 px-3 font-medium">Context</td>
                  <td className="py-2.5 px-3">Prune unused <code>isChatOpen</code> from <code>AgentChatContext</code></td>
                  <td className="py-2.5 px-3 text-slate-300">Leaner state tree</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-amber-400">P1</td>
                  <td className="py-2.5 px-3 font-medium">Security</td>
                  <td className="py-2.5 px-3">Add Next.js <code>middleware.ts</code> edge gate for <code>/admin</code></td>
                  <td className="py-2.5 px-3 text-gold-400">Robust admin protection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto mt-8 text-center text-xs text-slate-500">
        SARANG AI • Confidential Architecture & Security Audit • Prepared for Vishal Kamath
      </footer>

    </div>
  );
}
