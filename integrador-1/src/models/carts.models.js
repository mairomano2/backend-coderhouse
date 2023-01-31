const mongoose = require("mongoose");
const cartsCollection = "products";

const cartsSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    
    products: {
      type: Array,
      required: true,

      prodId: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema)
module.exports = cartsModel