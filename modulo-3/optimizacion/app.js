const express = require("express");
require("dotenv").config();
const testRoute = require("./routers/testRoute")
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hola");
});
app.use("/mockingproducts", testRoute);

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is up and running on ${PORT}`);
});

server.on("error", (error) => {
  console.error(error);
});
