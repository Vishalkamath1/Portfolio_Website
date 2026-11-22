'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-navy-950 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-md w-full glass-card rounded-2xl border border-cyan-500/30 p-6 sm:p-8 text-center space-y-5 bg-navy-950/90 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto shadow-lg">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-white tracking-tight">
            Unexpected System Exception
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The application encountered an unexpected runtime state. You can attempt an instant session recovery or return to the main platform.
          </p>
          {error.digest && (
            <div className="text-[10px] text-slate-500 font-mono pt-1">
              Digest: {error.digest}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-xs tracking-wide shadow-cyan-glow hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl glass-panel border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5 text-cyan-400" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
