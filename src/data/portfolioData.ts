import { Project, ExpertiseItem, EducationCertification, CareerMilestone } from '@/types';

export const OWNER_PROFILE = {
  name: "Vishal Kamath",
  brandName: "SARANG AI",
  headline: "The AI-Powered Underwriter.",
  tagline: "Transforming 7+ Years of Insurance Expertise into Intelligent AI Automation.",
  slogan: "Experience · Explore · Engage",
  heroSupport: "Transforming 7+ Years of Insurance Expertise into Intelligent AI Automation.",
  supportingText: "GMC & GPA Underwriting • AI Solutions • Process Automation",
  agentTitle: "SARANG - Your Central Insurance AI Agent",
  agentTagline: "Bridging Insurance Expertise with Artificial Intelligence.",
  companionTitle: "Sarang - Your Intelligent Companion",
  companionMotto: "LEARN • EXECUTE • MONITOR",
  heroImage: "/sarang-warrior-fixed.png",
  avatar: "/sarang-avatar.png",
  image: "/sarang-avatar.png",
  yearsExperience: "7.4 Years",
  email: "Kamathvishal109@gmail.com",
  linkedin: "https://www.linkedin.com/in/vishal-kamath-073618a5",
  github: "https://github.com/Vishalkamath1",
  resumeUrl: "/Vishal Kamath_Insurance_AI_Resume (2).pdf",
  location: "India",
  bio: `I am an insurance professional with over 7+ years of experience across Indian Life Insurance Sales and General Insurance Underwriting, with a strong focus on Group Mediclaim (GMC) & Group Personal Accident (GPA) portfolios. My career began in frontline life insurance sales, directly engaging with clients and managing behavioural risk. That ground-level perspective proved invaluable when I transitioned into corporate risk assessment and underwriting operations with Tata AIG and Zurich Kotak Mahindra General Insurance.

Over the last several years, I have specialized in GMC and GPA portfolios. My day-to-day involves assessing enterprise risk, premium evaluation, claims experience analysis, and navigating complex policy wordings to hit target loss ratios. Through my extensive work in system UAT and product redesign, I recognized a massive gap between traditional underwriting processes and modern technology.

Today, I am bringing together my domain knowledge, analytical skills, and artificial intelligence to create practical solutions for real-world insurance challenges. Having built 5+ AI solutions and prototypes, I explore how Generative AI, intelligent workflows, and automation can simplify complex processes and eliminate underwriting bottlenecks.`,
};

export const CAREER_JOURNEY: CareerMilestone[] = [
  {
    period: "Frontline Sales",
    role: "Frontline Life Insurance Sales & Advisory",
    focus: "Direct client engagement, behavioural risk & customer protection",
    highlights: [
      "Began career in frontline life insurance sales, directly engaging with clients.",
      "Managed behavioural risk and gained vital ground-level perspective on customer decision-making.",
      "Established foundational risk profiling principles that transitioned into corporate underwriting operations."
    ]
  },
  {
    period: "Corporate Underwriting",
    role: "Underwriter — GMC & GPA (Tata AIG & Zurich Kotak)",
    focus: "Enterprise risk, premium evaluation, claims experience analysis & target loss ratios",
    highlights: [
      "Specialized in Group Mediclaim (GMC) & Group Personal Accident (GPA) portfolios.",
      "Assessed enterprise risk, premium evaluation, and claims experience analysis to hit target loss ratios.",
      "Navigated complex corporate policy wordings, exclusions, and co-pay structures.",
      "Led extensive work in system UAT and product redesign, identifying key operational gaps."
    ]
  },
  {
    period: "AI & Automation",
    role: "Applied Insurance AI Specialist",
    focus: "5+ AI solutions, intelligent workflows & underwriting automation",
    highlights: [
      "Built 5+ practical AI solutions and prototypes addressing real-world insurance challenges.",
      "Brings together domain knowledge, analytical skills, and Generative AI to eliminate underwriting bottlenecks.",
      "Explores Generative AI, intelligent workflows, and automation to simplify complex underwriting processes.",
      "Pioneering underwriter-first automation prototypes bridging domain expertise with modern technology."
    ]
  }
];

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: 'gmc-underwriting-strategy',
    title: 'GMC Underwriting Strategy',
    category: 'core_insurance',
    badge: 'CORE UNDERWRITING',
    iconName: 'ShieldCheck',
    summary: 'Comprehensive risk evaluation and strategic pricing for Group Medical Care portfolios.',
    bullets: [
      'Demographic, morbidity, and past-claims (ICR) risk weighting.',
      'Corporate benefit structuring (maternity waivers, sub-limits, co-pays).',
      'Cost-containment strategy via room rent capping and network optimization.',
      'Technical defense and negotiation of renewal premium loadings.'
    ]
  },
  {
    id: 'gpa-underwriting-risk-grading',
    title: 'GPA Underwriting & Risk Grading',
    category: 'core_insurance',
    badge: 'ACCIDENT RISK',
    iconName: 'UserCheck',
    summary: 'Precision occupational hazard grading and coverage formulation for Group Personal Accident schemes.',
    bullets: [
      'Advanced occupational hazard classification (Risk Category I, II, III).',
      'Coverage structuring for Death, PTD, PPD, and TTD benefits.',
      'Risk accumulation analysis and high-risk industry endorsements.',
      'Actuarial burn-cost table design and premium quote calibration.'
    ]
  },
  {
    id: 'advanced-data-quantitative-modelling',
    title: 'Advanced Excel & Data Modelling',
    category: 'core_insurance',
    badge: 'ANALYTICAL ENGINE',
    iconName: 'FileSpreadsheet',
    summary: 'High-speed quantitative analysis for burn costs, claim frequency, and premium calibration.',
    bullets: [
      'Complex multi-sheet nested formulas, dynamic arrays, and lookups.',
      'Pivot table reporting for claims frequency and severity distributions.',
      'Custom burn-cost calculator creation and quotation templates.',
      'Data sanitation pipelines for messy employee group census files.'
    ]
  },
  {
    id: 'ai-prompt-architecture-engineering',
    title: 'AI Prompt Architecture & Engineering',
    category: 'technical_ai',
    badge: 'AI PRACTITIONER',
    iconName: 'Cpu',
    summary: 'Tailoring LLM context windows to extract high-value insights from verbose policy documents.',
    bullets: [
      'Structured few-shot prompt design for insurance policy comparisons.',
      'Context conditioning for complex medical exclusion detection.',
      'System prompt architecture for domain-specific underwriting assistants.',
      'Strict guardrail engineering to prevent AI hallucination in coverage answers.'
    ]
  },
  {
    id: 'insurance-process-automation',
    title: 'Insurance Process Automation',
    category: 'technical_ai',
    badge: 'AUTOMATION',
    iconName: 'Zap',
    summary: 'Streamlining repetitive underwriting and clerical data tasks into automated workflows.',
    bullets: [
      'Employee census data cleaning and format conversion.',
      'Automated check-sheet generation for broker RFQs.',
      'Workflow integration between quantitative Excel inputs and AI agents.',
      'Error reduction protocols in policy schedule generation.'
    ]
  },
  {
    id: 'ai-solution-architecture',
    title: 'AI Solution Architecture (Vision & Strategy)',
    category: 'technical_ai',
    badge: 'DOMAIN INNOVATION',
    iconName: 'Lightbulb',
    summary: 'Bridging traditional underwriting realities with practical, trustworthy AI automation blueprints.',
    bullets: [
      'Pragmatic AI roadmaps tailored for traditional insurance teams.',
      'Ethical AI guardrails preventing unauthorized binding commitments.',
      'Underwriter-in-the-loop (UITL) validation frameworks.',
      'Converting operational bottlenecks into structured AI workflow solutions.'
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'gpa-claims-helpdesk',
    title: 'GPA Claims Admissibility & Grievance Helpdesk',
    tagline: 'Evaluates medical data against standard disability grids and generates grievance roadmaps.',
    category: 'GMC & GPA Underwriting AI',
    pillarMode: 'Jnana Mode',
    agentId: 'gpa-claims-helpdesk',
    businessProblem: 'Group Personal Accident proposals often have inconsistent job designations and complex claim rejections, resulting in misclassified hazard classes and claim disputes.',
    proposedSolution: 'An intelligent evaluation and triage helpdesk trained on occupational risk benchmarks and standard disability grids with suggested loading percentages and grievance roadmaps.',
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
    id: 'irdai-health-decoder',
    title: 'IRDAI Health Circular Decoder',
    tagline: 'Translates complex regulatory mandates into plain English and parses conflicting broker wordings.',
    category: 'GMC & GPA Underwriting AI',
    pillarMode: 'Jnana Mode',
    agentId: 'irdai-health-decoder',
    businessProblem: 'IRDAI circulars and broker-submitted policy wordings contain subtle alterations in standard clauses (e.g., modern treatment caps, room rent limits). Manually comparing 50-page PDF wordings line-by-line takes hours and invites costly claim leakages.',
    proposedSolution: 'An AI-powered comparison and circular decoding pipeline that translates regulatory mandates and highlights coverage deviations.',
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
    id: 'insurance-ai-architect',
    title: 'Insurance AI Solution Architect',
    tagline: 'Drafts structured automation blueprints, predictive claims trajectory, and renewal loading models.',
    category: 'Insurance Analytics / Power BI',
    pillarMode: 'Jnana Mode',
    agentId: 'insurance-ai-architect',
    businessProblem: 'Underwriters struggle to rapidly correlate past 3-year claims dumps against demographic changes to calculate equitable burn costs and automate repetitive workflows.',
    proposedSolution: 'A responsive analytical and architectural module that processes historical claims feeds, projects IBNR factors, and models what-if renewal scenarios.',
    tools: ['Advanced Excel Models', 'Next.js Charts', 'Data Normalization'],
    businessImpact: 'Enables real-time negotiation support during broker meetings with instant impact modeling on portfolio loss ratios.',
    status: 'Completed',
    demoUrl: '#projects',
    published: true,
    featured: true,
    createdAt: '2026-10-28'
  },
  {
    id: 'gmc-gpa-knowledge-hub',
    title: 'GMC & GPA Knowledge Hub',
    tagline: 'Senior underwriter advisory for policy wordings, market standards, and occupational exclusions.',
    category: 'GenAI Tools',
    pillarMode: 'Jnana Mode',
    agentId: 'gmc-gpa-knowledge-hub',
    businessProblem: 'Junior underwriting executives and sales teams spend valuable time asking senior underwriters routine questions about standard limits, waiting periods, and deductible rules.',
    proposedSolution: 'A dedicated AI agent steeped in insurance underwriting guidelines capable of answering queries, clarifying GPA tables of benefits, and citing standard practice.',
    tools: ['Gemini 1.5/2.0 API', 'System Conditioning', 'React', 'Tailwind CSS'],
    businessImpact: 'Accelerates onboarding of new underwriters and frees senior capacity for complex corporate risk pricing.',
    status: 'Completed',
    demoUrl: '#agent',
    published: true,
    featured: true,
    createdAt: '2026-11-01'
  }
];

export const EDUCATION_CERTIFICATIONS: EducationCertification[] = [
  {
    id: 'edu-1',
    badge: 'ACADEMIC DEGREE',
    title: 'Bachelor of Management Studies (BMS) - Finance',
    issuer: 'Mumbai University',
    yearOrStatus: 'Completed',
    type: 'degree',
    description: 'Foundational education in financial management, corporate finance, and commercial strategy.'
  },
  {
    id: 'edu-2',
    badge: 'POSTGRADUATE DIPLOMA',
    title: 'PGDM in Marketing Management(Hybrid)',
    issuer: 'Welingkar Institute of Management',
    yearOrStatus: 'Completed',
    type: 'certification',
    description: 'Advanced hybrid programme focusing on market dynamics, strategic positioning, and business communication.'
  },
  {
    id: 'cert-2',
    badge: 'ADVANCED INSURANCE CREDENTIAL',
    title: 'CC5 Application of AI & Gen AI in Insurance (Advanced)',
    issuer: 'Insurance Institute of India (III)',
    yearOrStatus: 'Completed',
    type: 'certification',
    description: 'Specialized advanced-level certification focusing on the practical implementation of Generative AI directly within the insurance domain.'
  },
  {
    id: 'cert-3',
    badge: 'TECHNICAL CERTIFICATIONS',
    title: 'Google AI Professional & Prompting Essentials & Advance Excel',
    issuer: 'Google, Be10x & Codebasics',
    yearOrStatus: 'In Progress (Active)',
    type: 'course_in_progress',
    description: 'Certified in Google AI frameworks, LLM prompting, Claude agent workflows, and advance Excel data modelling.'
  }
];

export const SUGGESTED_QUESTIONS = [
  "Explain the key risk assessment techniques used in GMC and GPA underwriting.",
  "Demonstrate how an automated burn cost model calculates renewal pricing.",
  "How do you evaluate loss ratios, claims trends, and portfolio profitability?",
  "Suggest practical AI automation solutions for repetitive insurance operations.",
  "Showcase the AI tools developed for real-world insurance use cases."
];
