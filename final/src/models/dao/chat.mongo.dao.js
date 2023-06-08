const chatModel = require("../models/chat.schema");

class ChatManager {
  async getMessages() {
    const messages = await chatModel.find().lean();
    return messages;
  }

  async saveMessage(message) {
    console.log(message)
    const newMessage = await chatModel.create(message);
    return newMessage;
  }
}

module.exports = ChatManager;