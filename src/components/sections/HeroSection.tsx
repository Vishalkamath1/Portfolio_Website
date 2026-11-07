'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, ShieldCheck, Sparkles, Award, FileText, ChevronDown } from 'lucide-react';
import { OWNER_PROFILE } from '@/data/portfolioData';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-gold-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wide shadow-cyan-glow">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{OWNER_PROFILE.brandName} · Insurance Domain Meets Artificial Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {OWNER_PROFILE.tagline}
            </h1>

            {/* Supporting Message */}
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-gold-400 bg-clip-text text-transparent">
              {OWNER_PROFILE.heroSupport}
            </p>

            {/* Introduction Narrative */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Portfolio of <strong className="text-white font-semibold">{OWNER_PROFILE.name}</strong> — 
              uniting <span className="text-cyan-300 font-semibold">7.4 years of frontline insurance experience</span> (GMC & GPA underwriting, corporate risk pricing, advanced Excel burn costing) with applied <span className="text-gold-300 font-semibold">AI automation & LLM workflows</span> to modernize underwriting operations.
            </p>

            {/* Brand Slogan */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs tracking-widest text-gold-400 font-bold uppercase pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {OWNER_PROFILE.slogan}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-sm tracking-wide shadow-cyan-glow hover:shadow-cyan-400/40 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>Explore AI Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="px-6 py-3.5 rounded-xl glass-panel text-slate-200 font-semibold text-sm tracking-wide border-slate-700/80 hover:border-cyan-400/60 hover:text-white transition-all flex items-center gap-2 hover:bg-slate-800/40 active:scale-95"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Connect With Me</span>
              </Link>

              <Link
                href="#agent"
                className="px-5 py-3.5 rounded-xl bg-navy-900/90 border border-gold-400/50 text-gold-300 hover:text-gold-200 font-semibold text-sm tracking-wide hover:shadow-gold-glow hover:border-gold-400 transition-all flex items-center gap-2 active:scale-95"
              >
                <Bot className="w-4 h-4 text-gold-400" />
                <span>Talk with Sarang AI</span>
              </Link>
            </div>

            {/* Insurance Career Metrics */}
            <div className="pt-8 grid grid-cols-3 gap-3 sm:gap-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-lg bg-navy-900/40 border border-slate-800/60">
                <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1">
                  7.4 <span className="text-cyan-400 text-xs font-semibold uppercase">Yrs</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Total Insurance</div>
              </div>

              <div className="p-3 rounded-lg bg-navy-900/40 border border-slate-800/60">
                <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1">
                  4.5 <span className="text-cyan-400 text-xs font-semibold uppercase">Yrs</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">GMC & GPA Underwriting</div>
              </div>

              <div className="p-3 rounded-lg bg-navy-900/40 border border-slate-800/60">
                <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1">
                  2.9 <span className="text-gold-400 text-xs font-semibold uppercase">Yrs</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Life Insurance Sales</div>
              </div>
            </div>
          </div>

          {/* Right Column: Sarang Archer Guardian Hero Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[420px]">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-gold-500 opacity-40 blur-xl group-hover:opacity-70 transition duration-700" />

              <div className="relative rounded-2xl overflow-hidden glass-panel border border-cyan-400/40 shadow-2xl bg-navy-950">
                {/* Artwork */}
                <div className="relative aspect-square w-full bg-navy-900">
                  <Image
                    src="/images/sarang-archer.jpg"
                    alt="SHARANG AI — Futuristic Archer Guardian"
                    fill
                    priority
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* Sub-label banner */}
                <div className="p-4 bg-navy-900/95 border-t border-cyan-500/30 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-cyan-glow" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                        SARANG AI <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1 rounded border border-cyan-500/30">v1.0</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Central Underwriting Guardian</div>
                    </div>
                  </div>

                  <Link
                    href="#agent"
                    className="text-xs font-semibold text-gold-400 hover:text-gold-300 bg-gold-950/70 border border-gold-500/40 px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                  >
                    <span>Engage</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <Link
            href="#about"
            className="flex flex-col items-center text-xs text-slate-500 hover:text-cyan-400 transition-colors gap-1"
            aria-label="Scroll to About Me"
          >
            <span>Explore Experience</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
