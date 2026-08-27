import { useState, useEffect } from 'react';

import { 
  Lock, 
  Check, 
  ArrowRight} from 'lucide-react';
import { sounds } from '../../utils/audio';
import { CATEGORIES } from '../../data/words';

export default function OnlineGameRoom({
  socket,
  onLeaveRoom
}) {
  const [room, setRoom] = useState(null);
  const [phase, setPhase] = useState('role_reveal'); // role_reveal | discussion | voting | results
  const [myRole, setMyRole] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerRunning, setTimerRunning] = useState(true);
  const [myVote, setMyVote] = useState(null);
  const [voteProgress, setVoteProgress] = useState({ votedCount: 0, totalPlayers: 0 });
  const [roundResults, setRoundResults] = useState(null);
  const [impostorGuessInput, setImpostorGuessInput] = useState('');
  const [impostorGuessModal, setImpostorGuessModal] = useState(false);
  const [guessResult, setGuessResult] = useState(null);

  // Setup socket event listeners for real-time multiplayer
  useEffect(() => {
    if (!socket) return;

    socket.on('your_secret_role', (roleData) => {
      setMyRole(roleData);
      setRevealed(false);
      setMyVote(null);
      setRoundResults(null);
      setGuessResult(null);
      setPhase('role_reveal');
      if (roleData.isImpostor) {
        sounds.playImpostorReveal();
      } else {
        sounds.playReveal();
      }
    });

    socket.on('discussion_started', ({ room: updatedRoom }) => {
      setRoom(updatedRoom);
      setPhase('discussion');
      setTimeLeft(updatedRoom.settings?.timerSeconds || 90);
      setTimerRunning(true);
      sounds.playVote();
    });

    socket.on('voting_started', ({ room: updatedRoom }) => {
      setRoom(updatedRoom);
      setPhase('voting');
      setMyVote(null);
      setVoteProgress({ votedCount: 0, totalPlayers: updatedRoom.players.length });
      sounds.playVote();
    });

    socket.on('vote_progress', (data) => {
      setVoteProgress(data);
    });

    socket.on('round_results', (results) => {
      setRoundResults(results);
      setRoom(results.room);
      setPhase('results');
      sounds.playWin();
    });

    socket.on('impostor_guess_result', (data) => {
      setGuessResult(data);
      setRoom(data.room);
      if (data.correct) {
        sounds.playWin();
      } else {
        sounds.playBuzzer();
      }
    });

    return () => {
      socket.off('your_secret_role');
      socket.off('discussion_started');
      socket.off('voting_started');
      socket.off('vote_progress');
      socket.off('round_results');
      socket.off('impostor_guess_result');
    };
  }, [socket]);

  // Discussion countdown timer
  useEffect(() => {
    if (phase !== 'discussion' || !timerRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          sounds.playBuzzer();
          setTimerRunning(false);
          return 0;
        }
        if (prev <= 10) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, timerRunning, timeLeft]);

  const isHost = room?.players.find(p => p.id === socket?.id)?.isHost;

  const handleHostStartDiscussion = () => {
    sounds.playClick();
    socket.emit('start_discussion', { roomCode: room.code });
  };

  const handleHostStartVoting = () => {
    sounds.playClick();
    socket.emit('start_voting', { roomCode: room.code });
  };

  const handleCastVote = (suspectId) => {
    sounds.playVote();
    setMyVote(suspectId);
    socket.emit('cast_vote', {
      roomCode: room.code,
      suspectId
    });
  };

  const handleHostFinishVotingEarly = () => {
    sounds.playClick();
    socket.emit('finish_voting_early', { roomCode: room.code });
  };

  const handleImpostorGuessSubmit = (e) => {
    e.preventDefault();
    if (!impostorGuessInput.trim()) return;
    socket.emit('impostor_guess', {
      roomCode: room.code,
      guessWord: impostorGuessInput.trim()
    });
    setImpostorGuessModal(false);
  };

  const handleNextRound = () => {
    sounds.playClick();
    let candidatePool = [];
    CATEGORIES.forEach((cat) => {
      if (room.settings.selectedCategories.includes(cat.id)) {
        cat.words.forEach((w) => {
          candidatePool.push({ ...w, categoryName: cat.name });
        });
      }
    });
    if (candidatePool.length === 0) {
      candidatePool = CATEGORIES[0].words.map(w => ({ ...w, categoryName: CATEGORIES[0].name }));
    }
    const selectedWordItem = candidatePool[Math.floor(Math.random() * candidatePool.length)];

    socket.emit('start_game', {
      roomCode: room.code,
      wordItem: selectedWordItem
    });
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 min-h-[85vh] flex flex-col justify-between text-center">
      
      {/* Top Status Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono font-bold text-purple-400">Room: {room?.code}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-semibold">{room?.players.length} Players Connected</span>
          <button
            onClick={onLeaveRoom}
            className="text-xs text-rose-400 hover:underline"
          >
            Leave
          </button>
        </div>
      </div>

      {/* PHASE 1: ROLE REVEAL ON INDIVIDUAL PHONE */}
      {phase === 'role_reveal' && myRole && (
        <div className="my-auto space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Private Phone Screen
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Your Secret Identity
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Keep your screen hidden from nearby players!
            </p>
          </div>

          {/* Secret Card */}
          <div className="w-full max-w-sm mx-auto">
            {revealed ? (
              <div className={`p-8 rounded-3xl border-2 shadow-2xl transition-all animate-fadeIn ${
                myRole.isImpostor && !myRole.undercoverMode
                  ? 'bg-rose-950/90 border-rose-500 text-rose-100 shadow-rose-500/30'
                  : myRole.isImpostor && myRole.undercoverMode
                    ? 'bg-indigo-950/90 border-indigo-500 text-indigo-100 shadow-indigo-500/30'
                    : 'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-emerald-500/30'
              }`}>
                {myRole.isImpostor && !myRole.undercoverMode ? (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center text-3xl">
                      🕵️
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Category: {myRole.categoryName}</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-rose-400">
                      YOU ARE THE IMPOSTOR!
                    </h3>
                    <p className="text-xs text-rose-200/90 pt-2 border-t border-rose-500/30">
                      You don't know the exact word! Listen to other players' clues and pretend you know it.
                    </p>
                  </div>
                ) : myRole.isImpostor && myRole.undercoverMode ? (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center text-3xl">
                      🤫
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Category: {myRole.categoryName}</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white uppercase">
                      "{myRole.secretWord}"
                    </h3>
                    <p className="text-xs text-indigo-200/90 pt-2 border-t border-indigo-500/30">
                      You are Undercover! Your word is slightly different. Blend in!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-3xl">
                      🛡️
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Category: {myRole.categoryName}</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white uppercase">
                      "{myRole.secretWord}"
                    </h3>
                    <p className="text-xs text-emerald-200/90 pt-2 border-t border-emerald-500/30">
                      You are a Civilian! Give clues without revealing the word to the impostor.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => {
                  sounds.playClick();
                  setRevealed(true);
                }}
                className="p-10 rounded-3xl bg-slate-900 border-2 border-slate-700 text-white shadow-xl cursor-pointer hover:border-purple-500 transition-all flex flex-col items-center justify-center min-h-[220px]"
              >
                <Lock className="w-8 h-8 text-purple-400 mb-3" />
                <span className="text-sm font-extrabold tracking-wider uppercase">TAP TO REVEAL WORD</span>
                <span className="text-xs text-slate-500 mt-1">Keep screen private</span>
              </div>
            )}
          </div>

          {/* If Host: Start discussion button */}
          {isHost ? (
            <div className="pt-4">
              <button
                onClick={handleHostStartDiscussion}
                className="w-full py-4 px-6 rounded-2xl font-black text-base text-white bg-gradient-to-r from-purple-600 via-rose-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all"
              >
                START DISCUSSION PHASE FOR ALL PHONES →
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-400 pt-2">
              Waiting for Host to start the discussion timer...
            </p>
          )}
        </div>
      )}

      {/* PHASE 2: DISCUSSION PHASE */}
      {phase === 'discussion' && (
        <div className="my-auto space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Category: {myRole?.categoryName || 'General'}
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              Give Clues & Discuss
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Each player says 1 clue aloud in turn order!
            </p>
          </div>

          {/* First player banner */}
          <div className="p-4 rounded-2xl bg-purple-900/30 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center justify-center gap-2">
            <span>🎲 Starting Player:</span>
            <span className="text-white text-sm">
              {room?.players[room?.gameState?.startingPlayerIndex || 0]?.name}
            </span>
          </div>

          {/* Synchronized Countdown Timer */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <span className="text-xs text-slate-400 font-semibold block mb-2">Round Timer</span>
            <div className={`text-6xl font-black font-mono my-2 ${
              timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-white'
            }`}>
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-slate-500">Listen carefully to spot anyone who hesitates or gives strange clues!</p>
          </div>

          {/* If Host: Move to voting */}
          {isHost ? (
            <button
              onClick={handleHostStartVoting}
              className="w-full py-4 px-6 rounded-2xl font-black text-base text-white bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>MOVE TO VOTING ON ALL PHONES</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <p className="text-xs text-slate-400">
              The Host can trigger voting when discussion is done.
            </p>
          )}
        </div>
      )}

      {/* PHASE 3: VOTING PHASE ON INDIVIDUAL PHONE */}
      {phase === 'voting' && (
        <div className="my-auto space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
              Private Voting
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              Cast Your Vote
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Who do you think is the Impostor?
            </p>
          </div>

          {/* Vote Progress Tracker */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 flex items-center justify-between">
            <span>Votes Cast:</span>
            <span className="text-purple-400 font-mono">
              {voteProgress.votedCount} / {voteProgress.totalPlayers}
            </span>
          </div>

          {/* Suspects Grid */}
          <div className="grid grid-cols-2 gap-3">
            {room?.players.map((suspect) => {
              const isMe = suspect.id === socket.id;
              const isSelected = myVote === suspect.id;
              return (
                <button
                  key={suspect.id}
                  disabled={isMe || myVote !== null}
                  onClick={() => handleCastVote(suspect.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/30'
                      : isMe
                        ? 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
                        : myVote !== null
                          ? 'bg-slate-900 border-slate-800 text-slate-400 opacity-50'
                          : 'bg-slate-900 border-slate-800 hover:border-purple-500 text-white active:scale-95'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{suspect.avatar}</span>
                    <span className="text-sm font-bold truncate max-w-[80px]">
                      {suspect.name} {isMe && '(You)'}
                    </span>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-white shrink-0" />}
                </button>
              );
            })}
          </div>

          {myVote && (
            <p className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
              ✓ Your vote has been recorded! Waiting for remaining players...
            </p>
          )}

          {isHost && voteProgress.votedCount > 0 && (
            <button
              onClick={handleHostFinishVotingEarly}
              className="text-xs text-slate-400 hover:text-white underline pt-2"
            >
              Host: Force reveal results now
            </button>
          )}
        </div>
      )}

      {/* PHASE 4: RESULTS & SCOREBOARD */}
      {phase === 'results' && roundResults && (
        <div className="my-auto space-y-6 animate-fadeIn">
          
          {/* Winner announcement */}
          <div className={`p-6 rounded-3xl border-2 shadow-2xl ${
            !roundResults.isImpostorCaught || guessResult?.correct
              ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-rose-500/25'
              : 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-emerald-500/25'
          }`}>
            <div className="text-5xl mb-2 animate-bounce">
              {!roundResults.isImpostorCaught || guessResult?.correct ? '🕵️' : '🛡️'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black">
              {!roundResults.isImpostorCaught || guessResult?.correct ? 'IMPOSTORS WIN!' : 'CIVILIANS WIN!'}
            </h2>
            <p className="text-xs opacity-90 mt-1">
              Secret Word was: <strong className="uppercase">"{roundResults.secretWord}"</strong>
            </p>
          </div>

          {/* If Impostor was caught and current player is the Impostor: Trigger guess button */}
          {roundResults.isImpostorCaught && roundResults.impostorIds.includes(socket.id) && !guessResult && (
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-center space-y-2">
              <h4 className="font-bold text-sm">🕵️ You were caught!</h4>
              <p className="text-xs">Guess the Civilians' secret word to steal victory!</p>
              <button
                onClick={() => setImpostorGuessModal(true)}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow"
              >
                Attempt Word Guess
              </button>
            </div>
          )}

          {/* Players & Scores List */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-left space-y-2 max-h-60 overflow-y-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Scoreboard & Revealed Roles
            </span>
            {room?.players.map((p) => {
              const isImp = roundResults.impostorIds.includes(p.id);
              const votesGot = roundResults.voteCounts[p.id] || 0;
              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                    isImp 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' 
                      : 'bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.avatar}</span>
                    <span className="font-bold">{p.name}</span>
                    <span className="opacity-75">({isImp ? '🕵️ Impostor' : '🛡️ Civilian'} • {votesGot} votes)</span>
                  </div>
                  <span className="font-mono font-bold text-purple-400">{p.score || 0} pts</span>
                </div>
              );
            })}
          </div>

          {/* Host Next Round Button */}
          {isHost ? (
            <button
              onClick={handleNextRound}
              className="w-full py-4 px-6 rounded-2xl font-black text-base text-white bg-gradient-to-r from-purple-600 via-rose-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all active:scale-95"
            >
              START NEXT ROUND (SAME ROOM) →
            </button>
          ) : (
            <p className="text-xs text-slate-400">
              Waiting for Host to start the next round...
            </p>
          )}

        </div>
      )}

      {/* Impostor Guess Modal */}
      {impostorGuessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-white">Guess the Civilians' Secret Word</h3>
            <form onSubmit={handleImpostorGuessSubmit} className="space-y-3">
              <input
                type="text"
                required
                autoFocus
                placeholder="Type the secret word..."
                value={impostorGuessInput}
                onChange={(e) => setImpostorGuessInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setImpostorGuessModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 text-xs font-bold text-white shadow"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom info */}
      <div className="pt-4 text-center">
        <span className="text-[11px] text-slate-500 font-mono">
          LHOMA REAL-TIME ROOM // SYNCED
        </span>
      </div>

    </div>
  );
}
