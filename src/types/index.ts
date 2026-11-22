export type ProjectCategory = 
  | 'GMC & GPA Underwriting AI'
  | 'Claims Automation'
  | 'GenAI Tools'
  | 'Insurance Analytics / Power BI'
  | 'Automation (Excel/Python)'
  | 'Experiments'
  | (string & {});

export type PillarMode = 'Jnana Mode' | 'Karma Mode' | 'Drishti Mode';

export type ProjectStatus = 
  | 'Idea' 
  | 'In Progress' 
  | 'Completed' 
  | 'Completed Prototype' 
  | 'completed' 
  | 'completed_prototype' 
  | 'live' 
  | (string & {});

export function normalizeProjectStatus(rawStatus?: string): 'Completed' | 'In Progress' | 'Idea' {
  const s = String(rawStatus || '').toLowerCase().trim().replace(/[-_]/g, ' ');
  if (
    s === 'completed' ||
    s === 'completed prototype' ||
    s === 'complete' ||
    s === 'live' ||
    s === 'production' ||
    s === 'deployed'
  ) {
    return 'Completed';
  }
  if (
    s === 'in progress' ||
    s === 'active' ||
    s === 'building' ||
    s === 'wip' ||
    s === 'in progress (active)'
  ) {
    return 'In Progress';
  }
  return 'Idea';
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  pillarMode?: PillarMode | string;
  businessProblem: string;
  proposedSolution: string;
  tools: string[];
  businessImpact: string;
  status: ProjectStatus;
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  published: boolean;
  featured?: boolean;
  createdAt: string;
  agentId?: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  category: 'core_insurance' | 'technical_ai';
  summary: string;
  bullets: string[];
  badge: string;
  iconName: string;
}

export interface CareerMilestone {
  period: string;
  role: string;
  organization?: string;
  focus: string;
  highlights: string[];
}

export interface EducationCertification {
  id: string;
  title: string;
  issuer: string;
  institution?: string;
  badge?: string;
  yearOrStatus: string;
  type: 'degree' | 'certification' | 'course_in_progress' | string;
  description: string;
  verificationUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sarang';
  text: string;
  timestamp: string;
  specialistMode?: SpecialistMode;
  suggestedActions?: string[];
}

export type SpecialistMode = 
  | 'general'
  | 'underwriting'
  | 'claims'
  | 'knowledge'
  | 'analytics'
  | 'automation';

export interface SarangReview {
  id: string;
  userName: string;
  userRole?: string;
  rating: number; // 1 to 5
  reviewText: string;
  createdAt: string;
  isBenchmark?: boolean;
}

