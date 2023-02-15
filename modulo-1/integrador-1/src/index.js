require("./mongoDbConfig/dbConfig");
const express = require("express");
const hanblebars = require("express-handlebars");
const productRoutes = require("./routers/products.routes");
const cartsRoutes = require("./routers/carts.routes");
const chatsRoutes = require("./routers/chat.routes");
const { Server } = require("socket.io");
const ProductManagerMongo = require("./dao/mongoManagers/productManagerMongo");
const ChatManager = require("./dao/mongoManagers/chatMongoManager");
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
const chatManager = new ChatManager();
const productsManager = new ProductManagerMongo();

io.on("connection", async (socket) => {
  console.log("New client connected");
  app.set("socket", socket);
  //hacer llamada a la db
  const data = await chatManager.getMessages();
  socket.emit("showMessages", data);

  socket.on("newMessage", async (msj) => {
    await chatManager.saveMessage(msj);
    socket.emit("showMessage", data);
  });
});

// ROUTES
app.get("/", (req, res) => {
  res.send("app");
});

app.get("/products", async (req, res) => {
  const data = await productsManager.getAll();
  console.log(data);
  const products = {
    products: data.map((p) => {
      return {
        title: p.title,
        description: p.description,
        code: p.code,
        price: p.price,
        status: p.status,
        stock: p.stock,
        category: p.category,
      };
    })
  };


  res.render("productsView", products);
  // devuelve todos los productos con paginacion
  // deben tener un boton de agregar al carrito desde aca
  // llevar a una nueva vista que sea getCartById
});

app.use("/api/products", productRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/chat", chatsRoutes);
