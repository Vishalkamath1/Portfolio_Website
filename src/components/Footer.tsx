'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Shield, Mail, Linkedin, Github, ArrowUp, Lock } from 'lucide-react';
import { OWNER_PROFILE } from '@/data/portfolioData';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on Admin routes for a dedicated clean dashboard experience
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="relative bg-navy-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-cyan-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-cyan-400/40 shadow-cyan-glow">
                <Image
                  src="/images/sarang-avatar.jpg"
                  alt="SARANG AI"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                SARANG <span className="text-cyan-400 text-sm font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              {OWNER_PROFILE.tagline}
            </p>
            <p className="text-xs text-gold-400 tracking-wider font-semibold uppercase">
              {OWNER_PROFILE.slogan}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md pt-2">
              Combining 7.4 years of frontline Indian insurance experience across Life Insurance, Group Health (GMC), and Personal Accident (GPA) underwriting with advanced Excel data modelling and applied AI automation.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Architecture
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#hero" className="hover:text-cyan-400 transition-colors">1. Hero Section</Link></li>
              <li><Link href="#about" className="hover:text-cyan-400 transition-colors">2. About Me</Link></li>
              <li><Link href="#expertise" className="hover:text-cyan-400 transition-colors">3. Expertise</Link></li>
              <li><Link href="#projects" className="hover:text-cyan-400 transition-colors">4. AI Projects Library</Link></li>
              <li><Link href="#agent" className="hover:text-cyan-400 transition-colors">5. Sarang AI Agent</Link></li>
              <li><Link href="#credentials" className="hover:text-cyan-400 transition-colors">6. Credentials</Link></li>
              <li><Link href="#contact" className="hover:text-cyan-400 transition-colors">7. Resume & Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Direct Connect & Admin */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href={OWNER_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={OWNER_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${OWNER_PROFILE.email}`}
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs text-slate-400 hover:text-gold-400 border border-slate-800 hover:border-gold-500/30 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Owner Admin Access</span>
            </Link>
          </div>
        </div>

        {/* Regulatory & Domain Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="max-w-3xl text-center md:text-left">
            <span className="text-slate-400 font-semibold">Underwriting Notice:</span> Demonstrations and SARANG AI responses are provided strictly for educational and portfolio demonstration purposes. No binding underwriting decisions or quote commitments are rendered.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {OWNER_PROFILE.name} · SARANG AI
          </p>
        </div>
      </div>
    </footer>
  );
}
