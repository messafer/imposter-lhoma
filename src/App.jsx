import React, { useState, useEffect } from 'react';
import SetupScreen from './components/game/SetupScreen';
import RevealScreen from './components/game/RevealScreen';
import DiscussionScreen from './components/game/DiscussionScreen';
import VotingScreen from './components/game/VotingScreen';
import ResultScreen from './components/game/ResultScreen';
import HowToPlayModal from './components/game/HowToPlayModal';
import MultiplayerLobby from './components/game/MultiplayerLobby';
import OnlineGameRoom from './components/game/OnlineGameRoom';
import ModeSelectionScreen from './components/game/ModeSelectionScreen';
import { CATEGORIES } from './data/words';
import { getSocket } from './services/socket';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [playMode, setPlayMode] = useState('select'); // 'select' | 'multiplayer' | 'pass_and_play'
  const [isOnlineGameActive, setIsOnlineGameActive] = useState(false);
  const [socket, setSocket] = useState(null);

  // Pass-and-Play state
  const [phase, setPhase] = useState('setup');
  const [players, setPlayers] = useState([
    { id: 1, name: 'ayoub', avatar: '🦊', score: 0 },
    { id: 2, name: 'islem', avatar: '🐱', score: 0 },
    { id: 3, name: 'asma', avatar: '🚀', score: 0 },
    { id: 4, name: 'lina', avatar: '🦁', score: 0 },
  ]);
  const [impostorCount, setImpostorCount] = useState(1);
  const [undercoverMode, setUndercoverMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(CATEGORIES.map(c => c.id));
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [customWords, setCustomWords] = useState([]);
  const [soundMuted, setSoundMuted] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [votes, setVotes] = useState({});

  // Auto-detect room from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('room')) {
      setPlayMode('multiplayer');
    }
  }, []);

  // Initialize socket for multiplayer
  useEffect(() => {
    const s = getSocket();
    setSocket(s);

    s.on('game_started', () => {
      setIsOnlineGameActive(true);
    });

    return () => {
      s.off('game_started');
    };
  }, []);

  const handleAddCustomWord = (newWord) => {
    setCustomWords((prev) => [...prev, newWord]);
  };

  const handleStartGame = () => {
    let candidatePool = [];
    CATEGORIES.forEach((cat) => {
      if (selectedCategories.includes(cat.id)) {
        cat.words.forEach((w) => {
          candidatePool.push({ ...w, categoryName: cat.name });
        });
      }
    });

    if (customWords.length > 0) {
      customWords.forEach((w) => {
        candidatePool.push({ ...w, categoryName: w.hint || 'Custom Words' });
      });
    }

    if (candidatePool.length === 0) {
      candidatePool = CATEGORIES[0].words.map((w) => ({ ...w, categoryName: CATEGORIES[0].name }));
    }

    const selectedItem = candidatePool[Math.floor(Math.random() * candidatePool.length)];
    const shuffledPlayerIds = [...players.map((p) => p.id)].sort(() => Math.random() - 0.5);
    const chosenImpostorIds = shuffledPlayerIds.slice(0, Math.min(impostorCount, Math.floor(players.length / 2) || 1));
    const startingPlayerIndex = Math.floor(Math.random() * players.length);

    setGameState({
      secretWord: selectedItem.word,
      undercoverWord: selectedItem.undercover,
      categoryName: selectedItem.categoryName,
      impostorIds: chosenImpostorIds,
      undercoverMode: undercoverMode,
      timerSeconds: timerSeconds,
      startingPlayerIndex: startingPlayerIndex,
      players: [...players]
    });

    setCurrentPlayerIndex(0);
    setVotes({});
    setPhase('reveal');
  };

  const handleNextPlayer = () => {
    setCurrentPlayerIndex((prev) => prev + 1);
  };

  const handleFinishReveal = () => {
    setPhase('discussion');
  };

  const handleStartVoting = () => {
    setPhase('voting');
  };
  
  const handleConfirmVotes = (castVotes) => {
    setVotes(castVotes);

    const voteCounts = {};
    players.forEach((p) => { voteCounts[p.id] = 0; });
    Object.values(castVotes).forEach((targetId) => {
      if (voteCounts[targetId] !== undefined) voteCounts[targetId] += 1;
    });

    let maxVotes = -1;
    let eliminatedPlayerId = null;
    Object.entries(voteCounts).forEach(([pId, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedPlayerId = pId;
      }
    });

    const isImpostorCaught = gameState.impostorIds.some((id) => String(id) === String(eliminatedPlayerId));

    setPlayers((prev) =>
      prev.map((p) => {
        const isImp = gameState.impostorIds.includes(p.id);
        let pts = p.score || 0;
        if (!isImpostorCaught && isImp) {
          pts += 2;
        } else if (isImpostorCaught && !isImp) {
          pts += 1;
        }
        return { ...p, score: pts };
      })
    );

    setPhase('results');
  };

  const handleNextRound = () => {
    handleStartGame();
  };

  const handleResetGame = () => {
    setPhase('setup');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white relative">
      
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-purple-600/15 via-rose-600/10 to-indigo-600/15 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Screen Renderer */}
      <main className="relative z-10">
        
        {/* 1. INITIAL MODE SELECTION SCREEN (2 BIG CHOICES) */}
        {playMode === 'select' && (
          <ModeSelectionScreen
            onSelectMode={(mode) => setPlayMode(mode)}
            onOpenHowToPlay={() => setHowToPlayOpen(true)}
            soundMuted={soundMuted}
            setSoundMuted={setSoundMuted}
          />
        )}

        {/* 2. MULTIPLAYER MODE (EVERYONE ON THEIR OWN PHONE) */}
        {playMode === 'multiplayer' && (
          <div>
            {!isOnlineGameActive && (
              <div className="max-w-3xl mx-auto px-4 pt-4">
                <button
                  onClick={() => setPlayMode('select')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>العودة لاختيار وضع اللعب</span>
                </button>
              </div>
            )}

            {isOnlineGameActive ? (
              <OnlineGameRoom
                socket={socket}
                onLeaveRoom={() => setIsOnlineGameActive(false)}
              />
            ) : (
              <MultiplayerLobby
                socket={socket}
                onGameStart={() => setIsOnlineGameActive(true)}
                onSwitchToPassAndPlay={() => setPlayMode('pass_and_play')}
                onOpenHowToPlay={() => setHowToPlayOpen(true)}
                soundMuted={soundMuted}
                setSoundMuted={setSoundMuted}
              />
            )}
          </div>
        )}

        {/* 3. PASS-AND-PLAY MODE (SINGLE DEVICE) */}
        {playMode === 'pass_and_play' && (
          <div>
            <div className="max-w-4xl mx-auto px-4 pt-4 flex items-center justify-between">
              <button
                onClick={() => setPlayMode('select')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>العودة لاختيار وضع اللعب</span>
              </button>
              <button
                onClick={() => setPlayMode('multiplayer')}
                className="text-xs font-bold text-purple-400 hover:text-purple-300 underline"
              >
                التبديل إلى وضع كل واحد بهاتفه (Multi-Phone) →
              </button>
            </div>

            {phase === 'setup' && (
              <SetupScreen
                players={players}
                setPlayers={setPlayers}
                impostorCount={impostorCount}
                setImpostorCount={setImpostorCount}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                undercoverMode={undercoverMode}
                setUndercoverMode={setUndercoverMode}
                timerSeconds={timerSeconds}
                setTimerSeconds={setTimerSeconds}
                onStartGame={handleStartGame}
                onOpenHowToPlay={() => setHowToPlayOpen(true)}
                soundMuted={soundMuted}
                setSoundMuted={setSoundMuted}
                onAddCustomWord={handleAddCustomWord}
              />
            )}

            {phase === 'reveal' && (
              <RevealScreen
                gameState={gameState}
                currentPlayerIndex={currentPlayerIndex}
                onNextPlayer={handleNextPlayer}
                onFinishReveal={handleFinishReveal}
              />
            )}

            {phase === 'discussion' && (
              <DiscussionScreen
                gameState={gameState}
                onStartVoting={handleStartVoting}
              />
            )}

            {phase === 'voting' && (
              <VotingScreen
                gameState={gameState}
                onConfirmVotes={handleConfirmVotes}
              />
            )}

            {phase === 'results' && (
              <ResultScreen
                gameState={gameState}
                votes={votes}
                onNextRound={handleNextRound}
                onResetGame={handleResetGame}
              />
            )}
          </div>
        )}
      </main>

      {/* How To Play Rulebook Modal */}
      <HowToPlayModal
        isOpen={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
      />

    </div>
  );
}
