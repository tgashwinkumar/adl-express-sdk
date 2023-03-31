import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "psg-bogs",
  api_key: "398574583188332",
  api_secret: "7rVusdKbG4MTWhMd9pC-XC8n0PQ",
});

export default cloudinary;
