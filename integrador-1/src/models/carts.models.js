const mongoose = require("mongoose");
const cartsCollection = "carts";
const mongoosePaginate = require("mongoose-paginate-v2")

const cartsSchema = new mongoose.Schema({
  products: [{
    productId : mongoose.Schema.Types.ObjectId,
    quantity: {
      type: Number
    }
  }]
});

cartsSchema.plugin(mongoosePaginate)
const cartsModel = mongoose.model(cartsCollection, cartsSchema)
module.exports = cartsModel