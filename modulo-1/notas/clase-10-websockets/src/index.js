const express = require("express")
const { Server } = require("socket.io") // se importa la clase Server
const hanblebars = require("express-handlebars")
const PORT = 8080
const app = express()

app.engine("handlebars", hanblebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

// MEEDBLEWARES
app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use(express.static( __dirname + "/public"))

// RUN SERVER
const httpServer = app.listen(PORT, () => {
  console.log("server running in port", PORT)
})

// se instancia la clase server socket
const socketServer = new Server(httpServer)

app.get("/", (req, res) => {
  res.render("index");
});

// ESCUCHAR Y MANDAR DATA
// el on escucha eventos. el primer parametro es que tipo de evento y el callback lo que se ejecuta cuando sucede
socketServer.on("connection", (socket) => { // el socket es el cliente
  console.log("nuevo user conectado")
  console.log(socket.id)

  // ESCUCHAR
  // escucha el evento que se emite desde script.js
  socket.on("message", (data) => { // la data es el segundo parametro del emit
    console.log(data)
  })

  // ENVIAR
  //en script.js tiene que escuchar los eventos
  socket.emit("socketIndividual", "envia un msj al cliente acutal")
  socket.broadcast.emit("variosClientes", "envia a todos los clientes menos el socket acutal")
  socketServer.emit("todos", "envia un mensaje a todos los clientes")
})
