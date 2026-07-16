import React, { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const StarInput = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(s => (
      <button key={s} type="button" onClick={() => onChange(s)} className="transition-transform hover:scale-110">
        <Star className={`h-7 w-7 ${s <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
      </button>
    ))}
  </div>
);

const StarDisplay = ({ value, size = 'sm' }) => {
  const sz = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5';
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`${sz} ${s <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
      ))}
    </div>
  );
};

const ReviewSection = ({ propertyId, reviews: initialReviews = [], userHasBooked = false }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) { setError('Please select a star rating.'); return; }
    if (text.trim().length < 10) { setError('Review must be at least 10 characters.'); return; }
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 800)); // simulate API
    const newReview = {
      id: Date.now(), studentName: user?.name || 'Anonymous',
      rating, date: new Date().toISOString().split('T')[0],
      text: text.trim(), verified: userHasBooked,
    };
    setReviews(prev => [newReview, ...prev]);
    setRating(0); setText(''); setSuccess(true); setLoading(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div>
      {/* Summary */}
      {avgRating && (
        <div className="flex items-center gap-4 mb-6 p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
          <div className="text-center">
            <div className="text-4xl font-black text-white">{avgRating}</div>
            <StarDisplay value={Number(avgRating)} size="md" />
            <div className="text-xs text-slate-500 mt-1">{reviews.length} reviews</div>
          </div>
          <div className="flex-1 space-y-1">
            {[5,4,3,2,1].map(s => {
              const cnt = reviews.filter(r => r.rating === s).length;
              const pct = reviews.length ? (cnt/reviews.length)*100 : 0;
              return (
                <div key={s} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-4">{s}</span>
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-slate-600 w-4">{cnt}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Write review */}
      {user ? (
        userHasBooked ? (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Write a Review</h4>
            {success && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm mb-3 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
                <CheckCircle2 className="h-4 w-4" /> Review submitted successfully!
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mb-3 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}
            <div className="mb-3"><StarInput value={rating} onChange={setRating} /></div>
            <textarea
              value={text} onChange={e => setText(e.target.value)} required
              placeholder="Share your experience..."
              className="w-full bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 resize-none min-h-[100px] mb-3"
            />
            <Button type="submit" size="sm" disabled={loading} className="flex items-center gap-2">
              {loading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Posting...</> : 'Submit Review'}
            </Button>
          </form>
        ) : (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-400">
            Only verified tenants who have completed a booking can write reviews.
          </div>
        )
      ) : (
        <div className="mb-6 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-slate-400">
          <a href="/login" className="text-violet-400 hover:underline">Sign in</a> to write a review.
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  {r.studentName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white">{r.studentName}</span>
                    {r.verified && (
                      <span className="flex items-center gap-0.5 text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <StarDisplay value={r.rating} />
                    <span className="text-xs text-slate-600">{new Date(r.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{r.text}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-slate-600 text-sm text-center py-6">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export { StarDisplay };
export default ReviewSection;
