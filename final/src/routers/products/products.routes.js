const { Router } = require("express");
const ProductsController = require("../../controllers/products.controller");
const { adminAuth, premiumAuth } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", ProductsController.getAll);
router.get("/:id", ProductsController.getById);
router.post("/", adminAuth, premiumAuth, ProductsController.createProduct);
router.put("/:id", adminAuth, premiumAuth, ProductsController.updateProduct);
router.delete("/:id", adminAuth, premiumAuth, ProductsController.deleteProduct);

module.exports = router;
