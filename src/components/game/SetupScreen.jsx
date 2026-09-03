import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Clock, 
  EyeOff, 
  Plus, 
  Shuffle, 
  Play,
  Check
} from 'lucide-react';
import { CATEGORIES, AVATARS } from '../../data/words';
import { sounds } from '../../utils/audio';

export default function SetupScreen({ 
  players, 
  setPlayers, 
  impostorCount, 
  setImpostorCount, 
  selectedCategories, 
  setSelectedCategories,
  undercoverMode, 
  setUndercoverMode, 
  timerSeconds, 
  setTimerSeconds, 
  onStartGame, 
  onOpenHowToPlay,
  soundMuted,
  setSoundMuted,
  onAddCustomWord
}) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [customWordModal, setCustomWordModal] = useState(false);
  const [customWord, setCustomWord] = useState('');
  const [customUndercover, setCustomUndercover] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const handleAddPlayer = (e) => {
    e?.preventDefault();
    const trimmed = newPlayerName.trim();
    if (!trimmed) return;
    if (players.length >= 20) {
      alert('Maximum 20 players reached!');
      return;
    }
    
    // Pick random avatar
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    const newPlayer = {
      id: Date.now() + Math.random(),
      name: trimmed,
      avatar: randomAvatar,
      score: 0
    };
    
    sounds.playClick();
    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (id) => {
    sounds.playClick();
    if (players.length <= 3) {
      alert('You need at least 3 players to play Impostor!');
      return;
    }
    const updated = players.filter(p => p.id !== id);
    setPlayers(updated);
    if (impostorCount > Math.floor(updated.length / 2)) {
      setImpostorCount(Math.max(1, Math.floor(updated.length / 2)));
    }
  };

  const toggleCategory = (catId) => {
    sounds.playClick();
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length === 1) return; // Keep at least one
      setSelectedCategories(selectedCategories.filter(id => id !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const selectAllCategories = () => {
    sounds.playClick();
    setSelectedCategories(CATEGORIES.map(c => c.id));
  };

  const handleSaveCustomWord = (e) => {
    e.preventDefault();
    if (!customWord.trim()) return;
    onAddCustomWord({
      word: customWord.trim(),
      undercover: customUndercover.trim() || customWord.trim(),
      hint: customCategory.trim() || 'Custom Word'
    });
    sounds.playWin();
    setCustomWordModal(false);
    setCustomWord('');
    setCustomUndercover('');
    setCustomCategory('');
  };

  const maxImpostors = Math.max(1, Math.floor((players.length - 1) / 2));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/25 animate-pulse">
            🕵️
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              IMPOSTER
            </h1>
          </div>
        </div>

        {/* Top Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !soundMuted;
              setSoundMuted(next);
              sounds.setMuted(next);
            }}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
            aria-label="Toggle Sound"
          >
            {soundMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>

          <button
            onClick={onOpenHowToPlay}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span className="hidden sm:inline">How To Play</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left Column: Player Management (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Players ({players.length})
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Min 3 • Max 20
              </span>
            </div>

            {/* Add Player Input */}
            <form onSubmit={handleAddPlayer} className="flex gap-2 mb-6">
              <input
                type="text"
                maxLength={20}
                placeholder="Enter player name (e.g. Alex, Sam)..."
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-purple-500/20 flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>

            {/* Players List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 group hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white block truncate max-w-[120px]">
                        {player.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Player {index + 1}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 opacity-80 group-hover:opacity-100 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Remove Player"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Word Category Selector */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Word Categories</h3>
                <p className="text-xs text-slate-500">Pick which topics will be used for secret words</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={selectAllCategories}
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  onClick={() => setCustomWordModal(true)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Custom Word</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-purple-500/10 border-purple-500/50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 opacity-60'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold block truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-75">{cat.words.length} pairs</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-purple-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Game Settings & Start (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Game Rules & Options
            </h3>

            {/* Impostors Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Number of Impostors
                </label>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {impostorCount} {impostorCount === 1 ? 'Impostor' : 'Impostors'}
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    disabled={num > maxImpostors}
                    onClick={() => {
                      sounds.playClick();
                      setImpostorCount(num);
                    }}
                    className={`flex-1 min-w-[45px] py-2.5 rounded-xl font-bold text-xs transition-all ${
                      impostorCount === num
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-20'
                    }`}
                  >
                    {num} 🕵️
                  </button>
                ))}
              </div>
            </div>

            {/* Undercover Mode Switch */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <EyeOff className="w-4 h-4 text-indigo-500" />
                    <span>Undercover Mode</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 max-w-[200px]">
                    Impostor receives a secret twin word (e.g. Pizza vs Burger) instead of knowing they are the impostor!
                  </p>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setUndercoverMode(!undercoverMode);
                  }}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    undercoverMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      undercoverMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Discussion Timer setting */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span>Discussion Timer</span>
                </label>
                <span className="text-xs font-semibold text-slate-500">
                  {timerSeconds === 0 ? 'No Limit' : `${timerSeconds}s`}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '60s', val: 60 },
                  { label: '90s', val: 90 },
                  { label: '120s', val: 120 },
                  { label: 'Off', val: 0 }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      sounds.playClick();
                      setTimerSeconds(item.val);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      timerSeconds === item.val
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Start Game Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sounds.playWin();
                  onStartGame();
                }}
                disabled={players.length < 3}
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>START GAME ({players.length} PLAYERS)</span>
              </button>
              {players.length < 3 && (
                <p className="text-[11px] text-rose-500 text-center mt-2 font-semibold">
                  Add at least 3 players to start playing.
                </p>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Custom Word Modal */}
      {customWordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Add Your Own Custom Secret Word
            </h3>
            <p className="text-xs text-slate-500">
              Create an inside joke or custom challenge for your group of friends!
            </p>
            <form onSubmit={handleSaveCustomWord} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Secret Word for Civilians *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eiffel Tower"
                  value={customWord}
                  onChange={(e) => setCustomWord(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Undercover Impostor Word (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Statue of Liberty"
                  value={customUndercover}
                  onChange={(e) => setCustomUndercover(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Category / Hint</label>
                <input
                  type="text"
                  placeholder="e.g. Famous Monuments"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setCustomWordModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md"
                >
                  Save Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
