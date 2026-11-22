'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  fetchProjectsFromDb, 
  saveProjectToDb, 
  deleteProjectFromDb, 
  fetchContactMessages, 
  saveContactMessage,
  deleteContactMessage,
  ContactMessageRecord,
  fetchSarangReviews,
  deleteSarangReview,
  isSupabaseConfigured,
  supabase
} from '@/lib/supabaseClient';
import { Project, ProjectCategory, ProjectStatus, PillarMode, SarangReview, normalizeProjectStatus } from '@/types';
import { 
  FolderGit2, 
  Mail, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  LogOut, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Lightbulb, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw,
  Search,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';
import ProjectModal from '@/components/ProjectModal';
import { BENCHMARK_EVALUATIONS } from '@/components/sections/SarangReviews';

const CATEGORIES: ProjectCategory[] = [
  'GMC & GPA Underwriting AI',
  'Claims Automation',
  'GenAI Tools',
  'Insurance Analytics / Power BI',
  'Automation (Excel/Python)',
  'Experiments'
];

const PILLAR_MODES: { id: PillarMode; label: string; desc: string }[] = [
  { id: 'Jnana Mode', label: 'Jnana Mode', desc: 'Knowledge, Chat & Specialist AI' },
  { id: 'Karma Mode', label: 'Karma Mode', desc: 'Autonomous Execution & Processing' },
  { id: 'Drishti Mode', label: 'Drishti Mode', desc: 'Risk Observatory & Auditing' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'reviews' | 'database'>('projects');
  
  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [reviews, setReviews] = useState<SarangReview[]>([]);
  const [isDeletingReview, setIsDeletingReview] = useState<string | null>(null);
  const [isDeletingMessage, setIsDeletingMessage] = useState<string | null>(null);
  const [isDbLive, setIsDbLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal / Form states
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project>>({
    title: '',
    tagline: '',
    category: 'GMC & GPA Underwriting AI',
    pillarMode: 'Jnana Mode',
    status: 'In Progress',
    businessProblem: '',
    proposedSolution: '',
    tools: [],
    businessImpact: '',
    demoUrl: '',
    githubUrl: '',
    published: true,
    featured: false,
  });
  const [toolsInput, setToolsInput] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    try {
      const auth = sessionStorage.getItem('sarang_admin_auth') || sessionStorage.getItem('sharang_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        try {
          router.replace('/admin/login');
        } catch {
          window.location.assign('/admin/login');
        }
      }
    } catch {
      setIsAuthenticated(false);
      window.location.assign('/admin/login');
    }
  }, [router]);

  // Load data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const { projects: loadedProjects, isDbLive: live } = await fetchProjectsFromDb();
      setProjects(loadedProjects);
      setIsDbLive(live);

      const loadedMessages = await fetchContactMessages();
      setMessages(loadedMessages);

      const loadedReviews = await fetchSarangReviews();
      // Combine static creator benchmarks with live Supabase reviews for admin moderation
      const allAdminReviews = [
        ...BENCHMARK_EVALUATIONS.map(b => ({ ...b, isBenchmark: true, id: b.id || `benchmark-${Math.random()}` })),
        ...loadedReviews
      ];
      setReviews(allAdminReviews);
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      // 1. Clear session and local storage authentication
      sessionStorage.removeItem('sarang_admin_auth');
      sessionStorage.removeItem('sarang_admin_email');
      sessionStorage.removeItem('sharang_admin_auth');
      sessionStorage.removeItem('sharang_admin_email');
      localStorage.removeItem('sarang_admin_auth');
      localStorage.removeItem('sarang_admin_email');
      localStorage.removeItem('sharang_admin_auth');
      localStorage.removeItem('sharang_admin_email');

      // 2. Perform Supabase authentication sign-out
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn('Error during Supabase sign-out:', e);
    } finally {
      setIsAuthenticated(false);
      // 3. Automatically route the user back to the login screen
      window.location.href = '/admin/login';
    }
  };

  const handleDeleteReview = async (id: string) => {
    const target = reviews.find((r) => r.id === id);
    if (target?.isBenchmark) {
      alert('Creator benchmark evaluations are protected baseline stress tests and cannot be deleted.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    setIsDeletingReview(id);
    try {
      await deleteSarangReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error('Error deleting review:', e);
    } finally {
      setIsDeletingReview(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    setIsDeletingMessage(id);
    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      console.error('Error deleting contact message:', e);
    } finally {
      setIsDeletingMessage(null);
    }
  };

  const handleOpenNewProject = () => {
    setEditingProject({
      title: '',
      tagline: '',
      category: 'GMC & GPA Underwriting AI',
      pillarMode: 'Jnana Mode',
      status: 'In Progress',
      businessProblem: '',
      proposedSolution: '',
      tools: ['Next.js', 'Excel', 'Gemini API'],
      businessImpact: '',
      demoUrl: '#agent',
      githubUrl: '',
      published: true,
      featured: false,
    });
    setToolsInput('Next.js, Excel, Gemini API');
    setIsCustomCategory(false);
    setIsEditing(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProject({
      ...proj,
      pillarMode: proj.pillarMode || 'Jnana Mode',
    });
    setToolsInput(proj.tools ? proj.tools.join(', ') : '');
    setIsCustomCategory(!CATEGORIES.includes(proj.category as any));
    setIsEditing(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Saving...');

    const toolsArray = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const canonicalStatus = normalizeProjectStatus(editingProject.status) === 'Completed'
      ? 'Completed'
      : (editingProject.status || 'In Progress');

    const payload: Partial<Project> = {
      ...editingProject,
      status: canonicalStatus,
      tools: toolsArray,
    };

    const res = await saveProjectToDb(payload);
    if (res.success) {
      // Trigger Next.js revalidation for public page
      try {
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: '/' })
        });
      } catch (revErr) {
        console.warn('Revalidation trigger error:', revErr);
      }

      setSaveStatus('Saved successfully!');
      setTimeout(() => {
        setSaveStatus(null);
        setIsEditing(false);
        loadData();
      }, 600);
    } else {
      setSaveStatus('Failed to save project.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to remove this project from the library?')) {
      await deleteProjectFromDb(id);
      try {
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: '/' })
        });
      } catch {}
      loadData();
    }
  };

  const handleTogglePublish = async (proj: Project) => {
    const updated = { ...proj, published: !proj.published };
    await saveProjectToDb(updated);
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' })
      });
    } catch {}
    loadData();
  };

  const copySqlToClipboard = () => {
    const sql = `-- Run this in Supabase SQL Editor:
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

DROP POLICY IF EXISTS "Authenticated users manage contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true);`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null;
  }

  const publishedCount = projects.filter((p) => p.published).length;
  const draftCount = projects.length - publishedCount;

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col bg-grid-pattern">
      
      {/* Admin Top Navigation */}
      <header className="glass-panel border-b border-cyan-500/20 sticky top-0 z-40 bg-navy-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-cyan-400/50 bg-cyan-950 shadow-cyan-glow shrink-0">
              <Image
                src="/sarang-logo.webp"
                alt="Sarang AI Agent Logo"
                fill
                className="object-contain p-1"
                sizes="44px"
              />
            </div>
            <div>
              <div className="text-base font-black text-white flex items-center gap-2">
                <span>SARANG AI</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-950/80 border border-gold-500/30 px-1.5 py-0.2 rounded">
                  Owner Dashboard
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Connected to Supabase · Underwriting & AI Content CMS
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-end gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white glass-panel border border-slate-700 hover:border-cyan-400 transition-colors"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/50 border border-rose-500/30 hover:bg-rose-900/60 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl glass-card border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Total AI Projects
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {projects.length}
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card border-emerald-500/20 bg-emerald-950/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Live Published
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">
              {publishedCount}
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card border-amber-500/20 bg-amber-950/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
              Drafts / Hidden
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">
              {draftCount}
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card border-cyan-500/20 bg-cyan-950/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
              Contact Inquiries
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300">
              {messages.length}
            </div>
          </div>
        </div>

        {/* Database Status Callout Banner */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel-glow border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-900 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Supabase PostgreSQL Endpoint:</span>
                <code className="text-xs text-cyan-300 font-mono bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  rehnzcnlktcevrieosnj.supabase.co
                </code>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isDbLive 
                  ? 'Database connection active. Tables synchronized.' 
                  : 'Database connected! If you haven’t run the SQL schema yet in Supabase, projects are securely managed via the resilient fallback store.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copySqlToClipboard}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gold-300 bg-gold-950/80 border border-gold-500/40 hover:bg-gold-900/60 transition-colors flex items-center gap-1.5"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'SQL Copied!' : 'Copy Schema SQL'}</span>
            </button>
            <button
              onClick={loadData}
              className="p-2 rounded-xl glass-card text-slate-300 hover:text-white"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>AI Projects Library ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span>Sarang AI Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'database'
                ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow'
                : 'text-slate-400 hover:text-white glass-panel'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Schema & Instructions</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Project Library Manager</h3>
                <p className="text-xs text-slate-400">
                  Publish, edit, preview, or add new underwriting and AI automation prototypes.
                </p>
              </div>

              <button
                onClick={handleOpenNewProject}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-xs tracking-wide shadow-cyan-glow hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table / Cards */}
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-card rounded-2xl p-5 border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/20">
                        {proj.category}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        normalizeProjectStatus(proj.status) === 'Completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : normalizeProjectStatus(proj.status) === 'In Progress'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                          : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                      }`}>
                        {normalizeProjectStatus(proj.status) === 'Completed' ? 'Completed Prototype' : proj.status}
                      </span>
                      {proj.published ? (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Live on Portfolio
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> Unpublished Draft
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                      {proj.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tools.map((tool, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800 w-full md:w-auto justify-end">
                    <button
                      onClick={() => setPreviewProject(proj)}
                      className="p-2 rounded-lg glass-panel text-slate-300 hover:text-white"
                      title="Preview Project Modal"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 border ${
                        proj.published
                          ? 'bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/40'
                          : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40'
                      }`}
                      title={proj.published ? 'Unpublish' : 'Publish'}
                    >
                      {proj.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span className="hidden sm:inline">{proj.published ? 'Hide' : 'Publish'}</span>
                    </button>

                    <button
                      onClick={() => handleOpenEditProject(proj)}
                      className="p-2 rounded-lg glass-panel text-cyan-400 hover:text-cyan-300 border-cyan-500/30"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:text-rose-200"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Contact & Recruiter Inquiries</h3>
              <p className="text-xs text-slate-400">
                Inquiries submitted via Section 7 of the public portfolio website.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl max-w-md mx-auto">
                <Mail className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-300">No contact submissions received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="glass-card rounded-2xl p-5 border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{m.name}</span>
                          {m.company && (
                            <span className="text-xs text-slate-400 font-normal">
                              ({m.company})
                            </span>
                          )}
                        </div>
                        <a href={`mailto:${m.email}`} className="text-xs text-cyan-400 hover:underline">
                          {m.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-500/30">
                          {m.interest || 'Underwriting'}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          disabled={isDeletingMessage === m.id}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/60 border border-rose-500/30 hover:bg-rose-900/60 transition-colors flex items-center gap-1 disabled:opacity-50 ml-1"
                          title="Delete this message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isDeletingMessage === m.id ? 'Deleting...' : 'Delete'}</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: SARANG AI REVIEWS & RATINGS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                  <span>Sarang AI Reviews & Ratings Management</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect community evaluations, verify underwriting ratings, and moderate or delete reviews.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-700 text-slate-300">
                  Total Reviews: <strong className="text-white">{reviews.length}</strong>
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gold-950/80 border border-gold-500/40 text-gold-300">
                  Average Rating: <strong className="text-white">
                    {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0'} ★
                  </strong>
                </span>
              </div>
            </div>

            {reviews.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl max-w-md mx-auto">
                <Star className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-300">No reviews have been submitted yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="glass-card rounded-2xl p-5 border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{rev.userName}</span>
                          {rev.isBenchmark && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-950 text-gold-400 border border-gold-500/40">
                              Creator Benchmark
                            </span>
                          )}
                          {rev.userRole && (
                            <span className="text-xs text-slate-400 font-normal">
                              ({rev.userRole})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-gold-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating ? 'text-gold-400 fill-gold-400' : 'text-slate-700'
                              }`}
                            />
                          ))}
                          <span className="text-xs font-bold text-slate-300 ml-1">
                            {rev.rating}.0
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500">
                          {(() => {
                            try {
                              const d = new Date(rev.createdAt);
                              if (isNaN(d.getTime())) return rev.createdAt;
                              const month = d.toLocaleDateString('en-US', { month: 'short' });
                              const day = String(d.getDate()).padStart(2, '0');
                              const year = d.getFullYear();
                              return `${month} ${day}, ${year}`;
                            } catch {
                              return rev.createdAt;
                            }
                          })()}
                        </span>

                        {rev.isBenchmark ? (
                          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 bg-navy-900 border border-slate-800 cursor-default" title="Static creator benchmark test">
                            Protected
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            disabled={isDeletingReview === rev.id}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/60 border border-rose-500/30 hover:bg-rose-900/60 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                            title="Delete this review permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{isDeletingReview === rev.id ? 'Deleting...' : 'Delete'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-2 border-l-2 border-cyan-500/30">
                      "{rev.reviewText}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DATABASE SCHEMA & INSTRUCTIONS */}
        {activeTab === 'database' && (
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
                onClick={copySqlToClipboard}
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

DROP POLICY IF EXISTS "Authenticated users manage contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true);`}
              </pre>
            </div>
          </div>
        )}

      </main>

      {/* Project Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-cyan-500/30 p-6 sm:p-8 space-y-6 bg-navy-950">
            <h3 className="text-xl font-bold text-white">
              {editingProject.id ? 'Edit Project' : 'Add New Underwriting & AI Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GMC Policy Clause AI Comparer"
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tagline / Brief Summary *
                </label>
                <input
                  type="text"
                  required
                  placeholder="One sentence describing the core functionality..."
                  value={editingProject.tagline || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={CATEGORIES.includes(editingProject.category as any) ? editingProject.category : 'custom'}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomCategory(true);
                        setEditingProject({ ...editingProject, category: '' });
                      } else {
                        setIsCustomCategory(false);
                        setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory });
                      }
                    }}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="custom">Custom...</option>
                  </select>
                  {isCustomCategory && (
                    <input
                      type="text"
                      required
                      placeholder="Enter custom category name..."
                      value={editingProject.category || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full mt-2 bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Pillar Mode *
                  </label>
                  <select
                    required
                    value={editingProject.pillarMode || 'Jnana Mode'}
                    onChange={(e) => setEditingProject({ ...editingProject, pillarMode: e.target.value as PillarMode })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Jnana Mode">Jnana Mode</option>
                    <option value="Karma Mode">Karma Mode</option>
                    <option value="Drishti Mode">Drishti Mode</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Development Status *
                </label>
                <select
                  value={normalizeProjectStatus(editingProject.status) === 'Completed' ? 'Completed' : (editingProject.status || 'In Progress')}
                  onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Completed">Completed Prototype</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Idea">Idea / Concept</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Current Challenge *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the operational friction or underwriting challenge..."
                  value={editingProject.businessProblem || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, businessProblem: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Proposed AI / Automation Solution *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the technical or AI workflow that solves the problem..."
                  value={editingProject.proposedSolution || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, proposedSolution: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Measured Business Impact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cuts policy audit time from 3 hours to 3 minutes"
                  value={editingProject.businessImpact || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, businessImpact: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tools & Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, Advanced Excel, Gemini API, TypeScript"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Demo Link (Anchor or URL)
                  </label>
                  <input
                    type="text"
                    placeholder="#agent or https://..."
                    value={editingProject.demoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    GitHub / Source Code Link
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-navy-900 border-slate-700"
                  />
                  <span>Published (Visible to public visitors)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-navy-900 border-slate-700"
                  />
                  <span>Featured Project</span>
                </label>
              </div>

              {saveStatus && (
                <div className="text-xs font-semibold text-cyan-400">
                  {saveStatus}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl glass-panel text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-xs tracking-wide shadow-cyan-glow hover:from-cyan-400 hover:to-blue-500"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Preview Modal */}
      <ProjectModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />

    </div>
  );
}
