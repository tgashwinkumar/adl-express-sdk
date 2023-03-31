import { Schema, model } from "mongoose";

const schema = new Schema({
  type: {
    default: "direct",
    required: true,
    type: String,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  participants: {
    type: [String],
    required: true,
  },
});

export default model("Room", schema);
