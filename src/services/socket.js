import { io } from 'socket.io-client';

let socket = null;

export function getSocket() {
  if (!socket) {
    // Connect to current host on port 3001
    const hostname = window.location.hostname || 'localhost';
    const serverUrl = `http://${hostname}:3001`;
    socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });
  }
  return socket;
}
