const mongoose = require("mongoose")
const chatColletcion = "chat"

const chatSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model(chatColletcion, chatSchema)