const mongoose = require("mongoose")
const options = require("./options")

// DB CONNECTION
mongoose.set("strictQuery", false)
mongoose.connect(options.monoDB.url, (err) => {
  if(err){
    console.log("Hubo un error: ", err)
  }
  console.log("conexion exitosa")
})