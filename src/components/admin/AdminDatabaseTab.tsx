'use client';

import React from 'react';
import { Database, Check, Copy } from 'lucide-react';

interface AdminDatabaseTabProps {
  copiedSql: boolean;
  onCopySql: () => void;
}

export default function AdminDatabaseTab({
  copiedSql,
  onCopySql
}: AdminDatabaseTabProps) {
  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border-cyan-500/30">
      <div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <span>Supabase Database Schema Setup</span>
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Your portfolio is configured to connect to your Supabase project: <code className="text-cyan-400 font-mono">https://rehnzcnlktcevrieosnj.supabase.co</code>
        </p>
      </div>

      <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-3 text-xs text-slate-300">
        <div className="font-bold text-white text-sm">How to finalize PostgreSQL tables in Supabase:</div>
        <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
          <li>Log into your Supabase project at <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">supabase.com/dashboard</a>.</li>
          <li>Navigate to the **SQL Editor** tab on the left sidebar.</li>
          <li>Click **"New query"**, paste the SQL script below, and click **"Run"**.</li>
          <li>That’s it! The tables (`projects`, `contact_messages`, `profile_content`) with Row Level Security (RLS) and initial seed data will be live immediately.</li>
        </ol>
      </div>

      <div className="relative">
        <button
          onClick={onCopySql}
          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950 border border-cyan-500/40 hover:bg-cyan-900 transition-colors flex items-center gap-1.5"
        >
          {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy Complete SQL'}</span>
        </button>

        <pre className="p-4 rounded-xl bg-navy-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-80 leading-relaxed">
{`-- Execute in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    category TEXT NOT NULL,
    pillar_mode TEXT NOT NULL DEFAULT 'Jnana Mode',
    business_problem TEXT NOT NULL,
    proposed_solution TEXT NOT NULL,
    tools TEXT[] NOT NULL DEFAULT '{}',
    business_impact TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'In Progress',
    demo_url TEXT,
    github_url TEXT,
    image_url TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Migration for existing tables:
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS pillar_mode TEXT NOT NULL DEFAULT 'Jnana Mode';

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    interest TEXT DEFAULT 'GMC & GPA Underwriting',
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Projects Policies
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "Authenticated users full access to projects" ON public.projects;
CREATE POLICY "Authenticated users full access to projects" ON public.projects FOR ALL TO authenticated USING (true);

-- Contact Messages Policies
DROP POLICY IF EXISTS "Anyone can insert contact message" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can read contact messages" ON public.contact_messages FOR SELECT TO anon, authenticated USING (true);

-- Authenticated users manage contact messages
DROP POLICY IF EXISTS "Authenticated users manage contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true);`}
        </pre>
      </div>
    </div>
  );
}
