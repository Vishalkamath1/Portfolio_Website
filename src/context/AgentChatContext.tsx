'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ChatMessage, Project } from '@/types';
import { INITIAL_PROJECTS } from '@/data/portfolioData';

export type SarangTab = 'jnana' | 'karma' | 'drishti';

export type AgentId = 
  | 'irdai-health-decoder'
  | 'gpa-claims-helpdesk'
  | 'gmc-gpa-knowledge-hub'
  | 'insurance-ai-architect';

export interface SpecialistAgent {
  id: AgentId;
  name: string;
  badge: string;
  desc: string;
  description?: string;
  placeholder: string;
  autoGreeting: string;
}

export const AGENT_GREETINGS: Record<AgentId, string> = {
  'gmc-gpa-knowledge-hub': 
    "🙏Shri Sita Ram🙏 I'm Sarang—GMC & GPA Knowledge Hub Special Ability is now active under Jnana mode. How can I help you today?",
  'gpa-claims-helpdesk': 
    "🙏Shri Sita Ram🙏 I'm Sarang—GPA Claims Admissibility & Grievance Helpdesk Special Ability is now active under Jnana mode. How can I help you today?",
  'irdai-health-decoder': 
    "🙏Shri Sita Ram🙏 I'm Sarang—IRDAI Health Master Circular Decoder Special Ability is now active under Jnana mode. How can I help you today?",
  'insurance-ai-architect': 
    "🙏Shri Sita Ram🙏 I'm Sarang—Insurance AI Solution Architect Special Ability is now active under Jnana mode. How can I help you today?"
};

export const GENERAL_JNANA_GREETING = 
  "🙏Shri Sita Ram🙏 I'm Sarang—your trusted AI insurance companion. How can I help you today?";

export const AGENT_BADGES: Record<AgentId, string> = {
  'gpa-claims-helpdesk': 'GPA Claims Admissibility & Grievance Helpdesk',
  'irdai-health-decoder': 'IRDAI Health Circular Decoder',
  'gmc-gpa-knowledge-hub': 'GMC & GPA Knowledge Hub',
  'insurance-ai-architect': 'Insurance AI Solution Architect'
};

export const AGENT_PLACEHOLDERS: Record<AgentId, string> = {
  'gpa-claims-helpdesk': "Type in medical findings from certificate and insurer's rejection terms...",
  'irdai-health-decoder': "Paste circular text or describe regulatory update to decode...",
  'gmc-gpa-knowledge-hub': "Ask about market standards, occupational exclusions, or policy wordings...",
  'insurance-ai-architect': "Describe operational bottleneck or underwriting workflow to automate..."
};

export const SPECIALIST_AGENTS: SpecialistAgent[] = [
  {
    id: 'gpa-claims-helpdesk',
    name: 'GPA Claims Admissibility & Grievance Helpdesk',
    badge: AGENT_BADGES['gpa-claims-helpdesk'],
    desc: 'Evaluates medical data against standard disability grids and generates grievance roadmaps',
    description: 'Evaluates medical data against standard disability grids and generates grievance roadmaps',
    placeholder: AGENT_PLACEHOLDERS['gpa-claims-helpdesk'],
    autoGreeting: AGENT_GREETINGS['gpa-claims-helpdesk']
  },
  {
    id: 'irdai-health-decoder',
    name: 'IRDAI Health Circular Decoder',
    badge: AGENT_BADGES['irdai-health-decoder'],
    desc: 'Translates complex regulatory mandates into plain English',
    description: 'Translates complex regulatory mandates into plain English',
    placeholder: AGENT_PLACEHOLDERS['irdai-health-decoder'],
    autoGreeting: AGENT_GREETINGS['irdai-health-decoder']
  },
  {
    id: 'insurance-ai-architect',
    name: 'Insurance AI Solution Architect',
    badge: AGENT_BADGES['insurance-ai-architect'],
    desc: 'Drafts structured automation blueprints and underwriting workflows',
    description: 'Drafts structured automation blueprints and underwriting workflows',
    placeholder: AGENT_PLACEHOLDERS['insurance-ai-architect'],
    autoGreeting: AGENT_GREETINGS['insurance-ai-architect']
  },
  {
    id: 'gmc-gpa-knowledge-hub',
    name: 'GMC & GPA Knowledge Hub',
    badge: AGENT_BADGES['gmc-gpa-knowledge-hub'],
    desc: 'Senior underwriter advisory for policy wordings & standards',
    description: 'Senior underwriter advisory for policy wordings & standards',
    placeholder: AGENT_PLACEHOLDERS['gmc-gpa-knowledge-hub'],
    autoGreeting: AGENT_GREETINGS['gmc-gpa-knowledge-hub']
  }
];

export function resolveAgentId(input?: any): AgentId | null {
  if (!input) return null;

  if (typeof input === 'object') {
    if (input.agentId && (input.agentId in AGENT_GREETINGS)) {
      return input.agentId as AgentId;
    }
    if (input.id) {
      return resolveAgentId(input.id);
    }
    if (input.title) {
      return resolveAgentId(input.title);
    }
  }

  const raw = String(input || '').toLowerCase().trim();

  // 1. Direct exact matching on the 4 canonical agent IDs
  if (raw === 'gpa-claims-helpdesk') return 'gpa-claims-helpdesk';
  if (raw === 'irdai-health-decoder') return 'irdai-health-decoder';
  if (raw === 'insurance-ai-architect') return 'insurance-ai-architect';
  if (raw === 'gmc-gpa-knowledge-hub') return 'gmc-gpa-knowledge-hub';

  // 2. Strict title & keyword priority matching (GPA evaluated distinctly before generic keywords)
  if (
    raw.includes('gpa claims') ||
    raw.includes('claims admissibility') ||
    raw.includes('grievance') ||
    raw.includes('disability') ||
    (raw.includes('gpa') && (raw.includes('claims') || raw.includes('helpdesk') || raw.includes('occupational') || raw.includes('classifier')))
  ) {
    return 'gpa-claims-helpdesk';
  }

  if (
    raw.includes('irdai') ||
    raw.includes('circular') ||
    raw.includes('decoder') ||
    (raw.includes('clause') && raw.includes('comparer'))
  ) {
    return 'irdai-health-decoder';
  }

  if (
    raw.includes('insurance ai') ||
    raw.includes('solution architect') ||
    raw.includes('burn-cost') ||
    raw.includes('visualizer') ||
    raw.includes('architect')
  ) {
    return 'insurance-ai-architect';
  }

  if (
    raw.includes('knowledge hub') ||
    raw.includes('knowledge agent') ||
    raw.includes('knowledge') ||
    raw.includes('underwriter') ||
    raw.includes('hub')
  ) {
    return 'gmc-gpa-knowledge-hub';
  }

  // 3. Legacy project indices (explicit string only)
  if (raw === 'project-2' || raw === 'proj-2') return 'gpa-claims-helpdesk';
  if (raw === 'project-1' || raw === 'proj-1') return 'irdai-health-decoder';
  if (raw === 'project-3' || raw === 'proj-3') return 'insurance-ai-architect';
  if (raw === 'project-4' || raw === 'proj-4') return 'gmc-gpa-knowledge-hub';

  return null;
}

export const getAgentIdForProject = resolveAgentId;

export type AgentSelectionHandler = (arg1?: any, arg2?: any) => void;

interface AgentChatContextType {
  activeTab: SarangTab;
  setActiveTab: (tab: SarangTab) => void;
  activeAgentId: AgentId | null;
  setActiveAgentId: (id: AgentId | null) => void;
  activeAgent: SpecialistAgent | null;
  activeSkill?: SpecialistAgent | null;
  setActiveAgent: (id: AgentId | null) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  openChat: (target?: any) => void;
  openHeroChat: () => void;
  openSpecialistChat: (targetId: any, options?: { forceScroll?: boolean }) => void;
  resetChat: () => void;
}

const AgentChatContext = createContext<AgentChatContextType | undefined>(undefined);

export function AgentChatProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<SarangTab>('jnana');
  const [activeAgentId, setActiveAgentId] = useState<AgentId | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'agent-greeting-general-init',
      sender: 'sarang',
      text: GENERAL_JNANA_GREETING,
      timestamp: 'Just now',
    }
  ]);

  const scrollToInlineChat = useCallback((options?: { forceScroll?: boolean; target?: 'workspace' | 'chat'; focusInput?: boolean }) => {
    setTimeout(() => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      const targetEl = (options?.target === 'chat' || isMobile)
        ? (document.getElementById('sarang-chat') || document.getElementById('sarang-workspace-top'))
        : (document.getElementById('sarang-workspace-top') || document.getElementById('sarang-chat'));

      if (targetEl) {
        if (options?.forceScroll) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const rect = targetEl.getBoundingClientRect();
          const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
          // Dynamic viewport ratio check: target is already visible if its top is comfortably in view
          const isAlreadyVisible = rect.top >= -60 && rect.top <= windowHeight * 0.55 && rect.bottom >= windowHeight * 0.25;
          if (!isAlreadyVisible) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
      if (options?.focusInput) {
        setTimeout(() => {
          const inputEl = document.getElementById('sarang-inline-input') as HTMLInputElement | null;
          inputEl?.focus({ preventScroll: true });
        }, 450);
      }
    }, 50);
  }, []);

  // 1. Strict Hero CTA Mode: opens Jnana Mode with fresh welcome state
  const openHeroChat = useCallback(() => {
    console.log('[AgentChatContext] openHeroChat: resetting to General Jnana mode with clean conversation thread');
    setActiveTab('jnana');
    setActiveAgentId(null);
    setMessages([
      {
        id: `agent-greeting-general-${Date.now()}`,
        sender: 'sarang',
        text: GENERAL_JNANA_GREETING,
        timestamp: 'Just now',
      }
    ]);
    scrollToInlineChat({ forceScroll: true, target: 'chat', focusInput: true });
  }, [scrollToInlineChat]);

  // Clean reset to General Jnana mode
  const resetChat = useCallback(() => {
    console.log('[AgentChatContext] resetChat: resetting to General Jnana mode with clean conversation thread');
    setActiveTab('jnana');
    setActiveAgentId(null);
    setMessages([
      {
        id: `agent-greeting-general-${Date.now()}`,
        sender: 'sarang',
        text: GENERAL_JNANA_GREETING,
        timestamp: 'Just now',
      }
    ]);
  }, []);

  // 2. Strict Specialist Domain Mode: opens pre-loaded with the specific expert persona
  const openSpecialistChat: AgentSelectionHandler = useCallback((idOrEvent?: any, maybeParam?: any) => {
    let evt: any = null;
    let targetId: any = idOrEvent;
    let opts: { forceScroll?: boolean } = {};

    if (idOrEvent && (typeof idOrEvent.preventDefault === 'function' || idOrEvent.nativeEvent)) {
      evt = idOrEvent;
      targetId = maybeParam;
    } else if (maybeParam && (typeof maybeParam.preventDefault === 'function' || maybeParam.nativeEvent)) {
      evt = maybeParam;
      targetId = idOrEvent;
    } else if (maybeParam && typeof maybeParam === 'object') {
      opts = maybeParam;
    }

    if (evt) {
      if (typeof evt.preventDefault === 'function') evt.preventDefault();
      if (typeof evt.stopPropagation === 'function') evt.stopPropagation();
    }

    if (targetId === null || targetId === undefined) {
      console.log('[AgentChatContext] openSpecialistChat: null target, resetting chat thread');
      setActiveAgentId(null);
      setMessages([
        {
          id: `agent-greeting-general-${Date.now()}`,
          sender: 'sarang',
          text: GENERAL_JNANA_GREETING,
          timestamp: 'Just now',
        }
      ]);
      setActiveTab('jnana');
      return;
    }

    // Strictly resolve target ID to one of the 4 specialist agents
    const validId = resolveAgentId(targetId);
    if (!validId) {
      console.warn('[AgentChatContext] Unknown specialist target:', targetId);
      return; // STRICT ISOLATION: Never default to generic Jnana mode when specialist clicked
    }

    console.log('[AgentChatContext] openSpecialistChat: switching mode to', validId, 'and cleanly resetting conversation thread');
    setActiveTab('jnana');
    setActiveAgentId(validId);

    // Exact greeting mapping for the resolved agent ID
    const greetingText = AGENT_GREETINGS[validId];

    const initialGreeting: ChatMessage = {
      id: `agent-greeting-${validId}-${Date.now()}`,
      sender: 'sarang',
      text: greetingText,
      timestamp: 'Just now',
    };

    // Clean reset of messages array to prevent stale conversation bleeding
    setMessages([initialGreeting]);
    scrollToInlineChat({ forceScroll: opts.forceScroll ?? true, target: 'chat', focusInput: false });
  }, [scrollToInlineChat]);

  const openChat = useCallback((tabOrTarget?: any) => {
    if (tabOrTarget === 'karma' || tabOrTarget === 'drishti') {
      setActiveTab(tabOrTarget);
      setActiveAgentId(null);
      setTimeout(() => {
        document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }
    if (!tabOrTarget || tabOrTarget === 'jnana') {
      openHeroChat();
      return;
    }
    openSpecialistChat(tabOrTarget);
  }, [openHeroChat, openSpecialistChat]);

  const activeAgent = useMemo(() => {
    if (!activeAgentId) return null;
    return SPECIALIST_AGENTS.find((a) => a.id === activeAgentId) || null;
  }, [activeAgentId]);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      activeAgentId,
      setActiveAgentId,
      activeAgent,
      activeSkill: activeAgent,
      setActiveAgent: setActiveAgentId,
      messages,
      setMessages,
      openChat,
      openHeroChat,
      openSpecialistChat,
      resetChat,
    }),
    [activeTab, activeAgentId, activeAgent, messages, openChat, openHeroChat, openSpecialistChat, resetChat]
  );

  return (
    <AgentChatContext.Provider value={value}>
      {children}
    </AgentChatContext.Provider>
  );
}

export function useAgentChat(): AgentChatContextType {
  const context = useContext(AgentChatContext);
  if (!context) {
    throw new Error('useAgentChat must be used within an AgentChatProvider');
  }
  return context;
}
