'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bot, FileText, ChevronDown } from 'lucide-react';
import { OWNER_PROFILE } from '@/data/portfolioData';
import { useAgentChat } from '@/context/AgentChatContext';

export default function HeroSection() {
  const { openHeroChat } = useAgentChat();

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-[#040814] pt-20 pb-4 lg:pt-24 lg:pb-6 overflow-hidden animate-hero-fade-in"
    >
      {/* Deep Space Atmosphere & Radiant Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[650px] h-[500px] bg-blue-600/15 blur-[160px] rounded-full" />
      </div>

      {/* Curved Futuristic Planetary Horizon with Golden Energy Streak */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 pointer-events-none overflow-hidden -z-10">
        {/* Soft Blue Atmospheric Curved Glow */}
        <div className="absolute -bottom-[320px] left-1/2 -translate-x-1/2 w-[140%] max-w-[1700px] h-[420px] rounded-[100%] bg-blue-600/25 blur-3xl" />
        {/* Glowing Cyan Horizon Line */}
        <div className="absolute -bottom-[340px] left-1/2 -translate-x-1/2 w-[140%] max-w-[1700px] h-[420px] rounded-[100%] border-t-2 border-cyan-400/70 shadow-[0_-12px_45px_rgba(6,182,212,0.7)]" />
        {/* Golden Energy Accent Curve */}
        <div className="absolute -bottom-[355px] left-1/2 -translate-x-1/2 w-[90%] max-w-[1150px] h-[420px] rounded-[100%] border-t-2 border-amber-400/80 shadow-[0_-8px_30px_rgba(245,158,11,0.75)]" />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Span 7): Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-4 text-center lg:text-left">
            {/* Top Brand Pill Badge */}
            <div 
              style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-1.5 rounded-full max-w-[340px] sm:max-w-none text-center sm:whitespace-nowrap bg-cyan-950/70 border border-cyan-400/80 text-cyan-300 text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            >
              <span className="text-center sm:whitespace-nowrap leading-relaxed">
                SARANG AI - Insurance Domain Meets Artificial Intelligence
              </span>
            </div>

            {/* Main Headline (2-Line Stacked Command from Mockup) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.8rem] font-black text-white tracking-tight leading-[1.08]">
              The AI-Powered <br className="hidden sm:inline" />
              Underwriter<span className="text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.9)]">.</span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-base sm:text-xl font-bold text-white leading-snug">
              Transforming 7+ Years of Insurance Expertise into{' '}
              <span className="text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                Intelligent AI Automation.
              </span>
            </p>

            {/* Insurance Expertise Description */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              GMC & GPA Underwriting • AI Solutions • Process Automation
            </p>

            {/* Slogan with Golden Dots */}
            <div className="flex items-center justify-center lg:justify-start gap-3.5 text-xs font-bold tracking-widest text-amber-400 uppercase pt-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                EXPERIENCE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                EXPLORE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                ENGAGE
              </span>
            </div>

            {/* 3 CTA Buttons in Clean Horizontal Flex */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              {/* Button 1: Explore AI Projects */}
              <Link
                href="#projects"
                className="btn-hover-lift h-10 px-5 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,0.85)] hover:from-cyan-300 hover:to-cyan-400 flex items-center gap-2 group active:scale-95 shrink-0"
              >
                <span>Explore AI Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Button 2: Connect With Me */}
              <Link
                href="#contact"
                className="btn-hover-lift h-10 px-5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-medium text-xs sm:text-sm tracking-wide border border-cyan-500/60 hover:border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.22)] hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] flex items-center gap-2.5 active:scale-95 shrink-0"
              >
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Connect With Me</span>
              </Link>

              {/* Button 3: Talk with Sarang AI */}
              <button
                type="button"
                onClick={openHeroChat}
                className="btn-hover-lift h-10 px-5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/80 text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_0_22px_rgba(245,158,11,0.3)] hover:shadow-[0_0_32px_rgba(245,158,11,0.5)] hover:border-amber-300 flex items-center gap-2.5 active:scale-95 cursor-pointer shrink-0"
              >
                <Bot className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Talk with Sarang AI</span>
              </button>
            </div>

            {/* 3 Experience Metric Cards */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {/* Metric 1 */}
              <div className="metric-card-hover rounded-2xl bg-[#040e24]/85 backdrop-blur-md border border-cyan-400/60 px-5 py-2.5 text-center shadow-[0_0_20px_rgba(6,182,212,0.22)] min-w-[115px]">
                <div className="text-xl sm:text-2xl font-black text-white flex items-baseline justify-center gap-1">
                  7.4 <span className="text-amber-400 text-[11px] font-bold uppercase tracking-wider">YRS</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium">Total Insurance</div>
              </div>

              {/* Metric 2 */}
              <div className="metric-card-hover rounded-2xl bg-[#040e24]/85 backdrop-blur-md border border-cyan-400/60 px-5 py-2.5 text-center shadow-[0_0_20px_rgba(6,182,212,0.22)] min-w-[115px]">
                <div className="text-xl sm:text-2xl font-black text-white flex items-baseline justify-center gap-1">
                  4.5 <span className="text-amber-400 text-[11px] font-bold uppercase tracking-wider">YRS</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium">GMC & GPA</div>
              </div>

              {/* Metric 3 */}
              <div className="metric-card-hover rounded-2xl bg-[#040e24]/85 backdrop-blur-md border border-cyan-400/60 px-5 py-2.5 text-center shadow-[0_0_20px_rgba(6,182,212,0.22)] min-w-[115px]">
                <div className="text-xl sm:text-2xl font-black text-white flex items-baseline justify-center gap-1">
                  2.9 <span className="text-amber-400 text-[11px] font-bold uppercase tracking-wider">YRS</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium">Life Insurance Sales</div>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5): 100% Unified, Blended Sarang Showcase Card */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="w-full max-w-[340px] lg:max-w-[380px] xl:max-w-[420px] mx-auto relative group">
              {/* Cyan Outer Glow */}
              <div className="absolute inset-0 bg-cyan-500/25 blur-3xl rounded-[2.5rem] -z-10 pointer-events-none" />

              {/* Single Unified Glass Card Frame */}
              <div className="animate-card-glow relative w-full flex flex-col justify-between rounded-[2.2rem] bg-gradient-to-b from-[#051532]/90 via-[#030b1c]/90 to-[#02050f]/95 backdrop-blur-2xl border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.45),inset_0_0_20px_rgba(6,182,212,0.15)] overflow-hidden transition-all duration-300 hover:border-cyan-300 p-5 sm:p-6">
                
                {/* Character & Platform Area with Advanced CSS Masking & Blending */}
                <div className="relative w-full pt-2 pb-2 px-2 flex flex-col items-center justify-center">
                  {/* Subtle Background Glow behind character */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none -z-10" />

                  {/* Character Image with CSS Mask to Dissolve Black Canvas Box */}
                  <div className="relative z-10 flex items-center justify-center mix-blend-screen [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)]">
                    <Image 
                      src="/sarang-warrior.webp" 
                      alt="Sarang AI Agent" 
                      width={360} 
                      height={360} 
                      priority
                      className="max-h-[230px] sm:max-h-[260px] w-auto mx-auto object-contain drop-shadow-[0_15px_30px_rgba(6,182,212,0.5)] scale-105" 
                    />
                  </div>

                  {/* Concentric Holographic Sci-Fi Pedestal */}
                  <div className="relative -mt-5 w-48 h-9 pointer-events-none z-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-[100%] bg-cyan-400/40 blur-md" />
                    <div className="absolute inset-x-0 inset-y-1 rounded-[100%] border-2 border-cyan-400 shadow-[0_0_22px_rgba(6,182,212,0.9),inset_0_0_10px_rgba(6,182,212,0.6)] animate-pulse" />
                    <div className="absolute inset-x-4 inset-y-1.5 rounded-[100%] border border-amber-400/70 shadow-[0_0_12px_rgba(245,158,11,0.7)]" />
                    <div className="absolute inset-x-10 inset-y-2 rounded-[100%] bg-cyan-300/50 blur-[2px]" />
                  </div>
                </div>

                {/* Seamlessly Integrated Caption (No dividing border, single glass surface) */}
                <div className="w-full pt-3 pb-1 text-center flex flex-col items-center">
                  <h3 className="text-cyan-400 font-black tracking-[0.25em] text-base sm:text-lg drop-shadow-[0_0_15px_rgba(6,182,212,0.85)]">
                    SARANG
                  </h3>
                  <p className="text-white text-xs sm:text-sm font-semibold mt-1 tracking-wide">
                    Your Central Insurance AI Agent
                  </p>
                  <p className="text-slate-400 text-[10px] sm:text-xs mt-0.5 tracking-wide">
                    Bridging Insurance Expertise with Artificial Intelligence
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Explore Experience Scroll Indicator */}
      <div className="w-full pb-2 flex flex-col items-center justify-center relative z-10">
        <Link
          href="#about"
          className="flex flex-col items-center text-xs tracking-widest uppercase text-slate-400 hover:text-cyan-400 transition-colors gap-0.5 group"
          aria-label="Scroll to About Me"
        >
          <span className="font-semibold text-[11px]">Explore Experience</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce group-hover:text-cyan-400 text-slate-400" />
        </Link>
      </div>
    </section>
  );
}
