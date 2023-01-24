const { Router } = require("express")
const router = Router()
const ProductsManager = require("../dao/fsManagers/fsManager")
const productsManager = new ProductsManager("./dbFileSystem/products.json")

router.get("/", async (req, res) => {
  const data = await productsManager.getItems()
  res.status(200).render("products", {data})
})

module.exports = router