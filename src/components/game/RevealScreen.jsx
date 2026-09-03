import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, Sparkles, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RevealScreen({ 
  gameState, 
  currentPlayerIndex, 
  onNextPlayer, 
  onFinishReveal 
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasRevealedOnce, setHasRevealedOnce] = useState(false);

  const player = gameState.players[currentPlayerIndex];
  const isImpostor = gameState.impostorIds.includes(player.id);
  const isUndercover = gameState.undercoverMode && isImpostor;

  const handleTouchStart = () => {
    setIsRevealed(true);
    setHasRevealedOnce(true);
    if (isImpostor) {
      sounds.playImpostorReveal();
    } else {
      sounds.playReveal();
    }
  };

  const handleTouchEnd = () => {
    setIsRevealed(false);
  };

  const handleNext = () => {
    sounds.playClick();
    setIsRevealed(false);
    setHasRevealedOnce(false);
    if (currentPlayerIndex + 1 < gameState.players.length) {
      onNextPlayer();
    } else {
      onFinishReveal();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-between min-h-[80vh] text-center">
      
      {/* Top Header & Progress */}
      <div className="w-full">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
          <span>Secret Role Assignment</span>
          <span>Player {currentPlayerIndex + 1} of {gameState.players.length}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentPlayerIndex + 1) / gameState.players.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Center Pass-and-Hold Card */}
      <div className="w-full my-8">
        
        {/* Pass device instructions */}
        <div className="mb-6">
          <span className="text-5xl inline-block mb-3 animate-bounce">{player.avatar}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Pass device to <span className="text-purple-600 dark:text-purple-400">{player.name}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Make sure other players cannot see your screen!
          </p>
        </div>

        {/* Secret Card Window */}
        <div className="relative">
          {isRevealed ? (
            /* REVEALED CONTENT */
            <div className={`p-8 rounded-3xl shadow-2xl border-2 transition-all duration-200 animate-fadeIn ${
              isImpostor && !isUndercover
                ? 'bg-rose-950/90 border-rose-500 text-rose-100 shadow-rose-500/30'
                : isUndercover
                  ? 'bg-indigo-950/90 border-indigo-500 text-indigo-100 shadow-indigo-500/30'
                  : 'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-emerald-500/30'
            }`}>
              {isImpostor && !isUndercover ? (
                /* Classic Impostor */
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center text-3xl">
                    🕵️
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-rose-400">Secret Identity</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">
                      YOU ARE THE IMPOSTOR!
                    </h3>
                    {gameState.hint && (
  <div className="mt-4 p-4 rounded-2xl bg-black/30 border border-yellow-500/30 text-center">
    <p className="text-sm font-bold text-yellow-300">
      💡 HINT
    </p>
    <p className="mt-1 text-base text-white">
      {gameState.hint}
    </p>
  </div>
)}
                    
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 text-xs text-rose-200/90 leading-relaxed">
                    <p className="font-bold mb-1">Category: {gameState.categoryName}</p>
                    <p>You don't know the exact secret word! Listen carefully to other players' clues and pretend you know it.</p>
                  </div>
                </div>
                
              ) : isUndercover ? (
                /* Undercover Mode */
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center text-3xl">
                    🤫
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">Category: {gameState.categoryName}</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white mt-1 uppercase tracking-wider">
                      {gameState.undercoverWord}
                    </h3>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-indigo-500/30 text-xs text-indigo-200/90">
                    <p>You are the Undercover agent! Your word is slightly different. Blend in and don't get caught!</p>
                  </div>
                </div>
              ) : (
                /* Civilian */
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-3xl">
                    🛡️
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">Category: {gameState.categoryName}</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white mt-1 uppercase tracking-wider">
                      {gameState.secretWord}
                    </h3>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/30 text-xs text-emerald-200/90">
                    <p>You are a Civilian! Give subtle clues related to this word without revealing it to the impostor.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* HIDDEN CARD */
            <div 
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="p-10 rounded-3xl bg-slate-900 border-2 border-slate-700 text-white shadow-xl cursor-pointer select-none hover:border-purple-500/60 transition-all flex flex-col items-center justify-center min-h-[260px] group active:scale-95"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8" />
              </div>
              <span className="text-base font-extrabold tracking-wide uppercase">
                HOLD TO REVEAL WORD
              </span>
              <span className="text-xs text-slate-400 mt-2">
                Press and hold finger or mouse here
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Action Button */}
      <div className="w-full pt-4">
        <button
          onClick={handleNext}
          disabled={!hasRevealedOnce}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2 ${
            hasRevealedOnce
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30'
              : 'bg-slate-700 opacity-50 cursor-not-allowed'
          }`}
        >
          <span>
            {currentPlayerIndex + 1 < gameState.players.length 
              ? 'I Have Memorized It → Next Player' 
              : 'All Players Ready → Start Discussion!'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
        {!hasRevealedOnce && (
          <p className="text-[11px] text-slate-500 text-center mt-2">
            Hold down the card above to see your word before continuing.
          </p>
        )}
      </div>

    </div>
  );
}
