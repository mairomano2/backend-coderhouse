const express = require("express");
const handlebars = require("express-handlebars");
const PORT = 8080;
const app = express();

// TEMPLATE ENGINE
// inicia el motor de plantillas con la config por defecto
app.engine("handlebars", handlebars.engine()); //handlebars.engine() pone la configuracion por defecto
// dice en que carpeta se alojan las plantillas
app.set("views", __dirname + "/views");
// dice a express que motor de plantillas se va a utilizar
app.set("view engine", "handlebars");

// MEEDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// hace que los archivos estaticos (ej: css, js, etc) los busque en la carpeta public
app.use(express.static(__dirname + "/public"));

// ROUTES

const prods = [
  {prod: "ropa", precio: 200},
  {prod: "comida", precio: 600}
]

app.get("/", (req, res) => {
  const user = {
    name: req.query.name,
    isAdmin: req.query.name === "Jorge"
  }
  const data = {
    title: "titulo dinamico",
    user,
    prods,
    styles: "styles.css"
  }
  // el metodo render responde con vistas
  res.render("index", data); // como parametro va el nombre de la plantilla
});

// START SERVER
app.listen(PORT, () => {
  console.log("Server running in", PORT);
});
