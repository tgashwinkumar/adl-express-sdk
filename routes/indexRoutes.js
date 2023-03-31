import { Router } from "express";
import Chat from "../models/Chat.js";
import Room from "../models/Room.js";

const router = Router();

router.get("/room/:id",  async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.id });
    return res.status(200).send(room);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/create-room", async (req, res) => {
  try {
    const room = await Room.create({
      roomId: "room_20z209_20z222",
      participants: ["20z209@psgtech.ac.in", "20z222@psgtech.ac.in"],
    });
    return res.status(200).send(room);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/chats/:room", async (req, res) => {
  try {
    const chats = await Chat.find({ room: req.params.room });
    return res.status(200).send(chats);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/", (req, res) => res.send("Qwert Messenger router"));

export default router;
