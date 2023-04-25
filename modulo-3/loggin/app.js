const express = require("express");
require("dotenv").config();
const testRoute = require("./routers/testRoute")
const logsRoute = require("./routers/logsRoute")
const addLogger = require("./middlewares/logger.middleware")
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(addLogger)

app.get("/", (req, res) => {
  res.send("Hola")
});

app.use("/mockingproducts", testRoute);
app.use("/loggerTest", logsRoute)

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is up and running on ${PORT}`);
});

server.on("error", (error) => {
  console.error(error);
});
