const { Router } = require("express");
const router = Router();
const ProductManager = require("../../manager/manajers");
const manager = new ProductManager("cart.json");

//rutas

// GET -> trae un cart en especifico
router.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);

  if (isNaN(cid)) {
    res.status(400).send("el parametro debe ser un numero");
  } else {
    res.json({
      status: "success",
      data: await manager.getItemById(cid),
    });
  }
});

// POST -> crea un cart con in id autogenerado y un array de productos [prodId, qnt]
router.post("/", async (req, res) => {
  res.json({
    status: "success",
    data: await manager.createCart(),
  });
});

// POST -> cid/produc/pid agrega un prod a un cart ya creado. si ya existe ese prod solo se agrega uno en la cantidad
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);
  const data = await manager.addToCart(cid, pid)
  console.log(data)

  if (isNaN(cid) || isNaN(pid)) {
    res.status(400).send("ambos parametros deben ser numeros");
  } else {
    res.json({
      status: "success",
      data: data
    });
  }
});

module.exports = router;
