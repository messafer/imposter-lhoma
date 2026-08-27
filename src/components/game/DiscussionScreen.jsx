import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Volume2, ShieldAlert, Users, ArrowRight, Sparkles, Plus } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DiscussionScreen({ 
  gameState, 
  onStartVoting 
}) {
  const [timeLeft, setTimeLeft] = useState(gameState.timerSeconds || 90);
  const [isRunning, setIsRunning] = useState(gameState.timerSeconds > 0);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          sounds.playBuzzer();
          setIsRunning(false);
          return 0;
        }
        if (prev <= 10) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    sounds.playClick();
    setIsRunning(!isRunning);
  };

  const addExtraTime = (seconds) => {
    sounds.playClick();
    setTimeLeft((prev) => prev + seconds);
    setIsRunning(true);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startingPlayer = gameState.players[gameState.startingPlayerIndex || 0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 text-center space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Category: {gameState.categoryName}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Discussion & Clue Phase
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Each player gives a 1-word or short clue about the secret word in turn order.
        </p>
      </div>

      {/* Starting Player Announcement Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900 border border-purple-500/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-5xl animate-bounce">{startingPlayer.avatar}</span>
          <div className="text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-widest text-purple-400 font-extrabold block">
              🎲 First Clue Given By:
            </span>
            <h3 className="text-2xl font-black text-white">
              {startingPlayer.name}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Followed by the next player clockwise!
            </p>
          </div>
        </div>
      </div>

      {/* Discussion Timer Widget */}
      {gameState.timerSeconds > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-purple-500" />
              <span>Discussion Countdown</span>
            </span>
            <span>{timeLeft === 0 ? 'Time Expired!' : isRunning ? 'Running' : 'Paused'}</span>
          </div>

          {/* Big Time Display */}
          <div className={`text-5xl sm:text-6xl font-black tracking-tight my-4 font-mono transition-colors ${
            timeLeft <= 10 && timeLeft > 0 
              ? 'text-rose-500 animate-pulse' 
              : timeLeft === 0 
                ? 'text-rose-600' 
                : 'text-slate-900 dark:text-white'
          }`}>
            {formatTime(timeLeft)}
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={toggleTimer}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-all flex items-center gap-1.5"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => addExtraTime(30)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+30s</span>
            </button>
          </div>
        </div>
      )}

      {/* Turn Order List */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-500" />
            <span>Player Turn Order</span>
          </span>
          <span className="text-[11px] text-slate-400 font-semibold">1 clue per person</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {gameState.players.map((p, i) => (
            <div
              key={p.id}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                i === (gameState.startingPlayerIndex || 0)
                  ? 'bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/30'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{p.avatar}</span>
              <span>{p.name}</span>
              {i === (gameState.startingPlayerIndex || 0) && (
                <span className="text-[9px] bg-purple-500 text-white px-1.5 py-0.5 rounded-full uppercase">1st</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action to proceed to voting */}
      <div className="pt-4">
        <button
          onClick={() => {
            sounds.playVote();
            onStartVoting();
          }}
          className="w-full py-4 px-6 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
        >
          <span>PROCEED TO ACCUSATIONS & VOTING</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
