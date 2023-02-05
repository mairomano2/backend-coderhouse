const mongoose = require("mongoose");
const cartsCollection = "carts";
const mongoosePaginate = require("mongoose-paginate-v2")

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

cartsSchema.plugin(mongoosePaginate)
const cartsModel = mongoose.model(cartsCollection, cartsSchema)
module.exports = cartsModel