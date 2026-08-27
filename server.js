import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Helper to get local network IP for phones
function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    if (name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wifi')) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }

  return 'localhost';
}

const localIP = getLocalIP();

// In-memory rooms
const rooms = {};

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

app.get('/api/info', (req, res) => {
  res.json({
    server: 'online',
    port: PORT,
    activeRooms: Object.keys(rooms).length
  });
});

io.on('connection', (socket) => {
  console.log('CONNECTED:', socket.id);

  let currentRoom = null;

  // 1. Host creates room
socket.on('create_room', ({ playerName, avatar }, callback) => {
  console.log('CREATE ROOM:', playerName);

  // Generate a unique room code
  let roomCode = generateRoomCode();

  while (rooms[roomCode]) {
    roomCode = generateRoomCode();
  }

  console.log('ROOM CODE:', roomCode);


    const hostPlayer = {
      id: socket.id,
      name: playerName || 'Host',
      avatar: avatar || '👑',
      score: 0,
      isHost: true
    };

    rooms[roomCode] = {
      code: roomCode,
      hostId: socket.id,
      players: [hostPlayer],
      phase: 'lobby', // lobby | role_reveal | discussion | voting | results
      settings: {
        impostorCount: 1,
        undercoverMode: false,
        selectedCategories: ['dz_food', 'dz_cafe', 'dz_cities', 'dz_houma', 'dz_family', 'dz_events', 'dz_tech', 'dz_sports_music'],
        timerSeconds: 90
      },
      gameState: null,
      votes: {}
    };

    socket.join(roomCode);
    currentRoom = roomCode;

    if (callback) {
      callback({
        success: true,
        roomCode,
        player: hostPlayer,
        room: rooms[roomCode],
        localIP
      });
    }
  });

  // 2. Player joins existing room
  socket.on('join_room', ({ roomCode, playerName, avatar }, callback) => {
    const cleanCode = (roomCode || '').trim().toUpperCase();
    const room = rooms[cleanCode];

    if (!room) {
      if (callback) callback({ success: false, message: 'Room not found. Check the 4-letter code!' });
      return;
    }

    if (room.phase !== 'lobby') {
      if (callback) callback({ success: false, message: 'Game has already started in this room!' });
      return;
    }

    if (room.players.length >= 20) {
      if (callback) callback({ success: false, message: 'Room is full (max 20 players)!' });
      return;
    }

    const newPlayer = {
      id: socket.id,
      name: playerName || `Player ${room.players.length + 1}`,
      avatar: avatar || '🎮',
      score: 0,
      isHost: false
    };

    room.players.push(newPlayer);
    socket.join(cleanCode);
    currentRoom = cleanCode;

    io.to(cleanCode).emit('room_updated', room);

    if (callback) {
      callback({
        success: true,
        roomCode: cleanCode,
        player: newPlayer,
        room,
        localIP
      });
    }
  });

  // 3. Update room settings
  socket.on('update_settings', ({ roomCode, settings }) => {
    const room = rooms[roomCode];
    if (!room || room.hostId !== socket.id) return;
    room.settings = { ...room.settings, ...settings };
    io.to(roomCode).emit('room_updated', room);
  });

  // 4. Start game
  socket.on('start_game', ({ roomCode, wordItem }) => {
    const room = rooms[roomCode];
    if (!room || room.hostId !== socket.id) return;
    if (room.players.length < 3) return;

    // Pick Impostors
    const shuffled = [...room.players].sort(() => Math.random() - 0.5);
    const impostorCount = Math.min(room.settings.impostorCount || 1, Math.floor(room.players.length / 2) || 1);
    const chosenImpostorIds = shuffled.slice(0, impostorCount).map(p => p.id);
    const startingPlayerIndex = Math.floor(Math.random() * room.players.length);

    room.gameState = {
      secretWord: wordItem.word,
      undercoverWord: wordItem.undercover,
      categoryName: wordItem.categoryName || 'General',
      impostorIds: chosenImpostorIds,
      startingPlayerIndex,
      undercoverMode: room.settings.undercoverMode
    };

    room.phase = 'role_reveal';
    room.votes = {};

    // Send private secret role to each player's phone
    room.players.forEach(p => {
      const isImpostor = chosenImpostorIds.includes(p.id);
      io.to(p.id).emit('your_secret_role', {
        isImpostor,
        undercoverMode: room.settings.undercoverMode,
        categoryName: wordItem.categoryName,
        secretWord: isImpostor ? (room.settings.undercoverMode ? wordItem.undercover : null) : wordItem.word,
        tip: isImpostor 
          ? (room.settings.undercoverMode ? 'You are Undercover! Your word is slightly different.' : 'You are the Impostor! Blend in and guess the word!') 
          : 'You are a Civilian! Protect the secret word.'
      });
    });

    io.to(roomCode).emit('game_started', {
      phase: 'role_reveal',
      room
    });
  });

  // 5. Host transitions to Discussion
  socket.on('start_discussion', ({ roomCode }) => {
    const room = rooms[roomCode];
    if (!room) return;
    room.phase = 'discussion';
    io.to(roomCode).emit('discussion_started', { room });
  });

  // 6. Transition to Voting
  socket.on('start_voting', ({ roomCode }) => {
    const room = rooms[roomCode];
    if (!room) return;
    room.phase = 'voting';
    io.to(roomCode).emit('voting_started', { room });
  });

  // 7. Cast vote from individual phone
  socket.on('cast_vote', ({ roomCode, suspectId }) => {
    const room = rooms[roomCode];
    if (!room || room.phase !== 'voting') return;

    room.votes[socket.id] = suspectId;

    // Broadcast vote progress without revealing who voted who yet
    const votedCount = Object.keys(room.votes).length;
    io.to(roomCode).emit('vote_progress', {
      votedCount,
      totalPlayers: room.players.length,
      voterId: socket.id
    });

    // If all votes are in, finalize round results
    if (votedCount >= room.players.length) {
      finalizeRound(roomCode);
    }
  });

  // 8. Host manual finish voting
  socket.on('finish_voting_early', ({ roomCode }) => {
    finalizeRound(roomCode);
  });

  function finalizeRound(roomCode) {
    const room = rooms[roomCode];
    if (!room) return;

    // Tally votes
    const voteCounts = {};
    room.players.forEach(p => { voteCounts[p.id] = 0; });
    Object.values(room.votes).forEach(targetId => {
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

    const isImpostorCaught = room.gameState.impostorIds.some(id => String(id) === String(eliminatedPlayerId));

    // Update scores
    room.players = room.players.map(p => {
      const isImp = room.gameState.impostorIds.includes(p.id);
      let pts = p.score || 0;
      if (!isImpostorCaught && isImp) {
        pts += 2;
      } else if (isImpostorCaught && !isImp) {
        pts += 1;
      }
      return { ...p, score: pts };
    });

    room.phase = 'results';

    io.to(roomCode).emit('round_results', {
      room,
      votes: room.votes,
      voteCounts,
      eliminatedPlayerId,
      isImpostorCaught,
      impostorIds: room.gameState.impostorIds,
      secretWord: room.gameState.secretWord,
      undercoverWord: room.gameState.undercoverWord
    });
  }

  // 9. Impostor final guess
  socket.on('impostor_guess', ({ roomCode, guessWord }) => {
    const room = rooms[roomCode];
    if (!room || !room.gameState) return;

    const correct = (guessWord || '').trim().toLowerCase() === room.gameState.secretWord.toLowerCase();
    
    if (correct) {
      // Award extra point to impostors
      room.players = room.players.map(p => {
        if (room.gameState.impostorIds.includes(p.id)) {
          return { ...p, score: (p.score || 0) + 2 };
        }
        return p;
      });
    }

    io.to(roomCode).emit('impostor_guess_result', {
      correct,
      guessWord,
      secretWord: room.gameState.secretWord,
      room
    });
  });

  // 10. Next round
  socket.on('next_round', ({ roomCode, wordItem }) => {
    const room = rooms[roomCode];
    if (!room || room.hostId !== socket.id) return;
    
    // Trigger new game with same players
    socket.emit('trigger_start_game', { wordItem });
  });

  // 11. Disconnect handling
  socket.on('disconnect', () => {
    if (!currentRoom || !rooms[currentRoom]) return;
    const room = rooms[currentRoom];

    room.players = room.players.filter(p => p.id !== socket.id);

    if (room.players.length === 0) {
      delete rooms[currentRoom];
    } else {
      if (room.hostId === socket.id) {
        room.hostId = room.players[0].id;
        room.players[0].isHost = true;
      }
      io.to(currentRoom).emit('room_updated', room);
    }
  });
});
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`LHOMA Room Server running on port ${PORT}`);
});