const { Router } = require("express");
const router = Router();
const options = require("../mongoDbConfig/options");
const productsModel = require("../models/products.models");
const ProductManagerMongo = require("../dao/mongoManagers/productManagerMongo");

const productManagerMongo = new ProductManagerMongo(options.mongoDb.url);

router.get("/", async (req, res) => {
  const products = await productManagerMongo.getAll();

  const limit = req.query.limit;
  const page = req.query.page;
  const queryParam = req.query.query;
  const sort = req.query.sort;

  if (limit || page || queryParam || sort) {
    const paginatedProducts = await productsModel.paginate(
      // los query params tienen que ser categoria o si hay en sstock
      { query: queryParam },
      { limit: limit, page: page, sort: "-title" }
    ).sort({field: "price", test: sort})
    
    res.json({
      status: "success",
      data: paginatedProducts,
    });
  } else {
    res.render("products", products);
  }
});

//  GET -> trae un prod en especifico
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const data = await productManagerMongo.getProductById(pid);

  if (data) {
    res.json({
      status: "success",
      data: data,
    });
  } else {
    res.status(404).send("id not found");
  }
});

// // POST -> agrega un producto al array de productos
router.post("/", async (req, res) => {
  const product = req.body;
  const data = await productManagerMongo.saveProduct(product);
  res.json({
    status: "succes",
    data: data,
  });
});

// // PUT -> -> actualiza por los campos enviados desde body
router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const fieldsToUpdate = req.body;
  const foundId = fieldsToUpdate.hasOwnProperty("_id");
  const data = await productManagerMongo.updateProduct(pid, fieldsToUpdate);

  if (foundId) {
    res.status(400).send("no se puede modificar la propiedad id");
  } else {
    if (data) {
      res.json({
        status: "succes",
        data: data,
      });
    } else {
      res.status(400).send("no se encontro el producto");
    }
  }
});

// // DELETE -> borra un producto segun id
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  await productManagerMongo.deleteProduct(pid);
  res.json({
    status: "succes",
  });
});

module.exports = router;
