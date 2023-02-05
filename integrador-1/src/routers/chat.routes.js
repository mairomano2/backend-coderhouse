const { Router } = require("express")
const router = Router()
const options = require("../mongoDbConfig/options")
const ChatManagerMongo = require("../dao/mongoManagers/chatMongoManager")

const chatManager = new ChatManagerMongo(options.mongoDb.url)

router.get("/", async (req, res) => {
  const messages = await chatManager.getMessages()
  res.render("chat", messages)
})

module.exports = router