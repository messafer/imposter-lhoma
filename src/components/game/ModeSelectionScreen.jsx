import React from 'react';
import { Smartphone, Users, Sparkles, HelpCircle, Volume2, VolumeX, ArrowRight, QrCode, RotateCcw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ModeSelectionScreen({
  onSelectMode,
  onOpenHowToPlay,
  soundMuted,
  setSoundMuted
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center space-y-10 animate-fadeIn">
      
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 flex items-center justify-center text-4xl mx-auto shadow-2xl shadow-purple-500/30 animate-pulse">
          🕵️
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algerian Edition • 3-20 Players</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            IMPOSTER
          </h1>
          
        
        </div>
      </div>

      {/* 2 Big Play Mode Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
        
        {/* Choice 1: Multi-Phone Room (Everyone on their own phone) */}
        <div 
          onClick={() => {
            sounds.playWin();
            onSelectMode('multiplayer');
          }}
          className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-purple-950/40 border-2 border-purple-500/40 hover:border-purple-400 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between text-left group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📱
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                الأكثر متعة 🔥
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-purple-300 transition-colors">
              everyone uses their phone
            </h2>
            <span className="text-xs font-bold text-purple-400 block mt-1">
              Multi-Phone Room (3 - 20 Players)
            </span>

            <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed">
              كل لاعب يدخل بكود الغرفة أو يمسح الـ <strong>QR Code</strong> بهاتفه الخاص. كل شخص يشوف كلمته السرية ويصوت سراً في شاشة هاتفه!
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white group-hover:underline">
              افتح غرفة جماعية
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Choice 2: Single Device Pass-and-Play */}
        <div 
          onClick={() => {
            sounds.playWin();
            onSelectMode('pass_and_play');
          }}
          className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 border-2 border-slate-800 hover:border-indigo-400/80 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between text-left group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🔄
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                telephone wa7d📱
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-indigo-300 transition-colors">
              use only one phone
            </h2>
            <span className="text-xs font-bold text-indigo-400 block mt-1">
              Pass & Play (3 - 20 Players)
            </span>

            <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed">
              هاتف واحد يمرر بين جميع اللاعبين. كل شخص يضغط ضغطة مطولة لرؤية دوره السري ثم يمرر الهاتف للشخص التالي.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white group-hover:underline">
              ابدأ بهاتف واحد
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={() => {
            const next = !soundMuted;
            setSoundMuted(next);
            sounds.setMuted(next);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors shadow-sm"
        >
          {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          <span>{soundMuted ? 'الصوت: معطل' : 'الصوت: مفعل'}</span>
        </button>

        <button
          onClick={onOpenHowToPlay}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>كيفية اللعب والقوانين</span>
        </button>
      </div>

    </div>
  );
}
