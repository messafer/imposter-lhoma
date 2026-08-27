import React, { useState } from 'react';
import { 
  Bot, 
  LineChart, 
  Workflow, 
  ShieldCheck, 
  Play, 
  Pause, 
  RefreshCw, 
  Sparkles, 
  Copy, 
  Check, 
  Zap, 
  ArrowRight,
  Code,
  Terminal
} from 'lucide-react';

export default function ProductPreview({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('workflows');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState([
    'Lhoma Agent Orchestrator initialized.',
    'Cluster health: 100% operational.',
    'Ready for input prompts.'
  ]);

  const tabs = [
    { id: 'workflows', name: 'Agent Workflows', icon: Workflow },
    { id: 'analytics', name: 'Live Intelligence', icon: LineChart },
    { id: 'code', name: 'Developer SDK', icon: Code },
    { id: 'security', name: 'Zero-Trust Security', icon: ShieldCheck },
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationLogs((prev) => [...prev, 'Running live multi-agent sync...']);
    setTimeout(() => {
      setSimulationLogs((prev) => [
        ...prev, 
        '✓ Fetched 1,200 data stream items from connected nodes.',
        '✓ Neural classifier scored 99.8% precision on transaction cluster.',
        '✓ Executive sync report pushed to webhook endpoint.'
      ]);
      setIsSimulating(false);
    }, 1200);
  };

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="preview" className="py-24 bg-slate-100/70 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Platform Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See the Power of Lhoma in Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Switch between modes to experience how developers, analysts, and operators leverage Lhoma every day.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-500'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Window */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                lhoma-console // {activeTab}.config
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">Environment:</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Production-Ready
              </span>
            </div>
          </div>

          {/* Dynamic Content based on Tab */}
          <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-center">
            
            {/* 1. AGENT WORKFLOWS TAB */}
            {activeTab === 'workflows' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Autonomous Agent Loop</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Trigger multi-step agent reasoning and monitor live execution</p>
                  </div>
                  <button
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-brand-600 hover:bg-brand-500 disabled:opacity-50 transition-all shadow-md shadow-brand-600/20"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing Orchestration...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Trigger Agent Pipeline</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-xs font-mono text-brand-600 dark:text-brand-400 font-bold">STEP 01</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Data Ingestion</h4>
                    <p className="text-xs text-slate-500 mt-1">Parses real-time webhooks, databases, and unstructured JSON.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">STEP 02</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Neural Decision Engine</h4>
                    <p className="text-xs text-slate-500 mt-1">Applies custom business rules and LLM contextual reasoning.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">STEP 03</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Automated Action</h4>
                    <p className="text-xs text-slate-500 mt-1">Triggers downstream APIs, updates records, sends notifications.</p>
                  </div>
                </div>

                {/* Console Output */}
                <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 space-y-1.5 max-h-48 overflow-y-auto">
                  <div className="flex items-center gap-2 text-slate-500 pb-1 border-b border-slate-800/80 mb-2">
                    <Terminal className="w-3.5 h-3.5 text-brand-400" />
                    <span>Real-Time Execution Logs</span>
                  </div>
                  {simulationLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-brand-400">&gt;</span>
                      <span className={log.includes('✓') ? 'text-emerald-400' : 'text-slate-300'}>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. LIVE INTELLIGENCE TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Predictive Intelligence Dashboard</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Live stream of operational velocity and forecasting</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    Auto-Refreshing (1s)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 font-medium">Model Latency</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12.4 ms</div>
                    <div className="text-xs text-emerald-500 mt-1 font-semibold">99th percentile</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 font-medium">Cost Optimization</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">-64.8%</div>
                    <div className="text-xs text-emerald-500 mt-1 font-semibold">Saved vs manual ops</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 font-medium">Accuracy Score</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">99.98%</div>
                    <div className="text-xs text-emerald-500 mt-1 font-semibold">Across 4.5M validations</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-base">Want custom intelligence models for your dataset?</h4>
                    <p className="text-xs text-brand-100 mt-0.5">Train domain-specific fine-tunes with our dedicated engineering support.</p>
                  </div>
                  <button 
                    onClick={onOpenContact}
                    className="px-4 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-xs hover:bg-brand-50 transition-colors shrink-0"
                  >
                    Request Custom Model
                  </button>
                </div>
              </div>
            )}

            {/* 3. DEVELOPER SDK TAB */}
            {activeTab === 'code' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Developer SDK</h3>
                    <p className="text-xs sm:text-sm text-slate-500">Integrate Lhoma into your codebase with 4 lines of code</p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Snippet'}</span>
                  </button>
                </div>

                <div className="rounded-2xl bg-slate-950 p-5 font-mono text-xs text-slate-200 border border-slate-800 overflow-x-auto">
                  <pre className="text-emerald-400">
{`// 1. Initialize Lhoma Client
import { LhomaClient } from '@lhoma-ai/sdk';

const client = new LhomaClient({ 
  apiKey: process.env.LHOMA_SECRET_KEY,
  environment: 'production'
});

// 2. Spawn autonomous workflow agent
const agent = await client.agents.create({
  name: 'RevenueRiskAuditor',
  triggers: ['on_invoice_created'],
  capabilities: ['fraud_detection', 'auto_resolve_disputes']
});

console.log(\`Agent \${agent.id} active and listening.\`);`}
                  </pre>
                </div>
              </div>
            )}

            {/* 4. ZERO-TRUST SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise Security Architecture</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Bank-level encryption and strict isolation for every tenant</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">AES-256 & TLS 1.3 Encryption</h4>
                      <p className="text-xs text-slate-500 mt-1">All payloads are encrypted before reaching persistent storage layers.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Role-Based Access Control (RBAC)</h4>
                      <p className="text-xs text-slate-500 mt-1">Granular IAM policies, SAML 2.0 / SSO, and detailed activity trails.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Isolated Private VPC Deployment</h4>
                      <p className="text-xs text-slate-500 mt-1">Available on AWS, GCP, Azure, or on-premise Kubernetes clusters.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">GDPR, HIPAA & SOC2 Compliant</h4>
                      <p className="text-xs text-slate-500 mt-1">Annual third-party penetration testing and continuous vulnerability audits.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Bar CTA */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Ready to see this inside your existing tech stack?
            </span>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500"
            >
              <span>Schedule live personalized walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
