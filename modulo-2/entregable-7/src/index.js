const express = require("express");
const hanblebars = require("express-handlebars");
const sessionRouter = require("./routers/sessionRouter")
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

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/profile", (req, res) => {
  res.render("profile")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.use("/api/session", sessionRouter)

// RUN SERVER
app.listen(PORT, () => {
  console.log("server running on port 8080")
})