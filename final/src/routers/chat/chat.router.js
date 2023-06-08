const { Router } = require("express");
const router = Router();
const ChatManagerMongo = require("../../models/dao/chat.mongo.dao");

const chatManager = new ChatManagerMongo(process.env.MONGO_URL);

router.get("/", async (req, res) => {
  try {
    const messages = chatManager.getMessages()
    res.render("chat", messages);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
