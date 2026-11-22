'use client';

import React from 'react';
import { ContactMessageRecord } from '@/lib/supabaseClient';
import { Mail, Trash2 } from 'lucide-react';

interface AdminInboxTabProps {
  messages: ContactMessageRecord[];
  onDeleteMessage: (id: string) => void;
  isDeletingMessage: string | null;
}

export default function AdminInboxTab({
  messages,
  onDeleteMessage,
  isDeletingMessage
}: AdminInboxTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">Contact & Recruiter Inquiries</h3>
        <p className="text-xs text-slate-400">
          Inquiries submitted via Section 7 of the public portfolio website.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-2xl max-w-md mx-auto">
          <Mail className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm text-slate-300">No contact submissions received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="glass-card rounded-2xl p-5 border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{m.name}</span>
                    {m.company && (
                      <span className="text-xs text-slate-400 font-normal">
                        ({m.company})
                      </span>
                    )}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-xs text-cyan-400 hover:underline">
                    {m.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-500/30">
                    {m.interest || 'Underwriting'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onDeleteMessage(m.id)}
                    disabled={isDeletingMessage === m.id}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/60 border border-rose-500/30 hover:bg-rose-900/60 transition-colors flex items-center gap-1 disabled:opacity-50 ml-1"
                    title="Delete this message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isDeletingMessage === m.id ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
