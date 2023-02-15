const express = require("express")
const ProductsManager = require("../entregable-2/manager/productsManager")
//se inicia el servidor
const app = express()

const manager = new ProductsManager("../entregable-2/db/products.json")

app.get("/", (req, res) => {
  res.send("Entregable 3")
})

app.get("/products", async (req, res) => {
  const products = await manager.getProducts()
  const limit = Number(req.query.limit)

  if(limit){
    const limitProducts = products.slice(0, limit)
    res.send(limitProducts)
  } else {
    res.send(products)
  }
})

app.get("/products/:pid", (req, res) => {
  const pid = req.params.pid
  const product = manager.getProductById(pid)

  if(product){
    res.send(product)
  } else {
    res.status(404).send("No se encontro un producto con ese id")
  }
})

//se pone en marcha
app.listen(8080, () => { //el callback es opcional y suele ser informativo
  console.log("Server running")
})