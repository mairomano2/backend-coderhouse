const { Router } = require("express")
const router = Router()
const options = require("../mongoDbConfig/options")
const ChatManagerMongo = require("../dao/mongoManagers/chatMongoManager")

const chatManager = new ChatManagerMongo(options.mongoDb.url)

router.get("/", async (req, res) => {
  const data = await chatManager.getMessages()
  res.json({
    status: "success",
    data : data
  })
})

module.exports = router