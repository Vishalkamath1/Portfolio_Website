-- ==============================================================================
-- SHARANG AI: Supabase Database Schema & RLS Setup
-- Reference: SHARANG_AI_Master_Build_Prompt.pdf
-- ==============================================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'GMC & GPA Underwriting AI',
        'Claims Automation',
        'GenAI Tools',
        'Insurance Analytics / Power BI',
        'Automation (Excel/Python)',
        'Experiments'
    )),
    business_problem TEXT NOT NULL,
    proposed_solution TEXT NOT NULL,
    tools TEXT[] NOT NULL DEFAULT '{}',
    business_impact TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'In Progress' CHECK (status IN ('Idea', 'In Progress', 'Completed')),
    demo_url TEXT,
    github_url TEXT,
    image_url TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for public queries
CREATE INDEX IF NOT EXISTS idx_projects_published_category ON public.projects(published, category);

-- 2. Create Contact Messages Table
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

-- 3. Create Profile Content / CMS Table
CREATE TABLE IF NOT EXISTS public.profile_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_content ENABLE ROW LEVEL SECURITY;

-- Projects Policies:
-- 1. Anonymous/Public visitors can view published projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    TO anon, authenticated
    USING (published = true);

-- 2. Authenticated owners/admins can perform all operations
DROP POLICY IF EXISTS "Authenticated users full access to projects" ON public.projects;
CREATE POLICY "Authenticated users full access to projects"
    ON public.projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Contact Messages Policies:
-- 1. Anyone can submit contact messages
DROP POLICY IF EXISTS "Anyone can insert contact message" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact message"
    ON public.contact_messages FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 2. Authenticated owners can view and manage messages
DROP POLICY IF EXISTS "Authenticated users read contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users read contact messages"
    ON public.contact_messages FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Profile Content Policies:
-- 1. Public can read profile content
DROP POLICY IF EXISTS "Public can read profile content" ON public.profile_content;
CREATE POLICY "Public can read profile content"
    ON public.profile_content FOR SELECT
    TO anon, authenticated
    USING (true);

-- 2. Authenticated owners can update profile content
DROP POLICY IF EXISTS "Authenticated users manage profile content" ON public.profile_content;
CREATE POLICY "Authenticated users manage profile content"
    ON public.profile_content FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- Initial Seed Data: 6 Authentic Underwriting & AI Projects
-- ==============================================================================

INSERT INTO public.projects (
    title, tagline, category, business_problem, proposed_solution, tools, business_impact, status, published, featured, demo_url, github_url
) VALUES
(
    'GMC Policy Clause & Exclusion AI Comparer',
    'Instant semantic cross-comparison between conflicting broker wordings and carrier terms.',
    'GMC & GPA Underwriting AI',
    'Brokers submit custom policy wordings containing subtle alterations in standard clauses (e.g., modern treatment caps, room rent limits). Manually comparing 50-page PDF wordings line-by-line takes hours and invites costly claim leakages.',
    'An AI-powered comparison pipeline that parses standard carrier wordings versus broker-requested variants, highlighting deviations, sub-limit changes, and ambiguity in coverage clauses.',
    ARRAY['Google Gemini API', 'Next.js', 'Advanced Excel Wordings Model', 'TypeScript'],
    'Reduces policy wording audit time from 3 hours to under 3 minutes with automated risk flags for underwriters.',
    'Completed',
    true,
    true,
    '#agent',
    'https://github.com/example/gmc-wordings-ai'
),
(
    'GPA Occupational Risk Classifier & Rate Engine',
    'Standardizing hazardous industry job titles into accurate underwriting risk classes.',
    'GMC & GPA Underwriting AI',
    'Group Personal Accident proposals often have inconsistent job designations (e.g., "Site Executive" vs "Field Engineer"), resulting in misclassified hazard classes and inaccurate premium rating.',
    'An intelligent classifier trained on occupational risk benchmarks that matches raw designations to IRDAI/standard Class I, II, or III risk bands with suggested loading percentages.',
    ARRAY['Prompt Engineering', 'Excel Automation', 'TypeScript', 'Tailwind CSS'],
    'Prevents under-pricing of high-risk occupations while eliminating manual back-and-forth broker queries.',
    'Completed',
    true,
    true,
    '#projects',
    'https://github.com/example/gpa-risk-classifier'
),
(
    'Corporate Burn-Cost & Loss Ratio Visualizer',
    'Predictive claims trajectory and renewal loading calculator for GMC corporate accounts.',
    'Insurance Analytics / Power BI',
    'During renewal season, underwriters struggle to rapidly correlate past 3-year claims dumps against demographic changes to calculate equitable burn costs.',
    'A responsive analytical module that processes historical claims feeds, projects IBNR (Incurred But Not Reported) factors, and models what-if scenarios for corporate co-pays and room rent caps.',
    ARRAY['Advanced Excel Models', 'Next.js Charts', 'Data Normalization'],
    'Enables real-time negotiation support during broker meetings with instant impact modeling on portfolio loss ratios.',
    'In Progress',
    true,
    true,
    '#projects',
    null
),
(
    'SHARANG Underwriting Knowledge Agent',
    'Centralized conversational copilot for group health insurance rules, guidelines, and terms.',
    'GenAI Tools',
    'Junior underwriting executives and sales teams spend valuable time asking senior underwriters routine questions about standard limits, waiting periods, and deductible rules.',
    'A dedicated AI agent (SHARANG) steeped in insurance underwriting guidelines capable of answering queries, clarifying GPA tables of benefits, and citing standard practice.',
    ARRAY['Gemini 1.5/2.0 API', 'System Conditioning', 'React', 'Tailwind CSS'],
    'Accelerates onboarding of new underwriters and frees senior capacity for complex corporate risk pricing.',
    'Completed',
    true,
    true,
    '#agent',
    null
),
(
    'Census Cleanse: Automated Employee Data Sanitizer',
    'Python & Excel macro automation to clean messy corporate employee enrollment spreadsheets.',
    'Automation (Excel/Python)',
    'Corporate HRs submit member enrollment spreadsheets with invalid date formats, missing relation tags, duplicate IDs, and inverted age brackets that choke core insurance portals.',
    'An automated sanitization engine that validates employee-dependent relationships, calculates exact completed ages, flags duplicate lives, and outputs portal-ready templates.',
    ARRAY['Advanced Excel VBA', 'Python Data Scripts', 'Regex Validation'],
    'Cuts endorsement turnaround time by 75% and eliminates policy inception delays for thousands of employees.',
    'Completed',
    true,
    false,
    null,
    null
),
(
    'Cashless Pre-Auth Claim Triage Assistant (Concept)',
    'Exploratory experiment in flagging mismatched billing codes and non-medical surgical items.',
    'Claims Automation',
    'High volumes of cashless hospitalization requests strain TPA medical teams, leading to delayed discharge authorizations and billing disputes over non-payable items.',
    'An AI triage concept that parses discharge summaries and hospital bill estimates against policy limits, highlighting non-payable consumables and sub-limit breaches.',
    ARRAY['LLM Vision/Document Parsing', 'Gemini API', 'Healthcare Prompt Taxonomy'],
    'Demonstration of next-generation claims automation to improve claims turnaround and reduce customer friction.',
    'Idea',
    true,
    false,
    null,
    null
)
ON CONFLICT DO NOTHING;
