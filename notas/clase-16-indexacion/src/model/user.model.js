const mongoose = require("mongoose")
const userCollection = "users";
const userSchema = new mongoose.Schema({

  //definir las propiedades y sus caracteristicas
  firstName: { type: String },
  lastName: { type: String },
  //el index: true va a generar el index en la db
  email: { type: String, index: true },
  gender: { type: String },
});

const UserModel = mongoose.model(userCollection, userSchema);
module.exports = { UserModel, userCollection };