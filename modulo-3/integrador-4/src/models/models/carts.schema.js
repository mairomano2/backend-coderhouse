const mongoose = require("mongoose")

const { Schema } = mongoose
const collection = "carts"
const CartsSchema = new Schema({
  code: {
    type: String
  },
  products: {
    type: Array,
    default: []
  },
  email: {
    type: String,
    require: true
  },
  dateTime: {
    type: Date,
    default: (new Date().getTime())
  }
})

const UserModel = mongoose.model(collection, CartsSchema)
module.exports = UserModel