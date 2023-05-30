const { Router } = require("express");
const CartsController = require("../../controllers/carts.controller")

const router = Router();

// este va con un middleware para que solo pueda acceder admin
router.get("/", CartsController.getAll)
//este es user y admin
router.get("/:id", CartsController.getById)

router.post("/", CartsController.createCart)

// este va con un middleware para ver si hay stock de los productos
router.post("/:cid/purchase", CartsController.purchase)

module.exports = router