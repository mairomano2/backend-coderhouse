const { Router } = require("express")
const router = Router()
const productsModel = require ("../models/products.models")
const ProductsManager = require("../dao/fsManagers/fsManager")
const productsManager = new ProductsManager("./dbFileSystem/products.json")

router.get("/", async (req, res) => {
  let products = await productsModel.find()
  res.send(products)
  // const data = await productsManager.getItems()
  // res.status(200).render("products", {data})
})

module.exports = router