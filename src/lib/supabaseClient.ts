import { createClient } from '@supabase/supabase-js';
import { Project, ProjectCategory, SarangReview } from '@/types';
import { INITIAL_PROJECTS, OWNER_PROFILE } from '@/data/portfolioData';
import { resolveAgentId } from '@/context/AgentChatContext';

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
const LOCAL_PROJECTS_KEY = 'sarang_ai_local_projects';
const LOCAL_MESSAGES_KEY = 'sarang_ai_local_messages';
const LOCAL_PROFILE_KEY = 'sarang_ai_local_profile';
const LOCAL_REVIEWS_KEY = 'sarang_ai_local_reviews';

// ==============================================================================
// Projects Data Access Layer
// ==============================================================================

export async function fetchProjectsFromDb(): Promise<{ projects: Project[]; isDbLive: boolean }> {
  if (supabase) {
    try {
      const fetchPromise = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      const timeoutPromise = new Promise<{ data: any; error: any }>((_, reject) =>
        setTimeout(() => reject(new Error('Supabase projects fetch timeout')), 2500)
      );

      const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

      if (!error && data && data.length > 0) {
        // Map database snake_case to Project interface
        const mapped: Project[] = data.map((d: any) => {
          const resolvedId = resolveAgentId(d.id) || resolveAgentId(d.title) || d.id;

          return {
            id: resolvedId,
            title: d.title,
            tagline: d.tagline,
            category: d.category as ProjectCategory,
            pillarMode: 'Jnana Mode' as const,
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
            agentId: resolvedId,
          };
        });
        return { projects: mapped, isDbLive: true };
      }
    } catch (e) {
      console.warn('Supabase query error, falling back to initial projects:', e);
    }
  }

  // Fallback to local storage persistence when Supabase table is offline or empty
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOCAL_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { projects: parsed, isDbLive: false };
        }
      }
    } catch (e) {
      console.warn('Local storage fallback read error:', e);
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
    pillarMode: project.pillarMode || 'Jnana Mode',
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
      const dbPayload: any = {
        id: projectToSave.id,
        title: projectToSave.title,
        tagline: projectToSave.tagline,
        category: projectToSave.category,
        pillar_mode: projectToSave.pillarMode || 'Jnana Mode',
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

      let { data, error } = isNew
        ? await supabase.from('projects').insert([dbPayload]).select()
        : await supabase.from('projects').update(dbPayload).eq('id', projectToSave.id).select();

      // Gracefully handle if Supabase projects table has not yet run the pillar_mode ALTER TABLE
      if (error && error.message && error.message.includes('pillar_mode')) {
        const { pillar_mode, ...legacyPayload } = dbPayload;
        const retryRes = isNew
          ? await supabase.from('projects').insert([legacyPayload]).select()
          : await supabase.from('projects').update(legacyPayload).eq('id', projectToSave.id).select();
        data = retryRes.data;
        error = retryRes.error;
      }

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
    window.dispatchEvent(new CustomEvent('sarang_projects_updated', { detail: { project: projectToSave } }));
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
    window.dispatchEvent(new CustomEvent('sarang_projects_updated', { detail: { id } }));
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
  let dbMessages: ContactMessageRecord[] = [];

  if (supabase) {
    try {
      const fetchPromise = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      const timeoutPromise = new Promise<{ data: any; error: any }>((_, reject) =>
        setTimeout(() => reject(new Error('Supabase fetch timeout')), 2500)
      );

      const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

      if (!error && data && Array.isArray(data) && data.length > 0) {
        dbMessages = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          email: d.email,
          company: d.company,
          interest: d.interest,
          message: d.message,
          read: d.read,
          createdAt: d.created_at || new Date().toISOString(),
        }));
      }
    } catch (e) {
      console.warn('[Supabase] fetchContactMessages fallback:', e);
    }
  }

  // Backup persistence: load local messages to ensure submitted inquiries are visible
  let localMessages: ContactMessageRecord[] = [];
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_MESSAGES_KEY);
    if (saved) {
      try {
        localMessages = JSON.parse(saved);
      } catch (e) {}
    }
  }

  // Merge unique by ID
  const map = new Map<string, ContactMessageRecord>();
  dbMessages.forEach((m) => map.set(m.id, m));
  localMessages.forEach((m) => {
    if (!map.has(m.id)) map.set(m.id, m);
  });

  const combined = Array.from(map.values());
  if (combined.length > 0) {
    return combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return [
    {
      id: 'msg-sample-1',
      name: 'Priya Narayanan',
      email: 'priya@apexbrokers.com',
      company: 'Apex Corporate Insurance Brokers',
      interest: 'GMC & GPA Underwriting',
      message: 'Hello Vishal Kamath, we reviewed your burn cost modeling prototype and would love to discuss a consulting engagement for our group underwriting team.',
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

export async function saveContactMessage(
  msg: Omit<ContactMessageRecord, 'id' | 'createdAt'>
): Promise<{ success: boolean; record: ContactMessageRecord; error?: string }> {
  const isUuid = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  let generatedId: string | undefined = undefined;
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      generatedId = crypto.randomUUID();
    } catch {}
  }

  const newRecord: ContactMessageRecord = {
    id: generatedId || ('msg-' + Date.now()),
    ...msg,
    read: false,
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const insertRow: any = {
        name: newRecord.name,
        email: newRecord.email,
        company: newRecord.company,
        interest: newRecord.interest,
        message: newRecord.message,
        read: false,
      };

      // Only pass UUID id if valid to satisfy PostgreSQL UUID constraint
      if (generatedId && isUuid(generatedId)) {
        insertRow.id = generatedId;
      }

      // Fast race with 800ms guard so database latency never hangs the API
      const insertPromise = Promise.resolve(supabase.from('contact_messages').insert([insertRow]))
        .then(({ error }: any) => {
          if (error) console.warn('[Supabase] contact_messages insert notice:', error.message || error);
          return { error };
        })
        .catch((err: any) => {
          console.warn('[Supabase] contact_messages insert notice:', err.message || err);
          return { error: err };
        });

      const timeoutPromise = new Promise<{ error: null }>((resolve) =>
        setTimeout(() => resolve({ error: null }), 800)
      );

      await Promise.race([insertPromise, timeoutPromise]);
    } catch (e: any) {
      console.warn('[Supabase] contact_messages insert notice:', e.message || e);
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOCAL_MESSAGES_KEY);
      const list: ContactMessageRecord[] = saved ? JSON.parse(saved) : [];
      list.unshift(newRecord);
      localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(list));
    } catch {}
  }

  return { success: true, record: newRecord };
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
    } catch (e) {
      console.warn('[Supabase] deleteContactMessage notice:', e);
    }
  }
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOCAL_MESSAGES_KEY);
      if (saved) {
        const list: ContactMessageRecord[] = JSON.parse(saved);
        const filtered = list.filter((m) => m.id !== id);
        localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(filtered));
      }
    } catch {}
  }
  return true;
}

// ==============================================================================
// Sarang Reviews & Ratings Data Access Layer
// ==============================================================================
// Cache Revalidation Helper
// ==============================================================================

export async function triggerRevalidation(path: string = '/'): Promise<boolean> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const secret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET || (typeof window !== 'undefined' ? (window as any).__REVALIDATION_SECRET : '');
    if (secret) {
      headers['x-revalidation-token'] = secret;
    }

    const res = await fetch('/api/revalidate', {
      method: 'POST',
      headers,
      body: JSON.stringify({ path }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Revalidation trigger error:', err);
    return false;
  }
}

// ==============================================================================
// Sarang Reviews & Ratings Data Access Layer
// ==============================================================================

export const INITIAL_REVIEWS: SarangReview[] = [];

export async function fetchSarangReviews(): Promise<SarangReview[]> {
  if (supabase) {
    try {
      const fetchPromise = supabase
        .from('sarang_reviews')
        .select('*')
        .order('created_at', { ascending: false });
      const timeoutPromise = new Promise<{ data: any; error: any }>((_, reject) =>
        setTimeout(() => reject(new Error('Supabase reviews fetch timeout')), 2500)
      );

      const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

      if (!error && data) {
        return data
          .filter((d: any) => d.approved === undefined || d.approved === true || d.status === 'approved')
          .map((d: any) => ({
            id: d.id,
            userName: d.user_name,
            userRole: d.user_role || '',
            rating: Number(d.rating) || 5,
            reviewText: d.review_text,
            createdAt: d.created_at,
            approved: d.approved !== false,
          }));
      }
    } catch (e) {
      console.warn('Supabase fetch reviews error, fallback to local store:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_REVIEWS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((d: any) => d.approved === undefined || d.approved === true || d.status === 'approved');
        }
      } catch (e) {}
    }
  }

  return [];
}

export async function saveSarangReview(review: Omit<SarangReview, 'id' | 'createdAt'>): Promise<{ success: boolean; review?: SarangReview; error?: string }> {
  const newReview: SarangReview = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'rev-' + Date.now(),
    userName: review.userName.trim() || 'Anonymous Underwriter',
    userRole: review.userRole?.trim() || 'Insurance Professional',
    rating: Math.max(1, Math.min(5, Number(review.rating) || 5)),
    reviewText: review.reviewText.trim(),
    createdAt: new Date().toISOString(),
    approved: true,
  };

  if (supabase) {
    try {
      const { error } = await supabase.from('sarang_reviews').insert([
        {
          id: newReview.id,
          user_name: newReview.userName,
          user_role: newReview.userRole,
          rating: newReview.rating,
          review_text: newReview.reviewText,
          created_at: newReview.createdAt,
          approved: true,
        }
      ]);
      if (error) {
        console.warn('Supabase insert review error:', error);
      }
    } catch (e) {
      console.warn('Supabase insert review exception:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_REVIEWS_KEY);
    const list: SarangReview[] = saved ? JSON.parse(saved) : [];
    list.unshift(newReview);
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(list));
  }

  triggerRevalidation('/').catch(() => {});

  return { success: true, review: newReview };
}

export async function deleteSarangReview(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('sarang_reviews').delete().eq('id', id);
      if (error) {
        console.warn('Supabase delete review error:', error);
      }
    } catch (e) {
      console.warn('Supabase delete review error:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_REVIEWS_KEY);
    const list: SarangReview[] = saved ? JSON.parse(saved) : [];
    const filtered = list.filter((r) => r.id !== id);
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(filtered));
  }

  triggerRevalidation('/').catch(() => {});

  return true;
}

export async function updateSarangReview(id: string, updates: Partial<SarangReview>): Promise<boolean> {
  if (supabase) {
    try {
      const dbUpdates: any = {};
      if (updates.approved !== undefined) dbUpdates.approved = updates.approved;
      if (updates.userName) dbUpdates.user_name = updates.userName;
      if (updates.userRole !== undefined) dbUpdates.user_role = updates.userRole;
      if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
      if (updates.reviewText) dbUpdates.review_text = updates.reviewText;

      const { error } = await supabase.from('sarang_reviews').update(dbUpdates).eq('id', id);
      if (error) {
        console.warn('Supabase update review error:', error);
      }
    } catch (e) {
      console.warn('Supabase update review exception:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_REVIEWS_KEY);
    if (saved) {
      try {
        const list: SarangReview[] = JSON.parse(saved);
        const updated = list.map((r) => (r.id === id ? { ...r, ...updates } : r));
        localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(updated));
      } catch {}
    }
  }

  triggerRevalidation('/').catch(() => {});

  return true;
}
