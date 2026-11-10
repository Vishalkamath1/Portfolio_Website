'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  User, 
  Building2, 
  Clock, 
  ThumbsUp,
  Award
} from 'lucide-react';
import { SarangReview } from '@/types';
import { fetchSarangReviews, saveSarangReview } from '@/lib/supabaseClient';

export default function SarangReviews() {
  const [reviews, setReviews] = useState<SarangReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSarangReviews();
      setReviews(data);
    } catch (e) {
      console.warn('Failed to fetch reviews:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!userName.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!reviewText.trim()) {
      setErrorMessage('Please enter a short review of your experience with Sarang AI.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await saveSarangReview({
        userName: userName.trim(),
        userRole: userRole.trim() || 'Insurance Professional',
        rating,
        reviewText: reviewText.trim()
      });

      if (res.success && res.review) {
        setReviews((prev) => [res.review!, ...prev]);
        setSubmitSuccess(true);
        setUserName('');
        setUserRole('');
        setReviewText('');
        setRating(5);
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        setErrorMessage(res.error || 'Failed to submit review. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpful = (id: string) => {
    if (!helpfulIds.includes(id)) {
      setHelpfulIds((prev) => [...prev, id]);
    }
  };

  // Calculations for average & distribution
  const totalCount = reviews.length;
  const averageRating = totalCount > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1)
    : '5.0';

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : (stars === 5 ? 100 : 0);
    return { stars, count, percentage };
  });

  const getRatingDescriptor = (val: number) => {
    switch (val) {
      case 5: return '5 Stars · Outstanding Domain Precision';
      case 4: return '4 Stars · High Practical Accuracy';
      case 3: return '3 Stars · Good Foundational Logic';
      case 2: return '2 Stars · Needs Underwriting Calibration';
      case 1: return '1 Star · Inaccurate Guidance';
      default: return '5 Stars · Outstanding Precision';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="mt-16 pt-16 border-t border-slate-800/80">
      {/* Section Sub-Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3 shadow-cyan-glow">
          <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
          <span>Evaluation · Community Feedback</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Sarang AI Reviews & Ratings
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Evaluated by corporate underwriters, brokers, and insurance technologists for domain precision and prompt accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Rating Aggregate & Form */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Average Rating Scorecard */}
          <div className="glass-card rounded-2xl p-6 border-cyan-500/30 bg-navy-950/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                  <span>{averageRating}</span>
                  <span className="text-sm font-semibold text-slate-400">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-gold-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i <= Math.round(Number(averageRating)) ? 'text-gold-400 fill-gold-400' : 'text-slate-600'}`} 
                    />
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-bold shadow-cyan-glow">
                  {totalCount} {totalCount === 1 ? 'Review' : 'Verified Reviews'}
                </span>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Domain Tested</span>
                </div>
              </div>
            </div>

            {/* Rating Percentage Bars */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
              {distribution.map((d) => (
                <div key={d.stars} className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span className="w-10 flex items-center gap-1 font-semibold text-slate-300">
                    {d.stars} <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-navy-900 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${d.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-medium text-slate-400">
                    {d.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Rating & Review Submission Form */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border-cyan-500/30 bg-navy-950/90 shadow-2xl relative">
            <h4 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Leave Your Evaluation</span>
            </h4>
            <p className="text-xs text-slate-400 mb-5">
              Rate Sarang's underwriting guidance and share your insights with the peer community.
            </p>

            {submitSuccess && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! Your review has been recorded and published to the feed.</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-navy-900 p-2 rounded-xl border border-slate-800">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isFilled = starVal <= (hoverRating || rating);
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 text-slate-600 hover:scale-110 transition-transform focus:outline-none"
                          title={`${starVal} Star`}
                        >
                          <Star 
                            className={`w-6 h-6 transition-colors ${
                              isFilled 
                                ? 'text-gold-400 fill-gold-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' 
                                : 'text-slate-600'
                            }`} 
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[11px] font-semibold text-gold-400">
                    {getRatingDescriptor(hoverRating || rating)}
                  </span>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g., Rajesh Mehta"
                    required
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Designation / Company Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Title / Organization <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    placeholder="e.g., Senior Health Underwriter · Corporate TPA"
                    className="w-full bg-navy-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Review & Feedback <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={3}
                  placeholder="Share your thoughts on Sarang's underwriting calculation precision, burn-cost formulas, or AI prompt responses..."
                  required
                  className="w-full bg-navy-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold text-xs tracking-wide shadow-cyan-glow hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review & Rating</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Feed of Recent Reviews */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Recent Underwriter Reviews ({reviews.length})</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium">Sorted by recency</span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-400 glass-card rounded-2xl">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span className="text-xs">Loading verified reviews...</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-8 text-center glass-card rounded-2xl border-slate-800 text-slate-400 text-xs">
              No reviews yet. Be the first to evaluate Sarang AI!
            </div>
          ) : (
            <div className="space-y-3.5">
              {reviews.map((rev) => {
                const initials = rev.userName
                  .split(' ')
                  .map((w) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase() || 'U';

                const isVotedHelpful = helpfulIds.includes(rev.id);

                return (
                  <div
                    key={rev.id}
                    className="glass-card rounded-2xl p-5 border-slate-800/90 hover:border-cyan-500/40 transition-all group bg-navy-950/70"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar Initials Badge */}
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-900 to-navy-900 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black text-xs shrink-0 shadow-cyan-glow">
                          {initials}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                            <span>{rev.userName}</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>Verified</span>
                            </span>
                          </div>
                          {rev.userRole && (
                            <div className="text-[11px] text-slate-400 font-medium line-clamp-1">
                              {rev.userRole}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stars & Date */}
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-0.5 text-gold-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating 
                                  ? 'text-gold-400 fill-gold-400' 
                                  : 'text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-end gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{formatDate(rev.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Commentary */}
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-12 border-l-2 border-cyan-500/20 my-2">
                      "{rev.reviewText}"
                    </p>

                    {/* Helpful Action */}
                    <div className="pl-12 pt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <button
                        type="button"
                        onClick={() => handleHelpful(rev.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                          isVotedHelpful
                            ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                            : 'hover:text-slate-300 hover:bg-slate-800/40'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{isVotedHelpful ? 'Helpful (1)' : 'Helpful'}</span>
                      </button>
                      <span className="text-[10px] text-slate-500">Sarang AI Advisory Review</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
