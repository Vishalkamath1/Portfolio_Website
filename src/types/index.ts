export type ProjectCategory = 
  | 'GMC & GPA Underwriting AI'
  | 'Claims Automation'
  | 'GenAI Tools'
  | 'Insurance Analytics / Power BI'
  | 'Automation (Excel/Python)'
  | 'Experiments';

export type ProjectStatus = 'Idea' | 'In Progress' | 'Completed';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
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
