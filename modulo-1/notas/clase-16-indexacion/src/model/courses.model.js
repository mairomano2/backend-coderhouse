const mongoose = require("mongoose");
const coursesCollection = "courses";
const { userCollection } = require("./user.model");
const coursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: {
    //formato de cada elemento dentro del array
    type: [
      {
        // define que el tipo va a ser un tipo objetcId de un documento
        type: mongoose.Schema.Types.ObjectId,
        // hace referencia a un usuario de la coleccion userColection con sus propiedades
        ref: userCollection,
        // si no tiene estudiantes asignados el default va a ser un array vacio para agrgarlos luego
        default: [],
      },
    ],
  },
});

// CREACION DE MEDDLEWERE
// el metodo pre va a realizar una operacin antes de devolver el documento (en este caso populacion)
//el primer parametro es el metodo que se ejecuta y el segundo una callback
coursesSchema.pre("findOne", function (next){
  // this hace referencia al documento que se consulta
  this.populate("students")
  // next hace que se siga ejecutanto el codigo
  next();
});
// coursesSchema.pre("findOne", function(next){
//   this.populate("students")
//   next()
// })

const CoursesModel = mongoose.model(coursesCollection, coursesSchema);
module.exports = { CoursesModel };
