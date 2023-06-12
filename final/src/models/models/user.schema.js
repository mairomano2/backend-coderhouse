const mongoose = require("mongoose");
const userRoles = require("../../constants/userRoles");

const { Schema } = mongoose;
const collection = "users";
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  githubUsername: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: Object.values(userRoles),
  },
});

const UserModel = mongoose.model(collection, UserSchema);
module.exports = UserModel;
