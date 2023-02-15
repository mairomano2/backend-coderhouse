const mongoose = require("mongoose");
const usersCollection = "users";
const mongoosePaginate = require("mongoose-paginate-v2")

const usersSchema = mongoose.Schema({
  firts_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  grade: {
    type: Number
  },
  group: {
    type: String
  }
});

// se debe instanciar el plugin antes del modelo
usersSchema.plugin(mongoosePaginate)
const usersModel = mongoose.model(usersCollection, usersSchema);

module.exports = { usersModel };
