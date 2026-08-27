import React from 'react';
import { Sparkles, MessageSquare, ArrowUpRight, Globe, Share2, Shield, Heart } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 pt-16 pb-12 transition-colors relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-indigo-600 dark:from-white dark:via-brand-300 dark:to-indigo-300 bg-clip-text text-transparent">
                LHOMA AI
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Accelerate. Innovate. Scale. The definitive enterprise AI operational platform designed to automate workflows and drive global growth.
            </p>
            
            {/* System Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems 100% Operational</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Multi-Agent Engine</a></li>
              <li><a href="#preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Live Intelligence</a></li>
              <li><a href="#preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Connectors & Ecosystem</a></li>
              <li><a href="#pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Pricing Plans</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Changelog v3.0</a></li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Developers
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1">SDK Quickstart <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="#preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">REST & GraphQL API</a></li>
              <li><a href="#preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Webhooks & Events</a></li>
              <li><a href="#preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Private VPC Setup</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">CLI Tools</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">SOC-2 Type II</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Security Architecture</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenContact(); }} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} LHOMA AI, Inc. Engineered with modern precision.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <button onClick={onOpenContact} className="p-2 rounded-xl text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Global">
              <Globe className="w-4 h-4" />
            </button>
            <button onClick={onOpenContact} className="p-2 rounded-xl text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Community">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button onClick={onOpenContact} className="p-2 rounded-xl text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
