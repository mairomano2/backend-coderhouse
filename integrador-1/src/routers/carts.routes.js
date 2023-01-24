const { Router } = require("express")
const router = Router()
const CartsManager = require("../dao/fsManagers/fsManager")
const cartsManager = new CartsManager("./dbFileSystem/carts.json")

router.get("/", async (req, res) => {
  const data = await cartsManager.getItems()
  res.status(200).render("carts", {data})
})

module.exports = router