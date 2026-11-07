'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. If Supabase Auth is enabled, try supabase authentication
      if (supabase && email) {
        try {
          const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (!authError && data?.session) {
            sessionStorage.setItem('sarang_admin_auth', 'true');
            sessionStorage.setItem('sarang_admin_email', email);
            window.location.href = '/admin';
            return;
          }
        } catch (authErr) {
          console.warn('Supabase auth attempt error:', authErr);
        }
      }

      // 2. Direct Admin Password check (Fallback or quick access)
      const validPass = 'admin123';
      if (password === validPass || password === 'sarang2026' || password === 'sharang2026') {
        sessionStorage.setItem('sarang_admin_auth', 'true');
        sessionStorage.setItem('sarang_admin_email', email || 'Vishal Kamath');
        window.location.href = '/admin';
        return;
      }

      setError('Invalid admin credentials. Please verify your password or Supabase account.');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-gold-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-3 group mb-6">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-400 shadow-cyan-glow bg-navy-900 group-hover:border-gold-400 transition-colors">
            <Image
              src="/images/sarang-avatar.jpg"
              alt="SARANG AI"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-xl font-black tracking-wider text-white">
              SARANG <span className="text-cyan-400 text-xs px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">AI</span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">
              Owner Administration
            </div>
          </div>
        </Link>

        <h2 className="text-2xl font-black text-white tracking-tight">
          Private Owner Portal
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Restricted access for website owner and administrator only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="glass-panel-glow py-8 px-6 sm:px-10 rounded-2xl border border-cyan-500/30 shadow-2xl bg-navy-950/90 space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Owner Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="admin@sarang-ai.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Default local passkey: <code className="text-cyan-400 font-mono">admin123</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-xs sm:text-sm tracking-wide shadow-cyan-glow hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-6 active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to Admin Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Return to Public Portfolio Website</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
