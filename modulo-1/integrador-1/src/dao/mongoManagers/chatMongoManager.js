const chatModel = require("../../models/chat.models");

class ChatManager {
  async getMessages() {
    const messages = await chatModel.find();
    return messages;
  }

  async saveMessage(message) {
    console.log(message)
    const newMessage = await chatModel.create(message);
    return newMessage;
  }
}

module.exports = ChatManager;
