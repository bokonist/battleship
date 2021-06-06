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
io.on("connection", (socket) => {
  console.log(socket.id);
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = Number(i);
      connections[i] = socket.id;

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
  socket.on("sendAttack", () => {
    console.log(socket.id, "just sent an attack");
  });
});
