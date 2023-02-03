const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://juan:test1234@cluster0.curtjyb.mongodb.net/populate";
mongoose.set('strictQuery', false)

const config = mongoose.connect(mongoURL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("conexion exitosa");
  }
});

module.exports = config