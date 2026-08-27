import { io } from 'socket.io-client';

let socket = null;

export function getSocket() {
  if (!socket) {
    const serverUrl = 'https://imposter-lhoma.onrender.com';

    socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });
  }

  return socket;
}