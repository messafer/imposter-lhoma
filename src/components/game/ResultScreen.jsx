import React, { useState, useEffect } from 'react';
import { Trophy, ShieldAlert, CheckCircle2, XCircle, RotateCcw, Play, Sparkles, HelpCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ResultScreen({ 
  gameState, 
  votes, 
  onNextRound, 
  onResetGame 
}) {
  const [impostorGuessedCorrect, setImpostorGuessedCorrect] = useState(null);
  const [guessInput, setGuessInput] = useState('');
  const [showGuessModal, setShowGuessModal] = useState(false);

  // Calculate most voted player
  const voteCounts = {};
  gameState.players.forEach(p => { voteCounts[p.id] = 0; });
  Object.values(votes).forEach(targetId => {
    if (voteCounts[targetId] !== undefined) {
      voteCounts[targetId] += 1;
    }
  });

  let maxVotes = -1;
  let eliminatedPlayerId = null;
  let isTie = false;

  Object.entries(voteCounts).forEach(([pId, count]) => {
    if (count > maxVotes) {
      maxVotes = count;
      eliminatedPlayerId = pId;
      isTie = false;
    } else if (count === maxVotes && count > 0) {
      isTie = true;
    }
  });

  const eliminatedPlayer = gameState.players.find(p => String(p.id) === String(eliminatedPlayerId));
  const wasImpostorEliminated = eliminatedPlayer && gameState.impostorIds.includes(eliminatedPlayer.id);

  // Determine winner
  const impostorWon = !wasImpostorEliminated || impostorGuessedCorrect === true;

  useEffect(() => {
    sounds.playWin();
  }, []);

  const handleImpostorGuess = (e) => {
    e.preventDefault();
    const correct = guessInput.trim().toLowerCase() === gameState.secretWord.toLowerCase();
    setImpostorGuessedCorrect(correct);
    if (correct) {
      sounds.playWin();
    } else {
      sounds.playBuzzer();
    }
    setShowGuessModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 text-center space-y-8 animate-fadeIn">
      
      {/* Victory Banner */}
      <div className={`p-8 rounded-3xl border-2 shadow-2xl relative overflow-hidden ${
        impostorWon
          ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-rose-500/25'
          : 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-emerald-500/25'
      }`}>
        <div className="text-6xl mb-3 animate-bounce">
          {impostorWon ? '🕵️' : '🛡️'}
        </div>
        <span className="text-xs font-bold tracking-widest uppercase opacity-80">
          Round Outcome
        </span>
        <h2 className="text-3xl sm:text-5xl font-black mt-1">
          {impostorWon ? 'IMPOSTORS WIN!' : 'CIVILIANS WIN!'}
        </h2>
        <p className="text-xs sm:text-sm opacity-90 mt-2 max-w-md mx-auto">
          {impostorWon
            ? (impostorGuessedCorrect
                ? 'The Impostor was caught but correctly guessed the secret word to steal the win!'
                : 'The Impostor successfully tricked the group and avoided detection!')
            : 'The group successfully identified and voted out the Impostor!'}
        </p>
      </div>

      {/* Secret Word Reveal Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Category: {gameState.categoryName}
        </span>
        <div className="my-3">
          <h3 className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 uppercase tracking-wide">
            Secret Word: "{gameState.secretWord}"
          </h3>
          {gameState.undercoverMode && (
            <p className="text-xs text-indigo-500 font-bold mt-1">
              Undercover Twin Word: "{gameState.undercoverWord}"
            </p>
          )}
        </div>
      </div>

      {/* Impostor Redemption Button (If Impostor was caught and haven't guessed yet) */}
      {wasImpostorEliminated && impostorGuessedCorrect === null && (
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
          <h4 className="font-bold text-sm">🕵️ Impostor Final Chance!</h4>
          <p className="text-xs opacity-90 mt-1 mb-4">
            {eliminatedPlayer.name}, can you guess the Civilians' secret word to steal victory?
          </p>
          <button
            onClick={() => setShowGuessModal(true)}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all"
          >
            Attempt Word Guess
          </button>
        </div>
      )}

      {/* All Players Identity Reveal Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          All Players & True Roles
        </h3>

        <div className="space-y-2.5">
          {gameState.players.map((p) => {
            const isImp = gameState.impostorIds.includes(p.id);
            const votesReceived = voteCounts[p.id] || 0;
            return (
              <div
                key={p.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isImp 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200' 
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.avatar}</span>
                  <div>
                    <span className="text-sm font-bold block">{p.name}</span>
                    <span className="text-[11px] opacity-75 font-semibold">
                      {isImp ? '🕵️ IMPOSTOR' : '🛡️ Civilian'} • {votesReceived} {votesReceived === 1 ? 'vote' : 'votes'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold">
                    Score: {p.score || 0} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={onResetGame}
          className="flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Change Players & Settings</span>
        </button>

        <button
          onClick={() => {
            sounds.playWin();
            onNextRound();
          }}
          className="flex-1 py-3.5 px-4 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Play Next Round (Same Players)</span>
        </button>
      </div>

      {/* Impostor Guess Modal */}
      {showGuessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Guess the Secret Word
            </h3>
            <p className="text-xs text-slate-500">
              Category was: <strong>{gameState.categoryName}</strong>. Type the word you think the Civilians were describing.
            </p>
            <form onSubmit={handleImpostorGuess} className="space-y-3">
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. Pizza, Coffee, Spider-Man..."
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGuessModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Give Up
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md"
                >
                  Submit Guess
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
