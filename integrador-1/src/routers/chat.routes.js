const { Router } = require("express")
const chatModel = require("../models/chat.models")
const router = Router()

router.get("/", async (req, res) => {
  // let chat = await chatModel.find()
  res.status(200).render("chat")
})

module.exports = router