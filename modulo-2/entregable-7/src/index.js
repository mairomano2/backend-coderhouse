const express = require("express");
const hanblebars = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const app = express();

// HANDLEBARS ENGINE
app.engine("handlebars", hanblebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// MEEDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

// ROUTERS
app.get("/", (req, res) => {
  res.render("home")
})

// RUN SERVER
app.listen(PORT, () => {
  console.log("server running on port 8080")
})