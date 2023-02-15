const mongoose = require("mongoose");
const cartsCollection = "carts";
const mongoosePaginate = require("mongoose-paginate-v2");

const cartsSchema = new mongoose.Schema({
  products: [{
    productId : mongoose.Schema.Types.ObjectId,
    quantity: {
      type: Number
    }
  }]
});

cartsSchema.pre("find", function(next){
  this.populate("products.productId")
  next()
})

cartsSchema.pre("findOne", function (next) {
  this.populate("products.productId");
  next();
});

cartsSchema.plugin(mongoosePaginate);
const cartsModel = mongoose.model(cartsCollection, cartsSchema);
module.exports = cartsModel;
