import React, { useState } from 'react';
import { Check, Sparkles, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Pricing({ onOpenContact }) {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for early-stage startups and small engineering teams.',
      priceMonthly: 29,
      priceAnnual: 24,
      features: [
        'Up to 5 Autonomous AI Agents',
        '100,000 monthly workflow runs',
        'Standard REST & Webhook APIs',
        'Community & Email Support',
        '7-day operational logs history',
        '99.9% uptime SLA'
      ],
      popular: false,
      cta: 'Start Free 14-Day Trial',
      buttonVariant: 'outline'
    },
    {
      name: 'Professional',
      description: 'For scaling companies needing advanced reasoning and integrations.',
      priceMonthly: 99,
      priceAnnual: 79,
      features: [
        'Unlimited Autonomous Agents',
        '1,000,000 monthly workflow runs',
        'Full SDK access (Node, Python, Go)',
        'Native 500+ ecosystem connectors',
        '30-day operational logs & telemetry',
        'Priority 24/7 Slack & Email support',
        'Custom multi-agent workflows',
        'Multi-tenant RBAC permissions'
      ],
      popular: true,
      cta: 'Get Started with Pro',
      buttonVariant: 'primary'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations demanding dedicated VPC, custom SLAs, and custom LLM tuning.',
      priceMonthly: 399,
      priceAnnual: 319,
      features: [
        'Custom execution volume & dedicated GPUs',
        'Self-hosted VPC or on-prem deployment',
        'Custom domain-specific fine-tuning',
        'Dedicated Solutions Architect',
        '99.99% Uptime Guarantee SLA',
        'SOC-2, HIPAA & ISO-27001 compliance',
        'Custom invoicing & MSA contract',
        'Unlimited team seats & SAML SSO'
      ],
      popular: false,
      cta: 'Contact Enterprise Sales',
      buttonVariant: 'outline'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Predictable Plans for Every Stage
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            No hidden execution fees or surprise overages. Scale as you grow.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                !annual 
                  ? 'bg-slate-900 text-white dark:bg-brand-600 shadow' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                annual 
                  ? 'bg-brand-600 text-white shadow' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white uppercase tracking-wider">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-white dark:bg-slate-900 border-2 border-brand-500 shadow-2xl shadow-brand-500/15 lg:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                        ${price}
                      </span>
                      <span className="text-slate-500 text-sm font-medium">/ month</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {annual ? 'Billed annually ($' + (price * 12) + '/yr)' : 'Billed on a monthly rolling cycle'}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Features</span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onOpenContact}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 active:scale-95'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white active:scale-95'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>All plans include 14-day free trial, no lock-in, and 30-day money-back guarantee.</span>
        </div>

      </div>
    </section>
  );
}
