require("./mongoDbConfig/dbConfig");
const express = require("express");
const hanblebars = require("express-handlebars");
const productRoutes = require("./routers/products.routes");
const cartsRoutes = require("./routers/carts.routes");
const chatsRoutes = require("./routers/chat.routes");
const { Server } = require("socket.io");
const ChatManager = require("./dao/mongoManagers/chatMongoManager");
const chatModel = require("./models/chat.models");
const PORT = process.env.PORT || 8080;
const app = express();

// MEEDLEWARES
app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// MEEDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

// RUN SERVER
const httpServer = app.listen(PORT, () => {
  console.log("server running in", PORT);
});

// SOCKETS
const io = new Server(httpServer);
const chatManager = new ChatManager()

io.on("connection", async (socket) => {
  console.log("New client connected");
  app.set("socket", socket);
  //hacer llamada a la db
  const data = await chatManager.getMessages()
  socket.emit("showMessages", data)
  
  socket.on("newMessage", async (msj) => {
    await chatManager.saveMessage(msj)
    socket.emit("showMessage", data)
  })
});

// ROUTES
app.get("/", (req, res) => {
  res.send("app");
});

app.get("/products", (req, res) => {
  // devuelve todos los productos con paginacion
  // deben tener un boton de agregar al carrito desde aca
  // llevar a una nueva vista que sea getCartById
})

app.use("/api/products", productRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/chat", chatsRoutes);