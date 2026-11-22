'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, Bot, Sparkles, Lock, LogOut, User } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'AI Projects', href: '#projects' },
  { name: 'Sarang AI', href: '#agent', highlight: true },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const local = 
        sessionStorage.getItem('sarang_admin_auth') || 
        localStorage.getItem('sarang_admin_auth') ||
        sessionStorage.getItem('sharang_admin_auth');
      if (local) {
        setIsAdmin(true);
        return;
      }
      if (supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            setIsAdmin(true);
          }
        } catch (e) {
          // ignore session check errors
        }
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    sessionStorage.removeItem('sarang_admin_auth');
    sessionStorage.removeItem('sarang_admin_email');
    sessionStorage.removeItem('sharang_admin_auth');
    sessionStorage.removeItem('sharang_admin_email');
    localStorage.removeItem('sarang_admin_auth');
    localStorage.removeItem('sarang_admin_email');
    localStorage.removeItem('sharang_admin_auth');
    localStorage.removeItem('sharang_admin_email');
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Signout error:', e);
      }
    }
    setIsAdmin(false);
    window.location.href = '/admin/login';
  };

  // Hide the public marketing navbar entirely on Admin dashboard & Admin login pages
  // to avoid overlapping with the dedicated Admin Top Navigation header
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu isolate ${
        scrolled
          ? 'bg-[#020617]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div 
              style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
              className="relative w-11 h-11 rounded-xl overflow-hidden ring-1 ring-inset ring-cyan-500/40 bg-cyan-950 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:ring-gold-400 transition-colors shrink-0 transform-gpu isolate"
            >
              <Image
                src="/Sarang%20New%20Logo.png"
                alt="Sarang AI Agent Logo"
                fill
                className="object-contain p-1"
                sizes="44px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                SARANG <span className="text-cyan-400 text-sm font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                Insurance Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              if (link.highlight) {
                return (
                  <div key={link.name} className="relative group px-1">
                    <Link
                      href={link.href}
                      className="relative group transition-all duration-300 px-4 py-1.5 text-xs font-semibold rounded-full text-cyan-300 bg-cyan-950/70 border border-cyan-400/80 hover:bg-cyan-900/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    >
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span>{link.name}</span>
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-sm font-medium rounded-md nav-link-transition text-slate-300 hover:text-cyan-400 hover:bg-slate-800/40"
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="h-4 w-px bg-slate-700/60 mx-2" />

            {/* Admin Dashboard Entry / Auth Actions */}
            {isAdmin ? (
              <div className="flex flex-row items-center justify-end gap-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-gold-400 bg-gold-950/60 border border-gold-500/40 rounded-md hover:bg-gold-900/60 transition-colors"
                  title="Owner Admin Dashboard"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/50 border border-rose-500/30 hover:bg-rose-900/60 rounded-md transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
                title="Owner Admin Dashboard"
              >
                <User className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/admin"
              className="w-11 h-11 min-w-[44px] min-h-[44px] p-2 text-slate-400 hover:text-gold-400 rounded-md flex items-center justify-center shrink-0 transition-colors"
              title="Admin"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 min-w-[44px] min-h-[44px] p-2 text-slate-300 hover:text-cyan-400 rounded-md focus:outline-none flex items-center justify-center shrink-0 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-[#020617]/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-1 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-4 py-3 min-h-[44px] rounded-md text-base font-medium transition-colors ${
                link.highlight
                  ? 'text-cyan-300 bg-cyan-950/70 ring-1 ring-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800/80">
            {isAdmin ? (
              <div className="flex items-center justify-between px-4 py-2">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 min-h-[44px] text-sm text-gold-400 hover:text-gold-300"
                >
                  <Lock className="w-4 h-4" />
                  Admin Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/50 border border-rose-500/30 rounded-md"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] text-sm text-gold-400 hover:text-gold-300"
              >
                <Lock className="w-4 h-4" />
                Owner Admin Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
