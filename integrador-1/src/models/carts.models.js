const mongoose = require("mongoose");
const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  _id: { 
    type: String
  },
  products: {
    productId: {
      type: String
    },
    quantity: {
      type: Number
    }
  }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema)
module.exports = cartsModel