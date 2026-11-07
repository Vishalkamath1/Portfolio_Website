import { Project, ExpertiseItem, EducationCertification, CareerMilestone } from '@/types';

export const OWNER_PROFILE = {
  name: "Vishal Kamath",
  brandName: "SARANG AI",
  headline: "The AI-Powered Underwriter.",
  tagline: "Transforming 7+ Years of Insurance Expertise into Intelligent AI Automation.",
  slogan: "Experience · Explore · Engage",
  heroSupport: "Transforming 7+ Years of Insurance Expertise into Intelligent AI Automation.",
  supportingText: "GMC & GPA Underwriting • AI Solutions • Process Automation",
  yearsExperience: "7.4 Years",
  email: "contact@sarang-ai.com",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  location: "India",
  bio: `Insurance domain specialist with 7.4 years of deep operational and underwriting experience across Indian Life and General Insurance sectors. Spent 4.5 years mastering Group Medical Care (GMC) and Group Personal Accident (GPA) underwriting, claims analysis, and risk assessment, backed by 2.9 years in Life Insurance advisory. Currently spearheading domain-led AI automation—leveraging advanced Excel modelling, prompt engineering, and modern AI frameworks to eliminate underwriting bottlenecks, streamline policy analysis, and build intelligent risk intelligence tools.`
};

export const CAREER_JOURNEY: CareerMilestone[] = [
  {
    period: "4.5 Years",
    role: "Underwriter — GMC & GPA (Group Health & Accident)",
    focus: "Risk assessment, portfolio loss ratios, corporate quotations, policy wordings & claims analysis",
    highlights: [
      "Assessed corporate risk profiles for Group Medical (GMC) and Group Personal Accident (GPA) policies across diverse employee demographics.",
      "Engineered burn cost analyses, claims ratio projections, and bespoke benefit structure pricings.",
      "Interpreted complex policy wordings, exclusions, co-pay structures, and corporate sub-limits.",
      "Collaborated closely with corporate brokers, TPAs, and corporate clients to optimize terms while protecting underwriter profitability."
    ]
  },
  {
    period: "2.9 Years",
    role: "Advisor & Consultant — Life Insurance Sales & Advisory",
    focus: "Client risk profiling, life solutions structuring, retention & customer relationship management",
    highlights: [
      "Consulted individual and high-net-worth clients on life protection, term cover sizing, and endowment strategies.",
      "Gained foundational insight into behavioral risk appetite, client onboarding objections, and claim settlement sensitivity.",
      "Consistently achieved performance benchmarks by translating complex actuarial products into clear customer solutions."
    ]
  },
  {
    period: "Current Focus",
    role: "Insurance AI & Process Automation Specialist (In Transition)",
    focus: "AI integration, prompt engineering, automation workflows, and insurance analytics",
    highlights: [
      "Designing AI prototypes specifically targeted at solving GMC & GPA underwriting friction points.",
      "Developing LLM prompt frameworks for automated policy wording cross-referencing and clause extraction.",
      "Utilizing Advanced Excel + AI scripts to accelerate quote turnaround times and data sanitation.",
      "Bridging the communication gap between core underwriting teams and technical engineering partners."
    ]
  }
];

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'gmc-underwriting',
    title: 'GMC Underwriting',
    category: 'core_insurance',
    badge: 'Core Underwriting',
    iconName: 'ShieldCheck',
    summary: 'Comprehensive risk evaluation and pricing for Group Medical Care schemes.',
    bullets: [
      'Demographic & morbidity profile risk weighting',
      'Loss ratio & ICR (Incurred Claims Ratio) analysis',
      'Corporate benefit structuring & maternity/maternity waiver costing',
      'Co-payment, capping, and network hospital optimization'
    ]
  },
  {
    id: 'gpa-underwriting',
    title: 'GPA Underwriting',
    category: 'core_insurance',
    badge: 'Accident Risk',
    iconName: 'UserCheck',
    summary: 'Risk grading and coverage formulation for Group Personal Accident portfolios.',
    bullets: [
      'Occupational hazard classification (Class I, II, III)',
      'Death, PTD, PPD, and TTD coverage structuring',
      'High-risk industry endorsements & accumulation limits',
      'Table of Benefits design and premium quote calibration'
    ]
  },
  {
    id: 'insurance-operations',
    title: 'Insurance Operations',
    category: 'core_insurance',
    badge: 'Operations',
    iconName: 'Workflow',
    summary: 'End-to-end lifecycle management of corporate policy administration and servicing.',
    bullets: [
      'TPA coordination, network cashless facilitation, and claim escalation',
      'Endorsement processing (CD balance tracking, additions & deletions)',
      'SLA monitoring and operational compliance',
      'Broker and client servicing negotiations'
    ]
  },
  {
    id: 'advanced-excel',
    title: 'Advanced Excel & Data Modelling',
    category: 'core_insurance',
    badge: 'Analytical Engine',
    iconName: 'FileSpreadsheet',
    summary: 'High-speed quantitative modeling for burn costs, claim trends, and premium tables.',
    bullets: [
      'Complex multi-sheet nested formulas, dynamic arrays, and lookups',
      'Pivot table reporting for claims frequency and severity distributions',
      'Burn cost calculator creation and quotation templates',
      'Data sanitation for messy employee group census files'
    ]
  },
  {
    id: 'ai-prompt-engineering',
    title: 'AI Tools & Prompt Engineering',
    category: 'technical_ai',
    badge: 'AI Practitioner',
    iconName: 'Cpu',
    summary: 'Tailoring LLM context prompts to extract insights from verbose policy documents.',
    bullets: [
      'Structured few-shot prompt design for insurance policy comparisons',
      'Context conditioning for medical exclusion detection',
      'Automated email and underwriting inquiry drafting',
      'System prompt architecture for domain-specific assistants'
    ]
  },
  {
    id: 'process-automation',
    title: 'Insurance Process Automation',
    category: 'technical_ai',
    badge: 'Automation',
    iconName: 'Zap',
    summary: 'Streamlining repetitive clerical underwriting tasks into automated workflows.',
    bullets: [
      'Employee census data cleaning & format conversion',
      'Automated check-sheet generation for broker RFQs',
      'Error reduction in policy schedule generation',
      'Workflow integration between Excel inputs and AI agents'
    ]
  },
  {
    id: 'ai-in-insurance',
    title: 'AI in Insurance (Vision & Strategy)',
    category: 'technical_ai',
    badge: 'Domain Innovation',
    iconName: 'Lightbulb',
    summary: 'Bridging insurance underwriting realities with practical, trustworthy AI systems.',
    bullets: [
      'Pragmatic AI roadmaps tailored for traditional insurance teams',
      'Ethical AI guardrails preventing unauthorized binding commitments',
      'Underwriter-in-the-loop validation frameworks',
      'Continuous experimentation with modern LLMs and agentic tools'
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'GMC Policy Clause & Exclusion AI Comparer',
    tagline: 'Instant semantic cross-comparison between conflicting broker wordings and carrier terms.',
    category: 'GMC & GPA Underwriting AI',
    businessProblem: 'Brokers submit custom policy wordings containing subtle alterations in standard clauses (e.g., modern treatment caps, room rent limits). Manually comparing 50-page PDF wordings line-by-line takes hours and invites costly claim leakages.',
    proposedSolution: 'An AI-powered comparison pipeline that parses standard carrier wordings versus broker-requested variants, highlighting deviations, sub-limit changes, and ambiguity in coverage clauses.',
    tools: ['Google Gemini API', 'Next.js', 'Advanced Excel Wordings Model', 'TypeScript'],
    businessImpact: 'Reduces policy wording audit time from 3 hours to under 3 minutes with automated risk flags for underwriters.',
    status: 'Completed',
    demoUrl: '#agent',
    githubUrl: 'https://github.com/example/gmc-wordings-ai',
    published: true,
    featured: true,
    createdAt: '2026-10-15'
  },
  {
    id: 'proj-2',
    title: 'GPA Occupational Risk Classifier & Rate Engine',
    tagline: 'Standardizing hazardous industry job titles into accurate underwriting risk classes.',
    category: 'GMC & GPA Underwriting AI',
    businessProblem: 'Group Personal Accident proposals often have inconsistent job designations (e.g., "Site Executive" vs "Field Engineer"), resulting in misclassified hazard classes and inaccurate premium rating.',
    proposedSolution: 'An intelligent classifier trained on occupational risk benchmarks that matches raw designations to IRDAI/standard Class I, II, or III risk bands with suggested loading percentages.',
    tools: ['Prompt Engineering', 'Excel Automation', 'TypeScript', 'Tailwind CSS'],
    businessImpact: 'Prevents under-pricing of high-risk occupations while eliminating manual back-and-forth broker queries.',
    status: 'Completed',
    demoUrl: '#projects',
    githubUrl: 'https://github.com/example/gpa-risk-classifier',
    published: true,
    featured: true,
    createdAt: '2026-10-20'
  },
  {
    id: 'proj-3',
    title: 'Corporate Burn-Cost & Loss Ratio Visualizer',
    tagline: 'Predictive claims trajectory and renewal loading calculator for GMC corporate accounts.',
    category: 'Insurance Analytics / Power BI',
    businessProblem: 'During renewal season, underwriters struggle to rapidly correlate past 3-year claims dumps against demographic changes to calculate equitable burn costs.',
    proposedSolution: 'A responsive analytical module that processes historical claims feeds, projects IBNR (Incurred But Not Reported) factors, and models what-if scenarios for corporate co-pays and room rent caps.',
    tools: ['Advanced Excel Models', 'Next.js Charts', 'Data Normalization'],
    businessImpact: 'Enables real-time negotiation support during broker meetings with instant impact modeling on portfolio loss ratios.',
    status: 'In Progress',
    demoUrl: '#projects',
    published: true,
    featured: true,
    createdAt: '2026-10-28'
  },
  {
    id: 'proj-4',
    title: 'SARANG Underwriting Knowledge Agent',
    tagline: 'Centralized conversational copilot for group health insurance rules, guidelines, and terms.',
    category: 'GenAI Tools',
    businessProblem: 'Junior underwriting executives and sales teams spend valuable time asking senior underwriters routine questions about standard limits, waiting periods, and deductible rules.',
    proposedSolution: 'A dedicated AI agent (SARANG) steeped in insurance underwriting guidelines capable of answering queries, clarifying GPA tables of benefits, and citing standard practice.',
    tools: ['Gemini 1.5/2.0 API', 'System Conditioning', 'React', 'Tailwind CSS'],
    businessImpact: 'Accelerates onboarding of new underwriters and frees senior capacity for complex corporate risk pricing.',
    status: 'Completed',
    demoUrl: '#agent',
    published: true,
    featured: true,
    createdAt: '2026-11-01'
  },
  {
    id: 'proj-5',
    title: 'Census Cleanse: Automated Employee Data Sanitizer',
    tagline: 'Python & Excel macro automation to clean messy corporate employee enrollment spreadsheets.',
    category: 'Automation (Excel/Python)',
    businessProblem: 'Corporate HRs submit member enrollment spreadsheets with invalid date formats, missing relation tags, duplicate IDs, and inverted age brackets that choke core insurance portals.',
    proposedSolution: 'An automated sanitization engine that validates employee-dependent relationships, calculates exact completed ages, flags duplicate lives, and outputs portal-ready templates.',
    tools: ['Advanced Excel VBA', 'Python Data Scripts', 'Regex Validation'],
    businessImpact: 'Cuts endorsement turnaround time by 75% and eliminates policy inception delays for thousands of employees.',
    status: 'Completed',
    published: true,
    featured: false,
    createdAt: '2026-09-15'
  },
  {
    id: 'proj-6',
    title: 'Cashless Pre-Auth Claim Triage Assistant (Concept)',
    tagline: 'Exploratory experiment in flagging mismatched billing codes and non-medical surgical items.',
    category: 'Claims Automation',
    businessProblem: 'High volumes of cashless hospitalization requests strain TPA medical teams, leading to delayed discharge authorizations and billing disputes over non-payable items.',
    proposedSolution: 'An AI triage concept that parses discharge summaries and hospital bill estimates against policy limits, highlighting non-payable consumables and sub-limit breaches.',
    tools: ['LLM Vision/Document Parsing', 'Gemini API', 'Healthcare Prompt Taxonomy'],
    businessImpact: 'Demonstration of next-generation claims automation to improve claims turnaround and reduce customer friction.',
    status: 'Idea',
    published: true,
    featured: false,
    createdAt: '2026-11-05'
  }
];

export const EDUCATION_CERTIFICATIONS: EducationCertification[] = [
  {
    id: 'edu-1',
    title: 'Bachelor of Commerce / Business Studies',
    issuer: 'Recognized University',
    yearOrStatus: 'Completed',
    type: 'degree',
    description: 'Foundational education in commercial principles, financial accounting, business statistics, and organizational management.'
  },
  {
    id: 'cert-1',
    title: 'Licentiate / Associate Insurance Studies',
    issuer: 'Insurance Institute of India (III)',
    yearOrStatus: 'Insurance Domain',
    type: 'certification',
    description: 'Principles of Insurance, Practice of Life Insurance, and Foundation of Health Insurance underwriting and claims regulation.'
  },
  {
    id: 'cert-2',
    title: 'Advanced Corporate Group Underwriting & Burn Costing',
    issuer: 'Industry Professional Training',
    yearOrStatus: 'Professional Milestone',
    type: 'certification',
    description: 'Intensive practical training in Group Medical (GMC) loss ratio computation, corporate quotation structuring, and reinsurance limits.'
  },
  {
    id: 'cert-3',
    title: 'AI Prompt Engineering & LLM Application Development',
    issuer: 'Ongoing AI Upskilling',
    yearOrStatus: 'In Progress (Active)',
    type: 'course_in_progress',
    description: 'Practical immersion in prompt conditioning, LLM agent workflows, domain-specific retrieval, and full-stack AI web interfaces.'
  }
];

export const SUGGESTED_QUESTIONS = [
  "What is the difference between GMC and GPA insurance?",
  "How does Vishal Kamath calculate burn cost for a GMC corporate policy?",
  "Can you explain Incurred Claims Ratio (ICR) and why it matters in underwriting?",
  "What AI projects has Vishal Kamath developed for insurance automation?",
  "How can AI improve policy wording analysis without replacing the underwriter?"
];
