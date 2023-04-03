const mongoose = require("mongoose")
const userRoles = require("../../constants/userRoles")

const { Schema } = mongoose
const collection = "users"
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  age: {
    type: Number
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
   password: {
    type: String
   },
   githubUsername: {
    type: String
   },
   role: {
    type: String,
    enum: Object.values(userRoles)
   },
  //  carts: {
  //   type: Schema.Types.ObjectId,
  //   ref: "courses"
  //  }
})

const UserModel = mongoose.model(collection, UserSchema)
module.exports = UserModel
