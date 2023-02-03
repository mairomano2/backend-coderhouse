const chatModel = require("../../models/chat.models");

class ChatManager {
  async getMessages() {
    const listMessage = await chatModel.find();
    return listMessage;
  }

  async saveMessage(message) {
    const newMessage = await chatModel.create(message);
    return newMessage;
  }
}

module.exports = ChatManager;
