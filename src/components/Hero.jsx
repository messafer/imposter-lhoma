import React from 'react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck,
  Star,
  Activity,
  Layers,
  ArrowUpRight,
  Server
} from 'lucide-react';

export default function Hero({ onOpenContact }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background ambient lighting effects matching design concept */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-tr from-brand-600/25 via-purple-600/20 to-pink-600/10 blur-[120px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500/15 blur-[100px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/15 blur-[100px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/30 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-8 shadow-lg shadow-brand-500/10 hover:scale-105 transition-all cursor-pointer">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="font-bold uppercase tracking-wider text-[10px] bg-brand-500 text-white px-2 py-0.5 rounded-full">Next-Gen</span>
            <span>Lhoma Platform v3.0 is live with autonomous workflows</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl leading-[1.08] sm:leading-[1.08]">
            ACCELERATE. INNOVATE. SCALE. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
              LHOMA AI PLATFORM
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
            The definitive enterprise AI operational platform for high-velocity teams to automate workflows, unlock real-time intelligence, and drive global growth.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-xl shadow-brand-600/30 hover:shadow-brand-600/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md"
            >
              <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Request Live Demo</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>1-minute setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Enterprise SOC-2 ready</span>
            </div>
          </div>

          {/* Interactive UI Mockup Preview matching the visual design concept */}
          <div className="mt-16 w-full max-w-5xl relative">
            
            {/* Outer Glow Halo */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-25 -z-10 transform scale-95" />

            <div className="rounded-3xl border border-indigo-500/30 bg-slate-950/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl text-left">
              
              {/* Window Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">lhoma.platform // operational-intelligence</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live System Active
                  </span>
                </div>
              </div>

              {/* Real-Time Performance Analytics Cards */}
              <div className="p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Real-Time Performance Analytics</h3>
                    <p className="text-xs text-slate-400">Autonomous workflow streams and telemetry</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">Auto-Scaling</span>
                  </div>
                </div>

                {/* 3 Glowing Glass Metric Cards with Wave Charts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Card 1: Total Revenue / Value */}
                  <div className="rounded-2xl p-5 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-purple-500/30 shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)] hover:border-purple-400/50 transition-all group">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Total Revenue</span>
                      <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-[10px]">1</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-extrabold text-white tracking-tight">$1.4M</span>
                      <span className="text-xs font-bold text-emerald-400">(+18.4%)</span>
                    </div>
                    {/* SVG Wave Chart */}
                    <div className="mt-4 h-16 w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,45 Q30,10 60,35 T120,20 T180,40 T200,15 L200,60 L0,60 Z" fill="url(#purpleGrad)" />
                        <path d="M0,45 Q30,10 60,35 T120,20 T180,40 T200,15" fill="none" stroke="#c084fc" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Card 2: Active Users */}
                  <div className="rounded-2xl p-5 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-indigo-500/30 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] hover:border-indigo-400/50 transition-all group">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Active Users</span>
                      <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">28</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-extrabold text-white tracking-tight">8.9K</span>
                      <span className="text-xs font-bold text-emerald-400">(+12.6%)</span>
                    </div>
                    {/* SVG Wave Chart */}
                    <div className="mt-4 h-16 w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,35 Q40,55 80,25 T140,40 T180,10 T200,25 L200,60 L0,60 Z" fill="url(#indigoGrad)" />
                        <path d="M0,35 Q40,55 80,25 T140,40 T180,10 T200,25" fill="none" stroke="#818cf8" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Card 3: Server Uptime SLA */}
                  <div className="rounded-2xl p-5 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/30 shadow-[0_0_30px_-10px_rgba(6,182,212,0.2)] hover:border-cyan-400/50 transition-all group">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Server Uptime</span>
                      <Server className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-extrabold text-white tracking-tight">99.98%</span>
                      <span className="text-xs font-bold text-cyan-400">Optimal</span>
                    </div>
                    {/* Status Bar */}
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Cluster Status</span>
                        <span className="text-emerald-400 font-mono">99.98% SLA</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Interactive Metric Graphs Section */}
                <div className="rounded-2xl p-6 bg-slate-900/70 border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Project Lifecycle Overview</h4>
                      <p className="text-xs text-slate-400">Continuous anomaly detection & event throughput</p>
                    </div>
                    <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-400">
                      <span className="px-2 py-0.5 rounded-lg bg-brand-600 text-white">1D</span>
                      <span className="px-2 py-0.5 hover:text-white cursor-pointer">1W</span>
                      <span className="px-2 py-0.5 hover:text-white cursor-pointer">1M</span>
                      <span className="px-2 py-0.5 hover:text-white cursor-pointer">1Y</span>
                    </div>
                  </div>

                  {/* Dual Wave Graph */}
                  <div className="h-32 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                      <path d="M0,90 Q70,20 140,80 T280,30 T400,90 T500,20" fill="none" stroke="#06b6d4" strokeWidth="3" />
                      <path d="M0,70 Q90,110 180,40 T320,100 T440,30 T500,60" fill="none" stroke="#a855f7" strokeWidth="3" />
                      {/* Active points */}
                      <circle cx="280" cy="30" r="5" fill="#06b6d4" className="animate-ping" />
                      <circle cx="280" cy="30" r="4" fill="#ffffff" />
                      <circle cx="320" cy="100" r="4" fill="#a855f7" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-3 border-t border-slate-800">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Social Proof Logos */}
          <div className="mt-16 sm:mt-24 text-center">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 mb-6">
              Trusted by 10,000+ teams and high-growth innovators worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-600 dark:text-slate-300">ACME CORP</span>
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-600 dark:text-slate-300">HYPERFLOW</span>
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-600 dark:text-slate-300">STRATA CLOUD</span>
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-600 dark:text-slate-300">PULSE LOGIC</span>
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-600 dark:text-slate-300">NOVANET</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
