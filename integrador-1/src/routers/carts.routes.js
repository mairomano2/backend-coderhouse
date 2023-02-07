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
  //visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito.
  const cid = req.params.cid;
  const data = await cartsManagerMongo.getCartById(cid);
  console.log("data", data)
  res.json({
    status: "success",
    data: data,
  });
});

// POST -> cid/produc/pid agrega un prod a un cart ya creado. si ya existe ese prod solo se agrega uno en la cantidad
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const data = await cartsManagerMongo.addToCart(cid, pid);

  res.json({
    status: "success",
    data: data,
  });
});

router.put("/:cid", async () => {
  //actualizar el carrito con un arreglo de productos
})

router.put("/:cid/products/:pid", async () => {
  //actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
})

router.delete("/:cid", async () => {
  //deberá eliminar todos los productos del carrito 
})

router.delete("/:cid/products/:pid", async () => {
  //eliminar del carrito el producto seleccionado.
});



module.exports = router;
