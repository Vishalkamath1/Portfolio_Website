import { createClient } from '@supabase/supabase-js';
import { Project, ProjectCategory } from '@/types';
import { INITIAL_PROJECTS, OWNER_PROFILE } from '@/data/portfolioData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.includes('supabase.co') &&
  !supabaseUrl.includes('placeholder')
);

// Singleton Supabase client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage key for fallback persistence
const LOCAL_PROJECTS_KEY = 'sharang_ai_local_projects';
const LOCAL_MESSAGES_KEY = 'sharang_ai_local_messages';
const LOCAL_PROFILE_KEY = 'sharang_ai_local_profile';

// ==============================================================================
// Projects Data Access Layer
// ==============================================================================

export async function fetchProjectsFromDb(): Promise<{ projects: Project[]; isDbLive: boolean }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map database snake_case to Project interface
        const mapped: Project[] = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          tagline: d.tagline,
          category: d.category as ProjectCategory,
          businessProblem: d.business_problem,
          proposedSolution: d.proposed_solution,
          tools: d.tools || [],
          businessImpact: d.business_impact,
          status: d.status,
          demoUrl: d.demo_url,
          githubUrl: d.github_url,
          imageUrl: d.image_url,
          published: d.published,
          featured: d.featured,
          createdAt: d.created_at,
        }));
        return { projects: mapped, isDbLive: true };
      }
    } catch (e) {
      console.warn('Supabase query error, falling back to local store:', e);
    }
  }

  // Fallback to localStorage (browser) or INITIAL_PROJECTS (server)
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_PROJECTS_KEY);
    if (saved) {
      try {
        return { projects: JSON.parse(saved), isDbLive: false };
      } catch (e) {
        // ignore parse error
      }
    }
  }

  return { projects: INITIAL_PROJECTS, isDbLive: false };
}

export async function saveProjectToDb(project: Partial<Project>): Promise<{ success: boolean; project?: Project; error?: string }> {
  const isNew = !project.id;
  const projectToSave: Project = {
    id: project.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'proj-' + Date.now()),
    title: project.title || 'Untitled Project',
    tagline: project.tagline || '',
    category: project.category || 'GMC & GPA Underwriting AI',
    businessProblem: project.businessProblem || '',
    proposedSolution: project.proposedSolution || '',
    tools: project.tools || [],
    businessImpact: project.businessImpact || '',
    status: project.status || 'In Progress',
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl,
    imageUrl: project.imageUrl,
    published: project.published !== undefined ? project.published : true,
    featured: project.featured || false,
    createdAt: project.createdAt || new Date().toISOString(),
  };

  // Try saving to Supabase if configured
  if (supabase) {
    try {
      const dbPayload = {
        id: projectToSave.id,
        title: projectToSave.title,
        tagline: projectToSave.tagline,
        category: projectToSave.category,
        business_problem: projectToSave.businessProblem,
        proposed_solution: projectToSave.proposedSolution,
        tools: projectToSave.tools,
        business_impact: projectToSave.businessImpact,
        status: projectToSave.status,
        demo_url: projectToSave.demoUrl || null,
        github_url: projectToSave.githubUrl || null,
        image_url: projectToSave.imageUrl || null,
        published: projectToSave.published,
        featured: projectToSave.featured,
      };

      const { data, error } = isNew
        ? await supabase.from('projects').insert([dbPayload]).select()
        : await supabase.from('projects').update(dbPayload).eq('id', projectToSave.id).select();

      if (!error && data && data.length > 0) {
        return { success: true, project: projectToSave };
      }
    } catch (e: any) {
      console.warn('Supabase save error, persisting to local cache:', e?.message);
    }
  }

  // Update local storage fallback
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_PROJECTS_KEY);
    let list: Project[] = saved ? JSON.parse(saved) : [...INITIAL_PROJECTS];
    if (isNew) {
      list.unshift(projectToSave);
    } else {
      list = list.map((p) => (p.id === projectToSave.id ? projectToSave : p));
    }
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(list));
  }

  return { success: true, project: projectToSave };
}

export async function deleteProjectFromDb(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete error:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_PROJECTS_KEY);
    const list: Project[] = saved ? JSON.parse(saved) : [...INITIAL_PROJECTS];
    const updated = list.filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(updated));
  }

  return true;
}

// ==============================================================================
// Contact Messages Data Access Layer
// ==============================================================================

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  company?: string;
  interest?: string;
  message: string;
  read?: boolean;
  createdAt: string;
}

export async function fetchContactMessages(): Promise<ContactMessageRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          company: d.company,
          interest: d.interest,
          message: d.message,
          read: d.read,
          createdAt: d.created_at,
        }));
      }
    } catch (e) {
      // fallback
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_MESSAGES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }

  return [
    {
      id: 'msg-sample-1',
      name: 'Priya Narayanan',
      email: 'priya@apexbrokers.com',
      company: 'Apex Corporate Insurance Brokers',
      interest: 'GMC & GPA Underwriting',
      message: 'Hello Hiranyanabh, we reviewed your burn cost modeling prototype and would love to discuss a consulting engagement for our group underwriting team.',
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'msg-sample-2',
      name: 'Karan Mehra',
      email: 'karan.m@insurtechlabs.in',
      company: 'InsurTech Labs India',
      interest: 'AI Automation Collaboration',
      message: 'Impressive work on the GMC policy clause comparer! Would you be open to showcasing this during our monthly InsurTech roundtable?',
      read: true,
      createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    }
  ];
}

export async function saveContactMessage(msg: Omit<ContactMessageRecord, 'id' | 'createdAt'>): Promise<boolean> {
  const newRecord: ContactMessageRecord = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'msg-' + Date.now(),
    ...msg,
    read: false,
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          id: newRecord.id,
          name: newRecord.name,
          email: newRecord.email,
          company: newRecord.company,
          interest: newRecord.interest,
          message: newRecord.message,
          read: false,
        }
      ]);
      if (!error) return true;
    } catch (e) {
      // fallback
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_MESSAGES_KEY);
    const list: ContactMessageRecord[] = saved ? JSON.parse(saved) : [];
    list.unshift(newRecord);
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(list));
  }

  return true;
}
