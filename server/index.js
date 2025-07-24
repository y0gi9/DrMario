const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

const rooms = {};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let data;
    try {
      data = JSON.parse(message);
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
      return;
    }
    if (data.type === 'join') {
      // Join or create a room
      let room = rooms[data.room] || (rooms[data.room] = []);
      room.push(ws);
      ws.room = data.room;
      ws.send(JSON.stringify({ type: 'joined', room: data.room, players: room.length }));
      // Notify others
      room.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'player_joined', players: room.length }));
        }
      });
    } else if (data.type === 'input') {
      // Relay input to other player(s)
      let room = rooms[ws.room];
      if (room) {
        room.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'input', input: data.input, frame: data.frame }));
          }
        });
      }
    } else if (data.type === 'ping') {
      ws.send(JSON.stringify({ type: 'ping', time: data.time }));
    }
  });

  ws.on('close', function() {
    if (ws.room && rooms[ws.room]) {
      rooms[ws.room] = rooms[ws.room].filter(client => client !== ws);
      // Notify others
      rooms[ws.room].forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'player_left', players: rooms[ws.room].length }));
        }
      });
      if (rooms[ws.room].length === 0) {
        delete rooms[ws.room];
      }
    }
  });
});

console.log('WebSocket server running on ws://localhost:3001'); 