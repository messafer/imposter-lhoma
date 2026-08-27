import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export default function FAQ({ onOpenContact }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How quickly can our engineering team get started with Lhoma?',
      a: 'Most teams integrate Lhoma in less than 15 minutes. We provide pre-built SDKs for Node.js, Python, and Go, plus 500+ one-click native connectors for tools like Slack, GitHub, Postgres, and Salesforce.'
    },
    {
      q: 'How does Lhoma guarantee the reliability of autonomous multi-agent loops?',
      a: 'Lhoma utilizes a deterministic self-correcting feedback loop. Each agent action is validated against strict JSON schema guards and configurable policy rules. If an execution fails or encounters ambiguity, our fallback orchestrator immediately retries or alerts your human operators based on your preferences.'
    },
    {
      q: 'Can Lhoma be deployed inside our own private cloud or VPC?',
      a: 'Yes. Enterprise tier customers can deploy Lhoma completely within their private AWS, Google Cloud, Azure VPC, or on-premise Kubernetes clusters, ensuring zero telemetry or customer data leaves your boundaries.'
    },
    {
      q: 'How are workflow executions billed?',
      a: 'Each plan includes a generous quota of monthly workflow runs. There are no sudden overage penalties; if you approach your limit, you receive proactive alerts and can adjust thresholds with one click.'
    },
    {
      q: 'Is our sensitive company data used to train public AI models?',
      a: 'Never. We have strict zero-data-retention agreements and enterprise zero-training policies in place. Your data remains 100% private, segregated, and fully protected under SOC-2 Type II and GDPR standards.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Everything you need to know about getting started, architecture, and security.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-600 dark:text-brand-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Fallback Support CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Still have questions?</h4>
              <p className="text-xs text-slate-500">Our solution engineering team is available 24/7 to help.</p>
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-semibold shrink-0 transition-colors"
          >
            Chat with an Engineer
          </button>
        </div>

      </div>
    </section>
  );
}
