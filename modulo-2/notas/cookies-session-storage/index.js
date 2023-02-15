const express = require("express");
const PORT = process.env.PORT || 8080;
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express();

// MEDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));
//se activa el meddleware de coockie parser
app.use(cookieParser()) 
// se activa el meddleware de express session
app.use(session({ // se le pasa por parametro un obj de configuracion de la sesion
  secret: "top-secret-51",
  resave: false, // sirve para que no guarde info de la sesion en memoria cuando el user no esta activo
  saveUninitialized: false
}))

// ROUTERS

//crear cookie
app.get("/", (req, res) => {
  res.send("cookies, session y storage")
})

app.get("/createCookie", (req, res) => {
  //primer parametro es el nombre de la coockie, el segundo el valor, y el obj opciones adicionales
  // el obj res es el que crea y elimina las coockies 
  res.cookie("server1", "express1", {
    maxAge: 5000
  })
  .send("cookie sended")
})

// crear sesion
app.get("/createSession", (req, res ) => {
  // se checkea que haya una sesion creada
  if(req.session.data){
    // con req se accede a las propiedades de la sesion
    req.session.data = "new data"
    res.send(`${req.session.data}`)
  } else {
    req.session.data = "data"
    res.send(`${req.session.data}`)
  }
})

app.listen(PORT, () => {
  console.log("Server is up and running in port", PORT);
});