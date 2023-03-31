import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { connectToServer } from "./mongo/conn.js";
import indexRoutes from "./routes/indexRoutes.js";
import Chat from "./models/Chat.js";
import Room from "./models/Room.js";
import bodyParser from "body-parser";
const app = express();

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
// app.use(express.static('public'))

app.use(jsonParser);
app.use(urlencodedParser);

app.use("/api", indexRoutes);

import { Server as httpServer } from "http";

const http = httpServer(app);
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", async (data) => {
    const msg = await Chat.create(data);
    io.emit("messageResponse", data);
  });

  socket.on("join-rooms", async (data) => {
    const { email } = data;
    const rooms = await Room.find({
      participants: { $in: [email] },
    });
    console.log(rooms.map((r) => r.roomId));
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  http.listen(4600, () => {
    console.log("App listened to the port :- http://localhost:4600/");
  });
});
