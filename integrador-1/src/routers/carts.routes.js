const { Router } = require("express")
const router = Router()
const cartsModel =require("../models/carts.models")
const CartsManager = require("../dao/fsManagers/fsManager")
const cartsManager = new CartsManager("./dbFileSystem/carts.json")

router.get("/", async (req, res) => {
  //activar el modelo
  const data = await cartsManager.getItems()
  res.status(200).render("carts", {data})
})

module.exports = router