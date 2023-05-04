const { Router } = require("express");
const usersRouter = require("./users/users.routes");
const productsRouter = require("./products/products.routes");
const sessionRouter = require("./session/session.routes");
const cartsRouter = require("./carts/carts.router")
const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/session", sessionRouter);
router.use("/carts", cartsRouter)

module.exports = router;
