'use client';

import React from 'react';
import { Project } from '@/types';
import { X, ExternalLink, Github, CheckCircle, Clock, Lightbulb, AlertTriangle, Cpu, TrendingUp } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed Prototype
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            In Active Development
          </span>
        );
      case 'Idea':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-500/40 text-amber-300">
            <Lightbulb className="w-3.5 h-3.5" />
            Architectural Concept
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-cyan-500/30 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-navy-950/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-3 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              {project.category}
            </span>
            {getStatusBadge(project.status)}
            <span className="text-[11px] text-amber-400/90 bg-amber-950/50 border border-amber-500/20 px-2 py-0.5 rounded">
              Demonstration Model
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {project.title}
          </h3>

          <p className="text-sm text-cyan-300/90 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Business Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-navy-950/90 border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>The Underwriting Challenge</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.businessProblem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/90 border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>The Proposed AI Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.proposedSolution}
            </p>
          </div>
        </div>

        {/* Business Impact Box */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-navy-950 to-navy-900 border border-gold-500/30 space-y-1.5">
          <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Measured Business Impact</span>
          </div>
          <p className="text-sm text-slate-200 font-medium leading-relaxed">
            {project.businessImpact}
          </p>
        </div>

        {/* Tools & Technologies */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Applied Tools & Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-navy-950 border border-slate-700/80 text-xs font-medium text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-3 rounded-lg bg-navy-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Confidentiality & Compliance Notice:</strong> All project data feeds, broker terms, and census files shown in this demonstration utilize strictly fictionalized synthetic numbers to ensure zero exposure of private medical or proprietary corporate underwriting schedules.
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-cyan-glow hover:bg-cyan-400 transition-colors"
              >
                <span>Live Interactive Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg glass-panel text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 hover:border-slate-600 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
}
