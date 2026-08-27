import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Engineering',
      company: 'FinScale Global',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      content: 'Lhoma cut our team’s manual incident triaging time by 82%. The multi-agent workflow engine runs like clockwork and catches issues before our customers even notice.',
      badge: 'Verified Enterprise User'
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Product Operations',
      company: 'HyperFlow Cloud',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      content: 'The SDK integration was shockingly fast. We had autonomous anomaly detection running in production within one afternoon. It is now central to our reliability strategy.',
      badge: 'Verified Developer'
    },
    {
      name: 'Elena Rostova',
      role: 'Chief Technology Officer',
      company: 'Strata Logistics',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      content: 'From enterprise SOC2 compliance to seamless Slack & GitHub integrations, Lhoma is easily the most polished and capable AI operational platform we have evaluated.',
      badge: 'Enterprise Customer'
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by Fast-Moving Engineering & Operations Teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            See how forward-thinking leaders scale operational intelligence with Lhoma.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote content */}
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3.5">
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500/30"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}, <span className="font-semibold text-slate-700 dark:text-slate-300">{t.company}</span></p>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t.badge}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
