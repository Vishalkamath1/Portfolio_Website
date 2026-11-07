'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from '@/data/portfolioData';
import { fetchProjectsFromDb } from '@/lib/supabaseClient';
import { Project, ProjectCategory } from '@/types';
import ProjectModal from '@/components/ProjectModal';
import { 
  FolderGit2, 
  Search, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  ExternalLink,
  Layers
} from 'lucide-react';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'GMC & GPA Underwriting AI',
  'Claims Automation',
  'GenAI Tools',
  'Insurance Analytics / Power BI',
  'Automation (Excel/Python)',
  'Experiments'
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.businessProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery && p.published;
  });

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            Completed
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
            A searchable, database-driven library of domain-specific prototypes engineered to resolve real insurance underwriting bottlenecks.
          </p>
          <div className="mt-2 text-xs text-amber-400/90 font-medium">
            * All sample tools are demonstration models built with sanitized synthetic data.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, keyword, or tool (e.g. Gemini, Excel, GMC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-navy-950/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white absolute right-4 top-1/2 -translate-y-1/2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Pills Scrollable Row */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 pt-2 px-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-navy-950 shadow-cyan-glow font-bold'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-sm text-slate-300 font-medium">No projects match your filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all group cursor-pointer"
                onClick={() => setSelectedProject(project)}
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
                  <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:text-cyan-300">
                    Inspect Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Demo Concept
                  </span>
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
