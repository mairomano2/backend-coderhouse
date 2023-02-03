const { Router } = require("express");
const router = Router();
const options = require("../mongoDbConfig/options");
const ProductManagerMongo = require("../dao/mongoManagers/productManagerMongo");

//FS IMPORTS
// const FsManager = require("../dao/fsManagers/fsManager")
// const fsManager = new FsManager(options.fileSystem.products)

const productManagerMongo = new ProductManagerMongo(options.mongoDb.url);

router.get("/", async (req, res) => {
  // const products = await fsManager.getItems()
  const products = await productManagerMongo.getAll();
  const limit = Number(req.query.limit);

  if (limit) {
    if (isNaN(limit)) {
      res.status(400).send("el parametro debe ser un numero");
    }
    const limitProducts = products.slice(0, limit);
    res.json({
      status: "success",
      data: limitProducts,
    });
  } else {
    console.log(products[0].title);
    res.render("products", products );
    // res.json({
    //   status: "success",
    //   data: products
    // });
  }
});

//  GET -> trae un prod en especifico
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  console.log(pid);
  // const data = await fsManager.getItemById(pid)
  const data = await productManagerMongo.getProductById(pid);
  console.log(data);

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
    // data: await fsManager.addProduct(product)
    data: data,
  });
});

// // PUT -> -> actualiza por los campos enviados desde body
router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const fieldsToUpdate = req.body.title;
  const foundId = fieldsToUpdate.hasOwnProperty("_id");
  console.log(foundId);
  // const data = await fsManager.updateProduct(pid, fieldsToUpdate)
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
    // data: await fsManager.deleteProduct(pid)
  });
});

module.exports = router;
