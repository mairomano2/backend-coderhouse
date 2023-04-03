const { Router } = require("express")
const ProductsController = require("../../controllers/products.controller")

const router = Router()

router.get("/", ProductsController.getAll)
router.get("/:id", ProductsController.getById)
router.post("/", ProductsController.create)
router.put("/:id", ProductsController.updateById)
router.delete("/:id", ProductsController.delete)

module.exports = router