const express = require("express");
const { Server } = require("socket.io"); // se importa la clase Server
const hanblebars = require("express-handlebars");
const apiRouter = require("../src/routes/product.routes");
const PORT = 8080;
const app = express();

// TEMPLATE ENGINE
app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// MEEDBLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ROUTES
app.use("/", apiRouter);

// RUN SERVER
const httpServer = app.listen(PORT, () => {
  console.log("server running in port", PORT);
});

// SOCKETS
let products = []

const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.render("home");
});

io.on("connection", (socket) => {
  console.log("nuevo user conectado");

  socket.on("message", (data) => {
    products.push(data)
    // console.log(products)
    io.emit("paragraph", products)
  });
});
