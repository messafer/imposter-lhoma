import React, { useState } from 'react';
import { Users, ShieldAlert, ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function VotingScreen({ 
  gameState, 
  onConfirmVotes 
}) {
  // Map of voterId -> suspectId
  const [votes, setVotes] = useState({});
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);

  const currentVoter = gameState.players[currentVoterIndex];

  const handleVote = (suspectId) => {
    sounds.playVote();
    const updated = { ...votes, [currentVoter.id]: suspectId };
    setVotes(updated);

    if (currentVoterIndex + 1 < gameState.players.length) {
      setCurrentVoterIndex(currentVoterIndex + 1);
    }
  };

  const handleFinishVoting = () => {
    sounds.playBuzzer();
    onConfirmVotes(votes);
  };

  // Count tally
  const voteCounts = {};
  gameState.players.forEach(p => { voteCounts[p.id] = 0; });
  Object.values(votes).forEach(targetId => {
    if (voteCounts[targetId] !== undefined) {
      voteCounts[targetId] += 1;
    }
  });

  const allVotesCast = Object.keys(votes).length === gameState.players.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 text-center space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Accusation Phase</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Who Is The Impostor?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Pass the device around or have everyone vote on who they suspect is bluffing.
        </p>
      </div>

      {/* Current Voter Prompt */}
      {!allVotesCast ? (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-500/40 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl animate-bounce">{currentVoter.avatar}</span>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-purple-500 block">Voting Step ({currentVoterIndex + 1}/{gameState.players.length})</span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                <span className="text-purple-600 dark:text-purple-400">{currentVoter.name}</span>, who do you suspect?
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Tap a player card below to cast your secret vote.
          </p>

          {/* Player suspects grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gameState.players.map((suspect) => {
              const isSelf = suspect.id === currentVoter.id;
              return (
                <button
                  key={suspect.id}
                  disabled={isSelf}
                  onClick={() => handleVote(suspect.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                    isSelf
                      ? 'opacity-30 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 cursor-not-allowed'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-purple-500 hover:scale-105 shadow-sm active:scale-95'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{suspect.avatar}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      Vote
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block truncate">
                    {suspect.name} {isSelf && '(You)'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* All Votes Cast Summary */
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">
            <Check className="w-4 h-4" />
            <span>All {gameState.players.length} Votes Locked In</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gameState.players.map((p) => {
              const count = voteCounts[p.id] || 0;
              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between ${
                    count > 0 
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-200' 
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{p.avatar}</span>
                    <span className="text-sm font-bold truncate max-w-[90px]">{p.name}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-500 text-white">
                    {count} {count === 1 ? 'vote' : 'votes'}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleFinishVoting}
            className="w-full py-4 px-6 rounded-2xl font-black text-base text-white bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>REVEAL ELIMINATED PLAYER & TRUTH!</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quick skip or manual group consensus */}
      {!allVotesCast && (
        <div className="pt-2">
          <button
            onClick={() => {
              // Automatically populate remaining with first suspect or skip
              const dummyVotes = {};
              gameState.players.forEach((p, idx) => {
                const suspect = gameState.players[(idx + 1) % gameState.players.length];
                dummyVotes[p.id] = suspect.id;
              });
              setVotes(dummyVotes);
            }}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
          >
            Skip secret voting and reveal directly
          </button>
        </div>
      )}

    </div>
  );
}
