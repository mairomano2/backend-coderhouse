const express = require("express");
const fs = require("fs/promises");
const { Server } = require("socket.io"); // se importa la clase Server
const hanblebars = require("express-handlebars");
const apiRouter = require("../src/routes/product.routes");
const productsFile = require("./db/products.json");
const PORT = 8080;
const app = express();

// TEMPLATE ENGINE
app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// MEEDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ROUTES
app.use("/", apiRouter);

// RUN SERVER
const httpServer = app.listen(PORT, () => {
  console.log("server running in port", PORT);
});

// HELPERS
const readJson = async () => {
  const data = await fs.readFile("./db/products.json", "utf-8");
  const products = await JSON.parse(data);
  return products;
};

const writeJson = async (data) => {
  const stringData = await JSON.stringify(data, null, "\t");
  await fs.writeFile("./db/products.json", stringData, "utf-8");
};

// SOCKETS
const io = new Server(httpServer);

app.get("/", async (req, res) => {
  const products = await readJson();
  res.render("home", {products} );
});

io.on("connection", (socket) => {
  console.log("nuevo user conectado");

  socket.on("message", async (data) => {
    let products = await readJson()
    products.push({prod: data})
    await writeJson(products)
    io.emit("paragraph", products);
  });
});
