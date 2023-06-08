const mongoose = require("mongoose");
const chatColletcion = "chat";

const chatSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const chatModel = mongoose.model(chatColletcion, chatSchema);
module.exports = chatModel;
