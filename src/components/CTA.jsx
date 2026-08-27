import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CTA({ onOpenContact, onShowToast }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid work email address.', 'error');
      return;
    }
    onShowToast(`Invite sent to ${email}! Check your inbox.`, 'success');
    setEmail('');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-tr from-brand-950 via-slate-900 to-indigo-950 border border-brand-500/30 text-white shadow-2xl overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Scale with Confidence</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Accelerate Your Enterprise Operations with AI?
            </h2>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Join thousands of engineering teams that save over 400+ hours every month with Lhoma. Get started in minutes.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-600/30 shrink-0 transition-all hover:scale-105 active:scale-95"
              >
                <span>Get Instant Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>SOC-2 certified</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
