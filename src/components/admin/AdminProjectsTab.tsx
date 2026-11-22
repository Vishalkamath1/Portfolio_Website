'use client';

import React from 'react';
import { Project, normalizeProjectStatus } from '@/types';
import { 
  Plus, 
  CheckCircle2, 
  EyeOff, 
  Eye, 
  Edit3, 
  Trash2 
} from 'lucide-react';

interface AdminProjectsTabProps {
  projects: Project[];
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
  onPreviewProject: (project: Project) => void;
  onTogglePublish: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

export default function AdminProjectsTab({
  projects,
  onNewProject,
  onEditProject,
  onPreviewProject,
  onTogglePublish,
  onDeleteProject
}: AdminProjectsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Project Library Manager</h3>
          <p className="text-xs text-slate-400">
            Publish, edit, preview, or add new underwriting and AI automation prototypes.
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-xs tracking-wide shadow-cyan-glow hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table / Cards */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="glass-card rounded-2xl p-5 border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/20">
                  {proj.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  normalizeProjectStatus(proj.status) === 'Completed'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : normalizeProjectStatus(proj.status) === 'In Progress'
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                    : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                }`}>
                  {normalizeProjectStatus(proj.status) === 'Completed' ? 'Completed Prototype' : proj.status}
                </span>
                {proj.published ? (
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Live on Portfolio
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                    <EyeOff className="w-3 h-3" /> Unpublished Draft
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                {proj.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.tools.map((tool, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Column */}
            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800 w-full md:w-auto justify-end">
              <button
                onClick={() => onPreviewProject(proj)}
                className="p-2 rounded-lg glass-panel text-slate-300 hover:text-white"
                title="Preview Project Modal"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => onTogglePublish(proj)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 border ${
                  proj.published
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/40'
                    : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40'
                }`}
                title={proj.published ? 'Unpublish' : 'Publish'}
              >
                {proj.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="hidden sm:inline">{proj.published ? 'Hide' : 'Publish'}</span>
              </button>

              <button
                onClick={() => onEditProject(proj)}
                className="p-2 rounded-lg glass-panel text-cyan-400 hover:text-cyan-300 border-cyan-500/30"
                title="Edit Project"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onDeleteProject(proj.id)}
                className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:text-rose-200"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
