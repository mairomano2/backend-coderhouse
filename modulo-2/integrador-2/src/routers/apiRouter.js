const { Router } = require("express");
const usersRouter = require("./users/users.routes");
const productsRouter =require("./products/products.routes")
const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);

module.exports = router;
