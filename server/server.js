const Express = require("express");
const Path = require("path");
const Http = require("http");
const PORT = process.env.PORT || 4000;
const socketio = require("socket.io");
const app = Express();
const server = Http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

//serving static files
//app.use(Express.static(Path.join(__dirname, "../build/")));

//starting server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//handle a socket connection req from client

const connections = [null, null];
let currentPlayer = null;
io.on("connection", (socket) => {
  console.log(socket.id);
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = Number(i);
      connections[i] = socket.id;
      if (i === "1") {
        // both client connected, send them the enemy player's ID
        io.to(connections[1]).emit("enemy-details", connections[0]);
        io.to(connections[0]).emit("enemy-details", connections[1]);
        currentPlayer = connections[0];
      }
      console.log("client connected ", connections);
      break;
    }
  }
  socket.emit("connection-details", Number(playerIndex + 1));
  if (playerIndex !== -1)
    console.log(`Player ${Number(playerIndex) + 1} has connected`);
  else {
    return;
  }
  socket.on("sendAttack", (position) => {
    console.log(socket.id, "just sent an attack", position);
    const enemyPlayerID =
      connections[0] === socket.id ? connections[1] : connections[0];

    if (currentPlayer === socket.id) {
      io.to(enemyPlayerID).emit("receiveAttack", position);
      currentPlayer = enemyPlayerID;
    } else {
      io.to(socket.id).emit("server-message", {
        author: "Server",
        message: "It's not your turn",
      });
    }
  });
  socket.on("sendEnemyView", (enemyGrid) => {
    console.log(`${socket.id} just send a new view for their enemy`);
    const enemyPlayerID =
      connections[0] === socket.id ? connections[1] : connections[0];
    io.to(enemyPlayerID).emit("receiveEnemyView", enemyGrid);
  });
  socket.on("chat-message", (message) => {
    io.emit("chat-message", message);
  });
});
