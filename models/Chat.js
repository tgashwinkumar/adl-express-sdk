import { Schema, model } from "mongoose";

const schema = new Schema({
  type: {
    default: "text",
    required: true,
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  socketID: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
    default: "test_room",
  },
  timeStamp: {
    type: Date,
    default: new Date(),
  },
});

export default model("Chat", schema);
