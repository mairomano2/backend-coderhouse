const mongoose = require("mongoose");
const ordersCollection = "orders";

const orderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: String,
    // enum hace que solo se puedan poner las opciones dentro del array
    enum: ["small", "medium", "large"],
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

const ordersModel = mongoose.model(ordersCollection, orderSchema);

module.exports = { ordersModel };
