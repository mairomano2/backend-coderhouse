const { Router } = require("express");
const router = Router();
const options = require("../mongoDbConfig/options");
const CartsManagerMongo = require("../dao/mongoManagers/cartsManagerMongo");

//FS IMPORTS
// const CartsManager = require("../dao/fsManagers/fsManager")
// const cartsManager = new CartsManager("./dbFileSystem/carts.json")

const cartsManagerMongo = new CartsManagerMongo(options.mongoDb.url);

router.get("/", async (req, res) => {
  const data = await cartsManagerMongo.getAll();
  res.json({
    status: "success",
    data: data
  })
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const data = await cartsManagerMongo.getCartById(cid);
  res.json({
    status: "success",
    data: data
  })
});

// POST -> cid/produc/pid agrega un prod a un cart ya creado. si ya existe ese prod solo se agrega uno en la cantidad
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  // const data = await cartsManager.addToCart(cid, pid)
  const data = await cartsManagerMongo.addToCart(cid, pid);

  res.json({
    status: "success",
    data: data
  })
});

module.exports = router;
