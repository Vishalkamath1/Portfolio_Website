'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from '@/data/portfolioData';
import { fetchProjectsFromDb } from '@/lib/supabaseClient';
import { Project, normalizeProjectStatus } from '@/types';
import ProjectModal from '@/components/ProjectModal';
import { useAgentChat, AGENT_GREETINGS } from '@/context/AgentChatContext';
import { 
  FolderGit2, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Lightbulb
} from 'lucide-react';

export default function ProjectsSection() {
  const { openSpecialistChat } = useAgentChat();
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectChat = (project: Project) => {
    let targetAgentId = "gmc-gpa-knowledge-hub"; // fallback
    if (project.agentId && (project.agentId in AGENT_GREETINGS)) {
      targetAgentId = project.agentId;
    } else if (project.title.includes("GPA Claims") || project.id === 'gpa-claims-helpdesk') {
      targetAgentId = "gpa-claims-helpdesk";
    } else if (project.title.includes("IRDAI Health") || project.id === 'irdai-health-decoder') {
      targetAgentId = "irdai-health-decoder";
    } else if (project.title.includes("Insurance AI") || project.id === 'insurance-ai-architect') {
      targetAgentId = "insurance-ai-architect";
    } else if (project.title.includes("GMC & GPA Knowledge") || project.id === 'gmc-gpa-knowledge-hub') {
      targetAgentId = "gmc-gpa-knowledge-hub";
    }
    openSpecialistChat(targetAgentId, { forceScroll: true });
  };

  useEffect(() => {
    async function loadProjects() {
      try {
        const { projects: loaded } = await fetchProjectsFromDb();
        if (loaded && loaded.length > 0) {
          setProjects(loaded);
        }
      } catch (err) {
        console.warn('Falling back to initial projects:', err);
      }
    }
    loadProjects();

    const handleUpdate = () => {
      loadProjects();
    };

    window.addEventListener('sarang_projects_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('sarang_projects_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const publishedProjects = projects.filter((p) => p.published !== false);

  const getStatusBadge = (status: Project['status'] | string) => {
    const normalized = normalizeProjectStatus(status);
    const isPrototype = String(status || '').toLowerCase().includes('prototype');
    const label = isPrototype ? 'Completed Prototype' : 'Completed';

    switch (normalized) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            {label}
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'Idea':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950/80 border border-amber-500/40 text-amber-400">
            <Lightbulb className="w-3 h-3" />
            Idea / Concept
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-800/80 bg-navy-900/30 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-gold-400" />
            <span>Section 4 · Applied Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Projects & Underwriting Tools
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            A domain-specific portfolio of prototypes engineered to resolve real insurance underwriting bottlenecks.
          </p>
          <div className="mt-2 text-xs text-amber-400/90 font-medium">
            * All sample tools are demonstration models built with sanitized synthetic data.
          </div>
        </div>

        {/* Projects Grid directly below Section Header */}
        {publishedProjects.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-sm text-slate-300 font-medium">No published projects available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectChat(project)}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all group cursor-pointer"
              >
                <div>
                  {/* Category & Status Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/20 truncate max-w-[170px]">
                      {project.category}
                    </span>
                    {getStatusBadge(project.status)}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {project.tagline}
                  </p>

                  {/* Business Impact Snippet */}
                  <div className="p-3 rounded-lg bg-navy-950/80 border border-slate-800/80 mb-4">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-gold-400 mb-1">
                      Business Impact
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 font-medium">
                      {project.businessImpact}
                    </p>
                  </div>

                  {/* Applied Tools */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/60"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:text-cyan-300 cursor-pointer"
                  >
                    Inspect Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleProjectChat(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-md shadow-[0_0_10px_rgba(52,211,153,0.15)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Demonstrate Live
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
