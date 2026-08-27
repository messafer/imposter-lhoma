import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Clock, 
  Globe2 
} from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      value: '99.99%',
      label: 'Platform Uptime SLA',
      description: 'Enterprise grade reliability and fault-tolerant architecture.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      value: '10x',
      label: 'Faster Deployment',
      description: 'Accelerate cycle times from idea to production deployment.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      value: '140M+',
      label: 'Tasks Automated Daily',
      description: 'Processing millions of background queries and tasks smoothly.',
      icon: TrendingUp,
      color: 'text-brand-500 bg-brand-500/10'
    },
    {
      value: '180+',
      label: 'Countries Supported',
      description: 'Global distributed network with ultra-low latency edge CDN.',
      icon: Globe2,
      color: 'text-indigo-500 bg-indigo-500/10'
    }
  ];

  return (
    <section className="py-16 bg-slate-100/60 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {stat.value}
                  </span>
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  {stat.label}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
