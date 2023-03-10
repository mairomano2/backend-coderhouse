const express = require("express");
require("dotenv").config();
require("./config/config");
const apiRouter = require("./routers/apiRouter");
const PORT = process.env.PORT;

// Instanciamos servidor express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rutas
app.get("/", (req, res) => {
  res.send("hola");
});
app.use("/api", apiRouter);

// Listen
const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is up and running on ${PORT}`);
});

// Server error
server.on("error", (error) => {
  console.error(error);
});
