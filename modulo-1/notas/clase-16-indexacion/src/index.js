const express = require("express");
require("./db/config");
const { UserModel } = require("./model/user.model");
const { CoursesModel } = require("./model/courses.model");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// INDEXACION
// las indexaciones se usan para que las querys a la db sean mas rapidas ya que guarda los campos del model con index
// en un registro asi no tiene que recorrer todo un obj para encontrar el campo y su value
//este endpoint va a fijarse cuanto tarda en traer la info de la db con y sin el index
app.get("/indexacion", async (req, res) => {
  const data = await UserModel.find({
    email: "orestall0@multiply.com",
  }).explain("executionStats");
  res.json({ data });
});

// POPULATE
// se usa para cruzar datos dentro de distinas colecciones (similar a las tablas de los modelos SQL)
//data nueva
const newUsers = [
  {
    firstName: "ana",
    lastName: "perez",
    email: "anaperez@gmail.com",
    gender: "f",
  },
];
const newCourses = [
  { name: "Javascript" },
  { name: "html" },
  { name: "node" },
];

// ROUTES
// crea un usuario
app.post("/population/createUser", async (req, res) => {
  console.log(UserModel);
  await UserModel.create(newUsers);
  res.send("usuarios creados con exito");
});

// crea un curso
app.post("/population/createCourses", async (req, res) => {
  await CoursesModel.create(newCourses);
  res.send("cursos creados con exito");
});

// agrega un estudiante a un curso
app.post("/population/addStudent", async (req, res) => {
  const studentId = req.body.studentId
  const courseId = req.body.courseId
  // el primer parametro es la coleccion a la que se agrega la info y la segunda la propiedad a agregar
  await CoursesModel.findOneAndUpdate( {_id:courseId}, {$push: {students: studentId}}).populate(student)
  res.send("usuario agregado con exito")

})

//trae los estudiantes de un curso
app.get("/population/:courseId", async (req, res) => {
  courseId = req.params.courseId
  const response = await CoursesModel.findById({ _id: courseId})
  res.json({
    data: response
  })
})

//hace el merge entre el curso con ese id especifico y los usuarios relacionados a ese curso
app.get("/populate/:courseId", async (req, res) => {
  const courseId = req.params.courseId
  // el parametro de populate tiene que ser la que esta en el schema que llamamos en el primer momento
  const response = await CoursesModel.findById({_id: courseId}).populate("students")
  res.send(response)
})

// populate con meddlewere
// get /:cid
app.get("/pre/:courseId", async (req, res) => {
  const courseId = req.params.courseId
  // no se llama a populate porque se hace desde el schema
  const response = await CoursesModel.findOne({_id: courseId})
  res.send(response)
})