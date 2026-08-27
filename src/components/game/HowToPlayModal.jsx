import React from 'react';
import { X, Sparkles, Shield, UserX, Lightbulb, Clock, CheckCircle2 } from 'lucide-react';

export default function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Game Guide</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          How to Play LHOMA Impostor
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          A party bluffing game of secret words, deduction, and deception!
        </p>

        {/* Steps List */}
        <div className="space-y-4 text-left">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Secret Role Distribution</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                Pass the phone around. Each player holds down the card to see their secret identity. <strong>Civilians</strong> see the secret word (e.g. "Pizza"), while the <strong>Impostor</strong> only knows the category or a slightly different undercover word!
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Give Subtle Clues</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                In clockwise turn order, each player says a <strong>1-word or short clue</strong> about the secret word. Don't be too obvious (or the Impostor will guess it), but don't be too vague (or people will suspect you!).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Discussion & Voting</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                Discuss who gave suspicious or hesitant clues. Then vote on who you believe is the Impostor!
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Impostor Redemption Guess</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                Even if the Impostor is voted out, they get <strong>one final chance</strong> to guess the Civilians' secret word. If they guess correctly, the Impostor steals the win!
              </p>
            </div>
          </div>

        </div>

        {/* Strategy Pro-Tips */}
        <div className="mt-6 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-left">
          <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>Pro Tips for Impostors</span>
          </h4>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
            <li>Listen carefully to the first 2 players' clues to deduce the theme.</li>
            <li>Give generic, versatile clues (e.g. "popular", "delicious", "expensive").</li>
            <li>Act confident and accuse someone else who gave an ambiguous clue!</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 px-4 rounded-2xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-md transition-all"
        >
          Got It, Let's Play!
        </button>

      </div>
    </div>
  );
}
