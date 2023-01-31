const express = require("express");
const hanblebars = require("express-handlebars");
const productRoutes = require("./routers/products.routes");
const cartsRoutes = require("./routers/carts.routes");
const chatsRoutes = require("./routers/chat.routes");
require("./mongoDbConfig/dbConfig");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 27017;
const app = express();

// MEEDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// TEMPLATE ENGINE
app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// RUN SERVER
const httpServer = app.listen(PORT, () => {
  console.log("server running in", PORT);
});

// SOCKETS
const io = new Server(httpServer);
let messagesDB = [];

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    messagesDB.push(data);
    socket.emit("renderMessage", messagesDB);
  });
});

// ROUTES
app.get("/", (req, res) => {
  res.send("app");
});

app.use("/api/products", productRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/chat", chatsRoutes);
