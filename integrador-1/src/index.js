require("./mongoDbConfig/dbConfig");
const express = require("express");
const hanblebars = require("express-handlebars");
const productRoutes = require("./routers/products.routes");
const cartsRoutes = require("./routers/carts.routes");
const chatsRoutes = require("./routers/chat.routes");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;
const app = express();

// MEEDLEWARES
app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// MEEDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// RUN SERVER
const httpServer = app.listen(PORT, () => {
  console.log("server running in", PORT);
});

// SOCKETS
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected");
  app.set("socket", socket);
});

io.on("message", () => {
  socket.emit("renderMessage", data => {
    console.log(data)
  })
})

// ROUTES
app.get("/", (req, res) => {
  res.send("app");
});

app.use("/api/products", productRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/chat", chatsRoutes);