import { Router } from "express";
import Chat from "../models/Chat.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

const router = Router();

router.get("/room/:id", async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.id });
    return res.status(200).send(room);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/rooms-for/:email", async (req, res) => {
  try {
    const room = await Room.find({ participants: { $in: [req.params.email] } });
    return res.status(200).send(room);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/create-room", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    return res.status(200).send(room);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    return res.status(200).send(user);
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

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      dept: req.body.dept,
    });
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send({ message: "User not found" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
