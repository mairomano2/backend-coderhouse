const { Router } = require("express");
const { generateProducts, createProduct } = require("../utils/utils");
const CostumeError = require("../utils/errors");
const generateErrorInfo = require("../utils/errorInfo");
const router = Router();

router.get("/", async (req, res) => {
  const products = await generateProducts();
  res.send(products);
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    if (!data.title || !data.price) {
      CostumeError.CreateError({
        name: "Product not created",
        message: "Error trying to create the product",
        cause: generateErrorInfo(data),
      });
    }
  } catch (error) {
    console.log("Hubo un error", error)
  }
  
  const product = await createProduct(data);
  res.send(product);
});

module.exports = router;
