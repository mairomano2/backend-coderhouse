const mongoose = require('mongoose');
const userCollection = 'users';

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  age: { type: Number },
  password: { type: String },
  githubLogin: { type: String, unique: true}
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel