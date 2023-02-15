const { Router } = require("express");
const router = Router();
const options = require("../mongoDbConfig/options");
const CartsManagerMongo = require("../dao/mongoManagers/cartsManagerMongo");

const cartsManagerMongo = new CartsManagerMongo(options.mongoDb.url);

router.get("/", async (req, res) => {
  const data = await cartsManagerMongo.getAll();
  const carts = {
    carts: data.map((c) => {
      return {
        _id: c._id,
        products: c.products,
      };
    }),
  };
  res.render("carts", carts);
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const data = await cartsManagerMongo.getCartById(cid);
  const carts = {
    carts: data.products.map( (c) => {
      return {
        _id: c._id,
        products: c.products
      }
    })
  }
  res.render("carts", carts)
});

// POST -> agrega un carrito vacio a la db
router.post("/", async (req, res) =>{
  const data = await cartsManagerMongo.addCart()

  res.json({
    data:data
  })
})

// POST -> cid/produc/pid agrega un prod a un cart ya creado. si ya existe ese prod solo se agrega uno en la cantidad
router.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const qnt = Number(req.body.qnt)
  const data = await cartsManagerMongo.addToCart(cid, pid, qnt);

  console.log("result", data)

  res.json({
    status: "success",
    data: data,
  });
});

// PUT -> /cid modifica la cantidad de un producto
router.put("/:cid", async (req, res) => {
  const cid = req.params.cid
  const product = req.body
  const data = await cartsManagerMongo.updateCart(cid, product)

  res.json({
    status: "success",
    data : data
  })
})

router.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const qnt = Number(req.body.qnt)
  const data = await cartsManagerMongo.UpdateProductFromCart(cid, pid, qnt)

  res.json({
    status: "sucess",
    data: data
  })
})

// DELETE -> borra todos los productos de un carrito
router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid
  const data = await cartsManagerMongo.deleteCart(cid)
  res.json({
    status: "success",
    data:data
  })
})

//DELETE -> borra un producto de un carrito especifico
router.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const data = await cartsManagerMongo.deleteProductFromCart(cid, pid)

  res.json({
    status: "sucess",
    data: data
  })
});



module.exports = router;
