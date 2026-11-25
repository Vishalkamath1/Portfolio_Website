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
  deleteContactMessage,
  ContactMessageRecord,
  fetchSarangReviews,
  deleteSarangReview,
  updateSarangReview,
  triggerRevalidation,
  supabase
} from '@/lib/supabaseClient';
import { Project, ProjectCategory, ProjectStatus, PillarMode, SarangReview, normalizeProjectStatus } from '@/types';
import { 
  FolderGit2, 
  Mail, 
  LogOut, 
  Database, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw,
  Star
} from 'lucide-react';
import ProjectModal from '@/components/ProjectModal';
import AdminProjectsTab from '@/components/admin/AdminProjectsTab';
import AdminInboxTab from '@/components/admin/AdminInboxTab';
import AdminReviewsTab from '@/components/admin/AdminReviewsTab';
import AdminDatabaseTab from '@/components/admin/AdminDatabaseTab';

const CATEGORIES: ProjectCategory[] = [
  'GMC & GPA Underwriting AI',
  'Claims Automation',
  'GenAI Tools',
  'Insurance Analytics / Power BI',
  'Automation (Excel/Python)',
  'Experiments'
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
    let isMounted = true;

    const checkAuth = async () => {
      // 1. If sessionStorage is already set, resolve immediately
      const clientAuth = sessionStorage.getItem('sarang_admin_auth') || sessionStorage.getItem('sharang_admin_auth');
      if (clientAuth === 'true') {
        if (isMounted) setIsAuthenticated(true);
        return;
      }

      // 2. Otherwise verify server-side httpOnly session cookie
      try {
        const res = await fetch('/api/admin/session');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && isMounted) {
            sessionStorage.setItem('sarang_admin_auth', 'true');
            if (data.email) sessionStorage.setItem('sarang_admin_email', data.email);
            setIsAuthenticated(true);
            return;
          }
        }
      } catch (err) {
        console.warn('Session verification error:', err);
      }

      // 3. If neither client nor server session is valid, redirect to login
      if (isMounted) {
        setIsAuthenticated(false);
        try {
          router.replace('/admin/login');
        } catch {
          window.location.assign('/admin/login');
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
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
      setReviews(loadedReviews);
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
      // 1. Clear server-side httpOnly session cookie
      await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});

      // 2. Clear session and local storage authentication
      sessionStorage.removeItem('sarang_admin_auth');
      sessionStorage.removeItem('sarang_admin_email');
      sessionStorage.removeItem('sharang_admin_auth');
      sessionStorage.removeItem('sharang_admin_email');
      localStorage.removeItem('sarang_admin_auth');
      localStorage.removeItem('sarang_admin_email');
      localStorage.removeItem('sharang_admin_auth');
      localStorage.removeItem('sharang_admin_email');

      // 3. Perform Supabase authentication sign-out
      if (supabase) {
        await supabase.auth.signOut().catch(() => {});
      }
    } catch (e) {
      console.warn('Error during sign-out:', e);
    } finally {
      setIsAuthenticated(false);
      // 4. Route user back to login screen
      window.location.href = '/admin/login';
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    setIsDeletingReview(id);
    try {
      await deleteSarangReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      await triggerRevalidation('/');
    } catch (e) {
      console.error('Error deleting review:', e);
    } finally {
      setIsDeletingReview(null);
    }
  };

  const handleApproveReview = async (id: string, approved: boolean) => {
    try {
      await updateSarangReview(id, { approved });
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)));
      await triggerRevalidation('/');
    } catch (e) {
      console.error('Error approving review:', e);
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

CREATE TABLE IF NOT EXISTS public.sarang_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    user_role TEXT DEFAULT 'Insurance Professional',
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Migration for existing sarang_reviews tables:
ALTER TABLE public.sarang_reviews ADD COLUMN IF NOT EXISTS approved BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sarang_reviews ENABLE ROW LEVEL SECURITY;

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
CREATE POLICY "Authenticated users manage contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true);

-- Sarang Reviews Policies
DROP POLICY IF EXISTS "Allow public read on sarang_reviews" ON public.sarang_reviews;
CREATE POLICY "Allow public read on sarang_reviews" ON public.sarang_reviews FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public insert on sarang_reviews" ON public.sarang_reviews;
CREATE POLICY "Allow public insert on sarang_reviews" ON public.sarang_reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update on sarang_reviews" ON public.sarang_reviews;
CREATE POLICY "Allow authenticated update on sarang_reviews" ON public.sarang_reviews FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete on sarang_reviews" ON public.sarang_reviews;
CREATE POLICY "Allow authenticated delete on sarang_reviews" ON public.sarang_reviews FOR DELETE TO anon, authenticated USING (true);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/50 bg-cyan-950 shadow-cyan-glow p-1">
            <Image
              src="/sarang-logo.webp"
              alt="Sarang AI Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-white tracking-wider flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Verifying Admin Session...</span>
            </div>
            <p className="text-xs text-slate-500">Checking authenticated credentials</p>
          </div>
        </div>
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
          <AdminProjectsTab
            projects={projects}
            onNewProject={handleOpenNewProject}
            onEditProject={handleOpenEditProject}
            onPreviewProject={(proj) => setPreviewProject(proj)}
            onTogglePublish={handleTogglePublish}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {/* TAB 2: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <AdminInboxTab
            messages={messages}
            onDeleteMessage={handleDeleteMessage}
            isDeletingMessage={isDeletingMessage}
          />
        )}

        {/* TAB 3: SARANG AI REVIEWS & RATINGS */}
        {activeTab === 'reviews' && (
          <AdminReviewsTab
            reviews={reviews}
            onDeleteReview={handleDeleteReview}
            isDeletingReview={isDeletingReview}
            onApproveReview={handleApproveReview}
          />
        )}

        {/* TAB 4: DATABASE SCHEMA & INSTRUCTIONS */}
        {activeTab === 'database' && (
          <AdminDatabaseTab
            copiedSql={copiedSql}
            onCopySql={copySqlToClipboard}
          />
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
