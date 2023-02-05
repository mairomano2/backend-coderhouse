const { Router } = require("express");
const router = Router();
const options = require("../mongoDbConfig/options");
const CartsManagerMongo = require("../dao/mongoManagers/cartsManagerMongo");

const cartsManagerMongo = new CartsManagerMongo(options.mongoDb.url);

router.get("/", async (req, res) => {
  const data = await cartsManagerMongo.getAll();
  const carts = {
    carts: data.map( c => {
      return{
        _id: c._id,
        products: c.products
      }
    })
  }
  console.log(carts)
  res.render("carts", carts)
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
  const data = await cartsManagerMongo.addToCart(cid, pid);

  res.json({
    status: "success",
    data: data
  })
});

module.exports = router;
