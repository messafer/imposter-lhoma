import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { io } from 'socket.io-client';

const socket = io('https://imposter-lhoma.onrender.com');

import { 
  Users, 
  Smartphone, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Play, 
  Settings, 
  Crown, 
  ShieldAlert, 
  RotateCcw,
  Volume2,
  VolumeX,
  HelpCircle,
  QrCode
} from 'lucide-react';
import { CATEGORIES, AVATARS } from '../../data/words';
import { sounds } from '../../utils/audio';
import supabase from '../../lib/supabase';

export default function MultiplayerLobby({
  socket,
  onGameStart,
  onSwitchToPassAndPlay,
  onOpenHowToPlay,
  soundMuted,
  setSoundMuted,
  serverInfo
}) {
  const [tab, setTab] = useState('host'); // host | join
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [joinCode, setJoinCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Active connected room state
  const [room, setRoom] = useState(null);
  const [myPlayer, setMyPlayer] = useState(null);
  const [isHost, setIsHost] = useState(false);

  // Auto-fill room code from URL query parameters (e.g. ?room=ABCD)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get('room');
    if (codeFromUrl) {
      setJoinCode(codeFromUrl.toUpperCase());
      setTab('join');
    }
  }, []);

  // Listen to room updates
useEffect(() => {
  if (!room?.id) return;

  const loadRoom = async () => {
    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', room.id)
      .single();

    if (roomError) {
      console.error(roomError);
      return;
    }

    const { data: playersData, error: playersError } = await supabase
      .from('players')
      .select('*')
      .eq('room_id', room.id)
      .order('created_at', { ascending: true });

    if (playersError) {
      console.error(playersError);
      return;
    }

    setRoom({
      id: roomData.id,
      code: roomData.room_code,
      settings: roomData.settings,
      players: playersData.map((p) => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar || AVATARS[0],
        isHost: p.is_host
      }))
    });
  };

  loadRoom();

  const channel = supabase
    .channel(`room-${room.id}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'players',
        filter: `room_id=eq.${room.id}`
      },
      () => {
        loadRoom();
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'rooms',
        filter: `id=eq.${room.id}`
      },
      () => {
        loadRoom();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [room?.id]);

  // Host creates room
const generateRoomCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';

  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
};
const handleCreateRoom = async (e) => {
  e?.preventDefault();

  if (!playerName.trim()) {
    setErrorMsg('Please enter your name!');
    return;
  }

  setErrorMsg('');
  sounds.playClick();

  socket.emit(
    'create_room',
    {
      playerName: playerName.trim(),
      avatar: selectedAvatar
    },
    (response) => {
      if (!response || !response.success) {
        console.error('Room error:', response?.message);
        setErrorMsg(response?.message || 'Failed to create room');
        return;
      }

      console.log('✅ Room created:', response.roomCode);

      const newPlayer = response.player;
      const roomData = response.room;

      setMyPlayer(newPlayer);
      setIsHost(true);

      setRoom({
        id: response.roomCode,
        code: response.roomCode,
        settings: roomData.settings,
        players: roomData.players.map((p) => ({
          id: p.id,
          name: p.name,
          avatar: p.avatar,
          isHost: p.isHost
        }))
      });

      sounds.playWin();
    }
  );
};
const handleJoinRoom = async (e) => {
  e?.preventDefault();

  if (!playerName.trim()) {
    setErrorMsg('Please enter your name!');
    return;
  }

  const code = joinCode.trim().toUpperCase();

  if (code.length !== 4) {
    setErrorMsg('Please enter a valid 4-letter Room Code!');
    return;
  }

  setErrorMsg('');
  sounds.playClick();

  socket.emit(
    'join_room',
    {
      roomCode: code,
      playerName: playerName.trim(),
      avatar: selectedAvatar
    },
    (response) => {
      if (!response || !response.success) {
        console.error('Join room error:', response?.message);
        setErrorMsg(response?.message || 'Failed to join room');
        return;
      }

      console.log('✅ Joined room:', response.roomCode);

      const newPlayer = response.player;
      const roomData = response.room;

      setMyPlayer(newPlayer);
      setIsHost(false);

      setRoom({
        id: response.roomCode,
        code: response.roomCode,
        settings: roomData.settings,
        players: roomData.players.map((p) => ({
          id: p.id,
          name: p.name,
          avatar: p.avatar,
          isHost: p.isHost
        }))
      });

      sounds.playWin();
    }
  );
};
useEffect(() => {
  const handleRoomUpdate = (roomData) => {
    console.log('🔄 Room updated:', roomData);

    setRoom({
      id: roomData.code,
      code: roomData.code,
      settings: roomData.settings,
      players: roomData.players.map((p) => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        isHost: p.isHost
      }))
    });
  };

  socket.on('room_updated', handleRoomUpdate);

  return () => {
    socket.off('room_updated', handleRoomUpdate);
  };
}, []);
const toggleCategory = async (catId) => {
  if (!isHost || !room) return;

  sounds.playClick();

  let updated = [...room.settings.selectedCategories];

  if (updated.includes(catId)) {
    if (updated.length === 1) return;
    updated = updated.filter((id) => id !== catId);
  } else {
    updated.push(catId);
  }

  const { error } = await supabase
    .from('rooms')
    .update({
      settings: {
        ...room.settings,
        selectedCategories: updated
      }
    })
    .eq('id', room.id);

  if (error) {
    console.error(error);
    setErrorMsg(error.message);
  }
};

  // Host starts the game
  const handleHostStartGame = () => {
    if (!isHost || !room || room.players.length < 3) return;
    sounds.playWin();

    // Pick a candidate word from selected categories
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

const currentHostUrl = `${window.location.origin}${window.location.pathname}?room=${room?.code || ''}`;

  const copyRoomLink = () => {
    navigator.clipboard.writeText(currentHostUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-rose-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/25">
            📱
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
              IMPOSTER
            </h1>
            <p className="text-xs text-slate-400 font-medium">
            kol wa7d btelephone ta3o 
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !soundMuted;
              setSoundMuted(next);
              sounds.setMuted(next);
            }}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
          >
            {soundMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>
          <button
            onClick={onOpenHowToPlay}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs font-bold flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Rules</span>
          </button>
        </div>
      </div>

      {/* Mode Switch Bar (Multi-Phone vs Pass-and-Play) */}
      <div className="mt-6 flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Multi-Phone Room Mode Active</span>
        </div>
        <button
          onClick={onSwitchToPassAndPlay}
          className="text-xs font-bold text-purple-400 hover:text-purple-300 underline flex items-center gap-1"
        >
          <span>Switch to Pass-and-Play (1 Phone)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* NOT IN ROOM YET: Show Host / Join Tabs */}
      {!room ? (
        <div className="mt-8">
          
          {/* Tabs */}
          <div className="flex gap-3 mb-6 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => { setTab('host'); setErrorMsg(''); }}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                tab === 'host'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Create Room (Host)</span>
            </button>
            <button
              onClick={() => { setTab('join'); setErrorMsg(''); }}
              className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                tab === 'join'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Join Room with Code</span>
            </button>
          </div>

          {/* Form Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            {/* Player Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Your Player Name *
              </label>
              <input
                type="text"
                maxLength={18}
                placeholder="ayoub,islem,asma,lina..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500"
              />
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Choose Your Avatar
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedAvatar(av);
                    }}
                    className={`w-11 h-11 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                      selectedAvatar === av
                        ? 'bg-purple-600/30 border-2 border-purple-500 scale-110 shadow-md shadow-purple-500/20'
                        : 'bg-slate-800 border border-slate-700/60 hover:bg-slate-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* If Join Tab: Room Code Input */}
            {tab === 'join' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  4-Letter Room Code *
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 8K2P"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white font-mono text-center text-2xl font-black tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-600"
                />
              </div>
            )}

            {errorMsg && (
              <p className="text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl">
                ⚠️ {errorMsg}
              </p>
            )}

            {/* Action Submit */}
            <button
              onClick={tab === 'host' ? handleCreateRoom : handleJoinRoom}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-purple-600 via-rose-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              {tab === 'host' ? (
                <>
                  <Crown className="w-5 h-5" />
                  <span>CREATE PARTY ROOM</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-5 h-5" />
                  <span>JOIN GAME ON THIS PHONE</span>
                </>
              )}
            </button>

          </div>

        </div>
      ) : (
        /* ALREADY IN ROOM: Show Live Room Lobby */
        <div className="mt-8 space-y-6">
          
          {/* Room Code & Invite Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border-2 border-purple-500/50 shadow-2xl space-y-4 text-center relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Room Invite Code
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-2xl border border-purple-500/30">
                    {room.code}
                  </span>
                  <button
                    onClick={copyRoomLink}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Link'}</span>
                  </button>
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold border border-purple-500/30 transition-colors flex items-center gap-1.5"
                    title="Toggle QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="hidden sm:inline">QR Code</span>
                  </button>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-xs text-slate-400 font-semibold block">Connected Players</span>
                <span className="text-2xl font-black text-white">{room.players.length} / 20</span>
              </div>
            </div>

            {/* QR Code expansion */}
            {showQR && (
              <div className="p-6 rounded-2xl bg-white text-slate-950 inline-block mx-auto shadow-xl animate-fadeIn">
                <QRCodeSVG value={currentHostUrl} size={180} />
                <p className="text-xs font-bold mt-2 text-slate-700">Point phone camera to join!</p>
              </div>
            )}

            <p className="text-xs text-slate-400">
              Tell your 3+ friends to open <strong className="text-white">http://{window.location.hostname}:3000</strong> and enter code <strong className="text-purple-400">{room.code}</strong> (or scan the QR code).
            </p>
          </div>

          {/* Connected Players Grid */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Players in Lobby ({room.players.length})</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {room.players.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center gap-3 relative"
                >
                  <span className="text-3xl">{p.avatar}</span>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-white block truncate">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      {p.isHost && <Crown className="w-3 h-3 text-amber-400" />}
                      {p.id === myPlayer?.id ? '(You)' : p.isHost ? 'Host' : 'Player'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* If Host: Settings & Start Game */}
          {isHost ? (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              
              {/* Category selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Selected Algerian Word Packs
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = room.settings.selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                            : 'bg-slate-800 border-slate-700 text-slate-500 opacity-60'
                        }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Host Start Button */}
              <button
                onClick={handleHostStartGame}
                disabled={room.players.length < 3}
                className="w-full py-4 px-6 rounded-2xl font-black text-base text-white bg-gradient-to-r from-purple-600 via-rose-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>START GAME FOR ALL {room.players.length} PHONES</span>
              </button>

              {room.players.length < 3 && (
                <p className="text-xs text-rose-400 text-center font-semibold">
                  Waiting for at least 3 players to join the room... ({room.players.length}/3)
                </p>
              )}
            </div>
          ) : (
            /* Non-Host Waiting Screen */
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto animate-pulse">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">You are connected to Room {room.code}!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Waiting for the host ({room.players.find(p => p.isHost)?.name || 'Host'}) to start the game...
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
