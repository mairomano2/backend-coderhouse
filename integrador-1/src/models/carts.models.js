const mongoose = require("mongoose");
const cartsCollection = "carts";
const { productsCollection } = require("./products.models");
const mongoosePaginate = require("mongoose-paginate-v2");

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productsCollection",
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
    default: [],
    required: true,
  },
  // products: [{
  //   productId : mongoose.Schema.Types.ObjectId,
  //   quantity: {
  //     type: Number
  //   }
  // }]
});

cartsSchema.pre("findOne", function (next) {
  this.populate(productsCollection);
  next();
});
cartsSchema.plugin(mongoosePaginate);
const cartsModel = mongoose.model(cartsCollection, cartsSchema);
module.exports = cartsModel;
