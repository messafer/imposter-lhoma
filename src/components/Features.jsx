import React, { useState } from 'react';
import { 
  Bot, 
  Workflow, 
  LineChart, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Layers, 
  Code2, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Features({ onOpenContact }) {
  const [activeHover, setActiveHover] = useState(null);

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For Scale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered to Solve Complex Business Workflows
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Combine human strategy with autonomous machine intelligence. Every tool you need to run, scale, and optimize operations.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Autonomous AI Workflows (Large - 2 cols) */}
          <div className="md:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white border border-brand-500/30 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Bot className="w-48 h-48 text-brand-400" />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-400/30 flex items-center justify-center text-brand-300 mb-6">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Autonomous Agents</span>
                <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
                  Multi-Agent Reasoning & Orchestration
                </h3>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-lg">
                  Deploy self-healing agents that autonomously execute multi-step research, parse unstructured data, and orchestrate business operations with zero human intervention.
                </p>
              </div>

              {/* Mini visual mockup inside bento */}
              <div className="mt-8 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/10">
                  <span>Agent Task Pipeline</span>
                  <span className="text-emerald-400 font-mono">Running (3/3 completed)</span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Scrape & parse market telemetry feeds</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Run anomaly detection model across 50,000 datapoints</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Generate executive summary & sync with Slack/ERP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Real-time Intelligence (1 col) */}
          <div className="rounded-3xl p-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Telemetry</span>
              <h3 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">Predictive Analytics</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Transform raw events into high-precision forecasts with built-in machine learning models.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Explore analytics</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Enterprise Security (1 col) */}
          <div className="rounded-3xl p-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Zero-Trust</span>
              <h3 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">SOC-2 & GDPR Ready</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                End-to-end data encryption at rest and in transit. Granular RBAC and comprehensive audit logging.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>View security whitepaper</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Developer APIs (1 col) */}
          <div className="rounded-3xl p-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Developers</span>
              <h3 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">GraphQL & REST APIs</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connect seamlessly with webhooks, SDKs for Python, Node, Go, and bi-directional events.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>Browse API docs</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Integrations & Connectors (Large - 3 cols) */}
          <div className="md:col-span-2 lg:col-span-3 rounded-3xl p-8 bg-gradient-to-r from-brand-50 to-indigo-50/60 dark:from-slate-900 dark:to-brand-950/30 border border-brand-200/60 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase mb-4">
                <Workflow className="w-3.5 h-3.5" />
                <span>Ecosystem Connectors</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                500+ Instant Native Integrations
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Plug into Slack, GitHub, Salesforce, Notion, Jira, Snowflake, Postgres, and AWS with one-click OAuth authentication.
              </p>
              <div className="mt-6">
                <button 
                  onClick={onOpenContact}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-500 transition-colors shadow-md"
                >
                  View All Integrations
                </button>
              </div>
            </div>

            {/* Integration Chips Grid */}
            <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
              {['Slack', 'GitHub', 'Salesforce', 'Snowflake', 'Jira', 'PostgreSQL', 'HubSpot', 'Linear', 'AWS'].map((item) => (
                <div 
                  key={item}
                  className="px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm text-center hover:border-brand-500 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
