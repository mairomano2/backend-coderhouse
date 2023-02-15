const { Router } = require("express");
const productRoutes = require("./products/products.routes");
const cartRoutes = require("./cart/cart.routes");

const router = Router();

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
