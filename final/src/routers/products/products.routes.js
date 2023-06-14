const { Router } = require("express");
const ProductsController = require("../../controllers/products.controller");
const { adminAuth, generalAuth } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", ProductsController.getAll);
router.get("/:id", ProductsController.getById);
router.post("/", generalAuth, ProductsController.createProduct);
router.put("/:id", generalAuth, ProductsController.updateProduct);
router.delete("/:id", adminAuth, ProductsController.deleteProduct);

module.exports = router;