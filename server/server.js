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

setInterval(function () {
  global.gc();
  console.log("GC done");
}, 1000 * 60);
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
  let heartBeatTimeStamp = Date.now();
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
      const otherPlayerIndex = connections[0] === socket.id ? "1" : "2";
      io.to(socket.id).emit("server-message", {
        author: "Server",
        message: "It's not your turn, player#" + otherPlayerIndex,
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
  socket.on("heartbeat", () => {
    heartBeatTimeStamp = Date.now();
    //console.log(socket.id, " is alive");
  });
  let hearBeatCheck = setInterval(() => {
    if (Date.now() > heartBeatTimeStamp + 5000) {
      //no activity for the last 5 seconds
      console.log(`${socket.id} did not give a heartbeat, disconnecting `);
      socket.disconnect();
      socket.removeAllListeners();
      socket = null;
      clearInterval(hearBeatCheck);
      global.gc();
    }
  }, 10000);
});
io.on("disconnect", (socket) => {
  console.log(`${socket.id} has disconnected`);
  socket.disconnect();
  socket.removeAllListeners();
  socket = null;
  global.gc();
});
