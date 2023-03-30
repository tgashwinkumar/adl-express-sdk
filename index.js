const express = require("express");
const socket = require("socket.io");

const app = express();

// app.use(express.static('public'))

const server = app.listen(4600, () => {
  console.log("App listened to the port :- http://localhost:4600/");
});

app.get("/", (req, res) => res.send("Qwert Messenger App"));

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("chat", (data) => {
    console.log("message: " + data.content + "\thandle: " + data.sender);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (handle) => {
    socket.broadcast.emit("typing", handle);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });
});
