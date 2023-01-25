const mongoose = require("mongoose");
const cartsCollection = "products";

const cartsSchema = new mongoose.Schema({
  cartId: {
    type: Number,
    required: true,

    products: {
      type: Array,
      required: true,

      productId: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model(cartsCollection, cartsSchema)