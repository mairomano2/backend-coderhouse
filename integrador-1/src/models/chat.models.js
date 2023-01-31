const mongoose = require("mongoose");
const chatColletcion = "chatColection";

const chatSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
});

const chatModel = mongoose.model(chatColletcion, chatSchema);
module.exports = chatModel;