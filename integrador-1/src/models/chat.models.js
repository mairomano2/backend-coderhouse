const mongoose = require("mongoose");
const chatColletcion = "chats";

const chatSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const chatModel = mongoose.model(chatColletcion, chatSchema);
module.exports = chatModel;
