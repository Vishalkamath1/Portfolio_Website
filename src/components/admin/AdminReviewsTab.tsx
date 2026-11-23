'use client';

import React from 'react';
import { SarangReview } from '@/types';
import { Star, Trash2, CheckCircle2 } from 'lucide-react';

interface AdminReviewsTabProps {
  reviews: SarangReview[];
  onDeleteReview: (id: string) => void;
  isDeletingReview: string | null;
  onApproveReview?: (id: string, approved: boolean) => void;
}

export default function AdminReviewsTab({
  reviews,
  onDeleteReview,
  isDeletingReview,
  onApproveReview
}: AdminReviewsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            <span>Sarang AI Reviews & Ratings Management</span>
          </h3>
          <p className="text-xs text-slate-400">
            Inspect community evaluations, verify underwriting ratings, and moderate or delete reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-700 text-slate-300">
            Total Reviews: <strong className="text-white">{reviews.length}</strong>
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gold-950/80 border border-gold-500/40 text-gold-300">
            Average Rating: <strong className="text-white">
              {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0'} ★
            </strong>
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="p-12 text-center glass-panel rounded-2xl max-w-md mx-auto">
          <Star className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm text-slate-300">No reviews have been submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="glass-card rounded-2xl p-5 border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{rev.userName}</span>
                    {rev.approved === false && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-500/40">
                        Pending
                      </span>
                    )}
                    {rev.userRole && (
                      <span className="text-xs text-slate-400 font-normal">
                        ({rev.userRole})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-gold-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'text-gold-400 fill-gold-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-300 ml-1">
                      {rev.rating}.0
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500">
                    {(() => {
                      try {
                        const d = new Date(rev.createdAt);
                        if (isNaN(d.getTime())) return rev.createdAt;
                        const month = d.toLocaleDateString('en-US', { month: 'short' });
                        const day = String(d.getDate()).padStart(2, '0');
                        const year = d.getFullYear();
                        return `${month} ${day}, ${year}`;
                      } catch {
                        return rev.createdAt;
                      }
                    })()}
                  </span>

                  {rev.approved === false && onApproveReview && (
                    <button
                      onClick={() => onApproveReview(rev.id, true)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-emerald-100 bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
                      title="Approve this review"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteReview(rev.id)}
                    disabled={isDeletingReview === rev.id}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/60 border border-rose-500/30 hover:bg-rose-900/60 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    title="Delete this review permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isDeletingReview === rev.id ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-2 border-l-2 border-cyan-500/30">
                "{rev.reviewText}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
